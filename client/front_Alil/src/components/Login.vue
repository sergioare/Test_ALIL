<template>
    <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="login(usuario)">
            <input type="email" placeholder="email" class="input" v-model="usuario.email"/>
            <input type="password" placeholder="password" class="input" v-model="usuario.password"/>
            <button type="submit" class="btn" @click='redirectToDashboard'>Access your account</button>
            <p>Don’t have an account? <span @click='redirectToRegister' class='link'>Sign Up</span></p> 
        </form>
    </div>
</template>

<script>
    import {mapActions} from 'vuex' //dispatch actions in component
    export default {
        data(){
            return{
                usuario:{
                    email:"pepeprueba@gmail.com",
                    password:"122415413"
                }
            }
        },
        methods:{
            ...mapActions(['login']),
             redirectToRegister(){
                 this.$router.push({name:'Register'});
            },
            redirectToDashboard(){
                this.$router.push({name:'Dashboard'});
            }
        },
        name:"Login"
    }
</script>

<style  lang="scss">
@import '@/assets/styles/styles.scss';
</style>