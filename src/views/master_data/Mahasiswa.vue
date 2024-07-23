<template>
  <ContentHeader> </ContentHeader>
  <ContentBody>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header"></div>
            <form class="form-horizontal">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group row">
                      <label for="inputEmail3" class="col-sm-3 col-form-label"
                        >NIM</label
                      >
                      <div class="col-sm-4">
                        <input
                          type="text"
                          class="form-control"
                          id="inputEmail3"
                          placeholder="Masukan NIM"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label
                        for="inputPassword3"
                        class="col-sm-3 col-form-label"
                        >NAMA</label
                      >
                      <div class="col-sm-8">
                        <input
                          type="text"
                          class="form-control"
                          id="inputPassword3"
                          placeholder="Masukan Nama"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label
                        for="inputPassword3"
                        class="col-sm-3 col-form-label"
                        >ANGKATAN</label
                      >
                      <div class="col-sm-8">
                        <!-- <select
                          class="form-control"
                          id="exampleFormControlSelect1"
                        >
                        <option>Semua</option>
                          <option>2020</option>
                          <option>2021</option>
                          <option>2022</option>
                          <option>2023</option>
                          <option>2024</option>
                        </select> -->
                        <select class="select2bs4" multiple="multiple" data-placeholder="Pilih tahun" style="width: 100%;">
                          <option>2020</option>
                          <option>2021</option>
                          <option>2022</option>
                          <option>2023</option>
                          </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group row">
                      <label
                        for="inputPassword3"
                        class="col-sm-3 col-form-label"
                        >JURUSAN</label
                      >
                      <div class="col-sm-6">
                        <select
                          class="form-control"
                          id="exampleFormControlSelect1"
                        >
                          <option>Semua</option>
                          <option>Administrasi Publik</option>
                          <option>Administrasi Bisnis</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label
                        for="inputPassword3"
                        class="col-sm-3 col-form-label"
                        >SPESIFIK</label
                      >
                      <div class="col-sm-6">
                        <select
                          class="form-control"
                          id="exampleFormControlSelect1"
                        >
                          <option>Semua</option>
                          <option>Mahasiswa Reguler</option>
                          <option>Mahasiswa Non-Reguler</option>
                          <option>Rekognisi</option>
                        </select>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-footer">
                <button type="submit" class="btn btn-info">Tampilkan</button>
                <button type="button" class="btn btn-default ml-2">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header"></div>
            <div class="card-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>NIM</th>
                    <th>NAMA</th>
                    <th>JURUSAN</th>
                    <th>AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(pengajar , index ) in dosenList " :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ pengajar.nidn }}</td>
                    <td>{{ pengajar.nama_dosen }}</td>
                    <td>{{ pengajar.agama }}</td>
                    <td>
                      <button class="btn btn-success">EDIT</button>
                      <button class="btn btn-danger">HAPUS</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- <ul>
                <li v-for="pengajar in dosenList" :key="pengajar.id_dosen" >
                  {{ pengajar.nama_dosen }}
                </li>
              </ul> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContentBody>
</template>

<script>
import axios from "axios";
import ContentHeader from "@/layouts/inc/ContentHeader.vue";
import ContentBody from "@/layouts/inc/ContentBody.vue";
import { ref, onMounted } from "vue";
//import $ from 'jquery';
//import 'datatables.net';
//import 'datatables.net-dt/css/jquery.dataTables.css';

export default {
  name: "Mahasiswa",
  components: {
    ContentHeader,
    ContentBody,
  },
  setup() {
    const selectedWow = ref([]);
    // const columns = ref([]);
     const rows = ref([]);
     const token = ref('');
     const dosen = ref([]);
     const dosenList = ref([]);

     const fetchMahasiswa = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/mahasiswa"
        );
        //console.log(response.data);
        rows.value = response.data;
      } catch (error) {
        console.info(error);
      }
    }; 

    const getToken = async () => {
      try {
        const payload = {
          act : 'GetToken',
          username : '113035',
          password : 'baak113035'
        }
        const response = await axios.post('http://192.168.1.16:3003/ws/live2.php',payload);
        console.log(response.data.data.token);
        token.value = response.data.data.token;
      } catch(error){
        console.log(error)
      }
    }

    const getDosen = async () => {
      try {
        const payload = {
          act : 'GetListDosen',
          token : token.value,
        }
        const response = await axios.post('http://192.168.1.16:3003/ws/live2.php',payload);
        dosen.value = response.data.data;
        
      } catch(error){
        console.info(error);
      }
    }

    const extractDosen = () => {
      dosenList.value = dosen.value.map( dosen => ({
        nidn : dosen.nidn,
        nama_dosen : dosen.nama_dosen,
        agama : dosen.nama_agama
      }))
    }
    
   

    onMounted( async () => {
      fetchMahasiswa().then( () => {
            $('#example').DataTable();
        } ) 
      
       await getToken();
       await getDosen();
      //fetchMahasiswa();
      extractDosen();
      

      $(function () {
        $("#example1")
          .DataTable({
            responsive: true,
            lengthChange: false,
            autoWidth: false,
            buttons: ["copy", "csv", "excel", "pdf", "print"],
          })
          .buttons()
          .container()
          .appendTo("#example1_wrapper .col-md-6:eq(0)");

          $('.select2bs4').select2({
            theme : 'bootstrap4'
          })
      });
    });

    return {
      rows,
      token,
      dosen,
      dosenList
    }
  },
  
};
</script>
