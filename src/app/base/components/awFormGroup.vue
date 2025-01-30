<template>
    <div class="card flex justify-center">
        <Toast /> <!-- Make sure you register this component globally -->

        <Form v-slot="$form" :initialValues="initialValues" :resolver="resolver" @submit="onFormSubmit"
            class="flex flex-col gap-4 w-full sm:w-56">
            <div class="flex flex-col gap-1">
                <InputText name="username" type="text" placeholder="Username" fluid />
                <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.username?.error?.message }}
                </Message>
            </div>
            <Button type="submit" severity="secondary" label="Submit" />
        </Form>
    </div>
</template>

<script lang="ts">
    import { defineComponent, reactive } from 'vue';
    import { useToast } from 'primevue/usetoast';
    import Toast from 'primevue/toast'; // Import this component
    import Form from '@primevue/forms';  // Ensure correct import for Form component

    export default defineComponent({
        name: 'awFormGroup',
        components: { Toast, Form },
        setup() {
            const toast = useToast();

            const initialValues = reactive({
                username: ''
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
                onFormSubmit
            };
        },
    });
</script>
