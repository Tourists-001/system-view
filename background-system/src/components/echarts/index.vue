<template>
  <div class="echarts-container">
    <div ref="container" class="container"></div>
    <div ref="table" class="table"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: {
    data: {
      type: Promise
    }
  },
  mounted() {
    // this.createEChart(this.data);
    this.data.then(res => {
      const arr = res.map(item => ({
        name: item.name,
        value: item.articleCount
      }));
      this.createEChart(arr);
      let name = [];
      let value = [];
      for (let i = 0; i < arr.length; i++) {
        name.push(arr[i].name);
        value.push(arr[i].value);
      }
      this.createTable(name, value);
    });
  },
  methods: {
    createEChart(data) {
      var chartDom = this.$refs.container;
      var myChart = echarts.init(chartDom);
      var option = {
        legend: {
          top: "bottom"
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [50, 250],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8
            },
            data: data
          }
        ]
      };

      option && myChart.setOption(option);
    },
    createTable(name, value) {
      var chartDom = this.$refs.table;
      var myChart = echarts.init(chartDom);
      var option = {
        xAxis: {
          type: "category",
          data: name
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: value,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)"
            }
          }
        ]
      };

      option && myChart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.echarts-container {
  height: 90vh;
  display: flex;
  justify-content: center;
  background-color: #FB9F89;
}
.container {
  width: 500px;
  height: 600px;
  margin-top: 30px;
  margin-left: 30px;
}
.table {
  width: 500px;
  height: 600px;
  margin-top: 50px;
  margin-left: 30px;
}
</style>
