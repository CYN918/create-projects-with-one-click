<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="6" style="margin-right: 50px">
                  <el-form-item label="经销商名称：">
                    <el-input v-model="form.secondParty" clearable placeholder="请输入甲方或乙方公司名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="合同时间：">
                      <el-date-picker
                          :editable="false"
                          style="display: inline-block"
                          v-model="form.signTimeStart"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="date"
                          placeholder="选择日期">
                      </el-date-picker>
                      <span style="font-size: 14px;color: #606266;margin: 0 6px">-</span>
                      <el-date-picker
                          :editable="false"
                          style="display: inline-block"
                          v-model="form.signTimeEnd"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="date"
                          placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" style="margin-right: 50px">
                  <el-form-item label="联系电话：">
                    <el-input v-model="form.telephone" clearable placeholder="请输入甲方或乙方公司联系人电话"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="公司地址：">
                    <el-input v-model="form.address" clearable placeholder="请输入甲方或乙方公司地址"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1" class="btn_right">
                  <el-button type="primary" size="small"  @click="getContract">查询</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div>
      <div class="goods-fitter">
        <div class="search-wrapper">
          <h4 class="title">经销商合同列表</h4>
          <ul class="clearfix contract_list">
            <li class="contract_item" v-for="item in contracts">
              <div class="content">
                <div class="top">
                  <div class="mask">
                    <el-button @click="checkContractDetail(item.id)" class="btn" type="primary" size="small">查看合同详情</el-button>
                  </div>
                  <div class="label">{{item.secondParty.substring(0,4)}}</div>
                  <img class="icon_contract_file" :src="contractFile[item.fileType].imgUrl" alt="">
                  <img class="contract_img" src="@/common/images/apply/contract_img.jpg" alt="">
                  <div class="contract_sn">合同编号：{{item.contractSn}}</div>
                </div>
                <div class="bottom">
                  <div class="partyA">
                    <h5>甲方：{{item.firstParty}}</h5>
                    <p>联系人：{{item.firstParty}}</p>
                    <p>联系电话：{{item.firstPartyContact}}</p>
                    <p :title="item.firstPartyAddress">地址：{{item.firstPartyAddress}}</p>
                  </div>
                  <div class="partyB">
                    <h5>乙方：{{item.secondParty}}</h5>
                    <p>联系人：{{item.secondPartyContact}}</p>
                    <p>联系电话：{{item.secondPartyTelephone}}</p>
                    <p :title="item.secondPartyAddress">地址：{{item.secondPartyAddress}}</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqContractList, addContractInfoById } from '@/api/apply/index'

export default {
  name: "contact",
  data() {
    return {
      contracts: [],
      contractFile: [ // 合同文件类型图标
          {
              fileType: 0, // 合同为pdf文件
              imgUrl: require('@/common/images/apply/icon_pdf.png'),
          },
          {
              fileType: 1, // 合同为word文件
              imgUrl: require('@/common/images/apply/icon_word.png'),
          }
      ],
      form: { // 搜索条件
        secondParty: '', // 经销商名称
        signTimeStart: '', // 合同开始时间
        signTimeEnd: '', // 合同结束时间
        telephone: '', // 联系电话
        address: '', // 地址
      },
    };
  },
    mounted() {
      this.getFiledContractList()
    },
    methods: {
        // 查询获取合同
        getContract() {
          this.getFiledContractList()
        },
        // 获取归档合同列表
        async getFiledContractList() {
            const obj = {
                pageSize: 0,
            }
            const returnObj = Object.assign(obj, this.form) // 将归档查询属性
            returnObj.status = 4;
            const res = await reqContractList(returnObj)
            if (res.code === 200) {
              this.contracts = res.data.list
            }
        },
        // 查看合同详情
        checkContractDetail(id) {
            this.$router.push({
                name: 'DealerContractDetail',
                query: {
                    id,
                },
            })
        }
    }
};
</script>

