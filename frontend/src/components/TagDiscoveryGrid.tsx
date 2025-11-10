import { motion } from "framer-motion";

const discoverTags = [
  { name: "#Mythic", description: "Legends reborn in modern worlds", members: 412 },
  { name: "#Solarpunk", description: "Bright futures powered by collaboration", members: 388 },
  { name: "#AfterDark", description: "Whispers and echoes in the twilight", members: 299 },
  { name: "#Chronicle", description: "Historical twists and alt timelines", members: 341 },
  { name: "#GalaxyGala", description: "Interstellar banquets and diplomacy", members: 265 },
  { name: "#MicroTales", description: "Flash fiction lightning rounds", members: 501 }
];

export function TagDiscoveryGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {discoverTags.map((tag, index) => (
        <motion.div
          key={tag.name}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.04 }}
          className="card-surface p-5 hover:shadow-glow transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-lg text-ct-purple">{tag.name}</h3>
            <span className="text-xs text-ct-text-dark/60">{tag.members} members</span>
          </div>
          <p className="text-sm text-ct-text-dark/70">{tag.description}</p>
          <button
            type="button"
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-ct-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow"
          >
            Join Tag
          </button>
        </motion.div>
      ))}
    </div>
  );
}

