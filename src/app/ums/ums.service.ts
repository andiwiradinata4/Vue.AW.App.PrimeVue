import { axiosInstance } from '@/app/services/axios.service';
const usAxios = axiosInstance(import.meta.env.VITE_APP_BASE_URL_UMS);
export default usAxios;