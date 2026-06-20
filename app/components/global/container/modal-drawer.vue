<script setup lang='ts'>
interface Props {
  title?: string
  description?: string
  cancelButtonText?: string

  dialogClass?: string
  dialogContentClass?: string
  dialogContentHeaderClass?: string
  dialogContentSlotClass?: string

  drawerClass?: string
  drawerContentClass?: string
  drawerContentHeaderClass?: string
  drawerContentSlotClass?: string
  drawerContentFooterClass?: string
  drawerHideFooter?: boolean
  drawerFullscreen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  drawerHideFooter: false,
  drawerFullscreen: false,
})

const isOpen = defineModel<boolean>('open', { default: false })

const open = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

const drawerFullscreenClass = [
  'gap-0 px-0',
  'data-[vaul-drawer-direction=bottom]:max-h-dvh!',
  'data-[vaul-drawer-direction=bottom]:h-dvh!',
  'data-[vaul-drawer-direction=bottom]:mt-0!',
  '[&>div:first-child]:hidden',
  '[&>div:last-child]:max-h-none',
  '[&>div:last-child]:min-h-0',
  '[&>div:last-child]:flex-1',
  '[&>div:last-child]:pb-0',
]
</script>

<template>
    <div
        v-if="$slots.trigger"
        @click.stop="open"
    >
        <slot
            name="trigger"
            :open="open"
            :close="close"
        />
    </div>

    <Dialog
        v-if="isMoreSmScreen"
        v-model:open="isOpen"
        :class="[dialogClass]"
    >
        <DialogContent
            :class="[dialogContentClass]"
        >
            <DialogHeader
                v-if="title || description"
                :class="[dialogContentHeaderClass]"
            >
                <DialogTitle v-if="title">
                    {{ title }}
                </DialogTitle>
                <DialogDescription v-if="description">
                    {{ props.description }}
                </DialogDescription>
            </DialogHeader>
            <div
                :class="[dialogContentSlotClass]"
                class="max-h-[80vh] overflow-y-auto "
            >
                <slot :close="close" />
            </div>

            <slot
                name="footer"
                :close="close"
            />
        </DialogContent>
    </Dialog>

    <Drawer
        v-else
        v-model:open="isOpen"
        :class="[drawerClass]"
    >
        <DrawerContent
            :class="[
                drawerFullscreen
                    ? drawerFullscreenClass
                    : 'px-4 flex flex-col gap-6',
                drawerContentClass,
            ]"
        >
            <template v-if="drawerFullscreen">
                <div class="pointer-events-none sticky top-2 z-10 flex h-0 justify-end px-2">
                    <DrawerClose as-child>
                        <button
                            type="button"
                            class="pointer-events-auto flex size-7 items-center justify-center rounded-full bg-lepsios-field text-white"
                            aria-label="Close"
                        >
                            <Icon
                                name="akar-icons:cross"
                                size="12"
                            />
                        </button>
                    </DrawerClose>
                </div>

                <div
                    class="flex flex-col gap-5 px-2 pt-2 pb-8"
                    :class="[
                        drawerContentSlotClass,
                    ]"
                >
                    <slot
                        v-if="$slots.header"
                        name="header"
                    />
                    <slot :close="close" />
                </div>
            </template>

            <template v-else>
                <DrawerHeader
                    v-if="title || description"
                    class="text-left px-0"
                    :class="[drawerContentHeaderClass]"
                >
                    <DrawerTitle v-if="title">
                        {{ title }}
                    </DrawerTitle>
                    <DrawerDescription v-if="description">
                        {{ description }}
                    </DrawerDescription>
                </DrawerHeader>
                <div
                    :class="[
                        { 'mb-10': drawerHideFooter },
                        drawerContentSlotClass,
                    ]"
                >
                    <slot :close="close" />
                </div>
            </template>
            <DrawerFooter
                v-if="!drawerHideFooter && ($slots.footer || cancelButtonText)"
                class="pt-6 px-0"
                :class="[drawerContentFooterClass]"
            >
                <slot
                    name="footer"
                    :close="close"
                >
                    <DrawerClose
                        as-child
                    >
                        <Button variant="outline">
                            {{ props.cancelButtonText }}
                        </Button>
                    </DrawerClose>
                </slot>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
</template>
