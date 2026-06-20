import { cva, type VariantProps } from 'class-variance-authority'

export const calendarVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default: 'p-3',
        drawer: 'border-0 bg-transparent p-0 shadow-none [&_[data-slot=calendar-header]]:hidden',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export const calendarGridVariants = cva(
  'w-full table-fixed border-collapse',
)

export const calendarGridRowVariants = cva(
  'w-full',
  {
    variants: {
      section: {
        head: '',
        body: 'mt-2',
      },
    },
    defaultVariants: {
      section: 'body',
    },
  },
)

export const calendarHeadCellVariants = cva(
  'text-muted-foreground w-[14.285714%] p-0 text-center text-[0.8rem] font-normal whitespace-nowrap',
)

export const calendarCellVariants = cva(
  'relative w-[14.285714%] p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md [&:has([data-selected])]:bg-accent',
)

export const calendarCellTriggerVariants = cva(
  'h-8 w-full p-0 font-normal aria-selected:opacity-100 cursor-default [&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:opacity-100 data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-primary data-[selected]:focus:text-primary-foreground data-[disabled]:text-muted-foreground data-[disabled]:opacity-50 data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through data-[outside-view]:text-muted-foreground',
)

export type CalendarVariants = VariantProps<typeof calendarVariants>
export type CalendarGridRowVariants = VariantProps<typeof calendarGridRowVariants>
