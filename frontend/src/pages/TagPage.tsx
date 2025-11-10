import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { GradientButton } from "../components/GradientButton";
import { StoryChain } from "../components/StoryChain";
import { TagHero } from "../components/TagHero";

export function TagPage() {
  const { tagSlug } = useParams<{ tagSlug: string }>();

  return (
    <div className="flex flex-col gap-8">
      <TagHero tagSlug={tagSlug ?? ""} />
      <section className="card-surface p-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl">Add your next line</h2>
          <p className="text-sm text-ct-text-dark/70">
            You can contribute once every 24 hours — choose your words wisely!
          </p>
        </div>
        <GradientButton to="#" label="Continue Story" disabled />
      </section>

      <motion.section
        className="card-surface p-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <StoryChain />
      </motion.section>
    </div>
  );
}

