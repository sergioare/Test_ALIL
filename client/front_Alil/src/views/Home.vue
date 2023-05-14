<template>
    <h1>este es el home</h1>
        <nav>
            <router-link to="/login">Login</router-link>
        <br>    
            <router-link to="/dashboard">Dashboard</router-link>    
         </nav>
  <router-view />
</template>

<script>
    export default {
    name: "Home",
    };
</script>

<style lang="scss" scoped>

</style>