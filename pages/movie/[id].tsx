import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

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
  videos?: {
    results: {
      key: string;
      type: string;
    }[];
  };
  credits?: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
  };
}

const MoviePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      console.error(err);
      setError("Failed to fetch movie details");
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
        <div className="space-y-4">
          {movie.Poster !== "N/A" && (
            <Image
              src={movie.Poster}
              alt={movie.Title}
              width={500}
              height={288}
              className="w-full h-72 object-contain mb-4 rounded"
            />
          )}
          {movie.videos?.results?.length > 0 && (
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                title={`${movie.Title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded"
              />
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">
            {movie.Title} ({movie.Year})
          </h1>
          <div className="space-y-4">
            <p>
              <span className="font-semibold">Rating:</span> ⭐{" "}
              {movie.imdbRating}/10
            </p>
            <p>
              <span className="font-semibold">Runtime:</span> {movie.Runtime}
            </p>
            <p>
              <span className="font-semibold">Genre:</span> {movie.Genre}
            </p>
            <p>
              <span className="font-semibold">Director:</span> {movie.Director}
            </p>
            <p>
              <span className="font-semibold">Cast:</span> {movie.Actors}
            </p>
            <div>
              <h2 className="font-semibold mb-2">Plot</h2>
              <p>{movie.Plot}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-xl mb-4">Cast</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movie.credits?.cast.slice(0, 8).map((actor) => (
            <div
              key={actor.id}
              className="bg-white rounded-lg shadow p-3 flex flex-col items-center text-center"
            >
              {actor.profile_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  width={100}
                  height={100}
                  className="rounded-full w-20 h-20 object-cover mb-2"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                  <span className="text-gray-400">No Photo</span>
                </div>
              )}
              <h3 className="font-medium">{actor.name}</h3>
              <p className="text-sm text-gray-600">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
