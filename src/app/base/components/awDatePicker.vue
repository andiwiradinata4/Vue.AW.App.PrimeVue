<template>
    <DatePicker v-model="localValue" showIcon iconDisplay="input" :timeOnly="timeOnly" :showTime="showTime"
        :hourFormat="hourFormat" :dateFormat="formatValue" :minDate="minValue" :maxDate="maxValue" :inputId="name">
        <template #inputicon="slotProps" v-if="useCustomIcon">
            <slot :name="name + 'icon'" :clickCallback="slotProps.clickCallback">
                <i :class="customIcon" @click="slotProps.clickCallback" />
            </slot>
        </template>
    </DatePicker>
</template>

<script setup lang="ts">
import { ref, watch, defineComponent } from 'vue';
import DatePicker from 'primevue/datepicker';

export default defineComponent({
    name: 'awDatePicker',
    components: {
        DatePicker
    },
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
            default: 'dd/MM/yyyy'
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
            type: String,
            default: '24'
        },
    },
    emits: ['update:modelValue'],
});

const props = defineProps();
const emit = defineEmits();

const localValue = ref(props.modelValue);

// Watch for changes in modelValue  
watch(
    () => props.modelValue,
    (newValue) => {
        localValue.value = newValue;
    }
);

// Watch for changes in localValue  
watch(
    localValue,
    (newValue) => {
        emit('update:modelValue', newValue);
    }
);  
</script>

<style scoped>
/* Tambahkan gaya khusus jika diperlukan */
</style>
