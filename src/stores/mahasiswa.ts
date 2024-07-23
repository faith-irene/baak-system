import { defineStore } from "pinia";


export const mahasiswaStore = defineStore('mahasiswa',{
    state : () => ({
        mahasiswa : [],
    }),
    actions : {
        getMahasiswa(){
            
        }
    }
})