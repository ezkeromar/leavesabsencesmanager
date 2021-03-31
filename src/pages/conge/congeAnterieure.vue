<template>
  <div class="row justify-center congeCreate">
    <div class="col-md-9 congeCreateContainer">
      <q-card class="congeCardCreateB">
        <q-card-title>
          {{$t('demande.conge.congedemande')}}
        </q-card-title>
        <q-card-main>
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <v-select :placeholder="$t('demande.conge.NoAvailableSession')" class="colabasCreateSelect col-md-5" :filterable="false" :options="collaborateurs" label="label" v-model='collaborateur' @search="searchColabs">
                  <div slot="no-options">{{$t('demande.conge.NoAvailableColabs')}}</div>
                </v-select>
              </div>
              <div class="row">
                <div class="col-md-2">
                  <div class="callenderDesign">
                    <div>{{colabSoldeTemp}}</div>
                    <div>{{$t('demande.conge.days')}}</div>
                  </div>
                </div>
              </div>
              <div class="row">
                <q-field class="col-md-5">
                    <q-datetime color="#949292" :minimal="true" format="DD/MM/YYYY" class="congeDatePicker" :placeholder="this.$t('demande.conge.dateStart')" type="date" :value="dateStart" @change="val => { dateStart = val; showDateDiff()}"/>
                </q-field>
                <div class="col-md-4 flex justify-center items-center">
                    <q-toggle color="#fbd46b" :icon="isMorningIcon" @change="val => { morning = val; showDateDiff() }" :value="morning" class="congeSwitch" />
                </div>
              </div>
              <div class="row">
                <q-field class="col-md-5">
                    <q-datetime color="#949292" :minimal="true" format="DD/MM/YYYY" class="congeDatePicker" :placeholder="this.$t('demande.conge.dateEnd')" type="date" :value="dateEnd" @change="val => { dateEnd = val; showDateDiff()}" />
                </q-field>
                <div class="col-md-4 flex justify-center items-center">
                    <q-toggle color="#001165" :icon="afternoonIcon" @change="val => { afternoon = val; showDateDiff() }" :value="afternoon" class="congeSwitch congeSwitchEnd" />
                </div>
              </div>
            </div>
          </div>
          <q-card-actions>
            <q-btn :label="this.$t('demande.conge.send')" class="congeBtnSend" color="primary" @click="storeFunc" />
            <q-btn :label="this.$t('demande.conge.cancel')" class="congeBtnCancel" color="white" @click="clearForm" />
          </q-card-actions>
        </q-card-main>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { bus } from '../../plugins/event-bus.js'
import moment from '../../plugins/momentjs.js'
import * as services from '../../services/conge-services.js'
import { Notify, Dialog } from 'quasar'
import vSelect from '../../plugins/vue-select.js'

