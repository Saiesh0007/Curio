import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ISLANDS = [
  { name: 'Marketplace', icon: '🏪', x: 18, y: 22, path: '/world/marketplace' },
  { name: 'Science Lab', icon: '🔬', x: 50, y: 13, path: '/world/science' },
  { name: 'Space Station', icon: '🚀', x: 82, y: 24, path: '/world/space' },
  { name: 'Creative Studio', icon: '🎨', x: 22, y: 60, path: '/world/creative' },
  { name: "Inventor's Workshop", icon: '💡', x: 56, y: 48, path: '/world/inventor', ai: true },
  { name: 'Explorer Forest', icon: '🌳', x: 82, y: 68, soon: true },
  { name: 'Story Village', icon: '📖', x: 46, y: 86, soon: true },
];

const LOOP = [
  { label: 'LEARN', icon: '💡', tone: 'text-blue-600 bg-blue-50', text: 'A short, visual idea. No lectures.' },
  { label: 'PLAY', icon: '🎮', tone: 'text-green-600 bg-green-50', text: 'A challenge where choices have consequences.' },
  { label: 'DO', icon: '🌍', tone: 'text-amber-600 bg-amber-50', text: 'A real-world mission with family.' },
  { label: 'CREATE', icon: '🎨', tone: 'text-purple-600 bg-purple-50', text: 'Build something new with what was learned.' },
];

const PROBLEMS = [
  { icon: '📺', problem: 'Screen time is mostly passive', answer: 'Children watch and tap. Curio asks them to decide, build and explain.' },
  { icon: '🧱', problem: 'Learning stays on the screen', answer: 'Every Curio mission ends with a real-world task at home.' },
  { icon: '👀', problem: 'Parents can’t see real progress', answer: 'Weekly emerging strengths and ideas to try together, in English, Hindi or Marathi.' },
];

const AUDIENCES = [
  { icon: '🧒', title: 'For Kids', text: 'Explore a world of missions, earn badges for learning, and build a gallery of your own creations.', to: '/world', cta: 'Explore the World' },
  { icon: '👨‍👩‍👧', title: 'For Parents', text: 'See emerging strengths, get activities to do together, and stay in control of data and purchases.', to: '/parents', cta: 'Parent Dashboard' },
  { icon: '🧑‍🏫', title: 'For Schools', text: 'Spot class-wide gaps, assign missions in one click, and map them to NCF-FS learning areas.', to: '/schools', cta: 'Teacher Mode' },
];

const SAFETY = ['🚫 No ads', '🔒 Parent gate', '🙈 No public profiles', '📷 Photos not stored', '🇮🇳 Designed around India’s DPDP Act'];

