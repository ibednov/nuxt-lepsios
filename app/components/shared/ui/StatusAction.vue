<script setup lang="ts">
import { Button } from '~/components/ui/button'
import { ButtonGroup } from '~/components/ui/button-group'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

export interface StatusActionOption {
  value: string
  label: string
  actionLabel?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  modelValue: string
  options: StatusActionOption[]
  disabled?: boolean
  menuLabel?: string
}>(), { disabled: false })

const emit = defineEmits<{
  'update:modelValue': [value: string]
  submit: [value: string]
}>()

const selected = computed(() => props.options.find(option => option.value === props.modelValue) ?? props.options[0])
</script>

<template>
  <ButtonGroup>
    <Button
      type="button"
      variant="outline"
      :disabled="disabled || !selected || selected.disabled"
      @click="selected && emit('submit', selected.value)"
    >
      {{ selected?.actionLabel ?? selected?.label }}
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button type="button" variant="outline" size="icon" :disabled="disabled" :aria-label="menuLabel">
          <Icon name="lucide:chevron-down" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            v-for="option in options"
            :key="option.value"
            :disabled="option.disabled"
            @select="emit('update:modelValue', option.value)"
          >
            {{ option.label }}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </ButtonGroup>
</template>
