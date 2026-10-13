<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/field/FieldContent; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="field-content"
    :class="cn(
      'group/field-content flex flex-1 flex-col gap-1.5 leading-snug',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
