import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLearner } from '../context/LearnerContext';
import MissionHeader from '../components/MissionHeader';

export default function ScienceMission() {
  const { completeMission } = useLearner();
  const navigate = useNavigate();

  const [stage, setStage] = useState('intro'); // 'intro', 'experiment', 'result', 'complete'
  const [selections, setSelections] = useState({ sunlight: 'medium', water: 'medium', soil: 'healthy' });
  const [result, setResult] = useState(null);

  const handleExperiment = () => {
    let outcome = 'healthy';
    let explanation = "Perfect balance! The plant has the right amount of sunlight, water, and healthy soil to thrive.";

    if (selections.water === 'low') {
      outcome = 'wilting';
      explanation = "The plant is wilting because it didn't get enough water. Plants need water to transport nutrients.";
    } else if (selections.water === 'high') {
      outcome = 'root-rot';
      explanation = "Oh no! Too much water caused root problems. The roots need air to breathe.";
    } else if (selections.sunlight === 'low') {
      outcome = 'slow';
      explanation = "Slow growth. The plant didn't get enough sunlight to make food (photosynthesis).";
    }

    setResult({ outcome, explanation });
    setStage('result');
  };

  const finishMission = () => {
    setStage('complete');
    completeMission(
      'scienceMission', 
      150, 
      { Science: 15, Observation: 10, ProblemSolving: 5 }, 
      'Junior Scientist'
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <MissionHeader title="Grow a Plant" icon="🔬" />

      {stage === 'intro' && (
        <div className="bg-white rounded-3xl p-8 shadow-sm text-center">
          <h2 className="text-2xl font-bold mb-4">Maya's Seed</h2>
          <p className="text-xl text-gray-700 mb-8">
            "Maya planted a seed. Can you figure out what the plant needs to grow?"
          </p>
          <div className="text-8xl mb-8">🌱</div>
          <button 
            onClick={() => setStage('experiment')}
            className="bg-curio-primary text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors"
          >
            Start Experiment
          </button>
        </div>
      )}

      {stage === 'experiment' && (
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Set Your Variables</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">☀️ Sunlight</h3>
              <select 
                className="w-full p-2 rounded border-gray-300 shadow-sm"
                value={selections.sunlight}
                onChange={(e) => setSelections(prev => ({...prev, sunlight: e.target.value}))}
              >
                <option value="low">Low (Shade)</option>
                <option value="medium">Medium (Partial Sun)</option>
                <option value="high">High (Full Sun)</option>
              </select>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">💧 Water</h3>
              <select 
                className="w-full p-2 rounded border-gray-300 shadow-sm"
                value={selections.water}
                onChange={(e) => setSelections(prev => ({...prev, water: e.target.value}))}
              >
                <option value="low">Too Little</option>
                <option value="medium">Just Right</option>
                <option value="high">Too Much</option>
              </select>
            </div>

            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">🪴 Soil</h3>
              <select 
                className="w-full p-2 rounded border-gray-300 shadow-sm"
                value={selections.soil}
                onChange={(e) => setSelections(prev => ({...prev, soil: e.target.value}))}
              >
                <option value="sandy">Sandy (Drains fast)</option>
                <option value="healthy">Healthy Potting Soil</option>
                <option value="clay">Clay (Holds water)</option>
              </select>
            </div>
          </div>

          <div className="text-center">
             <button 
                onClick={handleExperiment}
                className="bg-curio-secondary text-curio-dark font-bold py-3 px-8 rounded-full hover:bg-curio-primary hover:text-white transition-colors"
              >
                Observe Growth
              </button>
          </div>
        </div>
      )}

      {stage === 'result' && (
        <div className="bg-white rounded-3xl p-8 shadow-sm text-center">
          <h2 className="text-3xl font-extrabold mb-8">Observation Time!</h2>
          
          <div className="text-9xl mb-8 animate-bounce">
            {result.outcome === 'healthy' && '🌻'}
            {result.outcome === 'wilting' && '🥀'}
            {result.outcome === 'slow' && '🌱'}
            {result.outcome === 'root-rot' && '🍄'}
          </div>

          <div className="bg-gray-100 p-6 rounded-2xl max-w-xl mx-auto mb-8">
            <h3 className="font-bold text-xl mb-2 text-curio-primary">
              {result.outcome === 'healthy' ? "Success!" : "What happened?"}
            </h3>
            <p className="text-lg text-gray-700">{result.explanation}</p>
          </div>

          <div className="flex justify-center gap-4">
            {result.outcome !== 'healthy' && (
              <button onClick={() => setStage('experiment')} className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-gray-300 transition-colors">
                Try Again
              </button>
            )}
            <button onClick={finishMission} className="bg-curio-primary text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors">
              Finish Mission
            </button>
          </div>
        </div>
      )}

      {stage === 'complete' && (
        <div className="bg-white rounded-3xl p-8 shadow-sm text-center animate-fade-in-up">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-4xl font-extrabold text-curio-primary mb-2">MISSION COMPLETE</h2>
          <p className="text-xl text-gray-700 mb-8">You learned what a plant needs to survive!</p>
          
          <div className="bg-curio-light rounded-2xl p-6 inline-block mb-8">
            <h3 className="font-bold text-lg mb-4">Rewards Unlocked!</h3>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-4xl mb-2">⭐</div>
                <div className="font-bold text-curio-primary">+150 XP</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🏅</div>
                <div className="font-bold text-blue-500">Junior Scientist Badge</div>
              </div>
            </div>
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
