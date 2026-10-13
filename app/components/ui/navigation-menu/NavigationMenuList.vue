<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/navigation-menu/NavigationMenuList; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import { NavigationMenuList, type NavigationMenuListProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<NavigationMenuListProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <NavigationMenuList
        data-slot="navigation-menu-list"
        v-bind="forwardedProps"
        :class="
            cn(
                'group flex flex-1 list-none items-center justify-center gap-1',
                props.class,
            )
        "
    >
        <slot />
    </NavigationMenuList>
</template>
