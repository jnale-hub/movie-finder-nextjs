import { useState } from 'react';
import Link from 'next/link';
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
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
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
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Categories</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
          </div>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/category/${category.id}`}
                  className="block p-2 rounded hover:bg-gray-100 transition-colors"
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
