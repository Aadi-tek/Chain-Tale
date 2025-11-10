type ArchiveFiltersProps = {
  filters: {
    genres: string[];
    sortOptions: string[];
  };
};

export function ArchiveFilters({ filters }: ArchiveFiltersProps) {
  return (
    <div className="card-surface p-6 flex flex-wrap gap-4">
      <div>
        <label htmlFor="genre" className="block text-sm font-semibold text-ct-text-dark/70">
          Genre
        </label>
        <select
          id="genre"
          className="mt-1 rounded-xl border border-white/60 bg-white/80 px-4 py-2 focus:border-ct-purple focus:outline-none"
        >
          <option value="">All genres</option>
          {filters.genres.map((genre) => (
            <option key={genre} value={genre.toLowerCase()}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="sort" className="block text-sm font-semibold text-ct-text-dark/70">
          Sort by
        </label>
        <select
          id="sort"
          className="mt-1 rounded-xl border border-white/60 bg-white/80 px-4 py-2 focus:border-ct-purple focus:outline-none"
        >
          {filters.sortOptions.map((option) => (
            <option key={option} value={option.toLowerCase().replace(/\s+/g, "-")}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

