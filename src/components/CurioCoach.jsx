import React, { useRef, useState } from 'react';
import { ParentGateModal } from './ParentGate';
import { isParentUnlocked } from '../lib/parentGate';

const MAX_SIDE = 1024;
const LANGS = [['English', 'English'], ['Hindi', 'हिन्दी'], ['Marathi', 'मराठी']];

// Scripted feedback used when the AI isn't connected (local dev, no API key, offline).
const DEMO_FEEDBACK = {
  truss: {
    sees: 'I see a bridge with zig-zag sticks making triangles on top of a flat deck.',
    praise: 'You joined your triangles neatly so they share their corners — that’s real engineering!',
    science: 'Triangles can’t squash into a new shape, so they pass the weight along the sticks to the ends of the bridge.',
    next_hack: 'Add one more triangle in the middle and see if it holds even more coins.',
  },
  arch: {
    sees: 'I see a bridge with a curved arch underneath the flat part.',
    praise: 'Your arch is nice and even on both sides — that helps it stay balanced.',
    science: 'An arch pushes the weight out to the sides, so the ends need to be held firmly.',
    next_hack: 'Put a heavy book against each end of the arch so it can’t slide outward.',
  },
  default: {
    sees: 'I see a bridge stretched across a gap between two supports.',
    praise: 'You built it and tested it for real — that’s exactly what engineers do!',
    science: 'A flat beam bends in the middle when weight pushes down on it.',
    next_hack: 'Fold your paper into a zig-zag or add triangles and test again.',
  },
};

function resizeToJpeg(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, MAX_SIDE / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      resolve({ dataUrl, base64: dataUrl.split(',')[1] });
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('unreadable')); };
    img.src = url;
  });
}

export default function CurioCoach({ mission = 'bridge', design, coins, onFeedback }) {
  const fileInput = useRef(null);
  const [consented, setConsented] = useState(isParentUnlocked);
  const [gateOpen, setGateOpen] = useState(false);
  const [language, setLanguage] = useState('English');
  const [preview, setPreview] = useState('');
  const [status, setStatus] = useState('idle'); // idle, thinking, done, error
  const [result, setResult] = useState(null); // { feedback, demo }
  const [error, setError] = useState('');
  const [slow, setSlow] = useState(false);

  const showDemoFeedback = () => {
    const feedback = {
      safety: 'ok',
      is_build: true,
      design_guess: design || 'unclear',
      ...(DEMO_FEEDBACK[design] || DEMO_FEEDBACK.default),
      parent_note: 'Your child practised engineering thinking: testing a design, observing what happens, and improving it.',
    };
    setResult({ feedback, demo: true });
    setStatus('done');
    onFeedback?.(feedback, true);
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setError('');
    setResult(null);
    setStatus('thinking');

    let image;
    try {
      image = await resizeToJpeg(file);
    } catch {
      setStatus('error');
      setError('Curio couldn’t open that photo. Try taking it again.');
      return;
    }
    setPreview(image.dataUrl);

    setSlow(false);
    const slowTimer = setTimeout(() => setSlow(true), 4000);
    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: image.base64, mediaType: 'image/jpeg', mission, language, design, coins }),
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.feedback) {
        setResult({ feedback: data.feedback, demo: false });
        setStatus('done');
        if (data.feedback.safety === 'ok') onFeedback?.(data.feedback, false);
        return;
      }
      if (res.status === 429) {
        setStatus('error');
        setError('Curio Coach is helping other builders. Try again in about a minute.');
        return;
      }
      if (res.status === 400) {
        setStatus('error');
        setError('Curio couldn’t read that photo. Try a clearer one of just the build.');
        return;
      }
      showDemoFeedback(); // AI not configured or unavailable: fall back to labelled demo feedback
    } catch {
      showDemoFeedback();
    } finally {
      clearTimeout(slowTimer);
    }
  };

  const pickPhoto = () => fileInput.current?.click();
  const fb = result?.feedback;
  const blocked = fb && fb.safety !== 'ok';

  return (
    <div className="bg-gradient-to-br from-curio-primary/5 to-curio-secondary/10 border-2 border-curio-primary/20 rounded-3xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-curio-primary">✨ Curio Coach · AI</div>
          <h3 className="text-xl font-bold text-curio-dark">Show Curio your real bridge</h3>
        </div>
        <div className="flex gap-1" role="group" aria-label="Coach language">
          {LANGS.map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setLanguage(value)}
              className={`px-3 py-1 rounded-full text-xs font-bold border ${language === value ? 'bg-curio-primary text-white border-curio-primary' : 'bg-white text-gray-600 border-gray-300'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <input ref={fileInput} type="file" accept="image/*" capture="environment" onChange={handleFile} className="hidden" />

      {!consented ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4 text-sm">A grown-up needs to say yes before Curio can look at photos.</p>
          <button type="button" onClick={() => setGateOpen(true)} className="bg-curio-dark text-white font-bold py-2 px-6 rounded-full hover:bg-black">
            🔒 Ask a grown-up
          </button>
        </div>
      ) : status === 'idle' ? (
        <div className="text-center">
          <button type="button" onClick={pickPhoto} className="bg-curio-primary text-white font-bold py-3 px-8 rounded-full hover:opacity-90">
            📷 Take a photo of my build
          </button>
          <p className="text-xs text-gray-500 mt-3">Only photograph the build — no faces. Photos are not stored by Curio.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
          {preview && <img src={preview} alt="Your build" className="w-full rounded-2xl object-cover aspect-square bg-white" />}
          <div className={preview ? 'sm:col-span-2' : 'sm:col-span-3'}>
            {status === 'thinking' && (
              <div className="flex items-center gap-3 text-curio-primary font-bold py-6" role="status">
                <span className="text-3xl animate-bounce">👀</span>
                {slow ? 'Lots of builders right now — Curio will be with you in a few seconds…' : 'Curio is looking at your build…'}
              </div>
            )}

            {status === 'error' && (
              <div role="status" className="bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4">
                {error}
                <button type="button" onClick={pickPhoto} className="block mt-3 font-bold text-curio-primary hover:underline">Try another photo</button>
              </div>
            )}

            {status === 'done' && fb && (
              <div className="space-y-3 animate-fade-in-up">
                {blocked ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                    <p className="text-amber-900 font-medium">{fb.sees} {fb.next_hack}</p>
                    <button type="button" onClick={pickPhoto} className="mt-3 font-bold text-curio-primary hover:underline">📷 Take a new photo</button>
                  </div>
                ) : (
                  <>
                    <div className="bg-white rounded-2xl p-4 shadow-sm"><span className="font-bold">👀 I see: </span>{fb.sees}</div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm"><span className="font-bold">🌟 </span>{fb.praise}</div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm"><span className="font-bold">🔬 Why: </span>{fb.science}</div>
                    <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4"><span className="font-bold text-purple-800">🛠️ Hack it next: </span>{fb.next_hack}</div>
                    <button type="button" onClick={pickPhoto} className="text-sm font-bold text-curio-primary hover:underline">📷 Show Curio another version</button>
                  </>
                )}
                {result.demo && (
                  <p className="text-xs text-gray-500">Demo mode: AI not connected, showing sample feedback.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <ParentGateModal
        open={gateOpen}
        onClose={() => setGateOpen(false)}
        onUnlock={() => setConsented(true)}
        reason="Allow Curio Coach to look at photos of your child’s builds. Photos are analysed by AI and are not stored by Curio."
      />
    </div>
  );
}
