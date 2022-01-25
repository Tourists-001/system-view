<template>
  <div class="addBlog-container">
    <!-- 文章标题 -->
    <div class="titleBlog">文章标题</div>
    <div style="marginBottom:15px">
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </div>
    <!-- 文章编辑 -->
    <div class="titleBlog">文章编辑</div>
    <Editor
      height="600px"
      :initialValue="form.editor"
      ref="toastuiEditor"
      :option="editorOptions"
    />
    <!-- 文章编辑 -->
    <div class="titleBlog">文章描述</div>
    <el-input
      type="textarea"
      placeholder="请输入内容"
      v-model="form.description"
      :rows="6"
    >
    </el-input>
    <!-- 图片上传 -->
    <div class="container">
      <div class="titleBlog">文章头图</div>
      <Upload v-model="form.thumb" />
      <!-- 下拉列表 -->
      <div class="titleBlog">请选择文章分类</div>
      <el-select v-model="form.select" slot="prepend" placeholder="请选择">
        <el-option
          :label="item.name"
          :value="item.id"
          v-for="item in blogType"
          :key="item.id"
        ></el-option>
      </el-select>
    </div>
    <!-- 发布文章 -->
    <el-button type="primary" style="margin:15px" @click="addArticle"
      >确认发布</el-button
    >
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/Upload";
import { getBlogType, addBlog } from "@/api/blogType.js";
import "@toast-ui/editor/dist/i18n/zh-cn.js";
export default {
  components: {
    Editor,
    Upload
  },
  data() {
    return {
      form: {
        title: "",
        editor: "",
        description: "",
        thumb: "",
        select: "vue" //选择分类
      },
      blogType: [], //存放博客分类
      editorOptions: {
        language: "ZH-CN"
      }
    };
  },
  created() {
    getBlogType().then(({ data }) => {
      this.blogType = data;
    });
  },
  methods: {
    addArticle() {
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      //组装对象
      let obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.select,
        toc: [], //不需要自己写，服务器会自动生成
        htmlContent: html,
        thumb: this.form.thumb
      };
      if (
        obj.title === "" ||
        obj.description === "" ||
        obj.htmlContent === ""
      ) {
        this.$message.error("请输入要添加的内容");
        return;
      } else {
        addBlog(obj).then(res => {
          console.log(res);
          if (!res.code) {
            this.$message.success("上传文章成功");
          } else {
            this.$message.error("服务器异常，文章上传失败");
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.addBlog-container {
  padding-left: 20px;
}
.titleBlog {
  margin: 15px 10px;
  font-size: 16px;
  font-weight: bold;
}
</style>
