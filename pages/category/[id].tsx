// pages/category/[id].tsx
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/types/movie';

export default function CategoryPage() {
  const router = useRouter();
  const { id } = router.query;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchCategoryMovies();
    }
  }, [id]);

  const fetchCategoryMovies = async () => {
    try {
      const response = await axios.get(`/api/search?genre=${id}`);
      setMovies(response.data.Search || []);
    } catch (err) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 capitalize">{id} Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <Link
            key={movie.imdbID}
            href={`/movie/${movie.imdbID}`}
            className="block p-4 border rounded hover:shadow-lg transition-shadow"
          >
            {movie.Poster !== 'N/A' && (
              <Image
                src={movie.Poster === 'N/A' ? '/no-image.jpg' : movie.Poster}
                alt={movie.Title}
                width={500}
                height={288}
                className="w-full h-72 object-cover mb-4 rounded"
              />
            )}
            <h2 className="font-semibold">{movie.Title}</h2>
            <p className="text-gray-600">{movie.Year}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
