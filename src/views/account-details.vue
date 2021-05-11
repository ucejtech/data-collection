<template>
  <div>
    <section class="px-6 pt-10">
      <h2>{{ user.debtor ? `${user.debtor.title} ${user.debtor.firstName} ${user.debtor.lastName}` : ''}}</h2>
      <h4>{{ user.debtor ? user.debtor.email : ''}}</h4>
      <h4>{{ user.debtor ? user.debtor.address.address : ''}}</h4>
      <h4>{{ user.debtor ? user.debtor.mobilePhone : ''}}</h4>
    </section>
    <section class="px-6 py-6">
      <data-table
        :headers="headers"
        :data="claims"
        link-prefix="accounts"
        link-identifier="id"
        :total-count="totalClaims"
        @change:data="fetchAccountClaims"
        :has-prev="responsePaginationLink.includes('prev')"
        :has-next="responsePaginationLink.includes('next')"
      >
        <template v-slot:identifier="{ item }">
          {{ item.id }}
        </template>
        <template v-slot:baseAmount="{ item }">
          {{ $currency(item.baseAmount) }}
        </template>
        <template v-slot:fees="{ item }">
          {{ $currency(item.fees) }}
        </template>
        <template v-slot:currency="{ item }">
          {{ item.currency.slice(0, -1) }}
        </template>
        <template v-slot:status="{ item }">
          <status-btn :status="item.status"></status-btn>
        </template>
      </data-table>
    </section>
  </div>
</template>

<script lang="ts">
import { AccountsApi } from '@/api/models';
import { IAccount, IClaim } from '@/interfaces';
import { notify } from '@/utils/notify';
import { Component, Vue } from "vue-property-decorator";
import DataTable from "../components/data-table.vue";
import StatusBtn from '../components/status-btn.vue';

@Component({ components: { DataTable, StatusBtn } })
export default class AccountDetails extends Vue {
  headers = [
    {
      title: "Identifier",
      value: "identifier",
    },
    {
      title: "Amount",
      value: "baseAmount",
    },
    {
      title: "Currency",
      value: "currency",
    },
    {
      title: "Fees",
      value: "fees",
    },
    {
      title: "Due Date",
      value: "dueDate",
    },
    {
      title: "Status",
      value: "status",
    },
  ];

  claims: IClaim[] = []

  user: IAccount | {} = {}

  
  responsePaginationLink = '';

  totalClaims = 0
  
  beforeMount() {
    this.fetchAccountClaims({ itemsPerPage: 5, page: 1 });
  }

  async fetchAccountClaims({ itemsPerPage, page }: Record<string, number>) {
    const id = this.$route.params.id
    await AccountsApi.getAccountClaims(id, page, itemsPerPage)
      .then(([user, result]) => {
        this.user = user.data
        this.claims = result.data
        this.totalClaims = result.headers['x-total-count']
        this.responsePaginationLink = result.headers['link']
      })  
      .catch((e) => {
        notify.error(e.toJSON().message, 'Error', 'topRight')
      });
  }
  }
</script>

<style lang="scss" scoped>
h4 {
  color: picker(grey, grey1);
}
</style>