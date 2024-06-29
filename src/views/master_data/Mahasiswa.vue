<template>
  <ContentHeader> </ContentHeader>
  <ContentBody>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header"></div>
            <div class="card-body">
                <table id="example" class="display" style="width:100%">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Position</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in rows" :key="index">
                        <td>{{ row.nim }}</td>
                        <td>{{ row.nama }}</td>
                      </tr>
                    </tbody>
                  </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContentBody>
</template>
<script lang="ts" >
import axios from "axios";
import ContentHeader from "@/layouts/inc/ContentHeader.vue";
import ContentBody from "@/layouts/inc/ContentBody.vue";
import { ref , onMounted } from "vue";
//import $ from 'jquery';
//import 'datatables.net';
//import 'datatables.net-dt/css/jquery.dataTables.css';

export default {
  name: "Mahasiswa",
  components: {
    ContentHeader,
    ContentBody,
  },
  setup(){
    const columns = ref([]);
    const rows = ref([]);
    

    const fetchMahasiswa = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/mahasiswa');
            console.log(response.data);
            rows.value = response.data;
            (window as any).$DataTable("#example");

        } catch(error) {
            console.info(error);
        }
    }
    
    onMounted( () => {
        /*fetchMahasiswa().then( () => {
            $('#example').DataTable();
        } ) */
        fetchMahasiswa();
    } )

    return {
        rows
    }

  }
};
</script>
<style scoped>
@import 'datatables.net-dt/css/dataTables.dataTables.css';
</style>
