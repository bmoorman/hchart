<template>
  <div class="chartContainer">
    <highcharts class="chart" :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'

const {InfluxDB} = require('@influxdata/influxdb-client');
// You can generate a Token from the "Tokens Tab" in the influx UI
const token = 'YH3pdsrBrb071Q2DY_D04JjWt9e-B_3ONet3QN9MfIkADwh2MhKIPeCTk0XyvVmRDh_j6F4o9IhWgipKUAAMwA==';
const client = new InfluxDB({url: 'http://13.79.192.127:8086', token: token});
const queryApi = client.getQueryApi('test');

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
      data: {},
      variables: [],
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
      // get variables from the database schema
      this.getDbVariables();
      // get rows from database which will set the data in chart if succesful
       this.getDbRows();
    },
    getDbVariables() {
      let _this = this;
      const query = "import \"influxdata/influxdb/schema\" schema.measurementFieldKeys( bucket: \"test\",  measurement: \"variables\",  start: -1y)";
      var fields = [];
      queryApi.queryRows(query, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row);
          fields.push(o);
        },
        error(error) {
          console.error(error);
          console.log('\\nFinished ERROR');
        },
        complete() {
          _this.variables = fields.filter(v => v._value != "day").map(v => v._value);
        },
      });
    },
    getDbRows() {
      let _this = this;
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
          _this.setChartData(rows, _this);
          _this.setSeries(_this, 2);
        },
      });
    },
    setChartData(rows, _this) {
      rows.forEach(function(r) {
        var startdateLabel = r.startdate;
        var dayLabel = r.day;
        if (!(startdateLabel in _this.data)) {
          _this.data[startdateLabel] = {};
        }        
        if (!(dayLabel in _this.data[startdateLabel])) {
          _this.data[startdateLabel][dayLabel] = {};
        }        
        _this.data[startdateLabel][dayLabel] = r;
      });
      console.log(_this.data);
    },
    setSeries(_this, varIndex) {
      Object.keys(this.data).forEach( (startDate) => {
        var series = {
          name: startDate,
          data: []
        };
        Object.keys(_this.data[startDate]).forEach( (day) => {
          var dayNbr = Number(day);
          var value = _this.data[startDate][dayNbr][_this.variables[varIndex]];
          series.data.push([dayNbr, value]);
        });
        _this.chartOptions.series.push(series);
      });
    }
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
