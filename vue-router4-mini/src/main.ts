import App from "./App.vue";
import { createApp } from "vue";
import { createRouter } from "./router";
import { createWebHistory } from "./router/history/html5";
import aubout from './About.vue'

const app = createApp(App);
const router = createRouter({
    history: createWebHistory(),
    routers: [
        {
            path: '/about',
            component: aubout,
            children: [
                {
                    path: 'a',
                    component: () => `<h1>a</h1>`,
                },
                {
                    path: 'b',
                    component: () => `<h1>b</h1>`
                }
            ]
        },
    ]
})
app.use(router);
app.mount("#app");