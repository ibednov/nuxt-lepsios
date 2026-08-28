<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group'

export interface TogglerItem {
  value: string
  label?: string
  ariaLabel?: string
  iconActive?: string
  iconInactive?: string
  isActive: boolean
}

withDefaults(defineProps<{
  items: TogglerItem[]
  tooltipEnabled?: boolean
}>(), {
  tooltipEnabled: false,
})

const modelValue = defineModel<string>({ required: true })
</script>

<template>
  <ToggleGroup
    v-model="modelValue"
    type="single"
    class="flex items-center gap-2 rounded-full bg-background/40 p-1 backdrop-blur-sm"
  >
    <TooltipProvider>
      <Tooltip
        v-for="item in items"
        :key="item.value"
      >
        <TooltipTrigger as-child>
          <ToggleGroupItem
            :value="item.value"
            :aria-label="item.ariaLabel || item.label || item.value"
            variant="pill"
            class="flex items-center justify-center gap-2 rounded-full transition-all"
            :class="[item.isActive ? 'bg-foreground/10' : 'opacity-50']"
          >
            <Icon
              v-if="item.isActive && item.iconActive"
              :name="item.iconActive"
              size="20"
            />
            <Icon
              v-else-if="item.iconInactive || item.iconActive"
              :name="(item.iconInactive || item.iconActive)!"
              size="20"
            />
            <span v-else-if="item.label">{{ item.label }}</span>
          </ToggleGroupItem>
        </TooltipTrigger>
        <TooltipContent v-if="tooltipEnabled">
          <p>{{ item.label }}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </ToggleGroup>
</template>
