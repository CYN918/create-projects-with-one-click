import {  getActivity } from '@/api/mallapp/homeEditor'
const homeEidtList = {
    state: {
        activityList:[]
    },

    mutations: {
        SET_HOME: (state, activityList) => {
            state.activityList = activityList
        },
    },
    actions:{
        async getActivity({commit}){
            let data
           const res =  await getActivity()
            if(res.code === 200 ){
                data = res.data
                commit('SET_HOME',data)
            }
        }
    }
}

export default homeEidtList

