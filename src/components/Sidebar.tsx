import React from 'react';
import { X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  'Clothing',
  'Footwear',
  'Backpacks & Bags',
  'Gear & Electronics',
  'Knives & Tools',
  'Tactical Equipment',
  'Camping Equipment',
  'Airsoft'
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Categories</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 rounded-md hover:bg-gray-100 transition-colors"
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}