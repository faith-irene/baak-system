import { App } from 'vue';
import type { Plugin } from 'vue';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $DataTable: ( selector : string ) => void ;
    }
}

const DataTablesPlugin : Plugin = {
    install( app : App){
        app.config.globalProperties.$DataTable = ( selector : string ) => {
                $(selector).DataTable();
            
        }
    }
} 

export default DataTablesPlugin;