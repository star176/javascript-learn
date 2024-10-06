import type { App } from 'vue'
import { Router } from './type'

// 初始化route
const ROUTE_NORMALIZED = {
    path: '/', // 路径
    params: {}, // 参数
    query: {}, // 参数
    meta: {}, // 元信息
    matched: [] // 匹配路由存放的信息
}
export const useRouter = () => {

}

export const useRoute = () => {

}

export const createRouter = (options: RouterOptions): Router => {
    const router: Router = {
        install() { },
        markRady() { },
        finalizeNavigatior() { },
        push() { },
        replace() { },
        resolve(to) {
            return { path: '', matched: [] }
        }

    }
    return router
}

export * from './type'
