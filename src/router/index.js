import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter)


import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Details from '@/pages/Details'
import Read from '@/pages/Read'
import Upload from '@/pages/Upload'
import Discussion from '@/pages/Discussion'
import External from '@/pages/External'

const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: { path: '/home' }
        },
        {
            path: "/home",
            component: Home
        },
        {
            path: "/search",
            component: Search
        },
        {
            path: "/details/:authorId?",
            component: Details,
            name: 'details'
        },
        {
            path: '/read/:articleId?',
            component: Read,
            name: 'read'
        },
        {
            path: '/upload',
            component: Upload,
            name: 'upload'
        },
        {
            path: '/discussion',
            component: Discussion,
            name: 'discussion'
        },
        {
            path: '/external',
            component: External,
            name: 'external'
        }, {
            path: "*",
            redirect: '/'
        }
    ],

})

router.beforeEach((to, from, next) => {
    // chrome
    document.body.scrollTop = 0
        // firefox
    document.documentElement.scrollTop = 0
        // safari
    window.pageYOffset = 0
    next()
})

export default router