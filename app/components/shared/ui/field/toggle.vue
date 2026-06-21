<script setup lang="ts">
defineProps<{
  title: string
  hint?: string
  disabled?: boolean
}>()

const modelValue = defineModel<boolean>({ default: false })
</script>

<template>
    <div
        class="flex items-center justify-between gap-3 px-4 py-4"
        :class="{ 'opacity-50': disabled }"
        @click="modelValue = !modelValue"
    >
        <div class="flex min-w-0 items-center gap-3">
            <slot name="icon" />
            <div class="min-w-0 text-left">
                <div class="font-medium text-accent-foreground">
                    {{ title }}
                </div>
                <div
                    v-if="hint"
                    class="text-sm text-muted-foreground"
                >
                    {{ hint }}
                </div>
            </div>
        </div>
        <Switch
            v-model="modelValue"
            :disabled="disabled"
            @click.stop
        />
    </div>
</template>
