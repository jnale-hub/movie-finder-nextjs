import Image from "next/image";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";

interface MovieHeroProps {
  movie: {
    Title: string;
    Year: string;
    Poster: string;
    videos?: {
      results: { key: string; type: string }[];
    };
  };
}

export function MovieHero({ movie }: MovieHeroProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-2/3 relative rounded-md overflow-hidden">
      {movie.videos?.results && movie.videos.results.length > 0 && (
        <>

<div className="absolute size-full bg-gradient-to-t from-neutral-950 opacity-50"></div>
            <Image
              src={`https://img.youtube.com/vi/${movie.videos.results[0].key}/maxresdefault.jpg`}
              alt={`${movie.Title} Thumbnail`}
              className="size-full object-cover"
              width={200}
              height={100}
            />

            <button
              onClick={() => setIsPlaying(true)}
              className="absolute bottom-4 left-4 flex gap-4 items-center group transform"
            >
              <div className="max-md:hidden flex lg:size-16 size-12 items-center justify-center rounded-full bg-transparent lg:border-4 border-[3px] border-white group-hover:border-amber-400">
                <FaPlay className="lg:size-6 size-4 pl-1 group-hover:text-amber-400" />
              </div>
              <span onClick={() => setIsPlaying(true)} className="text-sm md:text-xl">Play trailer</span>
            </button>

            <button
              onClick={() => setIsPlaying(true)}
              className="md:hidden absolute group left-1/2 max-md:top-1/2 max-md:-translate-x-1/2 max-md:-translate-y-1/2 transform"
            >
              <div className="flex  size-12 items-center justify-center rounded-full bg-transparent border-[3px] border-white group-hover:border-amber-400">
                <FaPlay className="md:size-6 size-4 pl-1 group-hover:text-amber-400" />
              </div>
            </button>

            {isPlaying && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                <div className="relative aspect-video w-11/12 max-w-4xl">
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="absolute -top-10 right-0 text-white"
                  >
                    Close
                  </button>
                  <iframe
                    src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?autoplay=1`}
                    title={`${movie.Title} Trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              </div>
            )}
        </>
      )}
    </div>
  );
}
