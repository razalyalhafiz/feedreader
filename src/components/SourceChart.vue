<template>
  <v-card>
    <v-container
      v-show="total > 0"
      class="chart-container"
    >
      <pie-chart :chart-data="chartData"></pie-chart>
    </v-container>
    <v-card-title primary-title>
      <div>
        <div class="headline">Total articles by feed</div>
        <span class="grey--text">Chart to display the total number of articles by each individual feed.</span>
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
        :items="sourceChartData"
        class="elevation-1"
        v-show="show"
        hide-actions
      >
        <template
          slot="items"
          slot-scope="props"
        >
          <td>{{ props.item.title }}</td>
          <td class="text-xs-right">{{ props.item.articles }}</td>
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
import PieChart from "./PieChart"
import ChartMixin from "@/mixins/ChartMixin"
import { mapGetters } from "vuex"

export default {
  mixins: [ChartMixin],
  components: {
    PieChart
  },
  computed: {
    ...mapGetters(["sourceChartData"]),
    chartData: function () {
      return {
        labels: this.sourceChartData.map(x => x.title),
        datasets: [
          {
            label: "Total articles by feed",
            backgroundColor: this.getRandomColors(this.sourceChartData.length),
            data: this.sourceChartData.map(x => x.articles)
          }
        ]
      }
    },
    total: function () {
      if (this.sourceChartData.length === 0) return 0
      return this.sourceChartData.map(x => x.articles).reduce((a, b) => a + b, 0)
    }
  },
  data() {
    return {
      show: false,
      tableHeaders: [
        { text: "Title", value: "title" },
        { text: "Articles", align: "right", value: "articles" }
      ]
    }
  }
}
</script>
