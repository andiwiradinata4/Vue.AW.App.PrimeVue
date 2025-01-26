<template>
    <Button :label="fieldElement.Label" :icon="fieldElement.CustomIcon" :iconPos="fieldElement.IconPosition"
        :severity="fieldElement.Severity" :loading="fieldElement.Loading" :disabled="fieldElement.Disabled"
        :variant="fieldElement.Variant" :raised="fieldElement.Raised" />
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Button from 'primevue/button';
    import Skeleton from 'primevue/skeleton';
    import { FieldElementItem } from '../models/fieldelementitem';
    export default defineComponent({
        name: 'awInputText',
        components: { Button, Skeleton },
        props: {
            fieldElement: {
                type: FieldElementItem,
                required: true
            }
        },

        emits: ['update:modelValue'],

        setup(props, { emit }: any) {
            return {};
        },
    });
</script>

<style scoped>
/* Tambahkan gaya khusus jika diperlukan */
</style>
