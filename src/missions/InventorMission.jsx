import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLearner } from '../context/LearnerContext';
import MissionHeader from '../components/MissionHeader';
import CurioCoach from '../components/CurioCoach';

const TARGET_COINS = 25;
const MAX_STICKS = 12;

const DESIGNS = {
  beam: {
    name: 'Beam', icon: '➖', factor: 1.5,
    blurb: 'A flat plank across the gap.',
    fail: 'A flat beam bends in the middle when weight pushes down. Try a shape that spreads the force.',
  },
  arch: {
    name: 'Arch', icon: '🌈', factor: 2,
    blurb: 'A curve that pushes weight out to the sides.',
    fail: 'So close! The arch pushes weight out to the sides. Can you find an even stronger shape?',
  },
  truss: {
    name: 'Truss', icon: '🔺', factor: 3,
    blurb: 'Triangles joined together.',
    fail: 'Triangles are strong — but you need a few more sticks.',
  },
};

const capacityOf = (design, sticks) => Math.floor(DESIGNS[design].factor * sticks);
const MIN_STICKS_TO_WIN = Math.ceil(TARGET_COINS / DESIGNS.truss.factor);

function BridgeDrawing({ design, failed, truckX, coins }) {
  const stroke = failed ? '#e11d48' : '#5B42F3';
  const trussPoints = Array.from({ length: 7 }, (_, i) => `${80 + i * 40},${i % 2 === 0 ? 110 : 72}`).join(' ');

  return (
    <svg viewBox="0 0 400 200" className="w-full max-w-xl mx-auto" role="img" aria-label={`${DESIGNS[design].name} bridge`}>
      <rect x="0" y="110" width="80" height="90" rx="6" fill="#a3a3a3" />
      <rect x="320" y="110" width="80" height="90" rx="6" fill="#a3a3a3" />
      <path d="M80 200 Q200 170 320 200 Z" fill="#7dd3fc" opacity="0.6" />

      <g
        style={{
          transformOrigin: '200px 110px',
          transition: 'transform 0.6s ease-in',
          transform: failed ? (design === 'beam' ? 'translateY(30px) scaleY(1.2)' : 'translateY(22px) rotate(4deg)') : 'none',
        }}
      >
        <line x1="80" y1="110" x2="320" y2="110" stroke={stroke} strokeWidth="8" strokeLinecap="round" />
        {design === 'arch' && (
          <>
            <path d="M80 160 Q200 60 320 160" fill="none" stroke={stroke} strokeWidth="6" />
            {[120, 160, 240, 280].map(x => (
              <line key={x} x1={x} y1="110" x2={x} y2={x === 120 || x === 280 ? 133 : 115} stroke={stroke} strokeWidth="3" />
            ))}
          </>
        )}
        {design === 'truss' && (
          <>
            <polyline points={trussPoints} fill="none" stroke={stroke} strokeWidth="4" strokeLinejoin="round" />
            <line x1="120" y1="72" x2="280" y2="72" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
          </>
        )}
      </g>

      <text x="0" y="100" fontSize="30" textAnchor="middle" style={{ transform: `translateX(${truckX}px)`, transition: 'transform 2s ease-in-out' }}>🚚</text>
      {coins > 0 && (
        <text x="200" y="30" fontSize="16" textAnchor="middle" fill="#1A1A1A" fontWeight="bold">
          🪙 {coins} / {TARGET_COINS} coins
        </text>
      )}
    </svg>
  );
}

function ShapeTest() {
  const [pressed, setPressed] = useState(false);
  return (
    <div className="bg-curio-light rounded-2xl p-6">
      <div className="flex justify-center gap-12 items-end mb-6 h-32">
        <div className="text-center">
          <div
            className="w-24 h-24 border-4 border-curio-primary mx-auto transition-transform duration-500"
            style={{ transform: pressed ? 'skewX(28deg) scaleY(0.75)' : 'none', transformOrigin: 'bottom' }}
          />
          <div className="text-sm font-bold mt-2 text-gray-600">Square</div>
        </div>
        <div className="text-center">
          <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto">
            <polygon points="50,6 96,94 4,94" fill="none" stroke="#5B42F3" strokeWidth="6" strokeLinejoin="round" />
          </svg>
          <div className="text-sm font-bold mt-2 text-gray-600">Triangle</div>
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={() => setPressed(p => !p)}
          className="bg-curio-dark text-white font-bold px-6 py-2 rounded-full hover:bg-black transition-colors"
        >
          {pressed ? '↺ Let go' : '👇 Push down on both'}
        </button>
        {pressed && (
          <p className="mt-4 text-gray-700 animate-fade-in-up">
            The square squashes into a diamond. The triangle <strong>keeps its shape</strong> — that’s why engineers use triangles!
          </p>
        )}
      </div>
    </div>
  );
}

