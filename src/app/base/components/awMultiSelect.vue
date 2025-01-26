<template>
    <awLabel v-if="fieldElement.ShowLabel" :id="fieldElement.Name" :label="fieldElement.Label"
        :required="fieldElement.Required" :loading="fieldElement.Loading" />
    <Skeleton v-if="fieldElement.Loading" height="2rem" />
    <MultiSelect v-else v-model="fieldElement.Value" :options="data" filter :disabled="fieldElement.Disabled"
        :placeholder="fieldElement.PlaceHolder" :optionValue="fieldElement.OptionValue"
        :optionLabel="fieldElement.OptionLabel" :selectionLimit="fieldElement.MaxSelectValue" showClear display="chip"
        fluid>
    </MultiSelect>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import MultiSelect from 'primevue/multiselect';
    import Skeleton from 'primevue/skeleton';
    import awLabel from './awLabel.vue';
    import { FieldElementItem } from '../models/fieldelementitem';
    export default defineComponent({
        name: 'awMultiSelect',
        components: { MultiSelect, Skeleton, awLabel },
        props: {
            fieldElement: {
                type: FieldElementItem,
                required: true
            }
        },

        emits: ['update:modelValue'],

        setup(props, { emit }: any) {
            const data = ref([
                { Id: 1, Name: 'New York' },
                { Id: 2, Name: 'Rome' },
                { Id: 3, Name: 'London' },
                { Id: 4, Name: 'Istanbul' },
                { Id: 5, Name: 'Paris' }
            ]);

            return { data };
        },
    });
</script>

<style scoped>
/* Tambahkan gaya khusus jika diperlukan */
</style>
