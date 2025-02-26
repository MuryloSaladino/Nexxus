import { toast } from "react-toastify"
import { IHttpMethod, IServiceResponse } from "../interfaces/services.interfaces"

const defaultGetAuth = (): string => {
    const token = localStorage.getItem("@TOKEN")
    return `Bearer ${token}`
}

export const baseRequest = async <T = any>(
    url: string,
    method: IHttpMethod,
    contentType: string = "application/json",
    getAuth: () => string = defaultGetAuth,
    headers: HeadersInit = {},
    body?: any
): Promise<IServiceResponse<T>> => {
    const response = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            "Content-Type": contentType,
            "Authorization": getAuth(),
            ...headers,
        },
    })

    const json = await response.json()

    return {
        data: json.data || null,
        success: response.status < 400,
        showMessage: response.status >= 400
            ? () => toast.error(json.message)
            : () => toast.success(json.message),
    }
}

export const baseGet = async <T = any>(
    url: string,
    headers?: HeadersInit,
    contentType?: string,
    getAuth?: () => string
) => baseRequest<T>(url, "GET", contentType, getAuth, headers)

export const basePost = async <T = any>(
    url: string,
    body?: any,
    headers?: HeadersInit,
    contentType?: string,
    getAuth?: () => string
) => baseRequest<T>(url, "POST", contentType, getAuth, headers, body)

export const basePatch = async <T = any>(
    url: string,
    body?: any,
    headers?: HeadersInit,
    contentType?: string,
    getAuth?: () => string
) => baseRequest<T>(url, "PATCH", contentType, getAuth, headers, body)

export const basePut = async <T = any>(
    url: string,
    body?: any,
    headers?: HeadersInit,
    contentType?: string,
    getAuth?: () => string
) => baseRequest<T>(url, "PUT", contentType, getAuth, headers, body)

export const baseDelete = async <T = any>(
    url: string,
    headers?: HeadersInit,
    body?: any,
    contentType?: string,
    getAuth?: () => string
) => baseRequest<T>(url, "DELETE", contentType, getAuth, headers, body)