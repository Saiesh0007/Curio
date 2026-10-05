// Curio Coach: looks at a photo of a child's real-world build and replies with
// short, child-friendly feedback. Runs as a Vercel serverless function so the
// API key never reaches the browser. Photos are processed in memory only.
//
// Provider: Claude when ANTHROPIC_API_KEY is set, otherwise Groq (free tier)
// when GROQ_API_KEY is set. With neither, the app shows labelled demo feedback.
import Anthropic from '@anthropic-ai/sdk';

const MISSIONS = {
  bridge: {
    title: 'Build a Bridge',
    goal: 'Build a bridge (from craft sticks, paper, cardboard or similar) between two supports and test how many coins it holds.',
    science: 'beams bend in the middle, arches push weight out to the sides, and triangles (trusses) keep their shape under load',
  },
};

const LANGUAGES = { English: 'English', Hindi: 'Hindi (Devanagari script)', Marathi: 'Marathi (Devanagari script)' };
const MAX_IMAGE_BASE64 = 2_000_000; // ~1.5 MB decoded; the app sends ~150 KB
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 12 };
const hits = new Map(); // per-instance, best-effort abuse protection

const FEEDBACK_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['safety', 'is_build', 'design_guess', 'sees', 'praise', 'science', 'next_hack', 'parent_note'],
  properties: {
    safety: {
      type: 'string',
      enum: ['ok', 'person_visible', 'unsafe', 'unrelated'],
      description: 'ok = only the build/objects are shown; person_visible = a face or identifiable person is in the photo; unsafe = the photo shows a dangerous activity; unrelated = no build at all.',
    },
    is_build: { type: 'boolean', description: 'True if the photo shows something the child built for this mission.' },
    design_guess: {
      type: 'string',
      enum: ['beam', 'arch', 'truss', 'other', 'unclear'],
      description: 'The design visible in the photo: truss = triangles or zig-zag supports; arch = a curve under the deck; beam = a flat deck with no extra supports. Must match what you say in sees and science.',
    },
    sees: { type: 'string', description: 'What you see in the build, 1-2 short sentences (under 30 words). Never describe people.' },
    praise: { type: 'string', description: 'Specific, honest praise for something visible in the build. One sentence (under 20 words).' },
    science: { type: 'string', description: 'The science behind why this design works or struggles, for a 5-8 year old. 1-2 short sentences (under 30 words).' },
    next_hack: { type: 'string', description: 'One concrete, safe change to try next with household materials. One sentence (under 25 words).' },
    parent_note: { type: 'string', description: 'One short sentence (under 30 words) for the parent: the skill the child practised and one way to extend it at home. Always in English.' },
  },
};

const SYSTEM_PROMPT = `You are Curio Coach, a warm, encouraging science coach for children aged 5 to 8 in India.
A child has built something in the real world for a Curio mission and a parent has taken a photo of it.

How to respond:
- Speak directly to the child in short, simple sentences a 6-year-old can follow when read aloud. No jargon unless you explain it.
- Be specific about what is actually visible: materials, shapes, how pieces are joined. Do not invent details you cannot see.
- Praise effort and thinking honestly. Never shame or compare the child to others.
- The next hack must be safe for young children: no sharp tools, heat, electricity or climbing. Suggest household materials.
- If the photo shows a face or an identifiable person, set safety to "person_visible", do not describe the person, and use the text fields to kindly ask for a new photo showing only the build.
- If the photo shows something dangerous, set safety to "unsafe" and use the text fields to gently suggest asking a grown-up.
- If there is no build in the photo, set safety to "unrelated", is_build to false, and kindly ask for a photo of the build.
- Never ask for or mention personal information such as names, schools or locations.`;

const GROQ_MODEL = 'qwen/qwen3.8-27b';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const RETRY_BUDGET_MS = 20_000; // free tier refills ~130 tokens/s; a request needs ~3.5K, so wait it out briefly

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CoachError extends Error {
  constructor(status, code, detail) {
    super(detail || code);
    this.status = status;
    this.code = code;
  }
}

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT.max;
}

