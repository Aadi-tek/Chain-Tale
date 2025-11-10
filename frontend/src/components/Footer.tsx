export function Footer() {
  return (
    <footer className="mt-12 border-t border-white/40 bg-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-sm text-ct-text-dark/60 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} ChainTale. Crafted for collaborative storytellers.</p>
        <div className="flex gap-4">
          <a href="#about" className="hover:text-ct-purple">
            About
          </a>
          <a href="#community" className="hover:text-ct-purple">
            Community Guidelines
          </a>
          <a href="#support" className="hover:text-ct-purple">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}

