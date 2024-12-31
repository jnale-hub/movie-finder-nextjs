import Link from 'next/link';

const categories = [
  { name: 'Action', id: 'action' },
  { name: 'Comedy', id: 'comedy' },
  { name: 'Drama', id: 'drama' },
  { name: 'Horror', id: 'horror' },
  { name: 'Sci-Fi', id: 'sci-fi' },
  { name: 'Thriller', id: 'thriller' }
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
