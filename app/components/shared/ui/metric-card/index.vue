<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const metricCardVariants = cva(
  'relative flex h-full flex-col justify-between gap-4 overflow-hidden transition-all',
  {
    variants: {
      variant: {
        default: 'bg-card shadow-sm hover:shadow-md',
        gradient: 'bg-gradient-to-t from-primary/5 to-card shadow-sm hover:shadow-md',
      },
    },
    defaultVariants: {
      variant: 'gradient',
    },
  },
)

type MetricCardVariants = VariantProps<typeof metricCardVariants>

interface ComponentProps {
  title: string
  value?: string | number | null
  hint?: string
  icon?: string
  loading?: boolean
  variant?: MetricCardVariants['variant']
  class?: HTMLAttributes['class']
}

withDefaults(defineProps<ComponentProps>(), {
  value: null,
  hint: undefined,
  icon: undefined,
  loading: false,
  variant: 'gradient',
})
</script>

<template>
    <Card
        :class="cn(metricCardVariants({ variant }), $props.class)"
    >
        <CardHeader>
            <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-2">
                    <Icon
                        v-if="icon"
                        :name="icon"
                        class="size-5 text-muted-foreground"
                    />
                    <CardDescription class="text-sm font-medium">
                        {{ title }}
                    </CardDescription>
                </div>
            </div>
            <CardTitle class="text-2xl font-semibold tabular-nums">
                <Skeleton
                    v-if="loading"
                    class="h-8 w-20"
                />
                <template v-else>
                    {{ value ?? '—' }}
                </template>
            </CardTitle>
        </CardHeader>
        <CardFooter
            v-if="hint"
            class="text-sm text-muted-foreground"
        >
            {{ hint }}
        </CardFooter>
    </Card>
</template>
