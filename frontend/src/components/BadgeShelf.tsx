import { motion } from "framer-motion";

const badges = [
  { name: "✍️ First Line", description: "Wrote your first sentence", unlocked: true },
  { name: "🔥 Streak Writer", description: "Active 7+ days", unlocked: true },
  { name: "🌟 Top Contributor", description: "Top 10 upvoted lines in a week", unlocked: false },
  { name: "💬 Community Builder", description: "Frequent commenter", unlocked: false },
  { name: "🧠 Creative Spark", description: "Most original line", unlocked: false }
];

export function BadgeShelf() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.name}
          className={`rounded-xl border p-4 ${
            badge.unlocked
              ? "border-ct-gold/80 bg-gradient-to-r from-ct-gradient to-ct-gold/40"
              : "border-white/60 bg-white/60"
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-ct-text-dark">{badge.name}</h3>
            {badge.unlocked ? (
              <span className="text-xs uppercase text-ct-gold">Unlocked</span>
            ) : (
              <span className="text-xs uppercase text-ct-text-dark/40">Locked</span>
            )}
          </div>
          <p className="text-sm text-ct-text-dark/70 mt-1">{badge.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

