<template>
    <div class="card flex justify-center">
        <Toast />
        <awDataTable :fieldElement="appStore.fieldElement!" />

    </div>
</template>

<script lang="ts">
    import { defineComponent, onBeforeMount, onMounted, reactive } from 'vue';
    import { useToast } from 'primevue/usetoast';
    import Toast from 'primevue/toast'; // Import this component
    import awDataTable from '@/app/base/components/awDataTable.vue';
    import { useAppStore } from '@/app/stores/app.store';
    import AwDataTable from '@/app/base/components/awDataTable.vue';

    export default defineComponent({
        name: 'awFormListGroup',
        components: { Toast, awDataTable },
        props: {},
        setup() {
            const toast = useToast();
            const appStore = useAppStore();

            const initialValues = reactive({
                username: ''
            });

            onBeforeMount(() => {
                appStore.init('', '', '', '', '', '');
            })

            onMounted(() => {
                appStore.getFieldElementByCode('');
                appStore.getDataPageDefault();

            });


            const resolver = ({ values }: any) => {
                const errors: any = {};

                if (!values.username) {
                    errors.username = [{ message: 'Username is required.' }];
                }

                return {
                    errors
                };
            };

            const onFormSubmit = ({ valid }: any) => {
                if (valid) {
                    toast.add({
                        severity: 'success',
                        summary: 'Form is submitted.',
                        life: 3000
                    });
                }
            };

            return {
                initialValues,
                resolver,
                onFormSubmit, appStore
            };
        },
    });
</script>
