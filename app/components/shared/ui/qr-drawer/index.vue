<script setup lang="ts">
import type { Level } from 'qrcode.vue'
import QrcodeVue from 'qrcode.vue'

interface Props {
  url: string
  title: string
  description?: string
  size?: number
  level?: Level
  foreground?: string
  background?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 148,
  level: 'M',
  foreground: '#ffffff',
  background: 'transparent',
})
</script>

<template>
    <container-modal-drawer
        drawer-hide-footer
    >
        <template #trigger>
            <slot name="trigger" />
        </template>

        <template #default>
            <div class="flex flex-col gap-5">
                <shared-ui-media-frame class="flex h-[180px] items-center justify-center p-4">
                    <ClientOnly>
                        <QrcodeVue
                            :value="url"
                            :size="props.size"
                            :level="props.level"
                            render-as="svg"
                            :foreground="props.foreground"
                            :background="props.background"
                        />
                    </ClientOnly>
                </shared-ui-media-frame>

                <div class="flex flex-col gap-2 text-left">
                    <h3 class="text-2xl font-semibold text-accent-foreground">
                        {{ title }}
                    </h3>
                    <p
                        v-if="description"
                        class="text-base text-muted-foreground"
                    >
                        {{ description }}
                    </p>
                </div>
            </div>
        </template>
    </container-modal-drawer>
</template>
