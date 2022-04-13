import Vue from "vue"
import VueRouter from "vue-router"

import About from "./pages/About"
import Auth from "./pages/auth/Auth"
import Admin from "./pages/Admin.vue"

import NewRequest from "./pages/NewRequest.vue"
import Mansion from "./pages/Requests/Mansion.vue"
import Transfer from "./pages/Requests/Transfer.vue"
import Rent from "./pages/Requests/Rent.vue"
import Assistant from "./pages/Requests/Assistant.vue"
import Activity from "./pages/Requests/Activity.vue"
import Cleaner from "./pages/Requests/Cleaner.vue"
import Restaurant from "./pages/Requests/Restaurant.vue"
import RequestResult from "./pages/RequestResult.vue"
import RequestList from "./pages/RequestList.vue"
import Property from "./pages/Property.vue"
import Secondary from "./pages/Secondary.vue"
import Settings from "./pages/Settings.vue"

import store from "./store"

Vue.use(VueRouter)

export const router = new VueRouter({
    routes: [
        {
            path: "/",
            component: NewRequest,
            beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/about",
            component: About,
            beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/requests",
            component: RequestList,
            beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/new",
            component: NewRequest,
            beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/mansion",
            component: Mansion,
            beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/transfer",
            component: Transfer,
            beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/rent",
            component: Rent,
            beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/restaurant",
            component: Restaurant,
            beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/activity",
            component: Activity,
            beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/cleaner",
            component: Cleaner,
            beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/assistant",
            component: Assistant,
            beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/result",
            component: RequestResult,
            beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/admin",
            component: Admin,
            beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/property",
            component: Property,
            beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/secondary",
            component: Secondary,
            beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/settings",
            component: Settings,
            beforeEnter(to, from, next) {
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {path: "/auth", component: Auth}
    ],
    // mode: "history"
})