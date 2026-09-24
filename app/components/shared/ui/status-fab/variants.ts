import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const statusFabVariants = cva(
  'absolute z-10 flex size-9 items-center justify-center shadow-sm',
  {
    variants: {
      variant: {
        'dark-circle': 'rounded-full bg-neutral-900 text-white',
        'light-square': 'rounded-xl bg-white text-black',
        'success-circle': 'rounded-full bg-emerald-100 text-emerald-500',
      },
      position: {
        'media-corner': 'right-2 bottom-2 translate-y-0 z-20',
        'top-right': 'right-2 top-2',
      },
    },
    defaultVariants: {
      variant: 'light-square',
      position: 'media-corner',
    },
  },
)

export type StatusFabVariants = VariantProps<typeof statusFabVariants>