async function askClaude({ prompt, image, mediaType }) {
  const client = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment
  try {
    const response = await client.beta.messages.create({
      model: 'claude-opus-5-5',
      max_tokens: 16000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: {
        effort: 'low', // a child is waiting; this is a short, focused task
        format: { type: 'json_schema', schema: FEEDBACK_SCHEMA },
      },
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType, data: image } },
            { type: 'text', text: prompt },
          ],
        },
      ],
    });
    if (response.stop_reason === 'refusal') throw new CoachError(422, 'refused');
    const text = response.content.find(b => b.type === 'text')?.text;
    if (!text) throw new CoachError(502, 'empty_response');
    return { feedback: JSON.parse(text), model: response.model };
  } catch (error) {
    if (error instanceof CoachError) throw error;
    if (error instanceof Anthropic.RateLimitError) throw new CoachError(429, 'rate_limited');
    if (error instanceof Anthropic.AuthenticationError) throw new CoachError(503, 'not_configured');
    if (error instanceof Anthropic.BadRequestError) throw new CoachError(400, 'bad_image', error.message);
    if (error instanceof Anthropic.APIError) throw new CoachError(502, 'upstream_error', `${error.status} ${error.message}`);
    throw error;
  }
}

async function askGroq({ prompt, image, mediaType }, deadline = Date.now() + RETRY_BUDGET_MS) {
  const response = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: `data:${mediaType};base64,${image}` } },
          ],
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: { name: 'curio_feedback', strict: true, schema: FEEDBACK_SCHEMA },
      },
      reasoning_effort: 'none', // short, focused task; keeps replies fast and within free-tier limits
      max_completion_tokens: 450, // the reserve counts against the free tier's 1,000 output tokens/minute
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    if (response.status === 429) {
      const waitMs = Math.max(1, Number(response.headers.get('retry-after')) || 5) * 1000;
      if (Date.now() + waitMs <= deadline) {
        await sleep(waitMs);
        return askGroq({ prompt, image, mediaType }, deadline);
      }
      throw new CoachError(429, 'rate_limited');
    }
    if (response.status === 401 || response.status === 403) throw new CoachError(503, 'not_configured');
    if (response.status === 400 || response.status === 413) throw new CoachError(400, 'bad_image', detail.slice(0, 300));
    throw new CoachError(502, 'upstream_error', `${response.status} ${detail.slice(0, 300)}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new CoachError(502, 'empty_response');
  return { feedback: JSON.parse(text), model: data.model || GROQ_MODEL };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }
  const ask = process.env.ANTHROPIC_API_KEY ? askClaude : process.env.GROQ_API_KEY ? askGroq : null;
  if (!ask) {
    return res.status(503).json({ error: 'not_configured' });
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'rate_limited' });
  }

  const { image, mediaType = 'image/jpeg', mission = 'bridge', language = 'English', design, coins } = req.body || {};
  const missionInfo = MISSIONS[mission];
  if (!missionInfo || !LANGUAGES[language]) {
    return res.status(400).json({ error: 'bad_request' });
  }
  if (typeof image !== 'string' || image.length === 0 || image.length > MAX_IMAGE_BASE64 || !/^[A-Za-z0-9+/=]+$/.test(image)) {
    return res.status(400).json({ error: 'bad_image' });
  }
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(mediaType)) {
    return res.status(400).json({ error: 'bad_image' });
  }

  const childReport = [
    typeof design === 'string' && design ? `The child says they built a ${design.slice(0, 30)} design.` : '',
    Number.isFinite(Number(coins)) && coins !== '' ? `The child says it held ${Math.max(0, Math.min(999, Number(coins)))} coins.` : '',
  ].filter(Boolean).join(' ');

  const prompt = `Mission: ${missionInfo.title}. Goal: ${missionInfo.goal}
Key science for this mission: ${missionInfo.science}.
${childReport}
Write the child-facing fields (sees, praise, science, next_hack) in ${LANGUAGES[language]}. Write parent_note in English.
Reply only with the JSON object.`;

  try {
    const result = await ask({ prompt, image, mediaType });
    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof CoachError) {
      if (error.status >= 500 || error.status === 400) console.error(`Coach ${error.code}:`, error.message);
      return res.status(error.status).json({ error: error.code });
    }
    if (error instanceof SyntaxError) {
      console.error('Coach returned invalid JSON');
      return res.status(502).json({ error: 'bad_response' });
    }
    console.error('Coach error:', error instanceof Error ? error.message : error);
    return res.status(500).json({ error: 'internal_error' });
  }
}
