/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(Vue3Toastify, {
  autoClose: 3000,
  theme: 'dark',
  position: 'top-right' 
} as ToastContainerOptions);
}
