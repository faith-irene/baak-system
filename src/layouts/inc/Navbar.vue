<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"
          ><i class="fas fa-bars"></i
        ></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="/adminlte/index3.html" class="nav-link">Home</a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">Contact</a>
      </li>
    </ul>

    <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-bell"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span class="dropdown-item dropdown-header">Nama User</span>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-envelope mr-2"></i> My Profile
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-users mr-2"></i> Settings
          </a>
          <div class="dropdown-divider"></div>
          <button v-on:click="logout" class="dropdown-item">
                    <i class="fas fa-sign-out-alt"></i> Log Out
                </button>
        </div>
      </li>
      <!-- <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
          <i class="fas fa-expand-arrows-alt"></i>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          data-widget="control-sidebar"
          data-slide="true"
          href="#"
          role="button"
        >
          <i class="fas fa-th-large"></i>
        </a>
      </li> -->
    </ul>
  </nav>
</template>
<script>
import { userStore } from '@/stores/user';

export default {
    name : 'Navbar',
    methods : {
      logout(){
        const user = userStore();
        user.logout();
        this.$router.push("/login");
      }
    }
}
</script>
