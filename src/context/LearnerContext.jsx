import React, { createContext, useContext, useState, useEffect } from 'react';

const initialState = {
  child: {
    name: "Aarav",
    age: 7,
  },
  level: 4,
  title: "Explorer Level 4",
  xp: 1240,
  skills: {
    Math: 82,
    Science: 91,
    Reading: 61,
    Creativity: 84,
    Observation: 45,
    ProblemSolving: 55,
    DecisionMaking: 60,
    FinancialLiteracy: 30,
    Communication: 70
  },
  badges: ['Junior Scientist', 'Money Explorer', 'Space Explorer', 'Creative Inventor'],
  completedMissions: [], // Array of mission IDs, e.g., ['marketplaceMission']
};

const LearnerContext = createContext();

export const LearnerProvider = ({ children }) => {
  const [learnerState, setLearnerState] = useState(() => {
    const saved = localStorage.getItem('curioLearnerState');
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('curioLearnerState', JSON.stringify(learnerState));
  }, [learnerState]);

  const addXP = (amount) => {
    setLearnerState(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  const completeMission = (missionId, rewardXp, skillUpdates, newBadge = null) => {
    if (learnerState.completedMissions.includes(missionId)) return; // Already completed

    setLearnerState(prev => {
      const newSkills = { ...prev.skills };
      if (skillUpdates) {
        Object.entries(skillUpdates).forEach(([skill, boost]) => {
          if (newSkills[skill] !== undefined) {
            newSkills[skill] = Math.min(100, newSkills[skill] + boost);
          }
        });
      }

      const newBadges = newBadge && !prev.badges.includes(newBadge) 
        ? [...prev.badges, newBadge] 
        : prev.badges;

      return {
        ...prev,
        xp: prev.xp + rewardXp,
        skills: newSkills,
        badges: newBadges,
        completedMissions: [...prev.completedMissions, missionId]
      };
    });
  };

  return (
    <LearnerContext.Provider value={{ learnerState, addXP, completeMission }}>
      {children}
    </LearnerContext.Provider>
  );
};

export const useLearner = () => useContext(LearnerContext);
