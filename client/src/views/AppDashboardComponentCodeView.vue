<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getComponentCodeEntry } from '@/constants/componentCodeRegistry'

defineOptions({
  name: 'AppDashboardComponentCodeView',
})

const route = useRoute()
const router = useRouter()

const componentEntry = computed(() => getComponentCodeEntry(route.params.componentId))

const title = computed(() => componentEntry.value?.title || 'Componente nao encontrado')
const usageTemplateCode = computed(() => componentEntry.value?.usageTemplateCode || '')
const usageScriptCode = computed(() => componentEntry.value?.usageScriptCode || '')
const creationCode = computed(() => componentEntry.value?.creationCode || '')
const hasComponent = computed(() => Boolean(componentEntry.value))
const isCreationCodeExpanded = ref(false)
const copiedKey = ref('')
const usageCombinedCode = computed(() => {
  return `<template>\n  ${usageTemplateCode.value}\n</template>\n\n<script>\n  ${usageScriptCode.value}\n<\/script>`
})

function goBack() {
  const from = route.query.from
  if (typeof from === 'string' && from.length > 0) {
    router.push({ name: from })
    return
  }

  router.push({ name: 'app-dashboard-home' })
}

function toggleCreationCode() {
  isCreationCodeExpanded.value = !isCreationCodeExpanded.value
}

async function copyCode(value, key) {
  const rawValue = typeof value === 'object' && value !== null && 'value' in value ? value.value : value
  const textToCopy = typeof rawValue === 'string' ? rawValue : String(rawValue ?? '')

  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(textToCopy)
    }
    else {
      const textarea = document.createElement('textarea')
      textarea.value = textToCopy
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }

    copiedKey.value = key
    setTimeout(() => {
      if (copiedKey.value === key) {
        copiedKey.value = ''
      }
    }, 1500)
  }
  catch {
    copiedKey.value = ''
  }
}
</script>

<template>
  <section class="tab-content-scroll flex h-full w-full flex-col gap-6 overflow-y-auto rounded-lg bg-card p-8 overscroll-contain">
    <div class="flex items-center justify-between gap-4">
      <div class="flex flex-col gap-2">
        <p class="caption">Design system</p>
        <h2 class="text-h2 leading-[1.1]">{{ title }}</h2>
      </div>
      <button
        type="button"
        class="inline-flex items-center rounded-full border-2 border-forest-300 px-4 py-1.5 font-display text-caption font-medium tracking-[0.06em] text-forest-700 transition-colors hover:border-forest-500 hover:text-forest-900"
        @click="goBack"
      >
        Voltar
      </button>
    </div>

    <p class="max-w-[70ch] text-small text-forest-700">
      Base unica para exibicao do codigo-fonte dos componentes.
    </p>

    <div class="code-shell flex flex-col gap-4 rounded-lg p-4">
      <template v-if="hasComponent">
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between gap-3">
            <p class="code-label font-display text-small font-medium tracking-[0.06em]">
              Chamada do componente
            </p>
            <button
              type="button"
              class="code-button inline-flex items-center rounded-full border px-3 py-1 font-display text-caption font-medium tracking-[0.06em] transition-colors"
              @click="copyCode(usageCombinedCode, 'usage')"
            >
              {{ copiedKey === 'usage' ? 'Copiado' : 'Copiar codigo' }}
            </button>
          </div>
          <pre class="code-block tab-content-scroll overflow-x-auto rounded-md p-4"><code class="code-text font-body text-small leading-6">{{ usageCombinedCode }}</code></pre>
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between gap-3">
            <p class="code-label font-display text-small font-medium tracking-[0.06em]">
              Codigo de criacao
            </p>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="code-button inline-flex items-center rounded-full border px-3 py-1 font-display text-caption font-medium tracking-[0.06em] transition-colors"
                @click="toggleCreationCode"
              >
                {{ isCreationCodeExpanded ? 'Recolher codigo' : 'Ver todo o codigo' }}
              </button>
              <button
                type="button"
                class="code-button inline-flex items-center rounded-full border px-3 py-1 font-display text-caption font-medium tracking-[0.06em] transition-colors"
                @click="copyCode(creationCode, 'creation')"
              >
                {{ copiedKey === 'creation' ? 'Copiado' : 'Copiar codigo' }}
              </button>
            </div>
          </div>
          <pre
            class="code-block creation-code-scroll overflow-x-auto overflow-y-hidden rounded-md p-4"
            :class="isCreationCodeExpanded ? '' : 'max-h-100'"
          ><code class="code-text font-body text-small leading-6">{{ creationCode }}</code></pre>
        </div>
      </template>
      <template v-else>
        <p class="font-body text-small text-forest-100">
          O componente solicitado nao esta registrado.
        </p>
      </template>
    </div>
  </section>
</template>

<style scoped>
.code-shell {
  background-color: var(--color-surface);
}

.code-label {
  color: var(--forest-700);
}

.code-block {
  background-color: var(--color-card);
}

.code-text {
  color: var(--forest-700);
}

.code-button {
  border-color: var(--forest-300);
  color: var(--forest-700);
}

.code-button:hover {
  border-color: var(--forest-500);
  color: var(--forest-900);
}

.creation-code-scroll {
  scrollbar-width: thin;
  scrollbar-color: color-mix(in srgb, var(--forest-300) 70%, transparent) transparent;
}

.creation-code-scroll::-webkit-scrollbar {
  height: 5px;
}

.creation-code-scroll::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--forest-300) 70%, transparent);
  border-radius: 9999px;
}

:global(html.dark) .code-shell {
  background-color: var(--color-surface);
}

:global(html.dark) .code-label {
  color: #f1f5f9;
}

:global(html.dark) .code-block {
  background-color: #0b0b0b;
}

:global(html.dark) .code-text {
  color: #e5e7eb;
}

:global(html.dark) .code-button {
  border-color: rgba(255, 255, 255, 0.45);
  color: #f8fafc;
}

:global(html.dark) .code-button:hover {
  border-color: #ffffff;
  color: #ffffff;
}

:global(html.dark) .creation-code-scroll {
  scrollbar-color: rgba(255, 255, 255, 0.55) transparent;
}

:global(html.dark) .creation-code-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.55);
}
</style>
