import React, { useState, useRef, useEffect } from 'react';
import { FaFontAwesomeFlag } from "react-icons/fa";
import { HiFlag } from "react-icons/hi";
import Cards from './cards';

type Priority = 'High' | 'Medium' | 'Low';

interface DeckProps {
  title: string;
  priority: Priority;
  onPriorityChange?: (priority: Priority) => void;
  onTitleChange?: (title: string) => void;
  onEdit?: () => void;
  onView?: () => void;
  bgColorClass?: string; // background color class based on priority
}

function Deck({
  title, priority, onPriorityChange, onTitleChange,
  onEdit, onView, bgColorClass
}: DeckProps) {
  const [open, setOpen] = useState(false);
  const [localPriority, setLocalPriority] = useState<Priority>(priority);
  const [localTitle, setLocalTitle] = useState(title);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update local state when props change
  useEffect(() => {
    setLocalPriority(priority);
    setLocalTitle(title);
  }, [priority, title]);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const priorities: Priority[] = ['High', 'Medium', 'Low'];

  // Handle priority change and notify parent
  const handleSelectPriority = (p: Priority) => {
    setLocalPriority(p);
    onPriorityChange?.(p);
    setOpen(false);
  };

  // Handle title change and notify parent
  const handleTitleChangeLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.target.value);
    onTitleChange?.(e.target.value);
  };

  return (
    <div className={`flex-shrink-0 w-80 h-[400px] rounded-[40px] relative p-3 flex flex-col ${bgColorClass ?? 'bg-zinc-100/60'}`}>

      {/* Not Editable title inside card on top */}
      <div
        // type="text"
        // value={localTitle}
        onChange={handleTitleChangeLocal}
        className="mb-3 w-full text-center rounded-md py-2 px-2 text-lg font-semibold text-zinc-800 focus:outline-none"
        // placeholder="Enter deck title"
      >
        {localTitle}
        </div>

      {/* Priority dropdown icon */}
      <div ref={dropdownRef} className="absolute top-3 left-3 p-3 z-51">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e6e6e6] hover:bg-[#e2e2e2] focus:outline-none"
          aria-label="Toggle priority dropdown"
        >
          <HiFlag />
        </button>

        {open && (
          <ul className="mt-1 w-32 p-2 bg-white border border-gray-300 shadow-md absolute z-30 rounded-lg">
            {priorities.map(p => (
              <li
                key={p}
                className="cursor-pointer px-3 py-1 rounded-md hover:bg-gray-200 hover:border-2 hover:border-[#2e2e2e] transition-all duration-300 ease-in-out font-semibold text-zinc-600"
                onClick={() => handleSelectPriority(p)}
              >
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Cards centered */}
      <div className="flex-grow flex items-center justify-center mb-4 cursor-pointer" onClick={onView}>
        <Cards />
      </div>

      {/* Edit and View buttons at bottom */}
      <div className="flex justify-around border-t border-zinc-400 pt-3">
        <button
          onClick={onEdit}
          className="px-6 py-2 rounded-xl bg-[#0b70f4cb] font-bold text-white hover:bg-blue-700/60 transition-colors focus:outline-none"
          aria-label="Edit deck"
          type="button"
        >
          Edit
        </button>
        {/* <button
          onClick={onView}
          className="px-6 py-2 rounded-full border-2 font-bold border-[#2e2e2e] text-[#2e2e2e] hover:bg-blue-600/50 hover:text-white transition-colors focus:outline-none"
          aria-label="View deck"
          type="button"
        >
          View
        </button> */}
      </div>
    </div>
  );
}

export default Deck;
