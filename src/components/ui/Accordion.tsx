"use client";

import { useState } from "react";

type AccordionItem = {
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIndex?: number;
};

export const Accordion = ({
  items,
  allowMultiple = false,
  defaultOpenIndex,
}: AccordionProps) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    defaultOpenIndex !== undefined ? [defaultOpenIndex] : []
  );

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div
            key={index}
            className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
          >
            <button
              onClick={() => handleToggle(index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between py-4 px-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg"
            >
              <span className="font-semibold text-dark dark:text-white pr-4">
                {item.title}
              </span>
              <svg
                className={`w-5 h-5 text-tomato shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pb-4 px-2 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
