<script setup lang="ts">
import type { ButtonVariants } from '~/components/ui/button'

interface Props {
  title: string
  description?: string
  confirmText: string
  cancelText: string
  confirmVariant?: ButtonVariants['variant']
  drawerHideFooter?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  confirmVariant: 'default',
  drawerHideFooter: true,
})

const emit = defineEmits<{
  confirm: []
}>()

const handleConfirm = (close: () => void) => {
  close()
  emit('confirm')
}
</script>

<template>
    <container-modal-drawer
        :title="title"
        :description="description"
        :drawer-hide-footer="drawerHideFooter"
    >
        <template #trigger>
            <slot name="trigger" />
        </template>

        <template #default="{ close }">
            <div class="flex flex-col gap-3">
                <Button
                    :variant="confirmVariant"
                    size="big"
                    class="w-full"
                    @click="handleConfirm(close)"
                >
                    {{ confirmText }}
                </Button>

                <button
                    type="button"
                    class="py-2 text-center text-base"
                    @click="close"
                >
                    {{ cancelText }}
                </button>
            </div>
        </template>
    </container-modal-drawer>
</template>
