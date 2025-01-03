export default function Skeleton() {
  return (
    <div>
      <div className="h-8 w-48 bg-neutral-800 rounded-lg animate-pulse mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-3 md:gap-6 gap-x-4 gap-y-6">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="bg-neutral-800 rounded-tr-xl rounded-b-xl overflow-hidden animate-pulse"
          >
            <div className="aspect-[2/3] bg-neutral-700" />
            <div className="p-3 md:p-4 space-y-3">
              <div className="h-4 bg-neutral-700 rounded w-3/4" />
              <div className="h-4 bg-neutral-700 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
