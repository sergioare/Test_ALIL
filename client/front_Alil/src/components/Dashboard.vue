<template>
    <div>
        Ruta protegida
        {{ token }}
    </div>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex'
 export default {
    name: "Dashboard",
    computed:{
        ...mapState(['token', 'logOut'])
    },
    methods:{
        async protectedData(){
            const config ={
            headers:{
                'content-type': 'application/json',
                'auth-token': this.token
            }
            }
            await axios.get('http://localhost:3002/api/dashboard', config)
            .then(res=> console.log(res))
            .catch(err=> console.log(err)) 
    
        }
    },
    created(){
        this.protectedData()
    }
};
</script>

<style lang="scss" scoped>

</style>