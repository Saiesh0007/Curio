import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLearner } from '../context/LearnerContext';

const locations = [
  { id: 'marketplaceMission', name: 'Marketplace', icon: '🏪', path: '/world/marketplace', desc: "Where numbers become decisions." },
  { id: 'scienceMission', name: 'Science Lab', icon: '🔬', path: '/world/science', desc: "Grow a plant." },
  { id: 'spaceMission', name: 'Space Station', icon: '🚀', path: '/world/space', desc: "Choose the Right Planet." },
  { id: 'creativeMission', name: 'Creative Studio', icon: '🎨', path: '/world/creative', desc: "Design Your Own Creature." },
  { id: 'inventorMission', name: "Inventor's Workshop", icon: '💡', path: '/world/inventor', desc: "Build a Bridge." },
  { id: 'forestMission', name: 'Explorer Forest', icon: '🌳', path: '/world/forest', desc: "Become a Nature Detective." },
  { id: 'storyMission', name: 'Story Village', icon: '📖', path: '/world/story', desc: "Finish the Story." },
];

export default function LearningWorld() {
  const navigate = useNavigate();
  const { learnerState } = useLearner();

  return (
    <div className="max-w-6xl mx-auto py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-curio-dark mb-4">My Curio World</h1>
        <div className="flex justify-center items-center gap-6">
          <div className="bg-white px-6 py-2 rounded-full shadow-sm font-bold text-curio-primary">
            XP: {learnerState.xp}
          </div>
          <div className="bg-white px-6 py-2 rounded-full shadow-sm font-bold text-gray-700">
            {learnerState.title}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {locations.map((loc) => {
          const isCompleted = learnerState.completedMissions.includes(loc.id);
          return (
            <div key={loc.id} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-curio-primary group flex flex-col h-full">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform origin-bottom">{loc.icon}</div>
              <h2 className="text-2xl font-bold mb-2">{loc.name}</h2>
              <p className="text-gray-600 mb-6 flex-grow">{loc.desc}</p>
              
              <div className="flex items-center justify-between mt-auto">
                {isCompleted ? (
                  <span className="text-green-500 font-bold flex items-center gap-2">
                    ✅ Completed
                  </span>
                ) : (
                  <button 
                    onClick={() => navigate(loc.path)}
                    className="bg-curio-secondary text-curio-dark font-bold py-2 px-6 rounded-full hover:bg-curio-primary hover:text-white transition-colors"
                  >
                    EXPLORE MISSION
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
