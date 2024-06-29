<template>
  <div class="login-box">
    <div class="login-logo">
      <a href=""><b>Admin</b>LTE</a>
    </div>
    <!-- Pesan Error -->
    <div v-if="show_alert" class="row d-flex justify content-center">
      <div class="col">
        <div id="pesan-error" class="alert alert-danger" role="alert">
             <i class="fas fa-poop" ></i> {{ error }}
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg">Silahkan Login</p>
        <form @submit.prevent="Login()" method="post">
          <div class="input-group mb-3">
            <input
              type="text"
              v-model="username"
              @input="usernameError = false"
              @blur="validUsername(username)"
              autocomplete="off"
              class="form-control"
              placeholder="Masukan Username"
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div v-if="usernameError" class="text-danger mb-3 danger">
            <span class="tab" >
              <i class="fa fa-exclamation-circle fa-fw" ></i>
              Username Tidak boleh kosong
            </span>
          </div>
          <div class="input-group mb-3">
            <input
              type="password"
              class="form-control"
              placeholder="Masukan Password"
              autocomplete="off"
              v-model="password"
              v-on:input="passwordError = false"
              v-on:blur="validPassword(password)"
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div v-if="passwordError" class="text-danger mb-3 danger">
            <span class="tab">
              <i class="fa fa-exclamation-circle fa-fw" ></i>
              Password kurang dari 5 Karakter
            </span>
          </div>
          <div class="row">
            <div class="col-8">
              <div class="icheck-primary">
                <input type="checkbox" id="remember" />
                <label for="remember"> Remember Me </label>
              </div>
            </div>

            <div class="col-4">
              <button type="submit" class="btn btn-primary btn-block">
                Sign In
              </button>
            </div>
          </div>
        </form>
        <div class="social-auth-links text-center mb-3">
          <p>- OR -</p>
          <a href="#" class="btn btn-block btn-primary">
            <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
          </a>
          <a href="#" class="btn btn-block btn-danger">
            <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
          </a>
        </div>

        <p class="mb-1">
          <a href="forgot-password.html">I forgot my password</a>
        </p>
        <p class="mb-0">
          <a href="register.html" class="text-center"
            >Register a new membership</a
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { userStore } from '@/stores/user';
import $ from "jquery";
// import { useRoute } from 'vue-router';
// import { jwtDecode } from "jwt-decode";




export default {

  data() {
    return {
      username: "",
      password: "",
      usernameBlured: false,
      passwordBlured: false,
      error: "",
      show_alert: "",
      valid: "",
      usernameError: false,
      passwordError: false
    }
  },
  beforeMount() {
    $('body').removeClass('sidebar-mini').addClass('login-page');
    $('title').html('Halaman Login');
  },
  methods: {
    validUsername(username) {
      if (username === "" || username == null) {
        return this.usernameError = true;
      } else {
        return this.usernameError = false;
      }
    },
    validPassword(password) {
      if ( password.length < 5 ) {
        return this.passwordError = true;
      } else {
        return this.passwordError = false;
      }
    },
    async Login() {
      try {
        if (!this.username || !this.password) {
          this.error = "Mohon Masukan Username atau Password";
          this.show_alert = true;
          this.resetAlert();
          return;
        }

        let payload = {
          username: this.username,
          password: this.password
        }

        const response = await axios.post('http://localhost:5000/api/v1/login', payload);

        // mendefinisikan Pinia wajib dalam suatu fungsi
        const user = userStore();
        // instansiasi route didalam fungsi
        // const route = useRoute();

        // assismen hasil respon ke dalam variabel
        let roleName = '';
        const token = response.data.token;
        const role = response.data.role;

        if ( role  == 1 ) {
          roleName = 'admin'
        } else if ( role == 2 ) {
          roleName = 'user'
        } else {
          roleName = 'Unknown'
        }
        // console.log(role);
        user.login(token,roleName);
        /* const result = jwtDecode(token);
        console.info(result); */

        // Simpan token dan role kedalam Storage local dan session
        localStorage.setItem('token',token);
        sessionStorage.setItem('role',role);
        sessionStorage.setItem('name_role',roleName);
        // this.$router.push({ name : 'Home' });
       if ( role == 1) {
          this.$router.push('/admin');
        } else {
          this.$router.push('/user')
        } 
      } catch (error) {
        console.log(error.response.status);
        if ( error.response.status == 404 ){
          this.show_alert = true;
          this.error = "User tidak ditemukan";
          this.resetAlert();
          return;
        } else {
          this.show_alert = true;
          this.error = "Password Salah";
          this.resetAlert();
          return;
        }
      }
    },
    resetAlert(){
      setTimeout( () => {
        this.show_alert = false;
      },5000)
    }
  }
}
</script>
