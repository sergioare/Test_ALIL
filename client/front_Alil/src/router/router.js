import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from '../store/store.js'
import Swal from 'sweetalert2'

const routes = [
  { 
    path: "/", 
    name:"Home", 
    component: Home 
  },
  { 
    path: "/login", 
    name: "Login",
    component: ()=> import ("../components/Login.vue") 
  },
  { 
    path: "/dashboard", 
    name: "Dashboard",
    meta: {
      requiresAuth:true
    },
    component: ()=> import ("../components/Dashboard.vue") 
  },
  { 
    path: "/register", 
    name: "Register",
    component: ()=> import ("../components/Register.vue") 
  },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

router.beforeEach((to, from, next)=>{
  const isRequired = to.matched.some(item=>item.meta.requiresAuth)
     if(isRequired && store.state.token === null){
      Swal.fire({
        title: 'Please try again',
        text: 'Trying log in to access',
        icon: 'warning',
        confirmButtonText: 'Cool'
      })
      next('/login')
      
    }else{
      next()
    }
  
})

export default router;