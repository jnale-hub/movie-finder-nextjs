// pages/api/search.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, genre, trending } = req.query;

  // Handle trending movies request
  if (trending) {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=movie&type=movie&y=2023`
      );
      return res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch trending movies' });
    }
  }

  // Handle regular search
  if (!title && !genre) {
    return res.status(400).json({ error: 'Search parameter is required' });
  }

  try {
    const searchTerm = title || `${genre}`;
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${searchTerm}&type=movie`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
}
