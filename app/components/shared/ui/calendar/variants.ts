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
  'text-muted-foreground h-8 w-[14.285714%] p-0 text-center align-middle text-[0.8rem] font-normal whitespace-nowrap',
)

export const calendarCellVariants = cva(
  'relative h-9 w-[14.285714%] p-0 text-center align-middle text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-[var(--waify-button-radius,0.75rem)] [&:has([data-selected])]:bg-accent',
)

export const calendarCellTriggerVariants = cva(
  'flex h-9 w-full items-center justify-center rounded-[var(--waify-button-radius,0.75rem)] p-0 font-normal aria-selected:opacity-100 aria-selected:bg-[var(--waify-olive,#6b7335)] aria-selected:text-white cursor-default [&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground [&[data-today]:not([data-selected])]:font-bold [&[data-today]:not([data-selected])]:ring-2 [&[data-today]:not([data-selected])]:ring-[var(--waify-olive,#6b7335)] data-[selected]:bg-[var(--waify-olive,#6b7335)] data-[selected]:text-white data-[selected]:opacity-100 data-[selected]:hover:bg-[var(--waify-olive,#6b7335)] data-[selected]:hover:text-white data-[selected]:focus:bg-[var(--waify-olive,#6b7335)] data-[selected]:focus:text-white data-[disabled]:text-muted-foreground data-[disabled]:opacity-50 data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through data-[outside-view]:text-muted-foreground',
)

export type CalendarVariants = VariantProps<typeof calendarVariants>
export type CalendarGridRowVariants = VariantProps<typeof calendarGridRowVariants>
