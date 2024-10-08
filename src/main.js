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

const theme = {
  themes: {
    light: {
      dark: false,
      colors: {
        primary: '#03A9F4'
      }
    },
  },
}

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
    blueprint: md2,
    theme: theme
  })

app.use(router)
app.use(vuetify)

app.mount('#app')
