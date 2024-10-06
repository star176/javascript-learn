import { defineComponent, App } from 'vue'
import { RouterHisrory } from '../history/html5'
export interface RouterOptions {
    history: RouterHisrory
    routers: RouterRaw[]
}
export interface RouterRaw {
    path: string
    name?: string
    children?: RouterRaw[]
    component?: ReturnType<typeof defineComponent>
}

export interface Router {
    install(app: App): void
    push(path: string): void
    replace(to: any): void
    resolve(to: any): { path: string, matched: any[] }
    isReady(): void
}
export type _ScrollPositionNormalized = {
    behavior?: ScrollOptions['behavior']
    left: number
    top: number
}
export type HistoryLocation = string