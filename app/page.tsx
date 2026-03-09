import { Suspense } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MashiroSection from "./components/MashiroSection";
import GithubSection from "./components/GithubSection";
import Footer from "./components/Footer";
import SectionDivider from "./components/SectionDivider";
import ScrollProgress from "./components/ScrollProgress";
import CursorGlow from "./components/CursorGlow";

function GithubSkeleton() {
  return (
    <section className="section-pad">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div
          className="h-8 w-48 rounded-lg mb-14 animate-pulse"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl animate-pulse"
              style={{
                height: 180,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main
      className="dot-grid"
      style={{ background: "#282C33", minHeight: "100vh", position: "relative" }}
    >
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <SectionDivider label="02 · project mashiro" />
      <MashiroSection />
      <SectionDivider label="03 · github projects" />
      <Suspense fallback={<GithubSkeleton />}>
        <GithubSection />
      </Suspense>
      <Footer />
    </main>
  );
}
