<template>
  <div class="row congeCreate">
    <div class="col-md-9 congeCreateContainer" v-if="showDialog === false">
      <q-card class="congeCreateCard">
        <q-card-title>
          <span>
            <i class="fa fa-info-circle congeCreateListIcon"></i>
            <q-tooltip>{{$t('demande.conge.actualSoldeTooltip')}}</q-tooltip>
          </span>
          {{$t('demande.conge.actualSolde')}}: {{soldes.solde_total}} {{(soldes.solde_total > 1) ? $t('demande.conge.days') : $t('demande.conge.day')}}
        </q-card-title>
        <q-card-main>
          <q-table
            :data="tableData"
            :columns="columns"
            class="congeCreateTable"
            row-key="name"
            :pagination.sync="serverPagination"
            :rows-per-page-options="[0]"
            :loading="loading"
            @request="request"
            hide-bottom
          />
        </q-card-main>
      </q-card>
      <q-card class="congeCardCreateB">
        <q-card-title>
          {{$t('demande.conge.congedemande')}}
        </q-card-title>
        <q-card-main>
          <div class="row">
            <div class="col-md-6">
              <ul class="congeCreateList">
                <li>
                  <span>
                    <q-tooltip>{{$t('demande.conge.regulizeSoldeTooltip')}}</q-tooltip>
                    <i class="fa fa-info-circle congeCreateListIcon"></i>
                  </span>
                  <span>{{$t('demande.conge.regulizeSolde')}}</span>
                  <span>: <b>{{soldes.soldeARegulariser}} {{(soldes.soldeARegulariser > 1) ? $t('demande.conge.days') : $t('demande.conge.day')}}</b></span>
                </li>
                <li>
                  <span><i class="fa fa-info-circle congeCreateListIcon"></i>
                    <q-tooltip>{{$t('demande.conge.waitValidationTooltip')}}</q-tooltip>
                  </span>
                  <span>{{$t('demande.conge.waitValidation')}}</span>
                  <span>: <b>{{soldes.count_conge_en_cours_validation}} {{(soldes.count_conge_en_cours_validation > 1) ? $t('demande.conge.days') : $t('demande.conge.day')}}</b></span>
                </li>
                <li>
                  <span>
                    <i class="fa fa-info-circle congeCreateListIcon"></i>
                    <q-tooltip>{{$t('demande.conge.waitPaiementTooltip')}}</q-tooltip>
                  </span>
                  <span>{{$t('demande.conge.waitPaiement')}}</span>
                  <span>: <b>{{soldes.count_conge_validee}} {{(soldes.count_conge_validee > 1) ? $t('demande.conge.days') : $t('demande.conge.day')}}</b></span>
                </li>
                <!-- <li v-if="soldes.solde_total > 0">
                  <span><i class="fa fa-info-circle congeCreateListIcon"></i></span>
                  <span>Votre solde annuelle actuel est</span>
                  <span>: <b>{{soldes.solde_total}} {{(soldes.solde_total > 1) ? 'jours' : 'jour'}}</b></span>
                </li> -->
                <li>
                  <span>
                    <i class="fa fa-info-circle congeCreateListIcon"></i>
                    <q-tooltip>{{$t('demande.conge.TempSoldeTooltip')}}</q-tooltip>
                  </span>
                  <span>{{$t('demande.conge.TempSolde')}}</span>
                  <span>: <b>{{soldes.solde_temporaire}} {{(soldes.solde_temporaire > 1) ? $t('demande.conge.days') : $t('demande.conge.day')}}</b></span>
                </li>
                <li>
                  <span>
                    <i class="fa fa-info-circle congeCreateListIcon"></i>
                    <q-tooltip>{{$t('demande.conge.prorataTooltip')}}</q-tooltip>
                  </span>
                  <span>{{$t('demande.conge.prorata')}}</span>
                  <span>: <b>{{soldes.prorata}} {{(soldes.prorata > 1) ? $t('demande.conge.days') : $t('demande.conge.day')}}</b></span>
                </li>
              </ul>
            </div>
            <div class="col-md-6">
              <div class="row">
                <q-field class="col-md-6">
                  <q-datetime color="#949292" :minimal="true" format="DD/MM/YYYY" class="congeDatePicker" :placeholder="this.$t('demande.conge.dateStart')" type="date" :value="dateStart" @change="val => { dateStart = val; showDateDiff()}"/>
                </q-field>
                <div class="col-md-5 flex justify-center items-center">
                  <q-toggle color="#fbd46b" :icon="isMorningIcon" @change="val => { morning = val; showDateDiff() }" :value="morning" class="congeSwitch" />
                </div>
              </div>
              <div class="row">
                <q-field class="col-md-6">
                  <q-datetime color="#949292" :minimal="true" format="DD/MM/YYYY" class="congeDatePicker" :placeholder="this.$t('demande.conge.dateEnd')" type="date" :value="dateEnd" @change="val => { dateEnd = val; showDateDiff()}" />
                </q-field>
                <div class="col-md-5 flex justify-center items-center">
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
    <div class="congeCreateContainer" v-else>
      <div class="alert alert-info permisionMessage">
        <strong>{{$t('demande.conge.info')}}!</strong> {{$t(permisionCaption)}}.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { bus } from '../../plugins/event-bus.js'
