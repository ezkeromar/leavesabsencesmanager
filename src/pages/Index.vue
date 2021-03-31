<template>
        <div class="row flex justify-center items-center loginContainer">
          <div class="col-md-4 loginSlide loginBlocks">
            <div  class="newsPicture flex items-end" style="background-image: url('statics/loginpictside.jpg')">
              <!-- <div class="row">
                <h4 class="col-xs-12">Omar Omar</h4>
                <p class="col-xs-12">Omar description Omar description Omar description Omar description Omar description Omar description </p>
              </div> -->
            </div>
          </div>
          <div class="col-md-4 col-sm-11 col-xs-11 loginBlocks">
            <div class="loginForm flex justify-center items-center">
            <div class="">
              <h4>{{$t('demande.conge.loginTitle')}}</h4>
              <div></div>
              <p><b>{{$t('demande.conge.loginSubTitle')}}</b></p>
              <div class="lgform">
                <q-field class="fieldlg">
                  <q-input :float-label="this.$t('demande.conge.utilisateur')" v-model="username" />
                </q-field>
                <q-field class="fieldlg">
                  <q-input @keyup.enter="login" type="password" :float-label="$t('demande.conge.password')" v-model="password" />
                </q-field>
                <q-btn
                  class="btnlg"
                  size="auto"
                  :label="$t('demande.conge.connecter')"
                  @click="login"
                />
              </div>
            </div>
            </div>
          </div>
        </div>
</template>

<style>
</style>

<script>
import { Notify } from 'quasar'
import { bus } from '../plugins/event-bus.js'

export default {
  name: 'PageIndex',
  created () {
  },
  mounted () {
    let that = this
    bus.$on('signInSuccess', function (res) {
      that.$store.commit('Auth/setUser', res)
      that.$store.commit('Auth/setToken', res.accessToken)
      that.$store.commit('Auth/SetLoading', true)
      that.$store.commit('Auth/SetLoggedNow', true)
      that.$router.push('modules')
    })

    bus.$on('signInFailed', function (res) {
      console.log(res)
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setUnauthorizedError', res.data.message)
        }
      }
    })
  },
  data: function () {
    return {
      username: '',
      password: '',
      data: ''
    }
  },
  methods: {
    login () {
      if (this.username !== '' && this.password !== '') {
        this.$store.dispatch('Auth/signIn', { username: this.username, password: this.password })
      } else {
        Notify.create({
          type: 'negative',
          message: this.$t('demande.conge.emptyLogin'),
          icon: 'fa fa-times'
        })
      }
    }
  },
  beforeDestroy () {
    bus.$off('signInSuccess')
    bus.$off('signInFailed')
  }
}
</script>
