<template>
    <awLabel v-if="showLabel" :id="name" :label="label" :required="required" :loading="loading" />
    <div v-if="loading" class="animate-pulse h-9 mt-3 bg-slate-400 rounded-lg"></div>
    <div v-else>
        <DatePicker v-model="computedValue" showIcon iconDisplay="input" :timeOnly="timeOnly" :showTime="showTime"
            :hourFormat="hourFormat" :dateFormat="formatValue" :minDate="computedMinValue" :maxDate="computedMaxValue"
            :name="name" :inputId="name" showButtonBar fluid>
            <template #inputicon="slotProps" v-if="useCustomIcon">
                <slot :name="name + 'icon'" :clickCallback="slotProps.clickCallback">
                    <i :class="customIcon" @click="slotProps.clickCallback" />
                </slot>
            </template>
        </DatePicker>
    </div>
</template>

<script lang="ts">
    import { ref, watch, defineComponent, computed } from 'vue';
    import DatePicker from 'primevue/datepicker';
    import awLabel from './awLabel.vue';

    export default defineComponent({
        name: 'awDatePicker',
        components: { DatePicker, awLabel },
        props: {
            name: {
                type: String,
                required: true
            },
            label: {
                type: String,
                default: ''
            },
            showLabel: {
                type: Boolean,
                default: false
            },
            formatValue: {
                type: String,
                default: 'mm/dd/yy'
            },
            minValue: {
                type: [Date, String, null],
                default: null
            },
            maxValue: {
                type: [Date, String, null],
                default: null
            },
            customIcon: {
                type: String,
                default: ''
            },
            useCustomIcon: {
                type: Boolean,
                default: false
            },
            modelValue: {
                type: [Date, String, null],
                default: null
            },
            visible: {
                type: Boolean,
                default: true
            },
            timeOnly: {
                type: Boolean,
                default: false
            },
            showTime: {
                type: Boolean,
                default: true
            },
            hourFormat: {
                type: String as () => "24" | "12" | undefined,
                default: '24'
            },
            required: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            }
        },

        emits: ['update:modelValue'],

        setup(props, { emit }: any) {
            const localValue = ref<Date | string | null>(props.modelValue);

            const computedValue = computed({
                get: () => {
                    // Convert string to Date if necessary  
                    if (typeof props.modelValue === 'string') {
                        return new Date(props.modelValue);
                    }
                    return props.modelValue;
                },
                set: (value) => {
                    emit('update:modelValue', value);
                    // // Convert Date back to string if necessary  
                    // if (value instanceof Date) {
                    //     emit('update:modelValue', value.toISOString()); // or format as needed  
                    // } else {
                    //     emit('update:modelValue', value);
                    // }
                }
            });

            const computedMinValue = computed(() => {
                if (props.minValue) {
                    return new Date(props.minValue);
                }
                return undefined;
            })

            const computedMaxValue = computed(() => {
                if (props.maxValue) {
                    return new Date(props.maxValue);
                }
                return undefined;
            })

            watch(
                () => props.modelValue,
                (newValue) => {
                    localValue.value = newValue;
                }
            );

            watch(
                localValue,
                (newValue) => {
                    emit('update:modelValue', newValue);
                }
            );

            return { computedValue, computedMinValue, computedMaxValue };
        },
    });
</script>

<style scoped>
/* Tambahkan gaya khusus jika diperlukan */
</style>
