<script setup lang="ts">
interface Props {
  fullScreenBlur?: boolean
  absolute?: boolean
}

defineProps<Props>()
</script>

<template>
    <div
        v-if="fullScreenBlur"
        class="flex justify-center items-center h-full w-full bg-background/50 backdrop-blur-sm"
        :class="{ 'absolute top-0 left-0 right-0 bottom-0 z-10 w-full h-full scale-120': absolute }"
    >
        <shared-ui-loader />
    </div>

    <shared-ui-loader
        v-else
    />
</template>
