<template>
    <InputNumber v-model="modelValue" mode="decimal" :placeholder="'Search by ' + label" @input="inputHandle"
        showButtons fluid />
</template>

<script lang="ts">
    import { defineComponent, watch } from 'vue';
    import InputNumber, { type InputNumberInputEvent } from 'primevue/inputnumber';
    export default defineComponent({
        name: 'awInputNumberColumnFilter',
        components: { InputNumber },
        props: {
            name: {
                type: String,
                required: true
            },
            label: {
                type: String,
                required: true
            },
            modelValue: {
                type: Number,
                required: true
            }
        },

        emits: ['update:modelValue', 'update:field'],

        setup(props, { emit }: any) {
            watch(
                () => props.modelValue,
                (newValue) => {
                    emit('update:field', { 'Name': props.name, 'Value': newValue });
                }
            );

            const inputHandle = (input: InputNumberInputEvent) => {
                // props.modelValue = input.value;
            }

            return { inputHandle };
        },
    });
</script>

<style scoped>
/* Tambahkan gaya khusus jika diperlukan */
</style>
