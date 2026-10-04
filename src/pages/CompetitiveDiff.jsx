import React from 'react';

const COMPETITORS = [
  { name: 'Curio (Us)', academic: 'Strong', gamification: 'Strong', realWorld: 'Strong', physDig: 'Strong', creativity: 'Strong', lifeSkills: 'Strong', parent: 'Strong', personalization: 'Strong', school: 'Moderate', isUs: true },
  { name: 'Khan Academy Kids', academic: 'Strong', gamification: 'Moderate', realWorld: 'Limited', physDig: 'Limited', creativity: 'Moderate', lifeSkills: 'Limited', parent: 'Moderate', personalization: 'Moderate', school: 'Strong' },
  { name: 'Duolingo', academic: 'Moderate', gamification: 'Strong', realWorld: 'Limited', physDig: 'Limited', creativity: 'Limited', lifeSkills: 'Limited', parent: 'Limited', personalization: 'Strong', school: 'Limited' },
  { name: "BYJU'S", academic: 'Strong', gamification: 'Moderate', realWorld: 'Limited', physDig: 'Limited', creativity: 'Limited', lifeSkills: 'Moderate', parent: 'Strong', personalization: 'Strong', school: 'Moderate' },
  { name: 'Osmo', academic: 'Moderate', gamification: 'Strong', realWorld: 'Moderate', physDig: 'Strong', creativity: 'Strong', lifeSkills: 'Moderate', parent: 'Moderate', personalization: 'Limited', school: 'Moderate' },
  { name: 'Prodigy', academic: 'Strong', gamification: 'Strong', realWorld: 'Limited', physDig: 'Limited', creativity: 'Limited', lifeSkills: 'Limited', parent: 'Moderate', personalization: 'Moderate', school: 'Strong' },
];

export default function CompetitiveDiff() {
  
  const getBadgeClass = (value) => {
    if (value === 'Strong') return 'bg-green-100 text-green-800 font-bold';
    if (value === 'Moderate') return 'bg-yellow-100 text-yellow-800 font-medium';
    return 'bg-gray-100 text-gray-500';
  };

  return (
    <div className="max-w-7xl mx-auto py-8 overflow-x-auto">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-curio-dark mb-4">Competitive Differentiation</h1>
        <p className="text-xl text-gray-500">Why Curio stands out in the EdTech landscape.</p>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-bold text-gray-700 border-r border-gray-200">Platform</th>
              <th className="p-4 font-bold text-gray-600 text-sm">Academic Learning</th>
              <th className="p-4 font-bold text-gray-600 text-sm">Gamification</th>
              <th className="p-4 font-bold text-gray-600 text-sm bg-curio-light">Real-World Application</th>
              <th className="p-4 font-bold text-gray-600 text-sm bg-curio-light">Physical + Digital</th>
              <th className="p-4 font-bold text-gray-600 text-sm bg-curio-light">Creativity</th>
              <th className="p-4 font-bold text-gray-600 text-sm">Life Skills</th>
              <th className="p-4 font-bold text-gray-600 text-sm">Parent Insights</th>
              <th className="p-4 font-bold text-gray-600 text-sm">Personalization</th>
              <th className="p-4 font-bold text-gray-600 text-sm">School Integration</th>
            </tr>
          </thead>
          <tbody>
            {COMPETITORS.map((comp, idx) => (
              <tr key={comp.name} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${comp.isUs ? 'bg-blue-50/30' : ''}`}>
                <td className={`p-4 border-r border-gray-200 font-bold ${comp.isUs ? 'text-curio-primary text-lg' : 'text-gray-700'}`}>
                  {comp.name}
                  {comp.isUs && <div className="text-xs text-blue-500 uppercase mt-1 tracking-wider">Our Moat</div>}
                </td>
                <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs ${getBadgeClass(comp.academic)}`}>{comp.academic}</span></td>
                <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs ${getBadgeClass(comp.gamification)}`}>{comp.gamification}</span></td>
                <td className="p-4 bg-curio-light/30"><span className={`px-3 py-1 rounded-full text-xs ${getBadgeClass(comp.realWorld)}`}>{comp.realWorld}</span></td>
                <td className="p-4 bg-curio-light/30"><span className={`px-3 py-1 rounded-full text-xs ${getBadgeClass(comp.physDig)}`}>{comp.physDig}</span></td>
                <td className="p-4 bg-curio-light/30"><span className={`px-3 py-1 rounded-full text-xs ${getBadgeClass(comp.creativity)}`}>{comp.creativity}</span></td>
                <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs ${getBadgeClass(comp.lifeSkills)}`}>{comp.lifeSkills}</span></td>
                <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs ${getBadgeClass(comp.parent)}`}>{comp.parent}</span></td>
                <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs ${getBadgeClass(comp.personalization)}`}>{comp.personalization}</span></td>
                <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs ${getBadgeClass(comp.school)}`}>{comp.school}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 bg-curio-light rounded-2xl p-6 border border-gray-200 text-center">
        <h3 className="font-bold text-lg text-curio-dark mb-2">The Curio Moat</h3>
        <p className="text-gray-700 max-w-3xl mx-auto">
          While competitors excel purely in screen-based academics or habit formation, Curio's unique advantage lies in the 
          intersection of <strong className="text-curio-primary">Real-World Application</strong>, <strong className="text-curio-primary">Creativity</strong>, and <strong className="text-curio-primary">Physical-Digital</strong> play. We don't just test knowledge; we ask children to create with it.
        </p>
      </div>

    </div>
  );
}
