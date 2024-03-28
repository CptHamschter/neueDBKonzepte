import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import NachrichtenErstellen from '@/components/NachrichtenErstellen.vue'



const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
      {
        path: '/nachrichten',
        name: 'NachrichtenErstellen',
        component: NachrichtenErstellen
      }
    ]
  });
  const app = createApp(App);
  app.use(router);

  app.mount('#app');
export default router;
