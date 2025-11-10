import { motion } from "framer-motion";
import { LeaderboardTable } from "../components/LeaderboardTable";

export function LeaderboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-3xl">Weekly Leaderboard</h1>
        <p className="text-ct-text-dark/70">
          The most celebrated storytellers of the week. Upvotes, streaks, and creativity all count.
        </p>
      </header>
      <motion.section
        className="card-surface p-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <LeaderboardTable />
      </motion.section>
    </div>
  );
}

