<template>
    <Form v-slot="$form" :initialValues :resolver="resolver" @submit="onFormSubmit">
        <div class="flex flex-col gap-1">
            <InputText name="username" type="text" placeholder="Username" fluid />
            <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
                $form.username.error.message }}</Message>
        </div>
        <Button type="submit" severity="secondary" label="Submit" />
    </Form>
</template>

<script setup>
    import { onMounted, ref, watch } from 'vue';
    import { zodResolver } from '@primevue/forms/resolvers/zod';
    import { z } from 'zod';
    import { useToast } from 'primevue/usetoast';
    import { FieldElement } from '../models/fieldelement';
    import { useAppStore } from '@/app/stores/app.store';
    import { useZodStore } from '@/app/stores/zod.store';

    const props = defineProps( {
        fieldElements: {
            type: FieldElement,
            required: true
        }
    } );
    const toast = useToast();

    const initialValues = ref( {
        username: ''
    } );

    const resolver = ref( zodResolver(
        z.object( {
            username: z.string().min( 1, { message: 'Username is required via Zod.' } )
        } )
    ) );

    onMounted( () => {
        const appStore = useAppStore();
        const zodStore = useZodStore();
        resolver.value = zodResolver( z.object( zodStore.schema ) );
    } )

    const changeResolver = ( schema ) => {
        if ( schema === 'Zod' ) {
            resolver.value = zodResolver(
                z.object( {
                    username: z.string().min( 1, { message: 'Username is required via Zod.' } )
                } )
            );
        } else if ( schema === 'Yup' ) {
            resolver.value = yupResolver(
                yup.object().shape( {
                    username: yup.string().required( 'Username is required via Yup.' )
                } )
            );
        } else if ( schema === 'Valibot' ) {
            resolver.value = valibotResolver(
                v.object( {
                    username: v.pipe( v.string(), v.minLength( 1, 'Username is required via Valibot.' ) )
                } )
            );
        } else if ( schema === 'SuperStruct' ) {
            resolver.value = superStructResolver(
                s.object( {
                    username: s.nonempty( s.string() )
                } )
            );
        } else if ( schema === 'Custom' ) {
            resolver.value = ( { values } ) => {
                const errors = {};

                if ( !values.username ) {
                    errors.username = [ { message: 'Username is required.' } ];
                }

                return {
                    errors
                };
            };
        }
    }

    const onFormSubmit = ( { valid } ) => {
        if ( valid ) {
            toast.add( { severity: 'success', summary: 'Form is submitted.', life: 3000 } );
        }
    }
</script>
