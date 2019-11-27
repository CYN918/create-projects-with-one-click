<template>
  <div class="address-select">
    <el-select
      class="el-select-width"
      v-model="addressForm.province_id"
      @change="GetAddress('2', addressForm.province_id , 'province')"
      placeholder="请选择省"
      :disabled="disabled"
    >
      <el-option v-for="item in provinceList" :key="item.id" :label="item.label" :value="item.id"/>
    </el-select>
    <el-select
      class="el-select-width"
      v-model="addressForm.city_id"
      @change="GetAddress('3', addressForm.city_id, 'city')"
      placeholder="请选择市"
      :disabled="disabled"
    >
      <el-option v-for="item in cityList" :key="item.id" :label="item.label" :value="item.id"/>
    </el-select>
    <el-select
      class="el-select-width"
      v-model="addressForm.area_id"
      @change="GetAddress('4', addressForm.area_id, 'area')"
      placeholder="请选择区"
      :disabled="disabled"
    >
      <el-option v-for="item in areaList" :key="item.id" :label="item.label" :value="item.id"/>
    </el-select>
    <el-select
      v-show="streetList.length"
      class="el-select-width"
      v-model="addressForm.street_id"
      @change="selectGet"
      placeholder="请选择街道"
      :disabled="disabled"
    >
      <el-option v-for="item in streetList" :key="item.id" :label="item.label" :value="item.id"/>
    </el-select>
  </div>
</template>

<script>
import { getAddress } from '@/api/public'

export default {
  name: 'AddressSelect',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          province_id: ''
        }
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      addressForm: {
        province_id: '',
        province_name: '',
        city_id: '',
        city_name: '',
        area_id: '',
        area_name: '',
        street_id: '',
        street_name: ''
      },
      provinceList: [],
      cityList: [],
      areaList: [],
      streetList: []
    }
  },
  created () {
    // this.initAddress()
  },
  methods: {
    GetAddress (type, parent, name) {
      let address = this[`${name}List`].find(item => {
        return item.id === this.addressForm[`${name}_id`]
      })
      this.addressForm[`${name}_name`] = address.label
      this._getAddress(type, parent)
    },
    initAddress () {
      if (!this.data.province_id && this.data.province_id !== 0) {
        this._getAddress('1', 0)
      } else {
        this._getAddress('1', 0, this.data.province_id)
        this._getAddress('2', this.data.province_id, this.data.city_id)
        this._getAddress('3', this.data.city_id, this.data.area_id)
        this._getAddress('4', this.data.area_id, this.data.street_id)
      }
    },
    selectGet () {
      let street = this.streetList.find(item => {
        return item.id === this.addressForm.street_id
      })
      this.addressForm.street_name = street.label
    },
    _getAddress (type, parent, initId) {
      getAddress(type, parent).then(res => {
        switch (type) {
          case '1':
            this.provinceList = res.data
            if (arguments.length === 3) {
              this.addressForm.province_id = initId
            } else {
              this.cityList = []
              this.areaList = []
              this.streetList = []
              this.addressForm.province_id = ''
              this.addressForm.area_id = ''
              this.addressForm.city_id = ''
              this.addressForm.area_id = ''
              this.addressForm.street_id = ''
            }
            break
          case '2':
            this.cityList = res.data
            if (arguments.length === 3) {
              this.addressForm.city_id = initId
            } else {
              this.areaList = []
              this.streetList = []
              this.addressForm.city_id = ''
              this.addressForm.area_id = ''
              this.addressForm.street_id = ''
            }
            break
          case '3':
            this.areaList = res.data
            if (arguments.length === 3) {
              this.addressForm.area_id = initId
            } else {
              this.streetList = []
              this.addressForm.area_id = ''
              this.addressForm.street_id = ''
            }
            break
          case '4':
            this.streetList = res.data
            if (arguments.length === 3) {
              this.addressForm.street_id = initId
            } else {
              this.addressForm.street_id = ''
            }
            break
          default:
            return []
        }
      })
    }
  },
  watch: {
    'addressForm': {
      handler: function (val) {
        this.$emit('selectAddress', val)
      },
      deep: true
    },
    data (val) {
      // this.initAddress()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select-width {
  width: 130px;
  margin-right: 5px;
}
</style>
