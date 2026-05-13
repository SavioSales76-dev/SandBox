<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import ComponentCell from '@/components/dashboard/ComponentCell.vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'

const router = useRouter()
const primaryButtonCodeViews = ref(0)

function openComponentCode() {
  primaryButtonCodeViews.value += 1
  router.push({
    name: 'app-dashboard-component-code',
    params: { componentId: 'primary-button' },
    query: { from: 'app-dashboard-buttons' },
  })
}
</script>

<template>
  <section class="tab-content-scroll flex h-full w-full flex-col gap-6 overflow-y-auto rounded-lg bg-card p-8 overscroll-contain">
    <p class="caption">Design system</p>
    <h2 class="text-h2 leading-[1.1]">Buttons</h2>
    <p class="max-w-[60ch] text-small text-forest-700">
      Botões são ferramentas cruciais para a interação do usuário. Ótimos para ações primárias e chamadas para ação, garantindo uma experiência fluida e intuitiva.
    </p>

    <div class="rounded-md bg-card">
      <div class="grid grid-cols-3 gap-6 max-[1100px]:grid-cols-2 max-[720px]:grid-cols-1">
        <ComponentCell title="Botao Primario" :views="primaryButtonCodeViews" @get-code="openComponentCode">
          <template #default>
            <PrimaryButton />
          </template>
        </ComponentCell>
      </div>
    </div>
  </section>
</template>
