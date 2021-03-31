<template>
  <div class="popUpBox flex-center" v-show="showPOP">
    <!-- <div class='popUpContainer'>
    </div> -->
    <div class='popUpDialogBox' :style="{height: height, width: width, maxHeight: maxHeight, minHeight: minHeight, maxWidth: maxWidth}">
      <div class="dialogContainer">
        <slot name="popHeader"></slot>
        <slot name="popContent"></slot>
      </div>
      <slot name="popBtns"></slot>
      <slot name="popCloseBtn"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import JQ from '../plugins/jquery.js'

export default Vue.extend({
  name: 'popup',
  props: ['show', 'height', 'width', 'maxHeight', 'maxWidth', 'minHeight'],
  data () {
    return {
      showPOP: false
    }
  },
  mounted () {
    this.showPOP = this.show
  },
  methods: {
  },
  beforeDestroy () {
  },
  watch: {
    showPopUp: function (val) {
      this.showPOP = val
      if (val === true) {
        JQ('body').css('overflow', 'hidden')
      } else {
        JQ('body').css('overflow', 'auto')
      }
    }
  },
  computed: {
    showPopUp () {
      return this.show
    }
  }
})
</script>
