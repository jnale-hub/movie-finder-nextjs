import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    // Fetch movie details with credits and videos
    const response = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos`
    );

    const transformedData = {
      Title: response.data.title,
      Year: new Date(response.data.release_date).getFullYear(),
      Plot: response.data.overview,
      Director: response.data.credits?.crew?.find(person => person.job === 'Director')?.name || 'N/A',
      Actors: response.data.credits?.cast?.slice(0, 3).map(actor => actor.name).join(', '),
      imdbRating: (response.data.vote_average / 2).toFixed(1),
      Poster: response.data.poster_path ? `https://image.tmdb.org/t/p/w500${response.data.poster_path}` : 'N/A',
      Runtime: `${response.data.runtime} min`,
      Genre: response.data.genres.map((g: { name: string }) => g.name).join(', '),
      videos: response.data.videos,
      credits: response.data.credits // Add full credits for cast section
    };

    res.status(200).json(transformedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
}
