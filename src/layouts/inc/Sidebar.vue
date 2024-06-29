<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <a href="/adminlte/index3.html" class="brand-link">
          <img
            src="/adminlte/dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            class="brand-image img-circle elevation-3"
            style="opacity: 0.8"
          />
          <span class="brand-text font-weight-light">AdminLTE 3</span>
        </a>
  
        <div class="sidebar">
          <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
              <img
                src="/adminlte/dist/img/user2-160x160.jpg"
                class="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div class="info">
              <a href="#" class="d-block">Alexander Pierce</a>
            </div>
          </div>
  
          <div class="form-inline">
            <div class="input-group" data-widget="sidebar-search">
              <input
                class="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div class="input-group-append">
                <button class="btn btn-sidebar">
                  <i class="fas fa-search fa-fw"></i>
                </button>
              </div>
            </div>
          </div>
  
          <nav class="mt-2">
            <ul
              class="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
            <li class="nav-item" >
              <router-link :to="`/${role}/dashboard`" class="nav-link" >
                <span><i class="nav-icon fas fa-tachometer-alt" ></i></span>
                Dashboard
              </router-link>
            </li>
            <slot v-for="menu in menus" :menu="menu" :submenus="submenus[menu.id]" :key="menu.id"  ></slot>
              
              <!-- <MenuItem v-for="(item, index) in menu" :menu="item" :submenu="submenu[item.id]" :key="index" :icon="item.icon" :link="item.link" >
              {{ item.menu }}
              </MenuItem> -->
              <!-- <MenuItem icon="fas fa-info-circle" link="/about" >
              About 
              </MenuItem> -->
            </ul>
          </nav>
        </div>
      </aside>
</template>

<script>
// import MenuItem from '@/components/spesials/MenuItem.vue';
import axios from 'axios';
import { mapStores } from 'pinia';
import { userStore } from '@/stores/user';



export default {
    name : 'Sidabar',
    data(){
      return {
        menus : [],
        submenus : {},
        name_role : ''
      }
    },
    async beforeMount(){
    await this.fetchMenu();
    // console.log(this.submenu);
    },
    computed: {
      ...mapStores(userStore),
      role(){
        return this.name_role = sessionStorage.getItem('name_role');
      }
    },
    methods : {
     async fetchMenu(){
        try {
          const role_id = sessionStorage.getItem('role');
          console.log(role_id);
          const response = await axios.post('http://localhost:5000/api/v1/menu',{ role_id : role_id });
          this.menus = response.data;
          await  this.fetchSubmenu();
        } catch(error) {
          console.info(error);
        }

      },
      async fetchSubmenu(){
        for ( const menu of this.menus ){
          try {
            const response = await axios.post('http://localhost:5000/api/v1/submenu',{menu_id : menu.id});
            // console.info(response.data);
           this.submenus[menu.id] = response.data;
          
          } catch(error){
            console.log(error);
          }
        }
      }
    }
    
}
</script>