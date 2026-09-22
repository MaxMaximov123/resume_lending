<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'
import { Rocket, Trophy, Users } from 'lucide-vue-next'
import { profile, stats } from '@/data/resume'
import { useReveal } from '@/composables/useReveal'
import SectionHeading from './SectionHeading.vue'

const root = ref<HTMLElement>()
const hobbyIcons = [Trophy, Users, Rocket]

useReveal(root, () => {
  // Count-up numbers
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count)
    const state = { v: 0 }
    gsap.to(state, {
      v: target,
      duration: 2.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = Math.round(state.v).toString()
      },
    })
  })

  gsap.from('[data-stat]', {
    y: 40,
    opacity: 0,
    scale: 0.94,
    duration: 1.2,
    ease: 'expo.out',
    stagger: 0.1,
    scrollTrigger: { trigger: '[data-stats]', start: 'top 85%', once: true },
  })
})
</script>

<template>
  <section id="about" ref="root" class="relative px-5 py-28 sm:px-8 sm:py-36">
    <div class="mx-auto max-w-7xl">
      <SectionHeading index="01" eyebrow="Обо мне" title="Инженерия, которую приятно поддерживать" />

      <div class="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <article
          data-reveal
          class="glass glass-border overflow-hidden rounded-[2rem] p-8 sm:p-10"
        >
          <div class="space-y-6 text-lg leading-relaxed text-white/70 sm:text-xl">
            <p v-for="(p, i) in profile.about" :key="i" :class="i === 0 ? 'text-white/85' : ''">{{ p }}</p>
          </div>

          <div class="mt-10 border-t border-white/10 pt-8">
            <div class="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-white/40">Хобби</div>
            <div class="flex flex-wrap gap-3">
              <span
                v-for="(h, i) in profile.hobbies"
                :key="h"
                class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75"
              >
                <component :is="hobbyIcons[i]" class="h-4 w-4 text-accent-pink" />
                {{ h }}
              </span>
            </div>
          </div>
        </article>

        <div data-stats class="grid grid-cols-2 gap-4 sm:gap-6">
          <div
            v-for="s in stats"
            :key="s.label"
            data-stat
            class="glass glass-border flex flex-col justify-between overflow-hidden rounded-[1.75rem] p-6 sm:p-7"
          >
            <div class="font-display text-4xl font-bold tracking-tight whitespace-nowrap text-white sm:text-5xl">
              <span :data-count="s.value">0</span><span class="text-iridescent" :class="s.suffix.length > 1 ? 'text-[0.55em]' : ''">{{ s.suffix }}</span>
            </div>
            <div class="mt-6 text-sm leading-snug text-white/50">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
