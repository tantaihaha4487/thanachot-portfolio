export interface HeroController {
  destroy(): void;
}

const properties = [
  "--hero-bg-x",
  "--hero-bg-y",
  "--hero-fg-x",
  "--hero-fg-y",
  "--hero-progress",
] as const;

export function createHeroController(root: HTMLElement): HeroController {
  if (
    window.innerWidth < 1024 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return { destroy() {} };
  }

  let pointerX = 0;
  let pointerY = 0;
  let frame: number | undefined;
  let destroyed = false;

  const render = () => {
    frame = undefined;
    if (destroyed) return;

    const bounds = root.getBoundingClientRect();
    const scrollDistance = Math.max(bounds.height - window.innerHeight, 1);
    const progress = Math.min(Math.max(-bounds.top / scrollDistance, 0), 1);

    root.style.setProperty("--hero-bg-x", `${(-pointerX * 12).toFixed(2)}px`);
    root.style.setProperty("--hero-bg-y", `${(-pointerY * 8).toFixed(2)}px`);
    root.style.setProperty("--hero-fg-x", `${(pointerX * 18).toFixed(2)}px`);
    root.style.setProperty("--hero-fg-y", `${(pointerY * 12 - progress * 10).toFixed(2)}px`);
    root.style.setProperty("--hero-progress", progress.toFixed(3));
  };

  const schedule = () => {
    if (frame === undefined && !destroyed) frame = window.requestAnimationFrame(render);
  };

  const handlePointer = (event: Event) => {
    const pointer = event as PointerEvent;
    pointerX = (pointer.clientX / window.innerWidth - 0.5) * 2;
    pointerY = (pointer.clientY / window.innerHeight - 0.5) * 2;
    schedule();
  };

  const handleScroll = () => schedule();

  window.addEventListener("pointermove", handlePointer, { passive: true });
  window.addEventListener("scroll", handleScroll, { passive: true });
  root.dataset.enhanced = "true";

  return {
    destroy() {
      if (destroyed) return;
      destroyed = true;
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("scroll", handleScroll);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      delete root.dataset.enhanced;
      for (const property of properties) root.style.removeProperty(property);
    },
  };
}
