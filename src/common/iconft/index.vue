<template>
    <div>
        <div v-for="item in specifications" :key="item.value">
            <el-tag
            :key="index"
            v-for="(tag,index) in item.dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag,item.dynamicTags)">
            {{tag}}
            </el-tag>
            <el-select v-model="item.value" placeholder="请选择" v-if="item.inputVisible" @change="handleInputConfirm(item.value,item)">
                <el-option
                    v-for="(item,index1) in item.options"
                    :key="index1"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-button  class="button-new-tag" size="small" v-if="!item.inputVisible"  @click="showInput(item)">添加</el-button>
            <el-button  class="button-new-tag" size="small" v-if="item.inputVisible"  @click="cancel(item)">取消</el-button>
        </div>
        <div><el-button  class="button-new-tag" size="small" @click="addSpecification">添加规格</el-button></div>
         <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        border
        style="width: 100%; margin-top: 20px">
        <el-table-column
            prop="name"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="amount1"
            label="数值 1（元）">
        </el-table-column>
        <el-table-column
            prop="amount2"
            label="数值 2（元）">
        </el-table-column>
        <el-table-column
            prop="amount3"
            label="数值 3（元）">
        </el-table-column>
    </el-table>
    </div>
</template>
<script>
export default{
    data(){
        return{
            specifications:[
                {
                dynamicTags:['标签一', '标签二', '标签三'],
                inputValue:'',
                inputVisible: false,
                options: [{
            value: '黄金糕',
            label: '黄金糕',
            }, {
            value: '双皮奶',
            label: '双皮奶'
            }, {
            value: '蚵仔煎',
            label: '蚵仔煎'
            }, {
            value: '龙须面',
            label: '龙须面'
            }, {
            value: '北京烤鸭',
            label: '北京烤鸭'
            }],
            value:'',
            segmentation:''
            },
            {
                dynamicTags:['一个人','链接上文'],
                inputValue:'',
                inputVisible: false,
                options: [{
            value: '我爱你',
            label: '我爱你'
            }, {
            value: '你爱我',
            label: '你爱我'
            },],
            value:''
            }
            ],
            value: '',
              tableData: []
        }
    },
    methods:{
        //标签移除
        handleClose(tag,data) {
            data.splice(data.indexOf(tag), 1)
            this.addSpecification()
        },
        //添加显示下拉框
        showInput(data) {
            data.inputVisible = true
        },
        handleInputConfirm(val,data) {
            data.dynamicTags.push(val)
            data.inputVisible = false
            data.value = ''
            this.addSpecification()
        },
        cancel(data){
            data.inputVisible = false;
        },
        //添加规格
        addSpecification(){
            this.tableData = []
            let arr = this.specifications
            for(var i=0;i<arr.length;i++){
                arr[i].dynamicTags.forEach((item,index) => {
                    arr[i+1].dynamicTags.forEach(item1 =>{
                        this.tableData.push({
                            name:item,
                            amount1:item1,
                            key:index
                        })
                    })
                    this.segmentation = arr[i+1].dynamicTags.length
                })
                 this.$nextTick(_ => {
          console.log(this.tableData)
        });
                return
            }
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % this.segmentation === 0) {
            return {
              rowspan: this.segmentation,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        }
    },
    created(){
        
    }
}
</script>
<style lang='scss' scoped>

</style>