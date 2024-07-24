import axios from 'axios';
import type { AxiosInstance } from 'axios';

class RobloxApi {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: 'https://apis.roblox.com/oauth',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // Directs user to the authorization flow
    getAuthorizationUrl(params: {
        client_id: string;
        redirect_uri: string;
        scope: string;
        response_type: string;
        nonce?: string;
        state?: string;
        prompt?: string;
        code_challenge?: string;
        code_challenge_method?: string;
    }): string {
        const queryParams = new URLSearchParams(params).toString();
        return `${this.api.defaults.baseURL}/v1/authorize?${queryParams}`;
    }

    // Exchange authorization code for tokens
    async exchangeCodeForTokens(data: {
        code: string;
        code_verifier: string;
        grant_type: 'authorization_code';
        client_id: string;
        client_secret: string;
    }): Promise<any> {
        const response = await this.api.post('/v1/token', new URLSearchParams(data), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        return response.data;
    }

    // Refresh tokens
    async refreshToken(data: {
        grant_type: 'refresh_token';
        refresh_token: string;
        client_id: string;
        client_secret: string;
    }): Promise<any> {
        const response = await this.api.post('/v1/token', new URLSearchParams(data), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        return response.data;
    }

}

export default RobloxApi;