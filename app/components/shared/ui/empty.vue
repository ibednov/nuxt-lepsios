<script setup lang='ts'>
interface ComponentProps {
    titleText?: string
    descriptionText?: string
    buttonText?: string
}

defineProps<ComponentProps>()

const emit = defineEmits(['buttonClick'])

const buttonClick = () => {
    emit('buttonClick')
}
</script>

<template>
    <div
        class="text-center min-h-96 border rounded-xl p-6 flex flex-col gap-8 items-center justify-center"
    >
        <div class="flex flex-col gap-3">
            <h2 class="text-2xl font-semibold">
                {{ titleText }}
            </h2>
            <p class="text-muted-foreground">
                {{ descriptionText }}
            </p>
        </div>
        <Button
            @click="buttonClick"
        >
            {{ buttonText }}
        </Button>
    </div>
</template>
