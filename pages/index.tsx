import { MovieList } from "@/components/movies";
import { Skeleton } from "@/components/ui";
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

  const searchMovies = async (query: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/search?title=${encodeURIComponent(query)}`
      );
      setResults(response.data.Search || []);
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500 text-center">{error}</div>
      </div>
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
