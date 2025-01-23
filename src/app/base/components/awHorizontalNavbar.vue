<template>
    <div class="horizontal-navbar">
        <Drawer v-model:visible="visible" header="Drawer">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.</p>
        </Drawer>
        <Button icon="pi pi-bars" @click="visible = true" />
        <h1 class="ml-2 font-semibold text-slate-700 text-xl">ERPS</h1>
    </div>
</template>

<script setup>
    import Button from 'primevue/button';
    import Drawer from 'primevue/drawer';
    import { ref } from 'vue';
    const visible = ref( false );
</script>

<style scoped>
.horizontal-navbar {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
}
</style>