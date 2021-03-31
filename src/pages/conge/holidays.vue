
<template>
  <div class="row congeListe">
    <div class="congeListContainer">
      <q-card class="col-md-10 congeCard">
        <q-card-main class="congerCardContainer">
          <q-table
            :data="tableData"
            :columns="activeColumns"
            :loading="loading"
            class="congeCodes"
            @request="requestCongesTypes"
            hide-bottom
          >
            <q-td slot="body-cell-codeConge" slot-scope="props" :props="props">
              <q-input class='codeCongeInput' pattern='[0-9.]+' type='text' v-if='props.row.id === null' v-model="props.row.codeConge" :placeholder="$t('demande.conge.codeConge')" />
              <p class='codeCongeInputP' v-else>{{props.row.codeConge}}</p>
            </q-td>
            <q-td slot="body-cell-droit" slot-scope="props" :props="props">
             <q-input class='codeCongeValue' type='number' v-model="props.row.droit" :placeholder="$t('demande.conge.droit')" />
            </q-td>
            <q-td slot="body-cell-action" slot-scope="props" :props="props">
              <span>
                <q-btn class='saveBtn' size="xs" icon="fa fa-save" @click="saveCongeCode(props.row)"/>
                <q-tooltip>{{$t('demande.conge.save')}}</q-tooltip>
              </span>
              <span>
                <q-btn class='deleteBtn' size="xs" icon="fa fa-trash-alt" @click="deleteCodeConge(props.row)"/>
                <q-tooltip>{{$t('demande.conge.delete')}}</q-tooltip>
              </span>
            </q-td>
          </q-table>
          <q-btn class='addCodeHolidayAction' :label="$t('demande.conge.add')" @click="addNewCongeCode"/>
        </q-card-main>
      </q-card>
      <div class="col-md-10 HolidayCardContainer">
        <q-card class="HolidayCard">
          <div class="q-card-title holidaysTitle">
            {{$t('demande.conge.holidayCard')}}
          </div>
          <q-card-main class="congerCardContainer holidayCardCintainer">
            <q-table
              :data="holidays"
              :columns="holidaysColumns"
              :loading="loadingone"
              class="congeCodes"
              row-key="id"
              :pagination.sync="serverPagination"
              :rows-per-page-options="rowPerPage"
              @request="requestHolidays"
              hide-header
            >
              <q-td slot="body-cell-intitule" slot-scope="props" :props="props">
                <q-input class='holidayTitle' type='text' v-if='props.row.id === null' v-model="props.row.intitule" :placeholder="$t('demande.conge.holidayTitle')" />
                <div v-else>
                  <p class='holidayTitleP'>{{props.row.intitule}}</p>
                  <q-tooltip>{{props.row.intitule}}</q-tooltip>
                </div>
              </q-td>
              <q-td slot="body-cell-dateDebutJourFerier" slot-scope="props" :props="props">
              <q-datetime format='DD/MM/YYYY' type='date' class='demande.conge.holidayDate' v-model="props.row.dateDebutJourFerier" />
              </q-td>
              <q-td slot="body-cell-nBJourFerier" slot-scope="props" :props="props">
              <q-input class='HolidayDaysNB' type='number' v-model="props.row.nBJourFerier" :placeholder="$t('demande.conge.dayCount')" />
              </q-td>
              <q-td slot="body-cell-action" slot-scope="props" :props="props">
                <span>
                  <q-btn class='saveBtn' size="xs" icon="fa fa-save" @click="saveHoliday(props.row)"/>
                  <q-tooltip>{{$t('demande.conge.save')}}</q-tooltip>
                </span>
                <span>
                  <q-btn class='deleteBtn' size="xs" icon="fa fa-trash-alt" @click="deleteHoliday(props.row.id)"/>
                  <q-tooltip>{{$t('demande.conge.delete')}}</q-tooltip>
                </span>
              </q-td>
            </q-table>
              <q-btn class='addCodeHolidayAction' :label="$t('demande.conge.add')" @click="addNewHoliday"/>
          </q-card-main>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as services from '../../services/conge-services.js'
