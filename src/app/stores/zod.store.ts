import { defineStore } from "pinia";
import { z } from 'zod';

type DynamicState = Record<string, any>;
export const useZodStore = defineStore('zodStore', {
    state: () => ({
        schema: null as Record<string, any> | null
    }),
    actions: {
        setSchema(schema: Record<string, any>) {
            this.schema = schema;
            this.schema[''] = {}
        }
    }
})