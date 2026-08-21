import HeroSection from "./components/HeroSection";
import MinecraftMods from "./components/MinecraftMods";
import PhotoGallery from "./components/PhotoGallery";
import ProfileStory from "./components/ProfileStory";
import SelectedWork from "./components/SelectedWork";
import { socialLinks } from "./lib/social-links";

export default function Home() {
  const profileLinks = socialLinks.filter((link) => link.isProfile);

  return (
    <main className="editorial-page">
      <HeroSection />
      <ProfileStory />
      <SelectedWork />
      <MinecraftMods />
      <PhotoGallery />
      <footer className="editorial-footer">
        <p>&quot;Fake it till you make it&quot;</p>
        <nav aria-label="Profile links" className="editorial-footer__links">
          {profileLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.name}
            </a>
          ))}
        </nav>
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
