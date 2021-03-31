<template>
  <div class="row flex justify-center congeListe">
    <div class="congeListContainer">
      <q-btn @click="exportExcel" color="primary" class="block exportBtn" icon='fa fa-file-download' :label="$t('demande.conge.excelExport')" /><br/>
      <q-card class="col-md-10 congeCard">
        <q-card-main class="congerCardContainer">
          <q-table
            v-if="showTable"
            :title='$t("demande.conge.abondoneeTitle")'
            :selection="tableMode"
            :selected.sync="selectedConges"
            :data="tableData"
            :columns="activeColumns"
            row-key="reference"
            :pagination.sync="serverPagination"
            :rows-per-page-options="rowPerPage"
            :loading="loading"
            class="filterWidth"
            @request="requestConges"
          >
            <q-td slot="body-cell-status" slot-scope="props" :props="props">
              <i v-if='$store.state.conge.ExpiredDemandeTableMenu === "0"' class="fa fa-user-clock TableIcon tableIconWait"></i>
              <i v-if='$store.state.conge.ExpiredDemandeTableMenu === "1"' class="fa far fa-calendar-times TableIcon tableIconExpired"></i>
              <q-tooltip>{{$t(props.row.etat.label)}}</q-tooltip>
            </q-td>
            <q-td slot="body-cell-reference" slot-scope="props" :props="props">
              <div class="ellipseText">{{props.row.reference}}</div>
              <q-tooltip>{{props.row.reference}}</q-tooltip>
            </q-td>
            <q-td slot="body-cell-dateDeCreation" slot-scope="props" :props="props">
              {{props.row.dateDeCreation}}
            </q-td>
            <q-td slot="body-cell-matricule" slot-scope="props" :props="props">
             {{(props.row.matricule === null) ? '...' : props.row.matricule}}
            </q-td>
            <q-td slot="body-cell-matriculeGroupe" slot-scope="props" :props="props">
             {{(props.row.matriculeGroupe === null) ? '...' : props.row.matriculeGroupe}}
            </q-td>
            <q-td slot="body-cell-entite" slot-scope="props" :props="props">
              {{(props.row.entite === null) ? '...' : props.row.entite}}
            </q-td>
            <q-td slot="body-cell-manager" slot-scope="props" :props="props">
             {{(props.row.manager === 'null null') ? '...' : props.row.manager}}
            </q-td>
            <q-td slot="body-cell-dateDeDebut" slot-scope="props" :props="props">
              {{props.row.dateDeDebut.date}} {{$t(props.row.dateDeDebut.typeDebut)}}
            </q-td>
            <q-td slot="body-cell-dateDeFin" slot-scope="props" :props="props">
              {{props.row.dateDeFin.date}} {{$t(props.row.dateDeFin.typeFin)}}
            </q-td>
            <q-td slot="body-cell-commentaireRefusManager" slot-scope="props" :props="props">
              <div class="ellipseDescription">{{props.row.commentaireRefusManager}}</div>
              <q-tooltip>{{props.row.commentaireRefusManager}}</q-tooltip>
            </q-td>
            <q-td slot="body-cell-action" slot-scope="props" :props="props">
              <div class="actionBtnsContainer" :key="action.code" v-for="action in props.row.action">
                <q-btn size="xs" v-if="action.code !== 'congeAnterieur'" :class="action.class" :icon="'fa '+action.icon" @click="sendAction(action.code, props.row.reference)"/>
                <q-btn size="xs" v-else :class="action.class" :icon="'fa '+action.icon" @click="sendAction(action.code, props.row)"/>
                <q-tooltip>{{$t(action.name)}}</q-tooltip>
              </div>
            </q-td>
            <template slot="top-right" slot-scope="props">
              <filters :properties="props" model="model2"></filters>
            </template>
            <div v-if="selectedConges.length > 1" slot="bottom-row" class="tableFooterBtn" slot-scope="props">
              <div :props="props" class="actionBtnsContainer" :key="action.code" v-for="action in actionBtn">
                <q-btn size="xs" :class="action.class" :icon="'fa '+action.icon" @click="sendMultiAction(action.code)"/>
                <q-tooltip>{{$t(action.name)}}</q-tooltip>
              </div>
            </div>
          </q-table>
        </q-card-main>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Filters from '../../components/conge/filters.vue'
import { bus } from '../../plugins/event-bus.js'
import * as services from '../../services/conge-services.js'
import { Notify } from 'quasar'
import moment from '../../plugins/momentjs.js'

