<template>
    <div></div>
</template>

<script lang="ts">
export default {
  name: 'logout',
  data () {
    return {}
  },
  methods: {
    signout () {
      this.$store.dispatch('Auth/signOut')
    }
  },
  mounted () {
    this.signout()
  }
}
</script>
