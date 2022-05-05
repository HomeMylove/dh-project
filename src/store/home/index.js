import { reqRecommend, reqNewArticle } from '@/api/index'


const state = {
    recommend: [],
    newArticle: []
}
const mutations = {
    GETRECOMMEND(state, recommend) {
        state.recommend = recommend
    },
    GETNEWARTICLE(state, newArticle) {
        state.newArticle = newArticle
    }
}
const actions = {
    async getRecommend({ commit }) {
        const result = await reqRecommend()
        if (result.status == 200) {
            commit('GETRECOMMEND', result.data)
        } else {
            console.log('failed to get recommend');
        }
    },
    async getNewArticle({ commit }) {
        const result = await reqNewArticle()
        if (result.status == 200) {
            commit('GETNEWARTICLE', result.data)
        } else {
            console.log('failed to get new article');
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