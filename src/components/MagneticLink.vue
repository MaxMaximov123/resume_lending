<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'

defineProps<{ href?: string; external?: boolean }>()

const el = ref<HTMLElement>()

/** Pulls the element toward the cursor, springs back on leave. */
function onMove(e: PointerEvent) {
  const node = el.value!
  const r = node.getBoundingClientRect()
  node.style.setProperty('--mx', `${e.clientX - r.left}px`)
  node.style.setProperty('--my', `${e.clientY - r.top}px`)
  gsap.to(node, {
    x: (e.clientX - r.left - r.width / 2) * 0.04,
    y: (e.clientY - r.top - r.height / 2) * 0.06,
    duration: 0.6,
    ease: 'power3.out',
  })
}

function onLeave() {
  gsap.to(el.value!, { x: 0, y: 0, duration: 0.6, ease: 'power3.out' })
}
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    ref="el"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :type="href ? undefined : 'button'"
    class="glass glass-border spotlight group relative flex items-center gap-4 overflow-hidden rounded-3xl p-5 text-left will-change-transform sm:p-6"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <slot />
  </component>
</template>
