import { createWebHistory, createRouter } from "vue-router"

import HelloWorld from "../components/HelloWorld.vue"
import InventorySelection from "../components/InventorySelection.vue"


const routes=[
    {
        path:"/",
        name:"HelloWorld",
        component: HelloWorld,
    },
    {
        path:"/InventorySelection",
        name:"InventorySelection",
        component: InventorySelection
    }
]




const router = createRouter({
    history: createWebHistory(),
    routes: routes
  })
  
  export default router