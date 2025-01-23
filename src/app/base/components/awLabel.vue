<template>
    <div v-if="loading" class="animate-pulse h-2 w-14 my-2 bg-slate-400 rounded"></div>
    <label v-else :for="id" class="block text-slate-700 text-sm font-bold mb-2"> {{ label }}
        <span v-if="required" class="text-red-500">*</span>
        <slot />
    </label>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'awLabel',
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