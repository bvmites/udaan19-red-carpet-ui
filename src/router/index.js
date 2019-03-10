import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/dashboard'
import Login from '@/components/login'
import Start from '@/components/start'
import Feedback from '@/components/feedback'
import Error from '@/components/error'
import { store } from '../store';
import getInitialState from '../initialState'

Vue.use(store);
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (destination, source, next) => {
        if(destination.name === "Login" && (source.name === "Dashboard" || source.name === "Feedback")){
          const initialState = getInitialState();
          console.log("beforeENter called");
          store.commit("resetState", initialState);
          next();
        }
        else
          next()
      }
    },
    {
      path: '/error',
      name: 'Error',
      component: Error
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: (destination, source, next) => {
        if(destination.name === "Dashboard" && source.name === "Feedback"){
          next(false);
        }
        else if(destination.name === "Dashboard" && source.name === "Login"){
          if(store.state.user.token){
            next();
          }
        }
        else {
          next("/login");
        }
      }
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: Feedback,
      beforeEnter: (destination, source, next) => {
        if(destination.name === "Feedback" && source.name === "Dashboard"){
          if(store.state.user.token){
            next();
          }
        }
        else if(destination.name === "Feedback" && source.name === "Login")
          next(false);
        else
          next("/login");
      }
    }
  ]
});

export default router;
