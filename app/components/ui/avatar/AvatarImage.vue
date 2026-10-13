<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/avatar/AvatarImage; remove after Nuxt consumers migrate. -->
<script setup lang="ts">
import type { AvatarImageProps } from 'reka-ui'
import { AvatarImage } from 'reka-ui'

const props = defineProps<AvatarImageProps>()
</script>

<template>
    <AvatarImage
        data-slot="avatar-image"
        v-bind="props"
        class="aspect-square size-full"
    >
        <slot />
    </AvatarImage>
</template>
