// components/movies/MovieCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      href={`/movie/${movie.imdbID}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-w-2 aspect-h-3 relative">
        {movie.Poster && movie.Poster !== 'N/A' ? (
          <Image
            src={movie.Poster}
            alt={movie.Title}
            width={500}
            height={750}
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{movie.Title}</h3>
        <p className="text-gray-600">{movie.Year}</p>
      </div>
    </Link>
  );
}
