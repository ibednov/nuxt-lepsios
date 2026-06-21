import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const tabsListVariants = cva(
  'min-w-fit inline-flex w-full items-center',
  {
    variants: {
      variant: {
        default: 'bg-muted text-muted-foreground h-9 justify-start rounded-lg p-[3px]',
        pill: 'rounded-full bg-accent-foreground/10 p-1',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export const tabsTriggerVariants = cva(
  'inline-flex flex-1 items-center justify-center gap-1.5 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',
  {
    variants: {
      variant: {
        default: 'h-[calc(100%-1px)] rounded-md border border-transparent px-2 py-1 text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] data-[state=active]:bg-background data-[state=active]:shadow-sm dark:text-muted-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground',
        pill: 'rounded-full py-2.5 text-muted-foreground transition-colors focus-visible:ring-ring/50 focus-visible:ring-[3px] data-[state=active]:bg-accent-foreground/20 data-[state=active]:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type TabsVariants = VariantProps<typeof tabsListVariants>
