<!-- TODO(vue-lepsios): extracted to @lepsios/vue/components/ui/form/FormControl; remove after Nuxt consumers migrate. -->
<script lang="ts" setup>
import { Slot } from 'reka-ui'
import { useFormField } from './useFormField'

const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
</script>

<template>
    <Slot
        :id="formItemId"
        data-slot="form-control"
        :aria-describedby="!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`"
        :aria-invalid="!!error"
    >
        <slot />
    </Slot>
</template>
