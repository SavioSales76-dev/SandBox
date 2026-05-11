<script setup>
import { ChevronsLeft, ChevronsRight } from 'lucide-vue-next'
import { ref } from 'vue'

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
const isCollapsed = ref(false)

function handleSelect(itemId) {
  emit('select', itemId)
}

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <aside class="sidebar" :class="{ collapsed: isCollapsed }">
    <div class="brand-row">
      <div class="brand">
        <p v-show="!isCollapsed" class="brand-overline">Painél</p>
        <h2 class="brand-title">{{ isCollapsed ? 'SB' : 'SandBox' }}</h2>
      </div>

      <button
        type="button"
        class="menu-item collapse-btn"
        :aria-label="isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'"
        @click="toggleSidebar"
      >
        <component :is="isCollapsed ? ChevronsRight : ChevronsLeft" :size="16" :stroke-width="1.8" />
      </button>
    </div>

    <nav class="menu" aria-label="Navegacao do dashboard">
      <button
        v-for="item in props.items"
        :key="item.id"
        type="button"
        class="menu-item"
        :class="{ active: item.id === props.activeItem }"
        @click="handleSelect(item.id)"
      >
        <component :is="item.icon" :size="16" :stroke-width="1.8" />
        <span v-show="!isCollapsed">{{ item.label }}</span>
      </button>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--sp-6);
  width: 260px;
  min-height: 100vh;
  padding: var(--sp-6) var(--sp-4);
  background: var(--color-surface);
  color: var(--forest-900);
  transition: width 220ms ease, padding 220ms ease;
  will-change: width, padding;
  contain: layout paint;
}

.sidebar.collapsed {
  width: 64px;
  padding: var(--sp-6) var(--sp-2);
}

.brand-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--sp-2);
}

.sidebar.collapsed .brand-row {
  flex-direction: column;
  align-items: center;
}

.brand {
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
  transition: opacity 180ms ease, transform 180ms ease;
}

.sidebar.collapsed .brand {
  opacity: 1;
  transform: none;
}

.brand-overline {
  font-family: var(--font-body);
  font-size: var(--text-caption);
  color: var(--forest-600);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.brand-title {
  font-size: clamp(22px, 2vw, 30px);
  color: var(--forest-900);
  font-family: var(--font-display);
  line-height: 1;
}

.sidebar.collapsed .brand-title {
  font-size: 20px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.menu-item {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--forest-700);
  font-family: var(--font-display);
  font-size: var(--text-small);
  text-align: left;
  padding: 10px var(--sp-3);
  cursor: pointer;
  transition: background-color 180ms ease, color 180ms ease, transform 180ms ease;
  will-change: transform, opacity;
}

.menu-item:hover {
  border-color: transparent;
  background: color-mix(in srgb, var(--forest-200) 60%, transparent);
  color: var(--forest-900);
}

.menu-item.active {
  border-color: transparent;
  background: var(--color-accent);
  color: var(--forest-900);
}

.menu-item span {
  transition: opacity 140ms ease, transform 140ms ease;
}

.sidebar.collapsed .menu-item {
  justify-content: center;
  padding-inline: 0;
}

.sidebar.collapsed .menu-item span {
  opacity: 0;
  transform: translateX(-4px);
}

.collapse-btn {
  margin-bottom: 0;
  padding: 10px;
  flex: 0 0 auto;
  align-self: flex-end;
}

.sidebar.collapsed .collapse-btn {
  width: 100%;
  align-self: center;
}

@media (max-width: 960px) {
  .sidebar {
    width: 100%;
    min-height: auto;
    padding: var(--sp-4);
  }

  .sidebar.collapsed {
    width: 100%;
    padding: var(--sp-4);
  }
}
</style>
