import React, { useEffect, useState } from 'react';
import { MAX_ATTEMPTS, LOCKOUT_SECONDS, numberToWords, newChallenge, setParentUnlocked } from '../lib/parentGate';

// A parental gate designed to be easy for adults and hard for 5–8 year olds:
// reading a 4-digit number written in words needs place-value knowledge
// children typically don't have yet, and repeated guessing triggers a lockout.

export default function ParentGate({ onUnlock, onCancel, title = 'Grown-ups only', reason, remember = true }) {
  const [target, setTarget] = useState(newChallenge);
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockedFor, setLockedFor] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (lockedFor <= 0) return undefined;
    const timer = setTimeout(() => setLockedFor(s => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [lockedFor]);

  const submit = (e) => {
    e.preventDefault();
    if (lockedFor > 0) return;

    if (Number(input.replace(/[\s,]/g, '')) === target) {
      if (remember) setParentUnlocked(true);
      onUnlock?.();
      return;
    }

    const used = attempts + 1;
    setInput('');
    setTarget(newChallenge());
    if (used >= MAX_ATTEMPTS) {
      setAttempts(0);
      setLockedFor(LOCKOUT_SECONDS);
      setError('Too many tries. Please ask a grown-up.');
    } else {
      setAttempts(used);
      setError(`That’s not right. ${MAX_ATTEMPTS - used} ${MAX_ATTEMPTS - used === 1 ? 'try' : 'tries'} left.`);
    }
  };

  const locked = lockedFor > 0;

  return (
    <form onSubmit={submit} className="text-center">
      <div className="text-5xl mb-3">{locked ? '⏳' : '🔒'}</div>
      <p className="font-bold text-gray-800 text-lg mb-1">{title}</p>
      {reason && <p className="text-sm text-gray-500 mb-4">{reason}</p>}

      {locked ? (
        <p role="status" className="text-amber-700 font-medium my-6">
          Locked for {lockedFor}s. {error}
        </p>
      ) : (
        <>
          <p className="text-gray-600 mb-2">Type this number using digits:</p>
          <p className="font-bold text-curio-dark text-lg mb-4 px-2 select-none">{numberToWords(target)}</p>
          <div className="flex justify-center gap-2">
            <input
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(''); }}
              aria-label="Number in digits"
              placeholder="0000"
              className="w-32 border-2 border-gray-200 rounded-xl px-3 py-2 text-center font-bold tracking-widest focus:border-curio-primary outline-none"
            />
            <button type="submit" disabled={!input} className="bg-curio-primary text-white font-bold px-5 py-2 rounded-xl hover:opacity-90 disabled:opacity-40">
              Unlock
            </button>
          </div>
          {error && <p role="status" className="text-sm text-amber-700 mt-3">{error}</p>}
        </>
      )}

      {onCancel && (
        <button type="button" onClick={onCancel} className="mt-5 text-sm font-bold text-gray-500 hover:text-curio-primary">
          Cancel
        </button>
      )}
    </form>
  );
}

export function ParentGateModal({ open, onClose, onUnlock, reason }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl animate-fade-in-up">
        <ParentGate reason={reason} onCancel={onClose} onUnlock={() => { onUnlock(); onClose(); }} />
      </div>
    </div>
  );
}
