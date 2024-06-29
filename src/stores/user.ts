import { defineStore } from "pinia";
// import { ref, computed } from "vue";
export const userStore = defineStore('user',{
    // state(){
    //     return {
    //         token : localStorage.getItem('token') || null,
    //         isAuth : false,
    //         refresh_token : null
    //     }
    // },
    state : () => ({
        token : localStorage.getItem('token') || null,
        isAuth : false,
        refresh_token : null,
        role : ""
    }),
    actions : {

        // setToken(name : string){
        //     this.token = name ;
        // },
        // setAuth(){
        //     this.isAuth = true
        // },
        login(token : string, role : string){
            this.token = token;
            this.isAuth = true;
            this.role = role;
        },
        logout(){
            this.token = null;
            this.isAuth = false;
            this.role = "";
            localStorage.removeItem('token');
            sessionStorage.removeItem('role');
        }
    },
    getters : {
        terOtentikasi : (state) => !!state.isAuth,
        punyaToken : (state) => state.token,
        userRole : (state) => state.role
    }
})