import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// element-ui 按需引入
import { Dropdown, DropdownItem, DropdownMenu, Backtop, Header, Container, Main, Message, Empty, MessageBox, Input, FormItem, Col, Row, Button, Select, Table, TableColumn, Option, Form, Dialog } from 'element-ui';

Message.install = function(Vue, options) {
    Vue.prototype.$message = Message
}


Vue.use(Message)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(Dropdown.name, Dropdown)
Vue.component(Backtop.name, Backtop)
Vue.component(Header.name, Header)
Vue.component(Container.name, Container)
Vue.component(Main.name, Main)
Vue.component(Empty.name, Empty)
Vue.component(Dialog.name, Dialog)
Vue.component(Form.name, Form)
Vue.component(Input.name, Input)
Vue.component(FormItem.name, FormItem)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Option.name, Option)


// 语言
import i18n from './lang/index'






// 引入图标字体
import './assets/fonts/iconfont.css'

// 引入仓库
import store from '@/store'

// 引入路由
import router from '@/router'

new Vue({
    render: h => h(App),
    router,
    store,
    i18n,
}).$mount('#app')