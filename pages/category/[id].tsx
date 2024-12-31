// pages/category/[id].tsx
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MovieList } from '@/components/movies';
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
    } catch {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <MovieList 
        movies={movies} 
        title={`${id?.toString().replace('-', ' ')} Movies`}
      />
    </div>
  );
}
