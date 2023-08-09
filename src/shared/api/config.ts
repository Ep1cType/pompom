import axios, {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	CreateAxiosDefaults,
	InternalAxiosRequestConfig,
} from 'axios';
import { TokenAttach } from 'shared/api/auth';

const onRequest = async (
	config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
	const accessToken = await TokenAttach.accessToken();
	if (accessToken && config.headers) {
		config.headers['Authorization'] = accessToken;
	}
	return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
	return Promise.reject(error);
};

const onResponse = <T>(response: AxiosResponse): Promise<AxiosResponse> => {
	if (response.headers['Content-Type'] === 'text/html') {
		return Promise.reject('GOT HTML RESPONSE');
	}

	return Promise.resolve(response);
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
	return Promise.reject(error);
};

function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
	axiosInstance.interceptors.request.use(onRequest, onRequestError);
	axiosInstance.interceptors.response.use(onResponse, onResponseError);
	return axiosInstance;
}

const options: CreateAxiosDefaults = {
	baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
};

const instance = axios.create(options);
export const apiReq = instance;
