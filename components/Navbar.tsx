import { SearchBar } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  return (
    <nav className="bg-neutral-900 shadow-md px-4 py-3">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-xl font-bold text-slate-800 whitespace-nowrap shrink-0"
        >
          <div className="flex gap-1">
            <Image
              src="/logo.png"
              alt="Movie Finder Logo"
              width={40}
              height={40}
              className="max-h-12 object-contain flex-shrink-0"
            />
            <Image
              src="/movie-finder-logo.png"
              alt="Movie Finder Logo"
              width={80}
              height={40}
              className="max-md:hidden max-h-12 object-contain"
            />
          </div>
        </Link>
        <div className="flex-1 max-w-3xl">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </nav>
  );
}
