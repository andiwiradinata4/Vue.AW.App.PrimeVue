import { defineStore } from 'pinia';
// import { callLogin, callRefreshToken } from "@/app/ums/login/login.service";
// import { callMe } from '@/app/ums/user/user.service';
import { Message } from '@/app/base/models/messageobject';
import { UserModel } from '@/app/ums/models/user.model';
import { TokenDTO } from '@/app/ums/DTOs/token.dto';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        errorMessages: Array<Message>(),
        user: new UserModel({}),
        token: null as TokenDTO | null,
    }),
    actions: {
        setToken(token: TokenDTO) {
            this.token = token;
            localStorage.setItem("Auth", JSON.stringify(this.token));
        },
        clearToken() {
            this.token = null;
            localStorage.removeItem("Auth");
        },
        loadTokens() {
            const _token = localStorage.getItem("Auth");
            if (_token) {
                this.token = JSON.parse(_token);
                this.me();
                this.isAuthenticated = true;
            } else {
                this.token = null;
            }
        },
        async login(username: string, password: string) {
            // try {
            //     const response = await callLogin(username, password);
            //     this.setToken(new TokenDTO(response.data.Data));
            //     await this.me();
            //     this.isAuthenticated = true;
            //     return true;
            // } catch (e) {
            //     this.isAuthenticated = false;
            //     throw e;
            // }
        },
        async refreshToken() {
            // try {
            //     const response = await callRefreshToken();
            //     this.setToken(new TokenDTO(response.data.Data));
            //     this.isAuthenticated = true;
            // } catch (e) {
            //     this.isAuthenticated = false;
            // }
        },
        logout() {
            this.clearToken();
            this.user = new UserModel({});
            this.isAuthenticated = false;
        },
        async me() {
            // try {
            //     const response = await callMe();
            //     this.user = new UserModel(response.data.Data);

            // } catch (e) {
            //     this.isAuthenticated = false;
            //     this.logout();
            // }
        }
    }
});