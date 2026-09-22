<script setup lang="ts">
import type { Skill } from '@/data/resume'

const props = defineProps<{ skill: Skill; index: number }>()

const number = String(props.index + 1).padStart(2, '0')
</script>

<template>
  <div data-skill class="[perspective:1200px]">
    <article class="glass relative h-full overflow-hidden rounded-[1.75rem] p-7">
      <!-- static accent-tinted gradient border -->
      <div
        class="accent-ring pointer-events-none absolute inset-0 rounded-[inherit] p-px opacity-70"
        :style="{
          background: `radial-gradient(380px circle at 50% 0%, ${skill.accent}, rgb(255 255 255 / 0.12) 40%, rgb(255 255 255 / 0.05) 70%)`,
        }"
      />

      <div class="relative">
        <div class="flex items-start justify-between">
          <div
            class="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5"
            :style="{ color: skill.accent }"
          >
            <component :is="skill.icon" class="h-6 w-6" :stroke-width="1.6" />
          </div>
          <span class="font-mono text-xs text-white/30">{{ number }}</span>
        </div>

        <h3 class="mt-6 font-display text-xl font-semibold tracking-tight text-white">{{ skill.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-white/50">{{ skill.description }}</p>

        <ul class="mt-6 flex flex-wrap gap-2">
          <li
            v-for="tag in skill.tags"
            :key="tag"
            class="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[12px] text-white/70"
          >
            {{ tag }}
          </li>
        </ul>
      </div>
    </article>
  </div>
</template>

<style scoped>
.accent-ring {
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
</style>
