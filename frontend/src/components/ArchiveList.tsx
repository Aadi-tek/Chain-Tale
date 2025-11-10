const archivedStories = [
  {
    title: "The Clockmaker's Garden",
    tag: "#Fantasy",
    completedOn: "Oct 20, 2025",
    wordCount: 5230,
    summary: "A maze of time-tended vines that blooms when the moon forgets its name."
  },
  {
    title: "Third Shift on Io Station",
    tag: "#SciFi",
    completedOn: "Oct 18, 2025",
    wordCount: 5012,
    summary: "Miners discover a radio signal in the sulfur storms that hums in perfect harmony."
  },
  {
    title: "The Quiet Detective",
    tag: "#Mystery",
    completedOn: "Oct 11, 2025",
    wordCount: 4620,
    summary: "A notebook of silent clues unfolding in handwritten echoes."
  }
];

export function ArchiveList() {
  return (
    <div className="grid gap-4">
      {archivedStories.map((story) => (
        <article key={story.title} className="card-surface p-6 hover:shadow-glow transition-shadow">
          <header className="flex flex-wrap items-center gap-3 justify-between">
            <div>
              <h3 className="font-display text-xl text-ct-purple">{story.title}</h3>
              <p className="text-xs uppercase tracking-wide text-ct-text-dark/60">{story.tag}</p>
            </div>
            <div className="text-sm text-ct-text-dark/50 text-right">
              <p>{story.wordCount.toLocaleString()} words</p>
              <p>Completed {story.completedOn}</p>
            </div>
          </header>
          <p className="mt-4 text-ct-text-dark/75">{story.summary}</p>
        </article>
      ))}
    </div>
  );
}

