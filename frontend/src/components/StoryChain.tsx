import { motion } from "framer-motion";
import clsx from "clsx";

const mockLines = [
  {
    id: "1",
    author: "Inkling",
    timestamp: "2h ago",
    content: "The lighthouse hummed as though rehearsing a lullaby for the storm.",
    upvotes: 24
  },
  {
    id: "2",
    author: "Nebulae",
    timestamp: "1h ago",
    content: "Barnacles flickered like pixels resetting a forgotten sky.",
    upvotes: 17
  },
  {
    id: "3",
    author: "CleverFox",
    timestamp: "27m ago",
    content: "Someone whispered, 'Keep the chain alive,' and the sea answered with a glowing ripple.",
    upvotes: 31
  }
];

export function StoryChain() {
  return (
    <div className="relative space-y-4">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-ct-purple/40 via-ct-blue/30 to-ct-coral/40" />
      {mockLines.map((line, index) => (
        <motion.article
          key={line.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="relative pl-12"
        >
          <div
            className={clsx(
              "absolute left-0 top-3 h-3 w-3 rounded-full border-2 border-white",
              "bg-gradient-to-br from-ct-blue via-ct-purple to-ct-coral shadow-glow"
            )}
          />
          <div className="rounded-xl bg-white/90 shadow-sm border border-white/50 p-4">
            <header className="flex flex-wrap items-center justify-between text-xs text-ct-text-dark/60">
              <span className="font-semibold text-ct-purple">{line.author}</span>
              <span>{line.timestamp}</span>
            </header>
            <p className="mt-3 text-ct-text-dark leading-relaxed">{line.content}</p>
            <footer className="mt-4 flex items-center gap-3 text-sm text-ct-text-dark/60">
              <span className="inline-flex items-center gap-1 rounded-full bg-ct-purple/10 px-3 py-1 text-ct-purple">
                ▲ {line.upvotes}
              </span>
              <button type="button" className="text-ct-coral hover:text-ct-coral/80">
                Add comment
              </button>
            </footer>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

