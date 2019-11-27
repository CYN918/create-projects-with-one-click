<template>
  <div class=" ">
    <el-form :model="form" ref="form"  label-width="140px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
            <div class="search-wrapper">
                <!-- <h4 class="title">商品属性</h4> -->
                <el-form ref="form" label-width="150px" size="small">
                  <el-form-item label="商品类型：" prop="goods_name">
                    <el-select v-model="form.value" filterable  placeholder="请选择" @change="getAttribute" style="width:300px">
                      <el-option
                        v-for="item in options"
                        :key="item.goodsTypeId"
                        :label="item.typeName"
                        :value="item.goodsTypeId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="item.attrName+'：'" prop="goods_name" v-for="item in dataArr" :key="item.attrId">
                    <el-input placeholder="请输入"  style="width:300px" v-model="item.value"  v-if="item.attrInputType == 0"></el-input>
                    <el-select  filterable  placeholder="请选择"  v-if="item.attrInputType == 1" v-model="item.value"  style="width:300px">
                      <el-option
                        v-for="val in item.attrValues"
                        :key="val"
                        :label="val"
                        :value="val">
                      </el-option>
                    </el-select>
                    <el-input placeholder="请输入" type="textarea" :rows="2" v-if="item.attrInputType == 3" v-model="item.value"  style="width:300px"></el-input>
                  </el-form-item>
                </el-form>
            </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { imageUploadUrl } from '@/api/config'
import { getItemtypes , findTypeValue} from '@/api/product/index'

export default {
  props:['res'],
  data () {
    return {
      form:{
        value:'', // 商品id
      },
      dataArr:[],
      options:[],
      rules:{
        
      }
    }
  },
  created () {
    this._getItemtypes()
  },
  methods: {
    //选中触发
    getAttribute(val){
      console.log('触发啦')
      findTypeValue(val).then(res => {
        res.data.forEach(item => {
          item.value = ''
        })
        this.dataArr = res.data
      })
    },
    //获取属性
    _getItemtypes(){
      let obj = {}
      obj.pageIndex = 1
      obj.pageSize = 0
      getItemtypes(obj).then(res => {
        this.options = res.data.pageList
      })
    }
  },
  watch:{
    res(val){
      if(val.data.attribute){
        this.form.value = val.data.attribute.goodsTypeId
        findTypeValue(val.data.attribute.goodsTypeId).then(res => {
            res.data.forEach(val => {
              val.value = ''
            })
          let arr =JSON.parse(JSON.stringify(res.data))
          arr.forEach(item => {
            val.data.attribute.goodsAttributeValues.forEach(data => {
              if(item.attrId === data.attrId){
                item.value = data.attrValue
              }
            })
          })
          this.dataArr = arr
      })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
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

</style>
