<template>
  <div class="row flex justify-center congeListe">
    <div class="congeListContainer">
      <q-btn @click="showDialogTow = true" color="primary" class="block payPeriodeBtn" icon="alarm" :label="$t('demande.conge.payPeriodeBtn')" />
      <p class="payPeriodeLabel">{{payPeriodeLabel}}</p>
      <q-btn @click="exportExcel" color="primary" class="block exportBtn" icon='fa fa-file-download' :label="$t('demande.conge.excelExport')" />
      <q-card class="col-md-10 congeCard" style='margin-top: 0px;'>
        <q-card-main class="congerCardContainer">
          <q-table
            v-if="showTable"
            :title="$t('demande.conge.congeTraitement')"
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
              <i v-if='$store.state.conge.payCongeTableMenu === "09"' class="fa fa-square TableIcon tableIconNotPaid"></i>
              <i v-if='$store.state.conge.payCongeTableMenu === "11"' class="fa fa-square TableIcon tableIconPaid"></i>
              <i v-if='$store.state.conge.payCongeTableMenu === "12"' class="fa fa-square TableIcon tableIcontoRegulize"></i>
              <i v-if='$store.state.conge.payCongeTableMenu === "13"' class="fa fa-square TableIcon tableIconRegulized"></i>
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
                <q-btn size="xs" v-if="action.code !== 'congeTreated' && action.code !== 'aRegulariserConge'" :class="action.class" :icon="'fa '+action.icon" @click="sendAction(action.code, props.row.reference)"/>
                <q-btn size="xs" v-if="action.code === 'aRegulariserConge'" :class="action.class" :icon="'fa '+action.icon" @click="sendAction(action.code, props.row.reference, props.row.duree)"/>
                <!-- <i v-if="action.code !== 'congeTreated' && action.code !== 'aRegulariserConge'" :class="'fa '+action.icon+' '+action.class"></i> -->
                <q-tooltip>{{$t(action.name)}}</q-tooltip>
              </div>
            </q-td>
            <q-td slot="body-cell-etat" slot-scope="props" :props="props">
              <i v-if='props.row.etat.name === "VALIDEE"' class="fa fa-user-check TableIcon tableIconValide"></i>
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
    <pop-up :show='showDialog' height='31%' width='50%' maxWidth="700px" minHeight="300px">
      <div slot='popContent' class="dialogContainer">
        <div class="payPOPFieldCont">
          <label>{{$t('demande.conge.regulizeSolde')}}</label>
          <div>
            <input class='numberInput' type="number" v-model="daystoRegule" :min="minDaystoRegule" :max="maxDaystoRegule" step='0.5'/>
          </div>
        </div>
        <div class="payPOPFieldCont">
          <label>{{$t('demande.conge.regulizeDescPop')}} <span>*</span> :</label>
          <textarea v-model="commenttoRegulize" class="popUpTextArea"></textarea>
        </div>
      </div>
      <div slot='popBtns' class="footerAction">
        <q-btn @click="ValidtoRegulize" color="primary" :label="this.$t('demande.conge.validate')" />
        <q-btn @click="closePopUp" flat color="primary" class="CloseBtnPopUp" :label="this.$t('demande.conge.close')" />
      </div>
      <i slot='popCloseBtn' @click="closePopUp" class="closeIcon fa fa-times"></i>
    </pop-up>

    <pop-up :show='showDialogTow' height='25%' width='50%' maxWidth="700px">
      <div slot='popContent' class="payPeriodeFieldsCont">
        <div class="payPeriodeFieldsTitle">
          <p>{{$t('demande.conge.PayPeriode')}}</p>
        </div>
        <div class="payPeriodeSelectCont">
          <q-select class='selectPeriode' filled v-model="payPeriodeTemp" :options="options" label="Filled" />
        </div>
      </div>
      <div slot='popBtns' class="footerActionPay">
        <q-btn class="payPeriode" @click="ValidPayPeriode" color="primary" :label="this.$t('demande.conge.validate')" />
      </div>
    </pop-up>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Filters from '../../components/conge/filters.vue'
