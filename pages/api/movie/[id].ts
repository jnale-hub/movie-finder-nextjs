import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// Types
interface TMDBMovie {
  title: string;
  release_date: string;
  overview: string;
  vote_average: number;
  poster_path: string | null;
  runtime: number;
  genres: Array<{ name: string }>;
  credits: {
    crew: Array<{ job: string; name: string }>;
    cast: Array<{ name: string }>;
  };
  videos: {
    results: Array<{ type: string; name: string; key: string }>;
  };
}

interface MovieResponse {
  Title: string;
  Year: number;
  Plot: string;
  Director: string;
  Actors: string;
  imdbRating: string;
  Poster: string;
  Runtime: string;
  Genre: string;
  videos: { results: Array<{ type: string; name: string; key: string }> };
  credits: TMDBMovie["credits"];
}

// Constants
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
const MAX_CAST_MEMBERS = 3;

// Helper functions
const getDirector = (crew: TMDBMovie["credits"]["crew"]): string => {
  return crew?.find((person) => person.job === "Director")?.name || "N/A";
};

const getCast = (cast: TMDBMovie["credits"]["cast"]): string => {
  return cast
    ?.slice(0, MAX_CAST_MEMBERS)
    .map((actor) => actor.name)
    .join(", ");
};

const getOfficialTrailers = (videos: TMDBMovie["videos"]) => {
  return videos.results.filter(
    (video) =>
      video.type.toLowerCase() === "trailer" &&
      video.name.toLowerCase().includes("official")
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MovieResponse | { error: string }>
) {
  if (!TMDB_API_KEY) {
    res.status(500).json({ error: "TMDB API key is not configured" });
    return;
  }

  const { id } = req.query;

  try {
    const { data } = await axios.get<TMDBMovie>(
      `${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos`
    );

    const transformedData: MovieResponse = {
      Title: data.title,
      Year: new Date(data.release_date).getFullYear(),
      Plot: data.overview,
      Director: getDirector(data.credits.crew),
      Actors: getCast(data.credits.cast),
      imdbRating: (data.vote_average / 2).toFixed(1),
      Poster: data.poster_path
        ? `${POSTER_BASE_URL}${data.poster_path}`
        : "N/A",
      Runtime: `${data.runtime} min`,
      Genre: data.genres.map((g) => g.name).join(", "),
      videos: { results: getOfficialTrailers(data.videos) },
      credits: data.credits,
    };

    res.status(200).json(transformedData);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
}
