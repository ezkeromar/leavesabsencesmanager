<template>
  <div class="modulesListCont row">
    <div class="col-md-10 modulesCont" v-show="!isShow">
      <h3 v-show='modulesList !== null && modulesList.length > 1' class="modulesTitle">{{$t('demande.modules.title')}}</h3>
      <div class="listModules row">
        <div class="col-md-3 moduleItem" :key="module.name" v-for="module in modulesList" @click="selectModule(module)" @mouseover="module.hover = true" @mouseleave="module.hover = false">
          <img v-if="module.hover === true" :src="'statics/icons/' + module.iconActive + '.png'" :alt="$t(module.title)"/>
          <img v-else :src="'statics/icons/' + module.iconDisabled + '.png'" :alt="$t(module.title)" />
          <p>{{$t(module.title)}}</p>
        </div>
      </div>
    </div>
    <transition
      enter-active-class="animated slideInUp"
      v-on:after-enter="afterEnter"
      v-on:after-leave="afterLeave"
      leave-active-class="animated slideOutDown"
    >
      <div class="messageLoginSuccess flex justify-center items-center shadow-21" v-show="isShow">
        <div>
          <h2>{{$t('demande.conge.bonjour')}} <b>{{firstName}}</b></h2>
          <h4>{{$t('demande.conge.welcomeToYourSpace')}} <b>SIRHUS</b></h4>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import * as services from '../services/auth-services.js'
import { bus } from '../plugins/event-bus.js'

export default {
  data () {
    return {
      modulesList: null,
      isShow: false,
      firstName: null
    }
  },
  mounted () {
    let that = this
    this.$store.commit('Dashboard/setActiveMenu', null)

    bus.$on('getModulesSuccess', function (res) {
      that.modulesList = res
      if (that.modulesList.length === 1 && that.modulesList !== null) {
        that.$store.commit('Dashboard/setMultiplemodules', false)
        that.selectModule(that.modulesList[0])
      } else {
        that.$store.commit('Dashboard/setMultiplemodules', true)
      }
    })

    bus.$on('getModulesFailed', function (res) {
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setUnauthorizedError', res.data.message)
        }
      }
    })

    if (this.$store.state.Auth.user !== null && this.$store.state.Auth.user !== '') {
      this.firstName = this.$store.state.Auth.user.firstName
    }
    if (this.$store.state.Auth.loggedNow) {
      this.isShow = true
      this.getModules()
    } else {
      this.isShow = false
      this.getModules()
    }
  },
  methods: {
    getModules () {
      services.getModules()
    },
    selectModule (module) {
      this.$store.commit('Auth/setModule', module)
      this.$router.push('admin')
    },
    afterEnter () {
      let that = this
      setTimeout(function () {
        that.$store.commit('Auth/SetLoading', false)
        that.isShow = false
      }, 1500)
    },
    afterLeave () {
      this.getModules()
      bus.$emit('checkCountDemandeValidate')
    }
  },
  beforeDestroy () {
    bus.$off('getModulesSuccess')
    bus.$off('getModulesFailed')
  }
}
</script>
