/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding initialization code.
 * Use "quasar new plugin <name>" and add it there.
 * One plugin per concern. Then reference the file(s) in quasar.conf.js > plugins:
 * plugins: ['file', ...] // do not add ".js" extension to it.
 **/

import 'quasar-framework/dist/quasar.ie.polyfills.js'



import 'quasar-extras/material-icons/material-icons.css'

import 'quasar-extras/fontawesome/fontawesome.css'




import 'quasar-app-styl'


import 'src/css/app.styl'


import Vue from 'vue'
import createApp from './app.js'




import pI18n from 'src/plugins/i18n'

import pAxios from 'src/plugins/axios'

import pMomentjs from 'src/plugins/momentjs'

import pJquery from 'src/plugins/jquery'











Vue.config.devtools = true
Vue.config.productionTip = false



console.info('[Quasar] Running SPA with MAT theme.')



const { app, store, router } = createApp()




;[pI18n,pAxios,pMomentjs,pJquery].forEach(plugin => {
  plugin({
    app,
    router,
    store,
    Vue,
    ssrContext: null
  })
})









new Vue(app)






