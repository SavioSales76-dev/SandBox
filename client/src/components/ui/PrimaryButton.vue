<template>
  <button
    type="button"
    class="group relative inline-flex h-15 w-56.25 items-center justify-center overflow-visible rounded-full border-0 bg-transparent p-0 isolate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset(--color-surface)"
    :style="{ '--glow-shift': `${glowShift}px` }"
    :data-returning="isReturning"
    @click="$emit('click', $event)"
    @mouseenter="clearResetTimer"
    @mousemove="handleMouseMove"
    @mouseleave="resetGlow"
  >
    <span data-slot="face" class="absolute inset-0 z-20 rounded-full" data-node-id="19:27">
      <span data-slot="bg" class="absolute inset-0 rounded-full"></span>

      <span data-slot="glow glow-halo" class="pointer-events-none absolute -right-2.5 top-1/2 z-10 h-17 w-23 rounded-full"></span>
      <span data-slot="glow glow-ring" class="pointer-events-none absolute -right-1 top-1/2 z-10 h-13.5 w-16.5 rounded-full"></span>
      <span data-slot="glow glow-core" class="pointer-events-none absolute right-2.5 top-1/2 z-10 h-6 w-6 rounded-full"></span>

      <span data-slot="content" class="relative z-20 inline-flex h-full w-full items-center justify-center gap-2.5 px-6 py-3">
        <span class="font-display text-h2 font-normal leading-none tracking-[-0.48px] text-(--color-accent-contrast)">
          {{ label }}
        </span>

        <span class="relative inline-flex size-9 items-center justify-center text-(--color-accent-contrast)" aria-hidden="true">
          <ArrowUpRight :size="30" :stroke-width="1.7" />
        </span>
      </span>
    </span>
  </button>
</template>

<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'

defineOptions({
  name: 'PrimaryButton',
})

defineProps({
  label: {
    type: String,
    default: 'Get Started',
  },
})

defineEmits(['click'])

const glowShift = ref(0)
const isReturning = ref(false)
const RESET_DELAY_MS = 2000
let resetTimerId = null

function handleMouseMove(event) {
  clearResetTimer()
  isReturning.value = false

  const rect = event.currentTarget.getBoundingClientRect()
  const relativeX = event.clientX - rect.left
  const progress = relativeX / rect.width
  const minShift = -150
  const maxShift = 8

  glowShift.value = minShift + (maxShift - minShift) * progress
}

function resetGlow() {
  clearResetTimer()
  resetTimerId = window.setTimeout(() => {
    isReturning.value = true
    glowShift.value = 0
    resetTimerId = null
  }, RESET_DELAY_MS)
}

function clearResetTimer() {
  if (resetTimerId !== null) {
    window.clearTimeout(resetTimerId)
    resetTimerId = null
  }
}

onBeforeUnmount(clearResetTimer)
</script>

<style scoped>
[data-slot='face'] {
  overflow: visible;
}

[data-slot='bg'] {
  background-color: #e8eef5;
  box-shadow: 0 0 12px color-mix(in srgb, var(--color-accent) 44%, transparent);
}

[data-slot='bg']::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  box-shadow: 0 0 10px color-mix(in srgb, var(--color-accent) 30%, transparent);
  mix-blend-mode: screen;
}

[data-slot~='glow'] {
  transform: translateX(var(--glow-shift, 0px)) translateY(-50%);
  transition: transform 120ms ease-out, opacity 180ms ease-out;
  mix-blend-mode: color-dodge;
}

.group[data-returning='true'] [data-slot~='glow'] {
  transition: transform 560ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease-out;
}

[data-slot~='glow-halo'] {
  background: radial-gradient(
    65% 65% at 58% 50%,
    color-mix(in srgb, var(--lime-200) 44%, #ffffff) 0%,
    color-mix(in srgb, var(--color-accent) 70%, transparent) 42%,
    transparent 100%
  );
  filter: blur(11px);
  opacity: 0.78;
}

[data-slot~='glow-ring'] {
  background: radial-gradient(
    72% 72% at 58% 50%,
    color-mix(in srgb, var(--lime-200) 34%, #ffffff) 0%,
    color-mix(in srgb, var(--color-accent) 60%, transparent) 52%,
    transparent 100%
  );
  filter: blur(7px);
  opacity: 0.82;
}

[data-slot~='glow-core'] {
  background: radial-gradient(
    68% 68% at 55% 50%,
    color-mix(in srgb, var(--lime-100) 78%, #ffffff) 0%,
    color-mix(in srgb, var(--lime-200) 48%, #ffffff) 58%,
    rgba(255, 255, 255, 0) 100%
  );
  filter: blur(0.5px);
  opacity: 0.86;
}
</style>
