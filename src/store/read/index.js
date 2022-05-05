import { reqTextById } from '@/api/index'


const state = {
    article: {}
}
const mutations = {
    GETARTICLE(state, article) {
        state.article = article
    }
}
const actions = {
    async getArticle({ commit }, articleId) {

        const result = await reqTextById(articleId)

        if (result.status == 200) {
            commit('GETARTICLE', result.data)
        } else {
            console.log('failed to get article');
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