<script>
import { Bar, mixins } from "vue-chartjs"
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        legend: {
          display: false
        }
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
