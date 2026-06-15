<script lang="ts" setup>
import { Toaster as Sonner, type ToasterProps } from 'vue-sonner'

const props = withDefaults(defineProps<ToasterProps>(), {
  position: 'top-center',
})

const customToastOptions: ToasterProps['toastOptions'] = {
  classes: {
    toast: '!bg-white/30  !border-white/30 dark:!bg-black/30 dark:!text-white backdrop-blur-sm',
  },
}
</script>

<template>
    <Sonner
        class="toaster group"
        v-bind="props"
        :toast-options="customToastOptions"
        :style="{
            '--normal-bg': 'var(--popover)',
            '--normal-text': 'var(--popover-foreground)',
        }"
    />
</template>
