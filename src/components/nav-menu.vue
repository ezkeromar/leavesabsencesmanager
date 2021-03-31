<template>
  <div>
    <q-layout-header class="headerNtransition" :class="{header: !showLeft, headerN: showLeft}">
      <q-toolbar
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
      <q-btn
        flat round dense
        class="headerColapseMenu"
        icon="menu"
        @click="changeShowLeftState"
      />
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer
      side="left"
      :value="true"
      class="transitionLeftMenu shadow-up-2"
      :class="{aside: !showLeft, asideN: showLeft}"
      @mouseover="changeShowLeftStateEnter"
      @mouseout="changeShowLeftStateLeave"
    >
      <q-list no-border link inset-separator>
        <q-list-header>
          <div @click="goToModules" class="cursorStyle">
            <div v-if="$store.state.Dashboard.multiplemodules" @mouseout="showModulesBtn = false" :class="{modulesBtnContainer: !showModulesBtn}" class="moduleBtn">
              <img :class="{modulesBtnHide: !showModulesBtn}" src="statics/icons/modules.png" />
              <p :class="{modulesBtnHide: !showModulesBtn}">{{$t('demande.modules.btnTitle')}}</p>
            </div>
          </div>
          <router-link to="/admin">
            <img @mouseover="showModulesBtn = true" @click="goToadmin" class="img-reponsive avatarMenu cursor" src="statics/sirhus.png" />
          </router-link>
        </q-list-header>
        <q-item-separator />
        <q-list-header>
          <div class="q-item-division relative-position">
            <div class="q-item-side q-item-section q-item-side-left">
              <img class="img-reponsive avatarProfil" :src="profilePict" />
              <span class="nameMenu">{{ name }}</span>
            </div>
            <div @click="signout" class="q-item-side q-item-section q-item-side-right logoutIcon">
              <img src="statics/logout.png" class="img-responsive logout-pict" />
            </div>
          </div>
        </q-list-header>
        <q-item-separator />
        <div class="menuHeight">
        <div v-for="menu in menus" :key="menu.id" class="menuContainer">
          <q-collapsible
            v-if="Object.keys(menu.childs).length > 0"
            group="firstGroup"
            :image="'statics/icons/'+menu.icon+'.png'"
            :label="$t(menu.label)"
            :class="{active:menu.icon == menu.iconActive}"
            @show="menu.icon = menu.iconActive"
            @hide="menu.icon = menu.iconDisable"
          >
            <q-list class="firstColapse">
              <div v-for="menuTow in menu.childs" :key="menuTow.id">
                  <q-collapsible
                    v-if="Object.keys(menuTow.childs).length > 0"
                    group="roundGroup"
                    :image="'statics/icons/'+menuTow.icon+'.png'"
                    :label="$t(menuTow.label)"
                    :class="{active:menuTow.icon == menuTow.iconActive}"
                    @show="menuTow.icon = menuTow.iconActive"
                    @hide="menuTow.icon = menuTow.iconDisable"
                  >
                    <q-list>
                      <div v-for="menuTree in menuTow.childs" :key="menuTree.id">
                        <q-collapsible
                        v-if="Object.keys(menuTree.childs).length > 0"
                        group="thirdGroup"
                        :image="'statics/icons/'+menuTree.icon+'.png'"
                        :label="$t(menuTree.label)"
                        :class="{active:menuTree.icon == menuTree.iconActive}"
                        @show="menuTree.icon = menuTree.iconActive"
                        @hide="menuTree.icon = menuTree.iconDisable"
                      >
                          <q-list>
                            <div v-for="menuFour in menuTree.childs" :key="menuFour.id">
                              <q-collapsible
                                v-if="Object.keys(menuFour.childs).length > 0"
                                group="fourthGroup"
                                :image="'statics/icons/'+menuFour.icon+'.png'"
                                :label="$t(menuFour.label)"
                                :class="{active:menuFour.icon == menuFour.iconActive}"
                                @show="menuFour.icon = menuFour.iconActive"
                                @hide="menuFour.icon = menuFour.iconDisable"
                              >
                                <q-list>
                                  <div v-for="menuFive in menuFour.childs" :key="menuFive.id">
                                    <q-collapsible
                                    v-if="Object.keys(menuFive.childs).length > 0"
                                    group="fivethGroup"
                                    :image="'statics/icons/'+menuFive.icon+'.png'"
                                    :label="$t(menuFive.label)"
                                    :class="{active:menuFive.icon == menuFive.iconActive}"
                                    @show="menuFive.icon = menuFive.iconActive"
                                    @hide="menuFive.icon = menuFive.iconDisable"
                                  >
                                      <q-list>
                                        <q-item
                                          v-for="menuFiveChild in menuFive.childs"
                                          :key="menuFiveChild.id"
                                          :to="'/admin/redirect/'+menuFiveChild.menuTableId"
                                          :class="{clicked:menuFiveChild.menuTableId == activeMenu}"
                                        >
                                          <q-item-side>
                                            <img class="pictMenu" :src="(activeMenu == menuFiveChild.menuTableId) ? 'statics/icons/'+menuFiveChild.clickIcon+'.png' : 'statics/icons/'+menuFiveChild.icon+'.png'" />
                                          </q-item-side>
                                          <q-item-main :label="$t(menuFiveChild.label)" class="menuText" />
                                        </q-item>
                                      </q-list>
                                    </q-collapsible>
                                    <q-item
                                      v-else
                                      :to="'/admin/redirect/'+menuFive.menuTableId"
                                      :class="{clicked:menuFive.menuTableId == activeMenu}"
                                    >
                                      <q-item-side>
                                        <img class="pictMenu" :src="(activeMenu == menuFive.id) ? 'statics/icons/'+menuFive.clickIcon+'.png' : 'statics/icons/'+menuFive.icon+'.png'" />
                                      </q-item-side>
                                      <q-item-main :label="$t(menuFive.label)" class="menuText" />
                                    </q-item>
                                  </div>
                                </q-list>
                              </q-collapsible>
                              <q-item
                                v-else
                                :to="'/admin/redirect/'+menuFour.menuTableId"
                                :class="{clicked:menuFour.menuTableId == activeMenu}"
                              >
                                <q-item-side>
                                  <img class="pictMenu" :src="(activeMenu == menuFour.menuTableId) ? 'statics/icons/'+menuFour.clickIcon+'.png' : 'statics/icons/'+menuFour.icon+'.png'" />
                                </q-item-side>
                                <q-item-main :label="$t(menuFour.label)" class="menuText" />
                              </q-item>
                            </div>
                          </q-list>
                        </q-collapsible>
                        <q-item
                          v-else
                          :to="'/admin/redirect/'+menuTree.menuTableId"
                          :class="{clicked:menuTree.menuTableId == activeMenu}"
                        >
                          <q-item-side>
                            <img class="pictMenu" :src="(activeMenu == menuTree.menuTableId) ? 'statics/icons/'+menuTree.clickIcon+'.png' : 'statics/icons/'+menuTree.icon+'.png'" />
                          </q-item-side>
                          <q-item-main :label="$t(menuTree.label)" class="menuText" />
                        </q-item>
                      </div>
                    </q-list>
                  </q-collapsible>
                  <q-item
                    v-else
                    :to="'/admin/redirect/'+menuTow.menuTableId"
                    :class="{clicked:menuTow.menuTableId == activeMenu}"
                  >
                    <q-item-side>
                      <img class="pictMenu" :src="(activeMenu == menuTow.menuTableId) ? 'statics/icons/'+menuTow.clickIcon+'.png' : 'statics/icons/'+menuTow.icon+'.png'" />
                    </q-item-side>
                    <q-item-main :label="$t(menuTow.label)" class="menuText" />
                  </q-item>
                </div>
            </q-list>
          </q-collapsible>
          <q-item
            :class="{clicked:menu.menuTableId == activeMenu}"
            :to="'/admin/redirect/'+menu.menuTableId"
            v-else
          >
            <q-item-side>
              <img class="pictMenu" :src="(activeMenu == menu.menuTableId) ? 'statics/icons/'+menu.clickIcon+'.png' : 'statics/icons/'+menu.icon+'.png'" />
            </q-item-side>
            <q-item-main :label="$t(menu.label)" class="menuText" />
          </q-item>
          </div>
        </div>
        <q-list-header class="asideBottom">
          <img class="img-reponsive avatarMenu" src="statics/sofrecom.png" />
        </q-list-header>
      </q-list>
    </q-layout-drawer>
  </div>
