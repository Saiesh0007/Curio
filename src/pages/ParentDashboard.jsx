import React, { useState } from 'react';
import { useLearner } from '../context/LearnerContext';

export default function ParentDashboard() {
  const { learnerState } = useLearner();
  const [lang, setLang] = useState('English'); // English, Hindi, Marathi

  const t = {
    English: {
      dashboard: "Parent Dashboard",
      child: "Child",
      age: "Age",
      thisWeek: "This Week's Activity",
      missions: "missions completed",
      minutes: "minutes learning",
      realWorld: "real-world activities",
      badges: "badges earned",
      strengths: "Strengths this week",
      strengthText: "Science exploration and creative problem-solving are emerging as strengths.",
      support: "Area to support",
      supportText: "Reading comprehension could benefit from additional practice.",
      beyond: "Learning Beyond the Screen",
      beyondSub: "Sometimes the best classroom is the world around you.",
      tryThis: "Try this at home: During your next grocery trip, ask your child to estimate the total cost of five items."
    },
    Hindi: {
      dashboard: "अभिभावक डैशबोर्ड",
      child: "बच्चा",
      age: "आयु",
      thisWeek: "इस सप्ताह की गतिविधि",
      missions: "मिशन पूरे किए",
      minutes: "मिनट सीखे",
      realWorld: "वास्तविक दुनिया की गतिविधियां",
      badges: "बैज अर्जित किए",
      strengths: "इस सप्ताह की खूबियां",
      strengthText: "विज्ञान अन्वेषण और रचनात्मक समस्या-समाधान खूबियों के रूप में उभर रहे हैं।",
      support: "समर्थन क्षेत्र",
      supportText: "पढ़ने की समझ को अतिरिक्त अभ्यास से लाभ हो सकता है।",
      beyond: "स्क्रीन के पार सीखना",
      beyondSub: "कभी-कभी सबसे अच्छी कक्षा आपके आस-पास की दुनिया होती है।",
      tryThis: "इसे घर पर आजमाएं: अपनी अगली किराने की खरीदारी के दौरान, अपने बच्चे से पांच वस्तुओं की कुल लागत का अनुमान लगाने को कहें।"
    },
    Marathi: {
      dashboard: "पालक डॅशबोर्ड",
      child: "मूल",
      age: "वय",
      thisWeek: "या आठवड्यातील क्रियाकलाप",
      missions: "पूर्ण केलेली मिशन्स",
      minutes: "मिनिटे शिकलो",
      realWorld: "वास्तविक जगातील क्रियाकलाप",
      badges: "मिळवलेले बॅज",
      strengths: "या आठवड्यातील बलस्थाने",
      strengthText: "विज्ञान अन्वेषण आणि सर्जनशील समस्या सोडवणे हे बलस्थाने म्हणून उदयास येत आहेत.",
      support: "समर्थन क्षेत्र",
      supportText: "वाचनाच्या आकलनास अतिरिक्त सरावाचा फायदा होऊ शकतो.",
      beyond: "स्क्रीनच्या पलीकडे शिकणे",
      beyondSub: "कधीकधी सर्वोत्तम वर्ग आपल्या सभोवतालचे जग असते.",
      tryThis: "हे घरी करून पहा: तुमच्या पुढच्या किराणा खरेदीच्या वेळी, तुमच्या मुलाला पाच वस्तूंच्या एकूण खर्चाचा अंदाज लावण्यास सांगा."
    }
  };

  const curr = t[lang];

  return (
    <div className="max-w-5xl mx-auto py-8">
      <header className="flex justify-between items-end mb-8 border-b pb-4">
        <div>
          <h1 className="text-4xl font-extrabold text-curio-dark">{curr.dashboard}</h1>
          <p className="text-xl text-gray-500 mt-2">{curr.child}: <span className="font-bold text-curio-primary">{learnerState.child.name}</span>, {curr.age}: {learnerState.child.age}</p>
        </div>
        <div className="flex gap-2">
          {['English', 'Hindi', 'Marathi'].map(l => (
            <button 
              key={l}
              onClick={() => setLang(l)}
              className={`px-4 py-1 rounded-full text-sm font-bold border transition-colors ${lang === l ? 'bg-curio-primary text-white border-curio-primary' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}
            >
              {l === 'Hindi' ? 'हिन्दी' : l === 'Marathi' ? 'मराठी' : l}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-gray-700">{curr.thisWeek}</h2>
          <ul className="space-y-4">
            <li className="flex items-center gap-4"><div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">{learnerState.completedMissions.length || 4}</div> <span className="font-medium text-gray-600">{curr.missions}</span></li>
            <li className="flex items-center gap-4"><div className="bg-green-100 text-green-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">82</div> <span className="font-medium text-gray-600">{curr.minutes}</span></li>
            <li className="flex items-center gap-4"><div className="bg-orange-100 text-orange-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">3</div> <span className="font-medium text-gray-600">{curr.realWorld}</span></li>
            <li className="flex items-center gap-4"><div className="bg-purple-100 text-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">{learnerState.badges.length}</div> <span className="font-medium text-gray-600">{curr.badges}</span></li>
          </ul>
        </div>
        
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex gap-6 items-start">
             <div className="text-4xl">🌟</div>
             <div>
               <h3 className="font-bold text-lg mb-1">{curr.strengths}</h3>
               <p className="text-gray-600">{curr.strengthText}</p>
             </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex gap-6 items-start">
             <div className="text-4xl">🎯</div>
             <div>
               <h3 className="font-bold text-lg mb-1">{curr.support}</h3>
               <p className="text-gray-600">{curr.supportText}</p>
             </div>
          </div>
          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex gap-6 items-start">
             <div className="text-4xl">💡</div>
             <div>
               <h3 className="font-bold text-lg mb-1 text-blue-900">Curio Suggests</h3>
               <p className="text-blue-800">{curr.tryThis}</p>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold mb-2">{curr.beyond}</h2>
        <p className="text-gray-500 mb-8">{curr.beyondSub}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 border rounded-2xl flex gap-4 items-center bg-green-50/50">
            <div className="text-3xl">🌱</div>
            <div className="font-medium text-gray-700">Observe a plant for 3 days</div>
          </div>
          <div className="p-4 border rounded-2xl flex gap-4 items-center bg-blue-50/50">
            <div className="text-3xl">🛒</div>
            <div className="font-medium text-gray-700">Estimate the cost of five grocery items</div>
          </div>
          <div className="p-4 border rounded-2xl flex gap-4 items-center bg-orange-50/50">
            <div className="text-3xl">🏠</div>
            <div className="font-medium text-gray-700">Find five geometric shapes around your home</div>
          </div>
          <div className="p-4 border rounded-2xl flex gap-4 items-center bg-green-50/50">
            <div className="text-3xl">♻️</div>
            <div className="font-medium text-gray-700">Identify three ways to reduce household waste</div>
          </div>
          <div className="p-4 border rounded-2xl flex gap-4 items-center bg-purple-50/50">
            <div className="text-3xl">🎤</div>
            <div className="font-medium text-gray-700">Interview a family member</div>
          </div>
          <div className="p-4 border rounded-2xl flex gap-4 items-center bg-yellow-50/50">
            <div className="text-3xl">🏗️</div>
            <div className="font-medium text-gray-700">Build something using household materials</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 text-center">
         <h2 className="text-xl font-bold mb-6 text-gray-600 uppercase tracking-widest">The Curio Philosophy</h2>
         <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="bg-white px-8 py-4 rounded-xl font-bold text-lg text-curio-primary shadow-sm">DIGITAL</div>
            <div className="text-3xl text-gray-400">→</div>
            <div className="bg-white px-8 py-4 rounded-xl font-bold text-lg text-green-600 shadow-sm border-2 border-green-200">REAL WORLD</div>
            <div className="text-3xl text-gray-400">→</div>
            <div className="bg-white px-8 py-4 rounded-xl font-bold text-lg text-curio-primary shadow-sm">DIGITAL</div>
         </div>
      </div>

    </div>
  );
}
