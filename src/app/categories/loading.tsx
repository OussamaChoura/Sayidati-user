export default function CategoriesLoading() {
  return (
    <main className="pt-16 min-h-screen">
      <div className="bg-rose-50 py-16 flex flex-col items-center gap-4 animate-pulse">
        <div className="h-4 w-20 bg-rose-200 rounded" />
        <div className="h-10 w-64 bg-gray-200 rounded" />
        <div className="h-4 w-80 bg-gray-200 rounded" />
      </div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl h-48 bg-gray-200 animate-pulse" />
          ))}
        </div>
      </section>
    </main>
  );
}
