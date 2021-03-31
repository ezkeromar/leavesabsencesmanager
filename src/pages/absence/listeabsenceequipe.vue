<template>
  <div class="row flex justify-center congeListe">
    <div class="congeListContainer">
      <q-card class="col-md-10 congeCard">
        <q-card-main class="congerCardContainer absenceCardContainer">
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
            <q-td slot="body-cell-status" slot-scope="props" :props="props">
              <i v-if='$store.state.conge.etatAbsenceTeamTableMenu === "28"' class="fa fa-square TableIcon notpaid"></i>
              <i v-if='$store.state.conge.etatAbsenceTeamTableMenu === "29"' class="fa fa-square TableIcon specialabs"></i>
              <i v-if='$store.state.conge.etatAbsenceTeamTableMenu === "30"' class="fa fa-square TableIcon maladieabs"></i>
              <i v-if='$store.state.conge.etatAbsenceTeamTableMenu === "31"' class="fa fa-square TableIcon atabs"></i>
              <i v-if='$store.state.conge.etatAbsenceTeamTableMenu === "32"' class="fa fa-square TableIcon maternityabs"></i>
              <q-tooltip>{{$t(props.row.status.label)}}</q-tooltip>
            </q-td>
            <q-td slot="body-cell-reference" slot-scope="props" :props="props">
              <div class="ellipseText">{{props.row.reference}}</div>
              <q-tooltip>{{props.row.reference}}</q-tooltip>
            </q-td>
            <q-td slot="body-cell-dateDeCreation" slot-scope="props" :props="props">
              {{props.row.dateDeCreation}}
            </q-td>
            <q-td slot="body-cell-dateDeDebut" slot-scope="props" :props="props">
              {{props.row.dateDeDebut.date}} {{$t(props.row.dateDeDebut.typeDebut)}}
            </q-td>
            <q-td slot="body-cell-dateDeFin" slot-scope="props" :props="props">
              {{props.row.dateDeFin.date}} {{$t(props.row.dateDeFin.typeFin)}}
            </q-td>
            <q-td slot="body-cell-dateDeRefus" slot-scope="props" :props="props">
              {{(props.row.dateDeRefus === null) ? '...' : props.row.dateDeRefus}}
            </q-td>
            <q-td slot="body-cell-dateDeValidation" slot-scope="props" :props="props">
              {{(props.row.dateDeValidation === null) ? '...' : props.row.dateDeValidation}}
            </q-td>
            <q-td slot="body-cell-commentaireRefus" slot-scope="props" :props="props">
              <div class="ellipseDescription">{{(props.row.commentaireRefus === null) ? '...' : props.row.commentaireRefus}}</div>
              <q-tooltip>{{(props.row.commentaireRefus === '') ? '...' : props.row.commentaireRefus}}</q-tooltip>
            </q-td>
            <q-td slot="body-cell-motif" slot-scope="props" :props="props">
              <div class="ellipseDescription">{{(props.row.motif === '') ? '...' : props.row.motif}}</div>
              <q-tooltip>{{(props.row.motif === '') ? '...' : props.row.motif}}</q-tooltip>
            </q-td>
            <q-td slot="body-cell-type" slot-scope="props" :props="props">
              <div class="ellipseDescription">{{(props.row.type === '') ? '...' : props.row.type}}</div>
              <q-tooltip>{{(props.row.type === '') ? '...' : props.row.type}}</q-tooltip>
            </q-td>
            <q-td slot="body-cell-etat" slot-scope="props" :props="props">
              <i v-if='props.row.etat.name === "VALIDEE"' class="fa fa-user-check TableIcon tableIconValide"></i>
              <i v-if='props.row.etat.name === "EN_COURS"' class="fa fa-user-clock TableIcon tableIconWait"></i>
              <i v-if='props.row.etat.name === "REFUSEE"' class="fa fa-user-times TableIcon tableIconRefuse"></i>
              <i v-if='props.row.etat.name === "TRAITEE"' class="fa fa-user-slash TableIcon tableIconCancel"></i>
              <q-tooltip>{{$t(props.row.etat.label)}}</q-tooltip>
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
import * as services from '../../services/absence-services.js'
import { Notify, Dialog } from 'quasar'

