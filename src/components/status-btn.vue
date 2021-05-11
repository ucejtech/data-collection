<template>
  <button class="py-2 px-4" :style="`background: ${$hexToRgba(color)}; color: ${color}`">
    {{ status }}
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class StatusBtn extends Vue {
  @Prop()
  status!: string;

  statusColor: Record<string, any> = {
    OPEN: "#f2c438",
    PAID: "#36c985",
    DELETED: "#b71c1c",
  };

  get color(): string {
    return this.statusColor[this.status];
  }
}
</script>

<style lang="scss" scoped>
button {
  border: none;
  border-radius: 20px;
  font-weight: bold;
}
</style>