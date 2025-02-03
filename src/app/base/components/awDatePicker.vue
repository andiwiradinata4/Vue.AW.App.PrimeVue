<template>
    <awLabel v-if="fieldElement.ShowLabel" :id="fieldElement.Name" :label="fieldElement.Label"
        :required="fieldElement.Required" :loading="fieldElement.Loading" />
    <Skeleton v-if="fieldElement.Loading" height="2rem" />
    <DatePicker v-else v-model="computedValue" :showIcon="fieldElement.ShowIcon" iconDisplay="input"
        :timeOnly="fieldElement.TimeOnly" :showTime="fieldElement.ShowTime" :hourFormat="fieldElement.HourFormat"
        :dateFormat="fieldElement.FormatValue" :minDate="computedMinValue" :maxDate="computedMaxValue"
        :name="fieldElement.Name" :inputId="fieldElement.Name" :disabled="fieldElement.Disabled"
        :placeholder="fieldElement.PlaceHolder" showButtonBar fluid>
        <template #inputicon="slotProps" v-if="fieldElement.ShowCustomIcon">
            <slot :name="fieldElement.Name + 'icon'" :clickCallback="slotProps.clickCallback">
                <i :class="fieldElement.CustomIcon" @click="slotProps.clickCallback" />
            </slot>
        </template>
    </DatePicker>

</template>

<script lang="ts">
import { ref, watch, defineComponent, computed } from 'vue';
import DatePicker from 'primevue/datepicker';
import Skeleton from 'primevue/skeleton';
import awLabel from './awLabel.vue';
import { FieldElementItem } from '../models/fieldelementitem';
export default defineComponent({
    name: 'awDatePicker',
    components: { DatePicker, Skeleton, awLabel },
    props: {
        fieldElement: {
            type: FieldElementItem,
            required: true
        }
    },

    emits: ['update:modelValue', 'update:field'],

    setup(props, { emit }: any) {
        const localValue = ref<Date | string | null>(props.fieldElement.Value);
        const computedValue = computed({
            get: () => {
                // Convert string to Date if necessary  
                if (typeof props.fieldElement.Value === 'string') {
                    return new Date(props.fieldElement.Value);
                }
                return props.fieldElement.Value;
            },
            set: (value) => {
                props.fieldElement.Value = value;
                emit('update:modelValue', value);
            }
        });

        const computedMinValue = computed(() => {
            if (props.fieldElement.MinValue) {
                return new Date(props.fieldElement.MinValue);
            }
            return undefined;
        })

        const computedMaxValue = computed(() => {
            if (props.fieldElement.MaxValue) {
                return new Date(props.fieldElement.MaxValue);
            }
            return undefined;
        })

        watch(
            () => props.fieldElement.Value,
            (newValue) => {
                localValue.value = newValue;
            }
        );

        watch(
            localValue,
            (newValue) => {
                emit('update:modelValue', newValue);
                emit('update:field', props.fieldElement);
            }
        );

        return { computedValue, computedMinValue, computedMaxValue };
    },
});
</script>

<style scoped>
/* Tambahkan gaya khusus jika diperlukan */
</style>
