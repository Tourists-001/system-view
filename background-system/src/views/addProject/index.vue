<template>
  <div class="addProject-container">
    <div class="block">项目名称</div>
    <div style="marginBottom:15px">
      <el-input v-model="form.name" placeholder="请输入项目的名称"></el-input>
    </div>
    <!-- 项目描述 -->
    <div class="block">项目描述</div>
    <div style="marginBottom:15px">
      <el-input
        v-model="form.description"
        placeholder="请输入项目的描述"
      ></el-input>
    </div>
    <!-- 项目连接 -->
    <div class="block">项目链接</div>
    <div style="marginBottom:15px">
      <el-input v-model="form.url" placeholder="请输入项目的链接"></el-input>
    </div>
    <!-- 项目连接 -->
    <div class="block">项目github地址</div>
    <div style="marginBottom:15px">
      <el-input
        v-model="form.github"
        placeholder="请输入项目的github地址"
      ></el-input>
    </div>
    <!-- 项目预览图 -->
    <div style="marginBottom:15px">
      <Upload v-model="form.thumb" title="项目预览图" />
    </div>
    <!-- 项目等级 -->
    <div class="block">项目等级</div>
    <div style="marginBottom:15px">
      <el-select v-model="form.order" placeholder="分类等级">
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" value="3"></el-option>
        <el-option label="4" value="4"></el-option>
        <el-option label="5" value="5"></el-option>
      </el-select>
    </div>
    <el-button type="success" plain @click="addProjectHandle"
      >添加项目</el-button
    >
  </div>
</template>

<script>
import Upload from "@/components/Upload";
import { addProject } from "@/api/project.js";
export default {
  components: {
    Upload
  },
  data() {
    return {
      form: {
        description: "",
        github: "",
        name: "",
        order: 1,
        thumb: "",
        url: ""
      }
    };
  },
  methods: {
    addProjectHandle() {
      let form = { ...this.form };
      if (!form.name && !form.description & !form.url & !form.github) {
        this.$message.error("请输入项目信息");
      } else {
        form.description = form.description.split(",");
        form.order = +form.order;
        addProject(form).then(res => {
          this.$message.success("添加成功");
          this.$router.push('/projectsList')
        });
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.addProject-container {
  margin: 0 20px 0 20px;
}
.block {
  margin: 10px 0;
}
</style>
