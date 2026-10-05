import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import LearningWorld from './pages/LearningWorld';
import MarketplaceMission from './missions/MarketplaceMission';
import ScienceMission from './missions/ScienceMission';
import SpaceMission from './missions/SpaceMission';
import CreativeMission from './missions/CreativeMission';
import InventorMission from './missions/InventorMission';
import ParentDashboard from './pages/ParentDashboard';
import PitchDemo from './pages/PitchDemo';
import BusinessModel from './pages/BusinessModel';
import CompetitiveDiff from './pages/CompetitiveDiff';
import SafetyTrust from './pages/SafetyTrust';
import TeacherMode from './pages/TeacherMode';
import HowItWorks from './pages/HowItWorks';
import Landing from './pages/Landing';
import BuildBox from './pages/BuildBox';

const NAV_LINKS = [
  { to: '/world', label: 'Explore World', className: '' },
  { to: '/how-it-works', label: 'How It Works', className: '' },
  { to: '/kits', label: 'Build Box', className: 'text-amber-600 font-bold' },
  { to: '/parents', label: 'Parents', className: '' },
  { to: '/schools', label: 'Schools', className: '' },
  { to: '/safety', label: 'Safety', className: '' },
  { to: '/business', label: 'Business', className: 'text-purple-600 font-bold' },
  { to: '/differentiation', label: 'Moat', className: 'text-purple-600 font-bold' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <Router>
      <div className="min-h-screen bg-curio-light text-curio-dark font-sans">
        <header className="bg-white shadow-sm relative z-20">
          <div className="p-4 flex justify-between items-center gap-4">
            <div className="font-display font-extrabold text-3xl text-curio-primary tracking-tight leading-none"><Link to="/" onClick={closeMenu}>CURIO</Link></div>
            <nav className="hidden lg:flex gap-6 font-medium text-sm items-center">
              {NAV_LINKS.map(l => (
                <Link key={l.to} to={l.to} className={`hover:text-curio-primary transition-colors ${l.className}`}>{l.label}</Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <Link to="/demo" onClick={closeMenu} className="bg-curio-primary text-white px-4 sm:px-6 py-2 rounded-full font-bold text-sm sm:text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all inline-block">
                PITCH DEMO
              </Link>
              <button
                onClick={() => setMenuOpen(o => !o)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-xl text-gray-700 hover:bg-gray-100"
              >
                {menuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
          {menuOpen && (
            <nav className="lg:hidden flex flex-col border-t border-gray-100 px-4 pb-4 font-medium">
              {NAV_LINKS.map(l => (
                <Link key={l.to} to={l.to} onClick={closeMenu} className={`py-3 border-b border-gray-50 hover:text-curio-primary ${l.className}`}>{l.label}</Link>
              ))}
            </nav>
          )}
        </header>

        <main className="p-4 sm:p-8">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/world" element={<LearningWorld />} />
            <Route path="/world/marketplace" element={<MarketplaceMission />} />
            <Route path="/world/science" element={<ScienceMission />} />
            <Route path="/world/space" element={<SpaceMission />} />
            <Route path="/world/creative" element={<CreativeMission />} />
            <Route path="/world/inventor" element={<InventorMission />} />
            <Route path="/parents" element={<ParentDashboard />} />
            <Route path="/business" element={<BusinessModel />} />
            <Route path="/differentiation" element={<CompetitiveDiff />} />
            <Route path="/safety" element={<SafetyTrust />} />
            <Route path="/schools" element={<TeacherMode />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/kits" element={<BuildBox />} />
            <Route path="/demo" element={<PitchDemo />} />
            <Route path="*" element={
              <div className="text-center mt-20">
                <div className="text-6xl mb-4">🧭</div>
                <h1 className="text-3xl font-extrabold mb-4">This corner of Curio is still being built.</h1>
                <Link to="/world" className="inline-block bg-curio-primary text-white px-8 py-3 rounded-full font-bold">Back to the World</Link>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
