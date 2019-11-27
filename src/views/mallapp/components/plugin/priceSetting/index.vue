<template>
  <el-container class="dx_oiu_err">
    <el-main class="make_ticket_steps">
      <section class="ibox-content df_dx_dret">
        <p class="my-top-title">
          积分+现金
          <el-switch class="ml20 s_rig_kaid" v-model="status" @change="switchChange"></el-switch>
        </p>
        <p
          class="start-switch-tips fz12"
        >开启 积分+现金插件后， 我的商品 将增加“ 积分+现金定价”。可根据需求，设置现金定价方式。关闭插件后， 积分商城将变回原有的 积分价定价。</p>
        <el-row :gutter="20" class="mt40">
          <el-col :span="6" class="tr df_rpoiu_er">
            <section class="sd_df_c cz_w">
              <section class="df_rpoiu_er ab cz_a tr">
                <span class="fz18 b">固定 积分+现金模式</span>
              </section>
            </section>
          </el-col>
          <el-col :span="14">
            <section class="sd_df_c cz_w">
              <section class="df_rpoiu_er ab cz_a">
                <span>可设置固定 积分价+现金价，用户必须通过 积分+额外现金支付方式，来购买该商品</span>
              </section>
            </section>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt70">
          <el-col :span="6" class="df_rpoiu_er">
            <section class="sd_df_c cz_w">
              <section class="df_rpoiu_er ab cz_a tr">
                <span class="fz18 b">
                  区间 积分+现金模式
                  <br>(设置最少需使用 积分)
                </span>
              </section>
            </section>
          </el-col>
          <el-col :span="14">
            <section class="sd_df_c cz_w">
              <section class="df_rpoiu_er ab cz_a">
                <span>
                  可设置商品需使用的最低 积分值，用户可自定义设置想支付的 积分，额外支付的现金值，将根据
                  上次的默认汇率，自动得出结果。
                </span>
              </section>
            </section>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt70">
          <el-col :span="6" class="tr df_rpoiu_er">
            <section class="sd_df_c cz_w">
              <section class="df_rpoiu_er ab cz_a tr">
                <span class="fz18 b">
                  区间 积分+现金模式
                  <br>(设置最多可使用 积分)
                </span>
              </section>
            </section>
          </el-col>
          <el-col :span="14">
            <section class="sd_df_c cz_w">
              <section class="df_rpoiu_er ab cz_a">
                <span>
                  可设置商品需使用的最高 积分值，用户可自定义设置想支付的 积分，额外支付的现金值，将根据
                  上次的默认汇率，自动得出结果。
                </span>
              </section>
            </section>
          </el-col>
        </el-row>
      </section>
    </el-main>
    <el-dialog title="功能已开通" :visible.sync="dialogVisible" width="700px">
      <p class="dialog-tip">您可进入【我的商品】编辑商品的积分加现金定价</p>
      <div class="image">
        <img :src="require('@/common/images/score_cash_example.png')" alt>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="routerToGoods">去我的商品设置</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import { getStatus, updateStatus } from '@/api/mallapp/plugin/priceSetting'

export default {
  name: 'priceSetting',
  data () {
    return {
      status: false,
      dialogVisible: false
    }
  },
  created () {
    this._getStatus()
  },
  methods: {
    switchChange () {
      if (this.status) {
        this.status = false
        this._updateStatus()
      } else {
        this.status = true
        this.$confirm('关闭后，商品已设置的积分+现金定价将变为纯积分定价。', '确定关闭此插件？', {
          confirmButtonText: '移除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._updateStatus()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    },
    routerToGoods () {
      this.dialogVisible = false
      this.$router.push({ path: '/mgoods/my' })
    },
    _getStatus () {
      getStatus().then(res => {
        if (res.data.status === '0') {
          this.status = false
        } else {
          this.status = true
        }
      })
    },
    _updateStatus () {
      updateStatus(this.status).then(res => {
        if (this.status === false) {
          this.status = true
          this.dialogVisible = true
          this.$message({
            type: 'success',
            message: '操作成功！积分加现金已开启!'
          })
        } else {
          this.status = false
          this.$message({
            type: 'success',
            message: '操作成功！积分加现金已关闭!'
          })
        }
      })
    }
  }

}
</script>

<style lang='scss' scoped>
.dialog-tip {
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}
.image {
  margin: 20px auto;
  text-align: center;
  img {
    max-width: 100%;
  }
}
.s_rig_kaid {
  position: relative;
  bottom: 2px;
}
.start-switch-tips {
  margin: 26px 0 29px 0px;
}
.df_rpoiu_er {
  line-height: 50px;
  padding-right: 20px !important;
  border-right: 1px solid #d9d9d9;
}
.df_rpoiu_er.ab {
  font-size: 14px;
  line-height: 1.5;
  border-right: 0;
  text-align: left;
}
.sd_df_c {
  width: 100%;
  height: 50px;
  padding-left: 30px;
}
.df_dx_dret {
  min-height: 600px;
}
</style>
