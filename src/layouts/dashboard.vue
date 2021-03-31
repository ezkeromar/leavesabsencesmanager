<template>
  <q-layout view="lHh Lpr lFf">
    <nav-menu></nav-menu>
    <q-page-container class="dashboardConttransition dashboardContainer">
      <div class="contentContainer flex items-center justify-center">
        <div class="takeAllWidth">
          <router-view />
        </div>
      </div>
      <div class="adminFooter adminFooterAbs" :class="{ adminFooterAbs: showScroll }">
        <p class="leftText">
          Sofrecom Services Maroc © 2019<br/>
          Technopolis - Batiment B0 - 2ème étage<br/>
          11100 Sala Aljadida<br/>
          Maroc<br/>
          + 212 5 37 27 99 00<br/>
          + 212 5 37 77 97 37<br/>
        </p>
      </div>
    </q-page-container>

    <pop-up :show="this.$route.name !== 'listCongeTeam' && congetoValidate > 0" height='40%' width='45%' maxWidth="700px">
      <div slot='popContent' class="payPeriodeFieldsCont">
        <div class="textalignc">
          <img src="\statics\warning.png" />
          <h4>{{$t('demande.conge.hello')}} {{ firstName }}</h4>
          <p>{{$t('demande.conge.traiteCongeManager')}} &#128522;</p>
        </div>
      </div>
      <div slot='popBtns' class="footerActionPay">
        <q-btn :to="{ name: 'listCongeTeam' }" class="managervalidationbtn payPeriode" color="primary" :label="this.$t('demande.conge.yesOfCurse')" />
      </div>
    </pop-up>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import navMenu from '../components/nav-menu'
import { bus } from '../plugins/event-bus.js'
import JQ from '../plugins/jquery.js'
import * as services from '../services/conge-services.js'
import popup from '../components/popup.vue'

export default {
  name: 'dashboard',
  data () {
    return {
      name: '',
      showLeft: false,
      congetoValidate: 0,
      firstName: '',
      showScroll: false
    }
  },
  mounted () {
    this.showScroll = JQ('.dashboardContainer').css('height') >= JQ('window').height() - 120
    if (this.$store.state.Auth.user !== null && this.$store.state.Auth.user !== '') {
      this.name = this.$store.state.Auth.user.name
      this.firstName = (this.$store.state.Auth.user !== undefined) ? this.$store.state.Auth.user.firstName : ''
    } else {
      this.$router.push('/login')
    }
    let that = this
    bus.$on('showLeftMenu', function (status) {
      that.showLeft = status
    })

    bus.$on('getCongetoValidateCountSuccess', function (res) {
      that.$store.commit('Auth/SetLoading', false)
      that.congetoValidate = res.count
    })

    bus.$on('getCongetoValidateCountFailed', function (res) {
      that.$store.commit('Auth/SetLoading', false)
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', true)
        }
      }
    })

    bus.$on('checkCountDemandeValidate', function () {
      that.getCongetoValidateCount()
    })

    if (localStorage.getItem('user') !== null) {
      bus.$emit('checkCountDemandeValidate')
    }
  },
  methods: {
    openURL,
    getCongetoValidateCount () {
      if (this.$store.state.Auth.user !== null && this.$store.state.Auth.user !== '') {
        if (this.$store.state.Auth.user.roles) {
          // this.$store.commit('Auth/SetLoading', true)
          services.getCongetoValidateCount()
        }
      }
    }
  },
  computed: {
    ContainerHeight () {
      return JQ('body').height() - 120 - JQ('.congeListe').height()
    }
  },
  watch: {
    ContainerHeight (newVal, oldVal) {
      if (newVal >= 0) {
        this.showScroll = false
      } else {
        this.showScroll = true
      }
    }
  },
  components: {
    'nav-menu': navMenu,
    'pop-up': popup
  },
  beforeDestroy () {
    bus.$off('getCongetoValidateCountSuccess')
    bus.$off('getCongetoValidateCountFailed')
    bus.$off('checkCountDemandeValidate')
    bus.$off('showLeftMenu')
  }
}
</script>
