import { motion } from "framer-motion";
import { BadgeShelf } from "../components/BadgeShelf";
import { ContributionTimeline } from "../components/ContributionTimeline";
import { JoinedTagsList } from "../components/JoinedTagsList";

export function ProfilePage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="card-surface p-8 flex flex-col md:flex-row items-center gap-6">
        <img
          src="https://api.dicebear.com/7.x/thumbs/svg?seed=chaintale"
          alt="Avatar"
          className="h-24 w-24 rounded-full ring-4 ring-ct-purple/40"
        />
        <div className="flex-1">
          <h1 className="font-display text-3xl">NovaStory</h1>
          <p className="text-ct-text-dark/70">Joined March 2025 • 42 day streak 🔥</p>
        </div>
        <div className="card-surface bg-ct-gradient text-white px-6 py-4 rounded-xl shadow-glow">
          <p className="text-sm uppercase tracking-wide opacity-80">Current Streak</p>
          <p className="text-3xl font-display">12 days</p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.section
          className="card-surface p-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-display text-xl mb-3">Joined Tags</h2>
          <JoinedTagsList />
        </motion.section>

        <motion.section
          className="card-surface p-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-display text-xl mb-3">Badges</h2>
          <BadgeShelf />
        </motion.section>
      </div>

      <motion.section
        className="card-surface p-6"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h2 className="font-display text-xl mb-3">Contribution History</h2>
        <ContributionTimeline />
      </motion.section>
    </div>
  );
}

