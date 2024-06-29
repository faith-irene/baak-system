<template>
  <section class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 v-if="title" >
            <i :class="icon" v-if="icon" ></i>
            {{ title }}
          </h1>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

 
export default {
  name : "ContentHeader",
  props : {
    title : {
      type : String,
      default : null
    },
    icon : {
      type : String,
      default : null
    }
  }
}
</script>