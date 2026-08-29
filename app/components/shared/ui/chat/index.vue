<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  subtitle?: string
  placeholder?: string
  emptyText?: string
  showSearch?: boolean
  showComposer?: boolean
}>(), {
  subtitle: undefined,
  placeholder: undefined,
  emptyText: undefined,
  showSearch: true,
  showComposer: true,
})

const emit = defineEmits<{
  back: []
  search: []
}>()
</script>

<template>
    <div class="flex h-dvh flex-col bg-background text-foreground">
        <header class="flex items-center gap-2 border-b border-border px-3 py-2">
            <Button
                variant="ghost"
                size="icon"
                class="text-muted-foreground hover:text-foreground"
                @click="emit('back')"
            >
                <Icon
                    name="lucide:chevron-left"
                    class="size-6"
                />
            </Button>

            <div class="flex min-w-0 flex-1 flex-col text-center">
                <span class="truncate text-base font-semibold text-foreground">
                    {{ title }}
                </span>
                <span
                    v-if="subtitle"
                    class="truncate text-xs text-muted-foreground"
                >
                    {{ subtitle }}
                </span>
            </div>

            <Button
                v-if="showSearch"
                variant="ghost"
                size="icon"
                class="text-muted-foreground hover:text-foreground"
                @click="emit('search')"
            >
                <Icon
                    name="lucide:search"
                    class="size-5"
                />
            </Button>
        </header>

        <div class="flex flex-1 flex-col overflow-y-auto">
            <slot>
                <div class="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                    <div class="flex h-14 w-14 items-center justify-center rounded-full bg-lepsios-field">
                        <Icon
                            name="lucide:message-circle"
                            class="size-6 text-muted-foreground"
                        />
                    </div>
                    <p
                        v-if="emptyText"
                        class="text-sm text-muted-foreground"
                    >
                        {{ emptyText }}
                    </p>
                </div>
            </slot>
        </div>

        <footer
            v-if="showComposer"
            class="flex items-center gap-2 border-t border-border px-3 py-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]"
        >
            <slot name="composer">
                <Button
                    variant="ghost"
                    size="icon"
                    class="text-muted-foreground"
                    disabled
                >
                    <Icon
                        name="lucide:paperclip"
                        class="size-5"
                    />
                </Button>

                <div class="flex h-10 flex-1 items-center rounded-full bg-lepsios-field px-4 text-sm text-muted-foreground">
                    {{ placeholder }}
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    class="text-muted-foreground"
                    disabled
                >
                    <Icon
                        name="lucide:mic"
                        class="size-5"
                    />
                </Button>
            </slot>
        </footer>
    </div>
</template>
