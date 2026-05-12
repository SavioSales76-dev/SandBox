<script setup>
import { ref } from 'vue'

import KpiCard from '@/components/dashboard/KpiCard.vue'

const kpiCardCodeViews = ref(0)
</script>

<template>
  <section class="tab-content-scroll flex h-full w-full flex-col gap-6 overflow-y-auto rounded-lg bg-card p-8 overscroll-contain">
    <p class="caption">Design system</p>
    <h2 class="text-h2 leading-[1.1]">Cards</h2>
    <p class="max-w-[60ch] text-small text-forest-700">
      Cards são a melhor maneira de expor informações, eles são perfeitos para você que deseja destacar métricas importantes no seu dashboard.
    </p>

    <div class="rounded-md bg-card">
      <div class="grid grid-cols-3 gap-6 max-[1100px]:grid-cols-2 max-[720px]:grid-cols-1">
        <div class="flex flex-col gap-3">
          <div class="relative flex min-h-45 items-center justify-center rounded-lg bg-[#121212] p-4">
            <KpiCard class="w-full max-w-90" label="KPI Card" :value="8" is-accent />
          </div>
          <div class="flex items-center justify-between px-1">
            <p class="font-display text-small font-medium tracking-[0.06em] text-forest-600">
              KPI Card
            </p>
            <div class="flex items-center gap-3">
              <p class="font-body text-small font-medium text-forest-500">
                Views: {{ kpiCardCodeViews }}
              </p>
              <button
                type="button"
                class="inline-flex items-center rounded-full border-2 border-forest-300 px-3 py-1 font-display text-caption font-medium tracking-[0.06em] text-forest-700 transition-colors hover:border-forest-500 hover:text-forest-900"
              >
                Get Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
