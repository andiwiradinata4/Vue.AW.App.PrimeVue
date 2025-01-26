<template>
    <!-- <BaseDataTable :columns="columns" :data="data" /> -->
    <h1 class="mb-10">Display Component</h1>
    <awDatePicker name="Date" label="DatePicker" v-model="dateValue" :showLabel=true :required=true
        :loading="loading" />
    <Button type="button" severity="danger" label="Search" icon="pi pi-search" :loading="loading" @click="load" />

</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import BaseMainContent from '@/app/base/components/awMainContent.vue';
import BaseFooter from '@/app/base/components/awFooter.vue';
// import BaseDataTable from '@/app/components/basedatatable.vue';
// import { DataColumn } from '@/app/models/datacolumn';
import awDatePicker from '../components/awDatePicker.vue';
import Button from 'primevue/button';

export default defineComponent({
    name: 'MainLayout',
    components: {
        // BaseVerticalNavbar,
        BaseMainContent,
        BaseFooter,
        awDatePicker,
        Button
        // BaseDataTable
    },
    setup() {
        // // const columns = [
        // //     // new DataColumn({ Label: 'Name', Key: 'name', Type: 'text' }),
        // //     // new DataColumn({ Label: 'Age', Key: 'age', Type: 'number' }),
        // //     // new DataColumn({ Label: 'Active', Key: 'active', Type: 'boolean' }),
        // //     // new DataColumn({ Label: 'Join Date', Key: 'joinDate', Type: 'date' }),
        // //     // new DataColumn({ Label: 'Terms Accepted', Key: 'termsAccepted', Type: 'checkbox' })
        // // ];

        // const data = [
        //     // new DataItem({ name: 'John Doe', age: 30, active: true, joinDate: '2023-01-01', termsAccepted: true }),
        //     // new DataItem({ name: 'Jane Smith', age: 25, active: false, joinDate: '2023-02-15', termsAccepted: false })
        // ];

        // return {
        //     // columns,
        //     // data,
        // };
        const dateValue = ref<Date>();
        const loading = ref(false);

        const load = () => {
            loading.value = true;
            setTimeout(() => {
                loading.value = false;
            }, 2000);
            console.log(dateValue);
        };
        return { dateValue, loading, load }
    },
});
</script>

<style>
/* Tambahkan gaya tambahan jika diperlukan */
</style>