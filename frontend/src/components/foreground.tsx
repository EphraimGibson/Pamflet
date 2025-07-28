import React, { useState } from 'react';
import Deck from './deck';
import Sidebar from './sidebar';
import Navbar from './navbar';

type Priority = 'High' | 'Medium' | 'Low';

type DeckType = {
  id: number;
  priority: Priority;
  title: string;
};

function Foreground() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [decks, setDecks] = useState<DeckType[]>([
    { id: 1, priority: 'High', title: 'Deck One' },
    { id: 2, priority: 'Medium', title: 'Deck Two' },
  ]);

  const priorityOrder: Record<Priority, number> = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  const colorMap: Record<Priority, string> = {
    High: 'bg-[#CF1717]/60',
    Medium: 'bg-[#F2C70D]/60',
    Low: 'bg-[#33CC34]/60',
  };

  // Add new deck with default priority and title
  const handleCreateNewDeck = () => {
    const newId = decks.length > 0 ? decks[decks.length - 1].id + 1 : 1;
    setDecks(prev => [
      ...prev,
      { id: newId, priority: 'Low', title: `Deck ${newId}` },
    ]);
  };

  // Update priority for a deck
  const handlePriorityChange = (id: number, newPriority: Priority) => {
    setDecks(prev =>
      prev.map(deck =>
        deck.id === id ? { ...deck, priority: newPriority } : deck
      )
    );
  };

  const handleTitleChange = (id: number, newTitle: string) => {
    setDecks(prev =>
      prev.map(deck => (deck.id === id ? { ...deck, title: newTitle } : deck))
    );
  };

  const sortedDecks = [...decks].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  return (
    <>
      <Navbar onToggleSidebar={() => setSidebarOpen(open => !open)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="fixed top-16 left-0 bottom-0 right-0 z-40 p-10 flex gap-5 flex-wrap overflow-auto transition-transform duration-300 ease-in-out">
        {/* Create New Deck button */}
        <button
          onClick={handleCreateNewDeck}
          className="w-80 h-[400px] bg-zinc-300/80 rounded-[40px] flex flex-col items-center justify-center text-zinc-600 text-xl font-semibold hover:bg-zinc-400/40 transition-colors cursor-pointer select-none"
          aria-label="Create new deck"
          title="Create New Deck"
        >
          <span className="text-7xl mb-4">+</span>
          Create New Deck
        </button>

        {sortedDecks.map(deck => (
          <Deck
            key={deck.id}
            title={deck.title}
            priority={deck.priority}
            onPriorityChange={(newPriority) =>
              handlePriorityChange(deck.id, newPriority)
            }
            onTitleChange={(newTitle) =>
              handleTitleChange(deck.id, newTitle)
            }
            bgColorClass={colorMap[deck.priority]}
            onEdit={() => alert(`Edit deck ${deck.id}`)}
            onView={() => alert(`View deck ${deck.id}`)}
          />
        ))}
      </div>
    </>
  );
}

export default Foreground;
