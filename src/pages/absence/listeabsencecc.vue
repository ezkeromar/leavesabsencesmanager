<template>
  <div class="row flex justify-center congeListe">
    <div class="congeListContainer">
      <q-btn @click="showDialogTow = true" color="primary" class="block payPeriodeBtn traitementperiodebtn" icon="alarm" :label="$t('demande.absence.traitementPeriodeBtn')" />
      <p class="payPeriodeLabel">{{payPeriodeLabel}}</p>
      <q-btn @click="exportExcel" color="primary" class="block exportBtn" icon='fa fa-file-download' :label="$t('demande.conge.excelExport')" />
      <q-card class="col-md-10 congeCard" style='margin-top: 0px;'>
        <q-card-main class="congerCardContainer">
          <q-table
            v-if="showTable"
            :title="$t('demande.absence.absenceTraitement')"
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
              {{$t(props.row.status.label)}}
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
              <i v-if='props.row.etat.name === "TRAITEE"' class="fa fa-user-edit TableIcon tableIconCancel"></i>
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
        <div class="payPeriodeFieldsTitle traitementPeriodeFieldsTitle">
          <p>{{$t('demande.absence.traitementperiode')}}</p>
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
import * as services from '../../services/absence-services.js'
import { Notify, Dialog } from 'quasar'
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
    that.$store.commit('Dashboard/setActiveMenu', '2003')

    that.activeColumns = that.columns()

    bus.$on('etatAbsenceCcTableMenu', function (res) {
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
        message: that.$t(res.message),
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
      services.exportPaiePeriodeDemandes({ periodPaiment: this.payPeriode })
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
        services.getAbsences({ menuId: this.$store.state.Dashboard.activeMenu, period: this.payPeriode, code: this.$store.state.conge.etatAbsenceCcTableMenu, maxRows: pagination.rowsPerPage, column: pagination.sortBy, search: this.filter, dateStart: this.dateStart, dateEnd: this.dateEnd, descending: pagination.descending, page: parseInt(pagination.page - 1) })
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
      console.log(code)
      switch (code) {
        case 'demnadeConge':
          services.sendActions({ code: code + 'cc', rows: reference, comment: '' })
          break
        case 'demandeNR':
          services.sendActions({ code: code + 'cc', rows: reference, comment: '' })
          break
        case 'validateabsren':
          services.sendActions({ code: code + 'cc', rows: reference, comment: '' })
          break
        case 'traitedabsren':
          services.sendActions({ code: code + 'cc', rows: reference, comment: '' })
          break
        case 'deleteAbsence':
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
            services.sendActions({ code: code + 'cc', rows: reference, comment: '' })
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
    },
    changeTableColumns (value) {
      let menu = []
      switch (value) {
        case '33':
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
        case '34':
          this.selectionType = 'multiple'
          menu = [{
            name: 'dateDeValidation',
            required: true,
            label: this.$t('demande.absence.validationdate'),
            align: 'center',
            field: 'dateDeValidation',
            style: 'min-width: 100px',
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
        case '35':
          this.selectionType = 'none'
          menu = [{
            name: 'dateDeTraitement',
            required: true,
            label: this.$t('demande.absence.traitementdate'),
            align: 'center',
            field: 'dateDeTraitement',
            style: 'min-width: 100px',
            sortable: true
          }]
          break
      }
      return menu
    },
    columns () {
      return [
        {
          name: 'etat',
          required: true,
          label: this.$t('demande.absence.etat'),
          align: 'center',
          field: 'duree',
          style: 'min-width: 100px',
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
          name: 'status',
          required: true,
          label: this.$t('demande.conge.state'),
          align: 'center',
          field: 'status',
          key: 'status',
          style: 'min-width: 80px',
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
    'filters': Filters,
    'pop-up': popup
  },
  beforeDestroy () {
    bus.$off('getAbsenceSuccess')
    bus.$off('getAbsenceFailed')
    bus.$off('etatAbsenceCcTableMenu')
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
