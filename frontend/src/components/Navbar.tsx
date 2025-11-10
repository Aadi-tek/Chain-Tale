import { NavLink } from "react-router-dom";
import clsx from "clsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/archive", label: "Archive" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-2 font-display text-xl text-ct-purple">
          <span>ChainTale</span>
        </NavLink>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                clsx(
                  "relative px-3 py-1 transition",
                  isActive
                    ? "text-ct-purple font-semibold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-ct-purple"
                    : "text-ct-text-dark/70 hover:text-ct-purple"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <NavLink
          to="/profile/me"
          className="hidden md:inline-flex items-center gap-2 rounded-xl bg-ct-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow"
        >
          Profile
        </NavLink>
      </div>
    </header>
  );
}

