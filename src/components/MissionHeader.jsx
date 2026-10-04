import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MissionHeader({ title, icon, onBack }) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm mb-8">
      <button 
        onClick={onBack || (() => navigate('/world'))}
        className="text-gray-500 hover:text-curio-primary font-bold px-4 py-2"
      >
        ← Back to World
      </button>
      <div className="flex items-center gap-3">
        <span className="text-3xl">{icon}</span>
        <h2 className="text-2xl font-extrabold text-curio-dark">{title}</h2>
      </div>
      <div className="w-24"></div> {/* Spacer for centering */}
    </header>
  );
}
