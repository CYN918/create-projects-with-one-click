<template>
  <div class="margin" v-loading="loading">
    <div class="mcard">
      <div class="title">菜单配置</div>
      <div>
           <table id="table1" class="authority-table" border>
            <thead>
              <tr class="table__tr-wrapper">
                <th width="180">一级菜单</th>
                <th width="180">二级菜单</th>
                <th>功能权限及隐私字段</th>
              </tr>
            </thead>
            <tr v-for="item1 in menuTree" :key="item1.id">
              <td class="solid-td">
                <el-checkbox
                  v-model="item1.checked"
                  @change="onChangeAuthorityCheckbox($event, item1)"
                >{{item1.menuName}}</el-checkbox>
              </td>
              <td class="solid-td" colspan="2" width="180">
                <table class="table2">
                  <template v-if="item1.children && item1.children.length">
                    <tr v-for="item2 in item1.children" :key="item2.id">
                      <td width="179" class="solid-td">
                        <el-checkbox
                          v-model="item2.checked"
                          @change="onChangeAuthorityCheckbox($event, item2); item1.checked = true;"
                        >{{item2.menuName}}</el-checkbox>
                      </td>
                      <td>
                        <table class="table3">
                          <tr v-for="item3 in item2.children" :key="item3.id">
                            <td>
                              <el-checkbox
                                v-model="item3.checked"
                                @change="onChangeAuthorityCheckbox($event, item3); item1.checked = true; item2.checked = true;"
                              >{{item3.menuName}}</el-checkbox>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td class="solid-td" width="179"></td>
                      <td></td>
                    </tr>
                  </template>
                </table>
              </td>
            </tr>
          </table>
          <div class="bottom_b">
            <span slot="footer" class="dialog-footer">
              <el-button type="danger" @click="dealersMenu" size="small">取 消</el-button>
              <el-button type="primary" size="small" @click="dealersMenuSave">确 定</el-button>
            </span>
          </div>
        
      </div>
    </div>
  </div>
</template>
<script>
import { getAllMenu } from "@/api/permissions/index";

export default {
  name: "SelfSetting",
  data() {
    return {
      loading: true,
      menuList: [],
      menuTree: null,
    };
  },
  methods: {
    handleCheckAllChange(val, data) {
      data.checkedCities = val ? data.data : [];
      data.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value, item) {
      let checkedCount = value.length;
      item.checkAll = checkedCount === item.data.length;
      item.isIndeterminate =
        checkedCount > 0 && checkedCount < item.data.length;
    },
    async initMenuData() {
      const { data } = await getAllMenu();
      console.log(data)
      this.menuTree = data[0].children
      // if (data && data.length > 0) {
      //   this.menuList = data[0].children.map(item => {
      //     return {
      //       menuName: item.menuName,
      //       show: true,
      //       children: item.children,
      //       checkAll: false,
      //       checkedCities: [],
      //       isIndeterminate: false
      //     };
      //   });
      // }
    },
    // 菜单选择
      onChangeAuthorityCheckbox(e, item) {
      if (!this.initMenuData) return;
      const selectCheckbox = (children, checked) => {
        if (children && children.length) {
          children.forEach(item => {
            item.checked = checked;
            selectCheckbox(item.children, checked);
          });
        }
      };
      selectCheckbox(item.children, e);
    },
    // 取消
    dealersMenu(){
        
    },
    // 确定
    dealersMenuSave(){
        const findAuthorities = menuTree =>
        menuTree.reduce((arr, item) => {
          if (
            item.checked &&
            item.permission != null &&
            item.permission != ""
          ) {
            arr.push(item.permission);
          }
          if (item.children && item.children.length) {
            arr = arr.concat(findAuthorities(item.children));
          }
          return arr;
        }, []);
      const authorities = findAuthorities(this.menuTree);
      console.log(authorities)
    }
  },
  async mounted() {
    await this.initMenuData();
    this.loading = false;
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.margin {
  margin-top: 0 !important;
  padding-left: 0 !important;
  border: 1px solid rgba(214, 222, 239, 1);
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}
.table__tr-wrapper {
  background: RGBA(247, 250, 255, 1);
  th {
    border: 1px solid #f0f0f0;
  }
}
.authority-table tr td:first-child {
  text-align: left;
  padding-left: 20px;
}
.authority-table .solid-td {
  border: 1px solid #f0f0f0;
}

table th,
td {
  height: 35px;
  line-height: 35px;
}
.table2 tr td:nth-child(1) {
  border-left: 0;
  border-bottom: 0;
  border-top: 0;
}
.table2 tr:nth-child(1) td {
  border-top: 0;
}
.table3 {
  display: flex;
  flex-wrap: wrap;
}
.bottom_b{
  text-align: center;
  margin: 20px 0;
}
</style>
