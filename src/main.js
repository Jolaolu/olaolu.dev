import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './registerServiceWorker'
import { ContactForm } from '@/components'
import { ContentView, Cavalier, Button, InputGroup } from '@/SauceDrip'

Vue.component('Button', Button)
Vue.component('Cavalier', Cavalier)
Vue.component('InputGroup', InputGroup)
Vue.component('ContactForm', ContactForm)
Vue.component('ContentView', ContentView)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
