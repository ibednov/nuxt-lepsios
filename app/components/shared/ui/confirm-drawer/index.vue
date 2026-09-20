<script setup lang="ts">
import type { ButtonVariants } from '~/components/ui/button'

interface Props {
  title: string
  description?: string
  confirmText: string
  cancelText: string
  confirmVariant?: ButtonVariants['variant']
  drawerHideFooter?: boolean
  surfaceClass?: string
}

withDefaults(defineProps<Props>(), {
  confirmVariant: 'default',
  drawerHideFooter: true,
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const isOpen = defineModel<boolean>('open', { default: false })

const handleConfirm = () => {
  isOpen.value = false
  emit('confirm')
}

const handleCancel = () => {
  isOpen.value = false
  emit('cancel')
}
</script>

<template>
    <container-modal-drawer
        v-model:open="isOpen"
        :title="title"
        :description="description"
        :drawer-hide-footer="drawerHideFooter"
        :surface-class="surfaceClass"
    >
        <template
            v-if="$slots.trigger"
            #trigger
        >
            <slot name="trigger" />
        </template>

        <template #default>
            <div class="flex flex-col gap-3">
                <Button
                    :variant="confirmVariant"
                    size="big"
                    text-align="center"
                    class="w-full"
                    @click="handleConfirm"
                >
                    {{ confirmText }}
                </Button>

                <button
                    type="button"
                    class="py-2 text-center text-base"
                    @click="handleCancel"
                >
                    {{ cancelText }}
                </button>
            </div>
        </template>
    </container-modal-drawer>
</template>
