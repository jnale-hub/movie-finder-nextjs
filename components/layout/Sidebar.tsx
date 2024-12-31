import Link from 'next/link';

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
  return (
    <div className="w-64 bg-white shadow-md min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/category/${category.id}`}
              className="block p-2 rounded hover:bg-gray-100 transition-colors"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
