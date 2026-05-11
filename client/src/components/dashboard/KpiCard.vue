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

<template>
  <article class="kpi-card" :class="{ 'kpi-card-accent': props.isAccent }">
    <p class="kpi-label">{{ props.label }}</p>
    <p class="kpi-value">{{ props.value }}</p>
  </article>
</template>

<style scoped>
.kpi-card {
  border-radius: var(--radius-md);
  border: 1px solid var(--forest-200);
  background: #fff;
  padding: var(--sp-4);
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.kpi-card-accent {
  background: var(--color-accent);
  border-color: transparent;
}

.kpi-label {
  color: var(--forest-500);
  font-size: var(--text-small);
  font-family: var(--font-display);
  letter-spacing: 0.03em;
}

.kpi-value {
  color: var(--forest-900);
  font-family: var(--font-display);
  font-size: var(--text-h1);
  line-height: 1;
}

.kpi-card-accent .kpi-label,
.kpi-card-accent .kpi-value {
  color: var(--forest-900);
}
</style>
