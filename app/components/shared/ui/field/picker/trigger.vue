<script setup lang="ts">
defineProps<{
  value?: string
  placeholder?: string
  drawerTitle?: string
}>()
</script>

<template>
    <container-modal-drawer :title="drawerTitle">
        <template #trigger>
            <button
                type="button"
                class="flex h-12 w-full items-center justify-between gap-3 rounded-full bg-accent-foreground/10 px-4 text-left transition-colors hover:bg-accent-foreground/5"
            >
                <span
                    class="truncate text-base"
                    :class="value ? 'text-accent-foreground' : 'text-muted-foreground'"
                >
                    {{ value || placeholder }}
                </span>
                <Icon
                    name="f7:chevron-right"
                    size="14"
                    class="shrink-0 opacity-70"
                />
            </button>
        </template>

        <template #default="{ close }">
            <slot :close="close" />
        </template>
    </container-modal-drawer>
</template>
