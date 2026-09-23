<script setup lang="ts">
interface Option {
  value: string
  label: string
  description?: string
  image?: string
}

const props = defineProps<{
  options: Option[]
  placeholder?: string
  desktopInline?: boolean
}>()

const model = defineModel<string>({ required: true })
const open = ref(false)
const selected = computed(() => props.options.find(option => option.value === model.value))

const choose = (value: string) => {
  model.value = value
  open.value = false
}
</script>

<template>
  <div class="w-full">
    <div v-if="isMoreSmScreen && desktopInline" class="grid grid-cols-5 gap-2">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        class="min-h-10 rounded-[var(--waify-button-radius,0.75rem)] border px-3 py-2 text-sm font-medium transition-colors"
        :class="model === option.value ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background hover:bg-muted'"
        @click="choose(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
    <div v-else-if="isMoreSmScreen">
      <DropdownMenu v-model:open="open">
        <DropdownMenuTrigger as-child>
          <Button type="button" variant="outline" class="w-full justify-between">
            <span>{{ selected?.label || placeholder }}</span>
            <Icon name="lucide:chevron-down" size="16" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-[var(--reka-dropdown-menu-trigger-width)] min-w-0">
          <DropdownMenuItem
            v-for="option in options"
            :key="option.value"
            class="cursor-pointer gap-3"
            @select="choose(option.value)"
          >
            <img v-if="option.image" :src="option.image" :alt="option.label" class="size-10 rounded-[var(--waify-button-radius,0.75rem)] object-cover">
            <span class="min-w-0">
              <span class="block truncate">{{ option.label }}</span>
              <span v-if="option.description" class="block truncate text-xs text-muted-foreground">{{ option.description }}</span>
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div v-else>
      <Drawer v-model:open="open">
        <DrawerTrigger as-child>
          <Button type="button" variant="outline" class="w-full justify-between">
            <span>{{ selected?.label || placeholder }}</span>
            <Icon name="lucide:chevrons-up-down" size="16" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{{ placeholder }}</DrawerTitle>
          </DrawerHeader>
          <div class="flex flex-col gap-2 p-4 pb-10">
            <button
              v-for="option in options"
              :key="option.value"
              type="button"
              class="flex min-h-14 items-center gap-3 rounded-[var(--waify-button-radius,0.75rem)] border px-3 py-3 text-left text-sm font-semibold transition-colors"
              :class="model === option.value ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background hover:bg-muted'"
              @click="choose(option.value)"
            >
              <img v-if="option.image" :src="option.image" :alt="option.label" class="size-12 shrink-0 rounded-[var(--waify-button-radius,0.75rem)] object-cover">
              <span class="min-w-0">
                <span class="block truncate">{{ option.label }}</span>
                <span v-if="option.description" class="mt-0.5 block line-clamp-2 text-xs font-normal text-muted-foreground">{{ option.description }}</span>
              </span>
            </button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  </div>
</template>
