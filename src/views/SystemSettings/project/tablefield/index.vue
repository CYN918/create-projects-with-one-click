<template>
  <div class="margin" v-loading="loading" style="min-height: 700px;">
    <div class="mcard">
      <div class="top_div" style="position: relative;">
        <el-tooltip class="item" effect="dark" content="设置">
          <el-button
            type="text"
            size="medium"
            icon="el-icon-s-tools"
            style="position: absolute; right: 8px;"
            @click="moduleSettingDialog = true"
          ></el-button>
        </el-tooltip>
        <span
          v-for="(projectModule, index) in projectModules"
          :key="index"
          :class="{'color_span': index == currnetModule}"
          @click="loadModuleTableData(index)"
        >
          <i class="el-icon-menu"></i>
          {{ projectModule.moduleName }}
        </span>
      </div>
    </div>
    <el-form class="check_div" v-if="projectModules.length">
      <el-form-item label="适用的项目类型：">
        <el-checkbox-group
          v-model="projectModules[currnetModule].applyIds"
          @change="editModuleTable(projectModules[currnetModule],true)"
        >
          <el-checkbox
            :label="item.applyId"
            v-for="item in checkArr"
            :key="item.applyId"
          >{{item.applyName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div class="mcard">
      <div class="title">
        表字段配置
        {{ databaseConfig && `(数据库 ${databaseConfig.dbIp}:${databaseConfig.dbPort})` }}
      </div>
      <div>
        <div class="select_div" v-for="(database, index) in databaseArr" :key="database.name">
          <div class="top_btn">
            <el-checkbox
              :indeterminate="database.checkedCities.length != database.data.length && database.checkedCities.length > 0"
              :checked="database.checkedCities.length == database.data.length"
              @change="handleCheckAllChange(database)"
            ></el-checkbox>
            <div class="select_btn">{{ database.name }}</div>
            <span class="icfont_span" v-if="database.show" @click="database.show = false">
              <i class="iconfont icon-shouqi"></i> 收起
            </span>
            <span class="icfont_span" v-else @click="database.show = true">
              <i class="iconfont icon-zhankai"></i> 展开
            </span>
          </div>
          <el-collapse-transition>
            <div v-show="database.show">
              <div class="line" style="margin-left: 3%;"></div>
              <div class="checkbox_div">
                <el-checkbox-group v-model="database.checkedCities" key="database.name">
                  <el-row>
                    <el-col :span="8" v-for="table in database.data" :key="table.Name">
                      <el-checkbox :label="table.Name">
                        {{ `${table.Comment || "未命名"} (${table.Name})` }}
                        <i
                          class="iconfont icon-biao"
                        ></i>
                      </el-checkbox>
                    </el-col>
                  </el-row>
                </el-checkbox-group>
              </div>
            </div>
          </el-collapse-transition>
          <div class="line_div" v-if="index != databaseArr.length-1" style="margin-left: 3%;"></div>
        </div>
      </div>

      <div class="btn" style="margin-left:45%; margin-top: 50px;">
        <el-button type="primary" @click="saveModuleTables" size="small">保存</el-button>
        <el-button type="primary" @click="loadModuleTableData(currnetModule)" size="small">重置</el-button>
      </div>
    </div>

    <el-dialog title :visible.sync="moduleSettingDialog" width="1080px">
      <div class="dilog">
        <el-table :data="projectModules" border align="center" style="width: 100%">
          <el-table-column fixed prop="id" label="ID" align="center" width="150"></el-table-column>
          <el-table-column prop="moduleName" label="模块名称" align="center" width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.moduleName" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="sortOrder" label="排序" align="center" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sortOrder" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="introduction" label="介绍" align="center" width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.introduction" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="描述" align="center" width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <template v-if="scope.row.id">
                <el-button type="text" size="small" @click="editModuleTable(scope.row)">修改</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="deleteProjectModule(scope.$index, scope.row)"
                >删除</el-button>
                <el-button
                  type="text"
                  size="small"
                  v-if="projectModules.length == scope.$index + 1"
                  @click="projectModules.push({})"
                >添加</el-button>
              </template>
              <template v-else>
                <el-button type="text" size="small" @click="saveProjectModule(scope.row)">保存</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" size="small" @click="moduleSettingDialog = false">取 消</el-button>
        <el-button type="primary" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  findDatabaseConfig,
  findAllDatabase,
  findAllTable,
  saveApplyModules,
  editApplyModule,
  saveAllModuleTables,
  deleteApplyModule,
  findProjectModules,
  findDatabaseByModuleId
} from "@/api/systemsettings/index";
import { getAllapply } from "@/api/application/index";
export default {
  name: "TableFieldSetting",
  data() {
    return {
      loading: true,
      moduleSettingDialog: false,
      currnetModule: 0,

      checkList: [],
      checkArr: [],
      projectModules: [],
      databaseArr: [],
      databaseConfig: null
    };
  },
  watch: {
    moduleSettingDialog(value) {
      if (!value) this.findProjectModules();
    }
  },
  methods: {
    handleCheckAllChange(database) {
      if (database.checkedCities.length == database.data.length) {
        database.checkedCities = [];
      } else {
        database.checkedCities = database.data.map(item => item.Name);
      }
    },

    /**
     * 加载数据库配置
     */
    async findDatabaseConfig() {
      const { data } = await findDatabaseConfig();
      this.databaseConfig = data;
    },

    /**
     * 加载数据库列表
     */
    async initDatabaseList() {
      const configId = this.databaseConfig.id;
      const { data } = await findAllDatabase(configId);

      //获取子集数据
      let databaseArr = [];
      for (var item of data) {
        const database = item.Database;
        const { data } = await findAllTable(configId, database);
        databaseArr.push({
          name: database,
          show: true,
          data: data,
          checkAll: false,
          checkedCities: [],
          isIndeterminate: false
        });
      }

      this.databaseArr = databaseArr;
    },

    /**
     * 获取项目模块
     */
    async findProjectModules() {
      const { data } = await findProjectModules();
      this.projectModules = data;
    },

    /**
     * 保存经销商模块
     */
    async saveProjectModule(data) {
      try {
        await saveApplyModules({
          ...data,
          moduleType: 0
        });
      } finally {
        this.findProjectModules();
      }
    },

    /**
     * 删除项目模块
     */
    async deleteProjectModule(index, data) {
      await this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });

      const res = await deleteApplyModule(data.id);
      if (res.code == 200) {
        this.projectModules.splice(index, 1);
      }
    },

    /**
     * 修改应用模块数据库表数据
     */
    async editModuleTable(params, type) {
      if (!type) {
        await this.$confirm("您确定修改该模块的数据库表?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
      }
      const res = await editApplyModule(params.id, params);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "修改成功!"
        });
      }
    },

    /**
     * 加载应用模块的数据库
     */
    async loadModuleTableData(currnetModule) {
      const databaseArr = this.databaseArr;
      const moduleId = this.projectModules[currnetModule].id;

      try {
        const { data } = await findDatabaseByModuleId(moduleId);

        if (data && data.length) {
          for (var database of databaseArr) {
            database.checkedCities = [];
            for (var moduleTable of data) {
              if (database.name == moduleTable.databaseName) {
                database.checkedCities.push(moduleTable.tableName);
              }
            }
          }

          this.databaseArr = databaseArr.sort((db1, db2) => {
            const length1 = db1.checkedCities.length;
            const length2 = db2.checkedCities.length;
            return length2 - length1;
          });
        } else {
          await this.initDatabaseList();
        }
      } finally {
        this.currnetModule = currnetModule;
      }
    },

    /**
     * 保存应用模块数据库表数据
     */
    async saveModuleTables() {
      await this.$confirm("您确定保存该模块的数据库表?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });

      const moduleId = this.projectModules[this.currnetModule].id;
      const configId = this.databaseConfig.id;
      const params = this.databaseArr
        .filter(item => item.checkedCities.length > 0)
        .map(item => ({
          databaseName: item.name,
          tableName: item.checkedCities
        }));

      const data = await saveAllModuleTables(configId, moduleId, params);
      if (data.code == 200) {
        this.$message({
          type: "success",
          message: "操作成功!"
        });
      }
    },

    /**
     * 获取对应活动
     */
    async getAllapply() {
      const { data } = await getAllapply();
      this.checkArr = data.list;
    }
  },
  async mounted() {
    await this.findDatabaseConfig();
    await this.findProjectModules();
    await this.getAllapply();
    await this.initDatabaseList();
    await this.loadModuleTableData(this.currnetModule);

    this.loading = false;
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.form-wrapper {
  margin-top: 30px;
  width: 600px;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
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
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
}
.margin {
  margin-top: 0 !important;
  padding-left: 0 !important;
  border: 1px solid rgba(214, 222, 239, 1);
}
.select_div {
  .top_btn {
    padding-left: 100px;
    padding-top: 20px;
    position: relative;
    .iconfont {
      color: #66b1ff;
    }
    .icfont_span {
      position: absolute;
      right: 150px;
      cursor: pointer;
    }
  }
  .checkbox_div {
    padding-left: 150px;
  }
  .select_btn {
    margin-left: 25px;
    width: 88px;
    height: 32px;
    background: rgba(76, 134, 244, 1);
    border-radius: 3px;
    text-align: center;
    line-height: 32px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    position: relative;
    top: 7px;
  }
  .line {
    width: 94%;
    margin: 20px 0;
    height: 1px;
    border: 1px dashed rgba(177, 213, 252, 1);
    margin-bottom: 10px;
  }
  .line_div {
    width: 94%;
    height: 10px;
    margin-top: 30px;
    background: rgba(245, 248, 252, 1);
  }
}
.el-checkbox {
  margin-top: 20px;
}
.icon-biao {
  color: #5dc349;
}
.dilog .el-checkbox {
  width: 50%;
  margin-right: 0;
  padding-left: 30px;
}
.top_div {
  height: 49px;
  background: rgba(240, 243, 250, 1);
  border: 1px solid rgba(234, 237, 244, 1);
  display: flex;
  align-items: center;
  span {
    display: inline-block;
    width: 193px;
    height: 22px;
    display: flex;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(144, 147, 153, 1);
    align-items: center;
    justify-content: center;
    border-right: 1px solid #c3c6cb;
    cursor: pointer;
  }
  i {
    margin-right: 10px;
  }
}
.top_div span:last-child {
  border: none;
}
.color_span {
  color: #4c86f4 !important;
}
.check_div {
  background: white;
  padding-left: 20px;
  .el-checkbox {
    margin-top: unset;
  }
  .el-form-item {
    margin-bottom: unset;
  }
}
</style>
