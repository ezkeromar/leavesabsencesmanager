<template>
  <q-layout class="loginbgstyle">
    <div class="container maincontainer">
      <router-view />
      <q-layout-footer class="loginfooter">
        <div class="container">
          <a href="#">
            <img src="statics/sirhus-footer.png" class="responsive float-right righttImg" />
          </a>
          <a href="#">
            <img src="statics/sofrecom-footer.png" class="responsive float-left leftImg" />
          </a>
        </div>
      </q-layout-footer>
    </div>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
