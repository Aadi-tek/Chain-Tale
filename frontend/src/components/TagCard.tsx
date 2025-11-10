import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/outline";

type TagCardProps = {
  tag: {
    name: string;
    description: string;
    contributors: number;
    streak: number;
  };
};

export function TagCard({ tag }: TagCardProps) {
  const slug = tag.name.replace("#", "").toLowerCase();

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
      <Link
        to={`/tag/${slug}`}
        className="card-surface block h-full p-6 hover:shadow-glow transition-shadow duration-300"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl text-ct-purple">{tag.name}</h3>
          <SparklesIcon className="h-6 w-6 text-ct-coral" />
        </div>
        <p className="text-sm text-ct-text-dark/70 mb-4">{tag.description}</p>
        <div className="flex items-center justify-between text-xs uppercase tracking-wide text-ct-text-dark/50">
          <span>{tag.contributors.toLocaleString()} contributors</span>
          <span>{tag.streak} day chain</span>
        </div>
      </Link>
    </motion.div>
  );
}

