<script setup lang="ts">
import { ref, type Component } from 'vue'
import { useClipboard } from '@vueuse/core'
import { ArrowUpRight, Check, Copy, Github, Mail, Phone, Send } from 'lucide-vue-next'
import { contacts } from '@/data/resume'
import { useReveal } from '@/composables/useReveal'
import MagneticLink from './MagneticLink.vue'

const root = ref<HTMLElement>()
useReveal(root)

const { copy, copied } = useClipboard({ copiedDuring: 1800 })

interface ContactLink {
  label: string
  value: string
  href: string
  icon: Component
  gradient: string
  external?: boolean
}

const links: ContactLink[] = [
  {
    label: 'Telegram',
    value: contacts.telegram,
    href: contacts.telegramHref,
    icon: Send,
    gradient: 'from-sky-400 to-blue-600',
    external: true,
  },
  {
    label: 'GitHub',
    value: contacts.github,
    href: contacts.githubHref,
    icon: Github,
    gradient: 'from-zinc-300 to-zinc-600',
    external: true,
  },
  {
    label: 'Телефон',
    value: contacts.phone,
    href: contacts.phoneHref,
    icon: Phone,
    gradient: 'from-emerald-400 to-teal-600',
  },
]
</script>

<template>
  <section id="contact" ref="root" class="relative px-5 py-28 sm:px-8 sm:py-36">
    <div class="mx-auto max-w-6xl">
      <div data-reveal class="glass glass-border relative overflow-hidden rounded-[2.5rem] p-8 sm:p-14">
        <!-- inner aurora -->
        <div
          class="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent-violet/40 blur-[100px]"
        />
        <div
          class="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-accent-red/30 blur-[110px]"
        />

        <div class="relative">
          <div class="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-white/45">
            <span class="text-iridescent font-semibold">04</span>
            <span class="h-px w-10 bg-gradient-to-r from-white/40 to-transparent" />
            Контакты
          </div>
          <h2
            class="max-w-4xl font-display text-[clamp(2.4rem,6.5vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.035em] text-white"
          >
            Есть задача? <span class="text-iridescent">Давайте обсудим.</span>
          </h2>
          <p class="mt-6 max-w-xl text-lg text-white/55">
            Быстрее всего отвечаю в Telegram. Также можно написать на почту или позвонить.
          </p>

          <!-- Primary: email with copy -->
          <div class="mt-12 flex flex-col gap-3 sm:flex-row">
            <a
              :href="`mailto:${contacts.email}`"
              class="group relative flex flex-1 items-center justify-between gap-4 overflow-hidden rounded-3xl px-6 py-5 text-white shadow-[0_20px_60px_-20px_rgb(168_85_247/0.8)] transition-transform duration-500 ease-(--ease-spring) hover:scale-[1.015] active:scale-[0.98] sm:px-8 sm:py-6"
            >
              <span
                class="absolute inset-0 bg-[linear-gradient(110deg,var(--color-accent-red),var(--color-accent-violet)_45%,var(--color-accent-blue)_80%,var(--color-accent-cyan))] bg-size-[200%_100%] transition-[background-position] duration-1000 group-hover:bg-position-[100%_0]"
              />
              <span class="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.25),transparent_50%)]" />
              <span class="relative flex min-w-0 items-center gap-4">
                <Mail class="h-6 w-6 shrink-0" />
                <span class="min-w-0">
                  <span class="block text-xs font-medium uppercase tracking-[0.2em] text-white/75">Email</span>
                  <span class="block truncate font-display text-lg font-semibold sm:text-2xl">{{ contacts.email }}</span>
                </span>
              </span>
              <ArrowUpRight
                class="relative h-6 w-6 shrink-0 transition-transform duration-500 ease-(--ease-spring) group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
            <button
              type="button"
              class="glass glass-border flex items-center justify-center gap-2 rounded-3xl px-6 py-4 text-sm font-semibold text-white/85 transition-all duration-500 ease-(--ease-spring) hover:scale-[1.03] hover:text-white active:scale-95"
              @click="copy(contacts.email)"
            >
              <Transition
                mode="out-in"
                enter-active-class="transition duration-300 ease-(--ease-spring)"
                enter-from-class="scale-50 opacity-0"
                leave-active-class="transition duration-150"
                leave-to-class="scale-50 opacity-0"
              >
                <Check v-if="copied" class="h-4 w-4 text-emerald-400" />
                <Copy v-else class="h-4 w-4" />
              </Transition>
              {{ copied ? 'Скопировано' : 'Копировать' }}
            </button>
          </div>

          <!-- Secondary links -->
          <div class="mt-4 grid gap-4 md:grid-cols-3">
            <MagneticLink v-for="l in links" :key="l.label" :href="l.href" :external="l.external">
              <span
                class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-500 ease-out group-hover:scale-105"
                :class="l.gradient"
              >
                <component :is="l.icon" class="h-5 w-5" />
              </span>
              <span class="min-w-0 flex-1">
                <span class="block text-xs uppercase tracking-[0.2em] text-white/45">{{ l.label }}</span>
                <span class="block truncate font-medium text-white">{{ l.value }}</span>
              </span>
              <ArrowUpRight
                class="h-5 w-5 shrink-0 text-white/40 transition-all duration-500 ease-(--ease-spring) group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
              />
            </MagneticLink>
          </div>
        </div>
      </div>

      <footer class="mt-16 flex flex-col items-center justify-between gap-4 text-sm text-white/35 sm:flex-row">
        <span>© {{ new Date().getFullYear() }} Максим Смирнов</span>
        <span class="font-mono text-xs">Vue 3 · GSAP · Lenis · Tailwind</span>
      </footer>
    </div>
  </section>
</template>
