<template>
    <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-b-xl bg-lepsios-background p-4">
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

        <div class="flex h-full min-w-0 items-center justify-center gap-2 text-center text-2xl font-semibold">
            <slot />
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
