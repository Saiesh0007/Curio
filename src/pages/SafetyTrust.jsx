import React, { useState } from 'react';
import ParentGate from '../components/ParentGate';

const COMMITMENTS = [
  { icon: '🚫', title: 'No ads. Ever.', text: 'Children never see advertising, and we never sell or share their data with advertisers.' },
  { icon: '🔒', title: 'Parent-controlled accounts', text: 'Parents create the account, give consent, and can view or delete their child’s data at any time.' },
  { icon: '🙈', title: 'No strangers, no public profiles', text: 'No open chat and no public leaderboards. Creations are shared only with family, or with the class if a teacher sets it up.' },
  { icon: '📷', title: 'Real-world photos stay private', text: 'Photos from real-world missions are visible only to the family and are never used for marketing.' },
  { icon: '🛒', title: 'No purchases by children', text: 'All payments sit behind a parent gate. There are no loot boxes, coins to buy, or pay-to-win rewards.' },
  { icon: '⏳', title: 'Healthy screen time', text: 'Short missions that end with “now go and try it in the real world” — no infinite feeds or streak pressure.' },
];

const DATA_TABLE = [
  { what: 'Child’s first name & age', why: 'To pick age-appropriate missions', collected: true },
  { what: 'Mission progress & skills', why: 'To show parents progress and suggest next steps', collected: true },
  { what: 'Real-world mission photos', why: 'Optional — saved only to the family’s private gallery', collected: true },
  { what: 'Child’s surname, phone, email, location', why: 'Not needed for learning', collected: false },
  { what: 'Advertising or tracking IDs', why: 'We don’t run ads or behavioural tracking', collected: false },
];

const PRINCIPLES = [
  'Rewards encourage learning. They don’t replace it.',
  'We describe “emerging strengths” — we never label or diagnose a child.',
  'Every mission is reviewed for age-appropriate content before release.',
];

function ParentGateDemo() {
  const [unlocked, setUnlocked] = useState(false);

  if (unlocked) {
    return (
      <div className="text-center animate-fade-in-up">
        <div className="text-5xl mb-3">🔓</div>
        <p className="font-bold text-green-700 text-lg">Parent area unlocked</p>
        <p className="text-gray-600 text-sm mt-1">Settings, payments and data controls live here — out of a 6-year-old’s reach.</p>
        <button onClick={() => setUnlocked(false)} className="mt-4 text-sm font-bold text-curio-primary hover:underline">
          Lock again
        </button>
      </div>
    );
  }

  return <ParentGate remember={false} onUnlock={() => setUnlocked(true)} />;
}

const GATE_LAYERS = [
  { icon: '🔤', text: 'Numbers written in words need reading and place-value skills most 5–8 year olds don’t have yet.' },
  { icon: '🎲', text: 'A new number every time, so a child can’t memorise the answer.' },
  { icon: '⏳', text: '3 wrong tries locks the gate for 30 seconds to stop guessing.' },
  { icon: '🔑', text: 'In the full product, payments and data deletion also need the parent’s account password or OTP.' },
];

export default function SafetyTrust() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <header className="mb-12 text-center">
        <div className="text-5xl mb-4">🛡️</div>
        <h1 className="text-4xl font-extrabold text-curio-dark mb-4">Built for Children. Trusted by Parents.</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Safety isn’t a feature we added later. It shapes every decision about what Curio collects, shows, and rewards.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {COMMITMENTS.map(c => (
          <div key={c.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-4xl mb-3">{c.icon}</div>
            <h2 className="font-bold text-lg mb-1 text-curio-dark">{c.title}</h2>
            <p className="text-gray-600">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <section className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-2">What we collect — and what we don’t</h2>
          <p className="text-gray-500 mb-6">Only what’s needed to help a child learn.</p>
          <ul className="divide-y divide-gray-100">
            {DATA_TABLE.map(row => (
              <li key={row.what} className="py-3 flex gap-4 items-start">
                <span className={`mt-0.5 shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${row.collected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {row.collected ? '✓' : '✕'}
                </span>
                <div>
                  <div className="font-bold text-gray-800">{row.what}</div>
                  <div className="text-sm text-gray-500">{row.why}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-curio-primary/20 flex flex-col">
          <div className="text-xs font-bold text-curio-primary uppercase tracking-widest text-center mb-4">Try it: Parent Gate</div>
          <ParentGateDemo />
          <ul className="mt-6 pt-6 border-t border-gray-100 space-y-3">
            {GATE_LAYERS.map(l => (
              <li key={l.text} className="flex gap-3 text-sm text-gray-600 text-left">
                <span className="text-lg leading-none">{l.icon}</span>
                <span>{l.text}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="bg-curio-light rounded-3xl p-6 sm:p-8 border border-gray-200 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Our learning principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRINCIPLES.map(p => (
            <div key={p} className="bg-white rounded-2xl p-5 font-medium text-gray-700 text-center shadow-sm">“{p}”</div>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 rounded-3xl p-6 sm:p-8 border border-blue-100">
        <h2 className="text-xl font-bold mb-2 text-blue-900">Compliance roadmap</h2>
        <p className="text-blue-800">
          Curio is designed around India’s Digital Personal Data Protection Act, 2023, which requires verifiable parental consent
          for children’s data and prohibits tracking, behavioural monitoring and targeted advertising aimed at children.
          A formal legal and privacy review is planned before public launch.
        </p>
        <p className="text-xs text-blue-700/70 mt-4">
          Prototype note: the commitments on this page are product design principles. They are not yet independently audited or certified.
        </p>
      </section>
    </div>
  );
}
