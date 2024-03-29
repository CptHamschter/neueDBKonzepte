import { createApp } from 'vue';
import App from './App.vue';
import * as VueRouter from 'vue-router';
import HauptSeite from './components/Hauptseite.vue'; 
import NachrichtenErstellen from './components/NachrichtenErstellen.vue';
import LogRegView from './components/LogRegView.vue';

createApp(App)
.use(VueRouter.createRouter({
  history:VueRouter.createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path:'/',
      component:HauptSeite
    },
    {
      path:'/login',
      component:LogRegView
    },
    {
    path:'/nachricht',
    component:NachrichtenErstellen,
  }]
}))
.mount('#app')