import { bus } from '../../plugins/event-bus.js'
import moment from '../../plugins/momentjs.js'
import { Notify, Dialog } from 'quasar'

export default Vue.extend({
  data () {
    return {
      tableData: [],
      activeColumns: [
        {
          name: 'id',
          required: true,
          label: this.$t('demande.conge.codeConge'),
          align: 'center',
          field: 'id',
          key: 'id',
          style: 'display: none',
          sortable: false
        }, {
          name: 'codeConge',
          required: true,
          label: this.$t('demande.conge.codeConge'),
          align: 'center',
          field: 'codeConge',
          key: 'codeConge',
          style: 'min-width: 150px',
          sortable: false
        }, {
          name: 'droit',
          required: true,
          label: this.$t('demande.conge.droit'),
          align: 'center',
          field: 'droit',
          key: 'droit',
          style: 'min-width: 80px',
          sortable: false
        }, {
          name: 'action',
          required: true,
          label: this.$t('demande.conge.actions'),
          align: 'center',
          field: 'action',
          key: 'action',
          style: 'min-width: 80px',
          sortable: false
        }
      ],
      holidaysColumns: [
        {
          name: 'id',
          required: true,
          align: 'center',
          field: 'id',
          key: 'id',
          style: 'display: none',
          sortable: false
        }, {
          name: 'intitule',
          required: true,
          field: 'intitule',
          key: 'intitule'
        }, {
          name: 'dateDebutJourFerier',
          required: true,
          field: 'dateDebutJourFerier',
          key: 'dateDebutJourFerier'
        }, {
          name: 'nBJourFerier',
          required: true,
          field: 'nBJourFerier',
          key: 'nBJourFerier'
        }, {
          name: 'action',
          required: true,
          field: 'action',
          key: 'action'
        }
      ],
      holidays: [],
      loading: false,
      serverPagination: {
        rowsPerPage: 5,
        page: 1,
        rowsNumber: 5
      },
      rowPerPage: [5, 10, 15, 20, 25, 30],
      loadingone: false
    }
  },
  mounted () {
    let that = this
    that.$store.commit('Dashboard/setActiveMenu', '1009')

    bus.$on('requestHolidaysSuccess', function (res) {
      that.loading = false
      that.holidays = res.tableData.data
      that.serverPagination.rowsNumber = res.tableData.pagination.totalCount
    })

    bus.$on('requestHolidaysFailed', function (res) {
      that.loading = false
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        }
      }
    })

    bus.$on('getCodeCongesSuccess', function (res) {
      that.loading = false
      that.tableData = res
    })

    bus.$on('addCodeCongeSuccess', function (res) {
      that.loadingOne = false
      that.requestCongesTypes()
      Notify.create({
        icon: 'fa fa-check',
        message: that.$t(res.title.label),
        color: 'white'
      })
    })

    bus.$on('addHolidaySuccess', function (res) {
      that.loading = false
      that.requestHolidays({
        pagination: that.serverPagination
      })
      Notify.create({
        icon: 'fa fa-check',
        message: that.$t(res.title.label),
        color: 'white'
      })
    })

    bus.$on('deleteHolidaySuccess', function (res) {
      that.loading = false
      that.requestHolidays({
        pagination: that.serverPagination
      })
      Notify.create({
        icon: 'fa fa-check',
        message: that.$t(res.title.label),
        color: 'white'
      })
    })

    bus.$on('deleteCodeCongeSuccess', function (res) {
      that.loading = false
      that.requestCongesTypes()
      Notify.create({
        icon: 'fa fa-check',
        message: that.$t(res.title.label),
        color: 'white'
      })
    })

    bus.$on('getCodeCongesFailed', function (res) {
      that.loadingone = false
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        }
      }
    })

    bus.$on('addCodeCongeFailed', function (res) {
      that.loadingone = false
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        } else {
          Notify.create({
            type: 'negative',
            icon: 'fa fa-times',
            message: that.$t(res.data.title.label),
            color: 'white'
          })
        }
      }
    })

    bus.$on('deleteCodeCongeFailed', function (res) {
      that.loadingone = false
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        } else {
          Notify.create({
            type: 'negative',
            icon: 'fa fa-times',
            message: that.$t(res.data.title.label),
            color: 'white'
          })
        }
      }
    })

    bus.$on('addHolidayFailed', function (res) {
      that.loadingone = false
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        } else {
          Notify.create({
            type: 'negative',
            icon: 'fa fa-times',
            message: that.$t(res.data.title.label),
            color: 'white'
          })
        }
      }
    })

    bus.$on('deleteHolidayFailed', function (res) {
      that.loading = false
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        } else {
          Notify.create({
            type: 'negative',
            icon: 'fa fa-times',
            message: that.$t(res.data.title.label),
            color: 'white'
          })
        }
      }
    })
    this.requestHolidays({
      pagination: that.serverPagination
    })
    this.requestCongesTypes()
  },
  methods: {
    saveCongeCode (props) {
      if (parseInt(props.droit) > 0 && parseInt(props.droit) > 0) {
        this.loading = true
        services.addCodeConge({ props: props })
      } else {
        Notify.create({
          type: 'negative',
          icon: 'fa fa-times',
          message: this.$t('demande.conge.holidaysERRHaundle'),
          color: 'white'
        })
      }
    },
    deleteCodeConge (props) {
      Dialog.create({
        title: this.$t('demande.conge.confirmation'),
        message: this.$t('demande.conge.youWantContinue'),
        ok: {
          label: this.$t('demande.conge.validate'),
          color: 'primary'
        },
        cancel: {
          label: this.$t('demande.conge.close'),
          color: 'white'
        }
      }).then(() => {
        services.deleteCodeConge({ props: props })
      })
    },
    addNewHoliday () {
      this.holidays.push({ id: null, intitule: '', dateDebutJourFerier: moment().format(), nBJourFerier: 0 })
    },
    addNewCongeCode () {
      this.tableData.push({ id: null, codeConge: '', droit: 0 })
    },
    saveHoliday (props) {
      if (parseInt(props.nBJourFerier) > 0 && props.intitule !== '' && props.intitule !== ' ') {
        services.addHoliday({ props: props, dateDebutJourFerier: moment(props.dateDebutJourFerier).format('DD-MM-YYYY') })
      } else {
        Notify.create({
          type: 'negative',
          icon: 'fa fa-times',
          message: this.$t('demande.conge.holidaysERRHaundle'),
          color: 'white'
        })
      }
    },
    deleteHoliday (id) {
      Dialog.create({
        title: this.$t('demande.conge.confirmation'),
        message: this.$t('demande.conge.youWantContinue'),
        ok: {
          label: this.$t('demande.conge.validate'),
          color: 'primary'
        },
        cancel: {
          label: this.$t('demande.conge.close'),
          color: 'white'
        }
      }).then(() => {
        services.deleteHoliday({ id: id })
      })
    },
    requestCongesTypes () {
      this.loading = true
      services.getCodeConges()
    },
    requestHolidays ({ pagination }) {
      this.serverPagination.page = pagination.page
      this.serverPagination.rowsPerPage = pagination.rowsPerPage
      this.loadingone = true
      services.requestHolidays({ page: parseInt(pagination.page - 1), maxRows: pagination.rowsPerPage })
    }
  },
  beforeDestroy () {
    bus.$off('requestHolidaysSuccess')
    bus.$off('getCodeCongesSuccess')
    bus.$off('getCodeCongesFailed')
    bus.$off('addCodeCongeSuccess')
    bus.$off('addCodeCongeFailed')
    bus.$off('addHolidaySuccess')
    bus.$off('addHolidayFailed')
    bus.$off('deleteHolidaySuccess')
    bus.$off('deleteHolidayFailed')
    bus.$off('deleteCodeCongeSuccess')
    bus.$off('deleteCodeCongeFailed')
    bus.$off('requestHolidaysFailed')
  }
})
</script>
