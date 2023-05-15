import {createStore} from 'vuex'
import axios from 'axios'
import { REQUESTPATHBACK } from '../paths'
import Swal from 'sweetalert2'

export default createStore({
    state:{
        token:null
    },
    mutations:{
        setToken(state, payload){
            state.token = payload
        }
    },
    actions:{
        //connect with DB async

        async register({commit}, userRegister){
            console.log(userRegister)
            await axios.post(`${REQUESTPATHBACK}/api/user/register`, userRegister)
            .then(res=>console.log(res))
        },

        async login({commit}, usuario){
            console.log(usuario)
                     
                await axios.post(`${REQUESTPATHBACK}/api/user/login`, usuario)
                .then(res=>{
                    console.log(res.data.data.token)
                    commit('setToken', res.data.data.token)
                    localStorage.setItem('token', res.data.data.token)
                    
                })
                .catch(error=>console.error(error))
                
            
        },

        readToken({commit}){
            if(localStorage.getItem('token')){
                commit('setToken', localStorage.getItem('token'))
            }else{
                commit('setToken', null)
            }
        },
        logOut({commit}){
            localStorage.removeItem('token')
            commit('setToken', null)
            Swal.fire({
                title: '😊',
                text: 'We hope you will be back soon',
                icon: 'success',
                confirmButtonText: 'Cool'
                })
         
        }
           
    },
    modules:{},
})


