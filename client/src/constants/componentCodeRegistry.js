import categoryBarChartCode from '@/components/dashboard/CategoryBarChart.vue?raw'
import kpiCardCode from '@/components/dashboard/KpiCard.vue?raw'
import stockTrendChartCode from '@/components/dashboard/StockTrendChart.vue?raw'
import primaryButtonCode from '@/components/ui/PrimaryButton.vue?raw'

export const componentCodeRegistry = {
  'primary-button': {
    title: 'Botao Primario',
    usageTemplateCode: '<PrimaryButton />',
    usageScriptCode: "import PrimaryButton from '@/components/ui/PrimaryButton.vue'",
    creationCode: primaryButtonCode,
  },
  'kpi-card': {
    title: 'KPI Card',
    usageTemplateCode: '<KpiCard class="w-full max-w-90" label="KPI Card" :value="8" is-accent />',
    usageScriptCode: "import KpiCard from '@/components/dashboard/KpiCard.vue'",
    creationCode: kpiCardCode,
  },
  'category-bar-chart': {
    title: 'Category Bar Chart',
    usageTemplateCode: '<CategoryBarChart :data="incomeSeries" />',
    usageScriptCode: "import CategoryBarChart from '@/components/dashboard/CategoryBarChart.vue'",
    creationCode: categoryBarChartCode,
  },
  'stock-trend-chart': {
    title: 'Stock Trend Chart',
    usageTemplateCode: '<StockTrendChart :data="marketTrendSeries" />',
    usageScriptCode: "import StockTrendChart from '@/components/dashboard/StockTrendChart.vue'",
    creationCode: stockTrendChartCode,
  },
}

export function getComponentCodeEntry(componentId) {
  return componentCodeRegistry[componentId] || null
}
