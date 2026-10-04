import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PitchDemo() {
  const navigate = useNavigate();
  const [stage, setStage] = useState('start'); // start, learn, play, do, create, complete

  return (
    <div className="min-h-screen bg-curio-dark text-white flex flex-col items-center justify-center p-8">
      
      {stage === 'start' && (
        <div className="text-center animate-fade-in-up max-w-2xl">
          <h1 className="text-5xl font-extrabold mb-6 text-curio-secondary">Experience Curio</h1>
          <p className="text-2xl text-gray-300 mb-12">"See how one idea becomes a complete learning journey."</p>
          <button onClick={() => setStage('learn')} className="bg-curio-primary text-white font-bold text-xl py-4 px-12 rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(91,66,243,0.5)]">
            Begin the Journey
          </button>
        </div>
      )}

      {stage === 'learn' && (
        <div className="text-center w-full max-w-4xl">
          <div className="text-sm font-bold text-curio-secondary mb-2 tracking-widest">STAGE 1</div>
          <h2 className="text-4xl font-extrabold mb-8">LEARN</h2>
          <div className="bg-gray-800 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-green-400"></div>
             <div className="text-8xl mb-6">🌱</div>
             <p className="text-2xl font-medium leading-relaxed mb-8">
               Plants are living things! To grow big and strong, they need the perfect balance of <span className="text-yellow-400">sunlight</span>, <span className="text-blue-400">water</span>, and <span className="text-amber-600">healthy soil</span>.
             </p>
             <button onClick={() => setStage('play')} className="bg-white text-curio-dark font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors">
               Got it! Let's play.
             </button>
          </div>
        </div>
      )}

      {stage === 'play' && (
        <div className="text-center w-full max-w-4xl">
          <div className="text-sm font-bold text-curio-secondary mb-2 tracking-widest">STAGE 2</div>
          <h2 className="text-4xl font-extrabold mb-8">PLAY</h2>
          <div className="bg-gray-800 rounded-3xl p-12 shadow-2xl border border-gray-700">
             <h3 className="text-2xl mb-8">Mini Experiment: Try giving the plant too much water.</h3>
             <div className="flex justify-center gap-8 mb-8">
                <button className="p-4 rounded-xl bg-gray-700 border-2 border-transparent hover:border-yellow-400 text-4xl">☀️</button>
                <button onClick={() => {
                  alert("Glug glug... The plant's roots are drowning! Let's fix it.");
                  setStage('do');
                }} className="p-4 rounded-xl bg-blue-900 border-2 border-blue-400 text-4xl animate-pulse">💧💧💧</button>
                <button className="p-4 rounded-xl bg-gray-700 border-2 border-transparent hover:border-amber-600 text-4xl">🪴</button>
             </div>
             <p className="text-gray-400 italic">Simulated interactive challenge...</p>
          </div>
        </div>
      )}

      {stage === 'do' && (
        <div className="text-center w-full max-w-4xl">
          <div className="text-sm font-bold text-curio-secondary mb-2 tracking-widest">STAGE 3</div>
          <h2 className="text-4xl font-extrabold mb-8">DO</h2>
          <div className="bg-gradient-to-br from-green-900 to-gray-900 rounded-3xl p-12 shadow-2xl border border-green-700">
             <div className="text-6xl mb-6">🔍</div>
             <h3 className="text-3xl font-bold mb-4 text-green-400">Your Real-World Mission</h3>
             <p className="text-2xl mb-8">"Find a plant near your home and observe it for three days."</p>
             
             <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
                <div className="bg-gray-800 p-4 rounded-xl flex-1 border border-green-500/30">
                  <div className="font-bold text-green-400 mb-2">DAY 1</div>
                  <div className="text-sm text-gray-300">Took a photo of the leaves.</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl flex-1 border border-green-500/30">
                  <div className="font-bold text-green-400 mb-2">DAY 2</div>
                  <div className="text-sm text-gray-300">Felt the soil. It was dry.</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl flex-1 border border-green-500/30 opacity-50 border-dashed">
                  <div className="font-bold text-gray-400 mb-2">DAY 3</div>
                  <div className="text-sm text-gray-500">Pending...</div>
                </div>
             </div>
             
             <button onClick={() => setStage('create')} className="bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-400 transition-colors">
               Log Observation & Continue
             </button>
          </div>
        </div>
      )}

      {stage === 'create' && (
        <div className="text-center w-full max-w-4xl">
          <div className="text-sm font-bold text-curio-secondary mb-2 tracking-widest">STAGE 4</div>
          <h2 className="text-4xl font-extrabold mb-8">CREATE</h2>
          <div className="bg-gray-800 rounded-3xl p-12 shadow-2xl border border-gray-700 flex flex-col md:flex-row gap-8 items-center">
             <div className="flex-1 text-left">
                <h3 className="text-2xl font-bold mb-4">Design your ideal plant!</h3>
                <ul className="space-y-4 mb-8 text-gray-300">
                  <li><span className="text-curio-secondary font-bold">Environment:</span> Desert</li>
                  <li><span className="text-curio-secondary font-bold">Water needs:</span> Very low</li>
                  <li><span className="text-curio-secondary font-bold">Sunlight:</span> High</li>
                  <li><span className="text-curio-secondary font-bold">Special:</span> Stores water in thick leaves</li>
                </ul>
                <button onClick={() => setStage('complete')} className="w-full bg-curio-secondary text-curio-dark font-bold py-3 px-8 rounded-full hover:bg-white transition-colors">
                  Generate Plant Card
                </button>
             </div>
             <div className="flex-1">
                <div className="bg-white rounded-2xl p-4 text-center transform rotate-2">
                   <div className="text-8xl mb-4">🌵</div>
                   <div className="font-bold text-curio-dark text-xl">The Super Cactus</div>
                </div>
             </div>
          </div>
        </div>
      )}

      {stage === 'complete' && (
        <div className="text-center w-full max-w-3xl animate-fade-in-up">
          <h2 className="text-4xl font-extrabold mb-8 text-curio-secondary leading-tight">
            YOU DIDN'T JUST LEARN ABOUT PLANTS.
          </h2>
          <div className="text-3xl font-bold text-white mb-12 space-y-4">
            <div>YOU <span className="text-blue-400">LEARNED</span>.</div>
            <div>YOU <span className="text-green-400">PLAYED</span>.</div>
            <div>YOU <span className="text-amber-400">DID</span>.</div>
            <div>YOU <span className="text-purple-400">CREATED</span>.</div>
          </div>
          
          <div className="bg-gray-800 rounded-3xl p-8 inline-block mb-12">
            <h3 className="font-bold text-lg mb-6 text-gray-300">Learning Impact</h3>
            <div className="flex items-center justify-center gap-12">
              <div className="text-center">
                <div className="text-4xl mb-2">⭐</div>
                <div className="font-bold text-curio-secondary">+250 XP</div>
              </div>
              <div className="text-left text-sm font-medium space-y-2 text-gray-300">
                 <div>Science <span className="text-green-400">+8</span></div>
                 <div>Observation <span className="text-green-400">+5</span></div>
                 <div>Creativity <span className="text-green-400">+4</span></div>
                 <div>Problem Solving <span className="text-green-400">+3</span></div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🏅</div>
                <div className="font-bold text-blue-400">Curio Explorer</div>
              </div>
            </div>
          </div>

          <div>
            <button onClick={() => navigate('/')} className="bg-white text-curio-dark font-bold text-xl py-4 px-12 rounded-full hover:bg-gray-200 transition-colors">
              Exit Demo
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
