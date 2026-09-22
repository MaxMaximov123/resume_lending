<script setup lang="ts">
defineProps<{ index: string; eyebrow: string; title: string; subtitle?: string }>()
</script>

<template>
  <div data-reveal class="mb-14 max-w-3xl">
    <div class="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-white/45">
      <span class="text-iridescent font-semibold">{{ index }}</span>
      <span class="h-px w-10 bg-gradient-to-r from-white/40 to-transparent" />
      {{ eyebrow }}
    </div>
    <h2 class="font-display text-[clamp(2.2rem,5.5vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-5 text-base leading-relaxed text-white/55 sm:text-lg">{{ subtitle }}</p>
  </div>
</template>
