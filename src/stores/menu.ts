import { defineStore } from "pinia";

export const menuStore = defineStore('menu',{
    state : () => ({
        is_collapse : false
    }),
    getters : {
        getCollapse : (state) => !!state.is_collapse 
    },
    actions : {
        toogleSidebar(nilai : boolean){
            this.is_collapse = nilai;
        }
    }
})