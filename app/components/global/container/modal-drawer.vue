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
}

const props = withDefaults(defineProps<Props>(), {
  drawerHideFooter: false,
})

const isOpen = defineModel<boolean>('open', { default: false })

const open = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}
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
            class="px-4 flex flex-col gap-6"
            :class="[
                drawerContentClass]"
        >
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
                    drawerContentSlotClass]"
            >
                <slot :close="close" />
            </div>
            <DrawerFooter
                v-if="drawerHideFooter || $slots.footer"
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
