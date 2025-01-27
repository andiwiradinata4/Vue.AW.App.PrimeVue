<template>
    <DataTable :value="data" :loading="fieldElement.Loading" sortMode="multiple" removableSort paginator
        :rows="fieldElement.RowPerPageOptions[0]" :rowsPerPageOptions="fieldElement.RowPerPageOptions"
        tableStyle="min-width: 50rem">
        <template v-if="fieldElement.ShowLabel" #header>
            <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="text-xl font-bold">{{ fieldElement.Label }}</span>
            </div>
        </template>
        <Column v-for="col of fieldElement.Fields" :key="col.Name" :field="col.Name" :header="col.Label" sortable>
        </Column>
    </DataTable>
</template>

<script lang="ts">
    import { ref, defineComponent, computed } from 'vue';
    import { FieldElementItem } from '../models/fieldelementitem';
    import Skeleton from 'primevue/skeleton';
    import awButton from '../components/awButton.vue';
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import ColumnGroup from 'primevue/columngroup';   // optional
    import Row from 'primevue/row';                   // optional
    import { FilterMatchMode } from '@primevue/core/api';

    // import { ProductService } from '@/service/ProductService';

    export default defineComponent({
        name: 'awDataTable',
        components: { DataTable, awButton, Column, ColumnGroup, Row, Skeleton },
        props: {
            fieldElement: {
                type: FieldElementItem,
                required: true
            }
        },

        setup(props, { emit }: any) {
            const data = ref([
                {
                    'Id': 1,
                    'Name': 'Andi',
                    'Category': 'Personal'
                },
                {
                    'Id': 2,
                    'Name': 'Andi',
                    'Category': 'Personal'
                },
                {
                    'Id': 3,
                    'Name': 'Andi',
                    'Category': 'Personal'
                },
                {
                    'Id': 4,
                    'Name': 'Andi',
                    'Category': 'Personal'
                },
                {
                    'Id': 5,
                    'Name': 'Andi',
                    'Category': 'Personal'
                },
                {
                    'Id': 6,
                    'Name': 'Andi',
                    'Category': 'Personal'
                },
                {
                    'Id': 7,
                    'Name': 'Andi',
                    'Category': 'Personal'
                },
                {
                    'Id': 8,
                    'Name': 'Andi',
                    'Category': 'Personal'
                },
                {
                    'Id': 9,
                    'Name': 'Andi',
                    'Category': 'Personal'
                },
                {
                    'Id': 10,
                    'Name': 'Andi',
                    'Category': 'Personal'
                },
                {
                    'Id': 11,
                    'Name': 'Andi',
                    'Category': 'Personal'
                },
                {
                    'Id': 12,
                    'Name': 'Andi',
                    'Category': 'Personal'
                },
                {
                    'Id': 13,
                    'Name': 'Andi',
                    'Category': 'Personal'
                },
                {
                    'Id': 14,
                    'Name': 'Andi',
                    'Category': 'Personal'
                },
                {
                    'Id': 15,
                    'Name': 'Andi',
                    'Category': 'Personal'
                },
                {
                    'Id': 16,
                    'Name': 'Andi',
                    'Category': 'Personal'
                },
                {
                    'Id': 17,
                    'Name': 'Andi',
                    'Category': 'Personal'
                },
                {
                    'Id': 18,
                    'Name': 'Andi',
                    'Category': 'Personal'
                },

            ]);

            // const filters = ref({});

            const computedFilters = computed(() => {
                let filters: any = {};
                if (props.fieldElement) {
                    props.fieldElement.Fields.forEach(e => {
                        if (e.Type.toLowerCase() === 'datetime') {
                            filters[e.Name] = { value: null, matchMode: FilterMatchMode.BETWEEN };

                        } else {
                            filters[e.Name] = { value: null, matchMode: FilterMatchMode.CONTAINS };
                        }

                    })

                }

            })


            return { data, computedFilters };
        },
    });

</script>
