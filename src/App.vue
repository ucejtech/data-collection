<template>
  <div class="challenge">
   <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  mounted(): void {
    console.log("let's go")
  }
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin:0;
  background: #f7f8f6 !important;
}
</style>
