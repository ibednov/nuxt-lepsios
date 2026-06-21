<template>
    <div class="bg-lepsios-background p-4 rounded-b-xl flex justify-between items-center">
        <div v-if="$slots.left">
            <slot name="left" />
        </div>
        <div class="text-2xl font-semibold flex items-center gap-2 h-full">
            <slot />
        </div>
        <div
            v-if="$slots.right"
            class="flex items-center gap-2"
        >
            <slot name="right" />
        </div>
    </div>
</template>
