import { HistoryLocation, _ScrollPositionNormalized } from "../type"


interface StateEntry {
    back: HistoryLocation | null
    current: HistoryLocation
    forward: HistoryLocation | null
    // position: number
    replaced: boolean
    // scroll: _ScrollPositionNormalized | null | false
}


//格式化存储的参数
/**
 * 
 * @param back  返回
 * @param current  当前
 * @param forward  前进
 * @param replaced  是否是替换
 * @returns 
 */
function buildState(back: HistoryLocation | null, current: HistoryLocation, forward: HistoryLocation | null, replaced = false): StateEntry {
    return {
        back,
        current,
        forward,
        replaced
    }
}

function createCurrentLocation(base: string) {
    /**
     * @param pathname www.baodu.com/a/b/c   /a/b/c 读取/后面所有的路径
     * @param search www.baodu.com?a=1&b=2  ?a=1&b=2 读取 包括?
     * @param hash www.baodu.com#/aaa   #/aaa 读取 包括#
     */
    const { pathname, search, hash } = window.location
    if (base.indexOf('#') > -1) {
        return base.slice(1) || '/'
    }
    return pathname + search + hash
}

function useHistoryNavigator(base: string) {
    // 存一下当前路径
    const currentLocation = {
        value: createCurrentLocation(base)
    }

    const historyState = {
        value: history.state
    }
    function changeLocation(to: HistoryLocation, state: StateEntry, replace: boolean) {
        const url = base.indexOf('#') > -1 ? base + to : to
        window.history[replace ? 'replaceState' : 'pushState'](state, '', url)//实现跳转
        historyState.value = state
    }
    if (!historyState.value) {
        changeLocation(currentLocation.value, buildState(null, currentLocation.value, null, true), true)
    }

    function push(to: HistoryLocation, data?: any) {
        // 触发前进
        const currentState = Object.assign({}, historyState.value, { forward: to })
        changeLocation(currentState.current, currentState, true)
        // 实现真正的跳转
        const state = Object.assign({}, buildState(currentState.current, to, null, false), data)
        changeLocation(to, state, false)
        currentLocation.value = to
    }
    function replace(to: HistoryLocation, data?: any) {
        const state = Object.assign({},
            buildState(historyState.value.back, to, historyState.value.forward, true),
            data)
        changeLocation(to, state, true)
        currentLocation.value = to
    }
    return {
        state: historyState,
        location: currentLocation,
        push,
        replace
    }
}

// 入口函数
export function createWebHistory(base: string = '') {
    // 1. push replace
    const historyNavigator = useHistoryNavigator(base)
    // 2. 监听popstate事件
    // 3. 合并
    const routerHistory = Object.assign({}, historyNavigator)
    return routerHistory
}

export type RouterHisrory = ReturnType<typeof createWebHistory>

