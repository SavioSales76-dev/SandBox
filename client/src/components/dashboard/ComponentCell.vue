<template>
  <div class="flex h-full flex-col gap-3">
    <div class="relative flex items-center justify-center rounded-lg bg-[#121212] p-4" :class="props.previewClass">
      <slot />
    </div>

    <div class="flex items-center justify-between px-1">
      <p class="font-display text-small font-medium tracking-[0.06em] text-forest-600">
        {{ props.title }}
      </p>
      <div class="flex items-center gap-3">
        <p class="font-body text-small font-medium text-forest-500">
          Views: {{ props.views }}
        </p>
        <button
          type="button"
          @click="emit('get-code')"
          class="inline-flex items-center rounded-full border-2 border-forest-300 px-3 py-1 font-display text-caption font-medium tracking-[0.06em] text-forest-700 transition-colors hover:border-forest-500 hover:text-forest-900"
        >
          Get Code
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'DashboardComponentCell',
})

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  previewClass: {
    type: String,
    default: 'min-h-45',
  },
})

const emit = defineEmits(['get-code'])
</script>
