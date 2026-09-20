<script setup lang="ts">
withDefaults(defineProps<{ headerVariant?: 'default' | 'cosy' }>(), { headerVariant: 'default' })
</script>

<template>
    <div class="flex flex-col gap-4">
        <shared-layout-header :variant="headerVariant">
            <template #left>
                <slot name="header-left" />
            </template>
            <slot name="header" />
            <template
                v-if="$slots.subtitle"
                #subtitle
            >
                <slot name="subtitle" />
            </template>
            <template #right>
                <slot name="header-right" />
            </template>
        </shared-layout-header>
        <shared-layout-container>
            <slot />
        </shared-layout-container>
    </div>
</template>
