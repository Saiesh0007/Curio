import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLearner } from '../context/LearnerContext';
import MissionHeader from '../components/MissionHeader';

const MARKET_ITEMS = [
  { id: 'sandwich', name: 'Sandwich', price: 40, emoji: '🥪' },
  { id: 'juice', name: 'Juice', price: 25, emoji: '🧃' },
  { id: 'fruit', name: 'Fruit', price: 30, emoji: '🍎' },
  { id: 'chips', name: 'Chips', price: 20, emoji: '🥔' },
  { id: 'cookies', name: 'Cookies', price: 35, emoji: '🍪' },
  { id: 'water', name: 'Water', price: 15, emoji: '💧' }
];

export default function MarketplaceMission() {
  const { completeMission } = useLearner();
  const navigate = useNavigate();

  const [cart, setCart] = useState({});
  const [stage, setStage] = useState('shop'); // 'shop', 'decision', 'complete'
  const [feedback, setFeedback] = useState('');
  const [hint, setHint] = useState('');

  const BUDGET = 200;

  const totalSpent = Object.entries(cart).reduce((total, [itemId, quantity]) => {
    const item = MARKET_ITEMS.find(i => i.id === itemId);
    return total + (item.price * quantity);
  }, 0);

  const remaining = BUDGET - totalSpent;

  const addToCart = (id) => {
    const item = MARKET_ITEMS.find(i => i.id === id);
    if (remaining - item.price >= 0) {
      setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
      setHint('');
    } else {
      setHint(`Not enough money for ${item.name}! You only have ₹${remaining} left.`);
    }
  };

  const removeFromCart = (id) => {
    if (cart[id] > 0) {
      setCart(prev => ({ ...prev, [id]: prev[id] - 1 }));
      setHint('');
    }
  };

  const totalItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const handleCheckout = () => {
    if (totalItemsCount >= 5) {
      setStage('decision');
    } else {
      setHint(`Make sure you get enough for all 5 friends! You have ${totalItemsCount} item${totalItemsCount === 1 ? '' : 's'} so far.`);
    }
  };

  const handleDecision = (choice) => {
    let msg = "";
    if (choice === 'save') msg = "Great thinking! Saving money is a smart way to prepare for the future.";
    if (choice === 'food') msg = "Generous! Making sure everyone has plenty to eat is kind.";
    if (choice === 'fun') msg = "Fun is important! A little treat makes the picnic special.";
    if (choice === 'donate') msg = "How wonderful! Helping others is a beautiful way to use extra resources.";
    
    setFeedback(msg);
    setStage('complete');
    
    // Complete mission logic
    completeMission(
      'marketplaceMission', 
      150, 
      { Math: 5, FinancialLiteracy: 10, DecisionMaking: 5 }, 
      'Money Explorer'
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <MissionHeader title="Plan the Perfect Picnic" icon="🏪" />

      {stage === 'shop' && (
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <p className="text-xl mb-6 text-gray-700">
            You have <span className="font-bold text-green-600">₹{BUDGET}</span> to plan a picnic for five friends.
          </p>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 grid grid-cols-2 gap-4">
              {MARKET_ITEMS.map(item => (
                <div key={item.id} className="border-2 rounded-2xl p-4 flex flex-col items-center text-center">
                  <div className="text-4xl mb-2">{item.emoji}</div>
                  <div className="font-bold">{item.name}</div>
                  <div className="text-green-600 font-medium mb-3">₹{item.price}</div>
                  <div className="flex items-center gap-4 bg-gray-100 rounded-full px-3 py-1">
                    <button onClick={() => removeFromCart(item.id)} className="font-bold text-xl px-2 text-red-500 hover:text-red-700">-</button>
                    <span className="font-bold w-4">{cart[item.id] || 0}</span>
                    <button onClick={() => addToCart(item.id)} className="font-bold text-xl px-2 text-curio-primary hover:text-blue-700">+</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full md:w-72 bg-gray-50 rounded-2xl p-6 border flex flex-col">
              <h3 className="font-bold text-lg mb-4 border-b pb-2">Your Basket</h3>
              <div className="flex-grow space-y-2 mb-4">
                {Object.entries(cart).map(([id, qty]) => {
                  if (qty === 0) return null;
                  const item = MARKET_ITEMS.find(i => i.id === id);
                  return (
                    <div key={id} className="flex justify-between text-sm">
                      <span>{item.name} x{qty}</span>
                      <span>₹{item.price * qty}</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold mb-2">
                  <span>Total:</span>
                  <span>₹{totalSpent}</span>
                </div>
                <div className="flex justify-between font-bold text-green-600 mb-6">
                  <span>Remaining:</span>
                  <span>₹{remaining}</span>
                </div>
                {hint && (
                  <div role="status" className="mb-4 bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium rounded-xl p-3 animate-fade-in-up">
                    {hint}
                  </div>
                )}
                <button 
                  onClick={handleCheckout}
                  disabled={totalItemsCount === 0}
                  className="w-full bg-curio-primary text-white font-bold py-3 rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {stage === 'decision' && (
        <div className="bg-white rounded-3xl p-8 shadow-sm text-center">
          <h2 className="text-3xl font-extrabold mb-6">You have ₹{remaining} left!</h2>
          <p className="text-xl mb-8">What should you do with the extra money?</p>
          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
            <button onClick={() => handleDecision('food')} className="bg-orange-100 hover:bg-orange-200 text-orange-800 font-bold p-4 rounded-xl transition-colors">Buy more food</button>
            <button onClick={() => handleDecision('save')} className="bg-green-100 hover:bg-green-200 text-green-800 font-bold p-4 rounded-xl transition-colors">Save the money</button>
            <button onClick={() => handleDecision('fun')} className="bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold p-4 rounded-xl transition-colors">Buy something fun</button>
            <button onClick={() => handleDecision('donate')} className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold p-4 rounded-xl transition-colors">Donate it</button>
          </div>
        </div>
      )}

      {stage === 'complete' && (
        <div className="bg-white rounded-3xl p-8 shadow-sm text-center animate-fade-in-up">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-4xl font-extrabold text-curio-primary mb-2">MISSION COMPLETE</h2>
          <p className="text-xl text-gray-700 mb-8">{feedback}</p>
          
          <div className="bg-curio-light rounded-2xl p-6 inline-block mb-8">
            <h3 className="font-bold text-lg mb-4">Rewards Unlocked!</h3>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-4xl mb-2">⭐</div>
                <div className="font-bold text-curio-primary">+150 XP</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🏅</div>
                <div className="font-bold text-yellow-500">Money Explorer Badge</div>
              </div>
            </div>
          </div>

          <div>
            <button onClick={() => navigate('/world')} className="bg-curio-dark text-white font-bold py-3 px-8 rounded-full hover:bg-black transition-colors">
              Return to World Map
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
