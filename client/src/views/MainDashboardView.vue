<script setup>
import { ref } from 'vue'
import { LayoutDashboard, SquareMousePointer } from 'lucide-vue-next'

import KpiCard from '@/components/dashboard/KpiCard.vue'
import Sidebar from '@/components/dashboard/Sidebar.vue'

const menuItems = [
  { id: 'dashboard', label: 'Dasboard', icon: LayoutDashboard },
  { id: 'buttons', label: 'Buttons', icon: SquareMousePointer },
]

const kpiItems = [
  { id: 'buttons', label: 'Buttons', value: 0 },
  { id: 'cards', label: 'Cards', value: 0, isAccent: true },
  { id: 'sections', label: 'Sections', value: 0 },
  { id: 'kpi-cards', label: 'KPI Cards', value: 4 },
]

const activeTab = ref('dashboard')
</script>

<template>
  <div class="dashboard-layout">
    <Sidebar :items="menuItems" :active-item="activeTab" @select="activeTab = $event" />

    <main class="dashboard-main">
      <section v-if="activeTab === 'dashboard'" class="hero-card">
        <p class="caption">Aba inicial</p>
        <h1>Visao geral</h1>
        <p class="hero-text">
          Esta e a area inicial do painel. Aqui vamos concentrar os cards e indicadores
          principais do projeto.
        </p>

        <div class="kpi-grid">
          <KpiCard
            v-for="item in kpiItems"
            :key="item.id"
            :label="item.label"
            :value="item.value"
            :is-accent="item.isAccent"
          />
        </div>
      </section>

      <section v-else class="placeholder-card">
        <h3>Em breve</h3>
        <p>A aba Buttons sera implementada na sequencia.</p>
      </section>
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  height: 100vh;
  display: flex;
  background: var(--color-surface);
  overflow: hidden;
}

.dashboard-main {
  flex: 1;
  padding: var(--sp-4);
  display: flex;
  align-items: stretch;
  min-height: 0;
  overflow: hidden;
}

.hero-card,
.placeholder-card {
  width: 100%;
  height: 100%;
  background: #fff;
  border: none;
  border-radius: var(--radius-lg);
  padding: var(--sp-5);
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
  overflow-y: auto;
  overscroll-behavior: contain;
}

.hero-card h1 {
  font-size: var(--text-h1);
  line-height: 1.05;
}

.hero-text {
  max-width: 60ch;
  color: var(--forest-700);
  font-size: var(--text-small);
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--sp-3);
}

@media (max-width: 960px) {
  .dashboard-layout {
    height: auto;
    min-height: 100vh;
    flex-direction: column;
    overflow: visible;
  }

  .dashboard-main {
    padding: var(--sp-4);
    overflow: visible;
  }

  .hero-card h1 {
    font-size: var(--text-h1);
  }

  .kpi-grid {
    grid-template-columns: 1fr;
  }
}
</style>
