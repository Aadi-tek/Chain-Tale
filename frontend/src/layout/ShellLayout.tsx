import { PropsWithChildren } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { GradientBackdrop } from "../components/GradientBackdrop";

export function ShellLayout({ children }: PropsWithChildren) {
  return (
    <GradientBackdrop>
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-10">{children}</main>
      <Footer />
    </GradientBackdrop>
  );
}

