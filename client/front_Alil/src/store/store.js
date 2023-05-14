import {createStore} from 'vuex'
import axios from 'axios'

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

        async login({commit}, usuario){
            console.log(usuario)
            try {
               
                await axios.post('http://localhost:3002/api/user/login', usuario)
                .then(res=>{
                    // console.log(res.data.data.token)
                    commit('setToken', res.data.data.token)
                    localStorage.setItem('token', res.data.data.token)
                    
                })

            } catch (error) {
                console.log(error)
            }
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
        }
           
    },
    modules:{},
})


