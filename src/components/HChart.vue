<template>
  <div class="chartContainer">
    <highcharts class="chart" :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'

export default {
  name: 'HChart',
  components: {
    highcharts: Chart 
  },
  props: {
    msg: String
  },
  data () {
    return {
      chartOptions: {
        chart: {
          type: "line",
        },
        title: {
          text: "Animal House KPI"
        },
        subtitle: {
          text: "by Production Start Date"
        },
        series: [],
      }
    }
  },
  mounted() {
    this.init();
    
  },
  methods: {
    init() {
      // get rows from database which will set the data in chart if succesful
       this.getDbRows();
    },
    getDbRows() {
      let _this = this;
      const {InfluxDB} = require('@influxdata/influxdb-client');
      // You can generate a Token from the "Tokens Tab" in the influx UI
      const token = 'YH3pdsrBrb071Q2DY_D04JjWt9e-B_3ONet3QN9MfIkADwh2MhKIPeCTk0XyvVmRDh_j6F4o9IhWgipKUAAMwA==';
      const client = new InfluxDB({url: 'http://13.79.192.127:8086', token: token});
      const queryApi = client.getQueryApi('test');
      const query = "from(bucket: \"house\") |> range(start: -1y) |> filter(fn: (r) => r[\"_measurement\"] == \"variables\") |> pivot(rowKey:[\"_time\"], columnKey: [\"_field\"], valueColumn: \"_value\") |> group(columns: [\"startdate\"], mode: \"by\")";
      var rows = [];
      queryApi.queryRows(query, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row);
          rows.push(o);
        },
        error(error) {
          console.error(error);
          console.log('\\nFinished ERROR');
        },
        complete() {
          _this.setChartData(rows);
        },
      });
    },
    setChartData(rows) {
      var data = {}
      rows.forEach(function(r) {
        var startdateLabel = r.startdate;
        var dayLabel = r.day;
        if (!(startdateLabel in data)) {
          data[startdateLabel] = {};
        }        
        if (!(dayLabel in data[startdateLabel])) {
          data[startdateLabel][dayLabel] = {};
        }        
        data[startdateLabel][dayLabel] = r;
      });
      console.log(data);
      Object.keys(data).forEach( (startDate) => {
        var series = {
          name: startDate,
          data: []
        };
        Object.keys(data[startDate]).forEach( (day) => {
          var dayNbr = Number(day);
          var value = data[startDate][dayNbr].mass;
          series.data.push([dayNbr, value]);
        });
        this.chartOptions.series.push(series);
      });
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chartContainer {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
}
.chart {
    height: 95%;
    width: 95%;
    margin: 0 auto;
    max-width: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
