<template>
  <div class="app-container">
    <!-- 搜索框 -->
    <div style="marginTop:15px">
      <el-input
        placeholder="请输入要添加的内容，左边选择该分类的等级"
        v-model="input"
        class="input-with-select blogAddInput"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-input>
      <el-button
        type="primary"
        style="marginLeft:10px"
        @click="addBlogTypeHandle"
        >添加</el-button
      >
    </div>
    <!-- 表格 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="name" label="博客类别" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column prop="articleCount" label="文章数量" align="center">
        <template slot-scope="scope">{{ scope.row.articleCount }}</template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              @click="editBlogTypeHandle(scope.row)"
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              @click="deleteBlogTypeHandle(scope.row)"
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹框 -->
    <el-dialog title="详细信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="博客类别" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章数量" :label-width="formLabelWidth">
          <el-input v-model="form.order" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditBlogTypeHandle()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBlogType,
  addBlogType,
  delBlogType,
  findOneBlogType,
  updateOneBlogType
} from "@/api/blogType.js";
export default {
  data() {
    return {
      data: [],
      input: "",
      select: "1",
      form: {
        name: "",
        order: ""
      },
      listLoading: false,
      dialogFormVisible: false,
      formLabelWidth: "200px"
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getBlogType().then(({ data }) => {
        this.data = data;
        this.listLoading = false;
      });
    },
    //添加文字分类
    addBlogTypeHandle() {
      if (this.input) {
        addBlogType({ name: this.input, order: this.select }).then(() => {
          //添加成功之后,重新请求数据
          this.fetchData();
          this.$message.success("添加成功");
          this.input = "";
        });
      } else {
        this.$message.error("请输入文章分类内容");
      }
    },
    editBlogTypeHandle({ id }) {
      findOneBlogType(id).then(({ data }) => {
        this.form = data;
      });
      this.dialogFormVisible = true;
    },
    //修改数据
    confirmEditBlogTypeHandle() {
      updateOneBlogType({ id: this.form.id, data: this.form.data }).then(
        res => {
          this.fetchData()
          this.$message.success("修改成功");
          this.dialogFormVisible = false;
        }
      );
    },
    //删除数据
    deleteBlogTypeHandle({ id }) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delBlogType({ id }).then(res => {
            //重新获取数据，并提示删除成功
            this.fetchData();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.blogAddInput {
  width: 400px;
  margin-bottom: 20px;
}
</style>
