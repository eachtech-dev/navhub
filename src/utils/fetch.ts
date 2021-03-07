import axios, { AxiosRequestConfig } from 'axios';
import { config } from 'utils/config';

export async function fetch<T = unknown, U = void>(
    path: string,
    options?: Omit<AxiosRequestConfig, 'data'> & { data?: U },
): Promise<T> {
    const url = `${config.api.url}${path}`;

    const response = await axios(url, options);

    return response.data;
}
