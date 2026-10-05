import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLearner } from '../context/LearnerContext';
import { ParentGateModal } from '../components/ParentGate';

const BOX_STEPS = [
  { icon: '📦', title: 'Box arrives', text: 'One build kit a month, delivered home.' },
  { icon: '📱', title: 'Scan the QR', text: 'Unlocks the matching Curio mission.' },
  { icon: '💡', title: 'Learn', text: 'A short, visual explanation of the science.' },
  { icon: '🔧', title: 'Build', text: 'Make a real, working toy with your hands.' },
  { icon: '🧪', title: 'Test', text: 'Challenge it, measure it, log the result.' },
  { icon: '🛠️', title: 'Hack it', text: 'Change the design and make it better.' },
];

const KITS = [
  { id: 'bridge', month: 'Month 1', name: 'Bridge Builder', icon: '🌉', contents: 'Craft sticks, connectors, toy truck, coin weights', mission: "Inventor's Workshop", path: '/world/inventor', skills: 'Shapes · forces · design', ready: true },
  { id: 'coins', month: 'Month 2', name: 'Coin Sorter Bank', icon: '🪙', contents: 'Cardboard sorter that separates coins by size', mission: 'Marketplace', path: '/world/marketplace', skills: 'Money · counting · saving', ready: true },
  { id: 'seeds', month: 'Month 3', name: 'Seed Lab', icon: '🌱', contents: 'Mini greenhouse, seed pods, soil discs, growth chart', mission: 'Science Lab', path: '/world/science', skills: 'Living things · variables', ready: true },
  { id: 'rocket', month: 'Month 4', name: 'Balloon Rocket Racer', icon: '🎈', contents: 'Balloons, straw launcher, string track, rocket card', mission: 'Space Station', path: '/world/space', skills: 'Push & pull · air', ready: true },
  { id: 'puppets', month: 'Month 5', name: 'Shadow Puppet Theatre', icon: '🎭', contents: 'Fold-out stage, puppet cards, torch', mission: 'Story Village', skills: 'Storytelling · light', ready: false },
  { id: 'detective', month: 'Month 6', name: 'Nature Detective', icon: '🔍', contents: 'Magnifier, leaf press, field cards', mission: 'Explorer Forest', skills: 'Observation · classifying', ready: false },
];

const UNIT_ECONOMICS = [
  { label: 'Kit materials', value: 280 },
  { label: 'Packaging & printed guide', value: 60 },
  { label: 'Shipping', value: 90 },
  { label: 'Payment fees & replacements', value: 40 },
  { label: 'Content & support', value: 50 },
];
const BOX_PRICE = 899;

const WHY = [
  { icon: '💰', title: 'Higher revenue per family', text: 'Box subscribers pay roughly 2–3× an app-only subscription.' },
  { icon: '🔁', title: 'Built-in retention', text: 'A new box every month gives children something to look forward to.' },
  { icon: '🎁', title: 'The box markets itself', text: 'Unboxing, birthday gifts and school show-and-tell bring in new families.' },
  { icon: '🏰', title: 'Hard for app-only rivals to copy', text: 'Kit design, sourcing and delivery are operational know-how, not just code.' },
];

const RISKS = [
  { risk: 'Physical products have thinner margins than apps', fix: 'Low-cost local materials; app-only Premium stays the main plan; box is an add-on.' },
  { risk: 'Inventory and delivery are complex', fix: 'Start with pre-orders in one city (Pune) and small batches before scaling.' },
  { risk: 'Families without the box feel left out', fix: 'Every mission also works with household items — the box makes it easier, not required.' },
];

