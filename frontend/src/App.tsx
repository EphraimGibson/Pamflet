import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CardViewer from './components/cardviewer';
import Foreground from './components/foreground';
import Background from './components/background';
import Login from './components/login';
import Signup from './components/signup';
import Landingpage from './components/landingpage';
import Album from './components/album';
import Userprofile from './components/userprofile';
import Decks from './components/decks';

const initialCards = [
  { id: 1, frontText: 'Front of card 1', backText: 'Back of card 1' },
  { id: 2, frontText: 'Front of card 2', backText: 'Back of card 2' },
  { id: 3, frontText: 'Front of card 3', backText: 'Back of card 3' },
];

function App() {
  const [cards, setCards] = useState(initialCards);
  const [deckTitle, setDeckTitle] = useState('My Deck');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (username: string, password: string) => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLoading(false);
      if (username === 'user' && password === 'pass') {
        alert('Login successful!');
        // Navigate or update auth state
      } else {
        setError('Invalid username or password');
      }
    }, 1000);
  };

  const handleSignup = (username: string, email: string, password: string) => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLoading(false);
      if (username === 'error') {
        setError('User already exists');
      } else {
        alert('Account created! You can login now.');
      }
    }, 1000);
  };

  const handleSaveCard = (updatedCard: typeof initialCards[0]) => {
    setCards(prev =>
      prev.map(card => (card.id === updatedCard.id ? updatedCard : card))
    );
  };

  const handleAddNewCard = () => {
    const nextId = cards.length > 0 ? cards[cards.length - 1].id + 1 : 1;
    const newCard = {
      id: nextId,
      frontText: '',
      backText: '',
    };
    setCards(prev => [...prev, newCard]);
  };

  const handleDeleteCard = (id: number) => {
    setCards(prev => prev.filter(card => card.id !== id));
  };

  const handleDeckDelete = () => {
    const confirmed = window.confirm("Delete the entire deck?");
    if (confirmed) {
      setCards([]);
      setDeckTitle('');
    }
  };

  const handleDeckTitleChange = (newTitle: string) => {
    setDeckTitle(newTitle);
  };

  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/decks" element={<Decks />} />
      <Route path="/decks/:id" element={<CardViewer cards={cards} onSaveCard={handleSaveCard} onAddNewCard={handleAddNewCard} onDeleteCard={handleDeleteCard} onDeckDelete={handleDeckDelete} deckTitle={deckTitle} onDeckTitleChange={handleDeckTitleChange} />} />
      {/* Add other routes as needed */}
    </Routes>
  );
}

export default App;
