<script setup lang='ts'>
interface ComponentProps {
    title?: string
    description?: string
}

defineProps<ComponentProps>()
</script>

<template>
    <Sheet
        v-if="isMoreMdScreen"
    >
        <SheetTrigger as-child>
            <slot name="trigger">
                <Button variant="outline">
                    Open
                </Button>
            </slot>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader v-if="title || description">
                <SheetTitle v-if="title">
                    {{ title }}
                </SheetTitle>
                <SheetDescription v-if="description">
                    {{ description }}
                </SheetDescription>
            </SheetHeader>
            <div class="flex flex-col gap-4 py-5">
                <slot />
            </div>
            <!-- <SheetFooter>
        <Button type="submit">
          Save changes
        </Button>
        <SheetClose as-child>
          <Button variant="outline">
            Close
          </Button>
        </SheetClose>
      </SheetFooter> -->
        </SheetContent>
    </Sheet>

    <Drawer v-else>
        <DrawerTrigger>
            <slot name="trigger">
                <Button variant="outline">
                    Open
                </Button>
            </slot>
        </DrawerTrigger>
        <DrawerContent class="min-h-[30dvh] max-h-[80dvh] h-fit">
            <DrawerHeader v-if="title || description">
                <DrawerTitle v-if="title">
                    {{ title }}
                </DrawerTitle>
                <DrawerDescription v-if="description">
                    {{ description }}
                </DrawerDescription>
            </DrawerHeader>
            <div class="flex flex-col gap-4 p-4 pb-12">
                <slot />
            </div>
            <!-- <DrawerFooter>
        <Button>Submit</Button>
        <DrawerClose>
          <Button variant="outline">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter> -->
        </DrawerContent>
    </Drawer>
</template>
