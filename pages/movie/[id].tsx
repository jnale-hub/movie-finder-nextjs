import { CastGrid } from "@/components/movies/CastGrid";
import { MovieHero } from "@/components/movies/MovieHero";
import { MovieInfo } from "@/components/movies/MovieInfo";
import { Error, MovieSkeleton } from "@/components/ui";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

export default function MoviePage() {
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

  if (loading) return <MovieSkeleton />;
  if (error) {
    return (
      <Error error={error} />
    );
  }
  if (!movie) return <div className="text-center">Movie not found</div>;

  return (
    <div className="container mx-auto pb-8 space-y-8">
      <Link
        href="/"
        className="inline-flex items-center font-semibold gap-2 text-amber-400 hover:text-amber-500 transition-colors mb-8"
      >
        <span>←</span>
        <span>Back to Search</span>
      </Link>

      <div className="flex gap-2">
        {movie.Poster !== "N/A" && (
          <Image
            src={movie.Poster}
            alt={movie.Title}
            className="object-cover rounded-md w-1/3 aspect-[2/3]"
            width={340}
            height={560}
          />
        )}
        <MovieHero movie={movie} />
      </div>

      <MovieInfo movie={movie} />

      {movie.credits?.cast && <CastGrid cast={movie.credits.cast} />}
    </div>
  );
}
