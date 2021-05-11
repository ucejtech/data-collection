<template>
  <div class="ring" :style="`width: ${size}px`">
    <div
      class="outer-ring"
      :style="`border: 1px solid ${color}; ${outerRingDimension}`"
    ></div>
    <div
      class="inner-ring"
      :style="`background: ${$hexToRgba(color)};color: ${color}; ${innerRingDimension}`"
    >
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Rings extends Vue {
  @Prop()
  color!: string;

  @Prop({ default: 50 })
  size!: number;

  @Prop()
  text!: string;

  get innerRingDimension() {
    return `width: ${this.size - 5}px; height: ${this.size - 5}px`;
  }

  get outerRingDimension() {
    return `width: ${this.size}px; height: ${this.size}px`;
  }
}
</script>

<style lang="scss" scoped>
.ring {
  position: relative;
  @include flex(space-between, row);

  .outer-ring {
    background: transparent;
    border-radius: 50%;
  }

  .inner-ring {
    position: absolute;
    border: none;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    @include vendor-prefix(transform, translate(-50%, -50%));
    @include flex(space-around, row);
    font-weight: bold;

    span {
      opacity: 1 !important;
    }
  }
}
</style>