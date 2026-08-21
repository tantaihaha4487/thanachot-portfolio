import Image from "next/image";
import { galleryImages, type GalleryImage as GalleryImageData } from "../lib/site-content";

const mosaicImages = galleryImages.filter((image) => image.layout !== "strip");
const stripImages = galleryImages.filter((image) => image.layout === "strip");

function GalleryImage({ image }: { image: GalleryImageData }) {
  const className =
    image.layout === "strip"
      ? "gallery-strip__image"
      : `gallery-mosaic__${image.layout}`;

  return (
    <div className={`gallery-image ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 767px) 100vw, 64vw"
        style={{ objectPosition: image.position }}
      />
    </div>
  );
}

export default function PhotoGallery() {
  return (
    <section
      id="photography"
      className="editorial-gallery"
      aria-labelledby="photography-heading"
    >
      <div className="editorial-separator" aria-hidden="true">
        <span>♡</span>
      </div>
      <div className="editorial-section-heading editorial-section-heading--gallery">
        <p className="editorial-kicker">Away from the editor</p>
        <h2 id="photography-heading">Selected Photography</h2>
        <p>
          Small records of classrooms, technology, people, and quiet details
          around me in Thailand.
        </p>
      </div>
      <div className="gallery-mosaic">
        <div className="gallery-mosaic__column gallery-mosaic__column--large">
          {mosaicImages.slice(0, 2).map((image) => (
            <GalleryImage key={image.src} image={image} />
          ))}
        </div>
        <div className="gallery-mosaic__column gallery-mosaic__column--narrow">
          {mosaicImages.slice(2).map((image) => (
            <GalleryImage key={image.src} image={image} />
          ))}
        </div>
      </div>
      <div className="gallery-strip">
        {stripImages.map((image) => (
          <GalleryImage key={image.src} image={image} />
        ))}
      </div>
    </section>
  );
}
