import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const STAGES = [
  { id: 'learn', label: 'LEARN', icon: '💡', tone: 'text-blue-600', ring: 'border-blue-500 bg-blue-50', where: 'On screen · 2–3 min', summary: 'A short, visual idea — no lectures.' },
  { id: 'play', label: 'PLAY', icon: '🎮', tone: 'text-green-600', ring: 'border-green-500 bg-green-50', where: 'On screen · 5–8 min', summary: 'An interactive challenge where choices have consequences.' },
  { id: 'do', label: 'DO', icon: '🌍', tone: 'text-amber-600', ring: 'border-amber-500 bg-amber-50', where: 'Off screen · at home or outside', summary: 'A real-world mission with family.' },
  { id: 'create', label: 'CREATE', icon: '🎨', tone: 'text-purple-600', ring: 'border-purple-500 bg-purple-50', where: 'Back on screen · 5 min', summary: 'Build something new with what was learned.' },
];

const EXAMPLES = {
  marketplace: {
    name: 'Plan the Perfect Picnic', icon: '🏪', path: '/world/marketplace',
    learn: 'Money is for choices. With ₹200, every item you buy means less for something else.',
    play: 'Shop for five friends within budget, then decide what to do with the change: save, share, donate or treat.',
    do: 'On the next grocery trip, estimate the total of five items before reaching the counter.',
    create: 'Design your own shop: choose items, set prices, and make a menu card.',
    skills: ['Math', 'Financial literacy', 'Decision making'],
  },
  science: {
    name: 'Grow a Plant', icon: '🔬', path: '/world/science',
    learn: 'Plants need the right balance of sunlight, water and soil to grow.',
    play: 'Set the sunlight, water and soil for Maya’s seed, then watch what grows — and find out why.',
    do: 'Find a plant near home and observe it for three days. Log what changes.',
    create: 'Invent a plant for a desert, a rainforest or space, and explain how it survives.',
    skills: ['Science', 'Observation', 'Cause & effect'],
  },
  space: {
    name: 'Choose the Right Planet', icon: '🚀', path: '/world/space',
    learn: 'Living things need air, water and the right temperature.',
    play: 'Compare planets and choose a safe base camp for your astronaut crew, then handle an emergency.',
    do: 'Look at the night sky with a grown-up. Count the stars you can see and spot the Moon’s shape.',
    create: 'Design a space base: what would it need to keep people alive?',
    skills: ['Reasoning', 'Science', 'Decision making'],
  },
};

const ROLES = [
  {
    icon: '🧒', title: 'Children', to: '/world', cta: 'Explore the World',
    points: ['Explore a world map of mission locations', 'Earn XP and badges for learning, not for screen time', 'Build a gallery of their own creations'],
  },
  {
    icon: '👨‍👩‍👧', title: 'Parents', to: '/parents', cta: 'See Parent Dashboard',
    points: ['Weekly summary of emerging strengths and areas to support', 'Real-world activity ideas to do together', 'Available in English, Hindi and Marathi'],
  },
  {
    icon: '🧑‍🏫', title: 'Teachers', to: '/schools', cta: 'See Teacher Mode',
    points: ['Class skill overview with gaps highlighted', 'Assign missions to the class or small groups', 'Missions mapped to NCF-FS learning areas'],
  },
];

const JOURNEY = [
  { step: '1', title: 'Parent sets up', text: 'Parent creates an account, gives consent, and adds their child’s first name and age.' },
  { step: '2', title: 'Child explores', text: 'The child picks a location on the world map and starts a mission.' },
  { step: '3', title: 'Learning leaves the screen', text: 'Each mission ends with a real-world task done with family.' },
  { step: '4', title: 'Progress comes back', text: 'Parents and teachers see emerging strengths and suggested next missions.' },
];

