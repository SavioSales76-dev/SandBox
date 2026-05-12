<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Activity, AppWindow, Command, PanelsLeftBottom } from 'lucide-vue-next'

import Sidebar from '@/components/dashboard/Sidebar.vue'

defineOptions({
  name: 'AppDashboardView',
})

const router = useRouter()
const route = useRoute()

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: AppWindow, routeName: 'app-dashboard-home' },
  { id: 'charts', label: 'Graficos', icon: Activity, routeName: 'app-dashboard-charts' },
  { id: 'cards', label: 'Cards', icon: PanelsLeftBottom, routeName: 'app-dashboard-cards' },
  { id: 'buttons', label: 'Buttons', icon: Command, routeName: 'app-dashboard-buttons' },
]

const activeItem = computed(() => {
  const current = menuItems.find((item) => item.routeName === route.name)
  return current?.id || 'dashboard'
})

function handleSelect(itemId) {
  const selected = menuItems.find((item) => item.id === itemId)
  if (selected) {
    router.push({ name: selected.routeName })
  }
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-surface max-[960px]:flex-col">
    <Sidebar :items="menuItems" :active-item="activeItem" @select="handleSelect" />

    <main class="flex min-h-0 flex-1 items-stretch overflow-hidden p-6 max-[960px]:w-full">
      <RouterView />
    </main>
  </div>
</template>
