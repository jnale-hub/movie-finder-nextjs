import Link from 'next/link';
import { SearchBar } from '@/components/ui';

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="text-xl font-bold text-gray-800 whitespace-nowrap">
          Movie Search
        </Link>
        <div className="flex-1 max-w-3xl">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </nav>
  );
}
