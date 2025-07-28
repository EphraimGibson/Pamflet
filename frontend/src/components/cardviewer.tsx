import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

type Card = {
  id: number;
  frontText: string;
  backText: string;
};

interface CardViewerProps {
  cards: Card[];
  deckTitle: string;
  onSave: (updatedCard: Card) => void;
  onAddNew: () => void;
  onDelete: (id: number) => void;         // deletes a single card
  onDeckDelete: () => void;               // deletes the whole deck
  onDeckTitleChange: (title: string) => void; // update deck title
}

const animationDuration = 300;

const CardViewer: React.FC<CardViewerProps> = ({
  cards,
  deckTitle,
  onSave,
  onAddNew,
  onDelete,
  onDeckDelete,
  onDeckTitleChange
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingDeckTitle, setEditingDeckTitle] = useState(false);
  const [deckTitleLocal, setDeckTitleLocal] = useState(deckTitle);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const hasCards = cards.length > 0;

  // Sync deck title
  useEffect(() => {
    setDeckTitleLocal(deckTitle);
  }, [deckTitle]);

  // Card display logic
  useEffect(() => {
    if (!hasCards) {
      setFrontText("");
      setBackText("");
      setFlipped(false);
      setEditing(false);
      setCurrentIndex(0);
    } else {
      if (currentIndex >= cards.length) {
        setCurrentIndex(cards.length - 1);
        return;
      }
      const card = cards[currentIndex];
      setFrontText(card.frontText);
      setBackText(card.backText);
      setFlipped(false);
      setEditing(false);
    }
  }, [currentIndex, cards, hasCards]);

  const saveChanges = () => {
    if (!hasCards) return;
    onSave({ ...cards[currentIndex], frontText, backText });
    setEditing(false);
  };

  const handleDeleteCard = () => {
    if (animating || !hasCards) return;
    onDelete(cards[currentIndex].id);
    if (currentIndex >= cards.length - 1 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleDeckTitleSave = () => {
    if (deckTitleLocal.trim() === "") {
      setDeckTitleLocal(deckTitle); // reset if empty
    } else if (deckTitleLocal !== deckTitle) {
      onDeckTitleChange(deckTitleLocal.trim());
    }
    setEditingDeckTitle(false);
  };

  const navigate = (newIdx: number, dir: "next" | "prev") => {
    if (animating || !hasCards || newIdx < 0 || newIdx >= cards.length) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(newIdx);
      setAnimating(false);
      setDirection(null);
    }, animationDuration);
  };

  const goPrev = () => navigate(currentIndex - 1, "prev");
  const goNext = () => navigate(currentIndex + 1, "next");

  const animationClass = animating
    ? direction === "next"
      ? "translate-x-full opacity-0"
      : "-translate-x-full opacity-0"
    : "translate-x-0 opacity-100";

  const enterAnimationClass = !animating && direction === "next"
    ? "animate-fadeInLeft"
    : !animating && direction === "prev"
    ? "animate-fadeInRight"
    : "";

  return (
    <>
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main
        className="fixed top-16 left-0 right-0 bottom-0 bg-[#e2e2e2] p-6 flex flex-col transition-all justify-between duration-300"
        style={{ paddingLeft: sidebarOpen ? 256 : 24 }}
      >
        {/* Deck title and Delete Deck in one horizontal bar */}
        <div className="flex p-5 rounded-2xl justify-between mb-4 w-full px-2 border-1 border-[#2e2e2e]">
          {!editingDeckTitle ? (
            <h1
              className="text-2xl font-bold px-5 text-[#2e2e2e] cursor-pointer select-none"
              onClick={() => setEditingDeckTitle(true)}
            >
              {deckTitleLocal || "Untitled Deck"}
            </h1>
          ) : (
            <input
              type="text"
              value={deckTitleLocal}
              onChange={e => setDeckTitleLocal(e.target.value)}
              onBlur={handleDeckTitleSave}
              onKeyDown={e => {
                if (e.key === "Enter") handleDeckTitleSave();
                if (e.key === "Escape") {
                  setDeckTitleLocal(deckTitle);
                  setEditingDeckTitle(false);
                }
              }}
              autoFocus
              className="border-1 border-[#2e2e2e] rounded-md p-1 text-2xl font-bold focus:outline-none"
            />
          )}
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this deck?"))
                onDeckDelete();
            }}
            className="text-red-600 font-bold border-2 border-red-600 px-4 py-1 hover:bg-red-600 hover:text-white transition rounded-2xl"
            aria-label="Delete deck"
          >
            Delete Deck
          </button>
        </div>

        <div className="flex flex-grow w-full gap-6">
          {/* Left Panel: Card + Controls */}
          <section className="w-[60%] border-1 p-6 -px-[5vw] rounded-3xl flex flex-col gap-4">
            {/* CONTROLS (Prev, Del Card, Flip, Next, Add Card) */}
            <div className="flex justify-between items-center font-bold mb-2 px-1">
              <button
                onClick={handleDeleteCard}
                disabled={animating || !hasCards}
                className="px-4 py-2 bg-[#e2e2e2] rounded-2xl text-[red] hover:bg-red-700/30 font-bold border-2 border-red disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Delete current card"
              >
                Delete
              </button>
              {/* Add Card */}
            <div className="flex justify-center">
              <button
                onClick={onAddNew}
                disabled={animating}
                className="px-6 py-2 bg-[#e2e2e2] rounded-2xl hover:bg-green-300 border-2 border-[#2e2e2e] font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[#2e2e2e]"
                aria-label="Add new card"
              >
                + Add New Card
              </button>
            </div>

              <button
                onClick={() => setFlipped(!flipped)}
                disabled={animating || !hasCards}
                className="px-8 py-2 bg-[#e2e2e2] border-2 border-[#2e2e2e] text-[#2e2e2e] rounded-2xl hover:bg-yellow-200 font-bold"
                aria-label="Flip"
              >
                Flip
              </button>
            </div>

            {/* FLIP CARD ANIMATION & AREA */}
            {!hasCards ? (
              <div className="flex flex-col items-center justify-center h-full bg-white rounded-xl shadow-lg p-10 text-gray-500 text-center select-none">
                <p className="text-2xl font-semibold mb-4">
                  No cards in this deck yet.
                </p>
                <p className="mb-6">
                  Click the button above to add your first card.
                </p>
              </div>
            ) : (
              <div
                className={`relative w-full h-full transition-transform duration-300 ease-in-out ${animationClass} ${enterAnimationClass}`}
                style={{ perspective: 1000 }}
              >
                <div
                  className="relative w-full h-[100%] m-4 transition-transform duration-700 ease-in-out transform-style-preserve-3d rounded-xl shadow-xl bg-white"
                  style={{
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front Side */}
                  <div
                    className="absolute w-full h-full p-6 rounded-xl overflow-y-auto border-2 border-[#2e2e2e]"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    {!editing && !flipped && (
                      <div
                        className="h-full cursor-pointer text-lg text-gray-800 whitespace-pre-wrap"
                        onClick={() => setEditing(true)}
                      >
                        {frontText || (
                          <i className="text-gray-400">
                            [Front side empty]
                          </i>
                        )}
                      </div>
                    )}
                    {editing && !flipped && (
                      <textarea
                        value={frontText}
                        onChange={e => setFrontText(e.target.value)}
                        className="w-full h-full text-lg resize-none rounded-xl p-3 focus:outline-none"
                        autoFocus
                      />
                    )}
                  </div>
                  {/* Back Side */}
                  <div
                    className="absolute w-full h-full p-6 rounded-xl overflow-y-auto border-2 border-[#2e2e2e]"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    {!editing && flipped && (
                      <div
                        className="h-full cursor-pointer text-lg text-gray-800 whitespace-pre-wrap"
                        onClick={() => setEditing(true)}
                      >
                        {backText || (
                          <i className="text-gray-400">
                            [Back side empty]
                          </i>
                        )}
                      </div>
                    )}
                    {editing && flipped && (
                      <textarea
                        value={backText}
                        onChange={e => setBackText(e.target.value)}
                        className="w-full h-full text-lg resize-none rounded-xl p-3 focus:outline-none"
                        autoFocus
                      />
                    )}
                  </div>
                </div>
                {/* Save Button */}
                {editing && (
                  <div className="absolute bottom-4 right-4 z-10">
                    <button
                      onClick={saveChanges}
                      className="px-4 py-2 bg-[#e2e2e2] text-[#2e2e2e] font-bold border-2 border-[#2e2e2e] rounded-2xl hover:bg-[#b5d926a5]"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            )}
            {hasCards && (
              <div className="text-gray-700 text-center mt-2 text-md font-medium select-none">
                Card {currentIndex + 1} of {cards.length}
              </div>
            )}
            <div className="flex justify-between">
            <button
                onClick={goPrev}
                disabled={currentIndex === 0 || animating || !hasCards}
                className={`px-4 py-2 rounded-2xl ${
                  currentIndex === 0 || animating || !hasCards
                    ? "bg-gray-300 cursor-not-allowed border-2 border-[#2e2e2e]"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                aria-label="Prev Card"
              >
                &larr; Prev
              </button>
              <button
                onClick={goNext}
                disabled={
                  !hasCards || currentIndex === cards.length - 1 || animating
                }
                className={`px-4 py-2 rounded-2xl ${
                  !hasCards || currentIndex === cards.length - 1 || animating
                    ? "bg-gray-300 cursor-not-allowed border-2 border-[#2e2e2e]"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                aria-label="Next Card"
              >
                Next &rarr;
              </button>
            </div>
          </section>

          {/* Right Panel */}
          <section className="w-[40%] bg-white rounded-xl shadow-lg ml-6 p-6 border-2 border-[#2e2e2e]">
            <div className="text-gray-400 text-center italic mt-20">
              Preview will appear here
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default CardViewer;
