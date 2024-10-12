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
      VRow: {
        noGutters: true
      },
      VTextField: {
        variant: 'outlined',
        density: 'compact'
      },
      VBtn: {
        elevation: 0,
        variant: 'flat',
        minHeight: '40px'
      },
      VCardActions: {
        VBtn: {
          variant: 'flat'
        }
      },
      VBtnIcon: {
        maxHeight: '40',
        maxWidth: '40',
        icon: true,
        size: 'x-small',
        variant: 'flat'
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
