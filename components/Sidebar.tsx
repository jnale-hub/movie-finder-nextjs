import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const categories = [
  { name: 'Action', id: 'action' },
  { name: 'Adventure', id: 'adventure' },
  { name: 'Animation', id: 'animation' },
  { name: 'Comedy', id: 'comedy' },
  { name: 'Crime', id: 'crime' },
  { name: 'Documentary', id: 'documentary' },
  { name: 'Drama', id: 'drama' },
  { name: 'Family', id: 'family' },
  { name: 'Fantasy', id: 'fantasy' },
  { name: 'History', id: 'history' },
  { name: 'Horror', id: 'horror' },
  { name: 'Music', id: 'music' },
  { name: 'Mystery', id: 'mystery' },
  { name: 'Romance', id: 'romance' },
  { name: 'Thriller', id: 'thriller' },
  { name: 'War', id: 'war' },
  { name: 'Western', id: 'western' }
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-amber-400 text-neutral-950 p-3 rounded-full shadow-lg hover:bg-amber-500 transition-colors"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-40 w-60 shadow-md transform transition-transform duration-300 ease-in-out max-lg:bg-neutral-900 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="pt-6 p-4 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-amber-400">Categories</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-neutral-200 hover:text-neutral-300"
            >
              <FiX size={24} />
            </button>
          </div>
          <ul className="space-y-2 text-sm">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/category/${category.id}`}
                  className="block p-2 rounded hover:bg-neutral-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
