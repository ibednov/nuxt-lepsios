import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-3xl text-[15px] font-semibold transition-all disabled:pointer-events-none disabled:opacity-90 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        soft: 'bg-lepsios-field text-accent-foreground hover:bg-lepsios-field/80',
        badge: 'bg-lepsios-surface/80 text-accent-foreground font-medium shadow-none hover:bg-lepsios-surface',
        accent: 'bg-brand text-brand-foreground shadow-xs hover:bg-brand/90',
      },
      textAlign: {
        left: 'justify-start text-left',
        center: 'justify-center text-center',
        right: 'justify-end text-right',
      },
      size: {
        'default': 'h-9 px-5 py-2 has-[>svg]:px-3',
        'sm': 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        'lg': 'h-10 rounded-md px-6 has-[>svg]:px-4',
        'full': 'w-full h-full',
        'base': 'h-14 rounded-2xl px-4 py-2 w-full',
        'big': 'h-14 w-full rounded-full',
        'icon': 'size-9 p-0',
        'empty': 'h-auto px-0 py-0',
        'pill': 'h-auto rounded-full px-4 py-2 text-sm font-normal',
        'pill-icon': 'size-10 shrink-0 rounded-full',
        'badge': 'h-9 w-fit min-h-9 shrink-0 rounded-full px-4 pt-2 pb-[9px] text-xs font-medium gap-0.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      textAlign: 'left',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
