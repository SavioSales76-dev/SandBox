<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'StockTrendChart',
})

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: 'Market Trend',
  },
})

const minValue = computed(() => Math.min(...props.data.map((item) => Number(item.value || 0)), 0))
const maxValue = computed(() => Math.max(...props.data.map((item) => Number(item.value || 0)), 1))

const points = computed(() => {
  if (!props.data.length) return ''

  return props.data
    .map((item, index) => {
      const x = (index / Math.max(props.data.length - 1, 1)) * 100
      const range = maxValue.value - minValue.value || 1
      const y = 100 - ((Number(item.value) - minValue.value) / range) * 100
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
})

const areaPoints = computed(() => {
  if (!points.value) return ''
  return `0,100 ${points.value} 100,100`
})

const trendDelta = computed(() => {
  if (props.data.length < 2) return 0
  const first = Number(props.data[0].value)
  const last = Number(props.data.at(-1).value)
  return (((last - first) / Math.max(first, 1)) * 100).toFixed(1)
})

const isPositive = computed(() => Number(trendDelta.value) >= 0)
</script>

<template>
  <section class="h-full rounded-xl border border-forest-200 bg-card p-5">
    <div class="mb-4 flex items-start justify-between gap-3">
      <div>
        <h3 class="font-display text-h3 text-forest-900">{{ props.title }}</h3>
        <p class="text-caption text-forest-500">Acompanhamento estilo bolsa</p>
      </div>
      <span
        class="rounded-full px-2.5 py-1 text-caption font-medium"
        :class="isPositive ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent-contrast)]' : 'bg-forest-200 text-forest-900'"
      >
        {{ isPositive ? '+' : '' }}{{ trendDelta }}%
      </span>
    </div>

    <div class="h-44 rounded-lg border border-forest-100 bg-[color-mix(in_srgb,var(--color-card)_90%,transparent)] p-3">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="h-full w-full">
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--color-accent)" stop-opacity="0.38" />
            <stop offset="100%" stop-color="var(--color-accent)" stop-opacity="0.03" />
          </linearGradient>
        </defs>

        <g>
          <line x1="0" y1="20" x2="100" y2="20" stroke="var(--forest-200)" stroke-width="0.5" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="var(--forest-200)" stroke-width="0.5" />
          <line x1="0" y1="80" x2="100" y2="80" stroke="var(--forest-200)" stroke-width="0.5" />
        </g>

        <polygon :points="areaPoints" fill="url(#trendFill)" />
        <polyline :points="points" fill="none" stroke="var(--color-accent)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>

    <div class="mt-3 flex items-center justify-between text-[11px] text-forest-500">
      <span v-for="item in props.data" :key="`label-${item.label}`">{{ item.label }}</span>
    </div>
  </section>
</template>
