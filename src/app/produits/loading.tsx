export default function ProduitsLoading() {
  return (
    <main className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters skeleton */}
        <div className="flex gap-3 mb-8 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-9 w-24 rounded-full bg-gray-200 animate-pulse shrink-0" />
          ))}
        </div>
        {/* Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-white shadow border border-gray-100 animate-pulse">
              <div className="h-56 bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-3 w-16 bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-5 w-24 bg-gray-200 rounded mt-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
