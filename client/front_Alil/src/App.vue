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
  <button @click="logOut">Log out</button>
 <nav>
    <router-link to="/">Home</router-link>
|</nav>
  <router-view />
</template>


<style lang="scss" scoped>

</style>