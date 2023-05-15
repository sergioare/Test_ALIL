<script>
  import {mapActions} from 'vuex'
  export default{
    methods:{
      ...mapActions(['readToken', 'logOut'])
    },
    created(){
      this.readToken()
    }
  }
</script>

<template>
  <div class="general">
    <nav>
       <router-link to="/" class="go-home">Go Home</router-link>
   |</nav>
    <router-view />
  </div>
</template>


<style lang="scss" scoped>
@import '@/assets/styles/styles.scss';

</style>