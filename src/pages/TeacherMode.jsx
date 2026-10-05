import React, { useMemo, useState } from 'react';

const SKILLS = ['Math', 'Science', 'Reading', 'Creativity', 'Life Skills'];

const STUDENTS = [
  { name: 'Aarav', scores: [82, 91, 61, 84, 58], realWorld: 4 },
  { name: 'Maya', scores: [74, 68, 88, 92, 71], realWorld: 5 },
  { name: 'Ishaan', scores: [91, 77, 54, 63, 49], realWorld: 2 },
  { name: 'Ananya', scores: [66, 82, 79, 71, 64], realWorld: 3 },
  { name: 'Vihaan', scores: [48, 59, 45, 76, 42], realWorld: 1 },
  { name: 'Saanvi', scores: [85, 73, 90, 68, 66], realWorld: 4 },
  { name: 'Kabir', scores: [57, 88, 62, 55, 47], realWorld: 2 },
  { name: 'Diya', scores: [79, 64, 71, 89, 73], realWorld: 6 },
  { name: 'Arjun', scores: [62, 55, 49, 58, 39], realWorld: 1 },
  { name: 'Meera', scores: [88, 81, 84, 77, 69], realWorld: 5 },
  { name: 'Reyansh', scores: [53, 70, 58, 81, 52], realWorld: 3 },
  { name: 'Zara', scores: [70, 86, 76, 65, 61], realWorld: 4 },
];

const MISSIONS = [
  { id: 'marketplace', name: 'Plan the Perfect Picnic', place: 'Marketplace', icon: '🏪', skill: 'Life Skills', available: true },
  { id: 'science', name: 'Grow a Plant', place: 'Science Lab', icon: '🔬', skill: 'Science', available: true },
  { id: 'space', name: 'Choose the Right Planet', place: 'Space Station', icon: '🚀', skill: 'Science', available: true },
  { id: 'creative', name: 'Design Your Own Creature', place: 'Creative Studio', icon: '🎨', skill: 'Creativity', available: true },
  { id: 'inventor', name: 'Build a Bridge', place: "Inventor's Workshop", icon: '💡', skill: 'Math', available: true },
  { id: 'forest', name: 'Nature Detective', place: 'Explorer Forest', icon: '🌳', skill: 'Science', available: false },
  { id: 'story', name: 'Finish the Story', place: 'Story Village', icon: '📖', skill: 'Reading', available: false },
];

const CURRICULUM = [
  { mission: 'marketplace', area: 'Mathematics', goals: 'Addition and subtraction with money, estimation, comparing quantities', extra: 'Life skills: budgeting, making choices' },
  { mission: 'science', area: 'Environmental awareness', goals: 'Needs of living things, cause and effect, simple experiments', extra: 'Real-world: observe a plant for 3 days' },
  { mission: 'space', area: 'Reasoning & science', goals: 'Comparing and classifying using properties, making decisions from evidence', extra: 'Vocabulary: hot, cold, air, water' },
  { mission: 'creative', area: 'Arts & expression', goals: 'Design, imagination, describing features and purpose', extra: 'Language: explaining one’s creation' },
  { mission: 'inventor', area: 'Mathematics & design', goals: 'Shapes, measurement, testing and improving a design', extra: 'Classroom Pack: Bridge Builder Kit' },
  { mission: 'forest', area: 'Environmental awareness', goals: 'Observing and classifying plants, animals and natural objects', extra: 'Coming soon' },
  { mission: 'story', area: 'Language & literacy', goals: 'Vocabulary, sequencing events, reading comprehension', extra: 'Coming soon' },
];

const cellClass = (v) => {
  if (v >= 75) return 'bg-green-100 text-green-800';
  if (v >= 50) return 'bg-yellow-100 text-yellow-800';
  return 'bg-rose-100 text-rose-800 font-bold';
};

const missionById = (id) => MISSIONS.find(m => m.id === id);

