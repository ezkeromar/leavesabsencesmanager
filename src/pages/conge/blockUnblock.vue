<template>
  <div class="row flex justify-center congeListe">
    <div class="congeListContainer">
      <q-card class="col-md-10 congeCard">
        <q-card-main class="congerCardContainer">
          <q-table
            v-if="showTable"
            :title="this.$t('demande.conge.LockUnlock')"
            selection="multiple"
            :selected.sync="selectedConges"
            :data="tableData"
            :columns="activeColumns"
            row-key="id"
            :pagination.sync="serverPagination"
            :rows-per-page-options="rowPerPage"
            :loading="loading"
            class="filterWidth"
            @request="requestConges"
          >
            <q-td slot="body-cell-isBlocked" slot-scope="props" :props="props">
              {{(props.row.isBlocked !== 'true') ? $t('demande.conge.allow') : $t('demande.conge.block')}}
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
                <q-btn size="xs" :class="action.class" :icon="'fa '+action.icon" @click="sendAction(action.code, props.row.id)"/>
                <q-tooltip>{{$t(action.name)}}</q-tooltip>
              </div>
            </q-td>
            <template slot="top-right" slot-scope="props">
              <filters :properties="props" model="model4"></filters>
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
  name: 'blockUnblock',
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
    that.$store.commit('Dashboard/setActiveMenu', '1010')

    that.activeColumns = that.columns()

    bus.$on('blockUnblockUserRefresh', function (res) {
      that.selectedConges = []
      let TempColumns = that.columns()
      that.showTable = false
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
      Notify.create({
        icon: 'fa fa-check',
        message: that.$t(res.text),
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
        } else {
          Notify.create({
            icon: 'fa fa-check',
            message: that.$t(res.data.text),
            color: 'white'
          })
        }
      }
    })

    bus.$on('getUserstoBlockUnblockSuccess', function (res) {
      that.loading = false
      that.tableData = res.tableData.data
      that.serverPagination.rowsNumber = res.tableData.pagination.totalCount
      that.actionBtn = res.tableData.action
    })

    bus.$on('getUserstoBlockUnblockFailed', function (res) {
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
      this.serverPagination.descending = pagination.descending
      this.serverPagination.rowsPerPage = pagination.rowsPerPage
      this.loading = true
      services.getUserstoBlockUnblock({ maxRows: pagination.rowsPerPage, column: pagination.sortBy, search: this.filter, descending: pagination.descending, page: parseInt(pagination.page - 1) })
    },
    sendAction (code, id) {
      switch (code) {
        case 'blockCollab':
          Dialog.create({
            title: this.$t('demande.conge.blockageCause'),
            message: this.$t('demande.conge.blockageDescription') + ' *',
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
              services.sendActions({ code: code, rows: id, comment: data })
            } else {
              Notify.create({
                type: 'negative',
                icon: 'fa fa-times',
                message: this.$t('demande.conge.BlockageDescRequired'),
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
        case 'UnblockCollab':
          services.sendActions({ code: code, rows: id, comment: '' })
          break
      }
    },
    sendMultiAction (code) {
      let ids = []
      let block = false
      for (let i = 0; i < this.selectedConges.length; i++) {
        if (this.selectedConges[i].isBlocked !== 'false') {
          ids.push(this.selectedConges[i].id)
        } else {
          block = true
        }
      }
      if (block === false) {
        this.sendAction(code, ids)
      } else {
        Notify.create({
          type: 'negative',
          icon: 'fa fa-times',
          message: this.$t('demande.conge.selectOnlyTackDeblock'),
          color: 'white'
        })
      }
    },
    columns () {
      return [
        {
          name: 'id',
          required: true,
          label: this.$t('demande.conge.id'),
          align: 'center',
          field: 'id',
          key: 'id',
          style: 'display: none',
          sortable: false
        }, {
          name: 'matricule',
          required: true,
          label: this.$t('demande.conge.matr'),
          align: 'center',
          field: 'matricule',
          style: 'min-width: 100px',
          sortable: true
        }, {
          name: 'entite',
          required: true,
          label: this.$t('demande.conge.entite'),
          align: 'center',
          field: 'entite',
          style: 'min-width: 100px',
          sortable: false
        }, {
          name: 'collaborateur',
          required: true,
          label: this.$t('demande.conge.collab'),
          align: 'center',
          field: 'collaborateur',
          style: 'min-width: 100px',
          sortable: false
        }, {
          name: 'manager',
          required: true,
          label: this.$t('demande.conge.manager'),
          align: 'center',
          field: 'manager',
          style: 'min-width: 100px',
          sortable: true
        }, {
          name: 'isBlocked',
          required: true,
          label: this.$t('demande.conge.congeDemandeDroit'),
          align: 'center',
          field: 'isBlocked',
          style: 'min-width: 150px',
          sortable: true
        }, {
          name: 'action',
          required: true,
          label: this.$t('demande.conge.actions'),
          align: 'center',
          field: 'action',
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
    'filters': Filters
  },
  beforeDestroy () {
    bus.$off('getUserstoBlockUnblockSuccess')
    bus.$off('getUserstoBlockUnblockFailed')
    bus.$off('blockUnblockUserRefresh')
    bus.$off('sendActionsFailed')
    bus.$off('sendActionsSuccess')
  }
})
</script>
