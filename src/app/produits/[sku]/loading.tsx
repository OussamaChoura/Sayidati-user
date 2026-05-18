export default function ProductDetailLoading() {
  return (
    <main className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
          {/* Image skeleton */}
          <div className="rounded-3xl bg-gray-200 aspect-square" />
          {/* Details skeleton */}
          <div className="space-y-4">
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-8 w-3/4 bg-gray-200 rounded" />
            <div className="h-6 w-32 bg-gray-200 rounded" />
            <div className="space-y-2 pt-4">
              <div className="h-3 w-full bg-gray-200 rounded" />
              <div className="h-3 w-5/6 bg-gray-200 rounded" />
              <div className="h-3 w-4/6 bg-gray-200 rounded" />
            </div>
            <div className="h-12 w-48 bg-gray-200 rounded-full mt-6" />
          </div>
        </div>
      </div>
    </main>
  );
}
