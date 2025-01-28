<template>
    <DataTable :value="data" ref="dt" sortMode="multiple" removableSort paginator
        :rows="fieldElement.RowPerPageOptions[0]" :rowsPerPageOptions="fieldElement.RowPerPageOptions"
        v-model:filters="filters" filterDisplay="row" selectionMode="single" resizableColumns columnResizeMode="fit"
        showGridlines @rowSelect="onRowSelect" :multiSortMeta="multiSortMeta" @sort="onSort"
        tableStyle="min-width: 50rem" scrollable :scrollHeight="fieldElement.ScrollHeight">
        <template v-if="fieldElement.ShowLabel" #header>
            <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="text-xl font-bold mr-2">{{ fieldElement.Label }}</span>
                <span>
                    <Button type="button" icon="pi pi-filter-slash" class="mr-2 mb-2" label="Clear" outlined
                        @click="clearFilter()" />
                    <Button icon="pi pi-external-link" label="Export" class="mr-2 mb-2" outlined
                        @click="exportCSV($event)" />
                </span>
            </div>
        </template>
        <template #loading>
            Loading ... Please wait ...
        </template>
        <Column v-for="col of fieldElement.Fields" :key="col.Name" :field="col.Name" :header="col.Label"
            :dataType="columnType(col.Type)" sortable>
            <template #body="{ data }">
                <Skeleton v-if="fieldElement.Loading" />
                <div v-else>
                    <i v-if="col.Type.toLowerCase() === 'boolean'" class="pi"
                        :class="{ 'pi-check-circle text-green-500 ': data[col.Name], 'pi-times-circle text-red-500': !data[col.Name] }"></i>
                    <span v-else>{{ data[col.Name] }}</span>
                </div>
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <component :is="componentFilters(col)" v-model="filterModel.value" :inputId="col.Name"
                    @input="onfilterCallback(col, filterModel, filterCallback)"
                    @update:modelValue="onfilterCallback(col, filterModel, filterCallback)"
                    :placeholder=placeholder(col.Label) :indeterminate="filterModel.value === null"
                    :binary="col.Type.toLowerCase() === 'boolean'" fluid />
            </template>
        </Column>
        <template #paginatorcontainer>
            <Paginator :rows="fieldElement.RowPerPageOptions[0]" :totalRecords="data.length"
                :rowsPerPageOptions="fieldElement.RowPerPageOptions" @update:first="updatePagination"
                @update:rows="updatePagination" @page="pageHandle">
                <template #start="slotProps">
                    Page: {{ slotProps.state.page }}
                    First: {{ slotProps.state.first }}
                    Rows: {{ slotProps.state.rows }}
                </template>
            </Paginator>
        </template>
    </DataTable>
</template>

<script lang="ts">
    import { ref, defineComponent, onMounted, watch, shallowRef } from 'vue';
    import { FieldElementItem } from '../models/fieldelementitem';
    import Skeleton from 'primevue/skeleton';
    import awButton from '../components/awButton.vue';
    import DataTable from 'primevue/datatable';
    import Column, { type ColumnFilterModelType } from 'primevue/column';
    import ColumnGroup from 'primevue/columngroup';
    import Row from 'primevue/row';
    import { FilterMatchMode } from '@primevue/core/api';

    import Paginator, { type PageState } from 'primevue/paginator';
    import InputText from 'primevue/inputtext';
    import InputNumber from 'primevue/inputnumber';
    import DatePicker from 'primevue/datepicker';
    import Button from 'primevue/button';
    import Checkbox from 'primevue/checkbox';

    export default defineComponent({
        name: 'awDataTable',
        components: { DataTable, awButton, Column, ColumnGroup, Row, Skeleton, Paginator, InputText, DatePicker, Button },
        props: {
            fieldElement: {
                type: FieldElementItem,
                required: true
            }
        },

        setup(props, { emit }: any) {
            const dt = ref();
            const data = ref<any[]>([]);
            const multiSortMeta = ref<any[]>([]);

            const generateFilters = () => {
                let f: any = {};
                props.fieldElement.Fields.forEach(e => {
                    if (e.Type.toLowerCase() === 'datetime') {
                        f[e.Name] = { value: null, matchMode: FilterMatchMode.DATE_IS };
                    } else if (e.Type.toLowerCase() === 'number') {
                        f[e.Name] = { value: null, matchMode: FilterMatchMode.EQUALS };
                    } else if (e.Type.toLowerCase() === 'boolean') {
                        f[e.Name] = { value: null, matchMode: FilterMatchMode.EQUALS };
                    } else {
                        f[e.Name] = { value: null, matchMode: FilterMatchMode.STARTS_WITH };
                    }
                });
                return f;
            }

            const filters = ref(generateFilters());

            const initFilters = () => {
                filters.value = generateFilters();
            }

            const clearFilter = () => {
                initFilters();
            };

            onMounted(() => {
                for (let i = 1; i < 1000; i++) {
                    data.value.push(
                        {
                            'Id': i,
                            'Name': 'Andi ' + i,
                            'Category': 'Personal ' + i,
                            'CreatedDate': new Date(2024 + i, 1, 1),
                            'IsDeleted': i % 2 === 0 ? false : true
                        });
                }
            });

            const componentFilters = (field: FieldElementItem) => {
                if (field.Type.toLowerCase() === 'text') {
                    return InputText;
                } else if (field.Type.toLowerCase() === 'number') {
                    return InputNumber;
                } else if (field.Type.toLowerCase() === 'datetime') {
                    return DatePicker;
                } else if (field.Type.toLowerCase() === 'boolean') {
                    return Checkbox;
                }
                return InputText;
            }

            const onfilterCallback = (field: FieldElementItem, filterModel: ColumnFilterModelType, filterCallback: () => void) => {
                filterCallback();
                console.log(field.Name, filterModel);
            }

            const onRowSelect = (event: any) => {
                console.log(event.data);
            };

            const placeholder = (label: string) => {
                return `Search by ${label}`;
            }

            const onSort = async (event: any) => {
                multiSortMeta.value = event.multiSortMeta;
                multiSortMeta.value.forEach(e => {
                    console.log('multiSortMeta-Item', e);
                    console.log('multiSortMeta-Item-field', e.field);
                    console.log('multiSortMeta-Item-sort', e.order === 1 ? 'ASC' : 'DESC');
                });
            };

            const columnType = (type: string) => {
                if (type.toLowerCase() === 'datetime') return 'date';
                if (type.toLowerCase() === 'number') return 'numeric';
                if (type.toLowerCase() === 'boolean') return type.toLowerCase();
                return 'text'
            }

            watch(filters, (newValue) => {
                console.log('filters', newValue);
                Object.keys(filters.value).forEach((e: any) => {
                    console.log(e, filters.value[e], filters.value[e]['value']);
                })
            });

            const exportCSV = ($event: MouseEvent) => {
                console.log($event);
                dt.value.exportCSV();
            };

            const updatePagination = (value: number) => {
                console.log('updatePagination', value);
            }

            const pageHandle = (event: PageState) => {
                console.log('pageHandle', event);
            }

            return { data, filters, onRowSelect, multiSortMeta, onSort, clearFilter, exportCSV, columnType, componentFilters, onfilterCallback, placeholder, updatePagination, pageHandle }
        },
    });

</script>

<style scoped></style>