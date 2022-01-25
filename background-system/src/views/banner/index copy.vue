<template>
  <div class="app-container">
    <el-table :data="data" border style="width: 100%">
      <el-table-column prop="order" label="序号" width="60" align="center">
        <template slot-scope="scope">
          {{ scope.row.order }}
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="描述"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="description"
        label="标题"

        align="center"
        fit="true"
      >
      </el-table-column>

      <el-table-column label="大图"  align="center" fit="true">
        <template>
          <el-image
            style="width: 100px; height: 100px"
            :src="data.bigImg"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column label="小图"  align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.midImg"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template>
          <el-tooltip class="item" effect="dark" content="修改" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getBanners} from "@/api/banners";
import  {server_URL} from "@/urlConfig.js";
export default {
  data() {
    return {
      data: []
    };
  },
  async created() {
    const res = await this.fetchData();
    this.data = res;
    console.log(res);
  },
  methods: {
    fetchData() {
      return getBanners().then(res => {
        let data = res.data;
        return data.map((item, index) => ({
          ...item,
          order: index + 1,
          midImg: server_URL + item.midImg,
          bigImg: server_URL + item.bigImg
        }));
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
