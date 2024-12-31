// pages/index.tsx
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { Movie, SearchResponse } from "../types/movie";

const Home = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      const response = await axios.get<SearchResponse>(
        "/api/search?trending=true"
      );
      setTrending(response.data.Search || []);
    } catch (err) {
      console.error("Failed to fetch trending movies");
    }
  };

  const searchMovies = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const response = await axios.get<SearchResponse>(
        `/api/search?title=${query}`
      );
      setResults(response.data.Search || []);
    } catch {
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">IMDB Movie Search</h1>

      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="flex-1 p-2 border rounded"
          onKeyPress={(e) => e.key === "Enter" && searchMovies()}
        />
        <button
          onClick={searchMovies}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!results.length ? (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Trending Movies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trending.map((movie) => (
              <Link
                key={movie.imdbID}
                href={`/movie/${movie.imdbID}`}
                className="block p-4 border rounded hover:shadow-lg transition-shadow"
              >
                {movie.Poster !== "N/A" && (
                  <Image
                    src={
                      movie.Poster === "N/A" ? "/no-image.jpg" : movie.Poster
                    }
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((movie) => (
            <Link
              key={movie.imdbID}
              href={`/movie/${movie.imdbID}`}
              className="block p-4 border rounded hover:shadow-lg transition-shadow"
            >
              {movie.Poster !== "N/A" && (
                <Image
                  src={movie.Poster === "N/A" ? "/no-image.jpg" : movie.Poster}
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
      )}
    </div>
  );
};

export default Home;
