const state = {
    customerId:'',
}

const mutations ={

   
    handleModifyChoose(state,params){
       state.customerId = params;
       
        
    }
}


export default {
    state,
    mutations,
    namespaced:true

}