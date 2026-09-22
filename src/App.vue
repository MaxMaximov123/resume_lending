<script setup lang="ts">
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import { computed } from 'vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import LiquidBackground from '@/components/LiquidBackground.vue'
import NavBar from '@/components/NavBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import TimelineSection from '@/components/TimelineSection.vue'
import ContactSection from '@/components/ContactSection.vue'

useSmoothScroll()

const { y } = useWindowScroll()
const { height } = useWindowSize()
const progress = computed(() => {
  const max = document.documentElement.scrollHeight - height.value
  return max > 0 ? Math.min(1, y.value / max) : 0
})
</script>

<template>
  <LiquidBackground />

  <!-- scroll progress -->
  <div
    class="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-accent-red via-accent-violet to-accent-cyan"
    :style="{ transform: `scaleX(${progress})` }"
  />

  <NavBar />

  <main class="relative overflow-x-clip">
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <TimelineSection />
    <ContactSection />
  </main>
</template>
