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

const primary = computed(() => props.options.find(option => option.value === 'family') ?? props.options[0])
const rest = computed(() => props.options.filter(option => option.value !== primary.value?.value))

const choose = (value: string) => {
  emit('update:modelValue', value)
  emit('submit', value)
}
</script>

<template>
  <ButtonGroup class="w-full">
    <Button
      type="button"
      variant="outline"
      class="min-w-0 flex-1"
      :disabled="disabled || !primary || primary.disabled"
      @click="primary && choose(primary.value)"
    >
      {{ primary?.actionLabel ?? primary?.label }}
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button type="button" variant="outline" size="icon" :disabled="disabled || !rest.length" :aria-label="menuLabel">
          <Icon name="lucide:chevron-down" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            v-for="option in rest"
            :key="option.value"
            :disabled="option.disabled"
            @select="choose(option.value)"
          >
            {{ option.label }}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </ButtonGroup>
</template>
