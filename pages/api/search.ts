import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, genre, trending } = req.query;

  try {
    let response;

    if (trending) {
      response = await axios.get(
        `${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&language=en-US`
      );
    } else if (title) {
      response = await axios.get(
        `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${title}&language=en-US&include_adult=false`
      );
    } else if (genre) {
      // First get genre ID from TMDB
      const genreResponse = await axios.get(
        `${BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`
      );

      const genreId = genreResponse.data.genres.find(
        (g: { name: string; id: number }) =>
          g.name.toLowerCase() === genre.toString().toLowerCase()
      )?.id;

      if (!genreId) {
        return res.status(404).json({ error: "Genre not found" });
      }

      response = await axios.get(
        `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=en-US&include_adult=false`
      );
    } else {
      return res.status(400).json({ error: "Search parameter is required" });
    }

    const transformedData = {
      Search: response.data.results.map((movie: { id: number; title: string; release_date: string; poster_path: string | null }) => ({
        imdbID: movie.id,
        Title: movie.title,
        Year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A',
        Poster: movie.poster_path 
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
          : 'N/A'
      }))
    };

    res.status(200).json(transformedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
}
