
import Image from "next/image";

interface CastGridProps {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }[];
}

export function CastGrid({ cast }: CastGridProps) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Cast</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {cast.slice(0, 12).map((actor) => (
          <div
            key={actor.id}
            className="group relative transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="aspect-[3/4] relative rounded-b-md rounded-tr-md overflow-hidden">
              {actor.profile_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-neutral-500 flex items-center justify-center">
                  <span className="text-neutral-400">No Photo</span>
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-medium line-clamp-1">{actor.name}</h3>
              <p className="text-sm text-slate-600 line-clamp-1">
                {actor.character}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
