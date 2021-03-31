<template>
  <div class="row flex justify-center congeListe">
    <div class="congeListContainer" style='margin-top: 0px;'>
      <q-btn :disable='true' class="payPeriodeBtn payPeriodeBtnHidden"/>
      <q-btn @click="exportExcel" color="primary" class="block exportBtn" icon='fa fa-file-download' :label="$t('demande.conge.excelExport')" />
      <q-card class="col-md-10 congeCard">
        <q-card-main class="congerCardContainer">
          <q-table
            v-if="showTable"
            :title="$t('demande.conge.teamDemande')"
            :selection="selectionType"
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
            <q-td slot="body-cell-status" slot-scope="props" :props="props" :class="{'lignBackgrount': props.row.color === 'red'}">
              <i v-if='$store.state.conge.etatCongeTeamTableMenu === "05"' class="fa fa-user-clock TableIcon tableIconWait"></i>
              <i v-if='$store.state.conge.etatCongeTeamTableMenu === "06"' class="fa fa-user-check TableIcon tableIconValide"></i>
              <i v-if='$store.state.conge.etatCongeTeamTableMenu === "07"' class="fa fa-user-times TableIcon tableIconRefuse"></i>
              <i v-if='$store.state.conge.etatCongeTeamTableMenu === "08"' class="fa fa-user-slash TableIcon tableIconCancel"></i>
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
                <q-btn size="xs" v-if="action.code !== 'congeTreated'" :class="action.class" :icon="'fa '+action.icon" @click="sendAction(action.code, props.row.reference)"/>
                <i v-else :class="'fa '+action.icon+' '+action.class"></i>
                <q-tooltip>{{$t(action.name)}}</q-tooltip>
              </div>
            </q-td>
            <template slot="top-right" slot-scope="props">
              <filters :properties="props" model="model3"></filters>
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
import { Notify, Dialog } from 'quasar'

