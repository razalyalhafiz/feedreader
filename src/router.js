import Vue from "vue"
import Router from "vue-router"
import Feeds from "./views/Feeds.vue"
import Charts from "./views/Charts.vue"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "feeds",
      component: Feeds
    },
    {
      path: "/charts",
      name: "charts",
      component: Charts
    }
  ]
})
