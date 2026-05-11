<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'CategoryBarChart',
})

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: 'Total Income',
  },
  subtitle: {
    type: String,
    default: 'View your income in a certain period of time',
  },
})

const maxTotal = computed(() => {
  return Math.max(
    ...props.data.map((item) => Number(item.profit || 0) + Number(item.loss || 0)),
    1,
  )
})

const yAxisLabels = [
  { label: '50k', value: 50 },
  { label: '40k', value: 40 },
  { label: '30k', value: 30 },
  { label: '20k', value: 20 },
  { label: '10k', value: 10 },
  { label: '0', value: 0 },
]
</script>

<template>
  <section class="h-full rounded-xl border border-forest-200 bg-card p-5">
    <div class="mb-1">
      <h3 class="font-display text-h3 text-forest-900">{{ props.title }}</h3>
      <p class="text-caption text-forest-500">{{ props.subtitle }}</p>
    </div>

    <div class="mb-4 mt-3 flex items-center justify-between border-b border-forest-200 pb-2">
      <p class="font-display text-small text-forest-700">Profit and Loss</p>
      <div class="flex items-center gap-4 text-caption text-forest-600">
        <span class="inline-flex items-center gap-1.5">
          <span class="h-2 w-2 rounded-full bg-[var(--color-accent)]" />Profit
        </span>
        <span class="inline-flex items-center gap-1.5">
          <span class="h-2 w-2 rounded-full bg-forest-900" />Loss
        </span>
      </div>
    </div>

    <div class="grid grid-cols-[30px_1fr] gap-3">
      <div class="flex h-44 flex-col justify-between text-[11px] text-forest-500">
        <span v-for="tick in yAxisLabels" :key="tick.label">{{ tick.label }}</span>
      </div>

      <div class="relative h-44">
        <div class="absolute inset-0 flex flex-col justify-between">
          <div v-for="tick in yAxisLabels" :key="`line-${tick.label}`" class="h-px bg-forest-100" />
        </div>

        <div class="relative z-10 flex h-full items-end justify-between gap-2 px-1">
          <div v-for="item in props.data" :key="item.month" class="flex w-7 flex-col items-center gap-2">
            <div class="flex h-36 w-full flex-col justify-end">
              <div
                class="w-full rounded-t-[6px] bg-[var(--color-accent)] transition-all duration-500"
                :style="{ height: `${((Number(item.profit) / maxTotal) * 100).toFixed(2)}%` }"
              />
              <div
                class="w-full rounded-b-[6px] bg-forest-900 transition-all duration-500"
                :style="{ height: `${((Number(item.loss) / maxTotal) * 100).toFixed(2)}%` }"
              />
            </div>
            <span class="text-[11px] text-forest-600">{{ item.month }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
