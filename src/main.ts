import { createApp } from 'vue'
import App from './App.vue'
// vue-router
import router from './router/index'
// 引入google iconfont
import 'material-design-icons-iconfont/dist/material-design-icons.css'
// 引入自定义指令
import Ripple from './composables/ripple'

const app = createApp(App)
app.use(router)
app.directive('ripple', Ripple)
app.mount('#app')
