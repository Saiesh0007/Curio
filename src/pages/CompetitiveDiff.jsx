import React from 'react';

const COLUMNS = [
  { key: 'academic', label: 'Academic Learning' },
  { key: 'gamification', label: 'Gamification' },
  { key: 'realWorld', label: 'Real-World Application', focus: true },
  { key: 'physDig', label: 'Physical + Digital', focus: true },
  { key: 'creativity', label: 'Creativity', focus: true },
  { key: 'lifeSkills', label: 'Life Skills' },
  { key: 'parent', label: 'Parent Insights' },
  { key: 'personalization', label: 'Personalization' },
  { key: 'school', label: 'School Integration' },
];

const CURIO_ROWS = [
  {
    name: 'Curio — today', note: 'Working prototype',
    academic: 'Limited', gamification: 'Moderate', realWorld: 'Moderate', physDig: 'Moderate', creativity: 'Moderate', lifeSkills: 'Moderate', parent: 'Moderate', personalization: 'Limited', school: 'Limited',
  },
  {
    name: 'Curio — 12-month target', note: 'Where we are focusing', isTarget: true,
    academic: 'Moderate', gamification: 'Moderate', realWorld: 'Strong', physDig: 'Strong', creativity: 'Strong', lifeSkills: 'Strong', parent: 'Strong', personalization: 'Moderate', school: 'Moderate',
  },
];

const COMPETITORS = [
  { name: 'Khan Academy Kids', academic: 'Strong', gamification: 'Moderate', realWorld: 'Limited', physDig: 'Limited', creativity: 'Moderate', lifeSkills: 'Limited', parent: 'Moderate', personalization: 'Moderate', school: 'Strong' },
  { name: 'Duolingo', academic: 'Moderate', gamification: 'Strong', realWorld: 'Limited', physDig: 'Limited', creativity: 'Limited', lifeSkills: 'Limited', parent: 'Limited', personalization: 'Strong', school: 'Limited' },
  { name: "BYJU'S", academic: 'Strong', gamification: 'Moderate', realWorld: 'Limited', physDig: 'Limited', creativity: 'Limited', lifeSkills: 'Moderate', parent: 'Strong', personalization: 'Strong', school: 'Moderate' },
  { name: 'Osmo', academic: 'Moderate', gamification: 'Strong', realWorld: 'Moderate', physDig: 'Strong', creativity: 'Strong', lifeSkills: 'Moderate', parent: 'Moderate', personalization: 'Limited', school: 'Moderate' },
  { name: 'Prodigy', academic: 'Strong', gamification: 'Strong', realWorld: 'Limited', physDig: 'Limited', creativity: 'Limited', lifeSkills: 'Limited', parent: 'Moderate', personalization: 'Moderate', school: 'Strong' },
];

const MOAT_POINTS = [
  {
    icon: '🔁',
    title: 'Real-world loop by design',
    text: 'Every mission ends off-screen (DO) and comes back as a creation (CREATE). Apps optimised for time-on-screen have little incentive to send children away from the screen — we measure success by what children do offline.',
  },
  {
    icon: '🇮🇳',
    title: 'India-first, multilingual',
    text: 'Missions use ₹, Indian names and everyday Indian contexts, with English, Hindi and Marathi from day one. Localised content takes time and cultural insight to build well.',
  },
  {
    icon: '📈',
    title: 'Data competitors don’t collect',
    text: 'Logged real-world activities show how children apply learning, not just whether they answered correctly. This compounds into better recommendations and richer parent insights over time.',
  },
  {
    icon: '🧰',
    title: 'Physical kits connected to the app',
    text: 'The Curio Build Box pairs a monthly hands-on kit with a mission. Designing, sourcing and delivering kits is operational know-how that app-only competitors don’t have.',
  },
  {
    icon: '🏫',
    title: 'Home + school network',
    text: 'The same missions work for families and classrooms. Each school partnership brings families in, and each family can introduce Curio to their school.',
  },
];

const getBadgeClass = (value) => {
  if (value === 'Strong') return 'bg-green-100 text-green-800 font-bold';
  if (value === 'Moderate') return 'bg-yellow-100 text-yellow-800 font-medium';
  return 'bg-gray-100 text-gray-500';
};

export default function CompetitiveDiff() {
  const renderRow = (row, curio) => (
    <tr
      key={row.name}
      className={`border-b border-gray-100 transition-colors ${
        row.isTarget ? 'bg-curio-primary/5 border-dashed' : curio ? 'bg-blue-50/30' : 'hover:bg-gray-50'
      }`}
    >
      <td className={`p-4 border-r border-gray-200 font-bold ${curio ? 'text-curio-primary' : 'text-gray-700'}`}>
        {row.name}
        {row.note && <div className="text-xs text-blue-500 uppercase mt-1 tracking-wider">{row.note}</div>}
      </td>
      {COLUMNS.map(col => (
        <td key={col.key} className={`p-4 ${col.focus ? 'bg-curio-light/30' : ''}`}>
          <span className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${getBadgeClass(row[col.key])} ${row.isTarget ? 'ring-1 ring-curio-primary/30' : ''}`}>
            {row[col.key]}
          </span>
        </td>
      ))}
    </tr>
  );

  return (
    <div className="max-w-7xl mx-auto py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-curio-dark mb-4">Competitive Differentiation</h1>
        <p className="text-xl text-gray-500">Great products already exist. Here is the gap Curio is built to fill.</p>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[960px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-bold text-gray-700 border-r border-gray-200">Platform</th>
              {COLUMNS.map(col => (
                <th key={col.key} className={`p-4 font-bold text-gray-600 text-sm ${col.focus ? 'bg-curio-light' : ''}`}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CURIO_ROWS.map(row => renderRow(row, true))}
            {COMPETITORS.map(row => renderRow(row, false))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 mt-3 text-center max-w-3xl mx-auto">
        Ratings are our team’s assessment based on publicly available product information for the 5–8 age group, and are meant to show positioning rather than overall quality.
        Highlighted columns are where Curio focuses.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-extrabold text-center text-curio-dark mb-2">Why it’s hard to copy</h2>
        <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
          Any single feature can be copied. Our advantage is the combination, and the focus on learning that leaves the screen.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOAT_POINTS.map(p => (
            <div key={p.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4 items-start">
              <div className="text-4xl">{p.icon}</div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-curio-dark">{p.title}</h3>
                <p className="text-gray-600">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 bg-curio-light rounded-2xl p-6 border border-gray-200 text-center">
        <h3 className="font-bold text-lg text-curio-dark mb-2">The Curio Moat</h3>
        <p className="text-gray-700 max-w-3xl mx-auto">
          Curio sits at the intersection of <strong className="text-curio-primary">Real-World Application</strong>, <strong className="text-curio-primary">Creativity</strong>, and <strong className="text-curio-primary">Physical-Digital</strong> play,
          built for Indian families. We don’t just test knowledge; we ask children to use it and create with it.
        </p>
      </div>
    </div>
  );
}
