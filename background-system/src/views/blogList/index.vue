<template>
  <div class="app-container">
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{
          scope.$index + (currentPage - 1) * eachPage + 1
        }}</template>
      </el-table-column>
      <el-table-column prop="title" label="文章名称" width="150" align="center">
        <template slot-scope="scope"
          ><el-popover
            placement="top-start"
            title="博客预览图"
            width="230"
            trigger="hover"
          >
            <el-image
              style="width: 200px; height: 200px"
              :src="scope.row.thumb"
              fit="cover"
              :preview-src-list="srcList"
            ></el-image>
            <a
              href="#"
              target="_blank"
              @click.prevent="goToTitleHandle(scope.row)"
              slot="reference"
              >{{ scope.row.title }}</a
            >
          </el-popover></template
        >
      </el-table-column>
      <el-table-column prop="description" label="文章描述" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column prop="description" label="浏览数" align="center">
        <template slot-scope="scope">{{ scope.row.scanNumber }}</template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="评论量"
        width="100"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.commentNumber }}</template>
      </el-table-column>
      <el-table-column prop="description" label="所属分类" align="center">
        <template slot-scope="scope">{{
           scope.row.category.name
        }}</template>
      </el-table-column>
      <el-table-column prop="description" label="创建日期" align="center">
        <template slot-scope="scope">{{
          formatDate(scope.row.createDate)
        }}</template>
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
              @click="editBlogHandle(scope.row)"
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
              @click="deleteBlog(scope.row)"
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="marginTop:35px"
      background
      layout="prev, pager, next,total, ->, sizes,jumper"
      :page-size="eachPage"
      :page-sizes="[5, 10]"
      :total="count"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      @prev-click="prevClickHandle"
      @next-click="nextClickHandle"
    >
    </el-pagination>
  </div>
</template>

<script>
import { findBlog, delOneBlog } from "@/api/blog.js";
import { formatDate } from "@/utils/tools.js";
import { server_URL, frontEnd_URL } from "@/urlConfig.js";
export default {
  data() {
    return {
      data: [], //存储数据详情
      srcList: [],
      eachPage: 5, //每页显示的条数
      currentPage: 1, //当前页
      totalPage: 0, //总页数
      count: 0, //数据的总条数
      pagerCurrentPage: 1 //分页栏的当前页码
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      findBlog(this.currentPage, this.eachPage).then(({ data }) => {
        this.data = data.rows;
        // console.log(this.data);
        for (let i of this.data) {
          // i.thumb = server_URL + i.thumb;
          this.srcList.push(i.thumb);
        }
        this.count = data.total;
        this.totalPage = Math.ceil(this.count / this.eachPage); //总共多少页
        //删除多条文章
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });
    },
    formatDate,
    //数据详情
    goToTitleHandle(blogInfo) {
      window.open(`${frontEnd_URL}/article/${blogInfo.id}`);
    },
    //删除
    deleteBlog(blogInfo) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delOneBlog(blogInfo.id).then(res => {
            // console.log(res);
            //重新获取数据，并提示删除成功
            this.fetchData();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          delOneBlog(blogInfo.id).catch(res => {
            this.$message({
              type: "danger",
              message: "服务器异常"
            });
          });
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //分页点击事件
    sizeChangeHandle(pageNum) {
      // console.log(pageNum);
      this.eachPage = parseInt(pageNum);
      this.currentPage = 1;
      this.fetchData();
    },
    currentChangeHandle(pageNum) {
      this.currentPage = parseInt(pageNum);
      this.fetchData();
    },
    prevClickHandle() {
      this.currentPage -= 1;
    },
    nextClickHandle() {
      this.currentPage += 1;
    },
    //编辑文章
    editBlogHandle(blogInfo){
      this.$router.push(`/editBlog/${blogInfo.id}`)
    }
  }
};
</script>

<style lang="scss" scoped></style>
