// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
import VueGoodTablePlugin from 'vue-good-table-next';
import Select2 from 'vue3-select2-component';
//import DataTable from 'datatables.net-vue3';
//import DataTablesPlugin from './plugins/datatables';



import 'vue-good-table-next/dist/vue-good-table-next.css'


const app = createApp(App)
const pinia = createPinia();

app.use(pinia)
app.use(router)
app.use(VueGoodTablePlugin);
//app.use(DataTablesPlugin);
app.component('Select2', Select2)
//DataTable.use(DataTablesCore);


app.mount('#app')
