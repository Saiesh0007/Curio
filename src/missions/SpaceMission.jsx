import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLearner } from '../context/LearnerContext';
import MissionHeader from '../components/MissionHeader';

const PLANETS = [
  { id: 'nova', name: 'Planet Nova', temp: 'Moderate', gravity: 'Earth-like', water: 'Available', atmos: 'Suitable', emoji: '🔵' },
  { id: 'pyra', name: 'Planet Pyra', temp: 'Extremely hot', gravity: 'High', water: 'Low', atmos: 'Toxic', emoji: '🔥' },
  { id: 'frost', name: 'Planet Frost', temp: 'Extremely cold', gravity: 'Low', water: 'Frozen', atmos: 'Thin', emoji: '❄️' },
  { id: 'terra-x', name: 'Planet Terra-X', temp: 'Moderate', gravity: 'Moderate', water: 'Available', atmos: 'Thin', emoji: '🌍' }
];

export default function SpaceMission() {
  const { completeMission } = useLearner();
  const navigate = useNavigate();

  const [stage, setStage] = useState('inspect'); // 'inspect', 'choose', 'mini-challenge', 'complete'
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const handleSelectPlanet = (planetId) => {
    setSelectedPlanet(planetId);
    setStage('choose');
  };

  const finishMission = () => {
    completeMission(
      'spaceMission', 
      150, 
      { Science: 10, DecisionMaking: 15, ProblemSolving: 10 }, 
      'Space Explorer'
    );
    setStage('complete');
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <MissionHeader title="Choose the Right Planet" icon="🚀" />

      {stage === 'inspect' && (
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-center">Base Camp Selection</h2>
          <p className="text-xl text-gray-700 mb-8 text-center max-w-2xl mx-auto">
            "Your research crew needs a planet where humans could potentially establish a scientific research base."
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {PLANETS.map(planet => (
              <div key={planet.id} className="border-2 rounded-2xl p-6 hover:border-curio-primary transition-all flex flex-col items-center">
                <div className="text-6xl mb-4">{planet.emoji}</div>
                <h3 className="font-bold text-xl mb-4 text-center">{planet.name}</h3>
                <ul className="text-sm space-y-2 mb-6 text-gray-600 flex-grow w-full">
                  <li className="flex justify-between"><span className="font-semibold">Temp:</span> <span>{planet.temp}</span></li>
                  <li className="flex justify-between"><span className="font-semibold">Gravity:</span> <span>{planet.gravity}</span></li>
                  <li className="flex justify-between"><span className="font-semibold">Water:</span> <span>{planet.water}</span></li>
                  <li className="flex justify-between"><span className="font-semibold">Atmos:</span> <span>{planet.atmos}</span></li>
                </ul>
                <button 
                  onClick={() => handleSelectPlanet(planet.id)}
                  className="w-full bg-curio-secondary text-curio-dark font-bold py-2 rounded-full hover:bg-curio-primary hover:text-white transition-colors mt-auto"
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {stage === 'choose' && (
        <div className="bg-white rounded-3xl p-8 shadow-sm text-center">
          <div className="text-8xl mb-4">{PLANETS.find(p => p.id === selectedPlanet)?.emoji}</div>
          <h2 className="text-3xl font-extrabold mb-4">You selected {PLANETS.find(p => p.id === selectedPlanet)?.name}!</h2>
          
          <div className="max-w-xl mx-auto bg-gray-50 p-6 rounded-2xl mb-8">
            {selectedPlanet === 'nova' ? (
              <p className="text-lg text-green-700 font-medium">Excellent choice! Planet Nova has moderate temperatures and available water, making it the safest option for a human base.</p>
            ) : selectedPlanet === 'terra-x' ? (
              <p className="text-lg text-yellow-700 font-medium">Good choice, but be careful! Terra-X has a thin atmosphere, so your crew will need special breathing equipment.</p>
            ) : (
              <p className="text-lg text-red-700 font-medium">This is a very dangerous planet for humans! The extreme conditions would make building a base almost impossible.</p>
            )}
          </div>

          <button 
            onClick={() => setStage('mini-challenge')}
            className="bg-curio-primary text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors"
          >
            Next Challenge
          </button>
        </div>
      )}

      {stage === 'mini-challenge' && (
        <div className="bg-white rounded-3xl p-8 shadow-sm text-center">
          <h2 className="text-2xl font-bold mb-4">Emergency Protocol</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-xl mx-auto">
            "Your spacecraft has limited energy for life support on the journey. Which factor should you prioritize analyzing first?"
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
            <button onClick={finishMission} className="border-2 border-gray-200 hover:border-curio-primary hover:bg-blue-50 p-4 rounded-xl font-bold text-lg transition-all">Water availability</button>
            <button onClick={finishMission} className="border-2 border-gray-200 hover:border-curio-primary hover:bg-blue-50 p-4 rounded-xl font-bold text-lg transition-all">Oxygen levels</button>
            <button onClick={finishMission} className="border-2 border-gray-200 hover:border-curio-primary hover:bg-blue-50 p-4 rounded-xl font-bold text-lg transition-all">Gravity</button>
            <button onClick={finishMission} className="border-2 border-gray-200 hover:border-curio-primary hover:bg-blue-50 p-4 rounded-xl font-bold text-lg transition-all">Temperature</button>
          </div>
        </div>
      )}

      {stage === 'complete' && (
        <div className="bg-white rounded-3xl p-8 shadow-sm text-center animate-fade-in-up">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-4xl font-extrabold text-curio-primary mb-2">MISSION COMPLETE</h2>
          <p className="text-xl text-gray-700 mb-8">You used logical reasoning to find a safe home for the crew!</p>
          
          <div className="bg-curio-light rounded-2xl p-6 inline-block mb-8">
            <h3 className="font-bold text-lg mb-4">Rewards Unlocked!</h3>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-4xl mb-2">⭐</div>
                <div className="font-bold text-curio-primary">+150 XP</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🏅</div>
                <div className="font-bold text-purple-500">Space Explorer Badge</div>
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
