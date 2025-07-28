import React, { useState } from 'react';
import CardViewer from './components/cardviewer';
import Foreground from './components/foreground';
import Background from './components/background';
import Login from './components/login';
import Signup from './components/signup';
import Landingpage from './components/landingpage';
import Album from './components/album';
import Userprofile from './components/userprofile';

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
    <div className="w-full h-screen bg-[#E2E2E2]">
      {/* <CardViewer
        cards={cards}
        deckTitle={deckTitle}
        onSave={handleSaveCard}
        onAddNew={handleAddNewCard}
        onDelete={handleDeleteCard}
        onDeckDelete={handleDeckDelete}
        onDeckTitleChange={handleDeckTitleChange}
      /> */}

      {/* Toggle/Route the below components instead if needed */}
      {/* <Foreground />
      <Background /> */}
      {/* <Login onLogin={handleLogin} loading={loading} error={error || undefined} /> */}
      {/* <Signup onSignup={handleSignup} loading={loading} error={error || undefined} /> */}
      <Landingpage />
      {/* <Album deckTitle={deckTitle} cards={cards} onEdit={(id) => console.log('Edit', id)} /> */}
      {/* <Userprofile/> */}
    </div>
  );
}

export default App;
