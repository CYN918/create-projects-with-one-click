<template>
  <div class="margin">
    <el-form ref="form" :model="form" :rules="rules" label-width="260px" size="small">
    <div class="mbottom">
      <div class="goods-fitter">
        <div class="search-wrapper">
            <h4 class="title">插件信息</h4>
            <el-form-item label="插件版本:">
                <el-input  v-model="form.name" style='width:600px' placeholder="请输入插件版本"></el-input>
                <el-button type="primary" size="small" class="btn">自动更新</el-button>
                <el-button type="primary" size="small" class="btn">安装数据</el-button>
            </el-form-item>
            <el-form-item label="授权码:">
                <el-input  v-model="form.name" style='width:600px' placeholder="请输入授权码"></el-input>
                <el-button type="primary" size="small" class="btn">验证授权</el-button>
            </el-form-item>
            <el-form-item label="可用功能:">
                <el-checkbox-group v-model="checkList">
                    <el-checkbox label="常规采集/淘客API采集"></el-checkbox>
                    <el-checkbox label="店铺采集"></el-checkbox>
                    <el-checkbox label="批量ID采集"></el-checkbox>
                    <el-checkbox label="按分类采集" ></el-checkbox>
                    <el-checkbox label="本地化" ></el-checkbox>
                    <el-checkbox label="工具箱"></el-checkbox>
                    <el-checkbox label="自定义" ></el-checkbox>
                    <el-checkbox label="代购" ></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="当日流量:">
                <el-input  v-model="form.name" style='width:600px' placeholder="请输入当日流量"></el-input>
            </el-form-item>
        </div>
      </div>
    </div>

    <div class="mbottom">
      <div class="goods-fitter">
        <div class="search-wrapper">
            <h4 class="title">淘宝客设置</h4><br/>
            <el-form-item label="App_key:">
                <el-input  v-model="form.name" style='width:600px' placeholder="请输入App_key"></el-input>
            </el-form-item>
            <el-form-item label="App_Secret:">
                <el-input  v-model="form.name" style='width:600px' placeholder="请输入App_Secret"></el-input>
            </el-form-item>
            <el-form-item label="淘点金PID:">
                <el-input  v-model="form.name" style='width:600px' placeholder="请输入淘点金PID"></el-input>
            </el-form-item>
        </div>
      </div>
    </div>

    <div class="mbottom">
      <div class="goods-fitter">
        <div class="search-wrapper">
            <h4 class="title">本地化设置</h4><br/>
            <el-form-item label="图片空间:">
                <el-select v-model="form.region" placeholder="请选择数据排序">
                <el-option label="本地服务器" value="0"></el-option>
                <el-option label="七牛云存储" value="1"></el-option>
                <el-option label="OSS云存储" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="access_key:">
                <el-input  v-model="form.name" style='width:600px' placeholder="请输入access_key"></el-input>
            </el-form-item>
            <el-form-item label="secret_key:">
                <el-input  v-model="form.name" style='width:600px' placeholder="请输入secret_key"></el-input>
            </el-form-item>
            <el-form-item label="域名:">
                <el-input  v-model="form.name" style='width:600px' placeholder="请输入域名"></el-input>
            </el-form-item>
            <el-form-item label="空间名:">
                <el-input  v-model="form.name" style='width:600px' placeholder="请输入空间名"></el-input>
            </el-form-item>
            <el-form-item label="相关说明:">
                <el-input  v-model="form.name" style='width:600px' placeholder="填写阿里云OSS提供的key、域名和空间名"></el-input>
            </el-form-item>
            <el-form-item label="申请方法:">
                <el-button type="primary" size="small" class="btn">点击这里</el-button>
                 <span class="gaunjianzi">本功能需要另付费开通，请联系采集插件客服购买</span>
            </el-form-item>
            <el-form-item label="本地化选项:">
                <el-checkbox-group v-model="checkList">
                    <el-checkbox label="详情图"></el-checkbox>
                    <el-checkbox label="商品主图"></el-checkbox>
                    <el-checkbox label="相册图"></el-checkbox>
                    <el-checkbox label="属性图" ></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </div>
      </div>
    </div>

    <div class="mbottom">
      <div class="goods-fitter">
        <div class="search-wrapper">
            <h4 class="title">其他设置</h4><br/>
            <el-form-item label="内存设置:">
                <el-input :disabled="true" v-model="form.name" style='width:600px' placeholder="0"></el-input>
                <span class="gaunjianzi">设置采集时可用的服务器内存，某些服务器已内定内存，此处设置无效</span>
            </el-form-item>
            <el-form-item label="价格变动:">
                <el-input  v-model="form.name" style='width:600px' placeholder="请输入内容"></el-input>
                <span class="gaunjianzi">在数字前面写[ + - * / ]表示算法，如原价调高1.2倍写成*1.2</span>
            </el-form-item>
            <el-form-item label="默认下架:">
                <el-checkbox v-model="checked">下架（勾选后采集的商品为下架状态）</el-checkbox>
            </el-form-item>
            <el-form-item label="去淘宝购买:">
                <el-checkbox v-model="checked">默认打叉（勾选后采集的商品将设置为：不去淘宝购买，否则自动设置）</el-checkbox>
            </el-form-item>
            <el-form-item label="商品货号:">
                <el-checkbox v-model="checked">提取淘宝货号（勾选后自动提取淘宝商品的货号、款号）</el-checkbox>
            </el-form-item>
            <el-form-item label="商品品牌:">
                <el-checkbox v-model="checked">不采集品牌（勾选后不采集商品的品牌）</el-checkbox>
            </el-form-item>
            <el-form-item label="商品主图:">
                <el-checkbox v-model="checked">去掉第一张主图</el-checkbox>
            </el-form-item>
            <el-form-item label="商品货品:">
                <el-checkbox v-model="checked">不采集货品（勾选后不生成商品的货品）</el-checkbox>
            </el-form-item>
            <el-form-item label="是否采集库存:">
                <el-checkbox v-model="checked">不采集库存</el-checkbox>
            </el-form-item>
            <el-form-item label="是否采集佣金:">
                <el-checkbox v-model="checked">采集佣金</el-checkbox>
            </el-form-item>
            <el-form-item label="更新选项:">
                <el-checkbox-group v-model="checkList">
                    <el-checkbox label="标题"></el-checkbox>
                    <el-checkbox label="品牌"></el-checkbox>
                    <el-checkbox label="价格"></el-checkbox>
                    <el-checkbox label="描述" ></el-checkbox>
                    <el-checkbox label="主图"></el-checkbox>
                    <el-checkbox label="相册"></el-checkbox>
                    <el-checkbox label="销量"></el-checkbox>
                    <el-checkbox label="库存" ></el-checkbox>
                    <el-checkbox label="佣金" ></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="评论生成订单:">
                <el-checkbox v-model="checked">生成订单 (勾选后采集评论同时生成订单和购买的用户（购买记录）)</el-checkbox>
            </el-form-item>
            <el-form-item label="淘宝客商品:">
                <el-checkbox v-model="checked">只采集淘宝客 (勾选后只采集淘宝客商品)</el-checkbox>
            </el-form-item>
        </div>
      </div>
    </div>
            <el-form-item label="">
                <el-button type="primary" size="small">保存设置</el-button>
            </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'

