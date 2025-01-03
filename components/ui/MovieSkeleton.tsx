export default function MovieSkeleton() {
  return (
    <div className="space-y-8">
      {/* Hero Section Skeleton */}
      <div className="relative h-[60vh] w-full overflow-hidden bg-neutral-800 animate-pulse">
        <div className="absolute inset-0 flex items-end p-8">
          <div className="space-y-4 w-full max-w-screen-lg">
            <div className="h-8 w-48 bg-neutral-700 rounded" />
            <div className="h-4 w-96 max-w-full bg-neutral-700 rounded" />
            <div className="flex gap-3 mt-4">
              <div className="h-10 w-24 bg-neutral-700 rounded-full" />
              <div className="h-10 w-24 bg-neutral-700 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Details Section Skeleton */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster Skeleton */}
          <div className="w-full md:w-1/3 aspect-[2/3] bg-neutral-800 rounded-xl animate-pulse" />
          
          {/* Info Skeleton */}
          <div className="w-full md:w-2/3 space-y-6">
            <div className="space-y-4">
              <div className="h-4 w-3/4 bg-neutral-800 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-neutral-800 rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 w-full bg-neutral-800 rounded animate-pulse" />
              ))}
            </div>
            {/* Cast Section Skeleton */}
            <div className="space-y-4">
              <div className="h-6 w-32 bg-neutral-800 rounded animate-pulse" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-neutral-800 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
