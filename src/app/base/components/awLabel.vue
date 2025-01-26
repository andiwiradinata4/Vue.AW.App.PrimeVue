<template>
    <Skeleton v-if="loading" width="5rem" class="mb-2" />
    <label v-else :for="id" class="block text-sm font-bold mb-2"> {{ label }}
        <span v-if="required" class="text-red-500">*</span>
        <slot />
    </label>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Skeleton from 'primevue/skeleton';

    export default defineComponent({
        name: 'awLabel',
        components: { Skeleton },
        props: {
            id: {
                type: String,
                required: true
            },
            label: {
                type: String,
                required: true
            },
            loading: {
                type: Boolean,
                default: false
            },
            required:
            {
                type: Boolean,
                default: false
            },
            requiredMessage:
            {
                type: String,
                default: 'This field is required'
            },
        },
    })
</script>

<style scoped></style>