<template>
  <article
    class="flex flex-col gap-2 rounded-md border border-forest-200 bg-card p-6"
    :class="{ 'border-transparent': props.isAccent }"
    :style="props.isAccent ? { backgroundColor: 'var(--color-accent)' } : undefined"
  >
    <p class="font-display text-small tracking-[0.03em]" :class="props.isAccent ? 'text-[var(--color-accent-contrast)]' : 'text-forest-500'">
      {{ props.label }}
    </p>
    <p class="font-display text-h1 leading-none" :class="props.isAccent ? 'text-[var(--color-accent-contrast)]' : 'text-forest-900'">
      {{ props.value }}
    </p>
  </article>
</template>

<script setup>
defineOptions({
  name: 'DashboardKpiCard',
})

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  isAccent: {
    type: Boolean,
    default: false,
  },
})
</script>
