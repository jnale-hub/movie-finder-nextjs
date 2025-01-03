import { MovieList } from "@/components/movies";
import { Error, Skeleton } from "@/components/ui";
import { Movie } from "@/types/movie";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";

export default function Home() {
  const router = useRouter();
  const { search } = router.query;

  const [results, setResults] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTrendingMovies = useCallback(async () => {
    try {
      const response = await axios.get("/api/search?trending=true");
      setTrending(response.data.Search || []);
      setError("");
    } catch {
      setError("Failed to fetch trending movies");
      setTrending([]);
    }
  }, []);

  const searchMovies = useCallback(async (query: string) => {
    try {
      const response = await axios.get(
        `/api/search?title=${encodeURIComponent(query)}`
      );
      if (!response.data.Search?.length) {
        setError("No movies found matching your search");
        setResults([]);
        return;
      }
      setResults(response.data.Search);
      setError("");
    } catch {
      setError("Failed to fetch movies");
      setResults([]);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (!search) {
      fetchTrendingMovies().finally(() => setLoading(false));
    }
  }, [fetchTrendingMovies, search]);

  useEffect(() => {
    if (search && typeof search === "string") {
      setLoading(true);
      searchMovies(search).finally(() => setLoading(false));
    }
  }, [search, searchMovies]);

  if (loading) return <Skeleton />;

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="container mx-auto">
      {results.length > 0 ? (
        <MovieList movies={results} title="Search Results" />
      ) : (
        <MovieList movies={trending} title="Trending Movies" />
      )}
    </div>
  );
}
