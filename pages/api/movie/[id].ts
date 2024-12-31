import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const TMDB_API_KEY = '8425c160962e412be49b1f85f16e7373';
const BASE_URL = 'https://api.themoviedb.org/3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'Movie ID is required' });
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits`
    );
    
    // Transform TMDB response to match your existing MovieDetails interface
    const transformedData = {
      Title: response.data.title,
      Year: new Date(response.data.release_date).getFullYear(),
      Plot: response.data.overview,
      Director: response.data.credits.crew.find((person: any) => person.job === 'Director')?.name || 'N/A',
      Actors: response.data.credits.cast.slice(0, 3).map((actor: any) => actor.name).join(', '),
      imdbRating: (response.data.vote_average / 2).toFixed(1),
      Poster: response.data.poster_path ? `https://image.tmdb.org/t/p/w500${response.data.poster_path}` : 'N/A',
      Runtime: `${response.data.runtime} min`,
      Genre: response.data.genres.map((g: any) => g.name).join(', ')
    };

    res.status(200).json(transformedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
}
