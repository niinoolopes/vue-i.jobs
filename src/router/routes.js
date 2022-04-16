import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PanelView from '../views/PanelView.vue'
import PerfilView from '../views/PerfilView.vue'

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
  {
    path: '/perfil',
    name: 'perfil',
    component: PerfilView
  },
]