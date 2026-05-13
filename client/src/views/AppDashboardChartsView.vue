<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import CategoryBarChart from '@/components/dashboard/CategoryBarChart.vue'
import ComponentCell from '@/components/dashboard/ComponentCell.vue'
import StockTrendChart from '@/components/dashboard/StockTrendChart.vue'

const router = useRouter()
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

function openComponentCode(componentId) {
  if (componentId === 'category-bar-chart') {
    categoryChartCodeViews.value += 1
  }

  if (componentId === 'stock-trend-chart') {
    trendChartCodeViews.value += 1
  }

  router.push({
    name: 'app-dashboard-component-code',
    params: { componentId },
    query: { from: 'app-dashboard-charts' },
  })
}
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
        <ComponentCell
          class="col-span-2"
          title="Category Bar Chart"
          :views="categoryChartCodeViews"
          preview-class="h-90"
          @get-code="openComponentCode('category-bar-chart')"
        >
          <template #default>
            <CategoryBarChart :data="incomeSeries" />
          </template>
        </ComponentCell>

        <ComponentCell
          class="col-span-2"
          title="Stock Trend Chart"
          :views="trendChartCodeViews"
          preview-class="h-90"
          @get-code="openComponentCode('stock-trend-chart')"
        >
          <template #default>
            <StockTrendChart :data="marketTrendSeries" />
          </template>
        </ComponentCell>
      </div>
    </div>
  </section>
</template>
