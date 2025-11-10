const leaderboardEntries = [
  { rank: 1, username: "NovaStory", points: 128, streak: 15 },
  { rank: 2, username: "QuillPilot", points: 112, streak: 13 },
  { rank: 3, username: "EchoVerse", points: 106, streak: 12 },
  { rank: 4, username: "LyricLoop", points: 98, streak: 7 },
  { rank: 5, username: "StellarScribe", points: 94, streak: 11 }
];

export function LeaderboardTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/60">
      <table className="min-w-full divide-y divide-white/60 bg-white/90 text-left">
        <thead className="bg-ct-purple/10 text-xs uppercase tracking-wide text-ct-text-dark/60">
          <tr>
            <th className="px-6 py-3">Rank</th>
            <th className="px-6 py-3">User</th>
            <th className="px-6 py-3">Points</th>
            <th className="px-6 py-3">Streak</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/60 text-sm">
          {leaderboardEntries.map((entry) => (
            <tr key={entry.rank} className="hover:bg-ct-purple/5">
              <td className="px-6 py-4 font-semibold text-ct-purple">{entry.rank}</td>
              <td className="px-6 py-4">{entry.username}</td>
              <td className="px-6 py-4">{entry.points}</td>
              <td className="px-6 py-4">{entry.streak} days</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

