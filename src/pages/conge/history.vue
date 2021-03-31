<template>
  <div class="row flex justify-center congeListe">
    <div class="congeListContainer">
      <q-card class="col-md-10 congeCard">
        <q-card-main class="congerCardContainer">
          <q-table
            v-if="showTable"
            :title="this.$t('demande.conge.historiqueDesDemandes')"
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
            <q-td slot="body-cell-etat" slot-scope="props" :props="props">
              <i v-if='props.row.etat.name === "En_COURS_VALIDATION"' class="fa fa-user-clock TableIcon tableIconWait"></i>
              <i v-if='props.row.etat.name === "VALIDEE"' class="fa fa-user-check TableIcon tableIconValide"></i>
              <i v-if='props.row.etat.name === "REFUSEE"' class="fa fa-user-times TableIcon tableIconRefuse"></i>
              <i v-if='props.row.etat.name === "ANNULEE"' class="fa fa-user-slash TableIcon tableIconCancel"></i>
              <i v-if='props.row.etat.name === "ABANDONNE"' class="fa far fa-calendar-times TableIcon tableIconExpired"></i>
              <q-tooltip>{{$t(props.row.etat.label)}}</q-tooltip>
            </q-td>
            <q-td slot="body-cell-reference" slot-scope="props" :props="props">
              <div class="ellipseText link" @click="showDetails(props.row.reference)">{{props.row.reference}}</div>
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
            <q-td slot='body-cell-dateDeValidationManager' slot-scope='props' :props="props">
              {{(props.row.dateDeValidationManager === null) ? '...' : props.row.dateDeValidationManager}}
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
            <template slot="top-right" slot-scope="props">
              <filters :properties="props" model="model3"></filters>
            </template>
          </q-table>
        </q-card-main>
      </q-card>
    </div>
    <pop-up :show='showTablePOP' height='auto' width='90%' maxHeight='85%' maxWidth='1300px'>
      <div slot='popHeader' class="dialogHeader">
        <p>{{$t('demande.conge.historiqueDeLaDemande')}}</p>
      </div>
      <div slot='popContent' class="dialogContainer">
        <q-table
          :data="congeHistoryOne"
          :columns="congeHistoryColumnOne"
          row-key="reference"
          class="congeHistoryTop"
          hide-bottom
        >
          <q-td slot="body-cell-dateDeDebut" slot-scope="props" :props="props">
            {{props.row.dateDeDebut.date}} {{$t(props.row.dateDeDebut.typeDebut)}}
          </q-td>
          <q-td slot="body-cell-dateDeFin" slot-scope="props" :props="props">
            {{props.row.dateDeFin.date}} {{$t(props.row.dateDeFin.typeFin)}}
          </q-td>
        </q-table>
        <q-table
          :data="congeHistoryTow"
          :columns="activePOPColumns"
          row-key="reference"
          class="congeHistoryBottom"
          v-if='showTablePOP'
        >
          <q-td slot="body-cell-etat" slot-scope="props" :props="props">
            <i v-if='props.row.etat.name === "VALIDEE"' class="fa fa-user-check TableIcon tableIconValide"></i>
            <i v-if='props.row.etat.name === "En_COURS_VALIDATION"' class="fa fa-user-clock TableIcon tableIconWait"></i>
            <i v-if='props.row.etat.name === "REFUSEE"' class="fa fa-user-times TableIcon tableIconRefuse"></i>
            <i v-if='props.row.etat.name === "ANNULEE"' class="fa fa-user-slash TableIcon tableIconCancel"></i>
            <i v-if='props.row.etat.name === "ABANDONNE"' class="fa far fa-calendar-times TableIcon tableIconExpired"></i>
            <q-tooltip>{{$t(props.row.etat.label)}}</q-tooltip>
          </q-td>
          <q-td slot="body-cell-commentaireRefusManager" slot-scope="props" :props="props">
            <div class="ellipseDescription">{{(props.row.commentaireRefusManager === null) ? '...' : props.row.commentaireRefusManager}}</div>
            <q-tooltip>{{props.row.commentaireRefusManager}}</q-tooltip>
          </q-td>
          <q-td slot="body-cell-commentaireRegulariserDemande" slot-scope="props" :props="props">
            <div class="ellipseDescription">{{(props.row.commentaireRegulariserDemande === null) ? '...' : props.row.commentaireRegulariserDemande}}</div>
            <q-tooltip>{{props.row.commentaireRegulariserDemande}}</q-tooltip>
          </q-td>
          <q-td slot="body-cell-dateDeValidationOuRefusManager" slot-scope="props" :props="props">
            {{(props.row.dateDeValidationOuRefusManager === null) ? '...' : props.row.dateDeValidationOuRefusManager}}
          </q-td>
          <q-td slot="body-cell-dateAnnulerManager" slot-scope="props" :props="props">
            {{(props.row.dateAnnulerManager === null) ? '...' : props.row.dateAnnulerManager}}
          </q-td>
          <q-td slot="body-cell-duree" slot-scope="props" :props="props">
            {{(props.row.duree === null) ? '...' : props.row.duree}}
          </q-td>
          <q-td slot="body-cell-dateDePayement" slot-scope="props" :props="props">
            {{(props.row.dateDePayement === null) ? '...' : props.row.dateDePayement}}
          </q-td>
          <q-td slot="body-cell-dateAregulariserDemande" slot-scope="props" :props="props">
            {{(props.row.dateAregulariserDemande === null) ? '...' : props.row.dateAregulariserDemande}}
          </q-td>
          <q-td slot="body-cell-dateRegulariserDemande" slot-scope="props" :props="props">
            {{(props.row.dateRegulariserDemande === null) ? '...' : props.row.dateRegulariserDemande}}
          </q-td>
          <q-td slot="body-cell-statut" slot-scope="props" :props="props">
            <i v-if='props.row.statut.name === "NON_PAYEE"' class="fa fa-square TableIcon tableIconNotPaid"></i>
            <i v-if='props.row.statut.name === "PAYEE"' class="fa fa-square TableIcon tableIconPaid"></i>
            <i v-if='props.row.statut.name === "A_REGULARISER"' class="fa fa-square TableIcon tableIcontoRegulize"></i>
            <i v-if='props.row.statut.name === "REGULARISEE"' class="fa fa-square TableIcon tableIconRegulized"></i>
            <q-tooltip>{{$t(props.row.statut.label)}}</q-tooltip>
          </q-td>
        </q-table>
      </div>
      <i slot='popCloseBtn' @click="closePopUp" class="closeIcon fa fa-times"></i>
    </pop-up>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Filters from '../../components/conge/filters.vue'
