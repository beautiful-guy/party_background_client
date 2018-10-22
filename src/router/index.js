import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const  components={
  LoginPage:()=>import('../views/login_page')
}

export default new Router({
  routes: [
    {
      path:'/',
      name:'login_page',
      component:components.LoginPage
    }
  ]
})
