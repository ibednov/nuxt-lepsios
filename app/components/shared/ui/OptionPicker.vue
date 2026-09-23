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
  loading?: boolean
  selectedClass?: string
}>()

const model = defineModel<string>({ required: true })
const open = ref(false)
const selected = computed(() => props.options.find(option => option.value === model.value))
const brokenImages = ref<Record<string, boolean>>({})

const choose = (value: string) => {
  model.value = value
  open.value = false
}

const imageAvailable = (option: Option) => Boolean(option.image && !brokenImages.value[option.value])
const markImageBroken = (option: Option) => { brokenImages.value[option.value] = true }
</script>

<template>
  <div class="w-full">
    <div v-if="isMoreSmScreen && desktopInline" class="grid grid-cols-5 gap-2">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        class="min-h-10 rounded-[var(--waify-button-radius,0.75rem)] border px-3 py-2 text-sm font-medium transition-colors"
        :class="model === option.value ? (selectedClass || 'border-primary bg-primary text-primary-foreground') : 'border-border bg-background hover:bg-muted'"
        @click="choose(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
    <div v-else-if="isMoreSmScreen">
      <DropdownMenu v-model:open="open">
        <DropdownMenuTrigger as-child>
          <Button type="button" variant="outline" class="w-full justify-between">
            <span v-if="loading" class="h-4 w-32 animate-pulse rounded-[var(--waify-button-radius,0.75rem)] bg-muted" />
            <span v-else>{{ selected?.label || placeholder }}</span>
            <Icon name="lucide:chevron-down" size="16" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="max-h-96 w-[var(--reka-dropdown-menu-trigger-width)] min-w-0 overflow-y-auto">
          <div v-if="loading" class="space-y-2 p-2">
            <div v-for="index in 5" :key="index" class="h-12 animate-pulse rounded-[var(--waify-button-radius,0.75rem)] bg-muted" />
          </div>
          <DropdownMenuItem
            v-else
            v-for="option in options"
            :key="option.value"
            class="cursor-pointer gap-3"
            @select="choose(option.value)"
          >
            <img v-if="imageAvailable(option)" :src="option.image" :alt="option.label" class="size-10 rounded-[var(--waify-button-radius,0.75rem)] object-cover" @error="markImageBroken(option)">
            <span v-else class="grid size-10 shrink-0 place-items-center rounded-[var(--waify-button-radius,0.75rem)] bg-muted text-muted-foreground"><Icon name="ph:image-square" size="20" /></span>
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
            <span v-if="loading" class="h-4 w-32 animate-pulse rounded-[var(--waify-button-radius,0.75rem)] bg-muted" />
            <span v-else>{{ selected?.label || placeholder }}</span>
            <Icon name="lucide:chevrons-up-down" size="16" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{{ placeholder }}</DrawerTitle>
          </DrawerHeader>
          <div class="flex flex-col gap-2 p-4 pb-10">
            <div v-if="loading" class="space-y-2">
              <div v-for="index in 5" :key="index" class="h-16 animate-pulse rounded-[var(--waify-button-radius,0.75rem)] bg-muted" />
            </div>
            <button
              v-else
              v-for="option in options"
              :key="option.value"
              type="button"
              class="flex min-h-14 items-center gap-3 rounded-[var(--waify-button-radius,0.75rem)] border px-3 py-3 text-left text-sm font-semibold transition-colors"
              :class="model === option.value ? (selectedClass || 'border-primary bg-primary text-primary-foreground') : 'border-border bg-background hover:bg-muted'"
              @click="choose(option.value)"
            >
              <img v-if="imageAvailable(option)" :src="option.image" :alt="option.label" class="size-12 shrink-0 rounded-[var(--waify-button-radius,0.75rem)] object-cover" @error="markImageBroken(option)">
              <span v-else class="grid size-12 shrink-0 place-items-center rounded-[var(--waify-button-radius,0.75rem)] bg-muted text-muted-foreground"><Icon name="ph:image-square" size="22" /></span>
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
