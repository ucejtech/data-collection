<template>
  <div class="d-flex justify-end align-center">
    <label class="mr-8 d-flex align-center"
      >Rows per page:
      <select class="ml-3" v-model="itemsPerPage" @change="fireEvent">
        <option v-for="(item, index) in paginateNo" :key="index">
          {{ item }}
        </option>
      </select>
    </label>
    {{ currentStartItem }} - {{ currentLastItem }} of
    {{ totalCount }}
    <button
      @click="previous"
      class="mx-3 pa-2"
      color="#9FA2B4"
      :disabled="!hasPrev"
      icon
    >
      <i class="mdi mdi-chevron-left"></i>
    </button>
    <button
      @click="next"
      color="#9FA2B4"
      class="mx-3 pa-2"
      :disabled="!hasNext"
      icon
    >
      <i class="mdi mdi-chevron-right"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Pagination extends Vue {
  page = 1;

  paginateNo = [5, 10, 15, 20];

  itemsPerPage = 5;

  @Prop({ required: true })
  totalCount!: number;

  @Prop()
  hasNext!: boolean;

  @Prop()
  hasPrev!: boolean;

  get currentStartItem() {
    return this.page <= 1 ? 1 : this.itemsPerPage * (this.page - 1) + 1;
  }

  get currentLastItem() {
    if (this.page * this.itemsPerPage >= this.totalCount) {
      return this.totalCount;
    }
    if (this.page <= 1) {
      return this.itemsPerPage;
    }
    return this.page * this.itemsPerPage;
  }

  previous(): void {
    this.page -= 1;
    this.fireEvent();
  }

  next(): void {
    this.page += 1;
    this.fireEvent();
  }

  fireEvent() {
    this.$emit("change", { itemsPerPage: this.itemsPerPage, page: this.page });
  }
}
</script>

<style lang="scss" scoped>
button {
  border: none !important;
  background: picker(primary, dark-blue);
  color: #fff;
  &:not(:disabled) {
    cursor: pointer;
  }
  &:disabled {
    opacity: 0.15;
  }
}
</style>