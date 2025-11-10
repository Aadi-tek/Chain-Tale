import { useMemo } from "react";
import { ArchiveFilters } from "../components/ArchiveFilters";
import { ArchiveList } from "../components/ArchiveList";

export function ArchivePage() {
  const filters = useMemo(
    () => ({
      genres: ["Fantasy", "Mystery", "SciFi", "Horror"],
      sortOptions: ["Popularity", "Completion Date", "Word Count"]
    }),
    []
  );

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-3xl">Story Archive</h1>
        <p className="text-ct-text-dark/70">
          Completed tales that reached 30 days of collaboration or 5000 words.
        </p>
      </header>
      <ArchiveFilters filters={filters} />
      <ArchiveList />
    </div>
  );
}

