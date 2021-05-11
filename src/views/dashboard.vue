<template>
  <div>
    <section class="px-6 pt-10">
      <h2>
        Hi {{ currentUser.debtor.firstName }} , <br />
        You are a good collector
      </h2>
    </section>
    <section class="px-6">
      <header><h5 class="header mt-10">Statistics</h5></header>
      <div class="metric">
        <card class="d-flex align-center">
          <rings color="#29c5d8" :text="getClaims.length" />
          <div class="ml-3 d-flex flex-column justify-center">
            <header>Total Claims</header>
            <div class="mt-1">Number of debts (Open, Paid, Deleted)</div>
          </div>
        </card>
        <card class="d-flex align-center">
          <rings color="#f2c438" :text="getDebtCount('OPEN')" />
          <div class="ml-3 d-flex flex-column justify-center">
            <header>Open Debts</header>
            <div class="mt-1">Number of Open Debts</div>
          </div>
        </card>
        <card class="d-flex align-center">
          <rings color="#36c985" :text="getDebtCount('PAID')" />
          <div class="ml-3 d-flex flex-column justify-center">
            <header>Paid Debts</header>
            <div class="mt-1">Number of Paid Debts</div>
          </div>
        </card>
        <card class="d-flex align-center">
          <rings color="#b71c1c" :text="getDebtCount('DELETED')" />
          <div class="ml-3 d-flex flex-column justify-center">
            <header>Deleted Debts</header>
            <div class="mt-1">Number of Deleted</div>
          </div>
        </card>
      </div>
    </section>
    <section class="px-6 my-4">
      <header><h5 class="header mt-10">Visualisation</h5></header>
      <card class="chart">
        <ejs-accumulationchart
          id="container"
          ref="pie"
          style="display: block"
          :theme="theme"
          :legendSettings="legendSettings"
          :tooltip="tooltip"
          :enableAnimation="enableAnimation"
          :enableSmartLabels="enableSmartLabels"
          :title="title"
        >
          <e-accumulation-series-collection>
            <e-accumulation-series
              :dataSource="getChartData"
              xName="x"
              yName="y"
              innerRadius="20%"
              :dataLabel="dataLabel"
            >
            </e-accumulation-series>
          </e-accumulation-series-collection>
        </ejs-accumulationchart>
      </card>
    </section>
  </div>
</template>

<script lang="ts">
import Challenge from "../components/Challenge.vue";
import { Component, Vue } from "vue-property-decorator";
import {
  AccumulationLegend,
  PieSeries,
  AccumulationDataLabel,
  AccumulationTooltip,
} from "@syncfusion/ej2-vue-charts";
import NavigationBar from "../components/navigation-bar.vue";
import Card from "../components/card.vue";
import Rings from "../components/rings.vue";
import { mapGetters } from "vuex";
import { IClaim } from "../interfaces/index";

const selectedTheme = "Material";
let theme = (
  selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
).replace(/-dark/i, "Dark");

@Component({
  components: { Challenge, "nav-bar": NavigationBar, Card, Rings },
  computed: {
    ...mapGetters({ getClaims: "getClaims", currentUser: "auth/getUser" }),
  },
  provide: {
    accumulationchart: [
      AccumulationLegend,
      PieSeries,
      AccumulationDataLabel,
      AccumulationTooltip,
    ],
  },
})
export default class Dashboard extends Vue {
  theme = theme;

  getClaims!: IClaim[];

  get getChartData(): Record<string, string | number>[] | [] {
    const normalizedData: { x: string; y: number }[] = [];
    this.getClaims.map((claim) => {
      const exists = normalizedData.findIndex((x) => x.x === claim.status);
      if (exists >= 0) {
        normalizedData[exists].y += 1;
      } else {
        normalizedData.push({ x: claim.status, y: 1 });
      }
    });
    return normalizedData;
  }

  legendSettings = { visible: true };
  dataLabel = { visible: true, position: "Outside", name: "x" };
  tooltip = {
    enable: true,
    header: "<b>${point.x}</b>",
    format: "Count: <b>${point.y}</b>",
  };
  enableAnimation = true;
  enableSmartLabels = true;
  title = "Debt Collection Progress Chart";

  beforeMount() {
    this.$store.dispatch("getClaims");
  }

  getDebtCount(debtType: string) {
    const data = this.getChartData.find((data) => data.x === debtType);
    if (data) {
      return data.y;
    }
    return 0;
  }
}
</script>

<style lang="scss">
section {
  .header {
    color: picker(grey, grey11);
  }

  .metric {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 10px 10px;

    header {
      font-weight: bold;
    }
  }

  .chart {
    height: 450px;
    overflow: hidden !important;
  }
}
</style>
