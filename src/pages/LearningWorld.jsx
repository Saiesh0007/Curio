import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLearner } from '../context/LearnerContext';

const locations = [
  { id: 'marketplaceMission', name: 'Marketplace', icon: '🏪', path: '/world/marketplace', desc: "Where numbers become decisions." },
  { id: 'scienceMission', name: 'Science Lab', icon: '🔬', path: '/world/science', desc: "Grow a plant." },
  { id: 'spaceMission', name: 'Space Station', icon: '🚀', path: '/world/space', desc: "Choose the Right Planet." },
  { id: 'creativeMission', name: 'Creative Studio', icon: '🎨', path: '/world/creative', desc: "Design Your Own Creature." },
  { id: 'inventorMission', name: "Inventor's Workshop", icon: '💡', path: '/world/inventor', desc: "Build a Bridge.", kit: 'Bridge Builder Kit' },
  { id: 'forestMission', name: 'Explorer Forest', icon: '🌳', desc: "Become a Nature Detective.", comingSoon: true },
  { id: 'storyMission', name: 'Story Village', icon: '📖', desc: "Finish the Story.", comingSoon: true },
];

export default function LearningWorld() {
  const navigate = useNavigate();
  const { learnerState, resetDemo } = useLearner();

  const handleReset = () => {
    if (window.confirm('Reset XP, badges and completed missions for a fresh demo?')) resetDemo();
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-curio-dark mb-4">My Curio World</h1>
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
          <div className="bg-white px-6 py-2 rounded-full shadow-sm font-bold text-curio-primary">
            XP: {learnerState.xp}
          </div>
          <div className="bg-white px-6 py-2 rounded-full shadow-sm font-bold text-gray-700">
            {learnerState.title}
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-full text-sm font-bold text-gray-500 border border-gray-300 hover:bg-white hover:text-curio-primary transition-colors"
          >
            ↺ Reset demo
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {locations.map((loc) => {
          const isCompleted = learnerState.completedMissions.includes(loc.id);
          return (
            <div
              key={loc.id}
              className={`bg-white rounded-2xl p-6 shadow-md transition-all border-2 border-transparent group flex flex-col h-full ${
                loc.comingSoon ? 'opacity-60' : 'hover:shadow-xl hover:border-curio-primary'
              }`}
            >
              <div className={`text-6xl mb-4 transition-transform origin-bottom ${loc.comingSoon ? 'grayscale' : 'group-hover:scale-110'}`}>{loc.icon}</div>
              <h2 className="text-2xl font-bold mb-2">{loc.name}</h2>
              <p className="text-gray-600 mb-6 flex-grow">{loc.desc}</p>
              {loc.kit && (
                <div className="-mt-4 mb-4 text-xs font-bold text-amber-700">🧰 {loc.kit} mission · works with household items too</div>
              )}

              <div className="flex items-center justify-between mt-auto gap-3">
                {loc.comingSoon ? (
                  <span className="bg-gray-100 text-gray-500 font-bold py-2 px-6 rounded-full text-sm">
                    🔒 Coming soon
                  </span>
                ) : (
                  <>
                    {isCompleted && (
                      <span className="text-green-500 font-bold flex items-center gap-2">✅ Completed</span>
                    )}
                    <button
                      onClick={() => navigate(loc.path)}
                      className="bg-curio-secondary text-curio-dark font-bold py-2 px-6 rounded-full hover:bg-curio-primary hover:text-white transition-colors"
                    >
                      {isCompleted ? 'PLAY AGAIN' : 'EXPLORE MISSION'}
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
