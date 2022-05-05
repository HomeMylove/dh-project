/**
 * 管理api接口
 */

import requests from "./request";

// 获取最新添加的 作品
export const reqNewArticle = () => requests({ url: '/getNewArticle', method: 'get' })

// 获得推荐
export const reqRecommend = () => requests({ url: '/recommend', method: 'get' })


// 搜索关键词
export const reqGetInfo = (choice, keyword) => requests({ url: '/getInfo', method: 'post', data: { choice, keyword } })

// 获取作者信息
export const reqGetAuthorInfo = (authorId) => requests({ url: `/getAuthorInfo/?authorId=${authorId}`, method: 'get' })

// 获取文章
export const reqTextById = articleId => requests({ url: `/getText/?articleId=${articleId}`, method: 'get' })

// 发送评论
export const reqSendComment = data => requests({ url: '/sendComment', method: 'post', data })

// 获取评论
export const reqGetComment = (articleId, order) => requests({ url: `/getComment/?articleId=${articleId}&&order=${order}`, method: 'get' })

// 上传作者
export const reqUploadAuthor = data => requests({ url: '/uploadAuthor', method: 'post', data })

// 检查作者是否存在
export const reqCheckAuthorName = name => requests({ url: `/checkAuthorName/?name=${name}`, method: 'get' })

export const reqGetAuthorId = name => requests({ url: `/getAuthorId/?name=${name}`, method: 'get' })

// 上传文章
export const reqUploadArticle = data => requests({ url: '/uploadArticle', method: 'post', data })

// 上传讨论
export const reqSendDiscussion = data => requests({ url: '/sendDiscussion', method: 'post', data })

// 获取讨论
export const reqGetDiscussion = (keyword, order) => requests({ url: `/getDiscussion/?keyword=${keyword}&&order=${order}`, method: 'get' })