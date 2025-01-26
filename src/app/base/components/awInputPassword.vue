<template>
    <awLabel v-if="fieldElement.ShowLabel" :id="fieldElement.Name" :label="fieldElement.Label"
        :required="fieldElement.Required" :loading="fieldElement.Loading" />
    <Skeleton v-if="fieldElement.Loading" height="2rem" />
    <Password v-else v-model="fieldElement.Value" :min="fieldElement.MinValue" :max="fieldElement.MaxValue"
        :disabled="fieldElement.Disabled" :placeholder="fieldElement.PlaceHolder" toggleMask showButtons fluid>
    </Password>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Password from 'primevue/password';
    import Skeleton from 'primevue/skeleton';
    import awLabel from './awLabel.vue';
    import { FieldElementItem } from '../models/fieldelementitem';
    export default defineComponent({
        name: 'awInputPassword',
        components: { Password, Skeleton, awLabel },
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
