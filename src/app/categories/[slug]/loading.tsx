export default function CategoryLoading() {
  return (
    <main className="pt-16 min-h-screen">
      {/* Hero skeleton */}
      <div className="h-48 md:h-64 bg-gray-200 animate-pulse" />
      {/* Nav skeleton */}
      <div className="bg-white border-b py-3 px-4 flex gap-2 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-8 w-20 rounded-full bg-gray-200 animate-pulse shrink-0" />
        ))}
      </div>
      {/* Products grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
