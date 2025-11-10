import { GradientButton } from "../components/GradientButton";

export function NotFoundPage() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center">
      <div className="card-surface px-12 py-10 max-w-lg">
        <h1 className="font-display text-4xl mb-4">Lost in the tale?</h1>
        <p className="text-ct-text-dark/70">
          The page you&apos;re seeking drifted into the archive or never existed. Let&apos;s guide you back to
          the ChainTale homepage.
        </p>
        <div className="mt-6">
          <GradientButton to="/" label="Go Home" />
        </div>
      </div>
    </div>
  );
}

