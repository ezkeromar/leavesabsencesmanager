/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding initialization code.
 * Use "quasar new plugin <name>" and add it there.
 * One plugin per concern. Then reference the file(s) in quasar.conf.js > plugins:
 * plugins: ['file', ...] // do not add ".js" extension to it.
 **/

import 'quasar-extras/material-icons/material-icons.css'

import 'quasar-extras/fontawesome/fontawesome.css'




import 'quasar-app-styl'


import 'src/css/app.styl'


import createApp from './app.js'
import Vue from 'vue'



import pluginI18n from 'src/plugins/i18n'

import pluginAxios from 'src/plugins/axios'

import pluginMomentjs from 'src/plugins/momentjs'


// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
  return new Promise(async (resolve, reject) => {
    const { app, store, router } = createApp(context)

    
    ;[pluginI18n,pluginAxios,pluginMomentjs].forEach(plugin => {
      plugin({
        app,
        router,
        store,
        Vue,
        ssrContext: context
      })
    })
    

    const
      { url } = context,
      { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      return reject({ url: fullPath })
    }

    // set router's location
    router.push(url)

    // wait until router has resolved possible async hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // no matched routes
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      

      context.state = store.state

      
      const App = new Vue(app)
      context.$getMetaHTML = App.$getMetaHTML(App)
      resolve(App)
      

      
    }, reject)
  })
}