import moment from '../../plugins/momentjs.js'
import * as services from '../../services/conge-services.js'
import { Notify, Dialog } from 'quasar'

export default Vue.extend({
  name: 'createConge',
  data () {
    return {
      daysNumber: 0,
      loading: false,
      serverPagination: {
        page: 1,
        rowsNumber: 0
      },
      dateStart: moment().format(),
      dateEnd: moment().format(),
      morning: false,
      afternoon: true,
      columns: [
        {
          name: 'annee',
          required: true,
          label: this.$t('demande.conge.year'),
          align: 'left',
          field: 'annee'
        }, {
          name: 'ddroitAnnuelesc',
          required: true,
          label: this.$t('demande.conge.annualRights'),
          align: 'left',
          field: 'droitAnnuel'
        }, {
          name: 'jours_comptabilisés',
          required: true,
          label: this.$t('demande.conge.comptabilisedDays'),
          align: 'left',
          field: 'jours_comptabilisés'
        }, {
          name: 'jours_consommes',
          required: true,
          label: this.$t('demande.conge.comsomedDays'),
          align: 'left',
          field: 'jours_consommes'
        }, {
          name: 'solde',
          required: true,
          label: this.$t('demande.conge.solde'),
          align: 'left',
          field: 'solde'
        }
      ],
      tableData: [],
      isMorningIcon: 'fa fa-cloud-sun',
      afternoonIcon: 'fa fa-moon',
      soldes: [],
      showDialog: false,
      permisionCaption: ''
    }
  },
  mounted () {
    let that = this
    that.$store.commit('Dashboard/setActiveMenu', '1000')

    bus.$on('congeCreateSuccess', function (res) {
      that.$router.push('/admin/conge/list')
      Notify.create({
        icon: 'fa fa-thumbs-up',
        message: that.$t(res.title),
        color: 'white'
      })
    })

    bus.$on('congeCreateFailed', function (res) {
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        }
        if (res.status === 400) {
          that.showErrors(res.data)
        }
      }
    })

    bus.$on('getReliquatsSuccess', function (res) {
      that.loading = false
      that.tableData = res.data
      that.soldes = res
    })

    bus.$on('getReliquatsFailed', function (res) {
      that.loading = false
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        }
        if (res.status === 400) {
          that.permisionCaption = res.data.text
          that.showDialog = true
        }
      }
    })

    this.request()
    this.showDateDiff(true)
  },
  methods: {
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
      if (this.$store.state.Auth.user.isBlocked === 'true') {
        Notify.create({
          type: 'negative',
          icon: 'fa fa-times',
          message: this.$t('demande.conge.blockedAddConge'),
          color: 'white'
        })
      } else if (moment().diff(moment(this.dateStart), 'days') > 0) {
        Notify.create({
          type: 'negative',
          icon: 'fa fa-times',
          message: this.$t('demande.conge.dateInPasteERR'),
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
            services.store({ dateStart: moment(this.dateStart).format('DD-MM-YYYY'), dateEnd: moment(this.dateEnd).format('DD-MM-YYYY'), morning: !this.morning, afternoon: this.afternoon })
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
      if (moment(this.dateEnd).diff(moment(this.dateStart), 'days') < 0) {
        this.dateEnd = this.dateStart
      }

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
        if (moment().diff(moment(this.dateStart), 'days') > 0) {
          Notify.create({
            type: 'negative',
            icon: 'fa fa-times',
            message: this.$t('demande.conge.dateInPasteERR'),
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
    request () {
      this.loading = true
      services.getReliquats()
    },
    clearForm () {
      this.dateStart = moment().format()
      this.dateEnd = moment().format()
      this.morning = false
      this.afternoon = true
    }
  },
  watch: {
  },
  beforeDestroy () {
    bus.$off('congeCreateSuccess')
    bus.$off('congeCreateFailed')
    bus.$off('getReliquatsSuccess')
    bus.$off('getReliquatsFailed')
  }
})
</script>
