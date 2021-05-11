<template>
  <div>
    <section class="px-6 pt-10">
      <h2>Accounts</h2>
    </section>
    <section class="px-6 py-6">
      <data-table
        :headers="headers"
        :data="accounts"
        :link-activator="true"
        :is-nested="true"
        nested-property="debtor"
        link-prefix="accounts"
        :total-count="totalAccounts"
        @click:row="goToLink"
        @change:data="fetchAccounts"
        :has-prev="responsePaginationLink.includes('prev')"
        :has-next="responsePaginationLink.includes('next')"
      >
        <template v-slot:name="{ item }">
          {{ item.debtor.title }} {{ item.debtor.firstName }} {{ item.debtor.lastName }}
        </template>
        
        <template v-slot:address="{ item }">
          {{ item.debtor.address.address }}
        </template>
      </data-table>
    </section>
  </div>
</template>

<script lang="ts">
import { AccountsApi } from '@/api/models';
import { IAccount } from '@/interfaces';
import { Component, Vue } from "vue-property-decorator";
import { notify } from '@/utils/notify'
import DataTable from "../components/data-table.vue";

@Component({ components: { DataTable } })
export default class Accounts extends Vue {
  headers = [
    {
      title: "Name",
      value: "name",
    },
    {
      title: "Email",
      value: "email",
    },
    {
      title: "Address",
      value: "address",
    },
    {
      title: "Phone",
      value: "mobilePhone",
    },
  ];

  accounts: IAccount[] = []

  responsePaginationLink = '';

  totalAccounts = 0

  goToLink (item: IAccount) {
    this.$router.push(`/dashboard/accounts/${item.id}`)
  }

  
  beforeMount() {
    this.fetchAccounts({ itemsPerPage: 5, page: 1 });
  }

  async fetchAccounts({ itemsPerPage, page }: Record<string, number>) {
    await AccountsApi.partial(page, itemsPerPage)
      .then((result) => {
        this.accounts = result.data
        this.totalAccounts = result.headers['x-total-count']
        this.responsePaginationLink = result.headers['link']
      })  
      .catch((e) => {
        notify.error(e.toJSON().message, 'Error', 'topRight')
      });
  }
}
</script>

<style scoped>
</style>