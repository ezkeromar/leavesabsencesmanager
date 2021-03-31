<template>
  <div class="row congeListe helpContainer">
    <div class="col-md-10 congeListContainer">
      <div class="">
        <h1 class="helpTitle"><b>{{$t('demande.help.helpTitleA')}}</b> {{$t('demande.help.helpTitleB')}}</h1>
      </div>
      <div class="HelpContainer">
        <h4 class="HelpQuestionTitle">{{$t('demande.help.HelpQuestionTitle')}}</h4>
        <div class="QASection">
          <q-collapsible :key='question.question' v-for="question in questionList" group="helpQA" collapse-icon="fa fa-chevron-down" :label="question.question">
            <div class="answerHelp">
              {{question.answer}}
            </div>
          </q-collapsible>
        </div>
      </div>
      <div class="row videoThumbContainer" :class="{ allHeightVideo: videoThumbContHeight }">
        <div :key="video.id" v-for="(video, index) in videoList" class="col-md-4" @click='openVideo(video.id)'>
          <div :class="{ hideBlock: (videoThumbContHeight == false && index > 2) }" class="videoThumbnail" :style="{ backgroundImage: 'url('+video.picture+')' }">
            <div class="flex items-center justify-center">
              <h5>{{video.title}}</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center seeBtnHelp" v-if="videoList.length > 3">
        <q-btn v-if="videoThumbContHeight === false" @click="videoThumbContHeight = true" color="primary" class="block payPeriodeBtn" :label="$t('demande.help.seeMore')" />
        <q-btn v-if="videoThumbContHeight === true" @click="videoThumbContHeight = false" color="primary" class="block payPeriodeBtn" :label="$t('demande.help.seeLess')" />
      </div>
    </div>
    <pop-up v-if='videoSingle !== null' :show='showTablePOP' width='65%'>
      <div slot='popContent' class="dialogContainer">
        <video class="videoIframe" controls>
          <source :src="videoSingle.url" type="video/mp4">
          Your browser does not support HTML5 video.
        </video>
      </div>
      <i slot='popCloseBtn' @click="closePopUp" class="closeIcon fa fa-times"></i>
    </pop-up>
  </div>
</template>

<script lang="ts">
import * as services from '../services/help-services.js'
import { bus } from '../plugins/event-bus.js'
import popup from '../components/popup.vue'

export default {
  name: 'help',
  data () {
    return {
      videoThumbContHeight: false,
      questionList: [],
      videoList: [],
      showTablePOP: false,
      videoSingle: null
    }
  },
  mounted () {
    let that = this
    bus.$on('getQuestionsSuccess', function (res) {
      that.questionList = res
    })
    bus.$on('getQuestionsFailed', function (res) {
      that.loading = false
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        }
      }
    })

    bus.$on('getVideosSuccess', function (res) {
      that.videoList = res
    })
    bus.$on('getVideosFailed', function (res) {
      that.loading = false
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        }
      }
    })

    bus.$on('getVideoIframeSuccess', function (res) {
      that.videoSingle = res
    })
    bus.$on('getVideoIframeFailed', function (res) {
      that.loading = false
      if (res !== undefined) {
        if (res.status === 401) {
          that.$store.commit('Auth/setExpiredError', res.data.message)
        }
      }
    })
    that.getQuestions()
    that.getVideos()
  },
  methods: {
    openVideo (id) {
      this.showTablePOP = true
      services.getVideoIframe({ id: id })
    },
    closePopUp () {
      this.showTablePOP = false
      this.videoSingle = null
    },
    getQuestions () {
      services.getQuestions({ module: this.$store.state.Auth.module.name })
    },
    getVideos () {
      services.getVideos({ module: this.$store.state.Auth.module.name })
    }
  },
  components: {
    'pop-up': popup
  }
}
</script>

<style>
  .helpContainer .popUpDialogBox {
    background-color: transparent;
    padding: 0px !important;
    border-radius: 0px !important;
    box-shadow: none;
  }
</style>
