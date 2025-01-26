<template>
    <div>
        <awLabel v-if="fieldElement.ShowLabel" :id="fieldElement.Name" :label="fieldElement.Label"
            :required="fieldElement.Required" :loading="fieldElement.Loading" />
        <Skeleton v-if="fieldElement.Loading" height="2rem" />
        <InputNumber v-else v-model="fieldElement.Value" :min="fieldElement.MinValue" :max="fieldElement.MaxValue"
            :prefix="fieldElement.Prefix" :suffix="fieldElement.Suffix"
            :minFractionDigits="fieldElement.MinFractionDigits" :maxFractionDigits="fieldElement.MaxFractionDigits"
            :mode="modeInput" :currency="fieldElement.Currency" :disabled="fieldElement.Disabled"
            :locale="fieldElement.Locale" :placeholder="fieldElement.PlaceHolder" showButtons fluid>
        </InputNumber>
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed } from 'vue';
    import InputNumber from 'primevue/inputnumber';
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

        emits: ['update:modelValue'],

        setup(props, { emit }: any) {
            const modeInput = computed(() => {
                if (!props.fieldElement.Currency) {
                    return 'decimal';
                }
                return 'currency';
            })

            return { modeInput };
        },
    });
</script>

<style scoped>
/* Tambahkan gaya khusus jika diperlukan */
</style>
