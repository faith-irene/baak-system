<template>
  <div class="wrapper">
    <Navbar />
    <Sidebar>
      <template v-slot:default="{menu , submenus}" >
        <MenuItem :menu="menu" :submenus="submenus" ></MenuItem>
      </template>
    </Sidebar>

    <div class="content-wrapper">
      <router-view />
    </div>
    
    <Footbar />

    <aside class="control-sidebar control-sidebar-dark"></aside>
  </div>
</template>
<script>
import Navbar from "./inc/Navbar.vue";
import Sidebar from "./inc/Sidebar.vue";
import Footbar from "./inc/Footbar.vue";
import MenuItem from "@/components/spesials/MenuItem.vue";


export default {
  name: "MainLayout",
  components: {
    Navbar,
    Sidebar,
    Footbar,
    MenuItem
  },
  beforeMount(){
    $('body').removeClass('login-page').addClass('sidebar-mini');
  }
};
</script>
