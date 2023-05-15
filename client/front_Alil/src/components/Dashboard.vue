<template>
    <div class="dashboard">
        <label for="quantity">Enter the amount you wish to convert </label>
        <input type="number" placeholder="Enter amount" id="quantity" class="input" v-model="convertor.quantity"/>
        
        <label for="from">From...</label>
            <select class="select"  id="from" v-model="convertor.from">
                <option :value="currency.code" v-for="currency in currenciesToArray">
                    {{ currency.name }}
                </option>
            </select>

        <label for="to">To...</label>
            <select class="select" id="to" v-model="convertor.to">
                <option :value="currency.code" v-for="currency in currenciesToArray">
                    {{ currency.name }}
                </option>
            </select>
        
        <button @click="currencyConverter">Convert</button>

        <button @click="logOut" class="btn">Log out</button>

        <p>Result: {{ convertor.result }}</p>

    </div>
</template>

<script>
import axios from 'axios';
import {mapActions, mapState} from 'vuex'
import { REQUESTPATHBACK, REQUESTAPICONVERT, REQUESTCURRENCIES, REQUESTAPIVALUES } from '../paths';

 export default {
    data(){
            return{
                convertor:{
                    currencies: {},
                    valuesApi:{},
                    quantity: null,
                    from: "USD",
                    to: "COP",
                    result: null
                }
            }
        },
        mounted(){
            this.getCurrencies(),
            this.getLastestValueApi()
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
            valuesToArray(){
                try{
                    return Object.entries(this.convertor.valuesApi).reduce((acc, [code, value]) => {
                    acc.push({ code, value });
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
            getLastestValueApi(){
                const valuesSaved = sessionStorage.getItem('values');
                    if(valuesSaved){
                        this.convertor.valuesApi = JSON.parse(valuesSaved)
                        return;
                    }
                axios.get(REQUESTAPIVALUES)
                .then(res=>{
                    this.convertor.valuesApi = res.data.rates
                    sessionStorage.setItem('values', JSON.stringify(res.data.rates))
                    console.log(res.data.rates)
                })
            },
            currencyConverter(){
                
                const values = this.convertor.valuesApi
                const currencyFrom = this.convertor.from
                const currencyTo = this.convertor.to
                const valueFrom = values[currencyFrom]
                const valueTo = values[currencyTo]
                const amount = this.convertor.quantity

                if (currencyFrom === 'USD') {
                    const result = amount * valueTo;
                    this.convertor.result = result.toFixed(2);
                } else if (currencyTo === 'USD') {
                    const result = amount / valueFrom;
                    this.convertor.result = result.toFixed(2);
                } else {
                    const usdAmount = amount / valueFrom;
                    const result = usdAmount * valueTo;
                    this.convertor.result = result.toFixed(2);
                }

                //  axios.get(`${REQUESTAPICONVERT}/${this.convertor.quantity}/${this.convertor.from}/${this.convertor.to}?app_id=283a6f3f095e4163bf2653e5a13a614c`)
                // .then(res=>console.log(res))
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