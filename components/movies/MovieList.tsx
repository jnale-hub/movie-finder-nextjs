// components/movies/MovieList.tsx
import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';

interface MovieListProps {
  movies: Movie[];
  title?: string;
}

export default function MovieList({ movies, title }: MovieListProps) {
  return (
    <div>
      {title && <h2 className="text-2xl font-bold mb-6 capitalize">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}
