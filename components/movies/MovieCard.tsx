import { Movie } from '@/types/movie';
import Image from 'next/image';
import Link from 'next/link';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      href={`/movie/${movie.imdbID}`}
      className="block bg-neutral-800 rounded-tr-xl rounded-b-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-[2/3] relative">
        {movie.Poster && movie.Poster !== 'N/A' ? (
          <Image
            src={movie.Poster}
            alt={movie.Title}
            width={500}
            height={750}
            className="object-cover aspect-[2/3]"
          />
        ) : (
          <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
            <span className="text-neutral-400">{movie.Title}</span>
          </div>
        )}
      </div>
      <div className="p-3 md:p-4">
        <h3 className="font-semibold line-clamp-2">{movie.Title}</h3>
        <p className="text-neutral-200 text-sm">{movie.Year}</p>
      </div>
    </Link>
  );
}