import { bus } from '../../plugins/event-bus.js'
import * as services from '../../services/conge-services.js'
import popup from '../../components/popup.vue'

export default Vue.extend({
  name: 'historyConge',
  data () {
    return {
      congeHistoryOne: [],
      congeHistoryTow: [],
      congeHistoryColumnOne: [
        {
          name: 'reference',
          required: true,
          label: this.$t('demande.conge.reference'),
          align: 'center',
          field: 'reference',
          key: 'reference',
          style: 'min-width: 150px',
          sortable: false
        }, {
          name: 'demandeur',
          required: true,
          label: this.$t('demande.conge.demandeur'),
          align: 'center',
          field: 'demandeur',
          key: 'demandeur',
          style: 'min-width: 80px',
          sortable: false
        }, {
          name: 'dateDeCreation',
          required: true,
          label: this.$t('demande.conge.depotDate'),
          align: 'center',
          field: 'dateDeCreation',
          key: 'dateDeCreation',
          style: 'min-width: 80px',
          sortable: false
        }, {
          name: 'dateDeDebut',
          required: true,
          label: this.$t('demande.conge.dateStart'),
          align: 'center',
          field: 'dateDeDebut',
          key: 'dateDeDebut',
          style: 'min-width: 80px',
          sortable: false
        }, {
          name: 'dateDeFin',
          required: true,
          label: this.$t('demande.conge.dateEnd'),
          align: 'center',
          field: 'dateDeFin',
          key: 'dateDeFin',
          style: 'min-width: 80px',
          sortable: false
        }, {
          name: 'duree',
          required: true,
          label: this.$t('demande.conge.duree'),
          align: 'center',
          field: 'duree',
          key: 'duree',
          style: 'min-width: 80px',
          sortable: false
        }
      ],
      tempReference: null,
      selectedSecond: [],
      separator: 'horizontal',
      tableData: [],
      activeColumns: [],
      activePOPColumns: [],
      loading: false,
      serverPagination: {
        sortBy: null,
        descending: false,
        rowsPerPage: 5,
        page: 1,
        rowsNumber: 5
      },
      serverPaginationTow: {
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
      showDialog: false,
      selectionType: 'none',
      dateStart: null,
      dateEnd: null,
      isRegulized: '',
      showTablePOP: false
    }
  },
  mounted () {
    let that = this
    that.$store.commit('Dashboard/setActiveMenu', '1006')
    this.activePOPColumns = this.congeHistoryColumnTow()

    that.activeColumns = that.columns()

    bus.$on('historycongeRefresh', function (res) {
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

    bus.$on('getCongesSuccess', function (res) {
      that.loading = false
      that.tableData = res.tableData.data
      that.serverPagination.rowsNumber = res.tableData.pagination.totalCount
      that.actionBtn = res.tableData.action
    })

    bus.$on('getCongeHistorySuccess', function (res) {
      that.loading = false
      that.congeHistoryOne = res.tableData.demande
      that.congeHistoryTow = res.tableData.data
      that.isRegulized = res.tableData.regulazid
      let TempColumns = that.congeHistoryColumnTow()
      that.showTablePOP = false
      let partMenu = that.changeHistoryTableColumns(res.codeMenu)
      for (let i = 0; i < partMenu.length; i++) {
        TempColumns.splice(10, 0, partMenu[i])
      }
      that.activePOPColumns = TempColumns
      that.showTablePOP = true
      that.showDialog = true
    })

    bus.$on('getCongeHistoryFailed', function (res) {
      that.loading = false
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        }
      }
    })

    bus.$on('getCongesFailed', function (res) {
      that.loading = false
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        }
      }
    })

    bus.$emit('getMenuTable')
  },
  methods: {
    regulize (props) {},
    showDetails (ref) {
      this.loading = true
      this.tempReference = ref
      services.getCongesHistory({ reference: ref })
    },
    closePopUp () {
      this.showTablePOP = false
    },
    requestConges ({ pagination }) {
      this.serverPagination.page = pagination.page
      this.serverPagination.sortBy = pagination.sortBy
      this.serverPagination.descending = pagination.descending
      this.serverPagination.rowsPerPage = pagination.rowsPerPage
      this.loading = true
      services.getCongestoPayandHistory({ code: this.$store.state.conge.historyCongeTableMenu, maxRows: pagination.rowsPerPage, column: pagination.sortBy, search: this.filter, dateStart: this.dateStart, dateEnd: this.dateEnd, descending: pagination.descending, page: parseInt(pagination.page - 1) })
    },
    changeTableColumns (value) {
      let menu = []
      switch (value) {
        case '10':
          this.selectionType = 'none'
          menu = []
          break
      }
      return menu
    },
    changeHistoryTableColumns () {
      let menu = []
      if (this.isRegulized === true) {
        menu = [{
          name: 'dateAregulariserDemande',
          required: true,
          label: this.$t('demande.conge.regulizeDemande'),
          align: 'center',
          field: 'dateAregulariserDemande',
          key: 'dateAregulariserDemande',
          style: 'min-width: 150px',
          sortable: false
        }, {
          name: 'commentaireRegulariserDemande',
          required: true,
          label: this.$t('demande.conge.regulizeMotif'),
          align: 'center',
          field: 'commentaireRegulariserDemande',
          key: 'commentaireRegulariserDemande',
          style: 'min-width: 150px',
          sortable: false
        }, {
          name: 'soldeARegulariser',
          required: true,
          label: this.$t('demande.conge.soldeRegulize'),
          align: 'center',
          field: 'soldeARegulariser',
          key: 'soldeARegulariser',
          style: 'min-width: 150px',
          sortable: false
        }, {
          name: 'dateRegulariserDemande',
          required: true,
          label: this.$t('demande.conge.dateRegulize'),
          align: 'center',
          field: 'dateRegulariserDemande',
          key: 'dateRegulariserDemande',
          style: 'min-width: 150px',
          sortable: false
        }]
      }
      return menu
    },
    congeHistoryColumnTow () {
      return [
        {
          name: 'etat',
          required: true,
          label: this.$t('demande.conge.stateConge'),
          align: 'center',
          field: 'etat',
          key: 'etat',
          style: 'min-width: 100px',
          sortable: false
        }, {
          name: 'statut',
          required: true,
          label: this.$t('demande.conge.paiementcol'),
          align: 'center',
          field: 'statut',
          key: 'statut',
          style: 'min-width: 100px',
          sortable: false
        }, {
          name: 'actor',
          required: true,
          label: this.$t('demande.conge.actor'),
          align: 'center',
          field: 'actor',
          key: 'actor',
          style: 'min-width: 150px',
          sortable: false
        }, {
          name: 'dateDeValidationOuRefusManager',
          required: true,
          label: this.$t('demande.conge.dateValidRef'),
          align: 'center',
          field: 'dateDeValidationOuRefusManager',
          key: 'dateDeValidationOuRefusManager',
          style: 'min-width: 100px',
          sortable: false
        }, {
          name: 'dateAnnulerManager',
          required: true,
          label: this.$t('demande.conge.cancelDate'),
          align: 'center',
          field: 'dateAnnulerManager',
          key: 'dateAnnulerManager',
          style: 'min-width: 150px',
          sortable: false
        }, {
          name: 'commentaireRefusManager',
          required: true,
          label: this.$t('demande.conge.motif'),
          align: 'center',
          field: 'commentaireRefusManager',
          key: 'commentaireRefusManager',
          style: 'min-width: 150px',
          sortable: false
        }, {
          name: 'dateDePayement',
          required: true,
          label: this.$t('demande.conge.payDate'),
          align: 'center',
          field: 'dateDePayement',
          key: 'dateDePayement',
          style: 'min-width: 150px',
          sortable: false
        }, {
          name: 'duree',
          required: true,
          label: this.$t('demande.conge.duree'),
          align: 'center',
          field: 'duree',
          key: 'duree',
          style: 'min-width: 80px',
          sortable: false
        }
      ]
    },
    columns () {
      return [
        {
          name: 'etat',
          required: true,
          label: this.$t('demande.conge.stateConge'),
          align: 'center',
          field: 'etat',
          key: 'etat',
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
          name: 'entite',
          required: true,
          label: this.$t('demande.conge.entity'),
          align: 'center',
          field: 'entite',
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
          name: 'dateDeValidationManager',
          required: true,
          label: this.$t('demande.conge.validationDate'),
          align: 'center',
          field: 'dateDeValidationManager',
          key: 'dateDeValidationManager',
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
        }
      ]
    }
  },
  watch: {
  },
  computed: {
  },
  components: {
    'filters': Filters,
    'pop-up': popup
  },
  beforeDestroy () {
    bus.$off('getCongesSuccess')
    bus.$off('getCongeHistorySuccess')
    bus.$off('getCongeHistoryFailed')
    bus.$off('getCongesFailed')
    bus.$off('historycongeRefresh')
  }
})
</script>
