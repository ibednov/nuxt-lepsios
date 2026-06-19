<template>
    <div class="bg-lepsios-background p-4 rounded-b-xl flex justify-between items-center">
        <div class=" text-2xl font-semibold">
            <slot />
        </div>

        <div class="flex items-center gap-2">
            <slot name="right" />
        </div>
    </div>
</template>