<style lang="scss" scoped>
  @import "@/common/scss/variable.scss";
  .clearfix {
    zoom: 1;
  }
  .clearfix:after {
    display: block;
    content: '';
    clear: both;
  }
  /* 合同列表 */
  .contract_list{
    .contract_item {
      float: left;
      width:362px;
      height:416px;
      background:rgba(247,250,255,1);
      border:1px solid rgba(234,237,244,1);
      margin-right: 20px;
      margin-bottom: 24px;
      box-sizing: border-box;
      padding: 10px;
      .content {
        .top {
          overflow: hidden;
          position: relative;
          width:342px;
          height:160px;
          margin-bottom: 10px;
          .label {
            position: absolute;
            right: -22px;
            top: 8px;
            width: 88px;
            line-height: 28px;
            background: #4C86F4;
            text-align: center;
            font-size: 14px;
            color: #fff;
            z-index: 1;
            transform: rotate(45deg);
          }
          .contract_img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
          }
          .contract_sn {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 32px;
            line-height: 32px;
            background: #4C86F4;
            text-align: center;
            font-size: 14px;
            color: #fff;
          }
          .icon_contract_file {
            position: absolute;
            top: 50px;
            right: 0;
            left: 0;
            margin: auto;
            z-index: 1;
          }
          .mask {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.5);
            z-index: 2;
            text-align: center;
            .btn {
              vertical-align: middle;
            }
          }
          .mask:after {
            display: inline-block;
            height: 100%;
            content: '';
            vertical-align: middle;
          }
        }
        .top:hover > .mask {
          display: block !important;
        }
        .bottom {
          width:342px;
          height:226px;
          background:rgba(255,255,255,1);
          border:1px solid rgba(216,235,254,1);
          box-sizing: border-box;
          padding: 16px 0 0 16px;
          .partyA {
            border-bottom: 1px solid #D8EBFE;
            margin-bottom: 8px;
          }
          h5 {
            color: #4C86F4;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 8px;
          }
          p {
            color: #606266;
            font-size: 14px;
            margin-bottom: 8px;
            width: 324px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }

  /* 合同列表 */

  /* 搜索条件 */
  .goods-fitter {
    .vender {
      ul {
        li {
          float: left;
          height: 41px;
          padding: 0 10px;
          line-height: 41px;
          text-align: center;
          border: 1px solid transparent;
          font-size: 16px;
          color: #333;
          cursor: pointer;
          &.active {
            border: 1px solid #d7e0f1;
            border-bottom: 0;
            background-color: #fff;
            position: relative;
            &:after {
              position: absolute;
              content: "";
              left: 0;
              bottom: -1px;
              height: 1px;
              width: 100%;
              background: #fff;
            }
          }
          .image {
            display: inline-block;
            width: 30px;
            margin-right: 10px;
            font-size: 0;
            line-height: 40px;
            vertical-align: top;
            img {
              width: 100%;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .search-wrapper {
      padding: 20px;
      border: 1px solid rgb(215, 224, 241);
      background: #fff;
      .title {
        margin-left: -20px;
        font-size: 16px;
        font-weight: 400;
        color: #333;
        padding-left: 20px;
        line-height: 1.4;
        border-left: 4px solid $themeColor;
        margin-bottom: 16px;
      }
      .search-main {
      }
      .search-base {
      }
    }
    .text-space {
      text-align: center;
      color: #606266;
      font-size: 12px;
    }
    .el-select-width {
      max-width: 240px;
      margin-right: 5px;
    }
    .el-date-picker{
      max-width: 240px;
      margin-right: 5px;
    }
    .el-input-width {
      display: inline-block;
      max-width: 180px;
    }
    .btn-toggle {
      margin-left: 10px;
      font-size: 14px;
      color: $themeColor;
      cursor: pointer;
    }
  }
  /* 搜索条件 */

</style>