export default function InventorMission() {
  const { learnerState, completeMission, addRealWorldResult } = useLearner();
  const navigate = useNavigate();
  const hasKit = learnerState.unlockedKits.includes('bridge');

  const [stage, setStage] = useState('learn'); // learn, design, test, do, create, complete
  const [design, setDesign] = useState('beam');
  const [sticks, setSticks] = useState(8);
  const [coins, setCoins] = useState(0);
  const [testState, setTestState] = useState('idle'); // idle, loading, failed, passed
  const [truckX, setTruckX] = useState(30);
  const [doneSteps, setDoneSteps] = useState([]);
  const [hack, setHack] = useState({ design: 'truss', coins: '', name: '' });
  const [coachNote, setCoachNote] = useState(null); // { text, demo }

  const capacity = capacityOf(design, sticks);

  useEffect(() => {
    if (testState !== 'loading') return undefined;
    const timer = setTimeout(() => {
      if (coins + 1 > capacity) {
        setTestState('failed');
      } else if (coins + 1 >= TARGET_COINS) {
        setCoins(TARGET_COINS);
        setTestState('passed');
        setTruckX(370);
      } else {
        setCoins(c => c + 1);
      }
    }, 90);
    return () => clearTimeout(timer);
  }, [testState, coins, capacity]);

  const startTest = () => {
    setCoins(0);
    setTruckX(30);
    setTestState('loading');
    setStage('test');
  };

  const backToDesign = () => {
    setTestState('idle');
    setCoins(0);
    setTruckX(30);
    setStage('design');
  };

  const doSteps = hasKit
    ? ['Open the Bridge Builder Kit and lay out the 12 sticks and connectors.', 'Build a truss bridge using triangles.', 'Rest it between two books and load coins into the truck one at a time.']
    : ['Put two books 15 cm apart on a table.', 'Make three paper bridges: flat, curved (arch), and folded zig-zag (triangles).', 'Add ₹1 coins one at a time. Count how many each bridge holds.'];

  const toggleStep = (i) => setDoneSteps(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  const submitHack = (e) => {
    e.preventDefault();
    const count = Number(hack.coins);
    if (!Number.isFinite(count) || count < 0) return;
    const bridgeName = hack.name.trim() || 'My Bridge';
    const designName = hack.design === 'own' ? 'own-design' : DESIGNS[hack.design].name.toLowerCase();
    addRealWorldResult({
      missionId: 'inventorMission',
      title: `🌉 ${bridgeName}`,
      detail: `Built a ${designName} bridge that held ${count} coin${count === 1 ? '' : 's'}${hasKit ? ' (Bridge Builder Kit)' : ' (paper & books)'}.`
        + (coachNote && !coachNote.demo ? ` Curio Coach: ${coachNote.text}` : ''),
    });
    completeMission('inventorMission', 200, { ProblemSolving: 8, Math: 4, Creativity: 4 }, 'Young Engineer');
    setStage('complete');
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <MissionHeader title="Build a Bridge" icon="💡" />

      <div className="flex flex-wrap justify-center gap-2 mb-6 text-xs font-bold">
        {[['learn', 'LEARN'], ['design', 'PLAY'], ['do', 'DO'], ['create', 'CREATE']].map(([id, label]) => {
          const order = ['learn', 'design', 'test', 'do', 'create', 'complete'];
          const active = order.indexOf(stage) >= order.indexOf(id);
          return (
            <span key={id} className={`px-3 py-1 rounded-full ${active ? 'bg-curio-primary text-white' : 'bg-gray-200 text-gray-500'}`}>{label}</span>
          );
        })}
        {hasKit && <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800">🧰 Kit mode</span>}
      </div>

      {stage === 'learn' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-2">The Village Needs a Bridge</h2>
          <p className="text-xl text-gray-700 mb-6">
            Kabir’s village is across a stream. The delivery truck must carry <strong>{TARGET_COINS} coins’ worth</strong> of supplies across.
            First — which shape is strongest?
          </p>
          <ShapeTest />
          <div className="text-center mt-8">
            <button onClick={() => setStage('design')} className="bg-curio-primary text-white font-bold py-3 px-8 rounded-full hover:opacity-90">
              Let’s design a bridge →
            </button>
          </div>
        </div>
      )}

      {stage === 'design' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-2 text-center">Design Your Bridge</h2>
          <p className="text-gray-600 text-center mb-6">
            Hold {TARGET_COINS} coins using as <strong>few sticks</strong> as possible. You have {MAX_STICKS} sticks.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {Object.entries(DESIGNS).map(([id, d]) => (
              <button
                key={id}
                onClick={() => setDesign(id)}
                aria-pressed={design === id}
                className={`p-4 rounded-2xl border-2 text-left transition-colors ${design === id ? 'border-curio-primary bg-curio-primary/5' : 'border-gray-100 hover:border-gray-300'}`}
              >
                <div className="text-2xl">{d.icon}</div>
                <div className="font-bold">{d.name}</div>
                <div className="text-sm text-gray-500">{d.blurb}</div>
              </button>
            ))}
          </div>

          <BridgeDrawing design={design} failed={false} truckX={30} coins={0} />

          <div className="max-w-md mx-auto mt-6">
            <label className="font-bold text-gray-700 flex justify-between mb-2" htmlFor="sticks">
              <span>Sticks used</span><span className="text-curio-primary">{sticks} / {MAX_STICKS}</span>
            </label>
            <input id="sticks" type="range" min="4" max={MAX_STICKS} value={sticks} onChange={(e) => setSticks(Number(e.target.value))} className="w-full accent-curio-primary" />
          </div>

          <div className="text-center mt-8">
            <button onClick={startTest} className="bg-curio-primary text-white font-bold py-3 px-10 rounded-full hover:opacity-90">
              🚚 Test it!
            </button>
          </div>
        </div>
      )}

      {stage === 'test' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-center">{DESIGNS[design].name} bridge · {sticks} sticks</h2>
          <BridgeDrawing design={design} failed={testState === 'failed'} truckX={truckX} coins={coins} />

          {testState === 'failed' && (
            <div className="text-center mt-6 animate-fade-in-up">
              <p className="text-xl font-bold text-rose-600 mb-2">Crack! It held {capacity} coins.</p>
              <p className="text-gray-700 mb-6">{DESIGNS[design].fail}</p>
              <button onClick={backToDesign} className="bg-curio-dark text-white font-bold py-3 px-8 rounded-full hover:bg-black">Redesign →</button>
            </div>
          )}

          {testState === 'passed' && (
            <div className="text-center mt-6 animate-fade-in-up">
              <p className="text-xl font-bold text-green-600 mb-2">It holds! 🎉</p>
              <p className="text-gray-700 mb-6">
                {sticks <= MIN_STICKS_TO_WIN
                  ? `Perfect engineering — ${sticks} sticks is the fewest possible.`
                  : `Great bridge! Engineers also save materials — can you do it with fewer than ${sticks} sticks?`}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                {sticks > MIN_STICKS_TO_WIN && (
                  <button onClick={backToDesign} className="bg-white border-2 border-curio-primary text-curio-primary font-bold py-3 px-6 rounded-full">Try fewer sticks</button>
                )}
                <button onClick={() => setStage('do')} className="bg-curio-primary text-white font-bold py-3 px-8 rounded-full hover:opacity-90">Build it for real →</button>
              </div>
            </div>
          )}
        </div>
      )}

      {stage === 'do' && (
        <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-6 sm:p-8 shadow-sm border border-green-100 animate-fade-in-up">
          <div className="text-xs font-bold uppercase tracking-widest text-green-700 mb-2">Real-world mission</div>
          <h2 className="text-2xl font-bold mb-2">{hasKit ? 'Build it with your Bridge Builder Kit' : 'Build it with paper and books'}</h2>
          <p className="text-gray-600 mb-6">
            {hasKit ? 'Everything you need is in the box.' : 'No kit needed — everything is already at home. Ask a grown-up to help.'}
          </p>
          <ul className="space-y-3 mb-8">
            {doSteps.map((step, i) => (
              <li key={step}>
                <button
                  onClick={() => toggleStep(i)}
                  className={`w-full text-left flex gap-3 items-center p-4 rounded-2xl border-2 transition-colors ${doneSteps.includes(i) ? 'border-green-400 bg-green-50' : 'border-gray-100 bg-white hover:border-gray-300'}`}
                >
                  <span className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center font-bold text-sm ${doneSteps.includes(i) ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {doneSteps.includes(i) ? '✓' : i + 1}
                  </span>
                  <span className="text-gray-800">{step}</span>
                </button>
              </li>
            ))}
          </ul>
          {!hasKit && (
            <p className="text-sm text-gray-500 mb-6">
              🧰 Want the real thing? The <Link to="/kits" className="text-curio-primary font-bold hover:underline">Curio Build Box</Link> includes sticks, connectors and a toy truck.
            </p>
          )}
          <div className="text-center">
            <button onClick={() => setStage('create')} className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700">
              I built it! →
            </button>
          </div>
        </div>
      )}

      {stage === 'create' && (
        <div className="space-y-6 animate-fade-in-up">
        <CurioCoach
          mission="bridge"
          design={hack.design}
          coins={hack.coins}
          onFeedback={(fb, demo) => {
            setCoachNote({ text: fb.parent_note, demo });
          }}
        />
        <form onSubmit={submitHack} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-2">Hack it!</div>
          <h2 className="text-2xl font-bold mb-6">Log your real bridge</h2>

          <div className="space-y-6">
            <div>
              <div className="font-bold text-gray-700 mb-2">Which design did you build?</div>
              <div className="flex flex-wrap gap-2">
                {[...Object.entries(DESIGNS).map(([id, d]) => [id, `${d.icon} ${d.name}`]), ['own', '✨ My own idea']].map(([id, label]) => (
                  <button
                    type="button"
                    key={id}
                    onClick={() => setHack(h => ({ ...h, design: id }))}
                    className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${hack.design === id ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <label className="block">
              <span className="font-bold text-gray-700 block mb-2">How many coins did it hold?</span>
              <input
                type="number" min="0" max="500" required inputMode="numeric"
                value={hack.coins}
                onChange={(e) => setHack(h => ({ ...h, coins: e.target.value }))}
                className="w-32 border-2 border-gray-200 rounded-xl px-3 py-2 font-bold focus:border-purple-500 outline-none"
              />
            </label>
            <label className="block">
              <span className="font-bold text-gray-700 block mb-2">Name your bridge</span>
              <input
                type="text" maxLength={30} placeholder="e.g. The Mighty Triangle"
                value={hack.name}
                onChange={(e) => setHack(h => ({ ...h, name: e.target.value }))}
                className="w-full max-w-sm border-2 border-gray-200 rounded-xl px-3 py-2 focus:border-purple-500 outline-none"
              />
            </label>
          </div>

          <button type="submit" disabled={hack.coins === ''} className="mt-8 w-full sm:w-auto bg-purple-600 text-white font-bold py-3 px-10 rounded-full hover:bg-purple-700 disabled:opacity-40">
            Save to my Engineer’s Log
          </button>
        </form>
        </div>
      )}

      {stage === 'complete' && (
        <div className="bg-white rounded-3xl p-8 shadow-sm text-center animate-fade-in-up">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-4xl font-extrabold text-curio-primary mb-2">MISSION COMPLETE</h2>
          <p className="text-xl text-gray-700 mb-8">
            You designed it, tested it, and built it for real. That’s what engineers do!
          </p>
          <div className="bg-curio-light rounded-2xl p-6 inline-block mb-8">
            <h3 className="font-bold text-lg mb-4">Rewards Unlocked!</h3>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-4xl mb-2">⭐</div>
                <div className="font-bold text-curio-primary">+200 XP</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🏅</div>
                <div className="font-bold text-yellow-500">Young Engineer Badge</div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">Your result has been shared with your Parent Dashboard.</p>
          </div>
          <div>
            <button onClick={() => navigate('/world')} className="bg-curio-dark text-white font-bold py-3 px-8 rounded-full hover:bg-black transition-colors">
              Return to World Map
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
