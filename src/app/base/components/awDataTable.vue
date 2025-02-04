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
                    <!-- <Button v-for="btn in fieldElement.Fields.filter(e => e.Type.toLowerCase() === 'button')"
                        type="button" icon=""></Button> -->
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
                <DatePicker v-if="col.Type.toLowerCase() === 'datetime'" v-model="filterModel.value" :inputId="col.Name"
                    @value-change="onfilterCallback(col, filterModel, filterCallback)"
                    :placeholder=placeholder(col.Label) fluid />
                <Checkbox v-else-if="col.Type.toLowerCase() === 'boolean'" v-model="filterModel.value"
                    :inputId="col.Name" @value-change="onfilterCallback(col, filterModel, filterCallback)"
                    :placeholder=placeholder(col.Label) indeterminate binary />
                <component v-else :is="componentFilters(col)" v-model="filterModel.value" :inputId="col.Name"
                    @input="onfilterCallback(col, filterModel, filterCallback)" :placeholder=placeholder(col.Label)
                    :indeterminate="filterModel.value === null" :binary="col.Type.toLowerCase() === 'boolean'" fluid />
            </template>
        </Column>
        <template #paginatorcontainer>
            <Paginator :rows="fieldElement.RowPerPageOptions[0]" :totalRecords="totalCount"
                :rowsPerPageOptions="fieldElement.RowPerPageOptions" @page="pageHandle">
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
import { ref, defineComponent, onMounted, watch } from 'vue';
import { FieldElementItem } from '@/app/base/models/fieldelementitem';
import { FieldElement } from '@/app/base/models/fieldelement';
import Skeleton from 'primevue/skeleton';
import awButton from '@/app/base/components/awButton.vue';
import DataTable, { type DataTableFilterMeta } from 'primevue/datatable';
import Column, { type ColumnFilterModelType } from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import { FilterMatchMode } from '@primevue/core/api';

import Paginator, { type PageState } from 'primevue/paginator';
import InputText from 'primevue/inputtext';
import InputNumber, { type InputNumberInputEvent } from 'primevue/inputnumber';
import DatePicker from 'primevue/datepicker';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';


export default defineComponent({
    name: 'awDataTable',
    components: { DataTable, awButton, Column, ColumnGroup, Row, Skeleton, Paginator, InputText, InputNumber, Checkbox, DatePicker, Button },
    props: {
        fieldElement: {
            type: FieldElement,
            required: true
        },
        pageFilter: {
            type: Object,
            default: {}
        }
    },

    emits: ['update:pagefilter'],

    setup(props, { emit }: any) {
        const dt = ref();
        const data = ref<any[]>([]);
        const multiSortMeta = ref<any[]>([]);
        const totalCount = ref(0);
        const pageFilterLocal = ref<any>({})

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
            console.log(filters.value);
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

            //// Get Data
            //// Total Count get from Backend

            if (Object.keys(props.pageFilter).length === 0) {
                pageFilterLocal.value['Page'] = 0;
                pageFilterLocal.value['PageSize'] = props.fieldElement.RowPerPageOptions[0];
            }
            else {
                pageFilterLocal.value = props.pageFilter;
            }
            console.log('pageFilter', pageFilterLocal.value);
            totalCount.value = data.value.length;
        });

        const componentFilters = (field: FieldElementItem) => {
            if (field.Type.toLowerCase() === 'datetime') {
                return DatePicker;
            } else if (field.Type.toLowerCase() === 'boolean') {
                return Checkbox;
            }
            return InputText;
        }

        const onfilterCallback = (field: FieldElementItem, filterModel: ColumnFilterModelType, filterCallback: () => void) => {
            // filterModel.value = field.Value
            filterCallback();
            console.log('onfilterCallback.field', field);
            console.log('onfilterCallback.filterModel', filterModel);
        }

        const onRowSelect = (event: any) => {
            console.log('onRowSelect -> Click ', event.data);
        };

        const placeholder = (label: string) => {
            return `Search by ${label}`;
        }

        const onSort = async (event: any) => {
            let sortParams: Array<any> = [];
            pageFilterLocal.value['SortParams'] = null;

            multiSortMeta.value = event.multiSortMeta;
            multiSortMeta.value.forEach(e => {
                // console.log('multiSortMeta-Item', e);
                // console.log('multiSortMeta-Item-field', e.field);
                // console.log('multiSortMeta-Item-sort', e.order === 1 ? 'ASC' : 'DESC');
                sortParams.push({ 'Column': e.field, 'Option': e.order === 1 ? 'ASC' : 'DESC' })
            });

            pageFilterLocal.value['SortParams'] = sortParams;
            // console.log('pageFilter', pageFilterLocal.value);
            emit('update:pagefilter', pageFilterLocal.value);
        };

        const columnType = (type: string) => {
            if (type.toLowerCase() === 'datetime') return 'date';
            if (type.toLowerCase() === 'number') return 'numeric';
            if (type.toLowerCase() === 'boolean') return type.toLowerCase();
            return 'text'
        }

        watch(filters, (newValue) => {
            let filterParams: Array<any> = [];
            pageFilterLocal.value['FilterParams'] = null;

            Object.keys(newValue).forEach((e: any) => {
                if (newValue[e]['value'] !== null) {
                    // console.log(e, filters.value[e], filters.value[e]['value']);
                    filterParams.push({ 'Key': e, 'Option': newValue[e]['matchMode'], 'Value': newValue[e]['value'] })
                }
            })
            pageFilterLocal.value['FilterParams'] = filterParams;
            emit('update:pagefilter', pageFilterLocal.value);
        });

        const exportCSV = ($event: MouseEvent) => {
            console.log(dt.value);
            dt.value.exportCSV();
        };

        const updatePagination = (value: number) => {
            console.log('updatePagination', value);
        }

        const pageHandle = (event: PageState) => {
            // console.log('pageHandle', event);
            pageFilterLocal.value['Page'] = event.page;
            pageFilterLocal.value['PageSize'] = event.rows;
            // console.log('pageFilter', pageFilterLocal.value);
            emit('update:pagefilter', pageFilterLocal.value);
        };

        const inputNumberHandle = (input: InputNumberInputEvent) => {
            // console.log('inputNumberHandle', input.originalEvent.srcElement.id)
        }

        const inputNumberModelValue = (val: any) => {
            console.log('inputNumberModelValue', val);
        }

        return { dt, data, filters, onRowSelect, multiSortMeta, onSort, clearFilter, exportCSV, columnType, componentFilters, onfilterCallback, placeholder, pageHandle, totalCount, inputNumberHandle, inputNumberModelValue }
    },
});

</script>

<style scoped></style>