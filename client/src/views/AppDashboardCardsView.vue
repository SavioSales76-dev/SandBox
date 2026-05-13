<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import ComponentCell from '@/components/dashboard/ComponentCell.vue'
import KpiCard from '@/components/dashboard/KpiCard.vue'

const router = useRouter()
const kpiCardCodeViews = ref(0)

function openComponentCode() {
  kpiCardCodeViews.value += 1
  router.push({
    name: 'app-dashboard-component-code',
    params: { componentId: 'kpi-card' },
    query: { from: 'app-dashboard-cards' },
  })
}
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
        <ComponentCell title="KPI Card" :views="kpiCardCodeViews" @get-code="openComponentCode">
          <template #default>
            <KpiCard class="w-full max-w-90" label="KPI Card" :value="8" is-accent />
          </template>
        </ComponentCell>
      </div>
    </div>
  </section>
</template>
