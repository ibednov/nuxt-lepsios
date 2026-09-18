import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const mediaChipVariants = cva(
  'inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs lowercase',
  {
    variants: {
      variant: {
        glass: 'bg-black/45 text-white backdrop-blur-sm',
        solid: 'bg-neutral-900 text-white',
        soft: 'bg-white/80 text-neutral-900 backdrop-blur-sm',
      },
    },
    defaultVariants: {
      variant: 'glass',
    },
  },
)

export type MediaChipVariants = VariantProps<typeof mediaChipVariants>
