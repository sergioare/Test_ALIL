<template>
    <div class="login">
        <h1>Login</h1>
        <form @submit.prevent="login(usuario)">
            <input type="email" placeholder="email" v-model="usuario.email"/>
            <input type="password" placeholder="password" v-model="usuario.password"/>
            <button type="submit">Access your account</button>
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
            ...mapActions(['login'])
        },
        name:"Login"
    }
</script>

<style  scoped>

</style>