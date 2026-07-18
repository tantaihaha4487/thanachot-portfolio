import Image from "next/image";

const gallery = [
  { src: "/images/IMG_2650.jpg", className: "gallery-mosaic__wide", position: "center" },
  { src: "/images/IMG_4220.JPG", className: "gallery-mosaic__wide", position: "center" },
  { src: "/images/_TGL4559.jpg", className: "gallery-mosaic__tall", position: "center" },
  { src: "/images/OPEN HOUSE-0714_Original.JPG", className: "gallery-mosaic__small", position: "center" },
];

const strip = [
  { src: "/images/IMG_3895.JPG", position: "center" },
  { src: "/images/_TGL3879.JPG", position: "center" },
  { src: "/images/_TGL4583.jpg", position: "center" },
];

function GalleryImage({ src, position, className }: { src: string; position: string; className: string }) {
  return (
    <div className={`gallery-image ${className}`}>
      <Image
        src={src}
        alt="Thanachot's selected photography"
        fill
        sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 767px) 100vw, 64vw"
        style={{ objectPosition: position }}
      />
    </div>
  );
}

export default function PhotoGallery() {
  return (
    <section className="editorial-gallery" aria-label="Selected photographs">
      <div className="editorial-separator" aria-hidden="true"><span>♡</span></div>
      <div className="gallery-mosaic">
        <div className="gallery-mosaic__column gallery-mosaic__column--large">
          {gallery.slice(0, 2).map((image, index) => (
            <GalleryImage key={index} {...image} />
          ))}
        </div>
        <div className="gallery-mosaic__column gallery-mosaic__column--narrow">
          {gallery.slice(2).map((image, index) => (
            <GalleryImage key={index} {...image} />
          ))}
        </div>
      </div>
      <div className="gallery-strip">
        {strip.map((image, index) => (
          <GalleryImage key={index} {...image} className="gallery-strip__image" />
        ))}
      </div>
    </section>
  );
}
