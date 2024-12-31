import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'Movie ID is required' });
  }

  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}&plot=full`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
}