export default Vue.extend({
  name: 'congeAnterieure',
  data () {
    return {
      collaborateur: null,
      collaborateurs: [],
      terms: '',
      daysNumber: 0,
      loading: false,
      dateStart: (moment().subtract(1, 'days').format('ddd') === 'Sat' || moment().subtract(1, 'days').format('ddd') === 'Sun') ? moment().isoWeekday(-5).format() : moment().subtract(1, 'days').format(),
      dateEnd: (moment().subtract(1, 'days').format('ddd') === 'Sat' || moment().subtract(1, 'days').format('ddd') === 'Sun') ? moment().isoWeekday(-5).format() : moment().subtract(1, 'days').format(),
      morning: false,
      afternoon: true,
      isMorningIcon: 'fa fa-cloud-sun',
      afternoonIcon: 'fa fa-moon',
      soldes: [],
      showDialog: false,
      permisionCaption: '',
      colabSoldeTemp: 0
    }
  },
  mounted () {
    let that = this
    that.$store.commit('Dashboard/setActiveMenu', '1007')

    bus.$on('storeAnterieurSuccess', function (res) {
      that.clearForm()
      Notify.create({
        icon: 'fa fa-thumbs-up',
        message: that.$t(res.title),
        color: 'white'
      })
    })

    bus.$on('storeAnterieurFailed', function (res) {
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

    bus.$on('getColabsFailed', function (res) {
      that.loading = false
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        }
      }
    })

    bus.$on('getTempSoldeColabsSuccess', function (res) {
      that.colabSoldeTemp = res.solde
    })

    bus.$on('getTempSoldeColabsFailed', function (res) {
      that.loading = false
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        }
      }
    })

    this.showDateDiff(true)
  },
  methods: {
    searchColabs (terms, { field, list }) {
      if (terms.length > 3) {
        services.getColabs({ term: terms })
      }
    },
    showErrors (res) {
      var result = JSON.parse(JSON.stringify(res))
      Notify.create({
        type: 'negative',
        icon: 'fa fa-times',
        message: this.$t(result.title),
        color: 'white'
      })
    },
    storeFunc () {
      if (moment().diff(moment(this.dateEnd), 'days') <= 0) {
        Notify.create({
          type: 'negative',
          icon: 'fa fa-times',
          message: this.$t('demande.conge.dateInFuturERR'),
          color: 'white'
        })
      } else if (this.collaborateur === null) {
        Notify.create({
          type: 'negative',
          icon: 'fa fa-times',
          message: this.$t('demande.conge.selectColaborateur'),
          color: 'white'
        })
      } else {
        if (this.daysNumber > 0) {
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
          Dialog.create({
            title: this.$t('demande.conge.confirmation'),
            message: this.$t('demande.conge.youWantContinue'),
            ok: {
              label: this.$t('demande.conge.validate'),
              color: 'primary'
            },
            cancel: {
              label: this.$t('demande.conge.cancel'),
              color: 'white'
            }
          }).then(() => {
            services.storeAnterieur({ dateStart: moment(this.dateStart).format('DD-MM-YYYY'), dateEnd: moment(this.dateEnd).format('DD-MM-YYYY'), morning: !this.morning, afternoon: this.afternoon, id: this.collaborateur.value })
          }).catch(() => {
            Notify.create({
              type: 'negative',
              icon: 'fa fa-times',
              message: this.$t('demande.conge.demandeCanceled'),
              color: 'white'
            })
            this.clearForm()
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
      let start = moment(this.dateStart)
      let end = moment(this.dateEnd)
      this.daysNumber = 0

      while (start <= end) {
        if (start.format('ddd') !== 'sam.' && start.format('ddd') !== 'dim.') {
          this.daysNumber++
        }
        start = moment(start, 'YYYY-MM-DD').add(1, 'days')
      }
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
        if (moment().diff(moment(this.dateEnd), 'days') <= 0) {
          Notify.create({
            type: 'negative',
            icon: 'fa fa-times',
            message: this.$t('demande.conge.dateInFuturERR'),
            color: 'white'
          })
        } else {
          if (this.daysNumber >= 0) {
            let textMessage = ''
            if (this.daysNumber <= 1) {
              textMessage = this.$t('demande.conge.youSelected') + ' ' + this.daysNumber + ' ' + this.$t('demande.conge.day')
            } else {
              textMessage = this.$t('demande.conge.youSelected') + ' ' + this.daysNumber + ' ' + this.$t('demande.conge.days')
            }
            Notify.create({
              icon: 'fa fa-calendar-alt',
              message: textMessage,
              color: 'white'
            })
          }
        }
      }
    },
    clearForm () {
      this.dateStart = (moment().subtract(1, 'days').format('ddd') === 'Sat' || moment().subtract(1, 'days').format('ddd') === 'Sun') ? moment().isoWeekday(-5).format() : moment().subtract(1, 'days').format()
      this.dateEnd = (moment().subtract(1, 'days').format('ddd') === 'Sat' || moment().subtract(1, 'days').format('ddd') === 'Sun') ? moment().isoWeekday(-5).format() : moment().subtract(1, 'days').format()
      this.morning = false
      this.afternoon = true
      this.collaborateur = null
    }
  },
  watch: {
    collaborateur: {
      handler: function (newValue) {
        if (newValue != null) {
          services.getTempSoldeColabs({ 'id': newValue.value })
        } else {
          this.colabSoldeTemp = 0
        }
      },
      deep: true
    }
  },
  beforeDestroy () {
    bus.$off('storeAnterieurSuccess')
    bus.$off('storeAnterieurFailed')
    bus.$off('getColabsSuccess')
    bus.$off('getColabsFailed')
    bus.$off('getTempSoldeColabsSuccess')
    bus.$off('getTempSoldeColabsFailed')
  },
  components: {
    'v-select': vSelect
  }
})
</script>
