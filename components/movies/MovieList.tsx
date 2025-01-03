import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';

interface MovieListProps {
  movies: Movie[];
  title?: string;
}

export default function MovieList({ movies, title }: MovieListProps) {
  return (
    <div>
      {title && <h2 className="text-2xl font-bold mb-4 md:mb-6 capitalize text-amber-400">{title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 md:gap-6 gap-x-4 gap-y-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}
