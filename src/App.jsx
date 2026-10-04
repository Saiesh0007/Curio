import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import LearningWorld from './pages/LearningWorld';
import MarketplaceMission from './missions/MarketplaceMission';
import ScienceMission from './missions/ScienceMission';
import SpaceMission from './missions/SpaceMission';
import CreativeMission from './missions/CreativeMission';
import ParentDashboard from './pages/ParentDashboard';
import PitchDemo from './pages/PitchDemo';
import BusinessModel from './pages/BusinessModel';
import CompetitiveDiff from './pages/CompetitiveDiff';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-curio-light text-curio-dark font-sans">
        <header className="p-4 flex justify-between items-center bg-white shadow-sm">
          <div className="font-bold text-2xl text-curio-primary tracking-tight"><Link to="/">CURIO</Link></div>
          <nav className="hidden md:flex gap-6 font-medium text-sm items-center">
            <Link to="/world" className="hover:text-curio-primary transition-colors">Explore World</Link>
            <Link to="/parents" className="hover:text-curio-primary transition-colors">Parents</Link>
            <Link to="/business" className="hover:text-curio-primary transition-colors text-purple-600 font-bold">Business</Link>
            <Link to="/differentiation" className="hover:text-curio-primary transition-colors text-purple-600 font-bold">Moat</Link>
          </nav>
          <Link to="/demo" className="bg-curio-primary text-white px-6 py-2 rounded-full font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all inline-block">
            PITCH DEMO
          </Link>
        </header>

        <main className="p-8">
          <Routes>
            <Route path="/" element={
              <div className="text-center mt-20">
                <h1 className="text-5xl font-extrabold mb-4 text-curio-dark">
                  Learning isn't a lesson.<br/>
                  <span className="text-curio-primary">It's an adventure.</span>
                </h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
                  Curio is an interactive learning world where children learn, play, explore real life, and create.
                </p>
                <div className="flex justify-center gap-4">
                  <a href="/world" className="bg-curio-primary text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transition-all">Explore the World</a>
                  <button className="bg-white text-curio-primary border-2 border-curio-primary px-8 py-3 rounded-full font-bold text-lg hover:bg-curio-primary/5 transition-all">Try a Mission</button>
                </div>
              </div>
            } />
            <Route path="/world" element={<LearningWorld />} />
            <Route path="/world/marketplace" element={<MarketplaceMission />} />
            <Route path="/world/science" element={<ScienceMission />} />
            <Route path="/world/space" element={<SpaceMission />} />
            <Route path="/world/creative" element={<CreativeMission />} />
            <Route path="/parents" element={<ParentDashboard />} />
            <Route path="/business" element={<BusinessModel />} />
            <Route path="/differentiation" element={<CompetitiveDiff />} />
            <Route path="/demo" element={<PitchDemo />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
