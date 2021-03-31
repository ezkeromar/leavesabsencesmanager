<template>
  <div class="row congeListe">
    <div class="congeListContainer">
      <q-card class="col-md-10 congeCard">
        <q-card-main class="congerCardContainer">
          <q-table
            v-if="showTable"
            :title='$t("demande.conge.myCongeDemande")'
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
              <i v-if='$store.state.conge.etatCongeTableMenu === "01"' class="fa fa-user-clock TableIcon tableIconWait"></i>
              <i v-if='$store.state.conge.etatCongeTableMenu === "02"' class="fa fa-user-check TableIcon tableIconValide"></i>
              <i v-if='$store.state.conge.etatCongeTableMenu === "03"' class="fa fa-user-times TableIcon tableIconRefuse"></i>
              <i v-if='$store.state.conge.etatCongeTableMenu === "04"' class="fa fa-user-slash TableIcon tableIconCancel"></i>
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
            <template slot="top-right" slot-scope="props">
              <filters :properties="props" model="model1"></filters>
            </template>
            <!-- <div slot="bottom-row" class="tableFooterBtn" slot-scope="props">
              <q-btn class="buttonTable" icon="fa fa-gavel" @click="regulize(props)" />
              <span>Regulariser la selection</span>
            </div> -->
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

export default Vue.extend({
  name: 'createConge',
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
      showTable: true,
      rowPerPage: [5, 10, 15, 20, 25, 30]
    }
  },
  mounted () {
    let that = this
    that.$store.commit('Dashboard/setActiveMenu', '1001')

    that.activeColumns = that.columns()

    bus.$on('etatcongeRefresh', function (res) {
      let TempColumns = that.columns()
      that.showTable = false
      let partMenu = that.changeTableColumns(res.codeMenu)
      for (let i = 0; i < partMenu.length; i++) {
        TempColumns.push(partMenu[i])
      }
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
    })

    bus.$on('getCongesFailed', function (res) {
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
    changeTableColumns (value) {
      let menu = []
      switch (value) {
        case '02':
          menu = [{
            name: 'dateDeValidationManager',
            required: true,
            label: this.$t('demande.conge.validationDate'),
            align: 'center',
            field: 'dateDeValidationManager',
            key: 'dateDeValidationManager',
            sortable: true
          }]
          break
        case '01':
          menu = []
          break
        case '03':
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
        case '04':
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
    requestConges ({ pagination, filter }) {
      this.serverPagination.page = pagination.page
      this.serverPagination.sortBy = pagination.sortBy
      this.serverPagination.descending = pagination.descending
      this.serverPagination.rowsPerPage = pagination.rowsPerPage
      this.loading = true
      services.getConges({ code: this.$store.state.conge.etatCongeTableMenu, maxRows: pagination.rowsPerPage, column: pagination.sortBy, search: filter, dateStart: '', dateEnd: '', descending: pagination.descending, page: parseInt(pagination.page - 1) })
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
          style: 'min-width: 100px',
          sortable: true
        }, {
          name: 'dateDeFin',
          required: true,
          label: this.$t('demande.conge.dateEnd'),
          align: 'center',
          field: 'dateDeFin',
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
    bus.$off('etatcongeRefresh')
  }
})
</script>
