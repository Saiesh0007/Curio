import React from 'react';
import { Link } from 'react-router-dom';

export default function BusinessModel() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-curio-dark mb-4">Business & Revenue Model</h1>
        <p className="text-xl text-gray-500">A sustainable path to scaling interactive learning.</p>
        <div className="inline-block mt-4 bg-yellow-100 text-yellow-800 text-sm font-bold px-4 py-1 rounded-full">
          * All pricing is Illustrative / Proposed
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
        
        {/* Freemium */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
          <div className="h-2 w-full bg-gray-300 absolute top-0 left-0"></div>
          <h2 className="text-2xl font-bold mb-2">Freemium</h2>
          <div className="text-4xl font-extrabold text-gray-800 mb-6">Free</div>
          <ul className="space-y-4 mb-8 flex-grow text-gray-600">
            <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span> Selected starter missions</li>
            <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span> Basic learning world access</li>
            <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span> Basic progress tracking</li>
          </ul>
          <button className="w-full py-3 rounded-full font-bold text-gray-700 bg-gray-100 cursor-default">Current Prototype Tier</button>
        </div>

        {/* Premium Family */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-curio-primary transform md:-translate-y-4 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 bg-curio-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
          <div className="h-2 w-full bg-curio-primary absolute top-0 left-0"></div>
          <h2 className="text-2xl font-bold mb-2 text-curio-primary">Premium Family</h2>
          <div className="text-4xl font-extrabold text-gray-800 mb-2">₹299-499<span className="text-lg text-gray-500 font-medium">/mo</span></div>
          <p className="text-sm text-gray-500 mb-6">For families seeking deep engagement.</p>
          <ul className="space-y-4 mb-8 flex-grow text-gray-700 font-medium">
            <li className="flex items-center gap-3"><span className="text-curio-primary font-bold">✓</span> Full Learning World</li>
            <li className="flex items-center gap-3"><span className="text-curio-primary font-bold">✓</span> Advanced & new weekly missions</li>
            <li className="flex items-center gap-3"><span className="text-curio-primary font-bold">✓</span> Detailed Parent Insights</li>
            <li className="flex items-center gap-3"><span className="text-curio-primary font-bold">✓</span> Personalized AI recommendations</li>
            <li className="flex items-center gap-3"><span className="text-curio-primary font-bold">✓</span> Expanded real-world activities</li>
            <li className="flex items-center gap-3"><span className="text-curio-primary font-bold">✓</span> Creation & project galleries</li>
          </ul>
          <button className="w-full py-3 rounded-full font-bold text-white bg-curio-primary hover:bg-blue-700 transition-colors">Target Subscription</button>
        </div>

        {/* Build Box */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
          <div className="h-2 w-full bg-amber-500 absolute top-0 left-0"></div>
          <h2 className="text-2xl font-bold mb-2 text-amber-600">Build Box</h2>
          <div className="text-4xl font-extrabold text-gray-800 mb-2">₹899<span className="text-lg text-gray-500 font-medium">/mo</span></div>
          <p className="text-sm text-gray-500 mb-6">Physical add-on: a monthly hands-on kit.</p>
          <ul className="space-y-4 mb-8 flex-grow text-gray-600">
            <li className="flex items-center gap-3"><span className="text-amber-500 font-bold">✓</span> One build kit every month</li>
            <li className="flex items-center gap-3"><span className="text-amber-500 font-bold">✓</span> QR unlocks the matching mission</li>
            <li className="flex items-center gap-3"><span className="text-amber-500 font-bold">✓</span> Build → test → hack challenges</li>
            <li className="flex items-center gap-3"><span className="text-amber-500 font-bold">✓</span> ~42% target contribution per box</li>
          </ul>
          <Link to="/kits" className="block text-center w-full py-3 rounded-full font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 transition-colors">See the Build Box →</Link>
        </div>

        {/* School Licensing */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
          <div className="h-2 w-full bg-green-500 absolute top-0 left-0"></div>
          <h2 className="text-2xl font-bold mb-2 text-green-600">School Licensing</h2>
          <div className="text-3xl font-extrabold text-gray-800 mb-2">Annual Institutional</div>
          <p className="text-sm text-gray-500 mb-6">B2B model for supplementary education.</p>
          <ul className="space-y-4 mb-8 flex-grow text-gray-600">
            <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span> Teacher Dashboard</li>
            <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span> Class-level analytics & gaps</li>
            <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span> Custom mission assignments</li>
            <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span> Curriculum mapping</li>
          </ul>
          <Link to="/schools" className="block text-center w-full py-3 rounded-full font-bold text-green-700 bg-green-100 hover:bg-green-200 transition-colors">See Teacher Mode →</Link>
        </div>

      </div>

      <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Growth & Partnerships Strategy</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-4xl mb-3">🏫</div>
            <div className="font-bold text-gray-700">Schools</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-4xl mb-3">🎓</div>
            <div className="font-bold text-gray-700">Educational Institutions</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-4xl mb-3">📚</div>
            <div className="font-bold text-gray-700">Publishers</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-4xl mb-3">🤝</div>
            <div className="font-bold text-gray-700">NGOs</div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
