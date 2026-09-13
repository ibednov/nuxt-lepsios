import type { BreakpointSizes } from '~/interfaces/composables/vueuse'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { computed, ref } from 'vue'

const breakpointSizes: BreakpointSizes = {
  'xs': '320',
  'sm': '640',
  'md': '768',
  'lg': '1024',
  'xl': '1280',
  '2xl': '1536',
}

const createBreakpoints = () => {
  if (import.meta.server) {
    return {
      smaller: () => ref(false),
      between: () => ref(false),
      greater: () => ref(false),
      greaterOrEqual: () => ref(true),
      active: () => ref('lg' as keyof BreakpointSizes),
    }
  }
  return useBreakpoints(breakpointsTailwind)
}

export const breakpoints = createBreakpoints()

export const isXsScreen = breakpoints.smaller('sm')
export const isSmScreen = breakpoints.between('sm', 'md')
export const isMdScreen = breakpoints.between('md', 'lg')
export const isLgScreen = breakpoints.between('lg', 'xl')
export const isXlScreen = breakpoints.between('xl', '2xl')
export const is2XlScreen = breakpoints.greater('2xl')

export const isMoreXsScreen = breakpoints.greaterOrEqual('sm')
export const isMoreSmScreen = breakpoints.greaterOrEqual('md')
export const isMoreMdScreen = breakpoints.greaterOrEqual('lg')
export const isMoreLgScreen = breakpoints.greaterOrEqual('xl')
export const isMoreXlScreen = breakpoints.greaterOrEqual('2xl')

export const activeBreakpoint = breakpoints.active()
export const activeScreen = computed(() => {
  const active = activeBreakpoint.value as keyof BreakpointSizes
  if (!active || !breakpointSizes[active]) {
    return '320'
  }
  return breakpointSizes[active] || '1536'
})
