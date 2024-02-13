/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
//import { VDataTable, VDataTableServer, VDataTableVirtual } from 'vuetify/labs/VDataTable'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'


// Composables
import { createVuetify } from 'vuetify'
import DateFnsAdapter from '@date-io/date-fns'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { createI18n, useI18n } from 'vue-i18n'
import { en, pt } from 'vuetify/locale'
const messages = {
  pt: {
      $vuetify: {
        ...pt,
        dataIterator: {
          rowsPerPageText: 'Itens por página',
          pageText: '{0}-{1} of {2}',
        },
      },
  },
  
}
const i18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: 'pt',
  fallbackLocale: 'en',
  messages,
})


// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    //VDataTable,
    //VDataTableServer,
    //VDataTableVirtual
  },
  theme: {
    defaultTheme: 'dark'
  },
  locale:{
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  }
})
