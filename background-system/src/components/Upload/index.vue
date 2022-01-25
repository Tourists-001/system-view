<template>
  <div class="upLoad-container">
    <!-- 标题 -->
    <div class="block">{{ title }}</div>
    <!-- 上传组件 -->
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :headers="headers"
    >
      <img v-if="value" :src="imgUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { server_URL } from "@/urlConfig.js";

export default {
  props: ["value", "title"],
  computed: {
    imgUrl() {
      if (this.value) {
        return server_URL + this.value;
      }
    },
    headers() {
      return {
        Authorization: "Bearer " + localStorage.getItem("adminToken")
      };
    }
  },
  methods: {
    handleAvatarSuccess(res) {
      if (!res.code && res.data) {
        this.$emit("input", res.data);
      } else {
        this.$message.error("上传错误");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
  font-weight: bold;
  // text-align: center;
}
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
.el-upload.el-upload--text {
  border: 1px solid black;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
