import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/authService';

interface Deck {
  id: number;
  name: string;
  description: string;
  cardCount: number;
}

const Decks: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!AuthService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    // For now, let's use sample data
    // In a real app, you would fetch from the backend
    const sampleDecks: Deck[] = [
      { id: 1, name: 'Programming Concepts', description: 'Basic programming terms and concepts', cardCount: 25 },
      { id: 2, name: 'React Fundamentals', description: 'Core React concepts and hooks', cardCount: 15 },
      { id: 3, name: 'Java Essentials', description: 'Java language basics and syntax', cardCount: 30 },
    ];

    // Simulate API call
    setTimeout(() => {
      setDecks(sampleDecks);
      setLoading(false);
    }, 500);
  }, [navigate]);

  const handleCreateDeck = () => {
    // In a real app, this would navigate to a create deck form
    alert('Create new deck feature coming soon!');
  };

  const handleDeckClick = (deckId: number) => {
    // Navigate to deck detail view
    navigate(`/decks/${deckId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#e2e2e2]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2e2e2e]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e2e2e2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#2e2e2e]">My Decks</h1>
          <button
            onClick={handleCreateDeck}
            className="px-6 py-3 rounded-xl border-2 border-[#2e2e2e] bg-blue-300 text-[#2e2e2e] font-bold hover:bg-blue-400 transition"
          >
            Create New Deck
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-400 bg-red-100 rounded">
            {error}
          </div>
        )}

        {decks.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-400 rounded-2xl bg-white">
            <p className="text-xl text-gray-500">You don't have any decks yet</p>
            <button
              onClick={handleCreateDeck}
              className="mt-4 px-6 py-3 rounded-xl border-2 border-[#2e2e2e] bg-blue-300 text-[#2e2e2e] font-bold hover:bg-blue-400 transition"
            >
              Create Your First Deck
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck) => (
              <div
                key={deck.id}
                onClick={() => handleDeckClick(deck.id)}
                className="border-2 border-[#2e2e2e] rounded-2xl bg-white p-6 hover:shadow-lg transition cursor-pointer"
              >
                <h2 className="text-xl font-bold text-[#2e2e2e] mb-2">{deck.name}</h2>
                <p className="text-gray-600 mb-4">{deck.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{deck.cardCount} cards</span>
                  <button
                    className="px-4 py-2 rounded-lg text-[#2e2e2e] bg-blue-200 hover:bg-blue-300 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/decks/${deck.id}/study`);
                    }}
                  >
                    Study
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Decks;
