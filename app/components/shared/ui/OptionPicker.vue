<script setup lang="ts">
interface Option {
  value: string
  label: string
}

const props = defineProps<{
  options: Option[]
  placeholder?: string
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
    <div class="hidden md:block">
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
            class="cursor-pointer"
            @select="choose(option.value)"
          >
            {{ option.label }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div class="md:hidden">
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
          <div class="grid grid-cols-2 gap-3 p-4 pb-10 min-[420px]:grid-cols-3">
            <button
              v-for="option in options"
              :key="option.value"
              type="button"
              class="min-h-12 rounded-xl border px-3 py-3 text-sm font-semibold transition-colors"
              :class="model === option.value ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background hover:bg-muted'"
              @click="choose(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  </div>
</template>
