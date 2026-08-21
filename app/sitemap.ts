import type { MetadataRoute } from "next";
import {
  absoluteUrl,
  galleryImages,
  PROFILE_IMAGE,
  selectedWork,
  SITE_URL,
} from "./lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const mashiroImage = selectedWork.find((work) => work.id === "mashiro")?.image;
  const images = [
    PROFILE_IMAGE,
    ...(mashiroImage ? [mashiroImage.src] : []),
    ...galleryImages.map((image) => image.src),
  ].map(absoluteUrl);

  return [{ url: SITE_URL, images }];
}
