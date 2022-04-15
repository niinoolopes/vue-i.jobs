import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PanelView from '../views/PanelView.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/panel',
    name: 'panel',
    component: PanelView
  },
]