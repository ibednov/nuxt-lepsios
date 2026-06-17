<script setup lang='ts'>
//
</script>

<template>
    <div class="flex flex-col gap-4">
        <shared-layout-header>
            <slot name="header" />
            <template #right>
                <slot name="header-right" />
            </template>
        </shared-layout-header>
        <shared-layout-container>
            <slot />
        </shared-layout-container>
    </div>
</template>
