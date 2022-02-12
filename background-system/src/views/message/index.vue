<template>
  <div class="comment-container">
    <template>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column
          fixed
          prop="date"
          label="序号"
          width="50"
          align="center"
        >
          <template slot-scope="scope">{{ scope.$index + (currentPage - 1) * eachPage + 1 }}</template>
        </el-table-column>
        <el-table-column prop="name" label="头像" width="120" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.avatar"
              fit="cover"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.nickname }}</template>
        </el-table-column>
        <el-table-column prop="name" label="留言内容" align="center">
          <template slot-scope="scope">{{ scope.row.content }}</template>
        </el-table-column>
        <el-table-column prop="name" label="留言时间" align="center">
          <template slot-scope="scope">{{
            formatDate(scope.row.createDate)
          }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.row)"
              type="danger"
              size="small"
              icon="el-icon-delete"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

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
import { getMessage, delMessage } from "@/api/message.js";
import { formatDate } from "@/utils/tools.js";
import {server_URL} from "@/urlConfig.js";
export default {
  data() {
    return {
      tableData: [],
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
      getMessage(this.currentPage, this.eachPage).then(({ data }) => {
        // console.log(data);
        // for (const i of data.rows) {
        //     i.avatar = server_URL + i.avatar
        // }
        // console.log(data.rows);
        this.tableData = data.rows;
        this.count = data.total; //计算总条数
        this.totalPage = Math.ceil(this.count / this.eachPage); //总页数
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.tableData;
          this.fetchData();
        }
      });
    },
    formatDate,
    deleteRow(data) {
      this.$confirm("删除评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delMessage(data.id).then(res => {
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
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 分页的点击时间
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
