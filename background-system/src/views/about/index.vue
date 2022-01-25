<template>
  <div class="about-container">
    <div class="block">关于我的地址</div>
    <div class="container">
      <el-input v-model="data" placeholder="请输入内容">{{ data }}</el-input>
      <el-button
        style="marginLeft:20px"
        type="primary"
        @click="changeAboutHandle"
        >确认修改</el-button
      >
    </div>
  </div>
</template>

<script>
import { getAbout, setAbout } from "@/api/about.js";
export default {
  data() {
    return {
      data: ""
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getAbout().then(({ data }) => {
        this.data = data;
      });
    },
    changeAboutHandle() {
      const obj = {
        url: this.data
      };
      if (!obj.url) {
        this.$message.error("地址不同为空");
        return;
      }
      setAbout(obj).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.block {
  margin: 20px;
  font-weight: bold;
}
.container {
  display: flex;
  width: 500px;
  padding-left: 20px;
}
</style>
