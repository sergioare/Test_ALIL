<template>
    <div class="dashboard">
        <label for="quantity">Enter the amount you wish to convert </label>
        <input type="number" placeholder="Enter amount" id="quantity" class="input" v-model="convertor.quantity"/>
        
        <label for="from">From...</label>
            <select class="select"  id="from" v-model="convertor.from">
                <option v-for="currency in currenciesToArray">
                    {{ currency.name }}
                </option>
            </select>

        <label for="to">To...</label>
            <select class="select" id="to" v-model="convertor.to">
                <option v-for="currency in currenciesToArray">
                    {{ currency.name }}
                </option>
            </select>
        
        <button @click="currencyConverter">Convert</button>

        <button @click="logOut" class="btn">Log out</button>

    </div>
</template>

<script>
import axios from 'axios';
import {mapActions, mapState} from 'vuex'
import { REQUESTPATHBACK, REQUESTAPICONVERT, REQUESTCURRENCIES } from '../paths';

 export default {
    data(){
            return{
                convertor:{
                    currencies: {},
                    quantity: null,
                    from: "USD",
                    to: "COP",
                    result: null
                }
            }
        },
        mounted(){
            this.getCurrencies()
        },
        computed:{
            currenciesToArray(){
                try{
                    return Object.entries(this.convertor.currencies).reduce((acc, [code, name]) => {
                    acc.push({ code, name });
                    return acc;
                }, []);
                
                }catch(error){
                    console.log(error)
                }
                           
            },
            ...mapState(['token']),
        },
        methods:{
            async protectedData(){
                const config ={
                    headers:{
                        'content-type': 'application/json',
                        'auth-token': this.token
                    }
                }
                await axios.get(REQUESTPATHBACK , config)
                .then(res=> console.log(res))
                .catch(err=> console.log(err)) 
                
            },
            ...mapActions(['logOut']),
            getCurrencies(){
                const currenciesSaved = localStorage.getItem('currencies');
                    if(currenciesSaved){
                        this.currencies = JSON.parse(currenciesSaved)
                        return;
                    }
                axios.get(REQUESTCURRENCIES)
                .then(res=>{
                this.convertor.currencies = res.data
                localStorage.setItem('currencies', JSON.stringify(res.data))
                console.log(res.data)
            })
            },
            currencyConverter(){
                axios.get(`${REQUESTAPICONVERT}/${this.convertor.quantity}/${this.convertor.from}/${this.convertor.to}?app_id=283a6f3f095e4163bf2653e5a13a614c`)
                .then(res=>console.log(res))
            }
        },
        created(){
            this.protectedData()
        },
        name: "Dashboard",
    };
</script>

<style lang="scss">
@import '@/assets/styles/styles.scss'
</style>