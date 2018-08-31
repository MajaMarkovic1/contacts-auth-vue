import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Contacts from './pages/Contacts.vue'
import AddContact from './pages/AddContact.vue'
import Login from './pages/Login.vue'
import MyDirectives from './plugins/MyDirectives'
import { authService } from './services/Auth'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(MyDirectives)

const routes = [
  { path: '/', redirect: '/contacts' },
  { path: '/contacts', component: Contacts, name: 'contacts' },
  { path: '/contacts/:id', component: Contacts, name: 'contact-details' },
  { path: '/add-contact', component: AddContact, name: 'add-contact' },
  { path: '/login', component: Login, name: 'login' }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !authService.isAuthenticated()){
    next({path: 'login'})
  } else if(to.name === 'login' && authService.isAuthenticated()) {
    next({path: 'contacts'})
  } else {
    next()
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
