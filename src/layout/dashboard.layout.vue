<template>
  <div>
    <!-- <img id="company-logo" alt="Vue logo" src="./assets/logo.png">
    <Challenge msg="Welcome to the challenge 🐰"/> -->
    <nav-bar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavigationBar from "../components/navigation-bar.vue";

@Component({
  components: { "nav-bar": NavigationBar },
})
export default class DashboardLayout extends Vue {}
</script>

<style lang="scss">

</style>