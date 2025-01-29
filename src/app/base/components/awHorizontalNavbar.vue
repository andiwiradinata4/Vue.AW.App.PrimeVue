<template>
    <div class="horizontal-navbar">
        <Drawer v-model:visible="visible" header="ERPS" class="!w-full md:!w-80 lg:!w-[30rem]">
            <awPanelMenu :fieldElement="fieldMenuItem" />
        </Drawer>
        <Button icon="pi pi-bars" @click="visible = true" />
        <h1 class="ml-4 font-semibold text-xl">ERPS</h1>
    </div>
</template>

<script lang="ts">
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import awPanelMenu from './awPanelMenu.vue';
import { defineComponent, ref } from 'vue';
import { FieldElementItem } from '../models/fieldelementitem';
export default defineComponent({
    name: 'awHorizontalNavbar',
    components: { Button, Drawer, awPanelMenu },
    setup(props, { emit }: any) {
        const visible = ref(false);
        const fieldMenuItem = new FieldElementItem({

        })

        return { visible, fieldMenuItem };
    },

});

</script>

<style scoped>
.horizontal-navbar {
    display: flex;
    align-items: center;
    padding: 1rem;
    /* background-color: #f8f9fa; */
    /* border-bottom: 1px solid #dee2e6; */
}
</style>