import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from '@/store/index.js'

Vue.config.productionTip = false
const sysHeight=uni.getSystemInfoSync().screenHeight
const sysWidth=uni.getSystemInfoSync().screenWidth
Vue.prototype.hpx = sysHeight/100
Vue.prototype.wpx = sysWidth/750
Vue.prototype.$store = store

App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif