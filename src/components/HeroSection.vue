<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ArrowDown, Sparkles } from 'lucide-vue-next'
import { profile } from '@/data/resume'
import { scrollToTarget } from '@/composables/useSmoothScroll'
import avatar from '@/assets/avatar.jpg'

const root = ref<HTMLElement>()

const lines = [profile.firstName, profile.lastName]

/* ---------- Typewriter: types the roles once, then stops ---------- */
const rolesLine = profile.roles.join(' · ')
const typed = ref('')
const typing = ref(true)
let typingTimer: number | undefined

function runTypewriter(charIndex = 0) {
  typed.value = rolesLine.slice(0, charIndex)
  if (charIndex === rolesLine.length) {
    typing.value = false
    return
  }
  typingTimer = window.setTimeout(() => runTypewriter(charIndex + 1), 55)
}

let ctx: gsap.Context | null = null

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

    tl.from('[data-hero-badge]', { y: 20, opacity: 0, duration: 1 })
      .from(
        '[data-char]',
        {
          yPercent: 120,
          rotateX: -80,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 1.4,
          stagger: { each: 0.045, from: 'start' },
        },
        '-=0.7',
      )
      .from('[data-hero-fade]', { y: 30, opacity: 0, duration: 1.1, stagger: 0.12 }, '-=1')
      .from(
        '[data-hero-photo]',
        { scale: 0.8, opacity: 0, filter: 'blur(20px)', duration: 1.6 },
        '<-0.8',
      )
      .add(() => runTypewriter(), '-=0.9')

    // Parallax out on scroll
    gsap.to('[data-hero-content]', {
      yPercent: -18,
      opacity: 0.2,
      ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true },
    })
  }, root.value)
})

onBeforeUnmount(() => {
  window.clearTimeout(typingTimer)
  ctx?.revert()
})
</script>

<template>
  <section id="top" ref="root" class="relative flex min-h-svh items-center px-5 pb-24 pt-32 sm:px-8">
    <div
      data-hero-content
      class="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-10"
    >
      <!-- Text -->
      <div class="order-2 lg:order-1">
        <div
          data-hero-badge
          class="glass glass-border mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white/80"
        >
          <span class="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgb(52_211_153/0.8)]" />
          Full-stack · Data · 3+ лет в разработке
        </div>

        <h1
          class="font-display text-[clamp(2.4rem,12.5vw,6.5rem)] font-extrabold lg:text-[clamp(3rem,7vw,6.5rem)] uppercase leading-[0.9] tracking-[-0.04em] text-white"
          style="perspective: 900px"
          :aria-label="`${profile.firstName} ${profile.lastName}`"
        >
          <span v-for="(line, li) in lines" :key="line" class="block overflow-hidden whitespace-nowrap pb-[0.06em]" aria-hidden="true">
            <span
              v-for="(ch, ci) in line"
              :key="ci"
              data-char
              class="inline-block origin-bottom"
              :class="li === 1 ? 'text-iridescent' : ''"
              >{{ ch }}</span
            >
          </span>
        </h1>

        <p data-hero-fade class="mt-8 flex items-center gap-3 font-mono text-lg text-white/70 sm:text-2xl">
          <span class="text-accent-cyan">&gt;</span>
          <span class="text-white">{{ typed }}</span>
          <span
            class="-ml-2 inline-block h-[1.1em] w-[3px] rounded bg-accent-pink transition-opacity duration-700"
            :class="typing ? 'opacity-100' : 'opacity-0'"
          />
        </p>

        <p data-hero-fade class="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
          Web-разработка на стыке с анализом данных: backend-системы, интерфейсы, Telegram-боты и инструменты, которые
          удобно масштабировать и поддерживать.
        </p>

        <div data-hero-fade class="mt-10 flex flex-wrap items-center gap-4">
          <button
            class="group relative overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgb(255_45_85/0.7)] transition-transform duration-500 ease-(--ease-spring) hover:scale-[1.04] active:scale-95"
            @click="scrollToTarget('#contact')"
          >
            <span
              class="absolute inset-0 bg-[linear-gradient(110deg,var(--color-accent-red),var(--color-accent-violet),var(--color-accent-cyan),var(--color-accent-red))] bg-size-[250%_100%] transition-[background-position] duration-1000 group-hover:bg-position-[100%_0]"
            />
            <span class="relative flex items-center gap-2">
              <Sparkles class="h-4 w-4" /> Связаться
            </span>
          </button>
          <button
            class="glass glass-border rounded-full px-7 py-3.5 text-sm font-semibold text-white/85 transition-all duration-500 ease-(--ease-spring) hover:scale-[1.04] hover:text-white active:scale-95"
            @click="scrollToTarget('#journey')"
          >
            Смотреть опыт
          </button>
        </div>
      </div>

      <!-- Photo -->
      <div data-hero-photo class="order-1 flex justify-center pb-4 lg:order-2 lg:justify-end lg:pb-0">
        <div class="relative">
          <!-- rotating iridescent halo -->
          <div
            class="absolute -inset-6 rounded-full opacity-70 blur-2xl"
            style="
              background: conic-gradient(from 0deg, #ff2d55, #a855f7, #22d3ee, #3b82f6, #ff4fd8, #ff2d55);
            "
          />
          <div class="glass glass-border relative rounded-[2.75rem] p-3">
            <img
              :src="avatar"
              alt="Максим Смирнов"
              class="h-64 w-64 rounded-[2.2rem] object-cover sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[22rem]"
              style="object-position: 50% 30%"
            />
            <div
              class="pointer-events-none absolute inset-3 rounded-[2.2rem] bg-[linear-gradient(160deg,rgb(255_255_255/0.22),transparent_35%,transparent_70%,rgb(5_5_10/0.5))]"
            />
            <div
              class="glass-strong glass-border absolute -bottom-5 -left-4 whitespace-nowrap rounded-2xl px-3 py-2 text-left sm:-left-6 sm:px-4 sm:py-3"
            >
              <div class="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">МГТУ им. Баумана</div>
              <div class="font-display text-xs font-semibold text-white sm:text-sm">ИУ7 · Программная инженерия</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button
      class="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/40 transition hover:text-white"
      @click="scrollToTarget('#about')"
    >
      scroll
      <ArrowDown class="h-4 w-4" />
    </button>
  </section>
</template>