import popup from '../../components/popup.vue'
import { bus } from '../../plugins/event-bus.js'
import * as services from '../../services/conge-services.js'
import { Notify } from 'quasar'
import moment from '../../plugins/momentjs.js'

export default Vue.extend({
  name: 'payConge',
  data () {
    return {
      options: [
        {
          label: this.$t('demande.conge.janvier') + ' ' + moment().format('YYYY'),
          value: moment().month(0).endOf('month').format('DD/MM/YYYY')
        }, {
          label: this.$t('demande.conge.fevrier') + ' ' + moment().format('YYYY'),
          value: moment().month(1).endOf('month').format('DD/MM/YYYY')
        }, {
          label: this.$t('demande.conge.mars') + ' ' + moment().format('YYYY'),
          value: moment().month(2).endOf('month').format('DD/MM/YYYY')
        }, {
          label: this.$t('demande.conge.avril') + ' ' + moment().format('YYYY'),
          value: moment().month(3).endOf('month').format('DD/MM/YYYY')
        }, {
          label: this.$t('demande.conge.mai') + ' ' + moment().format('YYYY'),
          value: moment().month(4).endOf('month').format('DD/MM/YYYY')
        }, {
          label: this.$t('demande.conge.juin') + ' ' + moment().format('YYYY'),
          value: moment().month(5).endOf('month').format('DD/MM/YYYY')
        }, {
          label: this.$t('demande.conge.juillet') + ' ' + moment().format('YYYY'),
          value: moment().month(6).endOf('month').format('DD/MM/YYYY')
        }, {
          label: this.$t('demande.conge.aout') + ' ' + moment().format('YYYY'),
          value: moment().month(7).endOf('month').format('DD/MM/YYYY')
        }, {
          label: this.$t('demande.conge.septembre') + ' ' + moment().format('YYYY'),
          value: moment().month(8).endOf('month').format('DD/MM/YYYY')
        }, {
          label: this.$t('demande.conge.octobre') + ' ' + moment().format('YYYY'),
          value: moment().month(9).endOf('month').format('DD/MM/YYYY')
        }, {
          label: this.$t('demande.conge.novembre') + ' ' + moment().format('YYYY'),
          value: moment().month(10).endOf('month').format('DD/MM/YYYY')
        }, {
          label: this.$t('demande.conge.decembre') + ' ' + moment().format('YYYY'),
          value: moment().month(11).endOf('month').format('DD/MM/YYYY')
        }
      ],
      payPeriode: moment().endOf('month').format('DD/MM/YYYY'),
      payPeriodeTemp: moment().endOf('month').format('DD/MM/YYYY'),
      payPeriodeLabel: moment(this.payPeriode).format('MMMM YYYY'),
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
      rowPerPage: [5, 10, 15, 20, 25, 50, 100],
      comment: null,
      actionBtn: [],
      selectionType: 'none',
      showDialog: false,
      showDialogTow: false,
      daystoRegule: 0.5,
      maxDaystoRegule: null,
      minDaystoRegule: 0.5,
      commenttoRegulize: '',
      tempReference: '',
      dateStart: null,
      dateEnd: null
    }
  },
  mounted () {
    this.showPayPeriodes()
    let that = this
    that.$store.commit('Dashboard/setActiveMenu', '1005')

    that.activeColumns = that.columns()

    bus.$on('paycongeRefresh', function (res) {
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
      that.selectedConges = []
      that.loading = false
      that.closePopUp()
      Notify.create({
        icon: 'fa fa-check',
        message: that.$t(res.title),
        color: 'white'
      })
      that.requestConges({
        pagination: that.serverPagination
      })
      that.selectedConges = []
    })

    bus.$on('sendActionsFailed', function (res) {
      that.selectedConges = []
      that.closePopUp()
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
  },
  methods: {
    exportExcel () {
      this.loading = true
      services.exportPaiePeriodeDemandes({ periodPaiment: this.payPeriode, state: this.$store.state.conge.payCongeTableMenu })
    },
    regulize (props) {},
    ValidPayPeriode () {
      this.payPeriode = this.payPeriodeTemp
      this.payPeriodeLabel = moment(this.payPeriode, 'DD/MM/YYYY').format('MMMM YYYY')
      this.showDialogTow = false
      bus.$emit('getMenuTable')
    },
    showPayPeriodes () {
      this.payPeriodeTemp = this.payPeriode
      this.showDialogTow = true
    },
    closePopUp () {
      this.showDialog = false
      this.daystoRegule = 0.5
      this.maxDaystoRegule = null
      this.minDaystoRegule = 0.5
      this.commenttoRegulize = ''
      this.tempReference = ''
    },
    closePopUpTow () {
      this.showDialogTow = false
    },
    ValidtoRegulize () {
      if (this.commenttoRegulize !== null && this.commenttoRegulize !== '' && this.commenttoRegulize !== ' ') {
        if (this.daystoRegule >= this.minDaystoRegule && this.daystoRegule <= this.maxDaystoRegule && Number.isInteger(this.daystoRegule / 0.5)) {
          services.sendActions({ code: 'aRegulariserConge', rows: this.tempReference, comment: this.commenttoRegulize, soldtoRegulize: this.daystoRegule })
        } else {
          Notify.create({
            type: 'negative',
            icon: 'fa fa-times',
            message: this.$t('demande.conge.soldeIncorrecte'),
            color: 'white'
          })
        }
      } else {
        Notify.create({
          type: 'negative',
          icon: 'fa fa-times',
          message: this.$t('demande.conge.validationRegulizePop'),
          color: 'white'
        })
      }
    },
    requestConges ({ pagination }) {
      let payPeriode = moment(this.payPeriode, 'DD/MM/YYYY')
      let EndDateF = moment(this.dateEnd, 'DD/MM/YYYY')
      if (payPeriode.diff(EndDateF, 'days') >= 0 || this.dateEnd === null) {
        this.serverPagination.page = pagination.page
        this.serverPagination.sortBy = pagination.sortBy
        this.serverPagination.descending = pagination.descending
        this.serverPagination.rowsPerPage = pagination.rowsPerPage
        this.loading = true
        services.getCongestoPayandHistory({ datePaiment: this.payPeriode, code: this.$store.state.conge.payCongeTableMenu, maxRows: pagination.rowsPerPage, column: pagination.sortBy, search: this.filter, dateStart: this.dateStart, dateEnd: this.dateEnd, descending: pagination.descending, page: parseInt(pagination.page - 1) })
      } else {
        Notify.create({
          type: 'negative',
          icon: 'fa fa-times',
          message: this.$t('demande.conge.periodePayValidation'),
          color: 'white'
        })
      }
    },
    sendAction (code, reference, soldetoRegulize = null) {
      switch (code) {
        case 'aRegulariserConge':
          this.showDialog = true
          this.maxDaystoRegule = soldetoRegulize
          this.daystoRegule = soldetoRegulize
          this.tempReference = reference
          break
        case 'payConge':
          services.sendActions({ code: code, rows: reference, comment: '', datePaiment: this.payPeriode })
          break
        case 'regulariserConge':
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
        case '09':
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
        case '11':
          this.selectionType = 'none'
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
        case '12':
          this.selectionType = 'multiple'
          menu = [{
            name: 'commentaireRegulariserDemande',
            required: true,
            label: this.$t('demande.conge.regulizeMotif'),
            align: 'center',
            field: 'commentaireRegulariserDemande',
            style: 'min-width: 150px',
            sortable: false
          }, {
            name: 'soldeARegulariser',
            required: true,
            label: this.$t('demande.conge.soldeRegulize'),
            align: 'center',
            field: 'soldeARegulariser',
            style: 'min-width: 100px',
            sortable: false
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
        case '13':
          this.selectionType = 'none'
          menu = []
          break
      }
      return menu
    },
    columns () {
      return [
        {
          name: 'status',
          required: true,
          label: this.$t('demande.conge.paiementCol'),
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
    bus.$off('getCongesFailed')
    bus.$off('paycongeRefresh')
    bus.$off('sendActionsFailed')
    bus.$off('sendActionsSuccess')
    bus.$off('exportPaiePeriodeDemandesSuccess')
    bus.$off('exportPaiePeriodeDemandesFailed')
  }
})
</script>

<style>
  .q-popover {
    max-height: 300px !important;
  }
</style>
