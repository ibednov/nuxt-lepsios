<template>
    <div class="flex flex-col gap-4">
        <shared-layout-header>
            <template #left>
                <slot name="header-left" />
            </template>
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
