import axios from 'axios';

type AxiosResponse = {
    status: number;
    data: any;
};

export const API_BASE = 'http://192.168.0.182:3000';

export const AXIOS = {
    async get({
        url,
        authToken = null,
    }: {
        url: string;
        authToken?: string | null;
    }): Promise<AxiosResponse> {
        try {
            const response = await axios.get(`${API_BASE}${url}`, {
                ...(authToken && {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }),
            });
            return response;
        } catch (error: any) {
            return error.response;
        }
    },

    async post({
        url,
        data,
        authToken = null,
    }: {
        url: string;
        data?: any;
        authToken?: string | null;
    }): Promise<AxiosResponse> {
        try {
            const response = await axios.post(`${API_BASE}${url}`, data, {
                ...(authToken && {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }),
            });
            return response;
        } catch (error: any) {
            return error.response;
        }
    },

    async put({
        url,
        data,
        authToken = null,
    }: {
        url: string;
        data?: any;
        authToken?: string | null;
    }): Promise<AxiosResponse> {
        try {
            const response = await axios.put(`${API_BASE}${url}`, data, {
                ...(authToken && {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }),
            });
            return response;
        } catch (error: any) {
            return error.response;
        }
    },

    async delete({
        url,
        authToken = null,
    }: {
        url: string;
        authToken?: string | null;
    }): Promise<AxiosResponse> {
        try {
            const response = await axios.delete(`${API_BASE}${url}`, {
                ...(authToken && {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }),
            });
            return response;
        } catch (error: any) {
            return error.response;
        }
    },

    async patch({
        url,
        data,
        authToken = null,
    }: {
        url: string;
        data?: any;
        authToken?: string | null;
    }): Promise<AxiosResponse> {
        try {
            const response = await axios.patch(`${API_BASE}${url}`, data, {
                ...(authToken && {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }),
            });
            return response;
        } catch (error: any) {
            return error.response;
        }
    },
};

export async function signup({
    username,
    password,
    type = 'user',
}: {
    username: string;
    password: string;
    type?: 'admin' | 'user';
}) {
    return await AXIOS.post({
        url: '/api/auth/signup',
        data: { username, password, type },
    });
}

export async function signin({
    username,
    password,
}: {
    username: string;
    password: string;
}) {
    return await AXIOS.post({
        url: '/api/auth/signin',
        data: { username, password },
    });
}
