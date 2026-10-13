<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/dropdown-menu/DropdownMenuSub; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import {
  DropdownMenuSub,
  type DropdownMenuSubEmits,
  type DropdownMenuSubProps,
  useForwardPropsEmits,
} from 'reka-ui'

const props = defineProps<DropdownMenuSubProps>()
const emits = defineEmits<DropdownMenuSubEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
    <DropdownMenuSub
        data-slot="dropdown-menu-sub"
        v-bind="forwarded"
    >
        <slot />
    </DropdownMenuSub>
</template>
