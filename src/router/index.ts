import { createWebHistory, createRouter } from "vue-router"

import HelloWorld from "../components/HelloWorld.vue"
import InventorySelection from "../components/InventorySelection.vue"


const routes=[
    {
        path:"/",
        name:"InventorySelection",
        component: InventorySelection
    },
    {
        path:"/HelloWorld",
        name:"HelloWorld",
        component: HelloWorld
    }
]




const router = createRouter({
    history: createWebHistory(),
    routes: routes
  })
  
  export default router