function MockQr() {
  // Decorative QR-style pattern for the demo box (not a real code).
  const cells = [
    '1111111010111', '1000001001001', '1011101011101', '1011101000101', '1011101010101', '1000001001001',
    '1111111010111', '0000000011000', '1101011100110', '0110100101011', '1011011010100', '0100110011010', '1110101101011',
  ];
  return (
    <svg viewBox="0 0 13 13" className="w-20 h-20" shapeRendering="crispEdges" aria-hidden="true">
      <rect width="13" height="13" fill="white" />
      {cells.flatMap((row, y) => [...row].map((c, x) => (c === '1' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#1A1A1A" /> : null)))}
    </svg>
  );
}

export default function BuildBox() {
  const { learnerState, unlockKit } = useLearner();
  const [scanning, setScanning] = useState(false);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [gateOpen, setGateOpen] = useState(false);
  const [preordered, setPreordered] = useState(false);
  const bridgeUnlocked = learnerState.unlockedKits.includes('bridge');

  const totalCost = UNIT_ECONOMICS.reduce((sum, row) => sum + row.value, 0);
  const contribution = BOX_PRICE - totalCost;

  const scan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      unlockKit('bridge');
    }, 1200);
  };

  const submitCode = (e) => {
    e.preventDefault();
    if (code.trim().toUpperCase().replace(/\s/g, '') === 'CURIO-BRIDGE') {
      setCodeError('');
      unlockKit('bridge');
    } else {
      setCodeError('That code didn’t match. Try CURIO-BRIDGE (printed inside the demo box lid).');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <header className="mb-12 text-center">
        <div className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1 rounded-full mb-4">NEW · Physical + Digital</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-curio-dark mb-4">Curio Build Box</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          A monthly box with a hands-on build kit, paired with a Curio mission. <strong className="text-curio-dark">Build it. Test it. Hack it.</strong>
        </p>
      </header>

      <section className="bg-curio-dark text-white rounded-3xl p-6 sm:p-10 mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-curio-secondary mb-3">The inspiration</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">A proven idea, rebuilt for younger Indian learners</h2>
          <p className="text-gray-300 mb-4">
            Engineer and YouTuber Mark Rober’s <strong className="text-white">CrunchLabs Build Box</strong> showed that children love a monthly box where they
            build a real toy and learn the science behind it.
          </p>
          <p className="text-gray-300">
            Curio adapts the model for <strong className="text-white">ages 5–8 in India</strong>: simpler builds, local materials, ₹ pricing, guides in
            English, Hindi and Marathi — and each build connects to a full Learn → Play → Do → Create mission with parent insights.
          </p>
          <p className="text-xs text-gray-500 mt-4">Curio is an independent project and is not affiliated with CrunchLabs or Mark Rober.</p>
        </div>
        <div className="flex justify-center">
          <div className="relative w-64 h-56">
            <div className="absolute inset-x-4 bottom-0 h-40 bg-amber-600 rounded-2xl shadow-2xl"></div>
            <div className="absolute inset-x-0 top-6 h-12 bg-amber-500 rounded-xl shadow-lg -rotate-6 origin-left"></div>
            <div className="absolute inset-x-8 bottom-6 h-28 bg-amber-700/60 rounded-xl flex items-center justify-around text-4xl">
              <span>🪵</span><span>🔩</span><span>🚚</span><span>📘</span>
            </div>
            <div className="absolute -right-2 bottom-24 bg-white text-curio-dark text-xs font-extrabold px-3 py-1 rounded-full rotate-6 shadow">CURIO BUILD BOX</div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-extrabold text-center text-curio-dark mb-8">How a box works</h2>
        <ol className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {BOX_STEPS.map((s, i) => (
            <li key={s.title} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-xs font-bold text-gray-400">STEP {i + 1}</div>
              <div className="font-bold text-gray-800">{s.title}</div>
              <div className="text-xs text-gray-500 mt-1">{s.text}</div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-12 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-curio-primary/20">
        <div className="text-xs font-bold text-curio-primary uppercase tracking-widest text-center mb-2">Try it: unlock a box</div>
        <h2 className="text-2xl font-bold text-center mb-8">Your Bridge Builder Kit just arrived</h2>

        {bridgeUnlocked ? (
          <div className="text-center animate-fade-in-up">
            <div className="text-6xl mb-3">🔓</div>
            <p className="text-xl font-bold text-green-700 mb-2">Bridge Builder Kit unlocked!</p>
            <p className="text-gray-600 mb-6">The Inventor’s Workshop mission now uses your real sticks, connectors and truck.</p>
            <Link to="/world/inventor" className="inline-block bg-curio-primary text-white font-bold py-3 px-8 rounded-full hover:opacity-90">
              Start the Build a Bridge mission →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center">
              <div className={`bg-amber-100 border-2 border-amber-300 rounded-2xl p-6 flex items-center gap-4 transition-all ${scanning ? 'ring-4 ring-curio-secondary animate-pulse' : ''}`}>
                <MockQr />
                <div>
                  <div className="font-extrabold text-amber-900">🌉 Bridge Builder</div>
                  <div className="text-xs text-amber-800">Box 1 · Ages 5–8</div>
                </div>
              </div>
              <button onClick={scan} disabled={scanning} className="mt-6 bg-curio-primary text-white font-bold py-3 px-8 rounded-full hover:opacity-90 disabled:opacity-60">
                {scanning ? 'Scanning…' : '📷 Scan the box QR'}
              </button>
            </div>
            <form onSubmit={submitCode} className="text-center md:text-left">
              <p className="font-bold text-gray-700 mb-2">No camera? Type the code inside the lid:</p>
              <div className="flex gap-2 justify-center md:justify-start">
                <input
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setCodeError(''); }}
                  placeholder="CURIO-BRIDGE"
                  aria-label="Box code"
                  className="w-44 border-2 border-gray-200 rounded-xl px-3 py-2 font-bold uppercase tracking-wide focus:border-curio-primary outline-none"
                />
                <button type="submit" className="bg-curio-dark text-white font-bold px-5 py-2 rounded-xl hover:bg-black">Unlock</button>
              </div>
              {codeError && <p role="status" className="text-sm text-amber-700 mt-3">{codeError}</p>}
              <p className="text-sm text-gray-500 mt-4">No box? The mission still works with paper, books and coins from home.</p>
            </form>
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-extrabold text-center text-curio-dark mb-2">The first six boxes</h2>
        <p className="text-center text-gray-500 mb-8">Each kit unlocks a mission in the Curio world.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {KITS.map(k => (
            <div key={k.id} className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col ${k.ready ? '' : 'opacity-60'}`}>
              <div className="flex justify-between items-start mb-3">
                <div className="text-4xl">{k.icon}</div>
                <span className="text-xs font-bold text-gray-400">{k.month}</span>
              </div>
              <h3 className="font-bold text-lg text-curio-dark">{k.name}</h3>
              <p className="text-sm text-gray-600 mb-3 flex-grow">{k.contents}</p>
              <div className="text-xs font-bold text-curio-primary mb-3">{k.skills}</div>
              {k.ready ? (
                <Link to={k.path} className="text-sm font-bold text-green-700 hover:underline">✓ Pairs with {k.mission} →</Link>
              ) : (
                <span className="text-sm font-bold text-gray-400">🔒 {k.mission} mission in development</span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Plans</h2>
          <div className="space-y-4">
            <div className="border-2 border-gray-100 rounded-2xl p-5">
              <div className="flex justify-between items-baseline">
                <div className="font-bold text-lg">Build Box</div>
                <div className="text-2xl font-extrabold">₹{BOX_PRICE}<span className="text-sm text-gray-500 font-medium">/mo</span></div>
              </div>
              <p className="text-sm text-gray-500">One kit a month + its matching missions</p>
            </div>
            <div className="border-2 border-curio-primary rounded-2xl p-5 bg-curio-primary/5">
              <div className="flex justify-between items-baseline">
                <div className="font-bold text-lg text-curio-primary">Build Box + Premium</div>
                <div className="text-2xl font-extrabold">₹1,099<span className="text-sm text-gray-500 font-medium">/mo</span></div>
              </div>
              <p className="text-sm text-gray-500">Everything in Premium Family, plus the monthly box</p>
            </div>
            <div className="border-2 border-gray-100 rounded-2xl p-5">
              <div className="font-bold text-lg text-green-700">Classroom Packs</div>
              <p className="text-sm text-gray-500">30 kits + teacher guide, ordered alongside a school licence</p>
            </div>
          </div>
          <button onClick={() => setGateOpen(true)} disabled={preordered} className="mt-6 w-full bg-curio-primary text-white font-bold py-3 rounded-full hover:opacity-90 disabled:opacity-60">
            {preordered ? '✓ You’re on the pre-order list' : 'Pre-order a box'}
          </button>
          {preordered && (
            <p role="status" className="text-sm text-green-700 mt-3 text-center animate-fade-in-up">Thanks! Demo only — no payment was taken.</p>
          )}
          <p className="text-xs text-gray-400 mt-3 text-center">Purchases are protected by the parent gate.</p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-1">Unit economics per box</h2>
          <p className="text-sm text-gray-500 mb-6">At ₹{BOX_PRICE}/month</p>
          <ul className="space-y-3 mb-4">
            {UNIT_ECONOMICS.map(row => (
              <li key={row.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{row.label}</span>
                  <span className="font-bold text-gray-800">₹{row.value}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-400 rounded-full" style={{ width: `${(row.value / BOX_PRICE) * 100}%` }}></div>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t pt-4 flex justify-between items-baseline">
            <span className="font-bold text-gray-700">Total cost</span>
            <span className="font-bold">₹{totalCost}</span>
          </div>
          <div className="flex justify-between items-baseline mt-2">
            <span className="font-bold text-green-700">Contribution per box</span>
            <span className="text-2xl font-extrabold text-green-700">₹{contribution} <span className="text-sm">({Math.round((contribution / BOX_PRICE) * 100)}%)</span></span>
          </div>
          <p className="text-xs text-gray-400 mt-4">Illustrative targets, excluding GST. To be validated with supplier and courier quotes before launch.</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-extrabold text-center text-curio-dark mb-8">Why the box matters for the business</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY.map(w => (
            <div key={w.title} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="text-3xl mb-2">{w.icon}</div>
              <h3 className="font-bold text-gray-800 mb-1">{w.title}</h3>
              <p className="text-sm text-gray-600">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-amber-50 rounded-3xl p-6 sm:p-8 border border-amber-100">
        <h2 className="text-xl font-bold mb-4 text-amber-900">Risks we’re planning for</h2>
        <ul className="space-y-3">
          {RISKS.map(r => (
            <li key={r.risk} className="bg-white rounded-2xl p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="font-bold text-gray-800">⚠️ {r.risk}</div>
              <div className="text-gray-600">→ {r.fix}</div>
            </li>
          ))}
        </ul>
      </section>

      <ParentGateModal
        open={gateOpen}
        onClose={() => setGateOpen(false)}
        onUnlock={() => setPreordered(true)}
        reason="Only a parent can place an order."
      />
    </div>
  );
}
