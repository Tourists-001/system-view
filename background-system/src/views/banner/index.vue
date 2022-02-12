<template>
  <div class="app-container">
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column prop="description" label="描述">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column label="中图预览" align="center" ref="container">
        <template slot-scope="scope">
          <el-image
            style="width: 200px;"
            :src="scope.row.midImg2"
            fit="fill"
            :preview-src-list="srcList"
            @click="showClick(scope.row)"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="大图预览" align="center" ref="container">
        <template slot-scope="scope">
          <el-image
            style="width: 200px;"
            :src="scope.row.bigImg2"
            fit="fill"
            :preview-src-list="srcList"
            @click="showClick(scope.row)"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑首页标语 -->
    <el-dialog title="请编辑" :visible.sync="dialogFormVisible" top="8vh">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <!-- 中图 -->
        <el-row>
          <el-col :span="12">
            <el-form-item ref="container">
              <Upload v-model="form.midImg" title="中图预览" />
            </el-form-item>
          </el-col>
          <!-- 大图 -->
          <el-col :span="12">
            <el-form-item>
              <Upload v-model="form.bigImg" title="大图预览" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = true">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanners, setBanner } from "@/api/banner.js";
import { server_URL } from "@/urlConfig.js";
import Upload from "@/components/Upload";
export default {
  components: {
    Upload
  },
  data() {
    return {
      data: [], // 存储数据
      form: {
        // title: "",
        // description: "",
        // bigImg2: "",
        // midImg2: ""
      },
      dialogFormVisible: false,
      formLabelWidth: "100px",
      srcList: []
    };
  },
  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      getBanners().then(res => {
        this.data = res.data;
        // for (var item of this.data) {
        //   item.midImg2 = server_URL + item.midImg;
        //   item.bigImg2 = server_URL + item.bigImg;
        // }
      });
    },
    handleClick(bannerInfo) {
      this.form = { ...bannerInfo };
      this.dialogFormVisible = true;
    },
    editBannerConfirm() {
      //从表单拿到用户修改的数据，发送给服务器
      //因为api文档要求三个都发过去，哪怕只改一项
      let arr = [...this.data];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == this.form.id) {
          arr[i] = this.form;
        }
      }
      setBanner(arr).then(res => {
        this.dialogFormVisible = false;
        this.$message({
          message: "修改成功",
          type: "success"
        });
        this.fetchData();
      });
    },
    showClick(res) {
      let srcList = [res.bigImg2, res.midImg2];
      if (srcList.length < 2) {
        this.$message.error("无法加载图片");
      }
      this.srcList = srcList;
    }
  }
};
</script>

<style lang="scss" scoped></style>
