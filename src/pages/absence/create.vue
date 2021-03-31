<template>
  <div class="row congeCreate">
    <div class="col-md-10 congeCreateContainer">
      <q-tabs class="headertabs">
        <!-- Tabs - notice slot="title" -->
        <q-route-tab class="tablink tablinkone" v-if="$route.params.isadmin == 'rh'" default :label="$t('demande.absence.absence') + 'ezker' + $t('demande.absence.AbsencenotPaidtit')" exact slot="title" to="/admin/absence/create/absence-not-paid/rh" name="tab-1" />
        <q-route-tab class="tablink tablinkone" v-else default :label="$t('demande.absence.absence') + 'ezker' + $t('demande.absence.AbsencenotPaidtit')" exact slot="title" to="absence-not-paid" name="tab-1" />

        <q-route-tab class="tablink tablinktow" v-if="$route.params.isadmin == 'rh'" default :label="$t('demande.absence.absence') + 'ezker' + $t('demande.absence.legalFamilyAbsencetit')" exact slot="title" to="/admin/absence/create/legal-family-absence/rh" name="tab-1" />
        <q-route-tab class="tablink tablinktow" v-else default :label="$t('demande.absence.absence') + 'ezker' + $t('demande.absence.legalFamilyAbsencetit')" exact slot="title" to="legal-family-absence" name="tab-1" />

        <q-route-tab class="tablink tablinkthree" v-if="$route.params.isadmin == 'rh'" default :label="$t('demande.absence.absence') + 'ezker' + $t('demande.absence.absencesicknesstit')" exact slot="title" to="/admin/absence/create/sickness/rh" name="tab-1" />
        <q-route-tab class="tablink tablinkthree" v-else default :label="$t('demande.absence.absence') + 'ezker' + $t('demande.absence.absencesicknesstit')" exact slot="title" to="sickness" name="tab-1" />

        <q-route-tab class="tablink tablinkfour" v-if="$route.params.isadmin == 'rh'" default :label="$t('demande.absence.accident') + 'ezker' + $t('demande.absence.workaccidenttit')" exact slot="title" to="/admin/absence/create/work-accident/rh" name="tab-1" />
        <q-route-tab class="tablink tablinkfour" v-else default :label="$t('demande.absence.accident') + 'ezker' + $t('demande.absence.workaccidenttit')" exact slot="title" to="work-accident" name="tab-1" />

        <q-route-tab class="tablink tablinkfive" v-if="$route.params.isadmin == 'rh'" default :label="$t('demande.absence.conge') + 'ezker' + $t('demande.absence.maternityleavetit')" exact slot="title" to="/admin/absence/create/maternity/rh" name="tab-1" />
        <q-route-tab :class="{disabledlink: $store.state.Auth.user.gender === 'M'}" class="tablink tablinkfive" v-else default :label="$t('demande.absence.conge') + 'ezker' + $t('demande.absence.maternityleavetit')" exact slot="title" to="maternity" name="tab-1" />

        <!-- Targets -->
        <q-tab-pane class="absencecontainer" name="tab-1">
          <router-view />
        </q-tab-pane>
      </q-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import JQ from '../../plugins/jquery.js'
// import { bus } from '../../plugins/event-bus.js'
// import moment from '../../plugins/momentjs.js'
// import * as services from '../../services/conge-services.js'
// import { Notify, Dialog } from 'quasar'

export default Vue.extend({
  name: 'absenceCreation',
  data () {
    return {
      tab: 'mails'
    }
  },
  mounted () {
    let that = this
    if (that.$route.params.isadmin === 'rh') {
      that.$store.commit('Dashboard/setActiveMenu', '2004')
    } else {
      that.$store.commit('Dashboard/setActiveMenu', '2000')
    }
    JQ('.tablinkone>div>div').html(JQ('.tablinkone>div>div').text().replace('ezker', '<br/>'))
    JQ('.tablinkone').css('width', JQ('.headertabs').width() * 0.20)
    JQ('.tablinktow>div>div').html(JQ('.tablinktow>div>div').text().replace('ezker', '<br/>'))
    JQ('.tablinktow').css('width', JQ('.headertabs').width() * 0.20)
    JQ('.tablinkthree>div>div').html(JQ('.tablinkthree>div>div').text().replace('ezker', '<br/>'))
    JQ('.tablinkthree').css('width', JQ('.headertabs').width() * 0.20)
    JQ('.tablinkfour>div>div').html(JQ('.tablinkfour>div>div').text().replace('ezker', '<br/>'))
    JQ('.tablinkfour').css('width', JQ('.headertabs').width() * 0.20)
    JQ('.tablinkfive>div>div').html(JQ('.tablinkfive>div>div').text().replace('ezker', '<br/>'))
    JQ('.tablinkfive').css('width', JQ('.headertabs').width() * 0.20)
  }
})
</script>