export default Vue.extend({
  name: 'listeAbsenceequipe',
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
    that.$store.commit('Dashboard/setActiveMenu', '2002')

    that.activeColumns = that.columns()

    bus.$on('etatabsenceteamRefresh', function (res) {
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

    bus.$on('getAbsenceSuccess', function (res) {
      that.loading = false
      that.tableData = res.tableData.data
      that.serverPagination.rowsNumber = res.tableData.pagination.totalCount
      that.actionBtn = res.tableData.action
    })

    bus.$on('getAbsenceFailed', function (res) {
      that.loading = false
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        }
      }
    })

    bus.$emit('getMenuTable', this.$route.query.etat)
  },
  methods: {
    regulize (props) {},
    requestConges ({ pagination }) {
      this.serverPagination.page = pagination.page
      this.serverPagination.sortBy = pagination.sortBy
      this.serverPagination.descending = pagination.descending
      this.serverPagination.rowsPerPage = pagination.rowsPerPage
      this.loading = true
      services.getAbsences({ menuId: this.$store.state.Dashboard.activeMenu, code: this.$store.state.conge.etatAbsenceTeamTableMenu, maxRows: pagination.rowsPerPage, column: pagination.sortBy, search: this.filter, dateStart: this.dateStart, dateEnd: this.dateEnd, descending: pagination.descending, page: parseInt(pagination.page - 1) })
    },
    sendAction (code, reference) {
      switch (code) {
        case 'refuseabsren':
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
          })
          break
        case 'validateabsren':
          services.sendActions({ code: code, rows: reference, comment: '' })
          break
      }
    },
    sendMultiAction (code) {
      let references = []
      for (let i = 0; i < this.selectedConges.length; i++) {
        if (this.selectedConges[i].etat.name === 'EN_COURS') {
          references.push(this.selectedConges[i].reference)
        }
      }
      this.sendAction(code, references)
    },
    changeTableColumns (value) {
      let menu = []
      switch (value) {
        case '28':
          this.selectionType = 'multiple'
          menu = [{
            name: 'motif',
            required: true,
            label: this.$t('demande.absence.motif'),
            align: 'center',
            field: 'duree',
            style: 'min-width: 100px',
            sortable: false
          }, {
            name: 'commentaireRefus',
            required: true,
            label: this.$t('demande.absence.motifrefu'),
            align: 'center',
            field: 'commentaireRefus',
            key: 'commentaireRefus',
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
          }, {
            name: 'dateDeRefus',
            required: true,
            label: this.$t('demande.absence.datederefus'),
            align: 'center',
            field: 'dateDeRefus',
            key: 'dateDeRefus',
            sortable: true
          }, {
            name: 'dateDeValidation',
            required: true,
            label: this.$t('demande.absence.validationDate'),
            align: 'center',
            field: 'dateDeValidation',
            style: 'min-width: 100px',
            sortable: true
          }]
          break
        case '29':
          this.selectionType = 'none'
          menu = [{
            name: 'type',
            required: true,
            label: this.$t('demande.absence.typecol'),
            align: 'center',
            field: 'type',
            style: 'min-width: 200px',
            sortable: true
          }]
          break
        case '30':
          this.selectionType = 'none'
          break
        case '31':
          this.selectionType = 'none'
          break
        case '32':
          this.selectionType = 'none'
          break
      }
      return menu
    },
    columns () {
      return [
        {
          name: 'status',
          required: true,
          label: this.$t('demande.conge.state'),
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
          style: 'min-width: 130px',
          sortable: false
        }, {
          name: 'dateDeCreation',
          required: true,
          label: this.$t('demande.absence.demandeDate'),
          align: 'center',
          field: 'dateDeCreation',
          style: 'min-width: 100px',
          sortable: true
        }, {
          name: 'demandeur',
          required: true,
          label: this.$t('demande.absence.demandeur'),
          align: 'center',
          field: 'demandeur',
          style: 'min-width: 150px',
          sortable: true
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
          style: 'min-width: 150px',
          sortable: false
        }, {
          name: 'etat',
          required: true,
          label: this.$t('demande.absence.etat'),
          align: 'center',
          field: 'duree',
          style: 'min-width: 100px',
          sortable: true
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
  }
})
</script>

<style>
  .q-popover .q-item-avatar {
    width: 15px !important;
    padding-top: 3px;
    height: auto;
  }
</style>
