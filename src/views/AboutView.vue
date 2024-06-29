<template>
  <ContentHeader />
  <ContentBody>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header">
            <h3>Talk to me</h3>
          </div>
          <div class="card-body">
            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste illum ab autem veritatis atque. Vero eveniet et consequuntur aperiam! </p>
          </div>
        </div>
      </div>
    </div>
  </ContentBody>
</template>
<script>
import $ from "jquery";
import ContentBody from '@/layouts/inc/ContentBody.vue';
import ContentHeader from '@/layouts/inc/ContentHeader.vue';

export default {
  name : 'AboutView',
  components : {
    ContentBody,
    ContentHeader
  },
  beforeMount(){
    $('body').removeClass('login-page').addClass('sidebar-mini');
    // $('title').html('Halaman Login');
  }
}
</script>

<!-- <style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style> -->
