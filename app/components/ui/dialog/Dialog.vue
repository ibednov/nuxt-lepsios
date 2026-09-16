<script setup lang="ts">
import { DialogRoot as RekaDialogRoot, type DialogRootEmits, type DialogRootProps, useForwardPropsEmits } from 'reka-ui'

const props = defineProps<DialogRootProps>()
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
    <RekaDialogRoot
        data-slot="dialog"
        v-bind="forwarded"
    >
        <slot />
    </RekaDialogRoot>
</template>
