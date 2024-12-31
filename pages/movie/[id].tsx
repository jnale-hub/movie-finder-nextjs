import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

interface MovieDetails {
  Title: string;
  Year: string;
  Plot: string;
  Director: string;
  Actors: string;
  imdbRating: string;
  Poster: string;
  Runtime: string;
  Genre: string;
}

const MoviePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`/api/movie/${id}`);
      setMovie(response.data);
    } catch (err) {
      setError('Failed to fetch movie details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:text-blue-700">
  ← Back to Search
</Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          {movie.Poster !== 'N/A' && (
            <Image 
              src={movie.Poster} 
              alt={movie.Title}
              width={500}
              height={288}
              className="w-full h-72 object-cover mb-4 rounded"
            />
          )}
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{movie.Title} ({movie.Year})</h1>
          <div className="space-y-4">
            <p><span className="font-semibold">Rating:</span> ⭐ {movie.imdbRating}/10</p>
            <p><span className="font-semibold">Runtime:</span> {movie.Runtime}</p>
            <p><span className="font-semibold">Genre:</span> {movie.Genre}</p>
            <p><span className="font-semibold">Director:</span> {movie.Director}</p>
            <p><span className="font-semibold">Cast:</span> {movie.Actors}</p>
            <div>
              <h2 className="font-semibold mb-2">Plot</h2>
              <p>{movie.Plot}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
