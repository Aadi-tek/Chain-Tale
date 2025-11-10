import { motion } from "framer-motion";
import { TagDiscoveryGrid } from "../components/TagDiscoveryGrid";

export function ExplorePage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-3xl">Discover Tags</h1>
        <p className="text-ct-text-dark/70">
          Join genre-based communities and contribute to growing collaborative stories.
        </p>
      </header>
      <motion.section
        className="card-surface p-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <TagDiscoveryGrid />
      </motion.section>
    </div>
  );
}

