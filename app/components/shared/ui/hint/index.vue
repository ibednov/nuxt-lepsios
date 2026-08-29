<script setup lang="ts">
withDefaults(defineProps<{
  text?: string
  icon?: string
}>(), {
  text: undefined,
  icon: 'solar:info-circle-bold',
})
</script>

<template>
    <div class="flex items-start gap-2 rounded-2xl bg-lepsios-field p-3">
        <Icon
            :name="icon"
            class="size-5 shrink-0 text-muted-foreground"
        />
        <p class="text-sm leading-snug text-muted-foreground">
            <slot>{{ text }}</slot>
        </p>
    </div>
</template>
