<template>
    <div>
        <awLabel v-if="fieldElement.ShowLabel" :id="fieldElement.Name" :label="fieldElement.Label"
            :required="fieldElement.Required" :loading="fieldElement.Loading" />
        <Skeleton v-if="fieldElement.Loading" height="2rem" />
        <InputNumber v-else v-model="fieldElement.Value" :min="fieldElement.MinValue" :max="fieldElement.MaxValue"
            :prefix="fieldElement.Prefix" :suffix="fieldElement.Suffix"
            :minFractionDigits="fieldElement.MinFractionDigits" :maxFractionDigits="fieldElement.MaxFractionDigits"
            :mode="modeInput" :currency="fieldElement.Currency" :disabled="fieldElement.Disabled"
            :locale="fieldElement.Locale" :placeholder="fieldElement.PlaceHolder" @input="inputHandle" showButtons
            fluid>
        </InputNumber>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import InputNumber, { type InputNumberInputEvent } from 'primevue/inputnumber';
import Skeleton from 'primevue/skeleton';
import awLabel from './awLabel.vue';
import { FieldElementItem } from '../models/fieldelementitem';
export default defineComponent({
    name: 'awInputNumber',
    components: { InputNumber, Skeleton, awLabel },
    props: {
        fieldElement: {
            type: FieldElementItem,
            required: true
        }
    },

    emits: ['update:modelValue', 'update:field'],

    setup(props, { emit }: any) {
        const modeInput = computed(() => {
            if (!props.fieldElement.Currency) {
                return 'decimal';
            }
            return 'currency';
        });

        watch(
            () => props.fieldElement.Value,
            (newValue) => {
                emit('update:field', props.fieldElement);
            }
        );

        const inputHandle = (input: InputNumberInputEvent) => {
            props.fieldElement.Value = input.value;
        }

        return { modeInput, inputHandle };
    },
});
</script>

<style scoped>
/* Tambahkan gaya khusus jika diperlukan */
</style>
