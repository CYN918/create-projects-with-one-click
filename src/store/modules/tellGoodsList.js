const state = {
  handleListParams:[],
  searchDataList:[],
  searchRecommondData:[],
}

const mutations ={
  SET_tellGoodsList(state,params){
    state.handleListParams = params;
  },
  SET_searchDataList(state,params){
    state.searchDataList = params;
  },
  SET_searchRecommondData(state,params){
    state.searchRecommondData = params;
  },
}
// getters
const getters = {}

// actions
const actions = {}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
