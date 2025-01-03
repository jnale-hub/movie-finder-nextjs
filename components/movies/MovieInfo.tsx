interface MovieInfoProps {
  movie: {
    Title: string;
    Year: string;
    imdbRating: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Actors: string;
    Plot: string;
  };
}

export function MovieInfo({ movie }: MovieInfoProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold tracking-tight">
        {movie.Title} <span className="text-neutral-500">({movie.Year})</span>
      </h1>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="">⭐</span>
          <span className="font-bold text-lg">{movie.imdbRating}</span>
          <span className="text-neutral-500 text-sm">/ 10</span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-neutral-400">
          <p>{movie.Runtime}</p>·
          <p>{movie.Genre}</p>
        </div>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Director:</span> <span className="text-neutral-400">{movie.Director}</span>
          </p>
          <p>
            <span className="font-medium">Cast:</span> <span className="text-neutral-400">{movie.Actors}</span>
          </p>
        </div>
        <div className="pt-4">
          <h2 className="text-xl font-semibold mb-2">Plot</h2>
          <p className="text-neutral-400 leading-relaxed">{movie.Plot}</p>
        </div>
      </div>
    </div>
  );
}
