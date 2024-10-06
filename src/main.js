import './assets/main.css'
import 'vuetify/styles'

import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { md2 } from 'vuetify/blueprints'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
    defaults: {
      VTextField: {
        variant: 'outlined',
        density: 'compact'
      },
      VBtn: {
        elevation: 0
      }
    },
    blueprint: md2
  })

app.use(router)
app.use(vuetify)

app.mount('#app')
