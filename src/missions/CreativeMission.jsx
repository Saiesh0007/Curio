import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLearner } from '../context/LearnerContext';
import MissionHeader from '../components/MissionHeader';

export default function CreativeMission() {
  const { completeMission } = useLearner();
  const navigate = useNavigate();

  const [stage, setStage] = useState('design'); // 'design', 'review', 'complete'
  const [creature, setCreature] = useState({
    name: 'Glub Glub',
    environment: 'Ocean',
    movement: 'Fins',
    food: 'Fish',
    ability: 'Camouflage'
  });

  const generateCard = () => {
    setStage('review');
  };

  const finishMission = () => {
    completeMission(
      'creativeMission', 
      200, 
      { Creativity: 20, Communication: 10, ProblemSolving: 10 }, 
      'Creative Inventor'
    );
    setStage('complete');
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <MissionHeader title="Design Your Own Creature" icon="🎨" />

      {stage === 'design' && (
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Creature Creator</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div>
                <label className="block font-bold text-gray-700 mb-2">Environment</label>
                <div className="flex gap-2">
                  {['Ocean', 'Forest', 'Desert', 'Arctic'].map(env => (
                    <button 
                      key={env} 
                      onClick={() => setCreature({...creature, environment: env})}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${creature.environment === env ? 'bg-curio-primary text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    >
                      {env}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-2">Movement</label>
                <select 
                  className="w-full p-3 rounded-lg border-2 border-gray-200 bg-gray-50 focus:border-curio-primary outline-none"
                  value={creature.movement}
                  onChange={(e) => setCreature({...creature, movement: e.target.value})}
                >
                  <option>Wings</option>
                  <option>Fins</option>
                  <option>Legs</option>
                  <option>Gliding</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-2">Food Source</label>
                <select 
                  className="w-full p-3 rounded-lg border-2 border-gray-200 bg-gray-50 focus:border-curio-primary outline-none"
                  value={creature.food}
                  onChange={(e) => setCreature({...creature, food: e.target.value})}
                >
                  <option>Plants</option>
                  <option>Insects</option>
                  <option>Fish</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-2">Special Ability</label>
                <select 
                  className="w-full p-3 rounded-lg border-2 border-gray-200 bg-gray-50 focus:border-curio-primary outline-none"
                  value={creature.ability}
                  onChange={(e) => setCreature({...creature, ability: e.target.value})}
                >
                  <option>Camouflage</option>
                  <option>Speed</option>
                  <option>Night vision</option>
                  <option>Water storage</option>
                </select>
              </div>
            </div>

            <div className="bg-curio-light rounded-2xl p-8 flex flex-col items-center justify-center border-4 border-dashed border-gray-300">
               <div className="text-8xl mb-4 animate-pulse">
                  {creature.environment === 'Ocean' ? '🦑' : creature.environment === 'Forest' ? '🦥' : creature.environment === 'Desert' ? '🐪' : '🐧'}
               </div>
               <p className="text-gray-500 font-medium text-center">Your creature is taking shape...</p>
            </div>
          </div>

          <div className="text-center">
             <button 
                onClick={generateCard}
                className="bg-curio-secondary text-curio-dark font-bold py-3 px-8 rounded-full hover:bg-curio-primary hover:text-white transition-colors"
              >
                Generate Creature Card
              </button>
          </div>
        </div>
      )}

      {stage === 'review' && (
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-3xl font-extrabold mb-8 text-center">YOUR CREATION</h2>
          
          <div className="max-w-md mx-auto bg-gradient-to-br from-curio-primary to-purple-600 rounded-3xl p-1 shadow-xl mb-8 transform -rotate-2">
            <div className="bg-white rounded-[22px] p-6 h-full">
              <div className="text-center mb-6">
                <div className="text-8xl mb-2">
                  {creature.environment === 'Ocean' ? '🦑' : creature.environment === 'Forest' ? '🦥' : creature.environment === 'Desert' ? '🐪' : '🐧'}
                </div>
                <h3 className="text-2xl font-bold text-curio-dark">{creature.name}</h3>
              </div>
              
              <div className="space-y-3 text-gray-700 bg-gray-50 p-4 rounded-xl">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-bold">Environment:</span> <span>{creature.environment}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-bold">Movement:</span> <span>{creature.movement}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-bold">Food:</span> <span>{creature.food}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-curio-primary">Ability:</span> <span className="font-bold text-curio-primary">{creature.ability}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-xl mx-auto mb-8">
            <label className="block font-bold text-gray-700 mb-2 text-lg">"How does your creature survive?"</label>
            <textarea 
              className="w-full p-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:border-curio-primary outline-none min-h-[100px]"
              placeholder="Write a short explanation here..."
            ></textarea>
          </div>

          <div className="flex justify-center gap-4">
            <button onClick={() => setStage('design')} className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-gray-300 transition-colors">
              Edit Creature
            </button>
            <button onClick={finishMission} className="bg-curio-primary text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors">
              Submit Creation
            </button>
          </div>
        </div>
      )}

      {stage === 'complete' && (
        <div className="bg-white rounded-3xl p-8 shadow-sm text-center animate-fade-in-up">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-4xl font-extrabold text-curio-primary mb-2">MISSION COMPLETE</h2>
          <p className="text-xl text-gray-700 mb-8">You used design thinking to build something completely new!</p>
          
          <div className="bg-curio-light rounded-2xl p-6 inline-block mb-8">
            <h3 className="font-bold text-lg mb-4">Rewards Unlocked!</h3>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-4xl mb-2">⭐</div>
                <div className="font-bold text-curio-primary">+200 XP</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🏅</div>
                <div className="font-bold text-pink-500">Creative Inventor Badge</div>
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
