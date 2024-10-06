import { defineComponent, App } from 'vue'


export interface Router {
    install(app: App): void
    push(path: string): void
    replace(to: any): void
    resolve(to: any): { path: string, matched: any[] }
    finalizeNavigatior(to: any, from: any, replace?: boolean): void
    markRady(): void
}