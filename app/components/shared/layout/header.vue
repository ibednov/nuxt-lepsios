<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'default' | 'cosy' }>(), { variant: 'default' })
</script>

<template>
    <div :class="variant === 'cosy'
        ? 'sticky top-0 z-40 mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 rounded-b-2xl bg-[#fffaf7]/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8'
        : 'sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 rounded-b-xl bg-lepsios-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-lepsios-background/80'">
        <div
            v-if="$slots.left"
            class="flex min-w-0 items-center justify-self-start"
        >
            <slot name="left" />
        </div>
        <div
            v-else
            class="min-w-0"
            aria-hidden="true"
        />

        <div class="flex h-full min-w-0 max-w-full flex-col items-center justify-center overflow-hidden text-center">
            <div class="flex max-w-full min-w-0 items-center justify-center gap-2 overflow-hidden text-2xl font-semibold">
                <slot />
            </div>
            <div
                v-if="$slots.subtitle"
                class="w-full min-w-0 truncate text-sm font-normal text-muted-foreground"
            >
                <slot name="subtitle" />
            </div>
        </div>

        <div
            v-if="$slots.right"
            class="flex min-w-0 items-center justify-end justify-self-end gap-2"
        >
            <slot name="right" />
        </div>
        <div
            v-else
            class="min-w-0"
            aria-hidden="true"
        />
    </div>
</template>
