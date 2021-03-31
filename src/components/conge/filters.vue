<template>
  <div class="row filterContainer">
    <div class="col-md-3 col-sm-6 col-xs-12" v-if="model !== 'model1' && model !== 'model2' && model !== 'model4'">
      <q-datetime format="DD/MM/YYYY" :minimal="true" :value='dateStart' @change='val => { dateStartChanged(val) }' :placeholder="this.$t('demande.conge.dateStart')" type="date" />
    </div>
    <div class="col-md-3 col-sm-6 col-xs-12" v-if="model !== 'model1' && model !== 'model2'&& model !== 'model4'">
      <q-datetime format="DD/MM/YYYY" :minimal="true" :value='dateEnd' @change='val => { dateEndChanged(val) }' :placeholder="this.$t('demande.conge.dateEnd')" type="date" />
    </div>
    <div class="col-md-1" v-if="model !== 'model1' && model !== 'model2' && model !== 'model4'">
      <div class="clearFilterContainer" v-if='dateEnd !== null || dateStart !== null'>
        <i class="far fa-window-close clearfilter" @click="clearFilter"></i>
        <q-tooltip>{{$t('demande.conge.deleteFilter')}}</q-tooltip>
      </div>
    </div>
    <div class="col-sm-8" v-if="model === 'model1'"></div>
    <div class="col-sm-6" v-if="model === 'model2'"></div>
    <div v-if="model !== 'model4'" class="col-xs-12 filteDataTableSelect" :class="{'col-md-4 col-sm-4 modelOneFilterField': model === 'model1' || model === 'model2', 'col-md-3 col-sm-6': model !== 'model1'}">
      <div class="relativePlacing">
        <img :src="activeAvatar" class="selectAvatar" v-show="selectOptions.length !== 1"/>
        <div class="tableFilterSelectField">
          <q-select
            v-show="selectOptions.length !== 1"
            v-if="selectOptions.length > 0 && select != ''"
            :value="select"
            @change="val => { select = val; changePicture(val) }"
            :options="selectOptions"
            :no-icon="true"
            class="selectCongeState"
            :before="[
              {
                icon: 'dddd'
              }
            ]"
            />
        </div>
      </div>
    </div>
    <div v-if='model === "model4"' class="col-md-10"></div>
    <div class="col-md-2 col-sm-6 col-xs-12 flex justify-end searchContainer" v-if="model !== 'model1' || model === 'model2' || model === 'model4'">
      <i class="fas fa-search searchIcon" @click='findSearch'></i>
      <q-search
        class="searchFilter"
        :debounce="600"
        v-model="term"
        :before="[{ icon: 'dddd' }]"
        :placeholder="this.$t('demande.conge.search')"
        v-on:keyup.enter="findSearch"
        />
        <q-tooltip>{{$t('demande.conge.searchwithNameMatFLName')}}</q-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { bus } from '../../plugins/event-bus.js'
import moment from '../../plugins/momentjs.js'
import * as services from '../../services/conge-services.js'