function WorldMap() {
  const navigate = useNavigate();
  return (
    <div className="relative w-full aspect-[5/4] rounded-[2rem] bg-gradient-to-br from-[#EEEBFF] via-[#F3F1FF] to-[#E3F8FF] border border-white shadow-2xl shadow-curio-primary/10 overflow-hidden">
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-curio-secondary/20 blur-3xl" aria-hidden="true"></div>
      <div className="absolute -bottom-20 -left-10 w-64 h-64 rounded-full bg-curio-primary/15 blur-3xl" aria-hidden="true"></div>

      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <path
          d="M18 22 Q34 8 50 13 T82 24 Q72 40 56 48 T22 60 Q28 82 46 86 T82 68"
          fill="none" stroke="#5B42F3" strokeOpacity="0.25" strokeWidth="3" strokeDasharray="6 8" strokeLinecap="round" vectorEffect="non-scaling-stroke"
        />
      </svg>

      {ISLANDS.map((isl, i) => (
        <button
          key={isl.name}
          type="button"
          disabled={isl.soon}
          onClick={() => isl.path && navigate(isl.path)}
          title={isl.soon ? `${isl.name} (coming soon)` : isl.name}
          className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group ${isl.soon ? 'cursor-default' : 'cursor-pointer'}`}
          style={{ left: `${isl.x}%`, top: `${isl.y}%` }}
        >
          <span
            className={`relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl text-2xl sm:text-4xl bg-white shadow-lg transition-transform ${
              isl.soon ? 'opacity-50 grayscale' : 'group-hover:-translate-y-1 group-hover:shadow-xl'
            } ${isl.ai ? 'ring-4 ring-curio-primary/30' : ''} animate-float`}
            style={{ animationDelay: `${i * 0.6}s` }}
          >
            {isl.icon}
            {isl.ai && (
              <span className="absolute -top-2 -right-3 bg-curio-primary text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shadow">AI</span>
            )}
          </span>
          <span className={`mt-1.5 hidden sm:block text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/80 ${isl.soon ? 'text-gray-400' : 'text-curio-dark'}`}>
            {isl.name}
          </span>
        </button>
      ))}

      <div className="absolute left-[4%] top-[38%] bg-white rounded-2xl shadow-lg px-3 py-2 text-xs sm:text-sm font-bold text-curio-primary animate-float" style={{ animationDelay: '1s' }}>
        ⭐ +200 XP
      </div>
      <div className="absolute right-[3%] top-[86%] bg-white rounded-2xl shadow-lg px-3 py-2 text-xs sm:text-sm font-bold text-amber-600 animate-float" style={{ animationDelay: '2.2s' }}>
        🏅 Young Engineer
      </div>
      <div className="absolute left-[64%] top-[38%] max-w-[34%] bg-curio-dark text-white rounded-2xl rounded-tl-sm shadow-xl px-3 py-2 text-[11px] sm:text-xs leading-snug">
        <span className="font-bold text-curio-secondary">Curio Coach:</span> I see lots of triangles! Try one more row. 🔺
      </div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="relative mx-auto w-64 sm:w-72 rounded-[2.5rem] bg-gray-900 p-3 shadow-2xl">
      <div className="rounded-[2rem] bg-white overflow-hidden text-curio-dark">
        <div className="bg-[#EFE8DB] p-4">
          <svg viewBox="0 0 200 110" className="w-full" role="img" aria-label="Photo of a stick bridge">
            <rect x="0" y="62" width="40" height="48" rx="3" fill="#7a5a3c" />
            <rect x="160" y="62" width="40" height="48" rx="3" fill="#7a5a3c" />
            <line x1="35" y1="62" x2="165" y2="62" stroke="#d6b070" strokeWidth="5" strokeLinecap="round" />
            <polyline points="35,62 51,36 67,62 83,36 99,62 115,36 131,62 147,36 165,62" fill="none" stroke="#d6b070" strokeWidth="4" strokeLinejoin="round" />
            <line x1="51" y1="36" x2="147" y2="36" stroke="#d6b070" strokeWidth="4" strokeLinecap="round" />
            {[86, 96, 106].map(x => <circle key={x} cx={x} cy="56" r="4" fill="#b8b8bf" />)}
          </svg>
        </div>
        <div className="p-3 space-y-2 text-[12px] leading-snug">
          <div className="bg-gray-100 rounded-xl p-2"><span className="font-bold">👀 I see:</span> a stick bridge with zig-zag triangles and three coins.</div>
          <div className="bg-gray-100 rounded-xl p-2"><span className="font-bold">🔬 Why:</span> triangles don’t squash, so they spread the weight.</div>
          <div className="bg-purple-50 text-purple-900 rounded-xl p-2"><span className="font-bold">🛠️ Next:</span> add one more row of triangles. Can it hold 30 coins?</div>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="-m-4 sm:-m-8">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-16 sm:pt-16 sm:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-curio-primary/10 text-curio-primary text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-6">
              For curious kids aged 5–8 · Made in India
            </div>
            <h1 className="font-display text-5xl sm:text-6xl xl:text-7xl font-extrabold leading-[1.05] text-curio-dark mb-6">
              Learning isn’t a lesson.<br />
              <span className="bg-gradient-to-r from-curio-primary to-[#00A9D6] bg-clip-text text-transparent">It’s an adventure.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8">
              Curio is a learning world where children <strong className="text-curio-dark">learn</strong> an idea, <strong className="text-curio-dark">play</strong> with it,
              <strong className="text-curio-dark"> do</strong> it in real life, and <strong className="text-curio-dark">create</strong> something new — with an AI coach that sees what they build.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
              <Link to="/world" className="bg-curio-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-curio-primary/30 hover:-translate-y-0.5 hover:shadow-xl transition-all">
                Explore the World →
              </Link>
              <Link to="/demo" className="bg-white text-curio-dark border-2 border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:border-curio-primary hover:text-curio-primary transition-colors">
                ▶ 4-stage demo
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-gray-500">
              <span><strong className="text-curio-dark">5</strong> interactive missions</span>
              <span><strong className="text-curio-dark">3</strong> languages: English · हिन्दी · मराठी</span>
              <span><strong className="text-curio-dark">0</strong> ads</span>
            </div>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <WorldMap />
            <p className="text-center text-xs text-gray-400 mt-3">Tap a place on the map to start a mission</p>
          </div>
        </div>
      </section>

      {/* The loop */}
      <section className="bg-curio-light py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-10">
            <div className="text-xs font-bold tracking-[0.3em] text-curio-primary mb-2">THE CURIO LOOP</div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-curio-dark">One idea. Four ways to master it.</h2>
          </div>
          <ol className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {LOOP.map((step, i) => (
              <li key={step.label} className="relative bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 ${step.tone}`}>{step.icon}</div>
                <div className="text-xs font-bold text-gray-400">STEP {i + 1}</div>
                <div className={`font-display text-2xl font-extrabold ${step.tone.split(' ')[0]}`}>{step.label}</div>
                <p className="text-sm text-gray-600 mt-1">{step.text}</p>
                {i < LOOP.length - 1 && <span className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-gray-300 text-xl" aria-hidden="true">→</span>}
              </li>
            ))}
          </ol>
          <div className="text-center mt-8">
            <Link to="/how-it-works" className="font-bold text-curio-primary hover:underline">See it step by step →</Link>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-10">
            <div className="text-xs font-bold tracking-[0.3em] text-curio-primary mb-2">WHY CURIO</div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-curio-dark">Screens teach answers. Life needs doers.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROBLEMS.map(p => (
              <div key={p.problem} className="rounded-3xl border border-gray-100 p-6 bg-gradient-to-b from-gray-50 to-white">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-bold text-lg text-gray-500 line-through decoration-rose-300 decoration-2 mb-2">{p.problem}</h3>
                <p className="text-curio-dark font-medium">{p.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curio Coach */}
      <section className="bg-curio-dark text-white py-16 sm:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-curio-secondary/15 text-curio-secondary text-xs font-bold tracking-widest px-3 py-1 rounded-full mb-4">✨ NEW · CURIO COACH</div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
              An AI coach that sees what children <span className="text-curio-secondary">build</span>.
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              Snap a photo of a real-world creation. Curio Coach looks at it and replies with what it sees, why it works, and one idea to try next,
              in English or Hindi.
            </p>
            <ul className="space-y-3 mb-8 text-gray-300">
              <li className="flex gap-3"><span className="text-curio-secondary">●</span> Vision + language AI on real objects, not quiz answers</li>
              <li className="flex gap-3"><span className="text-curio-secondary">●</span> A parent says yes first. Photos aren’t stored, and faces are never described.</li>
              <li className="flex gap-3"><span className="text-curio-secondary">●</span> Every result appears on the Parent Dashboard</li>
            </ul>
            <Link to="/world/inventor?coach=1" className="inline-block bg-curio-secondary text-curio-dark font-bold px-8 py-4 rounded-full hover:bg-white transition-colors">
              Try Curio Coach →
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-curio-primary/30 blur-3xl rounded-full" aria-hidden="true"></div>
            <div className="relative"><PhoneMock /></div>
          </div>
        </div>
      </section>

      {/* Build Box */}
      <section className="bg-curio-light py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-[2rem] p-8 sm:p-12 grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <div className="text-xs font-bold tracking-[0.3em] text-amber-700 mb-2">CURIO BUILD BOX</div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-curio-dark mb-3">Learning you can hold.</h2>
              <p className="text-gray-700 mb-6">
                A monthly hands-on kit (bridges, rockets, seed labs) that unlocks a matching mission when you scan the box.
                <strong> Build it. Test it. Hack it.</strong>
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/kits" className="bg-curio-dark text-white font-bold px-6 py-3 rounded-full hover:bg-black transition-colors">See the Build Box →</Link>
                <span className="text-sm text-gray-500">From ₹899/month · works with household items too</span>
              </div>
            </div>
            <div className="md:col-span-2 flex justify-center">
              <div className="relative w-56 h-44">
                <div className="absolute inset-x-3 bottom-0 h-32 bg-amber-600 rounded-2xl shadow-xl"></div>
                <div className="absolute inset-x-0 top-4 h-10 bg-amber-500 rounded-xl shadow-lg -rotate-6 origin-left"></div>
                <div className="absolute inset-x-6 bottom-5 h-20 bg-amber-700/60 rounded-xl flex items-center justify-around text-3xl">
                  <span>🌉</span><span>🔩</span><span>🚚</span>
                </div>
                <div className="absolute -right-3 bottom-20 bg-white text-curio-dark text-[10px] font-extrabold px-2.5 py-1 rounded-full rotate-6 shadow">CURIO BUILD BOX</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-10">
            <div className="text-xs font-bold tracking-[0.3em] text-curio-primary mb-2">ONE WORLD, THREE VIEWS</div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-curio-dark">Built for kids. Trusted by parents. Ready for schools.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AUDIENCES.map(a => (
              <Link key={a.title} to={a.to} className="group rounded-3xl border-2 border-gray-100 p-6 hover:border-curio-primary hover:shadow-lg transition-all flex flex-col">
                <div className="text-4xl mb-3">{a.icon}</div>
                <h3 className="font-display text-2xl font-extrabold text-curio-dark mb-2">{a.title}</h3>
                <p className="text-gray-600 flex-grow mb-4">{a.text}</p>
                <span className="font-bold text-curio-primary group-hover:translate-x-1 transition-transform">{a.cta} →</span>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {SAFETY.map(s => (
              <span key={s} className="bg-green-50 text-green-800 text-sm font-medium px-4 py-2 rounded-full">{s}</span>
            ))}
            <Link to="/safety" className="text-sm font-bold text-curio-primary px-4 py-2 hover:underline">Safety & Trust →</Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 sm:px-8 pb-16 bg-white">
        <div className="max-w-6xl mx-auto rounded-[2rem] bg-gradient-to-br from-curio-primary to-[#3A2BB8] text-white p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/10" aria-hidden="true"></div>
          <div className="absolute -bottom-24 -right-10 w-72 h-72 rounded-full bg-curio-secondary/20" aria-hidden="true"></div>
          <h2 className="relative font-display text-3xl sm:text-5xl font-extrabold mb-4">Don’t just answer. Create.</h2>
          <p className="relative text-white/80 text-lg mb-8 max-w-xl mx-auto">Start with one mission. It takes about ten minutes, and the best part happens away from the screen.</p>
          <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/world" className="bg-white text-curio-primary font-bold px-8 py-4 rounded-full hover:bg-curio-light transition-colors">Explore the World</Link>
            <Link to="/business" className="bg-white/10 border border-white/30 font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-colors">Business model</Link>
          </div>
        </div>
      </section>

      <footer className="bg-curio-dark text-gray-400 px-4 sm:px-8 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="font-display text-2xl font-extrabold text-white">CURIO</div>
            <div className="text-xs tracking-[0.3em] mt-1">LEARN. PLAY. DO. CREATE.</div>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {[['/how-it-works', 'How It Works'], ['/kits', 'Build Box'], ['/parents', 'Parents'], ['/schools', 'Schools'], ['/safety', 'Safety'], ['/business', 'Business'], ['/differentiation', 'Moat']].map(([to, label]) => (
              <Link key={to} to={to} className="hover:text-white">{label}</Link>
            ))}
          </nav>
        </div>
        <div className="max-w-6xl mx-auto mt-8 text-xs text-gray-500">Prototype built for Pitch Perfect 2026. Pricing and figures are illustrative.</div>
      </footer>
    </div>
  );
}
