import axios, { AxiosError } from "axios";
import { useAuthStore } from '@/app/stores/auth.store';
import { Message, MessageObject } from "@/app/base/models/messageobject";
import { TokenDTO } from "@/app/ums/DTOs/token.dto";

export const axiosInstance = (baseUrl: string) => {
    const instance = axios.create({ baseURL: baseUrl, timeout: 10000 });
    /// Assign Token ketika create instance
    instance.interceptors.request.use((config) => {
        const auth = localStorage.getItem('Auth');
        if (auth) {
            const token = new TokenDTO(JSON.parse(auth));
            config.headers['Authorization'] = `Bearer ${token.AccessToken}`;
            config.headers['RefreshToken'] = token.RefreshToken;
        }
        return config
    }, (error) => { return Promise.reject(error) });
    return instance;
}

export const axiosErrorHandleToMessages = (exception: unknown) => {
    let messages: Array<Message> = [];
    if ((exception as AxiosError).response) {
        messages = ((exception as AxiosError)?.response?.data as MessageObject).Errors;
    } else {
        messages.push(new Message({ Description: (exception as AxiosError).message }))
    }
    return messages;
}

export const axiosErrorHandleToString = (exception: unknown) => {
    let messages: Array<Message> = [];
    if ((exception as AxiosError).response) {
        messages = ((exception as AxiosError)?.response?.data as MessageObject).Errors;
    } else {
        messages.push(new Message({ Description: (exception as AxiosError).message }))
    }
    return messages.map(e => e.Description).join(", ");;
}

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const authStore = useAuthStore();
        if (error.response?.status == 401) {
            try {
                authStore.logout();
                await authStore.refreshToken();
                return axios(error.config);
            } catch (e) {
                authStore.logout();
                return Promise.reject(e);
            }
        }
        return Promise.reject(error);
    }
)