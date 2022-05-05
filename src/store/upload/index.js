import { reqUploadAuthor, reqCheckAuthorName, reqGetAuthorId, reqUploadArticle } from '@/api/index'

const state = {


}
const mutations = {}
const actions = {
    async uploadAuthor({ commit }, data) {

        const result = await reqUploadAuthor(data)

        if (result.status == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed to upload author'))
        }
    },

    async checkAuthrName({ commit }, name) {

        const result = await reqCheckAuthorName(name)

        if (result.status == 200) {
            return result.data
        } else {
            return Promise.reject(new Error('Fail to check author name'))
        }
    },
    async getAuthorId({ commit }, name) {

        const result = await reqGetAuthorId(name)

        if (result.status == 200) {
            return result.data
        } else {
            return Promise.reject(new Error('failed to get author id'))
        }

    },
    // 上传文章
    async uploadArticle({ commit }, data) {

        const result = await reqUploadArticle(data)

        if (result.status == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed to upload article'))
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