import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { install } from "vue3-recaptcha-v2";
import router from './router'

createApp(App)
  .use(router)
  .use(install, {
    sitekey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
    cnDomains: false,
  })
  .mount("#app");