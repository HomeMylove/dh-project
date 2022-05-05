import { reqSendComment, reqGetComment } from '@/api/index'


const state = {
    comments: []
}
const mutations = {
    GETCOMMENT(state, comments) {
        state.comments = comments
    }

}
const actions = {
    async sendComment({ commit }, data) {
        const result = await reqSendComment(data)

        if (result.status == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    async getComment({ commit }, data) {

        const { articleId, order } = data

        const result = await reqGetComment(articleId, order)

        if (result.status == 200) {
            commit('GETCOMMENT', result.data)
        } else {
            return Promise.reject(new Error('failed'))
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