export default {
    data () {
    return {
        checkList: [],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
      
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
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
      color: 3333;
      padding-left: 10px;
      line-height: 1.4;
      border-left: 4px solid $themeColor;
      margin-bottom: 10px;
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
    max-width: 130px;
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
.goods-list-wrapper {
  margin-top: 20px;
}
.el-transfer-panel__header {
  background: $themeColor;
  color: #fff;
}
.item {
  line-height: 1.5;
  padding: 8px 10px;
  cursor: pointer;
  &:hover {
    color: $themeColor;
  }
  &.active {
    background: #c6e2ff;
    color: #fff;
  }
}
.image {
  cursor: pointer;
}
.item-name {
  cursor: pointer;
  &:hover {
    color: $themeColor;
  }
}
.el-icon-arrow-right {
  margin: 0 20px;
}
.store {
  width: 310px;
}
.red {
  color: $themeSubColor;
}
.transfer-wrapper {
  text-align: center;
}
.panel-wrapper {
  text-align: left;
  margin: 0;
  padding: 6px 0;
  list-style: none;
  height: 246px;
  overflow: auto;
  box-sizing: border-box;
}
.dialog-footer {
  margin-top: 20px;
  text-align: right;
}
.btn{
  margin-left:20px
}
.caiji{
  color:red
}
.gaunjianzi{
  margin-left:20px;
  color:red
}
.danwei{
  margin-left:10px;  
}
.introduce{
  color:#97999F;
  font-size:90%
}
</style>
