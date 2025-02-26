import { baseGet, baseDelete, basePatch, basePost, basePut } from ".";
import { Connections } from "../constants/connections";

export default {
    get:    <R = any>(url: string) => baseGet<R>(Connections.InternalAPI + url),
    post:   <R = any, P = any>(url: string, payload?: P) => basePost<R>(Connections.InternalAPI + url, payload),
    patch:  <R = any, P = any>(url: string, payload?: P) => basePatch<R>(Connections.InternalAPI + url, payload),
    put:    <R = any, P = any>(url: string, payload?: P) => basePut<R>(Connections.InternalAPI + url, payload),
    delete: <R = any>(url: string) => baseDelete<R>(Connections.InternalAPI + url),
}