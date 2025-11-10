import { motion } from "framer-motion";

type TagHeroProps = {
  tagSlug: string;
};

export function TagHero({ tagSlug }: TagHeroProps) {
  const displayName = `#${tagSlug.charAt(0).toUpperCase()}${tagSlug.slice(1) || "Story"}`;
  return (
    <motion.section
      className="relative overflow-hidden card-surface p-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="absolute inset-0 bg-ct-gradient opacity-10 blur-3xl" />
      <div className="relative flex flex-col gap-4">
        <span className="text-sm uppercase tracking-[0.2em] text-ct-text-dark/60">Tag Story</span>
        <h1 className="font-display text-4xl text-ct-purple">{displayName}</h1>
        <p className="text-ct-text-dark/80 max-w-2xl">
          Craft the next sentence of this community tale. Remember, no consecutive posts and only one line
          every 24 hours. Make it count!
        </p>
        <div className="flex gap-4 text-sm text-ct-text-dark/60">
          <span>Contributors this week: 187</span>
          <span>Current word count: 2,340</span>
          <span>Chain active for 14 days</span>
        </div>
      </div>
    </motion.section>
  );
}

