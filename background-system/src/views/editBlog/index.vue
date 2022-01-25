<template>
  <div class="addBlog-container">
    <!-- 文章标题 -->
    <div class="titleBlog">文章标题</div>
    <div style="marginBottom:15px">
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </div>
    <!-- 文章编辑 -->
    <div class="titleBlog">文章编辑</div>
    <Editor height="600px" :initialValue="form.editor" ref="toastuiEditor" />
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
import { editBlog, getBlogType, findOneBlog } from "@/api/blogType.js";
export default {
  components: {
    Editor,
    Upload
  },
  data() {
    return {
      id: "", //存储传递过来的id
      form: {
        title: "",
        editor: "",
        description: "",
        thumb: "",
        select: "vue" //选择分类
      },
      blogType: [] //存放博客分类
    };
  },
  created() {
    getBlogType().then(({ data }) => {
      this.blogType = data;
    });
    //刚开始的时候获取id，根据id拿文章
    this.id = this.$route.params.id;
    findOneBlog(this.id).then(({ data }) => {
      this.form = data;
      this.form.select = data.category.id === null ? "" : data.category.name;
      this.$refs.toastuiEditor.invoke("setHTML", data.htmlContent);
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
        editBlog({ id: this.form.id, data:obj }).then(res => {
          console.log(res);
          this.$router.push(`/blogList`)
            this.$message.success("上传文章成功");
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
