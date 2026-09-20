<script lang="ts" setup>
import { Toaster as Sonner, type ToasterProps } from 'vue-sonner'

const props = withDefaults(defineProps<ToasterProps>(), {
  position: 'top-center',
})

const customToastOptions: ToasterProps['toastOptions'] = {
  classes: {
      toast: '!bg-[var(--popover)] !text-[var(--popover-foreground)] !border-[var(--border)] shadow-lg',
  },
}
</script>

<template>
    <Teleport to="body">
        <Sonner
            class="toaster group z-[10000]"
            v-bind="props"
            :toast-options="customToastOptions"
            :style="{
                '--normal-bg': 'var(--popover)',
                '--normal-text': 'var(--popover-foreground)',
                zIndex: 10000,
            }"
        />
    </Teleport>
</template>
