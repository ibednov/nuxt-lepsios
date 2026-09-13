<template>
    <div class="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-b-xl bg-lepsios-background p-4">
        <div
            v-if="$slots.left"
            class="flex min-w-0 items-center justify-self-start"
        >
            <slot name="left" />
        </div>
        <div
            v-else
            class="min-w-0"
        />

        <div class="flex h-full w-full min-w-0 flex-col items-center justify-center overflow-hidden text-center">
            <div class="flex w-full min-w-0 max-w-full items-center justify-center gap-2 overflow-hidden text-2xl font-semibold">
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
        />
    </div>
</template>
