<template>
  <div :class="[{ 'has-link': linkActivator }]">
    <div class="table-container">
      <table>
        <tr class="pb-3 header">
          <!-- <th>S/N</th> -->
          <th v-for="(header, index) in headers" :key="index">
            {{ header.title }}
          </th>
        </tr>
        <tr v-if="data.length < 1" class="empty-message d-flex justify-center mt-4">
          {{ emptyMessage }}
        </tr>
        <tr
        v-else
          class="mt-3 py-4 px-2 body"
          v-for="(item, index) in data"
          :key="index"
          @click="$emit('click:row', item)"
        >
          <!-- <td>{{ index + 1 }}.</td> -->
          <td v-for="(column, index) in headers" :key="index">
            <slot :name="column.value" :item="item">
              {{
                isNested
                  ? item[nestedProperty][column.value]
                  : item[column.value]
              }}
            </slot>
          </td>
        </tr>
      </table>
    </div>
    <pagination class="mt-3" :total-count="totalCount" @change="(v) => $emit('change:data', v)" :has-next="hasNext" :has-prev="hasPrev" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Pagination from "./pagination.vue";

interface TableHeader {
  title: string;
  value: string;
}

@Component({
  components: {
    Pagination,
  },
})
export default class DataTable extends Vue {
  @Prop({ default: false })
  linkActivator!: boolean;

  @Prop()
  linkPrefix!: string;

  @Prop({ default: false })
  isNested!: boolean;

  @Prop()
  nestedProperty!: string;

  @Prop({ default: 'No data available' })
  emptyMessage!: string;

  @Prop()
  data!: Record<string, string>[];

  @Prop()
  headers!: TableHeader[];

  @Prop({ required: true })
  totalCount!: number;

  @Prop()
  hasNext!: boolean;

  @Prop()
  hasPrev!: boolean;
}
</script>

<style lang="scss">
div {
  overflow-x: auto;
  &.has-link {
    table {
      tr {
        cursor: pointer;

        &:hover {
          @include vendor-prefix(
            box-shadow,
            0px 2px 8px rgba(0, 0, 0, 0.1)
          );
        }
      }
    }
  }

  table {
    width: 100%;

    tr {
      @include flex(space-between, row);

      &.empty-message {
        color: picker(grey, grey1);
        width: 100%;
      }

      td,
      th {
        &:not(:first-child) {
          min-width: 260px;
          text-align: left;
          text-align: center;
        }
        &:first-child {
          min-width: 50px;
        }
      }
      &.header {
        color: picker(grey, grey1);
        border-bottom: 1px solid picker(grey, grey11);
      }

      &.body {
        background: #fff;
      }
    }
  }
}
</style>