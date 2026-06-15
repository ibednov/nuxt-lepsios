<script setup lang="ts">
interface Props {
  title?: string
  isShowExpandButton?: boolean
}

defineProps<Props>()

const { t } = useI18n()

const isExpanded = ref(false)
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

const scrollRef = useTemplateRef<HTMLElement>('scrollRef')

const { x } = useScroll(scrollRef, { behavior: 'smooth' })
const { width } = useWindowSize()

const left = useDebounceFn(() => {
  x.value -= width.value - 100
}, 200)

const right = useDebounceFn(() => {
  x.value += width.value - 100
}, 200)
</script>

<template>
    <div
        class="flex flex-col gap-0 relative w-full"
    >
        <div
            class="flex flex-col md:flex-row justify-between items-center sticky top-0 bg-white/30 dark:bg-black/30 backdrop-blur-sm w-full py-2 z-5
        px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12
        gap-0
        "
        >
            <div
                v-if="title"
                class="text-xl font-semibold
                "
            >
                {{ title }}
            </div>

            <template v-if="isShowExpandButton">
                <div
                    v-auto-animate
                    class="flex gap-4 items-center  w-full md:w-auto"
                    :class="isExpanded ? 'justify-center' : 'justify-between'"
                >
                    <Button
                        variant="ghost"
                        @click="toggleExpanded"
                    >
                        {{ isExpanded ? t('shared.global.expand.collapse') : t('shared.global.expand.title') }}
                        <Icon
                            v-if="!isExpanded"
                            name="lucide:chevron-down"
                        />
                        <Icon
                            v-else
                            name="lucide:chevron-up"
                        />
                    </Button>
                    <div
                        v-if="!isExpanded"
                        class="flex flex-row gap-2 items-center"
                    >
                        <Button
                            variant="ghost"
                            class="rounded-full w-10 h-10 p-0"

                            @click="left"
                        >
                            <Icon
                                name="lucide:arrow-left"
                                size="20"
                            />
                        </Button>
                        <Button
                            variant="ghost"
                            class="rounded-full w-10 h-10 p-0"
                            @click="right"
                        >
                            <Icon
                                name="lucide:arrow-right"
                                size="20"
                            />
                        </Button>
                    </div>
                </div>
            </template>
        </div>
        <div
            v-auto-animate
            class="px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 max-w-[99%]"
        >
            <div
                v-if="isExpanded"
                class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 items-start gap-6"
            >
                <slot />
            </div>
            <div
                v-else
                ref="scrollRef"
                class="flex flex-row flex-nowrap overflow-x-auto items-start gap-6 "
            >
                <slot />
            </div>
        </div>
    </div>
</template>
