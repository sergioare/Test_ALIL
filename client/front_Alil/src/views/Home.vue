<template>
    <div class="home">
        <div class="left">
            <h2>Welcome to your trusted currency convert</h2>
            <div class="slider">
                <img 
                    v-for="image in images"
                    :key="image.id"
                    :src="image.src"
                    :alt="image.alt"
                    class="images-landing"
                >
            </div>
        </div>
        <div class="right">
            <h2>Try to access your currency converter panel or log in. </h2>
            
                <nav>
                    <router-link to="/login" class="link">Login</router-link>
                <br>    
                    <router-link to="/dashboard" class="link">Dashboard</router-link>    
                 </nav>
          <router-view />

          
        </div>
    </div>
    
    
</template>

<script>
import { images } from '@/assets/data-images';
    export default {
    name: "Home",
    setup(){
        return {images}
    }
    };
</script>

<style lang="scss" scoped>
@import '@/assets/styles/styles.scss'
</style>