<template>
    <div class="login">
        <h2>Register</h2>
        <form @submit.prevent="register(userRegister)">
            <input type="text" placeholder="Username" class="input" v-model="userRegister.username"/>
            <input type="email" placeholder="Email" class="input" v-model="userRegister.email"/>
            <input type="password" placeholder="Password" class="input" v-model="userRegister.password"/>
            <button type="submit" class="btn" @click='redirectToDashboard'>Create an account</button>
            <p>Do you have an account? <span @click='redirectToLogin' class='link'>Sign in</span></p> 
        </form>
    </div>
</template>

<script >
import {mapActions} from 'vuex' //dispatch actions in component
import Swal from 'sweetalert2'

    export default {
        data(){
            return{
                userRegister:{
                    username: "",
                    email:"",
                    password:""
                }
            }
        },
        methods:{
            ...mapActions(['register']),
             redirectToLogin(){
                 this.$router.push({name:'Login'});
            },
            redirectToDashboard(){
                this.$router.push({name:'Login'});
                Swal.fire({
                title: 'Success',
                text: 'Thank you for register',
                icon: 'success',
                confirmButtonText: 'Cool'
      })
            }
        },
        name:"Register"
    }
</script>

<style lang="scss" scoped>
@import '@/assets/styles/styles.scss';
</style>