export default Vue.extend({
  name: 'listCongeTeam',
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
      comment: null,
      actionBtn: [],
      selectionType: 'none',
      dateStart: null,
      dateEnd: null
    }
  },
  mounted () {
    let that = this
    that.$store.commit('Dashboard/setActiveMenu', '1003')

    that.activeColumns = that.columns()

    bus.$on('teamcongeRefresh', function (res) {
      that.selectedConges = []
      let TempColumns = that.columns()
      that.showTable = false
      let partMenu = that.changeTableColumns(res.codeMenu)
      for (let i = 0; i < partMenu.length; i++) {
        TempColumns.splice(10, 0, partMenu[i])
      }
      that.dateStart = res.dateStart
      that.dateEnd = res.dateEnd
      that.filter = res.terms
      that.requestConges({
        pagination: that.serverPagination
      })
      that.activeColumns = TempColumns
      that.showTable = true
    })

    bus.$on('sendActionsSuccess', function (res) {
      bus.$emit('checkCountDemandeValidate')
      that.selectedConges = []
      that.loading = false
      let tempResPart = (res.title.demandeur !== undefined) ? res.title.demandeur : res.title.count
      Notify.create({
        icon: 'fa fa-check',
        message: that.$t(res.title.label) + ' ' + tempResPart,
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

    bus.$on('exportPaiePeriodeDemandesSuccess', function (res) {
      that.loading = false
      window.open(res.url)
    })

    bus.$on('exportPaiePeriodeDemandesFailed', function (res) {
      that.loading = false
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
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
      if (this.dateStart != null && this.dateEnd != null) {
        services.exportDemandesConge({ dateStart: this.dateStart, dateEnd: this.dateEnd, state: this.$store.state.conge.etatCongeTeamTableMenu })
      } else {
        Notify.create({
          type: 'negative',
          icon: 'fa fa-times',
          message: this.$t('demande.absence.pleasefillalldata'),
          color: 'white'
        })
      }
    },
    regulize (props) {},
    requestConges ({ pagination }) {
      this.serverPagination.page = pagination.page
      this.serverPagination.sortBy = pagination.sortBy
      this.serverPagination.descending = pagination.descending
      this.serverPagination.rowsPerPage = pagination.rowsPerPage
      this.loading = true
      services.getConges({ code: this.$store.state.conge.etatCongeTeamTableMenu, maxRows: pagination.rowsPerPage, column: pagination.sortBy, search: this.filter, dateStart: this.dateStart, dateEnd: this.dateEnd, descending: pagination.descending, page: parseInt(pagination.page - 1) })
    },
    sendAction (code, reference) {
      switch (code) {
        case 'congerejected':
          Dialog.create({
            title: this.$t('demande.conge.rejectMotif'),
            message: this.$t('demande.conge.motifRefDesc') + ' *',
            prompt: {
              model: '',
              type: 'textarea'
            },
            ok: {
              label: this.$t('demande.conge.validate'),
              color: 'primary'
            },
            cancel: {
              label: this.$t('demande.conge.close'),
              color: 'white'
            }
          }).then((data) => {
            if (data !== null && data !== '' && data !== ' ') {
              services.sendActions({ code: code, rows: reference, comment: data })
            } else {
              Notify.create({
                type: 'negative',
                icon: 'fa fa-times',
                message: this.$t('demande.conge.motifRefDescRequire'),
                color: 'white'
              })
            }
          }).catch(() => {
            // Notify.create({
            //   type: 'negative',
            //   icon: 'fa fa-times',
            //   message: 'Veuillez saisir un motif de refus *',
            //   color: 'white'
            // })
          })
          break
        case 'congeCanceled':
          Dialog.create({
            title: this.$t('demande.conge.cancelMotif'),
            message: this.$t('demande.conge.cancelMotifDesc') + ' *',
            prompt: {
              model: '',
              type: 'textarea'
            },
            ok: {
              label: this.$t('demande.conge.validate'),
              color: 'primary'
            },
            cancel: {
              label: this.$t('demande.conge.close'),
              color: 'white'
            }
          }).then((data) => {
            if (data !== null && data !== '' && data !== ' ') {
              services.sendActions({ code: code, rows: reference, comment: data })
            } else {
              Notify.create({
                type: 'negative',
                icon: 'fa fa-times',
                message: this.$t('demande.conge.cancelMotifDescRequired'),
                color: 'white'
              })
            }
          }).catch(() => {
            // Notify.create({
            //   type: 'negative',
            //   icon: 'fa fa-times',
            //   message: 'Votre action est annulée',
            //   color: 'white'
            // })
          })
          break
        case 'congeValidated':
          services.sendActions({ code: code, rows: reference, comment: '' })
          break
      }
    },
    sendMultiAction (code) {
      let references = []
      for (let i = 0; i < this.selectedConges.length; i++) {
        references.push(this.selectedConges[i].reference)
      }
      this.sendAction(code, references)
    },
    changeTableColumns (value) {
      let menu = []
      switch (value) {
        case '06':
          this.selectionType = 'none'
          menu = [{
            name: 'dateDeValidationManager',
            required: true,
            label: this.$t('demande.conge.validationDate'),
            align: 'center',
            field: 'dateDeValidationManager',
            key: 'dateDeValidationManager',
            sortable: true
          }, {
            name: 'action',
            required: true,
            label: this.$t('demande.conge.actions'),
            align: 'center',
            field: 'action',
            key: 'action',
            style: 'min-width: 100px',
            sortable: false
          }]
          break
        case '05':
          this.selectionType = 'multiple'
          menu = [{
            name: 'action',
            required: true,
            label: this.$t('demande.conge.actions'),
            align: 'center',
            field: 'action',
            key: 'action',
            style: 'min-width: 100px',
            sortable: false
          }]
          break
        case '07':
          this.selectionType = 'none'
          menu = [{
            name: 'dateDeRefusAnnulerManager',
            required: true,
            label: this.$t('demande.conge.refuDate'),
            align: 'center',
            field: 'dateDeRefusAnnulerManager',
            key: 'dateDeRefusAnnulerManager',
            sortable: true
          }, {
            name: 'commentaireRefusManager',
            required: true,
            label: this.$t('demande.conge.motif'),
            align: 'center',
            field: 'commentaireRefusManager',
            key: 'commentaireRefusManager',
            sortable: true
          }]
          break
        case '08':
          this.selectionType = 'none'
          menu = [{
            name: 'dateDeValidationManager',
            required: true,
            label: this.$t('demande.conge.validationDate'),
            align: 'center',
            field: 'dateDeValidationManager',
            key: 'dateDeValidationManager',
            sortable: true
          }, {
            name: 'dateDeRefusAnnulerManager',
            required: true,
            label: this.$t('demande.conge.cancelDateCol'),
            align: 'center',
            field: 'dateDeRefusAnnulerManager',
            key: 'dateDeRefusAnnulerManager',
            sortable: true
          }, {
            name: 'commentaireRefusManager',
            required: true,
            label: this.$t('demande.conge.motif'),
            align: 'center',
            field: 'commentaireRefusManager',
            key: 'commentaireRefusManager',
            sortable: true
          }]
          break
      }
      return menu
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
          name: 'matricule',
          required: true,
          label: this.$t('demande.conge.matr'),
          align: 'center',
          field: 'matricule',
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
          name: 'duree',
          required: true,
          label: this.$t('demande.conge.duree'),
          align: 'center',
          field: 'duree',
          style: 'min-width: 100px',
          sortable: false
        }
      ]
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
    bus.$off('teamcongeRefresh')
    bus.$off('sendActionsFailed')
    bus.$off('sendActionsSuccess')
    bus.$off('exportPaiePeriodeDemandesSuccess')
    bus.$off('exportPaiePeriodeDemandesFailed')
  }
})
</script>
