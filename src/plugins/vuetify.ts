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

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    //VDataTable,
    //VDataTableServer,
    //VDataTableVirtual
  },
  theme: {
    defaultTheme: 'dark'
  }
})
