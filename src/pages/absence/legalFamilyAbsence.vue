<template>
  <q-card class="congeCardCreateB absenceCardCreateB absenceCardCreateNotPaid">
        <q-card-title v-if="$route.params.isadmin != 'rh'">
          {{$t('demande.absence.absencespecialdemende')}}
        </q-card-title>
        <q-card-title v-else>{{$t('demande.absence.absencespecialdemendecc')}}</q-card-title>
        <div class="marginsmall"></div>
        <q-card-main>
          <div v-if="$route.params.isadmin == 'rh'" class="row">
            <v-select :placeholder="$t('demande.conge.NoAvailableSession')" class="colabasCreateSelect col-md-5" :filterable="false" :options="collaborateurs" label="label" v-model='collaborateur' @search="searchColabs">
              <div slot="no-options">{{$t('demande.conge.NoAvailableColabs')}}</div>
            </v-select>
          </div>
          <div class="row">
            <div class="col-md-4">
              <q-select
                  :value="typeval"
                  @change="val => typechanged(val)"
                  :options="typeoptions"
                />
            </div>
            <div class="col-md-2"></div>
            <div class="col-md-4">
              <q-select
                  v-if="subtypeoptions.length > 0"
                  :value="subtypeval"
                  @change="val => subtypechanged(val)"
                  :options="subtypeoptions"
                  class="subtypewidthlimitation"
                />
            </div>
          </div>
          <div v-if="$route.params.isadmin != 'rh'" class="row">
            <div class="col-md-2">
              <div class="callenderDesign">
                <div>{{legalduration}}</div>
                <div>{{$t('demande.conge.days')}}</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <q-field class="col-md-4">
                  <q-datetime  color="#949292" :minimal="true" format="DD/MM/YYYY" class="congeDatePicker" :placeholder="this.$t('demande.conge.dateStart')" type="date" :value="dateStart" @change="val => { dateStart = val; showDateDiff()}"/>
                </q-field>
                <div class="col-md-5 flex justify-center items-center">
                  <q-toggle color="#fbd46b" :icon="isMorningIcon" @change="val => { morning = val; showDateDiff() }" :value="morning" class="congeSwitch" />
                </div>
              </div>
              <div class="row">
                <q-field class="col-md-4">
                  <q-datetime :disable="true" color="#949292" :minimal="true" format="DD/MM/YYYY" class="congeDatePicker" :placeholder="this.$t('demande.conge.dateEnd')" type="date" :value="dateEnd" @change="val => { dateEnd = val; showDateDiff()}" />
                </q-field>
                <div class="col-md-5 flex justify-center items-center">
                  <q-toggle color="#001165" :icon="afternoonIcon" @change="val => { afternoon = val; showDateDiff() }" :value="afternoon" class="congeSwitch congeSwitchEnd" />
                </div>
              </div>
            </div>
          </div>
          <div class="marginsmall"></div>
          <q-card-actions>
            <q-btn :label="this.$t('demande.conge.send')" class="congeBtnSend" color="primary" @click="storeFunc" />
            <q-btn :label="this.$t('demande.conge.cancel')" class="congeBtnCancel" color="white" @click="clearForm" />
          </q-card-actions>
        </q-card-main>
      </q-card>
</template>
<script lang="ts">
import Vue from 'vue'
import moment from '../../plugins/momentjs.js'
import { bus } from '../../plugins/event-bus.js'
import { Notify, Dialog } from 'quasar'
import * as services from '../../services/absence-services.js'
import * as congeservices from '../../services/conge-services.js'
import vSelect from '../../plugins/vue-select.js'

