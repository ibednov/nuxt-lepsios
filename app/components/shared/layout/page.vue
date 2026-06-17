<script setup lang='ts'>
    //
</script>

<template>
   <div class="flex flex-col gap-4">
    <shared-layout-header>
        <slot name="header" />
    </shared-layout-header>
    <shared-layout-container>
        <slot />
    </shared-layout-container>
   </div>
</template>
