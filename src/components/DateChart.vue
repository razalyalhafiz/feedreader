<template>
  <v-card>
    <v-container
      v-show="total > 0"
      class="chart-container"
    >
      <bar-chart :chart-data="chartData"></bar-chart>
    </v-container>
    <v-card-title primary-title>
      <div>
        <div class="headline">Total articles by date</div>
        <span class="grey--text">Chart to display the total number of daily articles.</span>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-slide-y-transition>
      <v-data-table
        :headers="tableHeaders"
        :items="dateChartData"
        class="elevation-1"
        v-show="show"
        hide-actions
      >
        <template
          slot="items"
          slot-scope="props"
        >
          <td>{{ props.item.x }}</td>
          <td class="text-xs-right">{{ props.item.y }}</td>
        </template>
        <template slot="footer">
          <td><strong>Total articles</strong></td>
          <td class="text-xs-right"><strong>{{ this.total }}</strong></td>
        </template>
      </v-data-table>
    </v-slide-y-transition>
  </v-card>
</template>
<script>
import BarChart from "./BarChart"
import ChartMixin from "@/mixins/ChartMixin"
import { mapGetters } from "vuex"

export default {
  mixins: [ChartMixin],
  components: {
    BarChart
  },
  computed: {
    ...mapGetters(["dateChartData"]),
    chartData: function () {
      return {
        labels: this.dateChartData.map(data => data.x),
        datasets: [
          {
            label: "Daily articles",
            backgroundColor: this.getRandomColors(this.dateChartData.length),
            data: this.dateChartData
          }
        ]
      }
    },
    total: function () {
      if (this.dateChartData.length === 0) return 0
      return this.dateChartData.map(x => x.y).reduce((a, b) => a + b, 0)
    }
  },
  data() {
    return {
      show: false,
      tableHeaders: [
        { text: "Date", value: "x" },
        { text: "Articles", align: "right", value: "y" }
      ]
    }
  }
}
</script>
