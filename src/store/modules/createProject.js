import { login, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken  } from '@/utils/auth'

const createProject = {
    state: {
        headerDialogVisible:false,
        isShowSidebar:true,
        left:150,
    },

    mutations: {
        SET_HEADER:(state,headerDialogVisible)=>{
            state.headerDialogVisible = headerDialogVisible
        },
        SET_SIDEBAR:(state,isShowSidebar)=>{
            state.isShowSidebar = isShowSidebar
        },
        SET_ETID:(state,left)=>{
            state.left = left
        }

    },


}

export default createProject
