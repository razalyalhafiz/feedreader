<template>
  <v-container grid-list-md>
    <v-layout
      row
      wrap
    >
      <v-flex
        md6
        xs12
      >
        <SourceChart />
      </v-flex>
      <v-flex
        md6
        xs12
      >
        <DateChart />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import SourceChart from "@/components/SourceChart"
import DateChart from "@/components/DateChart"

Chart.defaults.global.defaultFontColor = 'white'

export default {
  components: {
    SourceChart, DateChart
  }
}
</script>
<style>
.chart-container {
  max-width: 400px;
}
</style>

