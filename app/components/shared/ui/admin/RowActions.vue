<script setup lang="ts">
interface ActionItem {
  id: string
  label: string
  icon?: string
  disabled?: boolean
  destructive?: boolean
}

defineProps<{
  items: ActionItem[]
  label: string
}>()

const emit = defineEmits<{ select: [id: string] }>()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" :aria-label="label" :title="label">
        <Icon name="lucide:ellipsis" class="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="min-w-48">
      <DropdownMenuItem
        v-for="item in items"
        :key="item.id"
        :disabled="item.disabled"
        :variant="item.destructive ? 'destructive' : 'default'"
        @select="emit('select', item.id)"
      >
        <Icon v-if="item.icon" :name="item.icon" class="size-4" />
        {{ item.label }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
