import { reqGetInfo } from '@/api/index'

const state = {
    info: []
}
const mutations = {
    GETINFO(state, info) {
        state.info = info
    }
}
const actions = {
    async getInfo({ commit }, query) {

        // console.log(query);
        const { choice, keyword } = query

        // return
        const result = await reqGetInfo(choice, keyword)

        if (result.status == 200) {
            commit("GETINFO", result.data)
        }
    }
}
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}