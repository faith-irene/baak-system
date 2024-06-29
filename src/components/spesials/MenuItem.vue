<template>
    <!-- <li class="nav-item">
        <router-link :to="link" :class="{ active : isActive() }" class="nav-link" >
            <i class="nav-icon" :class="icon" v-if="icon" ></i>
            <p>
                <slot />
            </p>
        </router-link>
        <ul v-if="submenu && submenu.length > 0 " >
            <li v-for="sub in submenu" :key="sub.id">
                {{ sub.submenu }}
            </li>
        </ul>
    </li> -->
    <li class="nav-item" >
            <router-link v-if="submenus.length" to="#"  class="nav-link" >
            <span><i class="nav-icon" :class="menu.icon" ></i></span>
            {{ menu.title }}
            <i class="nav-icon fa fa-angle-left right" ></i>
            </router-link>
            <router-link v-else :to="`/${role}/${menu.link}`"  class="nav-link"  >
                <span><i class="nav-icon" :class="menu.icon" ></i></span>
            {{ menu.title }}
            </router-link>
        <ul v-if="submenus.length" class="nav nav-treeview" >
            <li v-for="submenu in submenus" :key="submenu.id" class="nav-item" >
                <!-- <a href="#" class="nav-link">{{ submenu.submenu }}</a> -->
                <router-link :to="`/${role}/${submenu.link}`" class="nav-link" >
                    {{ submenu.title }}
                </router-link>
            </li>
        </ul>
    </li>
</template>
<script setup >
import { useRoute } from 'vue-router';
//import { userStore } from '@/stores/user';
//import { ref } from 'vue';
const role = sessionStorage.getItem('name_role');


const route = useRoute();
defineProps({
    icon : {
        type : String,
        default : null
    },
    link : {
        type : [String,Object],
        default : null
    },
    menu : {
        type : Object,
        default : null
    },
    submenus : {
        type : Array,
        default : () => []
    },
    role : {
        type : String,
    }
})

function isActive(){
    if ( typeof this.link === "object" ){
        return route.name === this.link.name
    } else {
        return route.path === this.link
    }
}

</script>
<style scoped>
.has-submenu > a {
  font-weight: bold;
}
.nav-treeview {
  padding-left: 20px;
}
</style>