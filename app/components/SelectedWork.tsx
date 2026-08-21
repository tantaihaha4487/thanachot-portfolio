import Image from "next/image";
import { selectedWork } from "../lib/site-content";

export default function SelectedWork() {
  return (
    <section
      id="projects"
      className="editorial-work"
      aria-labelledby="selected-work-heading"
    >
      <div className="editorial-section-heading">
        <p className="editorial-kicker">Things I build</p>
        <h2 id="selected-work-heading">Selected Work</h2>
        <p>
          Open-source projects where practical engineering meets personal
          curiosity.
        </p>
      </div>

      <div className="editorial-work-grid">
        {selectedWork.map((work) => (
          <article
            key={work.id}
            id={work.id}
            className={`editorial-work-card${work.image ? " editorial-work-card--illustrated" : ""}`}
          >
            <div className="editorial-work-card__copy">
              <p className="editorial-work-card__category">{work.category}</p>
              <h3>{work.title}</h3>
              <p>{work.summary}</p>
              <div className="editorial-work-card__links">
                {work.links.map((link) => (
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
            </div>
            {work.image ? (
              <div className="editorial-work-card__art">
                <Image
                  src={work.image.src}
                  alt={work.image.alt}
                  width={work.image.width}
                  height={work.image.height}
                  sizes="(max-width: 767px) 10rem, 12rem"
                />
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
