export type HeroVisibilityInput = {
  isDesktop: boolean;
  heroBottom: number | null;
};

export function shouldShowNavbar({
  isDesktop,
  heroBottom,
}: HeroVisibilityInput): boolean {
  if (!isDesktop || heroBottom === null) return true;
  return heroBottom <= 0;
}
