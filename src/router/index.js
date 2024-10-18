import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import PurchasesPage from '../views/PurchasesPage.vue';
import GuaranteesPage from '../views/GuaranteesPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage, // Уверете се, че HomePage е зададен тук
  },
  {
    path: '/purchases',
    name: 'Purchases',
    component: PurchasesPage, // Страница за покупки
  },
  {
    path: '/guarantees',
    name: 'Guarantees',
    component: GuaranteesPage, // Страница за гаранции
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
