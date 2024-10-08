import './assets/main.css'
import 'vuetify/styles'

import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { md2 } from 'vuetify/blueprints'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { VBtn } from 'vuetify/components/VBtn'
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
        primary: '#01579B'
      }
    },
  },
}

const vuetify = createVuetify({
    components,
    directives,
    aliases: {
      VBtnIcon: VBtn
    },
    defaults: {
      VTextField: {
        variant: 'outlined',
        density: 'compact'
      },
      VBtn: {
        elevation: 0,
        variant: 'flat'
      },
      VCardActions: {
        VBtn: {
          variant: 'flat'
        }
      },
      VBtnIcon: {
        height: '40',
        width: '40'
      }
    },
    blueprint: md2,
    theme: theme,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    }
  })

app.use(router)
app.use(vuetify)

app.mount('#app')
