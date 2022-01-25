<template>
  <div>
    <Echarts :data="fetchData" />
  </div>
</template>

<script>
import Echarts from "@/components/echarts";
import { getBlogType } from "@/api/blogType.js";
export default {

  components: {
    Echarts
  },
  computed: {
    fetchData() {
      return getBlogType().then(({ data }) => {
        return data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
