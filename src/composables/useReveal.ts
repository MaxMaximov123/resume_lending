import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Fades + lifts every `[data-reveal]` inside `root` as it scrolls into view. */
export function useReveal(root: Ref<HTMLElement | undefined>, setup?: () => void) {
  let ctx: gsap.Context | null = null

  onMounted(() => {
    ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          filter: 'blur(10px)',
          duration: 1.3,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
      setup?.()
    }, root.value)
  })

  onBeforeUnmount(() => ctx?.revert())
}
