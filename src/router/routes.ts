import type {RouteRecordRaw} from "vue-router";
import UserLoginView from "@/views/user/UserLoginView.vue";
import HomeView from "@/views/HomeView.vue";
import MainView from "@/views/MainView.vue";


export const routes: Array<RouteRecordRaw> = [
    {
        path: "/user",
        name: "用户",
        children: [
            {
                path: "/user/login",
                component: UserLoginView,
            },
            {
                path: "/user/main",
                component: MainView,
            }
        ],
    },
    {
        path: "/",
        name: "首页",
        component: HomeView,
    },
]