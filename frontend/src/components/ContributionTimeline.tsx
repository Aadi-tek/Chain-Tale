const contributions = [
  { date: "Mon", lines: 3 },
  { date: "Tue", lines: 2 },
  { date: "Wed", lines: 4 },
  { date: "Thu", lines: 1 },
  { date: "Fri", lines: 0 },
  { date: "Sat", lines: 5 },
  { date: "Sun", lines: 2 }
];

export function ContributionTimeline() {
  const maxLines = Math.max(...contributions.map((entry) => entry.lines), 1);

  return (
    <div className="grid grid-cols-7 gap-3">
      {contributions.map((entry) => (
        <div key={entry.date} className="flex flex-col items-center gap-2">
          <div className="h-32 w-10 rounded-xl bg-ct-purple/15 flex items-end justify-center">
            <div
              className="w-full rounded-xl bg-gradient-to-t from-ct-coral to-ct-purple transition-all"
              style={{ height: `${(entry.lines / maxLines) * 100}%` }}
            />
          </div>
          <span className="text-xs text-ct-text-dark/60">{entry.date}</span>
        </div>
      ))}
    </div>
  );
}

