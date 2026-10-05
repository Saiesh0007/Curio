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
  unlockedKits: [], // Build Box kit IDs scanned by the family, e.g., ['bridge']
  realWorldResults: [], // { missionId, title, detail, date } logged after DO / CREATE
};

const LearnerContext = createContext();

export const LearnerProvider = ({ children }) => {
  const [learnerState, setLearnerState] = useState(() => {
    try {
      const saved = localStorage.getItem('curioLearnerState');
      return saved ? { ...initialState, ...JSON.parse(saved) } : initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem('curioLearnerState', JSON.stringify(learnerState));
  }, [learnerState]);

  const addXP = (amount) => {
    setLearnerState(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  const resetDemo = () => setLearnerState(initialState);

  const unlockKit = (kitId) => {
    setLearnerState(prev => prev.unlockedKits.includes(kitId)
      ? prev
      : { ...prev, unlockedKits: [...prev.unlockedKits, kitId] });
  };

  const addRealWorldResult = (result) => {
    setLearnerState(prev => ({
      ...prev,
      realWorldResults: [{ ...result, date: new Date().toISOString() }, ...prev.realWorldResults].slice(0, 10),
    }));
  };

  const completeMission = (missionId, rewardXp, skillUpdates, newBadge = null) => {
    setLearnerState(prev => {
      if (prev.completedMissions.includes(missionId)) return prev; // Replays don't re-award

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
    <LearnerContext.Provider value={{ learnerState, addXP, completeMission, resetDemo, unlockKit, addRealWorldResult }}>
      {children}
    </LearnerContext.Provider>
  );
};

// eslint-disable-next-line react/only-export-components
export const useLearner = () => useContext(LearnerContext);
