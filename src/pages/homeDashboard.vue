<template>
  <q-page class="flex flex-center">
    <q-carousel class="slider" :autoplay="5000" :quick-nav="true" height="100vh" quick-nav-icon="fas fa-square">
      <q-carousel-slide class="flex flex-start items-center slide-text" img-src="statics/espritdequipe.jpg">
        <div class="">
          <div class="q-display-3">
            L’esprit d’équipe
            <div class="q-display-4">Chez nous, cela veut dire «<b>ensemble on fait mieux</b>».</div>
          </div>
          <!-- <q-btn label="Lire plus" class="slideBtn"/> -->
        </div>
      </q-carousel-slide>
      <q-carousel-slide class="flex flex-start items-center slide-text" img-src="statics/agilite.jpg">
        <div class="">
          <div class="q-display-3">
            L’agilité
            <div class="q-display-4">Etre agile chez Sofrecom c’est  comprendre que  <br/>« <b>rien n’est plus constant que le changement</b> ».</div>
          </div>
          <!-- <q-btn label="Lire plus" class="slideBtn"/> -->
        </div>
      </q-carousel-slide>
      <q-carousel-slide class="flex flex-start items-center slide-text" img-src="statics/ouverturedesprit.jpg">
        <div class="">
          <div class="q-display-3">
            L’ouverture d’esprit
            <div class="q-display-4">Parce que chez Sofrecom, nous sommes <br/>différents mais complémentaires.</div>
          </div>
          <!-- <q-btn label="Lire plus" class="slideBtn"/> -->
        </div>
      </q-carousel-slide>
      <q-carousel-slide class="flex flex-start items-center slide-text" img-src="statics/audace.jpg">
        <div class="">
          <div class="q-display-3">
            Audace
            <div class="q-display-4">Chez nous, cela veut dire <b>: Oser changer !</b> </div>
          </div>
          <!-- <q-btn label="Lire plus" class="slideBtn"/> -->
        </div>
      </q-carousel-slide>
      <q-carousel-slide class="flex flex-start items-center slide-text" img-src="statics/centrageclient.jpg">
        <div class="">
          <div class="q-display-3">
            Centré client
            <div class="q-display-4">Chez Sofrecom nous considérons que notre client <br/>est toujours dans la pièce. </div>
          </div>
          <!-- <q-btn label="Lire plus" class="slideBtn"/> -->
        </div>
      </q-carousel-slide>
    </q-carousel>
    <div class="quickNavigation">
      <div class="row">
        <div class="col-xs-12 flex flex-center bottomTitleCont">
          <h4>{{$t('demande.conge.alors')}} {{firstName}},</h4>
        </div>
        <div class="col-xs-12 flex flex-center bottomLitleTitleCont">
          <h6>{{$t('demande.conge.whatWantDoToday')}}</h6>
        </div>
        <div class="col-xs-12 flex flex-center bottomBarCont">
          <span></span>
        </div>
      </div>
      <div class="row flex flex-start items-center lastNavig">
        <div v-for="menu in bottomMenuAttr" :key='menu.id' class="col-md-4 col-sm-12 col-xs-12">
          <div @click="goToLink('/admin/redirect/'+menu.menuTableId)" class="navItem row">
            <div class="col-xs-3 flex flex-center navIcon">
              <img class="40PXPictMaxHeight" :src="'statics/icons/'+menu.iconBottomMenu+'.png'" />
            </div>
            <div class="col-xs-9 flex flex-center navText">
              <p>{{$t(menu.label)}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>

export default {
  name: 'homeDashboard',
  created () {
  },
  mounted () {
    if (this.$store.state.Auth.user !== null && this.$store.state.Auth.user !== '') {
      this.firstName = this.$store.state.Auth.user.firstName
    }
  },
  data: function () {
    return {
      firstName: ''
    }
  },
  methods: {
    goToLink (link) {
      this.$router.push(link)
    }
  },
  computed: {
    bottomMenuAttr () {
      return this.$store.state.Auth.bottomMenu
    }
  }

}
</script>
