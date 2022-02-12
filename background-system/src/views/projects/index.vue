<template>
  <div class="projects-container">
    <!-- 数据表格 -->
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        v-loading="listLoading"
        element-loading-text="加载数据中"
        fit
        highlight-current-row
      >
        <el-table-column
          fixed
          prop="date"
          label="序号"
          width="60"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <!-- //项目名称 -->
        <el-table-column fixed label="项目名称" width="150" align="center">
          <template slot-scope="scope">
            <a :href="scope.row.url" target="_blank" class="proName">{{
              scope.row.name
            }}</a>
          </template>
        </el-table-column>
        <!-- 项目描述 -->
        <el-table-column fixed label="项目名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.description.toString() }}
          </template>
        </el-table-column>
        <!-- 预览图 -->
        <el-table-column fixed label="项目名称" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 150px; height: 150px"
              :src="scope.row.thumb2"
              fit="cover"
              :preview-src-list="srcList"
            ></el-image>
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <!-- github -->
            <el-tooltip
              class="item"
              effect="dark"
              content="gitHub"
              placement="top"
              :hide-after="2000"
            >
              <el-button
                @click="openGitHubHandle(scope.row)"
                type="info"
                icon="icon-github iconfont"
                circle
                size="mini"
              ></el-button>
            </el-tooltip>
            <!-- 编辑 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
              :hide-after="2000"
            >
              <el-button
                @click="deleteProjectHandle(scope.row)"
                type="danger"
                icon="el-icon-delete"
                circle
                size="mini"
              ></el-button>
            </el-tooltip>
            <!-- 删除 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
              :hide-after="2000"
            >
              <el-button
                @click="editProjectHandle(scope.row)"
                type="primary"
                icon="el-icon-edit"
                circle
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 编辑对话框 -->
    <el-dialog
      title="请编辑该项目的信息"
      :visible.sync="dialogFormVisible"
      fullscreen
    >
      <el-form :model="form">
        <el-form-item label="项目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目描述(每一项请以逗号分割)">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input v-model="form.github"></el-input>
        </el-form-item>
        <el-form-item>
          <Upload v-model="form.thumb" title="预览图" />
        </el-form-item>

        <el-form-item label="排序等级">
          <el-select v-model="form.order" placeholder="分类等级">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeProjectHandle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProject, setProject, delProject } from "@/api/project.js";
import { server_URL } from "@/urlConfig.js";
import Upload from "@/components/Upload";
export default {
  components: {
    Upload
  },
  data() {
    return {
      tableData: [],
      listLoading: false,
      srcList: [],
      form: {
        name: "",
        description: "",
        url: "",
        github: "",
        thumb: "",
        order: 1
      },
      dialogFormVisible: false
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getProject().then(({ data }) => {
        this.tableData = data;
        this.listLoading = false;
        for (let i of this.tableData) {
          // i.thumb2 = server_URL + i.thumb;
          this.srcList.push(i.thumb2);
        }
      });
    },
    openGitHubHandle(projectInfo) {
      window.open(projectInfo.github)
    },
    deleteProjectHandle({ id }) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delProject(id).then(res => {
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
    editProjectHandle(data) {
      this.form = { ...data, description: data.description.toString() };
      this.dialogFormVisible = true;
    },
    changeProjectHandle() {
      let obj = {
        description: this.form.description.split(','), // 项目描述段落
        name: this.form.name, // 项目名称
        url: this.form.url, // 项目效果请求地址
        github: this.form.github, // 项目github地址
        thumb: this.form.thumb, // 缩略图，项目截图
        order: +this.form.order // 排序
      };
      setProject(this.form.id, obj).then(() => {
        this.$message.success("修改成功");
        this.fetchData()
        this.dialogFormVisible = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.proName:hover {
  color: red;
}
</style>
