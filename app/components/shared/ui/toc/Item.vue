<script setup lang='ts'>
interface TocItem {
    id: string
    title: string
    level: number
    children?: TocItem[]
}

interface Props {
    item: TocItem
}

defineProps<Props>()

const emit = defineEmits<{
    click: [id: string]
}>()

const handleClick = (id: string) => {
    emit('click', id)
}

const getPaddingClass = (level: number) => {
    const paddingMap: Record<number, string> = {
        1: 'pl-0',
        2: 'pl-0',
        3: 'pl-2',
        4: 'pl-4',
        5: 'pl-6',
        6: 'pl-8',
    }
    return paddingMap[level] || 'pl-0'
}
</script>

<template>
    <ButtonGroup class="flex flex-col w-full max-w-full gap-0 !h-fit">
        <Button
            variant="link"
            class="text-sm justify-start text-left truncate w-full max-w-full h-fit py-1 text-primary/60 hover:text-primary"
            :class="getPaddingClass(item.level)"
            @click="handleClick(item.id)"
        >
            {{ item.title }}
        </Button>

        <template v-if="item.children && item.children.length > 0">
            <shared-ui-toc-item
                v-for="child in item.children"
                :key="child.id"
                :item="child"
                @click="handleClick"
            />
        </template>
    </ButtonGroup>
</template>