export default Vue.extend({
  name: 'expiredDemandes',
  data () {
    return {
      selectedSecond: [],
      separator: 'horizontal',
      tableData: [],
      activeColumns: [],
      loading: false,
      serverPagination: {
        sortBy: null,
        descending: false,
        rowsPerPage: 5,
        page: 1,
        rowsNumber: 5
      },
      filter: '',
      selectedConges: [],
      showTable: true,
      rowPerPage: [5, 10, 15, 20, 25, 30],
      dateStart: '',
      dateEnd: '',
      actionBtn: [],
      tableMode: 'multiple'
    }
  },
  mounted () {
    let that = this
    that.$store.commit('Dashboard/setActiveMenu', '10011')

    that.activeColumns = that.columns()

    bus.$on('expiredDemandeRefresh', function (res) {
      let TempColumns = that.columns()
      that.showTable = false
      let partMenu = that.changeTableColumns(res.codeMenu)
      for (let i = 0; i < partMenu.length; i++) {
        TempColumns.push(partMenu[i])
      }
      that.dateStart = res.dateStart
      that.dateEnd = res.dateEnd
      that.requestConges({
        pagination: that.serverPagination,
        filter: res.terms
      })
      that.activeColumns = TempColumns
      that.showTable = true
    })

    bus.$on('getCongesSuccess', function (res) {
      that.loading = false
      that.tableData = res.tableData.data
      that.serverPagination.rowsNumber = res.tableData.pagination.totalCount
      that.actionBtn = res.tableData.action
    })

    bus.$on('getCongesFailed', function (res) {
      that.loading = false
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        }
      }
    })

    bus.$on('sendActionsSuccess', function (res) {
      bus.$emit('checkCountDemandeValidate')
      that.selectedConges = []
      that.loading = false
      Notify.create({
        icon: 'fa fa-check',
        message: that.$t(res.title.label),
        color: 'white'
      })
      that.requestConges({
        pagination: that.serverPagination
      })
      that.selectedConges = []
    })

    bus.$on('sendActionsFailed', function (res) {
      that.selectedConges = []
      that.loading = false
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        }
      }
    })

    bus.$on('storeAnterieurSuccess', function (res) {
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

    bus.$on('exportPaiePeriodeDemandesSuccess', function (res) {
      that.loading = false
      window.open(res.url)
    })

    bus.$on('exportPaiePeriodeDemandesFailed', function (res) {
      that.loading = false
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', true)
        } else if (res.status === 400) {
          Notify.create({
            type: 'negative',
            icon: 'fa fa-times',
            message: that.$t(res.data.title),
            color: 'white'
          })
        }
      }
    })

    bus.$emit('getMenuTable', this.$route.query.etat)
  },
  methods: {
    exportExcel () {
      this.loading = true
      services.exportPaiePeriodeDemandes({})
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
    regulize (props) {},
    changeTableColumns (value) {
      let menu = []
      switch (value) {
        case '0':
          this.tableMode = 'multiple'
          break
        case '1':
          this.tableMode = 'none'
          break
      }
      return menu
    },
    requestConges ({ pagination, filter }) {
      this.serverPagination.page = pagination.page
      this.serverPagination.sortBy = pagination.sortBy
      this.serverPagination.descending = pagination.descending
      this.serverPagination.rowsPerPage = pagination.rowsPerPage
      this.loading = true
      services.expiredDemandes({ code: this.$store.state.conge.ExpiredDemandeTableMenu, maxRows: pagination.rowsPerPage, column: pagination.sortBy, search: filter, dateStart: this.dateStart, dateEnd: this.dateEnd, descending: pagination.descending, page: parseInt(pagination.page - 1) })
    },
    columns () {
      return [
        {
          name: 'status',
          required: true,
          label: this.$t('demande.conge.stateConge'),
          align: 'center',
          field: 'status',
          key: 'status',
          style: 'min-width: 80px',
          sortable: false
        }, {
          name: 'reference',
          required: true,
          label: this.$t('demande.conge.reference'),
          align: 'center',
          field: 'reference',
          style: 'min-width: 100px',
          sortable: false
        }, {
          name: 'matricule',
          required: true,
          label: this.$t('demande.conge.matricule'),
          align: 'center',
          field: 'matricule',
          style: 'min-width: 100px',
          sortable: true
        }, {
          name: 'manager',
          required: true,
          label: this.$t('demande.conge.manager'),
          align: 'center',
          field: 'manager',
          style: 'min-width: 100px',
          sortable: true
        }, {
          name: 'demandeur',
          required: true,
          label: this.$t('demande.conge.demandeur'),
          align: 'center',
          field: 'demandeur',
          style: 'min-width: 100px',
          sortable: true
        }, {
          name: 'dateDeCreation',
          required: true,
          label: this.$t('demande.conge.depotDate'),
          align: 'center',
          field: 'dateDeCreation',
          style: 'min-width: 100px',
          sortable: true
        }, {
          name: 'duree',
          required: true,
          label: this.$t('demande.conge.duree'),
          align: 'center',
          field: 'duree',
          style: 'min-width: 100px',
          sortable: false
        }, {
          name: 'dateDeDebut',
          required: true,
          label: this.$t('demande.conge.dateStart'),
          align: 'center',
          field: 'dateDeDebut',
          style: 'min-width: 150px',
          sortable: true
        }, {
          name: 'dateDeFin',
          required: true,
          label: this.$t('demande.conge.dateEnd'),
          align: 'center',
          field: 'dateDeFin',
          style: 'min-width: 150px',
          sortable: true
        }, {
          name: 'action',
          required: true,
          label: this.$t('demande.conge.actions'),
          align: 'center',
          field: 'action',
          style: 'min-width: 100px',
          sortable: false
        }
      ]
    },
    sendAction (code, reference) {
      switch (code) {
        case 'congeSansSuite':
          services.sendActions({ code: code, rows: reference })
          break
        case 'congeAnterieur':
          services.storeAnterieur({
            dateStart: moment(reference.dateDeDebut.date, 'DD/MM/YYYY').format('DD-MM-YYYY'),
            dateEnd: moment(reference.dateDeFin.date, 'DD/MM/YYYY').format('DD-MM-YYYY'),
            morning: reference.dateDeDebut.morning,
            afternoon: reference.dateDeFin.afternoon,
            id: reference.demandeurId
          })
          break
      }
    },
    sendMultiAction (code) {
      let references = []
      for (let i = 0; i < this.selectedConges.length; i++) {
        references.push(this.selectedConges[i].reference)
      }
      this.sendAction(code, references)
    }
  },
  watch: {
  },
  computed: {
  },
  components: {
    'filters': Filters
  },
  beforeDestroy () {
    bus.$off('getCongesSuccess')
    bus.$off('getCongesFailed')
    bus.$off('expiredDemandeRefresh')
    bus.$off('sendActionsSuccess')
    bus.$off('sendActionsFailed')
    bus.$off('storeAnterieurSuccess')
    bus.$off('storeAnterieurFailed')
  }
})
</script>
