<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

interface AdminDataColumn {
  key: string
  label: string
  sortable?: boolean
  class?: string
}

interface AdminDataFilter {
  key: string
  label: string
  options: Array<{ label: string, value: string }>
}

const props = withDefaults(defineProps<{
  rows: Array<Record<string, unknown>>
  columns: AdminDataColumn[]
  filters?: AdminDataFilter[]
  searchPlaceholder: string
  emptyText: string
  previousLabel: string
  nextLabel: string
  selectAllLabel: string
  selectRowLabel: string
  loadingText?: string
  loading?: boolean
  pageSize?: number
  rowKey?: string
  selectable?: boolean
  class?: HTMLAttributes['class']
}>(), {
  filters: () => [],
  pageSize: 20,
  rowKey: 'id',
  selectable: false,
})

const emit = defineEmits<{
  rowClick: [row: Record<string, unknown>]
  selectionChange: [rows: Array<Record<string, unknown>>]
}>()

const search = ref('')
const filterValues = reactive<Record<string, string>>({})
const sort = ref<{ key: string, direction: 'asc' | 'desc' } | null>(null)
const page = ref(1)
const selected = reactive(new Set<string>())

const rowId = (row: Record<string, unknown>, index: number) => String(row[props.rowKey] ?? index)
const filteredRows = computed(() => {
  const query = search.value.trim().toLocaleLowerCase()
  let result = props.rows.filter((row) => {
    if (query && !Object.values(row).some(value => String(value ?? '').toLocaleLowerCase().includes(query))) return false
    return props.filters.every(filter => !filterValues[filter.key] || filterValues[filter.key] === '__all__' || String(row[filter.key] ?? '') === filterValues[filter.key])
  })
  if (sort.value) {
    const { key, direction } = sort.value
    result = [...result].sort((a, b) => String(a[key] ?? '').localeCompare(String(b[key] ?? ''), undefined, { numeric: true, sensitivity: 'base' }) * (direction === 'asc' ? 1 : -1))
  }
  return result
})
const pageCount = computed(() => Math.max(1, Math.ceil(filteredRows.value.length / props.pageSize)))
const visibleRows = computed(() => filteredRows.value.slice((page.value - 1) * props.pageSize, page.value * props.pageSize))
const selectedRows = computed(() => props.rows.filter((row, index) => selected.has(rowId(row, index))))
const allVisibleSelected = computed(() => visibleRows.value.length > 0 && visibleRows.value.every((row) => {
  const index = props.rows.indexOf(row)
  return selected.has(rowId(row, index))
}))

watch([search, filterValues], () => { page.value = 1 }, { deep: true })
watch(pageCount, (count) => { if (page.value > count) page.value = count })
watch(selectedRows, rows => emit('selectionChange', rows))
watch(() => props.rows, (rows) => {
  const valid = new Set(rows.map((row, index) => rowId(row, index)))
  for (const id of selected) if (!valid.has(id)) selected.delete(id)
})

const toggleSort = (column: AdminDataColumn) => {
  if (column.sortable === false) return
  sort.value = sort.value?.key === column.key
    ? { key: column.key, direction: sort.value.direction === 'asc' ? 'desc' : 'asc' }
    : { key: column.key, direction: 'asc' }
}
const toggleRow = (row: Record<string, unknown>) => {
  const id = rowId(row, props.rows.indexOf(row))
  if (selected.has(id)) selected.delete(id)
  else selected.add(id)
}
const toggleVisible = () => {
  const ids = visibleRows.value.map(row => rowId(row, props.rows.indexOf(row)))
  if (allVisibleSelected.value) ids.forEach(id => selected.delete(id))
  else ids.forEach(id => selected.add(id))
}
const clearSelection = () => selected.clear()
defineExpose({ clearSelection, selectedRows })
</script>

<template>
  <section :class="cn('space-y-4', props.class)">
    <div class="flex flex-col gap-3 lg:flex-row lg:items-center">
      <Input v-model="search" :placeholder="searchPlaceholder" class="lg:max-w-sm" />
      <Select v-for="filter in filters" :key="filter.key" v-model="filterValues[filter.key]">
        <SelectTrigger class="lg:w-56"><SelectValue :placeholder="filter.label" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="__all__">{{ filter.label }}</SelectItem>
          <SelectItem v-for="option in filter.options" :key="option.value" :value="option.value">{{ option.label }}</SelectItem>
        </SelectContent>
      </Select>
      <div class="flex flex-1 items-center justify-end gap-2">
        <span v-if="selectable && selectedRows.length" class="text-sm text-muted-foreground">{{ selectedRows.length }}</span>
        <slot v-if="selectable" name="selection" :rows="selectedRows" :clear="clearSelection" />
        <slot name="toolbar" />
      </div>
    </div>

    <div class="overflow-hidden rounded-xl border border-border bg-card">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[760px] text-left text-sm">
          <thead class="border-b border-border bg-muted/40 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <tr>
              <th v-if="selectable" class="w-10 px-4 py-3"><input type="checkbox" :aria-label="selectAllLabel" :checked="allVisibleSelected" @change="toggleVisible"></th>
              <th v-for="column in columns" :key="column.key" :class="cn('px-4 py-3', column.class, column.sortable === false ? '' : 'cursor-pointer select-none')" @click="toggleSort(column)">
                {{ column.label }}
                <span v-if="sort?.key === column.key" aria-hidden="true">{{ sort.direction === 'asc' ? '↑' : '↓' }}</span>
              </th>
              <th v-if="$slots.actions" class="px-4 py-3 text-right"><slot name="actions-heading" /></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-if="loading"><td :colspan="columns.length + (selectable ? 1 : 0) + ($slots.actions ? 1 : 0)" class="px-4 py-12 text-center text-muted-foreground"><slot name="loading">{{ loadingText }}</slot></td></tr>
            <tr v-for="row in loading ? [] : visibleRows" :key="rowId(row, props.rows.indexOf(row))" class="transition-colors hover:bg-muted/30" @click="emit('rowClick', row)">
              <td v-if="selectable" class="px-4 py-3" @click.stop><input type="checkbox" :aria-label="selectRowLabel" :checked="selected.has(rowId(row, props.rows.indexOf(row)))" @change="toggleRow(row)"></td>
              <td v-for="column in columns" :key="column.key" :class="cn('px-4 py-3', column.class)">
                <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">{{ row[column.key] ?? '—' }}</slot>
              </td>
              <td v-if="$slots.actions" class="px-4 py-3 text-right" @click.stop><slot name="actions" :row="row" /></td>
            </tr>
            <tr v-if="!loading && !visibleRows.length"><td :colspan="columns.length + (selectable ? 1 : 0) + ($slots.actions ? 1 : 0)" class="px-4 py-12 text-center text-muted-foreground"><slot name="empty">{{ emptyText }}</slot></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <span>{{ (page - 1) * pageSize + (filteredRows.length ? 1 : 0) }}–{{ Math.min(page * pageSize, filteredRows.length) }} / {{ filteredRows.length }}</span>
      <div class="flex gap-2">
        <Button variant="outline" size="sm" :disabled="page <= 1" @click="page--">{{ previousLabel }}</Button>
        <span class="flex items-center px-2">{{ page }} / {{ pageCount }}</span>
        <Button variant="outline" size="sm" :disabled="page >= pageCount" @click="page++">{{ nextLabel }}</Button>
      </div>
    </div>
  </section>
</template>
