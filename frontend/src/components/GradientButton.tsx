import { Link } from "react-router-dom";
import clsx from "clsx";

type GradientButtonProps = {
  to: string;
  label: string;
  variant?: "solid" | "outline" | "ghost";
  disabled?: boolean;
};

export function GradientButton({ to, label, variant = "solid", disabled = false }: GradientButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ct-purple";

  const variants = {
    solid: "bg-ct-gradient text-white shadow-glow hover:-translate-y-0.5 hover:shadow-lg",
    outline:
      "border border-ct-purple text-ct-purple hover:bg-ct-purple hover:text-white hover:-translate-y-0.5",
    ghost: "text-ct-purple hover:bg-ct-purple/10 hover:-translate-y-0.5"
  };

  return (
    <Link
      to={to}
      className={clsx(baseClasses, variants[variant], disabled && "pointer-events-none opacity-50")}
      aria-disabled={disabled}
    >
      {label}
    </Link>
  );
}