export default Vue.extend({
  name: 'filtersDataTable',
  props: ['properties', 'model'],
  data () {
    return {
      selectOptions: [],
      select: '',
      activeAvatar: '',
      term: '',
      params: '',
      dateStart: null,
      dateEnd: null,
      codeMenu: null
    }
  },
  mounted () {
    let that = this
    // that.switchTableMenu()

    bus.$on('getMenuTable', function (codeMenu = null) {
      that.switchTableMenu(codeMenu)
    })

    bus.$on('getMenuTableSuccess', function (res) {
      that.selectOptions = res
      let selectedItem = that.selectOptions[0]
      if (that.codeMenu != null) {
        for (let i = 0; i < that.selectOptions.length; i++) {
          if (that.selectOptions[i].value === that.codeMenu) {
            selectedItem = that.selectOptions[i]
          }
        }
      }
      that.select = selectedItem.value
      that.params = { codeMenu: selectedItem.value, terms: '', dateStart: null, dateEnd: null }
      that.activeAvatar = selectedItem.avatar
      that.commitRightStore()
      that.selectOptions.map(function (x) {
        x.label = that.$t(x.labelTow)
        return x
      })
    })

    bus.$on('getMenuTableFailed', function (res) {
      that.selectedConges = []
      that.loading = false
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', true)
        }
      }
    })
  },
  methods: {
    clearFilter () {
      this.dateStart = null
      this.dateEnd = null
      this.params.dateStart = null
      this.params.dateEnd = null
      this.commitRightStore()
    },
    dateStartChanged (val) {
      this.dateStart = val
      this.params.dateStart = moment(val).format('DD/MM/YYYY')
      if (this.dateEnd) {
        this.params.dateEnd = moment(this.dateEnd).format('DD/MM/YYYY')
      }
      this.commitRightStore()
    },
    dateEndChanged (val) {
      this.dateEnd = val
      this.params.dateEnd = moment(val).format('DD/MM/YYYY')
      if (this.dateStart) {
        this.params.dateStart = moment(this.dateStart).format('DD/MM/YYYY')
      }
      this.commitRightStore()
    },
    findSearch () {
      this.params.terms = this.term
      this.commitRightStore()
    },
    changePicture (val) {
      for (let i = 0; i < this.selectOptions.length; i++) {
        if (this.selectOptions[i].value === val) {
          this.select = this.selectOptions[i].value
          this.activeAvatar = this.selectOptions[i].avatar
          this.params = { codeMenu: this.selectOptions[i].value, terms: '', dateStart: this.dateStart, dateEnd: this.dateEnd }
          this.commitRightStore()
        }
      }
    },
    commitRightStore () {
      if (this.dateStart) {
        this.params.dateStart = moment(this.dateStart).format('DD/MM/YYYY')
      }
      if (this.dateEnd) {
        this.params.dateEnd = moment(this.dateEnd).format('DD/MM/YYYY')
      }
      switch (this.$store.state.Dashboard.activeMenu) {
        case '1001':
          this.$store.commit('conge/setEtatCongeTableMenu', this.params.codeMenu)
          bus.$emit('etatcongeRefresh', this.params)
          break
        case '1003':
          this.$store.commit('conge/setEtatCongeTeamTableMenu', this.params.codeMenu)
          bus.$emit('teamcongeRefresh', this.params)
          break
        case '1005':
          this.$store.commit('conge/setPayCongeTableMenu', this.params.codeMenu)
          bus.$emit('paycongeRefresh', this.params)
          break
        case '1006':
          this.$store.commit('conge/setHistoryCongeTableMenu', this.params.codeMenu)
          bus.$emit('historycongeRefresh', this.params)
          break
        case '1010':
          bus.$emit('blockUnblockUserRefresh', this.params)
          break
        case '10011':
          this.$store.commit('conge/setExpiredDemandeTableMenu', this.params.codeMenu)
          bus.$emit('expiredDemandeRefresh', this.params)
          break
        case '2001':
          this.$store.commit('conge/setEtatAbsenceTableMenu', this.params.codeMenu)
          bus.$emit('etatabsenceRefresh', this.params)
          break
        case '2002':
          this.$store.commit('conge/setEtatAbsenceTeamTableMenu', this.params.codeMenu)
          bus.$emit('etatabsenceteamRefresh', this.params)
          break
        case '2003':
          this.$store.commit('conge/setEtatAbsenceCcTableMenu', this.params.codeMenu)
          bus.$emit('etatAbsenceCcTableMenu', this.params)
          break
      }
    },
    switchTableMenu (codeMenu = null) {
      this.codeMenu = codeMenu
      services.getMenuTable({ menuTable: this.$store.state.Dashboard.activeMenu })
    },
    myFilter (rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : ''
      return rows.filter(
        row => cols.some(col => (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1)
      )
    }
  },
  beforeDestroy () {
    bus.$off('getMenuTable')
    bus.$off('getMenuTableSuccess')
    bus.$off('getMenuTableFailed')
  }
})
</script>

<style>
  .q-popover .q-item {
    padding-top: 0px;
    padding-bottom: 0px;
    min-height: 35px;
  }

  .q-popover .q-item-main {
    font-family: 'WorkSans-Regular';
    font-size: 14px;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.19;
    letter-spacing: normal;
    text-align: left;
    color: #242424;
    font-weight: 700;
  }

  .q-popover .q-item-avatar {
    width: 20px !important;
    height: auto !important;
    border-radius: 0px !important;
  }

  .selectAvatar {
    width: 20px !important;
    height: auto !important;
    border-radius: 0px !important;
    float: left;
    margin-top: 4px;
    margin-left: 3px;
  }

  .selectCongeState {
    width: 100%;
    height: 31px;
  }

  .selectCongeState .q-input-target {
    font-family: 'WorkSans-Regular';
    font-size: 14px;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.19;
    letter-spacing: normal;
    text-align: center;
    color: #242424;
    font-weight: 700;
  }

  .tableFilterSelectField {
    position: absolute;
    width: 100%;
  }
</style>
