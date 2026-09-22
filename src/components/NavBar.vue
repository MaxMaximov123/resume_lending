<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollToTarget } from '@/composables/useSmoothScroll'

const links = [
  { id: 'about', label: 'Обо мне' },
  { id: 'skills', label: 'Навыки' },
  { id: 'journey', label: 'Путь' },
  { id: 'contact', label: 'Контакты' },
]

const active = ref('')
let triggers: ScrollTrigger[] = []

onMounted(() => {
  triggers = links.map((link) =>
    ScrollTrigger.create({
      trigger: `#${link.id}`,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => {
        if (self.isActive) active.value = link.id
        else if (active.value === link.id) active.value = ''
      },
    }),
  )
})

onBeforeUnmount(() => triggers.forEach((t) => t.kill()))
</script>

<template>
  <header
    v-motion
    :initial="{ opacity: 0, y: -40 }"
    :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 16, delay: 900 } }"
    class="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
  >
    <nav class="glass-strong glass-border flex items-center gap-1 rounded-full p-1.5 sm:gap-2">
      <button
        class="grid h-9 w-9 place-items-center rounded-full bg-white/10 font-display text-[11px] font-bold tracking-wider text-white transition hover:bg-white/20"
        aria-label="Наверх"
        @click="scrollToTarget('#top')"
      >
        MS
      </button>
      <button
        v-for="link in links"
        :key="link.id"
        class="relative rounded-full px-3 py-2 text-[13px] font-medium transition-colors duration-300 sm:px-4"
        :class="active === link.id ? 'text-white' : 'text-white/55 hover:text-white'"
        @click="scrollToTarget(`#${link.id}`)"
      >
        <span
          class="absolute inset-0 rounded-full bg-white/12 shadow-[inset_0_1px_0_rgb(255_255_255/0.25)] transition-all duration-500 ease-(--ease-spring)"
          :class="active === link.id ? 'scale-100 opacity-100' : 'scale-75 opacity-0'"
        />
        <span class="relative">{{ link.label }}</span>
      </button>
    </nav>
  </header>
</template>
