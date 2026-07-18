# Cinematic Desktop Hero Design

Date: 2026-07-19

## Goal

Replace only the opening homepage hero with a cinematic, scroll-driven scene
inspired by the supplied screencast. Preserve the existing Mashiro, GitHub,
Modrinth, and footer sections below it.

## Scope

- Use the existing `public/AVATAR.jpg` as the full-screen hero photograph.
- Render the cinematic hero only at viewport widths of 1024px and above.
- At smaller widths, omit the hero entirely and begin with the existing page
  content.
- Hide the floating navigation while the cinematic hero is active and reveal
  it after the visitor scrolls past the hero.
- Retain existing personal copy, project destinations, and social links.
- Do not modify the sections following the hero beyond any small integration
  changes needed for navigation visibility.

## Desktop Experience

The hero occupies a 175dvh scroll wrapper containing a 100dvh sticky scene.
`AVATAR.jpg` fills the scene with responsive cover cropping. A restrained dark
gradient protects text contrast without changing the photograph's bright,
airy character.

The initial state presents a very large translucent `Thanachot` wordmark over
the photograph. During the early portion of the scroll, the wordmark scales
up and fades, while the photograph makes a small zoom and positional shift.
The final state reveals a left-aligned identity panel containing:

- `Thanachot Phomthong`
- `Developer · Creator · Builder`
- three compact cards linking to Mashiro, GitHub projects, and Modrinth mods
- the existing social profile links
- a small animated scroll cue that disappears once scrolling begins

The visual direction is photographic and editorial: white text, serif display
type for the revealed name, translucent project cards, and minimal chrome.

## Components and Responsibilities

### `HeroSection`

Owns the sticky wrapper, image layers, intro wordmark, revealed identity panel,
scroll progress transforms, pointer parallax, and reduced-motion behavior. It
remains a client component because it reads pointer and scroll state.

Project and social link data remain static module-level data. Internal project
links smoothly scroll to the existing section IDs; external social links open
in a new tab with safe rel attributes.

### `Navbar`

Observes the hero boundary and remains visually hidden and non-interactive
until the hero has been passed. When the desktop hero is omitted on smaller
screens, the navbar retains its current behavior and remains available.

### `Home`

Keeps the existing section order. The current cursor glow and scroll progress
decorations are disabled over the cinematic hero if they conflict visually,
but may continue below it.

## Motion and Accessibility

- Use the existing Framer Motion dependency for scroll transforms.
- Keep scroll-driven movement confined to the hero wrapper; do not lock body
  scrolling.
- Apply a shared smooth easing and settle the reveal before the wrapper ends.
- Pointer parallax must be subtle and must not affect link hit targets.
- Under `prefers-reduced-motion`, show the final identity state immediately,
  disable parallax, and keep every link usable.
- Maintain visible focus states and sufficient contrast over the image.
- Use semantic headings and descriptive image alternative text.

## Responsive Behavior

At widths below 1024px, the hero is `display: none`. No cinematic assets or
blank scroll space should remain in the layout. The existing content begins
immediately, and the navigation stays usable.

At desktop widths, text and cards must remain readable from 1024px through
wide screens. Image cropping should prioritize Thanachot's face and upper body.

## Failure and Edge Cases

- If JavaScript initializes late, the page still displays a readable hero
  rather than invisible content.
- If the image is still loading, its container uses a neutral background.
- Resize transitions across the 1024px breakpoint must not leave the navbar
  hidden or stale scroll state behind.
- The implementation must not alter or depend on API-loaded project data in
  the existing lower sections.

## Verification

- Run lint and production build.
- Verify the initial and revealed hero states on a desktop viewport.
- Verify the navbar is hidden during the hero and visible after it.
- Verify widths below 1024px contain no hero or leftover hero spacing.
- Verify internal card navigation and external social links.
- Verify reduced-motion mode exposes the final content without parallax.
- Confirm the existing lower sections still render in their original order.

## Out of Scope

- Redesigning the Mashiro, GitHub, Modrinth, or footer sections.
- Adding new photographs or generating a foreground cutout.
- Recreating the reference site's biography or gallery sections.
- Changing personal metadata, project content, or social destinations.
