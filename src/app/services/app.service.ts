import { axiosInstance } from '@/app/services/axios.service';
const usAxios = axiosInstance("https://ums.andiwiradinata.com");
export { usAxios };

export const GetFieldElement = async (id: string) => {
    const usAxios = axiosInstance(import.meta.env.VITE_APP_BASE_URL_GMS);
    return await usAxios.get(`/api/v1/appfieldelement/${id}`);
}

export const GetFieldElementByCode = async (code: string) => {
    const usAxios = axiosInstance(import.meta.env.VITE_APP_BASE_URL_GMS);
    return await usAxios.get(`/api/v1/appfieldelement/${code}/code`);
}

export const AppGet = async (baseUrl: string, url: string) => {
    const usAxios = axiosInstance(baseUrl);
    return await usAxios.get(url);
}

export const AppPost = async (baseUrl: string, url: string, data: Object) => {
    const usAxios = axiosInstance(baseUrl);
    return await usAxios.post(url, data);
}

export const AppPut = async (baseUrl: string, url: string, data: Object) => {
    const usAxios = axiosInstance(baseUrl);
    return await usAxios.put(url, data);
}

export const AppDelete = async (baseUrl: string, url: string) => {
    const usAxios = axiosInstance(baseUrl);
    return await usAxios.delete(url);
}