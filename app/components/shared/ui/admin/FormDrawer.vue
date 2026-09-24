<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}>(), {
  side: 'right',
})

const open = defineModel<boolean>('open', { default: false })
</script>

<template>
    <Sheet v-model:open="open">
        <SheetContent
            :side="side"
            class="flex w-full flex-col sm:max-w-xl"
        >
            <SheetHeader v-if="title || description || $slots.header">
                <slot name="header">
                    <SheetTitle v-if="title">
                        {{ title }}
                    </SheetTitle>
                    <SheetDescription v-if="description">
                        {{ description }}
                    </SheetDescription>
                </slot>
            </SheetHeader>
            <div class="min-h-0 flex-1 overflow-y-auto py-4">
                <slot />
            </div>
            <SheetFooter v-if="$slots.footer">
                <slot name="footer" />
            </SheetFooter>
        </SheetContent>
    </Sheet>
</template>
