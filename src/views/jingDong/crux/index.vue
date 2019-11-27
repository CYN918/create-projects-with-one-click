<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="260px" size="small">
          <div class="search-wrapper">
            <h4 class="title">操作指引</h4>
            <div class="introduce">1、可输入要采集的商品关键词（如：女装）</div>
            <div class="introduce">2、可输入商品的链接（如：https://item.taobao.com/item.htm?id:131587246）</div>
            <div class="introduce">3、如需指定特定条件的商品，可设置“卖家信用”等采集参数，输入采集商品的数量</div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form ref="form" :model="form" :rules="rules" label-width="260px" size="small">
        <div class="search-wrapper">
            <h4 class="title">采集步骤</h4><br/>
            <el-form-item label="采集关键词:">
                <el-input v-model="form.name" style='width:600px' placeholder="请输入采集关键词"></el-input>
                <span class="gaunjianzi">（填写你要采集商品的关键字，如：女装，或者输入商品链接）</span>
            </el-form-item>
            <el-form-item label="数据排序:">
                <el-select v-model="form.region" placeholder="综合">
                <el-option label="新品" value="0"></el-option>
                <el-option label="评价" value="1"></el-option>
                <el-option label="销量" value="2"></el-option>
                <el-option label="价格高低" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="筛选条件:">
                <el-checkbox-group v-model="checkList">
                    <el-checkbox label="京东配送"></el-checkbox>
                    <el-checkbox label="货到付款"></el-checkbox>
                    <el-checkbox label="手机专享"></el-checkbox>
                    <el-checkbox label="仅看有货" ></el-checkbox>
                    <el-checkbox label="促销商品" ></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="采集数量:">
                <el-input v-model="form.name" style='width:600px' placeholder="请输入采集数量"></el-input>
            </el-form-item>          
            <el-form-item label="采集评论:">
                <el-checkbox v-model="checked">采集（评论为10~50的随机数）</el-checkbox>
            </el-form-item>
            <el-form-item label="产品分类:">
                <el-select v-model="form.region" placeholder="请选择数据排序">
                <el-option label="排序一" value="0"></el-option>
                <el-option label="排序二" value="1"></el-option>
                </el-select>
                <el-input v-model="form.name" style='width:400px' placeholder="请输入产品类别"></el-input>
                <el-button type="primary" size="small" class="btn">搜索</el-button>
            </el-form-item>
            <el-form-item label="属性类型:">
                <el-select v-model="form.region" placeholder="请选择属性类型">
                <el-option label="采集属性" value="0"></el-option>
                <el-option label="排序二" value="1"></el-option>
                </el-select>
                <el-input v-model="form.name" style='width:400px' placeholder="请输入属性类型"></el-input>
                <el-button type="primary" size="small" class="btn">搜索</el-button>
            </el-form-item>
            <el-form-item label="采集类型:">
                <el-checkbox v-model="checked" class="caiji">选择性采集</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="" size="small">立刻采集</el-button>
            </el-form-item>
            </div>
            </el-form>
      </div>
    </div>
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
