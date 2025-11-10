const joinedTags = [
  { name: "#Fantasy", since: "Mar 2025", contributionCount: 72 },
  { name: "#Mystery", since: "Apr 2025", contributionCount: 48 },
  { name: "#Cozy", since: "May 2025", contributionCount: 15 }
];

export function JoinedTagsList() {
  return (
    <ul className="flex flex-col gap-3">
      {joinedTags.map((tag) => (
        <li key={tag.name} className="flex items-center justify-between rounded-xl bg-white/80 px-4 py-3">
          <div>
            <p className="font-semibold text-ct-purple">{tag.name}</p>
            <p className="text-xs text-ct-text-dark/60">Since {tag.since}</p>
          </div>
          <span className="text-sm text-ct-text-dark/70">{tag.contributionCount} lines</span>
        </li>
      ))}
    </ul>
  );
}

