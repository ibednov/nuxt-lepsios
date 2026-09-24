<script setup lang="ts">
withDefaults(defineProps<{
  sidebarWidth?: string
  headerHeight?: string
}>(), {
  sidebarWidth: '16rem',
  headerHeight: '3.5rem',
})
</script>

<template>
    <SidebarProvider
        :style="{
            '--sidebar-width': sidebarWidth,
            '--header-height': headerHeight,
        }"
        class="admin-shell"
    >
        <slot name="sidebar" />
        <SidebarInset class="bg-background">
            <slot name="header" />
            <main class="flex flex-1 flex-col bg-background">
                <div class="@container/main flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
                    <slot />
                </div>
            </main>
        </SidebarInset>
    </SidebarProvider>
</template>

<style>
.admin-shell {
  --lepsios-two: var(--card);
  --color-lepsios-two: var(--card);
}

.admin-shell [data-slot='card'] {
  background-color: var(--card) !important;
  border: 1px solid var(--border) !important;
  box-shadow: none !important;
  border-radius: var(--radius-xl, 0.75rem);
}
</style>
