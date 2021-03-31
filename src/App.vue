<template>
  <div id="q-app">
    <router-view />
    <q-ajax-bar />
    <div :class="{ 'load': loading }"></div>
  </div>
</template>

<script>
import { Notify } from 'quasar'
import 'vue-select/dist/vue-select.css'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
    unauthorizedError () {
      return this.$store.state.Auth.unauthorizedError
    },
    expiredError () {
      return this.$store.state.Auth.expiredError
    },
    loading () {
      return this.$store.state.Auth.loading
    }
  },
  methods: {
    loadDataFromStorage () {
      if (!this.$store.state.Auth.user) {
        this.$store.state.Auth.user = JSON.parse(localStorage.getItem('user'))
        this.$store.state.Dashboard.multiplemodules = JSON.parse(localStorage.getItem('multiplemodules'))
      }
    }
  },
  watch: {
    $route (to, from) {
      if (to.meta.requiresAuth === true) {
        if (localStorage.getItem('user') === null) {
          this.$router.push('/login')
        } else {
          this.loadDataFromStorage()
        }
      } else {
        if (localStorage.getItem('user') !== null) {
          this.$router.push('/admin')
          this.loadDataFromStorage()
        }
      }
    },
    unauthorizedError (newVal, oldVal) {
      if (newVal !== false) {
        this.$router.push('/login')
        Notify.create({
          type: 'negative',
          message: this.$store.state.Auth.unauthorizedError,
          icon: 'fa fa-times'
        })
        this.$store.state.Auth.unauthorizedError = false
      }
    },
    expiredError (newVal, oldVal) {
      if (newVal === true && this.$store.state.Auth.unauthorizedError === false) {
        this.$router.push('/login')
        Notify.create({
          type: 'info',
          message: this.$t('demande.conge.expiredLogin'),
          icon: 'fa fa-info-circle'
        })
        this.$store.state.Auth.expiredError = false
      }
    }
  }
}
</script>

<style>
</style>
