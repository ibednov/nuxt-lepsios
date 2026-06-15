<script setup lang='ts'>
interface ComponentProps {
  title?: string
  closePosition?: 'top-right' | 'button-full'
}

withDefaults(defineProps<ComponentProps>(), {
  closePosition: 'top-right',
})

const emit = defineEmits(['close'])

const { t } = useI18n()

const handleClose = () => {
  emit('close')
}

onMounted(() => {
  lockPageScroll()
})

onUnmounted(() => {
  unlockPageScroll()
})
</script>

<template>
    <teleport to="body">
        <div
            class="w-dvw h-dvh fixed top-0 left-0 z-50 bg-black/30 p-2 md:p-4"
        >
            <div
                class="w-full h-full bg-background/60 rounded-lg backdrop-blur-sm border border-white/10 relative  p-2 md:p-4 flex flex-col gap-3"
                :class="[
                    closePosition === 'button-full' ? '' : 'pt-7',
                ]"
            >
                <Button
                    v-if="closePosition === 'top-right'"
                    variant="secondary"
                    class="absolute top-3 right-4 p-2 rounded-xl w-12 h-12 flex items-center justify-center"
                    @click="handleClose"
                >
                    <Icon
                        name="lucide:x"
                        size="32"
                    />
                </Button>

                <div class="h-full overflow-y-auto">
                    <slot />
                </div>

                <Button
                    v-if="closePosition === 'button-full'"
                    variant="secondary"
                    class="w-full p-4 h-12 md:h-16"
                    @click="handleClose"
                >
                    <Icon
                        name="lucide:x"
                        size="32"
                    />
                    <div v-if="isMoreMdScreen">
                        {{ t('global.actions.close') }}
                    </div>
                </Button>
            </div>
        </div>
    </teleport>
</template>
