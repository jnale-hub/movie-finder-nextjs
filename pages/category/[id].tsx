import { MovieList } from "@/components/movies";
import { Error, Skeleton } from "@/components/ui";
import { Movie } from "@/types/movie";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const router = useRouter();
  const { id } = router.query;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategoryMovies = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(`/api/search?genre=${id}`);
        setMovies(response.data.Search || []);
      } catch {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCategoryMovies();
    }
  }, [id]);

  if (loading) return <Skeleton />;
  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="container mx-auto">
      <MovieList
        movies={movies}
        title={`${id?.toString().replace("-", " ")} Movies`}
      />
    </div>
  );
}
