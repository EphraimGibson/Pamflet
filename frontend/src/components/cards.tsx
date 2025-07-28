import React, { useState } from 'react';

const cardsData = [
  { id: 1, title: '', color: 'bg-amber-100' },
  { id: 2, title: '', color: 'bg-amber-200' },
  { id: 3, title: '', color: 'bg-amber-300' },
  { id: 4, title: '', color: 'bg-amber-400' },
  { id: 4, title: '', color: 'bg-amber-500' },
  { id: 4, title: '', color: 'bg-amber-600' },
  { id: 4, title: '', color: 'bg-amber-700' },
];

// Assign each card a different hover rotation
const hoverAngles = [6, -8, 5, 7, 1, 2, -5]; // degrees

export default function Cards() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative z-50"
      style={{ width: 110 + 60, height: 180 + 40 }} // allow enough area for fan-out
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {cardsData.map((card, i) => (
        <div
          key={card.id}
          className={`
            absolute bottom-0 left-0 w-[150px] h-[220px] rounded-[20px] shadow-xl
            ${card.color} flex items-center justify-center font-semibold text-xl
            border-2 border-white
            transition-transform duration-300
            select-none
          `}
          style={{
            // All cards share the same bottom-left anchor
            transformOrigin: 'bottom left',
            transform: hovered
              // Fan out with a "spread": each card is shifted right and up slightly; rotated at a custom angle on hover
              ? `translate(${i * 20}px, -${i * 8}px) rotate(${hoverAngles[i]}deg)`
              : `translate(${i * 10}px, -${i * 4}px)`, // at rest, minor spread, no rotation
            zIndex: i + 1,
          }}
        >
          {card.title}
        </div>
      ))}
    </div>
  );
}
