import { afterEach, describe, expect, it, vi } from "vitest";

import { createHeroController } from "../src/scripts/hero-controller";

class FakeWindow extends EventTarget {
  innerWidth = 1440;
  innerHeight = 900;
  reducedMotion = false;
  listenerOptions: AddEventListenerOptions[] = [];
  callbacks = new Map<number, FrameRequestCallback>();
  nextFrame = 1;

  override addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions,
  ): void {
    if (typeof options === "object") this.listenerOptions.push(options);
    super.addEventListener(type, callback, options);
  }

  matchMedia = vi.fn(() => ({ matches: this.reducedMotion })) as unknown as typeof window.matchMedia;

  requestAnimationFrame = vi.fn((callback: FrameRequestCallback) => {
    const id = this.nextFrame++;
    this.callbacks.set(id, callback);
    return id;
  });

  cancelAnimationFrame = vi.fn((id: number) => {
    this.callbacks.delete(id);
  });

  flushFrame() {
    const callbacks = [...this.callbacks.values()];
    this.callbacks.clear();
    callbacks.forEach((callback) => callback(16));
  }
}

function createFixture() {
  const properties = new Map<string, string>();
  const root = {
    dataset: {} as DOMStringMap,
    style: {
      setProperty: (name: string, value: string) => properties.set(name, value),
      removeProperty: (name: string) => properties.delete(name),
    },
    getBoundingClientRect: () => ({ top: -400, height: 1575 }),
  } as unknown as HTMLElement;
  return { root, properties };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("desktop hero controller", () => {
  it("does not initialize below 1024px or with reduced motion", () => {
    for (const state of [
      { width: 900, reduced: false },
      { width: 1440, reduced: true },
    ]) {
      const fakeWindow = new FakeWindow();
      fakeWindow.innerWidth = state.width;
      fakeWindow.reducedMotion = state.reduced;
      vi.stubGlobal("window", fakeWindow);
      const { root } = createFixture();

      createHeroController(root);

      expect(root.dataset.enhanced).toBeUndefined();
      expect(fakeWindow.requestAnimationFrame).not.toHaveBeenCalled();
    }
  });

  it("batches pointer and scroll events into one passive animation frame", () => {
    const fakeWindow = new FakeWindow();
    vi.stubGlobal("window", fakeWindow);
    const { root, properties } = createFixture();
    const controller = createHeroController(root);

    const pointer = Object.assign(new Event("pointermove"), { clientX: 1080, clientY: 225 });
    fakeWindow.dispatchEvent(pointer);
    fakeWindow.dispatchEvent(new Event("scroll"));

    expect(root.dataset.enhanced).toBe("true");
    expect(fakeWindow.requestAnimationFrame).toHaveBeenCalledTimes(1);
    expect(fakeWindow.listenerOptions.every(({ passive }) => passive)).toBe(true);

    fakeWindow.flushFrame();
    expect(properties.get("--hero-bg-x")).toBe("-6.00px");
    expect(properties.get("--hero-fg-x")).toBe("9.00px");
    expect(properties.get("--hero-progress")).toBe("0.593");

    controller.destroy();
    expect(root.dataset.enhanced).toBeUndefined();
    expect(properties.size).toBe(0);
  });

  it("cancels pending work and removes listeners during teardown", () => {
    const fakeWindow = new FakeWindow();
    vi.stubGlobal("window", fakeWindow);
    const { root } = createFixture();
    const controller = createHeroController(root);

    fakeWindow.dispatchEvent(new Event("scroll"));
    controller.destroy();
    fakeWindow.dispatchEvent(new Event("scroll"));

    expect(fakeWindow.cancelAnimationFrame).toHaveBeenCalledTimes(1);
    expect(fakeWindow.requestAnimationFrame).toHaveBeenCalledTimes(1);
  });
});
