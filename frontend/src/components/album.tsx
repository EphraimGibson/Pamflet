import React, { useState, useEffect } from "react";

type Card = {
  id: number;
  frontText: string;
  backText: string;
};

interface AlbumProps {
  deckTitle: string;
  cards: Card[];
  onEdit: (cardId: number) => void;
}

const Album: React.FC<AlbumProps> = ({ deckTitle, cards, onEdit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
    if (currentIndex >= cards.length) {
      setCurrentIndex(cards.length - 1 >= 0 ? cards.length - 1 : 0);
    }
  }, [cards, currentIndex]);

  if (cards.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-700 mb-8">{deckTitle || "Deck"}</h1>
        <p className="text-gray-500 text-lg">No cards available in this deck.</p>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goNext = () => {
    if (currentIndex < cards.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center p-6 bg-[#e2e2e2]">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-700 mb-10 select-none">{deckTitle}</h1>

      {/* Card with navigation arrows */}
      <div className="flex items-center justify-center gap-6">
        {/* Prev Button */}
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className={`w-10 h-10 flex items-center justify-center rounded-full border text-xl transition ${
            currentIndex === 0
              ? "text-gray-300 border-gray-300 cursor-not-allowed"
              : "text-gray-700 border-gray-400 hover:bg-gray-100"
          }`}
          aria-label="Previous card"
        >
          &larr;
        </button>

        {/* Flashcard */}
        <div
          className="relative w-[60vw] h-[30vw] perspective"
          style={{ perspective: 1000 }}
        >
          <div
            className="relative w-full h-full transition-transform duration-700 ease-in-out transform-style-preserve-3d rounded-xl shadow-xl bg-white text-gray-800 border-2 border-[#2e2e2e]"
            style={{
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front Side */}
            <div
              className="absolute w-full h-full p-6 backface-hidden overflow-y-auto"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              aria-hidden={flipped}
            >
              <p className="whitespace-pre-wrap text-lg font-medium leading-relaxed">
                {currentCard.frontText || <i className="text-gray-400">[Front side empty]</i>}
              </p>
            </div>

            {/* Back Side */}
            <div
              className="absolute w-full h-full p-6 backface-hidden overflow-y-auto"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              aria-hidden={!flipped}
            >
              <p className="whitespace-pre-wrap text-lg font-medium leading-relaxed">
                {currentCard.backText || <i className="text-gray-400">[Back side empty]</i>}
              </p>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={goNext}
          disabled={currentIndex === cards.length - 1}
          className={`w-10 h-10 flex items-center justify-center rounded-full border text-xl transition ${
            currentIndex === cards.length - 1
              ? "text-gray-300 border-gray-300 cursor-not-allowed"
              : "text-gray-700 border-gray-400 hover:bg-gray-100"
          }`}
          aria-label="Next card"
        >
          &rarr;
        </button>
      </div>

      {/* Flip + Indicator + Edit */}
      <div className="mt-6 flex items-center gap-6 flex-wrap justify-center">
        <button
          onClick={() => setFlipped(!flipped)}
          className="px-5 py-2 rounded-lg bg-yellow-300/70 hover:bg-yellow-400 text-[#2e2e2e] font-semibold transition border-2 border-[#2e2e2e] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-200"
          aria-label="Flip card"
        >
          Flip
        </button>

        <span className="text-gray-600 select-none text-sm">
          Card {currentIndex + 1} of {cards.length}
        </span>
      </div>
    </div>
  );
};

export default Album;
