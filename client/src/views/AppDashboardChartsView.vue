<script setup>
import { ref } from 'vue'

import CategoryBarChart from '@/components/dashboard/CategoryBarChart.vue'
import StockTrendChart from '@/components/dashboard/StockTrendChart.vue'

const categoryChartCodeViews = ref(0)
const trendChartCodeViews = ref(0)

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
</script>

<template>
  <section class="tab-content-scroll flex h-full w-full flex-col gap-6 overflow-y-auto rounded-lg bg-card p-8 overscroll-contain">
    <p class="caption">Aba de analises</p>
    <h2 class="text-h2 leading-[1.1]">Graficos</h2>
    <p class="max-w-[60ch] text-small text-forest-700">
      Aqui temos os componentes de graficos disponiveis atualmente. Eles sao otimos para mostrar tendências e comparaçõoes de dados de forma visual e intuitiva.
    </p>

    <div class="rounded-md bg-card">
      <div class="grid auto-rows-fr grid-cols-4 gap-6 max-[1100px]:grid-cols-1">
        <div class="col-span-2 flex h-full flex-col gap-3">
          <div class="relative flex h-90 items-center justify-center rounded-lg bg-[#121212] p-4">
            <CategoryBarChart :data="incomeSeries" />
          </div>
          <div class="flex items-center justify-between px-1">
            <p class="font-display text-small font-medium tracking-[0.06em] text-forest-600">
              Category Bar Chart
            </p>
            <div class="flex items-center gap-3">
              <p class="font-body text-small font-medium text-forest-500">
                Views: {{ categoryChartCodeViews }}
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

        <div class="col-span-2 flex h-full flex-col gap-3">
          <div class="relative flex h-90 items-center justify-center rounded-lg bg-[#121212] p-4">
            <StockTrendChart :data="marketTrendSeries" />
          </div>
          <div class="flex items-center justify-between px-1">
            <p class="font-display text-small font-medium tracking-[0.06em] text-forest-600">
              Stock Trend Chart
            </p>
            <div class="flex items-center gap-3">
              <p class="font-body text-small font-medium text-forest-500">
                Views: {{ trendChartCodeViews }}
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
