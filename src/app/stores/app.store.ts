import { defineStore } from "pinia";
import { GetFieldElement, GetFieldElementByCode, AppGet, AppPost, AppPut, AppDelete } from '@/app/services/app.service';
import { useRouter } from 'vue-router';
import { FieldElement } from "@/app/base/models/fieldelement";
import { Message, type MessageObject } from "@/app/base/models/messageobject";
import { DataColumn } from '@/app/base/models/datacolumn';
import { PageDTO } from "@/app/base/DTOs/page.dto";
import type { AxiosError } from "axios";
import { useLoadingStore } from '@/app/stores/loading.store';

export const useAppStore = defineStore('appstore', {
    state: () => ({
        baseUrl: '' as string,
        url: '' as string,
        referencesId: '' as string,
        fieldElementCode: '' as string,
        routeNameHeader: '' as string,
        routeNameDetail: '' as string,
        fieldElement: null as FieldElement | null,
        fieldColumns: Array<DataColumn>(),
        data: null as any,
        dataPage: null as PageDTO | null,
        loading: null as Boolean | null,
        errorMessages: Array<Message>(),
        beforeCreate: null as Function | null,
        afterCreate: null as Function | null,
        beforeUpdate: null as Function | null,
        afterUpdate: null as Function | null,
        beforeDelete: null as Function | null,
        afterDelete: null as Function | null,
        onSuccess: null as Function | null,
        beforePageInitialise: null as Function | null,
        afterPageInitialise: null as Function | null,
        beforeLoadData: null as Function | null,
        afterLoadData: null as Function | null,
        pageFilter: null as any | { [Key: string]: any },
    }),
    actions: {
        init(baseUrl: string, url: string, fieldElementCode: string, routeNameHeader?: string, routeNameDetail?: string, referencesId?: string, pageFilter?: { [Key: string]: any }) {
            this.baseUrl = baseUrl;
            this.url = url;
            this.fieldElementCode = fieldElementCode;
            if (routeNameHeader) this.routeNameHeader = routeNameHeader;
            if (routeNameDetail) this.routeNameDetail = routeNameDetail;
            if (referencesId) this.referencesId = referencesId;
            if (pageFilter) {
                this.pageFilter = pageFilter;
            } else {
                this.pageFilter = { 'Page': 1, 'PageSize': 10 };
            }

            // console.log('this.baseUrl', this.baseUrl);
            // console.log('this.url', this.url);
            // console.log('this.fieldElementCode', this.fieldElementCode);
            // console.log('this.routeNameHeader', this.routeNameHeader);
            // console.log('this.routeNameDetail', this.routeNameDetail);
            // console.log('this.referencesId', this.referencesId);
            // console.log('this.pageFilter', this.pageFilter);
        },

        setBaseUrl(baseUrl: string) {
            this.baseUrl = baseUrl;
        },
        setUrl(url: string) {
            this.url = url;
        },
        setReferencesId(referencesId: string) {
            this.referencesId = referencesId;
        },
        setFieldElementCode(fieldElementCode: string) {
            this.fieldElementCode = fieldElementCode;
        },
        setRouteNameHeader(routeNameHeader: string) {
            this.routeNameHeader = routeNameHeader;
        },
        setRouteNameDetail(routeNameDetail: string) {
            this.routeNameDetail = routeNameDetail;
        },
        setPageFilter(body: { [Key: string]: any }) {
            if (body) {
                Object.keys(body).forEach(e => {
                    if (this.pageFilter) {
                        this.pageFilter[e] = body[e];
                    }
                });
            }
        },
        async getFieldElement(id: string) {
            try {
                this.loading = true;
                const response = await GetFieldElement(id);
                this.fieldElement = new FieldElement(response.data);
                if (this.fieldElement) this.setFieldColumns(this.fieldElement);
            } catch (e) {
                if ((e as AxiosError).response) {
                    this.errorMessages = ((e as AxiosError)?.response?.data as MessageObject).Errors;
                } else {
                    this.errorMessages.push(new Message({ Description: (e as AxiosError).message }))
                }
                throw e;
            } finally {
                this.loading = false;
            }
        },
        async getFieldElementByCode(code: string) {
            try {
                this.loading = true;
                const response = await GetFieldElementByCode(code);
                this.fieldElement = new FieldElement(response.data);
            } catch (e) {
                if ((e as AxiosError).response) {
                    this.errorMessages = ((e as AxiosError)?.response?.data as MessageObject).Errors;
                } else {
                    this.errorMessages.push(new Message({ Description: (e as AxiosError).message }))
                }
                throw e;
            } finally {
                this.loading = false;
            }
        },

        setFieldColumns(fe: FieldElement) {
            this.fieldColumns = [];
            fe.Fields.forEach(ff => {
                if (ff.GridVisible) this.fieldColumns.push(new DataColumn({ Label: ff.Label, Key: ff.Name, Type: ff.Type }));
                ff.Fields.forEach(ff1 => {
                    if (ff1.GridVisible) this.fieldColumns.push(new DataColumn({ Label: ff1.Label, Key: ff1.Name, Type: ff1.Type }));

                    ff1.Fields.forEach(ff2 => {
                        if (ff2.GridVisible) this.fieldColumns.push(new DataColumn({ Label: ff2.Label, Key: ff2.Name, Type: ff2.Type }));

                        ff2.Fields.forEach(ff3 => {
                            if (ff3.GridVisible) this.fieldColumns.push(new DataColumn({ Label: ff3.Label, Key: ff3.Name, Type: ff3.Type }));
                        })
                    })
                })
            });
        },

        async getDataPage(baseUrl: string, url: string, body: { [Key: string]: any }) {
            const loadingStore = useLoadingStore();
            try {
                loadingStore.startLoading();
                this.pageFilter['Columns'] = this.pageFilter['Columns'] ?? this.fieldColumns.map(e => e.Key).join(",");
                if (body) {
                    Object.keys(body).forEach(e => {
                        if (this.pageFilter) {
                            this.pageFilter[e] = body[e];
                        }
                    });
                }
                const response = await AppPost(baseUrl, url + '/page', this.pageFilter);
                this.dataPage = new PageDTO(response.data);
                console.log(this.dataPage);
            } catch (e) {
                if ((e as AxiosError).response) {
                    this.errorMessages = ((e as AxiosError)?.response?.data as MessageObject).Errors;
                } else {
                    this.errorMessages.push(new Message({ Description: (e as AxiosError).message }))
                }
                throw e;
            } finally {
                loadingStore.stopLoading();
            }
        },

        async getDataPageDefault() {
            const loadingStore = useLoadingStore();
            try {
                loadingStore.startLoading();
                const response = await AppPost(this.baseUrl, this.url + '/page', this.pageFilter);
                this.dataPage = new PageDTO(response.data);
                console.log(this.dataPage);
            } catch (e) {
                if ((e as AxiosError).response) {
                    this.errorMessages = ((e as AxiosError)?.response?.data as MessageObject).Errors;
                } else {
                    this.errorMessages.push(new Message({ Description: (e as AxiosError).message }))
                }
                throw e;
            } finally {
                loadingStore.stopLoading();
            }
        },

        async getDataById(baseUrl: string, url: string, id: string) {
            const loadingStore = useLoadingStore();
            try {
                loadingStore.startLoading();
                const response = await AppGet(baseUrl, `${url}/${id}`);
                this.data = response.data;
                this.mapDataToFieldElement();
            } catch (e) {
                if ((e as AxiosError).response) {
                    this.errorMessages = ((e as AxiosError)?.response?.data as MessageObject).Errors;
                } else {
                    this.errorMessages.push(new Message({ Description: (e as AxiosError).message }))
                }
                throw e;
            } finally {
                loadingStore.stopLoading();
            }
        },

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

        async save(baseUrl: string, url: string, data: any, referencesId: string, onSuccess?: () => void) {
            this.mapFieldElementToData();
            if (referencesId) {
                await this.update(baseUrl, url, data, referencesId);
            } else {
                await this.create(baseUrl, url, data);
            }
            if (onSuccess) onSuccess();
        },

        async create(baseUrl: string, url: string, data: any) {
            this.baseUrl = baseUrl;
            this.url = url;
            this.data = data;
            const loadingStore = useLoadingStore();
            try {
                loadingStore.startLoading();
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
                if ((e as AxiosError).response) {
                    this.errorMessages = ((e as AxiosError)?.response?.data as MessageObject).Errors;
                } else {
                    this.errorMessages.push(new Message({ Description: (e as AxiosError).message }))
                }
                throw e;
            } finally {
                loadingStore.stopLoading();
            }
        },

        async update(baseUrl: string, url: string, data: any, referencesId: string) {
            this.baseUrl = baseUrl;
            this.url = url;
            this.data = data;
            const loadingStore = useLoadingStore();
            try {
                loadingStore.startLoading();
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
                if ((e as AxiosError).response) {
                    this.errorMessages = ((e as AxiosError)?.response?.data as MessageObject).Errors;
                } else {
                    this.errorMessages.push(new Message({ Description: (e as AxiosError).message }))
                }
                throw e;
            } finally {
                loadingStore.stopLoading();
            }
        },

        async delete(baseUrl: string, url: string, referencesId: string) {
            this.baseUrl = baseUrl;
            this.url = url;
            this.data = null;
            const loadingStore = useLoadingStore();
            try {
                loadingStore.startLoading();
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
                if ((e as AxiosError).response) {
                    this.errorMessages = ((e as AxiosError)?.response?.data as MessageObject).Errors;
                } else {
                    this.errorMessages.push(new Message({ Description: (e as AxiosError).message }))
                }
                throw e;
            } finally {
                loadingStore.stopLoading();
            }
        },

        mapDataToFieldElement() {
            Object.keys(this.data).forEach(e => {
                if (this.fieldElement) {
                    this.fieldElement.Fields.forEach(ff => {
                        if (ff.Name == e) ff.Value = this.data[e];
                        ff.Fields.forEach(ff1 => {
                            if (ff1.Name == e) ff1.Value = this.data[e];

                            ff1.Fields.forEach(ff2 => {
                                if (ff2.Name == e) ff2.Value = this.data[e];

                                ff2.Fields.forEach(ff3 => {
                                    if (ff3.Name == e) ff3.Value = this.data[e];
                                })
                            })
                        })
                    });
                }
            });
        },

        mapFieldElementToData() {
            Object.keys(this.data).forEach(e => {
                if (this.fieldElement) {
                    this.fieldElement.Fields.forEach(ff => {
                        if (ff.Name == e) this.data[e] = ff.Value;
                        ff.Fields.forEach(ff1 => {
                            if (ff1.Name == e) this.data[e] = ff1.Value;

                            ff1.Fields.forEach(ff2 => {
                                if (ff2.Name == e) this.data[e] = ff2.Value;

                                ff2.Fields.forEach(ff3 => {
                                    if (ff3.Name == e) this.data[e] = ff3.Value;
                                })
                            })
                        })
                    });
                }
            });
        },

        beforePageInitialiseDefault() {
            console.log('beforePageInitialise');
        },

        afterPageInitialiseDefault() {
            console.log('afterPageInitialise');
        },

        beforeLoadDataDefault() {
            console.log('beforeLoadData');
        },

        afterLoadDataDefault() {
            console.log('afterLoadData');
        },

        async loadPage() {
            this.loading = true;
            try {
                if (this.beforePageInitialise) {
                    this.beforePageInitialise();
                } else {
                    this.beforePageInitialiseDefault();
                }

                if (this.beforeLoadData) {
                    this.beforeLoadData();
                } else {
                    this.beforeLoadDataDefault();
                }

                await this.getFieldElementByCode(this.fieldElementCode);
                if (this.fieldElement) this.setFieldColumns(this.fieldElement);
                await this.getDataPage(this.baseUrl, this.url, this.pageFilter);

                if (this.afterLoadData) {
                    this.afterLoadData();
                } else {
                    this.afterLoadDataDefault();
                }

                if (this.afterPageInitialise) {
                    this.afterPageInitialise();
                } else {
                    this.afterPageInitialiseDefault();
                }
            } catch (e) {
                throw e;
            } finally {
                this.loading = false;
            }
        },

        async loadPageDetail() {
            this.loading = true;
            try {
                if (this.beforePageInitialise) {
                    this.beforePageInitialise();
                } else {
                    this.beforePageInitialiseDefault();
                }

                if (this.beforeLoadData) {
                    this.beforeLoadData();
                } else {
                    this.beforeLoadDataDefault();
                }

                await this.getFieldElementByCode(this.fieldElementCode);
                await this.getDataById(this.baseUrl, this.url, this.referencesId);

                if (this.afterLoadData) {
                    this.afterLoadData();
                } else {
                    this.afterLoadDataDefault();
                }

                if (this.afterPageInitialise) {
                    this.afterPageInitialise();
                } else {
                    this.afterPageInitialiseDefault();
                }
            } catch (e) {
                throw e;
            } finally {
                this.loading = false;
            }
        },

        resetOverrides() {
            this.beforeCreate = null;
            this.afterCreate = null;
            this.beforeUpdate = null;
            this.afterUpdate = null;
            this.beforeDelete = null;
            this.afterDelete = null;
        },

    }
});