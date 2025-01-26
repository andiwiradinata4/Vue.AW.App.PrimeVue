<template>
    <awLabel v-if="fieldElement.ShowLabel" :id="fieldElement.Name" :label="fieldElement.Label"
        :required="fieldElement.Required" :loading="fieldElement.Loading" />
    <Skeleton v-if="fieldElement.Loading" height="4rem" />
    <TextArea v-else v-model="fieldElement.Value" :min="fieldElement.MinValue" :max="fieldElement.MaxValue"
        :disabled="fieldElement.Disabled" :placeholder="fieldElement.PlaceHolder" autoResize fluid>
    </TextArea>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import TextArea from 'primevue/textarea';
    import Skeleton from 'primevue/skeleton';
    import awLabel from './awLabel.vue';
    import { FieldElementItem } from '../models/fieldelementitem';
    export default defineComponent({
        name: 'awTextArea',
        components: { TextArea, Skeleton, awLabel },
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
