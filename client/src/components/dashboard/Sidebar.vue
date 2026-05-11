<script setup>
import { ChevronsLeft, ChevronsRight, Moon, Sun } from 'lucide-vue-next'
import { onMounted, ref, watch } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

defineOptions({
  name: 'DashboardSidebar',
})

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  activeItem: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['select'])
const SIDEBAR_STORAGE_KEY = 'sb:dashboard-sidebar-collapsed'
const isCollapsed = ref(false)
const isDark = useDark({
  storageKey: 'sb:dashboard-theme',
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
})
const toggleDark = useToggle(isDark)

function handleSelect(itemId) {
  emit('select', itemId)
}

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
}

function toggleTheme() {
  toggleDark()
}

onMounted(() => {
  const savedValue = localStorage.getItem(SIDEBAR_STORAGE_KEY)
  if (savedValue !== null) {
    isCollapsed.value = savedValue === 'true'
  }
})

watch(isCollapsed, (value) => {
  localStorage.setItem(SIDEBAR_STORAGE_KEY, String(value))
})
</script>

<template>
  <aside
    class="sidebar flex min-h-screen shrink-0 self-start overflow-hidden flex-col bg-surface text-forest-900"
    :class="{ collapsed: isCollapsed }"
  >
    <div class="brand-row flex items-end justify-between gap-2" :class="{ 'flex-col items-center': isCollapsed }">
      <div class="brand-text flex flex-col gap-1">
        <p class="brand-overline text-caption uppercase tracking-[0.04em] text-forest-600">Painel</p>
        <h2 class="font-display text-[clamp(22px,2vw,30px)] leading-none text-forest-900">
          {{ isCollapsed ? 'SB' : 'SandBox' }}
        </h2>
      </div>

      <button
        type="button"
        class="inline-flex flex-none items-center gap-2 self-end rounded-sm border border-transparent bg-transparent p-2.5 text-left font-display text-small text-forest-700 transition-all duration-200 ease-out hover:bg-[color-mix(in_srgb,var(--forest-200)_60%,transparent)] hover:text-forest-900"
        :class="{ 'w-full self-center justify-center': isCollapsed }"
        :aria-label="isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'"
        @click="toggleSidebar"
      >
        <component :is="isCollapsed ? ChevronsRight : ChevronsLeft" :size="18" :stroke-width="1.8" />
      </button>
    </div>

    <nav class="menu flex flex-col gap-2" aria-label="Navegacao do dashboard">
      <button
        v-for="item in props.items"
        :key="item.id"
        type="button"
        class="menu-item inline-flex items-center gap-2 rounded-sm border border-transparent bg-transparent px-4 py-2.5 text-left font-display text-small text-forest-700 transition-all duration-200 ease-out hover:bg-[color-mix(in_srgb,var(--forest-200)_60%,transparent)] hover:text-forest-900"
        :class="{
          'justify-center': isCollapsed,
          'menu-item-active': item.id === props.activeItem,
        }"
        :style="item.id === props.activeItem ? { backgroundColor: 'var(--color-accent)' } : undefined"
        @click="handleSelect(item.id)"
      >
        <component :is="item.icon" :size="18" :stroke-width="1.8" />
        <span class="menu-label" :class="{ hidden: isCollapsed }">{{ item.label }}</span>
      </button>
    </nav>

    <div class="mt-auto">
      <button
        type="button"
        class="menu-item inline-flex w-full items-center gap-2 rounded-sm border border-transparent bg-transparent px-4 py-2.5 text-left font-display text-small text-forest-700 transition-all duration-200 ease-out hover:bg-[color-mix(in_srgb,var(--forest-200)_60%,transparent)] hover:text-forest-900"
        :class="{ 'justify-center': isCollapsed }"
        :aria-label="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
        @click="toggleTheme"
      >
        <component :is="isDark ? Sun : Moon" :size="18" :stroke-width="1.8" />
        <span class="menu-label" :class="{ hidden: isCollapsed }">{{ isDark ? 'Modo claro' : 'Modo escuro' }}</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  padding: 48px 24px;
  gap: 48px;
  transition: width 220ms ease, padding 220ms ease;
}

.sidebar.collapsed {
  width: 64px;
  padding: 48px 12px;
  margin-left: 8px;
}

.brand-overline {
  transition: opacity 160ms ease, transform 160ms ease;
}

.menu-label {
  transition: opacity 160ms ease, transform 160ms ease;
}

.menu-label.hidden {
  opacity: 0;
  transform: translateX(-4px);
  width: 0;
  overflow: hidden;
}

.sidebar.collapsed .brand-row {
  align-items: center;
}

.sidebar.collapsed .brand-text {
  align-items: center;
}

.sidebar.collapsed .brand-overline {
  opacity: 0;
  transform: translateY(-2px);
  height: 0;
  overflow: hidden;
}

.sidebar.collapsed .menu-item {
  padding-left: 0;
  padding-right: 0;
}

.menu-item-active {
  color: var(--color-accent-contrast);
}

@media (max-width: 960px) {
  .sidebar {
    width: 100%;
    min-height: auto;
    padding: 24px;
  }

  .sidebar.collapsed {
    width: 64px;
    padding: 24px 8px;
  }
}
</style>
