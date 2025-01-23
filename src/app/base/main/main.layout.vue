<template>
    <div class="flex flex-col h-screen">
        <awHorizontalNavbar />
        <!-- <div class="flex flex-1">
            <awMainContent>
                <router-view />
            </awMainContent>
        </div>
        <awFooter /> -->
        <awMainContent>
            <router-view />
        </awMainContent>
    </div>
</template>

<script lang="ts">
    import awHorizontalNavbar from '@/app/base/components/awHorizontalNavbar.vue';
    import awMainContent from '@/app/base/components/awMainContent.vue';
    import awFooter from '@/app/base/components/awFooter.vue';

    export default {
        name: 'MainLayout',
        components: {
            awHorizontalNavbar,
            awMainContent,
            awFooter
        },
        setup() {

        }
    };
</script>

<style>
/* Tambahkan gaya tambahan jika diperlukan */
</style>