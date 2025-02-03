<template>
    <awLabel v-if="fieldElement.ShowLabel" :id="fieldElement.Name" :label="fieldElement.Label"
        :required="fieldElement.Required" :loading="fieldElement.Loading">
        <Checkbox v-model="fieldElement.Value" indeterminate binary @update:modelValue="updateModelValueHandle"
            class="ml-2" fluid />
    </awLabel>
    <div v-else>
        <Skeleton v-if="fieldElement.Loading" height="2rem" />
        <Checkbox v-else v-model="fieldElement.Value" indeterminate binary @update:modelValue="updateModelValueHandle"
            fluid />
    </div>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import Checkbox from 'primevue/checkbox';
    import Skeleton from 'primevue/skeleton';
    import awLabel from './awLabel.vue';
    import { FieldElementItem } from '../models/fieldelementitem';
    export default defineComponent({
        name: 'awInputText',
        components: { Checkbox, Skeleton, awLabel },
        props: {
            fieldElement: {
                type: FieldElementItem,
                required: true
            }
        },

        emits: ['update:modelValue', 'update:field'],

        setup(props, { emit }: any) {
            const updateModelValueHandle = (value: any) => {
                emit('update:field', props.fieldElement);
            }

            return { updateModelValueHandle };
        },
    });
</script>
