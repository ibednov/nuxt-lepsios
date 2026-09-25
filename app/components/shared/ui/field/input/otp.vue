<script setup lang="ts">
import { PinInput, PinInputGroup, PinInputInput } from '~/components/ui/pin-input'

interface Props {
  length?: number
  id?: string
  class?: string
  inputClass?: string
  autoFocus?: boolean
  fullWidth?: boolean
  placeholder?: string
  hasError?: boolean
  variant?: 'default' | 'filled'
}

const props = withDefaults(defineProps<Props>(), {
  length: 6,
  id: 'otp-input',
  class: '',
  inputClass: '',
  autoFocus: false,
  fullWidth: false,
  placeholder: '○',
  hasError: false,
  variant: 'default',
})

const emit = defineEmits<{
  complete: []
}>()

const modelValue = defineModel<string[] | null>('modelValue', { default: null })

const otpValue = computed({
  get: () => {
    if (!modelValue.value) {
      return Array.from({ length: props.length }).fill('')
    }
    // Убеждаемся, что массив имеет нужную длину
    const current = [...modelValue.value]
    while (current.length < props.length) {
      current.push('')
    }
    return current.slice(0, props.length)
  },
  set: (val: string[]) => {
    modelValue.value = val
  },
})

const handleComplete = () => {
  emit('complete')
}

const isFilled = computed(() => props.variant === 'filled')
</script>

<template>
    <PinInput
        :id="props.id"
        v-model="otpValue"
        :placeholder="props.placeholder"
        :class="[props.class, props.fullWidth || isFilled ? 'w-full' : '']"
        @complete="handleComplete"
    >
        <PinInputGroup :class="['gap-1', props.fullWidth || isFilled ? 'w-full' : '']">
            <template
                v-for="(_, index) in props.length"
                :key="index"
            >
                <PinInputInput
                    :autofocus="props.autoFocus && index === 0"
                    :class="[
                        'rounded-md border w-14 h-14 text-xl',
                        isFilled ? 'h-16 w-auto min-w-0 flex-1 rounded-none border-transparent bg-muted' : '',
                        props.inputClass,
                        props.hasError ? 'border-red-500' : '',
                    ]"
                    :index="index"
                />
            </template>
        </PinInputGroup>
    </PinInput>
</template>
