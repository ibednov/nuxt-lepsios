import { cva, type VariantProps } from 'class-variance-authority'

export const fieldPickerDateVariants = cva(
  'w-full overflow-hidden rounded-2xl p-3',
  {
    variants: {
      variant: {
        default: 'border bg-background',
        drawer: 'bg-lepsios-surface',
      },
    },
    defaultVariants: {
      variant: 'drawer',
    },
  },
)

export const fieldPickerSelectTriggerVariants = cva(
  'h-10 w-full rounded-xl border-0 bg-lepsios-field',
  {
    variants: {
      variant: {
        default: 'rounded-md border bg-background',
        drawer: 'rounded-xl border-0 bg-lepsios-field',
      },
    },
    defaultVariants: {
      variant: 'drawer',
    },
  },
)

export type FieldPickerDateVariants = VariantProps<typeof fieldPickerDateVariants>
export type FieldPickerSelectTriggerVariants = VariantProps<typeof fieldPickerSelectTriggerVariants>
