import { defineStore } from 'pinia';
import { AppPost, AppPut, AppDelete } from '@/app/services/app.service';
import { useRouter } from 'vue-router';


export const useActionStore = defineStore('actionstore', {
    state: () => ({
        beforeCreate: null as Function | null,
        afterCreate: null as Function | null,
        beforeUpdate: null as Function | null,
        afterUpdate: null as Function | null,
        beforeDelete: null as Function | null,
        afterDelete: null as Function | null,
        data: null as any,
        baseUrl: '' as string,
        url: '' as string
    }),
    actions: {
        async defaultBeforeCreate() {
            console.log('Default Before Create: Preparing Data ...');
        },
        async defaultAfterCreate() {
            console.log('Default After Create: Clean Up ...');
        },
        async setBeforeCreate(customFunction: Function) {
            this.beforeCreate = customFunction;
        },
        async setAfterCreate(customFunction: Function) {
            this.afterCreate = customFunction;
        },
        async defaultBeforeUpdate() {
            console.log('Default Before Update: Preparing Data ...');
        },
        async defaultAfterUpdate() {
            console.log('Default After Update: Clean Up ...');
        },
        async setBeforeUpdate(customFunction: Function) {
            this.beforeUpdate = customFunction;
        },
        async setAfterUpdate(customFunction: Function) {
            this.afterUpdate = customFunction;
        },
        async defaultBeforeDelete() {
            console.log('Default Before Delete: Preparing Data ...');
        },
        async defaultAfterDelete() {
            console.log('Default After Delete: Clean Up ...');
        },
        async setBeforeDelete(customFunction: Function) {
            this.beforeDelete = customFunction;
        },
        async setAfterDelete(customFunction: Function) {
            this.afterDelete = customFunction;
        },
        resetOverrides() {
            this.beforeCreate = null;
            this.afterCreate = null;
            this.beforeUpdate = null;
            this.afterUpdate = null;
            this.beforeDelete = null;
            this.afterDelete = null;
        },
        async save(baseUrl: string, url: string, data: any, referencesId: string) {
            if (referencesId) {
                await this.update(baseUrl, url, data, referencesId);
            } else {
                await this.create(baseUrl, url, data);
            }
        },
        async create(baseUrl: string, url: string, data: any) {
            this.baseUrl = baseUrl;
            this.url = url;
            this.data = data;

            try {
                if (this.beforeCreate) {
                    await this.beforeCreate();
                } else {
                    await this.defaultBeforeCreate();
                }

                const response = await AppPost(baseUrl, url, data);

                if (this.afterCreate) {
                    await this.afterCreate();
                } else {
                    await this.defaultAfterCreate();
                }
            } catch (e) {
                throw e;
            }
        },
        async update(baseUrl: string, url: string, data: any, referencesId: string) {
            this.baseUrl = baseUrl;
            this.url = url;
            this.data = data;

            try {
                if (this.beforeUpdate) {
                    await this.beforeUpdate();
                } else {
                    await this.defaultBeforeUpdate();
                }

                const response = await AppPut(baseUrl, `${url}/${referencesId}`, data);

                if (this.afterUpdate) {
                    await this.afterUpdate();
                } else {
                    await this.defaultAfterUpdate();
                }
            } catch (e) {
                throw e;
            }
        },
        async delete(baseUrl: string, url: string, referencesId: string) {
            this.baseUrl = baseUrl;
            this.url = url;
            this.data = null;

            try {
                if (this.beforeDelete) {
                    await this.beforeDelete();
                } else {
                    await this.defaultBeforeDelete();
                }

                const response = await AppDelete(baseUrl, `${url}/${referencesId}`);

                if (this.afterDelete) {
                    await this.afterDelete();
                } else {
                    await this.defaultAfterDelete();
                }
            } catch (e) {
                throw e;
            }
        },
        close() {
            const router = useRouter();
            router.back();
        }
    }
});