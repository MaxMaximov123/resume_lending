<script setup lang="ts">
interface Orb {
  color: string
  size: number // vmax
  x: number // % of viewport
  y: number
}

const orbs: Orb[] = [
  { color: '#ff2d55', size: 52, x: 12, y: 10 },
  { color: '#a855f7', size: 62, x: 78, y: 18 },
  { color: '#22d3ee', size: 46, x: 62, y: 78 },
  { color: '#3b82f6', size: 56, x: 18, y: 82 },
  { color: '#ff4fd8', size: 34, x: 48, y: 42 },
]

/* Everything is painted once into a single static layer: no JS, no blend modes, no per-frame work. */
const background = [
  'radial-gradient(ellipse at center, transparent 40%, rgb(5 5 10 / 0.85) 100%)',
  ...orbs.map(
    (o) =>
      `radial-gradient(${o.size / 2}vmax ${o.size / 2}vmax at ${o.x}% ${o.y}%, ${o.color}4d, ${o.color}1a 55%, transparent)`,
  ),
].join(', ')
</script>

<template>
  <div class="pointer-events-none fixed inset-0 -z-10 bg-ink-950" aria-hidden="true">
    <div class="absolute inset-0" :style="{ background: `${background}, var(--color-ink-950)` }" />

    <!-- Grid fading towards the edges -->
    <div
      class="absolute inset-0 opacity-[0.07]"
      style="
        background-image:
          linear-gradient(to right, white 1px, transparent 1px),
          linear-gradient(to bottom, white 1px, transparent 1px);
        background-size: 72px 72px;
        mask-image: radial-gradient(ellipse 70% 60% at 50% 35%, black 20%, transparent 75%);
        -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 35%, black 20%, transparent 75%);
      "
    />
  </div>
</template>
