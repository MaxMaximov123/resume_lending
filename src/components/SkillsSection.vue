<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'
import { skills } from '@/data/resume'
import { useReveal } from '@/composables/useReveal'
import SectionHeading from './SectionHeading.vue'
import SkillCard from './SkillCard.vue'

const root = ref<HTMLElement>()

const marquee = skills.flatMap((s) => s.tags)

useReveal(root, () => {
  gsap.from('[data-skill]', {
    y: 80,
    opacity: 0,
    rotateX: -18,
    duration: 1.3,
    ease: 'expo.out',
    stagger: { each: 0.08, grid: 'auto', from: 'start' },
    scrollTrigger: { trigger: '[data-skills-grid]', start: 'top 82%', once: true },
  })

  // Tech strip moves only while the page is being scrolled
  gsap.fromTo(
    '[data-marquee]',
    { xPercent: 0 },
    {
      xPercent: -35,
      ease: 'none',
      scrollTrigger: { trigger: '[data-marquee]', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
    },
  )
})
</script>

<template>
  <section id="skills" ref="root" class="relative py-28 sm:py-36">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        index="02"
        eyebrow="Навыки"
        title="Стек технологий"
        subtitle="От базы данных до интерфейса и Telegram-бота — полный цикл разработки и работы с данными."
      />

      <div data-skills-grid class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <SkillCard v-for="(skill, i) in skills" :key="skill.title" :skill="skill" :index="i" />
      </div>
    </div>

    <!-- Tech strip, driven by scroll -->
    <div
      class="relative mt-20 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
    >
      <div data-marquee class="flex w-max gap-4">
        <template v-for="n in 2" :key="n">
          <span
            v-for="t in marquee"
            :key="`${n}-${t}`"
            class="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 font-mono text-sm text-white/60"
            :aria-hidden="n === 2"
          >
            {{ t }}
          </span>
        </template>
      </div>
    </div>
  </section>
</template>
