import { minecraftMods } from "../lib/site-content";

export default function MinecraftMods() {
  return (
    <section
      id="mods"
      className="editorial-work editorial-work--mods"
      aria-labelledby="minecraft-mods-heading"
    >
      <div className="editorial-section-heading">
        <p className="editorial-kicker">Fabric and server tools</p>
        <h2 id="minecraft-mods-heading">Minecraft Mods</h2>
        <p>
          Focused utilities designed to feel native in play and stay friendly
          to multiplayer servers.
        </p>
      </div>

      <div className="editorial-mod-grid">
        {minecraftMods.map((mod) => (
          <article key={mod.id} id={mod.id} className="editorial-mod-card">
            <p className="editorial-work-card__category">{mod.category}</p>
            <h3>{mod.title}</h3>
            <p>{mod.summary}</p>
            <div className="editorial-work-card__links">
              {mod.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
