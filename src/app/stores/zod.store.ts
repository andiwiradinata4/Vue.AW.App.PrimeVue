import { defineStore } from "pinia";
export const useZodStore = defineStore('zodStore', {
    state: () => ({
        schema: null as Record<string, any> | null
    }),
    actions: {
        setSchema(schema: Record<string, any>) {
            this.schema = {};
            this.mergeSchema(schema);
        },
        mergeSchema(schema: Record<string, any>) {
            Object.keys(schema).forEach(e => {
                if (this.schema) {
                    this.schema[e] = schema[e];
                }
            })
        }
    }
})