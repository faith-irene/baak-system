import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Page404 from '../components/NotFound.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import Mahasiswa from '@/views/master_data/Mahasiswa.vue'
import { userStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: '/admin',
      component: MainLayout,
      children : [
        {
          path : 'dashboard',
          name : 'adminDashboard',
          component : Dashboard,
          meta : { 
            requiresAuth : true, role : 'admin'
          }
        },
        {
          path : 'mahasiswa',
          name : 'tableMahasiswa',
          component : Mahasiswa,
          meta : {
            requiresAuth : true, role : 'admin'
          }
        },
        {
          path : 'krs',
          name : 'krs',
          component : HomeView,
          meta : { 
            requiresAuth : true, role : 'admin'
          }
        },
        {
          path : 'transkrip',
          name : 'transkrip',
          component : AboutView,
          meta : { 
            requiresAuth : true, role : 'admin'
          }
        }
        
      ]
    },
    {
      path : '/user',
      component : MainLayout,
      children : [
        {
          path : 'dashboard',
          name : 'userDashboard',
          component : HomeView,
          meta : {
            requiresAuth : true, role : "user"
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path : '/error404',
      name : 'PageNotFound',
      component : Page404
    },
    {
      path : '/',
      redirect : '/login'
    }
  ]
})


router.beforeEach((to,from, next) => {
const user = userStore();
const token = user.token;
// const userRole = sessionStorage.getItem('role');
const isAuthenticate = user.terOtentikasi;
const userRole = user.userRole;
const requiresAuth = to.matched.some( record => {
  record.meta.requiresAuth
} );
const role = to.meta.role;

if ( requiresAuth && !isAuthenticate && token == null ){
  next('/login');
} else if ( requiresAuth && isAuthenticate && role && role !== userRole ){
  next('/login')
} else {
  next();
}



// if ( to.name !== 'Login' && token == null ) next( { path : '/login' } );
// if ( to.name == 'Login' && token !== null ) next( { path : '/' } );
// else next();
// if ( to.name !== 'Login' && token == null){
//   next( { path : '/login' } );
// } else if ( to.name == 'Login' && token !== null ) {
//   next({ path : '/' });
// } else {
//   next();
// }

})

// perbaiki pada bagian Meta dan Role.
export default router
