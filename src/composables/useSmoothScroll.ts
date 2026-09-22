import { onBeforeUnmount, onMounted, shallowRef } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lenis = shallowRef<Lenis | null>(null)

/** Inertial scroll (Lenis) driven by the GSAP ticker so ScrollTrigger stays in sync. */
export function useSmoothScroll() {
  let tick: ((time: number) => void) | null = null

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const instance = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.95 })
    instance.on('scroll', ScrollTrigger.update)
    tick = (time) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    lenis.value = instance
  })

  onBeforeUnmount(() => {
    if (tick) gsap.ticker.remove(tick)
    lenis.value?.destroy()
    lenis.value = null
  })
}

/** Scroll to a section, using Lenis when it is running. */
export function scrollToTarget(target: string) {
  if (lenis.value) {
    lenis.value.scrollTo(target, { offset: -24, duration: 1.4 })
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  }
}