export default Vue.extend({
  name: 'legalFamilyAbsenceCreation',
  data () {
    return {
      daysNumber: 0,
      dateStart: moment().format(),
      dateEnd: moment().format(),
      morning: false,
      afternoon: true,
      isMorningIcon: 'fa fa-cloud-sun',
      afternoonIcon: 'fa fa-moon',
      showDialog: false,
      type: '',
      typeval: '',
      subtypeval: '',
      typeoptions: [],
      subtypeoptions: [],
      collaborateurs: [],
      collaborateur: null,
      legalduration: 0
    }
  },
  mounted () {
    let that = this
    bus.$on('legalfamilystoreSuccess', function (res) {
      if (that.$route.params.isadmin !== 'rh') {
        that.$router.push('/admin/absence/list')
      } else {
        that.clearForm()
      }
      Notify.create({
        icon: 'fa fa-thumbs-up',
        message: that.$t(res.message),
        color: 'white'
      })
    })

    bus.$on('legalfamilystoreFailed', function (res) {
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        }
        if (res.status === 400) {
          that.showErrors(res.data)
        }
      }
    })

    bus.$on('listabslegalSuccess', function (res) {
      that.typeoptions = res
      that.typeoptions.splice(0, 0, {
        label: that.$t('demande.absence.pleaseselectvalue'),
        value: 'ezker',
        duree: 0
      })
      that.typeval = that.typeoptions[0].value
      that.legalduration = that.typeoptions[0].duree
    })

    bus.$on('listabslegalFailed', function (res) {
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        }
        if (res.status === 400) {
          that.showErrors(res.data)
        }
      }
    })

    bus.$on('getColabsSuccess', function (res) {
      that.collaborateurs = res.tableData.list
    })

    bus.$on('getDurationACFailed', function (res) {
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        }
      }
    })

    bus.$on('getDurationACSuccess', function (res) {
      let daylabel = (res.nbrJours > 1) ? that.$t('demande.conge.days') : that.$t('demande.conge.day')
      let confirmlabel = that.$t('demande.absence.youadded') + ' ' + res.nbrJours + ' ' + daylabel + '. ' + that.$t('demande.conge.youWantContinue')
      that.senddemande(confirmlabel)
    })
    this.showDateDiff(true)
    this.getlistabsence()
  },
  methods: {
    senddemande (confirmlabel) {
      Dialog.create({
        title: this.$t('demande.conge.confirmation'),
        message: confirmlabel,
        ok: {
          label: this.$t('demande.conge.validate'),
          color: 'primary'
        },
        cancel: {
          label: this.$t('demande.conge.cancel'),
          color: 'white'
        }
      }).then(() => {
        if (this.collaborateur !== null) {
          services.legalfamilystore({ dateStart: moment(this.dateStart).format('DD-MM-YYYY'), dateEnd: moment(this.dateEnd).format('DD-MM-YYYY'), morning: !this.morning, afternoon: this.afternoon, type: (this.subtypeval !== '') ? this.subtypeval : this.typeval, colabId: this.collaborateur.value })
        } else if (this.$route.params.isadmin !== 'rh') {
          services.legalfamilystore({ dateStart: moment(this.dateStart).format('DD-MM-YYYY'), dateEnd: moment(this.dateEnd).format('DD-MM-YYYY'), morning: !this.morning, afternoon: this.afternoon, type: (this.subtypeval !== '') ? this.subtypeval : this.typeval })
        } else {
          Notify.create({
            type: 'negative',
            icon: 'fa fa-times',
            message: this.$t('demande.absence.choosecollab'),
            color: 'white'
          })
        }
      }).catch(() => {
        Notify.create({
          type: 'negative',
          icon: 'fa fa-times',
          message: this.$t('demande.conge.demandeCanceled'),
          color: 'white'
        })
        this.clearForm()
      })
    },
    searchColabs (terms, { field, list }) {
      if (terms.length > 3) {
        congeservices.getColabs({ term: terms })
      }
    },
    typechanged (val) {
      this.typeval = val
      for (let index = 0; index < this.typeoptions.length; index++) {
        if (val === this.typeoptions[index].value) {
          this.legalduration = this.typeoptions[index].duree
          if (this.typeoptions[index].subTypes.length > 0) {
            this.subtypeoptions = this.typeoptions[index].subTypes
            this.subtypeval = this.typeoptions[index].subTypes[0].value
            this.legalduration = this.typeoptions[index].subTypes[0].duree
          } else {
            this.subtypeval = ''
            this.subtypeoptions = []
          }
        }
      }
      this.showDateDiff()
    },
    subtypechanged (val) {
      console.log('val')
      console.log(val)
      this.subtypeval = val
      for (let index = 0; index < this.subtypeoptions.length; index++) {
        if (val === this.subtypeoptions[index].value) {
          this.legalduration = this.subtypeoptions[index].duree
        }
      }
      this.showDateDiff()
    },
    getlistabsence () {
      services.listabslegal()
    },
    showErrors (res) {
      var result = JSON.parse(JSON.stringify(res))
      Notify.create({
        type: 'negative',
        icon: 'fa fa-times',
        message: this.$t(result.message),
        color: 'white'
      })
    },
    storeFunc () {
      if (this.$store.state.Auth.user.isBlocked === 'true') {
        Notify.create({
          type: 'negative',
          icon: 'fa fa-times',
          message: this.$t('demande.conge.blockedAddConge'),
          color: 'white'
        })
      } else {
        if (this.daysNumber === this.legalduration && this.daysNumber > 0) {
          if (moment(this.dateStart).format('ddd') === 'Sat') {
            this.dateStart = moment(this.dateStart).add(2, 'days').format()
          }
          if (moment(this.dateStart).format('ddd') === 'Sun') {
            this.dateStart = moment(this.dateStart).add(1, 'days').format()
          }
          if (moment(this.dateEnd).format('ddd') === 'Sat') {
            this.dateEnd = moment(this.dateEnd).subtract(1, 'days').format()
          }
          if (moment(this.dateEnd).format('ddd') === 'Sun') {
            this.dateEnd = moment(this.dateEnd).subtract(2, 'days').format()
          }
          services.getDurationAC({ type: 'absencespecial', dateStart: moment(this.dateStart).format('DD-MM-YYYY'), dateEnd: moment(this.dateEnd).format('DD-MM-YYYY'), morning: !this.morning, afternoon: this.afternoon })
        } else if (this.daysNumber > 0 && this.daysNumber !== this.legalduration) {
          Notify.create({
            type: 'negative',
            icon: 'fa fa-times',
            message: this.$t('demande.absence.demandeDeferentofalowed') + ' ' + this.legalduration,
            color: 'white'
          })
        } else {
          Notify.create({
            type: 'negative',
            icon: 'fa fa-times',
            message: this.$t('demande.conge.demandeZeroLength'),
            color: 'white'
          })
        }
      }
    },
    showDateDiff (initIterr = false) {
      if (moment(this.dateEnd).diff(moment(this.dateStart), 'days') < 0) {
        this.dateEnd = this.dateStart
      }

      let start = moment(this.dateStart)
      let end = ''
      if (this.legalduration !== 0) {
        end = moment(this.dateStart).add(this.legalduration - 1, 'days')
      } else {
        end = moment(this.dateStart)
      }
      this.daysNumber = 0
      while (start <= end) {
        if (start.format('ddd') !== 'sam.' && start.format('ddd') !== 'dim.') {
          this.daysNumber++
        } else {
          end = moment(end, 'YYYY-MM-DD').add(1, 'days')
        }
        start = moment(start, 'YYYY-MM-DD').add(1, 'days')
      }
      this.dateEnd = moment(end).format()
      if (this.morning) {
        this.daysNumber -= 0.5
        this.isMorningIcon = 'fa fa-sun'
      } else {
        this.isMorningIcon = 'fa fa-cloud-sun'
      }
      if (this.afternoon) {
        this.afternoonIcon = 'fa fa-moon'
      } else {
        this.daysNumber -= 0.5
        this.afternoonIcon = 'fa fa-sun'
      }
      if (moment(this.dateEnd).diff(moment(this.dateStart), 'days') < 0) {
        this.daysNumber = moment(this.dateEnd).diff(moment(this.dateStart), 'days')
      }
      if (initIterr !== true) {
        // if (moment().diff(moment(this.dateStart), 'days') > 0) {
        //   Notify.create({
        //     type: 'negative',
        //     icon: 'fa fa-times',
        //     message: this.$t('demande.absence.dateInPasteERR'),
        //     color: 'white'
        //   })
        // } else {
        if (this.daysNumber >= 0) {
          // let textMessage = ''
          // if (this.daysNumber <= 1) {
          //   textMessage = this.$t('demande.conge.youSelected') + ' ' + this.daysNumber + ' ' + this.$t('demande.conge.day')
          // } else {
          //   textMessage = this.$t('demande.conge.youSelected') + ' ' + this.daysNumber + ' ' + this.$t('demande.conge.days')
          // }
          // Notify.create({
          //   icon: 'fa fa-calendar-alt',
          //   message: textMessage,
          //   color: 'white'
          // })
        }
        // }
      }
    },
    clearForm () {
      this.dateStart = moment().format()
      this.dateEnd = moment().format()
      this.morning = false
      this.afternoon = true
      this.motif = ''
      this.collaborateur = null
      this.subtypeval = ''
      this.typeval = this.typeoptions[0].value
      this.legalduration = this.typeoptions[0].duree
      this.subtypeoptions = []
    }
  },
  watch: {
  },
  beforeDestroy () {
    bus.$off('legalfamilystoreSuccess')
    bus.$off('legalfamilystoreFailed')
    bus.$off('listabslegalSuccess')
    bus.$off('listabslegalFailed')
    bus.$off('getColabsSuccess')
    bus.$off('getDurationACSuccess')
    bus.$off('getDurationACFailed')
  },
  components: {
    'v-select': vSelect
  }
})
</script>
