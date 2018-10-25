import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const  components={
  LoginPage:()=>import('@/views/login_page'),
  Layout:()=>import('@/views/layout'),
  HomePage:()=>import('@/views/home_page'),
  QueryAllAdmin:()=>import('@/views/query_allAdmin'),
  AddAdministrator:()=>import('@/views/addAdministrator'),
  GetAllNews:()=>import('@/views/getAllNews'),
  AddNews:()=>import('@/views/addNews')
}

export default new Router({
  routes: [
    {
      path:'/',
      name:'login_page',
      component:components.LoginPage
    },
    {
      path:'/layout',
      name:'layout',
      component:components.Layout,
      redirect:'layout/home_page',
      children:[
        {
          path:'home_page',
          name:'home_page',
          component:components.HomePage
        },
        {
          path:'query_allAdmin',
          name:'query_allAdmin',
          component:components.QueryAllAdmin
        },
        {
          path:"addAdministrator",
          name:'addAdministrator',
          component:components.AddAdministrator
        },
        {
          path:'GetAllNews',
          name:'GetAllNews',
          component:components.GetAllNews
        },
        {
          path:'addNews',
          name:'addNews',
          component:components.AddNews
        }
      ]
    }
  ]
})
