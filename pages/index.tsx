import { MovieList } from "@/components/movies";
import { Error, Skeleton } from "@/components/ui";
import { Movie } from "@/types/movie";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { search } = router.query;
  const [results, setResults] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTrendingMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/search?trending=true");
      setTrending(response.data.Search || []);
      setError("");
    } catch {
      setError("Failed to fetch trending movies");
      setTrending([]);
    } finally {
      setLoading(false);
    }
  };

  // Add error handling in the search or data fetching functions
  const searchMovies = async (query: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/search?title=${encodeURIComponent(query)}`
      );
      if (!response.data.Search?.length) {
        setError("No movies found matching your search");
        return;
      }
      setResults(response.data.Search);
      setError("");
    } catch {
      setError("Failed to fetch movies");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!search) {
      fetchTrendingMovies();
    }
  }, []);

  useEffect(() => {
    if (search && typeof search === "string") {
      searchMovies(search);
    }
  }, [search]);

  if (loading) return <Skeleton />;

  if (error) {
    return (
      <Error error={error} />
    );
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
