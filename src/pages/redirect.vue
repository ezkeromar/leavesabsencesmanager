<template>
  <div>
  </div>
</template>
<script>
import { bus } from '../plugins/event-bus.js'
import * as services from '../services/auth-services.js'

export default {
  name: 'redirect',
  data () {
    return {
      id: null
    }
  },
  created () {
  },
  mounted () {
    if (this.$store.state.Auth.user !== null && this.$store.state.Auth.user !== '') {
      this.id = this.$store.state.Auth.user.id
    } else {
      this.$q.loading.hide()
      this.$router.push('/login')
    }

    this.hasPermissionFunc(this.compCode, this.id)
    let that = this
    bus.$on('permissionGranted', function (res) {
      that.$q.loading.hide()
      that.$store.commit('Dashboard/setActiveMenu', res.menuTableId)
      that.$router.push(res.url)
    })

    bus.$on('permissionDenied', function (res) {
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        }
      } else {
        that.$q.loading.hide()
        that.$router.push('/admin')
      }
    })
  },
  methods: {
    hasPermissionFunc (Menu, User) {
      this.$store.commit('Dashboard/setActiveMenu', Menu)
      services.hasPermission({ menu: Menu })
    }
  },
  watch: {
    $route (to, from) {
      this.hasPermissionFunc(this.compCode, this.id)
    }
  },
  computed: {
    compCode () {
      return this.$route.params.id
    }
  },
  beforeDestroy () {
    bus.$off('permissionDenied')
    bus.$off('permissionGranted')
  }
}
</script>