</template>

<script>
import { bus } from '../plugins/event-bus.js'
import * as services from '../services/auth-services.js'

export default {
  name: 'nav-menu',
  data () {
    return {
      name: '',
      menus: {},
      showLeft: false,
      showLeftStatic: true,
      profilePict: '',
      showModulesBtn: false
    }
  },
  mounted () {
    let that = this
    if (this.$store.state.Auth.user !== null && this.$store.state.Auth.user !== '') {
      this.name = this.$store.state.Auth.user.name
      this.getprofilePicture()
    } else {
      this.$router.push('/login')
    }

    this.$store.commit('Auth/setModule', JSON.parse(localStorage.getItem('module')))
    if (this.$store.state.Auth.module === null && this.$route.name !== 'modules') {
      this.$router.push('modules')
    } else {
      services.getMenu({ module: this.$store.state.Auth.module.name })
    }

    bus.$on('getUserProfileImageSuccess', function (res) {
      that.profilePict = res.imagePath
    })

    // bus.$on('getUserProfileImageFailed', function (res) {
    //   if (res !== undefined) {
    //     if (res.status === 401) {
    //       that.$store.commit('Auth/setUnauthorizedError', true)
    //     }
    //   }
    // })

    bus.$on('getMenuSuccess', function (res) {
      that.menus = res.menus
      that.$store.commit('Auth/setBottomMenu', res.lastVisitedMenus)
    })

    bus.$on('getMenuFailed', function (res) {
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setUnauthorizedError', res.data.message)
        }
      }
    })
  },
  methods: {
    goToModules () {
      this.$store.commit('Auth/SetLoggedNow', false)
      this.$router.push('/modules')
    },
    getprofilePicture () {
      services.getUserProfileImage({ user: this.$store.state.Auth.user.id })
    },
    goToadmin () {
      this.$router.push('/admin')
    },
    signout () {
      this.$store.dispatch('Auth/signOut')
    },
    changeShowLeftStateEnter () {
      this.showLeft = true
      bus.$emit('showLeftMenu', true)
    },
    changeShowLeftStateLeave () {
      this.showLeft = false
      bus.$emit('showLeftMenu', false)
    },
    changeShowLeftState () {
      this.showLeft = !this.showLeft
      this.showModulesBtn = false
      bus.$emit('showLeftMenu', this.showLeft)
    }
  },
  computed: {
    activeMenu () {
      return this.$store.state.Dashboard.activeMenu
    }
  },
  beforeDestroy () {
    bus.$off('getUserProfileImageSuccess')
    bus.$off('getUserProfileImageFailed')
    bus.$off('getMenuSuccess')
    bus.$off('getMenuFailed')
  }
}
</script>
