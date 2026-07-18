import HeroSection from "./components/HeroSection";
import ProfileStory from "./components/ProfileStory";
import PhotoGallery from "./components/PhotoGallery";

export default function Home() {
  return (
    <main className="editorial-page">
      <HeroSection />
      <ProfileStory />
      <PhotoGallery />
      <footer className="editorial-footer">
        <p>&quot;Fake it till you make it&quot;</p>
        <p>Copyright 2026 Thanachot Phomthong</p>
        <p>
          Inspired by{" "}
          <a href="https://saltyaom.com/" target="_blank" rel="noopener noreferrer">
            SaltyAom
          </a>
        </p>
      </footer>
    </main>
  );
}
