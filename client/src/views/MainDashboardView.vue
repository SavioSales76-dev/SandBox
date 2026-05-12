<script setup>
import { ref } from 'vue'
import { AppWindow, Command } from 'lucide-vue-next'

import CategoryBarChart from '@/components/dashboard/CategoryBarChart.vue'
import KpiCard from '@/components/dashboard/KpiCard.vue'
import Sidebar from '@/components/dashboard/Sidebar.vue'
import StockTrendChart from '@/components/dashboard/StockTrendChart.vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'

const menuItems = [
  { id: 'dashboard', label: 'Dasboard', icon: AppWindow },
  { id: 'buttons', label: 'Buttons', icon: Command },
]

const kpiItems = [
  { id: 'buttons', label: 'Buttons', value: 12 },
  { id: 'cards', label: 'Cards', value: 8, isAccent: true },
  { id: 'sections', label: 'Sections', value: 5 },
  { id: 'kpi-cards', label: 'KPI Cards', value: 4 },
]

const incomeSeries = [
  { month: 'Jan', profit: 16, loss: 12 },
  { month: 'Feb', profit: 22, loss: 9 },
  { month: 'Mar', profit: 18, loss: 8 },
  { month: 'Apr', profit: 14, loss: 12 },
  { month: 'May', profit: 21, loss: 10 },
  { month: 'Jun', profit: 25, loss: 15 },
  { month: 'Jul', profit: 16, loss: 13 },
  { month: 'Aug', profit: 12, loss: 8 },
]

const marketTrendSeries = [
  { label: 'Jan', value: 42 },
  { label: 'Feb', value: 39 },
  { label: 'Mar', value: 45 },
  { label: 'Apr', value: 47 },
  { label: 'May', value: 44 },
  { label: 'Jun', value: 52 },
  { label: 'Jul', value: 49 },
  { label: 'Aug', value: 56 },
]

const activeTab = ref('dashboard')
const primaryButtonCodeViews = ref(0)
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-surface max-[960px]:flex-col">
    <Sidebar :items="menuItems" :active-item="activeTab" @select="activeTab = $event" />

    <main class="flex min-h-0 flex-1 items-stretch overflow-hidden p-6 max-[960px]:w-full">
      <section
        v-if="activeTab === 'dashboard'"
        class="tab-content-scroll flex h-full w-full flex-col gap-6 overflow-y-auto rounded-lg bg-card p-8 overscroll-contain"
      >
        <p class="caption">Aba inicial</p>
        <h1 class="text-h1 leading-[1.05]">Visao geral</h1>
        <p class="max-w-[60ch] text-small text-forest-700">
          Esta e a area inicial do painel. Aqui vamos concentrar os cards e indicadores
          principais do projeto.
        </p>

        <div class="grid grid-cols-4 gap-4 max-[960px]:grid-cols-1">
          <KpiCard
            v-for="item in kpiItems"
            :key="item.id"
            :label="item.label"
            :value="item.value"
            :is-accent="item.isAccent"
          />
        </div>

        <div class="grid grid-cols-4 items-stretch gap-4 max-[960px]:grid-cols-1">
          <div class="col-span-2 h-full max-[960px]:col-span-1">
            <CategoryBarChart :data="incomeSeries" />
          </div>
          <div class="col-span-2 h-full max-[960px]:col-span-1">
            <StockTrendChart :data="marketTrendSeries" />
          </div>
        </div>
      </section>

      <section v-else class="tab-content-scroll flex h-full w-full flex-col gap-6 overflow-y-auto rounded-lg bg-card p-8 overscroll-contain">
        <p class="caption">Design system</p>
        <h2 class="text-h2 leading-[1.1]">Buttons</h2>
        <p class="max-w-[60ch] text-small text-forest-700">
          Primeiro componente convertido do Figma para Vue.
        </p>

        <div class="rounded-md bg-card">
          <div class="grid grid-cols-3 gap-6 max-[1100px]:grid-cols-2 max-[720px]:grid-cols-1">
            <div class="flex flex-col gap-3">
              <div class="relative flex min-h-45 items-center justify-center rounded-lg bg-[#121212] p-4">
                <PrimaryButton />
              </div>
              <div class="flex items-center justify-between px-1">
                <p class="font-display text-small tracking-[0.06em] text-forest-600">
                  Botao Primario
                </p>
                <div class="flex items-center gap-3">
                  <p class="font-body text-small font-medium text-forest-500">
                    Views: {{ primaryButtonCodeViews }}
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
    </main>
  </div>
</template>
