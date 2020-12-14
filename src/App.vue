<template>
  <div id="app">
    <app-topbar />
    <router-view />
  </div>
</template>

<script>
  import AppTopbar from '@/components/Topbar'
  import {actionTypes} from '@/store/modules/auth'

  export default {
    name: 'App',
    components: {
      AppTopbar,
    },
    mounted() {
      this.$store.dispatch(actionTypes.getCurrentUser)
    },
  }
</script>

<style>
  @import 'assets/main.css';
</style>
