import Vue from 'vue'
import Vuex from 'vuex'

import Auth from './Auth'
import Dashboard from './dashboard'
import conge from './conge'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      Auth,
      Dashboard,
      conge
    }
  })

  return Store
}