function Overview({ onAssignForGap }) {
  const averages = useMemo(
    () => SKILLS.map((_, i) => Math.round(STUDENTS.reduce((sum, s) => sum + s.scores[i], 0) / STUDENTS.length)),
    []
  );
  const gapIndex = averages.indexOf(Math.min(...averages));
  const strongIndex = averages.indexOf(Math.max(...averages));
  const needSupport = STUDENTS.filter(s => s.scores[gapIndex] < 50);
  const totalRealWorld = STUDENTS.reduce((sum, s) => sum + s.realWorld, 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Students', value: STUDENTS.length, tone: 'text-curio-primary' },
          { label: 'Missions completed this week', value: 38, tone: 'text-blue-600' },
          { label: 'Real-world activities logged', value: totalRealWorld, tone: 'text-green-600' },
          { label: 'Class average', value: `${Math.round(averages.reduce((a, b) => a + b, 0) / averages.length)}%`, tone: 'text-gray-800' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className={`text-3xl font-extrabold ${stat.tone}`}>{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-rose-700 mb-2">Class gap</div>
          <h3 className="text-xl font-bold text-rose-900 mb-2">{SKILLS[gapIndex]} — class average {averages[gapIndex]}%</h3>
          <p className="text-rose-800 mb-4">
            {needSupport.length} student{needSupport.length === 1 ? '' : 's'} below 50%: {needSupport.map(s => s.name).join(', ') || 'none'}.
          </p>
          <button
            onClick={() => onAssignForGap(SKILLS[gapIndex], needSupport.map(s => s.name))}
            className="bg-rose-600 text-white font-bold px-5 py-2 rounded-full hover:bg-rose-700 transition-colors"
          >
            Assign a support mission →
          </button>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-green-700 mb-2">Class strength</div>
          <h3 className="text-xl font-bold text-green-900 mb-2">{SKILLS[strongIndex]} — class average {averages[strongIndex]}%</h3>
          <p className="text-green-800">
            Emerging strength across the class. Consider a group CREATE project to let students teach each other.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-3 font-bold text-gray-700">Student</th>
              {SKILLS.map((s, i) => (
                <th key={s} className={`p-3 font-bold text-sm text-center ${i === gapIndex ? 'text-rose-700' : 'text-gray-600'}`}>{s}</th>
              ))}
              <th className="p-3 font-bold text-sm text-center text-gray-600">Real-world</th>
            </tr>
          </thead>
          <tbody>
            {STUDENTS.map(st => (
              <tr key={st.name} className="border-b border-gray-100">
                <td className="p-3 font-bold text-gray-800">{st.name}</td>
                {st.scores.map((v, i) => (
                  <td key={SKILLS[i]} className="p-2 text-center">
                    <span className={`inline-block w-12 py-1 rounded-lg text-sm ${cellClass(v)}`}>{v}</span>
                  </td>
                ))}
                <td className="p-2 text-center font-bold text-green-700">{st.realWorld}</td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-bold">
              <td className="p-3 text-gray-700">Class average</td>
              {averages.map((v, i) => (
                <td key={SKILLS[i]} className="p-2 text-center">
                  <span className={`inline-block w-12 py-1 rounded-lg text-sm ${cellClass(v)}`}>{v}</span>
                </td>
              ))}
              <td className="p-2 text-center text-green-700">{totalRealWorld}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
        <span><span className="inline-block w-3 h-3 rounded bg-green-100 mr-1 align-middle"></span>75+ strong</span>
        <span><span className="inline-block w-3 h-3 rounded bg-yellow-100 mr-1 align-middle"></span>50–74 developing</span>
        <span><span className="inline-block w-3 h-3 rounded bg-rose-100 mr-1 align-middle"></span>Below 50 needs support</span>
      </div>
    </div>
  );
}

function Assign({ assignments, onCreate, preset }) {
  const [missionId, setMissionId] = useState(preset?.missionId || 'marketplace');
  const [target, setTarget] = useState(preset?.students?.length ? 'selected' : 'class');
  const [selected, setSelected] = useState(preset?.students || []);
  const [due, setDue] = useState('Friday');
  const [realWorld, setRealWorld] = useState(true);
  const [confirmation, setConfirmation] = useState('');

  const toggleStudent = (name) =>
    setSelected(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);

  const canSubmit = target === 'class' || selected.length > 0;

  const submit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    const students = target === 'class' ? STUDENTS.map(s => s.name) : selected;
    onCreate({ missionId, students, due, realWorld });
    setConfirmation(`Assigned “${missionById(missionId).name}” to ${target === 'class' ? 'the whole class' : `${students.length} student${students.length === 1 ? '' : 's'}`}. Parents will see it in their dashboard.`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <form onSubmit={submit} className="lg:col-span-3 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
        <div>
          <h3 className="font-bold text-gray-800 mb-3">1. Choose a mission</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MISSIONS.map(m => (
              <button
                type="button"
                key={m.id}
                disabled={!m.available}
                onClick={() => { setMissionId(m.id); setConfirmation(''); }}
                className={`text-left p-3 rounded-xl border-2 flex items-center gap-3 transition-colors ${
                  !m.available ? 'opacity-50 cursor-not-allowed border-gray-100'
                    : missionId === m.id ? 'border-curio-primary bg-curio-primary/5' : 'border-gray-100 hover:border-gray-300'
                }`}
              >
                <span className="text-2xl">{m.icon}</span>
                <span>
                  <span className="block font-bold text-sm text-gray-800">{m.name}</span>
                  <span className="block text-xs text-gray-500">{m.available ? `${m.place} · ${m.skill}` : 'Coming soon'}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-800 mb-3">2. Who is it for?</h3>
          <div className="flex gap-2 mb-3">
            {[['class', 'Whole class'], ['selected', 'Selected students']].map(([value, label]) => (
              <button
                type="button"
                key={value}
                onClick={() => { setTarget(value); setConfirmation(''); }}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${target === value ? 'bg-curio-primary text-white border-curio-primary' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}
              >
                {label}
              </button>
            ))}
          </div>
          {target === 'selected' && (
            <div className="flex flex-wrap gap-2">
              {STUDENTS.map(s => (
                <button
                  type="button"
                  key={s.name}
                  onClick={() => { toggleStudent(s.name); setConfirmation(''); }}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${selected.includes(s.name) ? 'bg-curio-secondary/20 border-curio-secondary text-curio-dark font-bold' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="font-bold text-gray-800 block mb-2">3. Due</span>
            <select value={due} onChange={(e) => setDue(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 focus:border-curio-primary outline-none">
              {['Tomorrow', 'Friday', 'Next Monday', 'End of month'].map(d => <option key={d}>{d}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-3 sm:mt-8 cursor-pointer">
            <input type="checkbox" checked={realWorld} onChange={(e) => setRealWorld(e.target.checked)} className="w-5 h-5 accent-curio-primary" />
            <span className="text-gray-700 font-medium">Include real-world home activity</span>
          </label>
        </div>

        <button type="submit" disabled={!canSubmit} className="w-full bg-curio-primary text-white font-bold py-3 rounded-full hover:opacity-90 disabled:opacity-40 transition-opacity">
          Assign mission
        </button>
        {confirmation && (
          <div role="status" className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-3 text-sm font-medium animate-fade-in-up">
            ✅ {confirmation}
          </div>
        )}
      </form>

      <div className="lg:col-span-2">
        <h3 className="font-bold text-gray-800 mb-3">Active assignments</h3>
        <ul className="space-y-3">
          {assignments.map(a => {
            const m = missionById(a.missionId);
            return (
              <li key={a.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-fade-in-up">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{m.icon}</span>
                  <div className="flex-1">
                    <div className="font-bold text-gray-800">{m.name}</div>
                    <div className="text-xs text-gray-500">
                      {a.students.length === STUDENTS.length ? 'Whole class' : a.students.join(', ')} · Due {a.due}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-curio-primary" style={{ width: `${Math.round((a.done / a.students.length) * 100)}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-gray-500">{a.done}/{a.students.length} done</span>
                </div>
                {a.realWorld && <div className="text-xs text-green-700 mt-2">🌱 Includes real-world home activity</div>}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function CurriculumMap() {
  return (
    <div>
      <p className="text-gray-600 mb-6 max-w-3xl">
        Each mission is mapped to foundational-stage learning areas (ages 3–8) from NEP 2020 and the National Curriculum Framework for the
        Foundational Stage (NCF-FS 2022), so teachers can use Curio alongside their existing lesson plans.
      </p>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[720px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-bold text-gray-700">Mission</th>
              <th className="p-4 font-bold text-gray-600 text-sm">Learning area</th>
              <th className="p-4 font-bold text-gray-600 text-sm">What children practise</th>
              <th className="p-4 font-bold text-gray-600 text-sm">Also covers</th>
            </tr>
          </thead>
          <tbody>
            {CURRICULUM.map(row => {
              const m = missionById(row.mission);
              return (
                <tr key={row.mission} className={`border-b border-gray-100 ${m.available ? '' : 'opacity-50'}`}>
                  <td className="p-4">
                    <div className="flex items-center gap-2 font-bold text-gray-800"><span className="text-xl">{m.icon}</span>{m.name}</div>
                    <div className="text-xs text-gray-500 ml-8">{m.place}</div>
                  </td>
                  <td className="p-4"><span className="bg-curio-primary/10 text-curio-primary text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">{row.area}</span></td>
                  <td className="p-4 text-gray-700 text-sm">{row.goals}</td>
                  <td className="p-4 text-gray-500 text-sm">{row.extra}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 mt-3">Indicative mapping prepared by the Curio team; to be validated with partner teachers during school pilots.</p>
    </div>
  );
}

const TABS = [
  { id: 'overview', label: 'Class Overview' },
  { id: 'assign', label: 'Assign Missions' },
  { id: 'curriculum', label: 'Curriculum Map' },
];

export default function TeacherMode() {
  const [tab, setTab] = useState('overview');
  const [preset, setPreset] = useState(null);
  const [assignments, setAssignments] = useState([
    { id: 1, missionId: 'science', students: STUDENTS.map(s => s.name), due: 'Friday', realWorld: true, done: 7 },
  ]);

  const createAssignment = (a) =>
    setAssignments(prev => [{ ...a, id: Date.now(), done: 0 }, ...prev]);

  const assignForGap = (skill, students) => {
    const mission = MISSIONS.find(m => m.available && m.skill === skill) || MISSIONS[0];
    setPreset({ missionId: mission.id, students, key: Date.now() });
    setTab('assign');
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <header className="mb-8 flex flex-wrap justify-between items-end gap-4 border-b pb-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-green-600 mb-1">School / Teacher Mode</div>
          <h1 className="text-4xl font-extrabold text-curio-dark">Class 2B · Mrs. Kulkarni</h1>
          <p className="text-gray-500 mt-1">Sunrise Public School, Pune</p>
        </div>
        <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-4 py-1 rounded-full">Demo class · sample data</span>
      </header>

      <nav className="flex gap-2 mb-8 overflow-x-auto" role="tablist">
        {TABS.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => { setTab(t.id); if (t.id !== 'assign') setPreset(null); }}
            className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors ${tab === t.id ? 'bg-curio-dark text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {tab === 'overview' && <Overview onAssignForGap={assignForGap} />}
      {tab === 'assign' && <Assign key={preset?.key || 'default'} preset={preset} assignments={assignments} onCreate={createAssignment} />}
      {tab === 'curriculum' && <CurriculumMap />}
    </div>
  );
}
