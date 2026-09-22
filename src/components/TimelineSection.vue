<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'
import { Briefcase, GraduationCap } from 'lucide-vue-next'
import { education, experience, type TimelineItem } from '@/data/resume'
import { useReveal } from '@/composables/useReveal'
import SectionHeading from './SectionHeading.vue'

const root = ref<HTMLElement>()

const groups: { label: string; items: TimelineItem[] }[] = [
  { label: 'Опыт', items: experience },
  { label: 'Образование', items: education },
]

useReveal(root, () => {
  // Line fills as the user scrolls through the timeline
  gsap.fromTo(
    '[data-line-fill]',
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: '[data-timeline]', start: 'top 60%', end: 'bottom 60%', scrub: 0.6 },
    },
  )

  gsap.utils.toArray<HTMLElement>('[data-tl-item]').forEach((item) => {
    const side = item.dataset.side === 'left' ? -1 : 1
    const card = item.querySelector('[data-tl-card]')
    const dot = item.querySelector('[data-tl-dot]')

    gsap.from(card, {
      x: 60 * side,
      opacity: 0,
      filter: 'blur(8px)',
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: { trigger: item, start: 'top 80%', once: true },
    })
    gsap.fromTo(
      dot,
      { scale: 0.4, opacity: 0.4 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(3)',
        scrollTrigger: { trigger: item, start: 'top 60%', toggleActions: 'play none none reverse' },
      },
    )
  })
})

/** Alternate sides on desktop, continuously across both groups. */
function sideOf(groupIndex: number, itemIndex: number) {
  const offset = groups.slice(0, groupIndex).reduce((n, g) => n + g.items.length, 0)
  return (offset + itemIndex) % 2 === 0 ? 'left' : 'right'
}
</script>

<template>
  <section id="journey" ref="root" class="relative px-5 py-28 sm:px-8 sm:py-36">
    <div class="mx-auto max-w-6xl">
      <SectionHeading
        index="03"
        eyebrow="Путь"
        title="Опыт и образование"
        subtitle="Коммерческие проекты, стартап, собственные разработки — и фундамент из профильного образования."
      />

      <div data-timeline class="relative">
        <!-- spine -->
        <div class="absolute bottom-0 left-5 top-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2">
          <div
            data-line-fill
            class="h-full w-full origin-top bg-gradient-to-b from-accent-red via-accent-violet to-accent-cyan shadow-[0_0_18px_rgb(168_85_247/0.8)]"
          />
        </div>

        <div v-for="(group, gi) in groups" :key="group.label" class="relative">
          <div class="relative z-10 mb-10 flex md:justify-center" :class="gi > 0 ? 'mt-20' : ''">
            <span
              class="glass-strong glass-border ml-10 inline-flex items-center gap-2 rounded-full px-5 py-2 font-mono text-xs uppercase tracking-[0.25em] text-white/80 md:ml-0"
            >
              <component :is="gi === 0 ? Briefcase : GraduationCap" class="h-4 w-4 text-accent-cyan" />
              {{ group.label }}
            </span>
          </div>

          <div class="space-y-10 md:space-y-4">
            <div
              v-for="(item, ii) in group.items"
              :key="item.title"
              data-tl-item
              :data-side="sideOf(gi, ii)"
              class="relative grid md:grid-cols-2 md:gap-16"
            >
              <!-- dot -->
              <div
                data-tl-dot
                class="absolute left-5 top-8 z-10 -translate-x-1/2 md:left-1/2"
              >
                <span class="block h-4 w-4 rounded-full border-2 border-white bg-ink-950 shadow-[0_0_0_6px_rgb(168_85_247/0.18),0_0_24px_rgb(255_79_216/0.9)]" />
              </div>

              <article
                data-tl-card
                class="glass glass-border ml-12 overflow-hidden rounded-[1.75rem] p-7 md:ml-0"
                :class="sideOf(gi, ii) === 'left' ? 'md:col-start-1 md:text-right' : 'md:col-start-2'"
              >
                <div
                  class="flex flex-wrap items-center gap-3"
                  :class="sideOf(gi, ii) === 'left' ? 'md:justify-end' : ''"
                >
                  <span class="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan">{{ item.period }}</span>
                  <span
                    v-if="item.highlight"
                    class="rounded-full bg-gradient-to-r from-accent-red/25 to-accent-violet/25 px-3 py-1 text-[11px] font-semibold text-white ring-1 ring-white/15"
                  >
                    {{ item.highlight }}
                  </span>
                </div>
                <h3 class="mt-3 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {{ item.title }}
                </h3>
                <div v-if="item.place" class="mt-1 text-sm font-medium text-white/55">{{ item.place }}</div>
                <p class="mt-3 text-[15px] leading-relaxed text-white/60">{{ item.text }}</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