export default function HowItWorks() {
  const [exampleId, setExampleId] = useState('marketplace');
  const [stageIndex, setStageIndex] = useState(0);
  const example = EXAMPLES[exampleId];
  const stage = STAGES[stageIndex];

  return (
    <div className="max-w-6xl mx-auto py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-curio-dark mb-4">How Curio Works</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Every mission follows one simple loop, so learning doesn’t end when the screen turns off.
        </p>
      </header>

      {/* Core loop */}
      <section className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {STAGES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setStageIndex(i)}
              aria-pressed={stageIndex === i}
              className={`relative rounded-2xl p-4 sm:p-5 text-left border-2 transition-all ${stageIndex === i ? `${s.ring} shadow-md -translate-y-1` : 'bg-white border-gray-100 hover:border-gray-300'}`}
            >
              <div className="text-xs font-bold text-gray-400 mb-1">STEP {i + 1}</div>
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className={`font-extrabold text-lg ${s.tone}`}>{s.label}</div>
              <div className="text-xs text-gray-500 mt-1">{s.where}</div>
              {i < STAGES.length - 1 && (
                <span className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-gray-300 text-xl z-10">→</span>
              )}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="text-sm font-bold text-gray-500">See it in a mission:</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(EXAMPLES).map(([id, ex]) => (
                <button
                  key={id}
                  onClick={() => setExampleId(id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-colors ${exampleId === id ? 'bg-curio-dark text-white border-curio-dark' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}
                >
                  {ex.icon} {ex.name}
                </button>
              ))}
            </div>
          </div>

          <div key={`${exampleId}-${stage.id}`} className="flex flex-col md:flex-row gap-6 items-start animate-fade-in-up">
            <div className={`shrink-0 w-20 h-20 rounded-2xl border-2 flex items-center justify-center text-4xl ${stage.ring}`}>{stage.icon}</div>
            <div className="flex-1">
              <div className={`font-extrabold text-sm tracking-widest ${stage.tone}`}>{stage.label} · {stage.summary}</div>
              <p className="text-2xl font-medium text-gray-800 mt-2 leading-relaxed">{example[stage.id]}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {example.skills.map(s => (
                <span key={s} className="bg-curio-primary/10 text-curio-primary text-xs font-bold px-3 py-1 rounded-full">{s}</span>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStageIndex(i => Math.max(0, i - 1))}
                disabled={stageIndex === 0}
                className="px-4 py-2 rounded-full font-bold text-sm text-gray-600 border border-gray-300 hover:bg-gray-100 disabled:opacity-40"
              >
                ← Back
              </button>
              {stageIndex < STAGES.length - 1 ? (
                <button onClick={() => setStageIndex(i => i + 1)} className="px-5 py-2 rounded-full font-bold text-sm bg-curio-primary text-white hover:opacity-90">
                  Next: {STAGES[stageIndex + 1].label} →
                </button>
              ) : (
                <Link to={example.path} className="px-5 py-2 rounded-full font-bold text-sm bg-curio-primary text-white hover:opacity-90">
                  Try this mission →
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="mb-16">
        <h2 className="text-2xl font-extrabold text-center text-curio-dark mb-8">From sign-up to real-world learning</h2>
        <ol className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {JOURNEY.map(j => (
            <li key={j.step} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="w-9 h-9 rounded-full bg-curio-primary text-white font-extrabold flex items-center justify-center mb-3">{j.step}</div>
              <h3 className="font-bold text-gray-800 mb-1">{j.title}</h3>
              <p className="text-sm text-gray-600">{j.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Roles */}
      <section className="mb-16">
        <h2 className="text-2xl font-extrabold text-center text-curio-dark mb-2">One world, three views</h2>
        <p className="text-center text-gray-500 mb-8">The same missions connect children, families and classrooms.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ROLES.map(r => (
            <div key={r.title} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
              <div className="text-4xl mb-3">{r.icon}</div>
              <h3 className="text-xl font-bold mb-3">{r.title}</h3>
              <ul className="space-y-2 text-gray-600 flex-grow mb-6">
                {r.points.map(p => (
                  <li key={p} className="flex gap-2"><span className="text-curio-primary font-bold">✓</span><span>{p}</span></li>
                ))}
              </ul>
              <Link to={r.to} className="text-center py-2 rounded-full font-bold text-curio-primary border-2 border-curio-primary hover:bg-curio-primary/5 transition-colors">
                {r.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Principles + CTA */}
      <section className="bg-curio-dark text-white rounded-3xl p-8 sm:p-10 text-center">
        <h2 className="text-3xl font-extrabold mb-4">Don’t just answer. <span className="text-curio-secondary">Create.</span></h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Short sessions, no ads, no endless feeds. Rewards encourage learning — they don’t replace it.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/demo" className="bg-curio-primary text-white px-8 py-3 rounded-full font-bold hover:opacity-90">Watch the 4-stage demo</Link>
          <Link to="/safety" className="bg-white/10 text-white px-8 py-3 rounded-full font-bold hover:bg-white/20">Safety & Trust</Link>
        </div>
      </section>
    </div>
  );
}
