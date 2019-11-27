<template>
  <div class="margin">
    <div id="printText" style="background: white;" class="text">
      <h3 style="font-size: 36px;text-align: center;margin-bottom: 90px;">合作协议</h3>
      <p style="margin-bottom: 60px;text-align: center" v-if="contractNumber" @click="handlecontractNumber">合同编号：{{contractContent.contractSn}}</p>
      <p style="margin-bottom: 60px;text-align: center;" v-else>合同编号：<input :readonly="readOnly" v-model="contractContent.contractSn" style="outline: none; border-bottom: 1px solid #ccc" type="text" @blur="handleblur"></p>
      <p style="margin-bottom: 30px;"><span style="font-weight: bold">甲方：</span><input :readonly="readOnly" v-model="contractContent.firstParty" style="text-align: left;border-bottom: 1px solid #000; outline: none;padding: 0 6px;width: 450px" type="text">（以下简称甲方）</p>
      <p style="margin-bottom: 40px;"><span style="font-weight: bold">乙方：</span><input :readonly="readOnly" v-model="contractContent.secondParty" style="text-align: left;border-bottom: 1px solid #000; outline: none;padding: 0 6px;width: 450px" type="text">（以下简称乙方）</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">甲乙双方本着公平公正、平等自愿的原则，为充分发挥双方各自优势，实现和谐共赢，根 据《中华人民共和国合同法》的规定，经友好协商达成合作，双方共同遵守，精诚合作，互相 支持，共同发展，具体如下：</p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第一条 合作目的：</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">由乙方通过乙方资源为甲方带来并开展业务 ，未另行约定的情况下全部由甲方搭建、运营 与经营管理，互惠互利，利益共享。</p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第二条 合作方式：</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">甲乙双方选择以下一种或多种方式进行合作：</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">
        <span style="margin-right: 50px">
          （1）、
        <label for="my_checkbox1" style="position: relative;top: 1px; margin-left: -12px;">
          <input :disabled="readOnly" v-model="coorperateMethods[0]" style="text-align: center;visibility: hidden" type="checkbox" id="my_checkbox1">
          <i class="checkbox" :class="{checked: coorperateMethods[0]}" style="display: inline-block; width: 14px;height: 14px; border: 1px solid #333;"></i>
        </label>
         积分商城系统
        </span>
        <span style="margin-right: 50px">
          （2）、
        <label for="my_checkbox2" style="position: relative;top: 1px; margin-left: -12px;">
          <input :disabled="readOnly" v-model="coorperateMethods[1]" style="text-align: center;visibility: hidden" type="checkbox" id="my_checkbox2">
          <i class="checkbox" :class="{checked: coorperateMethods[1]}" style="display: inline-block; width: 14px;height: 14px; border: 1px solid #333;"></i>
        </label>
        供应链平台
        </span>
        <span>
          （3）、
        <label for="my_checkbox3" style="position: relative;top: 1px; margin-left: -12px;">
          <input :disabled="readOnly" v-model="coorperateMethods[2]" style="text-align: center;visibility: hidden" type="checkbox" id="my_checkbox3">
          <i class="checkbox" :class="{checked: coorperateMethods[2]}" style="display: inline-block; width: 14px;height: 14px; border: 1px solid #333;"></i>
        </label>
            员工福利系统
        </span>
      </p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">
        <span style="margin-right: 50px">
          （4）、
        <label for="my_checkbox4" style="position: relative;top: 1px; margin-left: -12px;">
          <input :disabled="readOnly" v-model="coorperateMethods[3]" style="text-align: center;visibility: hidden" type="checkbox" id="my_checkbox4">
          <i class="checkbox" :class="{checked: coorperateMethods[3]}" style="display: inline-block; width: 14px;height: 14px; border: 1px solid #333;"></i>
        </label>
        ERP管理系统
        </span>
        <span style="margin-right: 50px">
          （5）、
        <label for="my_checkbox5" style="position: relative;top: 1px; margin-left: -12px;">
          <input :disabled="readOnly" v-model="coorperateMethods[4]" style="text-align: center;visibility: hidden" type="checkbox" id="my_checkbox5">
          <i class="checkbox" :class="{checked: coorperateMethods[4]}" style="display: inline-block; width: 14px;height: 14px; border: 1px solid #333;"></i>
        </label>
        企业集采系统
        </span>
        <span>
          （6）、
        <label for="my_checkbox6" style="position: relative;top: 1px; margin-left: -12px;">
          <input :disabled="readOnly" v-model="coorperateMethods[5]" style="text-align: center;visibility: hidden" type="checkbox" id="my_checkbox6">
          <i class="checkbox" :class="{checked: coorperateMethods[5]}" style="display: inline-block; width: 14px;height: 14px; border: 1px solid #333;"></i>
        </label>
          财务管理系统
        </span>
      </p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">
        <span style="margin-right: 48px">
          （7）、
        <label for="my_checkbox7" style="position: relative;top: 1px; margin-left: -12px;">
          <input :disabled="readOnly" v-model="coorperateMethods[6]" style="text-align: center;visibility: hidden" type="checkbox" id="my_checkbox7">
          <i class="checkbox" :class="{checked: coorperateMethods[6]}" style="display: inline-block; width: 14px;height: 14px; border: 1px solid #333;"></i>
        </label>
        礼品卡券系统
        </span>
        <span style="margin-right: 30px">
          （8）、
        <label for="my_checkbox8" style="position: relative;top: 1px; margin-left: -12px;">
          <input :disabled="readOnly" v-model="coorperateMethods[7]" style="text-align: center;visibility: hidden" type="checkbox" id="my_checkbox8">
          <i class="checkbox" :class="{checked: coorperateMethods[7]}" style="display: inline-block; width: 14px;height: 14px; border: 1px solid #333;"></i>
        </label>
         OA移动办公系统
        </span>
        <span style="margin-right: 50px">
          （9）、
        <label for="my_checkbox9" style="position: relative;top: 1px; margin-left: -12px;">
          <input :disabled="readOnly" v-model="coorperateMethods[8]" style="text-align: center;visibility: hidden" type="checkbox" id="my_checkbox9">
          <i class="checkbox" :class="{checked: coorperateMethods[8]}" style="display: inline-block; width: 14px;height: 14px; border: 1px solid #333;"></i>
        </label>
          好市客分销系统
        </span></p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">
           <span style="margin-right: 54px">
          （10）、
        <label for="my_checkbox10" style="position: relative;top: 1px; margin-left: -12px;">
          <input :disabled="readOnly" v-model="coorperateMethods[9]" style="text-align: center;visibility: hidden" type="checkbox" id="my_checkbox10">
          <i class="checkbox" :class="{checked: coorperateMethods[9]}" style="display: inline-block; width: 14px;height: 14px; border: 1px solid #333;"></i>
        </label>
         APP移动端
        </span>
        <span style="margin-right: 78px">
          （11）、
        <label for="my_checkbox11" style="position: relative;top: 1px; margin-left: -12px;">
          <input :disabled="readOnly" v-model="coorperateMethods[10]" style="text-align: center;visibility: hidden" type="checkbox" id="my_checkbox11">
          <i class="checkbox" :class="{checked: coorperateMethods[10]}" style="display: inline-block; width: 14px;height: 14px; border: 1px solid #333;"></i>
        </label>
         小程序
        </span>
        <span style="margin-right: 50px">
          （12）、
        <label for="my_checkbox12" style="position: relative;top: 1px; margin-left: -12px;">
          <input :disabled="readOnly" v-model="coorperateMethods[11]" style="text-align: center;visibility: hidden" type="checkbox" id="my_checkbox12">
          <i class="checkbox" :class="{checked: coorperateMethods[11]}" style="display: inline-block; width: 14px;height: 14px; border: 1px solid #333;"></i>
        </label>
         微商城
        </span>
      </p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第三条 合作内容：</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、甲方通过双方合作方式向乙方提供商城平台里的企业集采、员工福利、积分兑换的技术支持，平台搭建，并为企业礼品定制、办公用品采购、劳保用品采购、积分商品兑换、汽车后市场商品采购等提供资源及售后服务；。</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">2、其中ERP管理系统、OA移动办公系统、小程序、财务管理系统、礼品卡册系统需另行购买及支付货款，支付金额将统一在系统后台查看及购买；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">3、乙方负责开拓礼品市场，引进直接客户，为双方合作提供业务联系、问题沟通、商业谈判、货款及预付款催收、支付和对接协调，包括但不限于引入乙方客户资源的员工福利、企业集采、积分兑换、办公用品、劳保用品等业务，创造一切合作机会，实现双方合作共赢；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">4、甲方负责平台建设、项目管理、运营、技术支持、商品品牌授权、商家入驻、商品维护、商品推荐与供应链输出等，乙方自行引进供应商除外；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 35px;">5、商城平台技术开发、建设由甲方自行承担，软件著作权、版权等所有权归甲方拥有；乙方及乙方客户只有在合同期内的使用权，合同到期后甲方将有权收由其使用权；如有续约成功将继续开放其使用权。</p>

      <!--<h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第四条 合作内容：</h3>-->
      <!--<p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、甲方通过平台向乙方资源提供商城平台里的企业集采、员工福利、礼品采购、办公用品采 购、劳保用品采购、积分商品兑换、汽车后市场、平台广告等一切产品或服务；</p>-->
      <!--<p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">2、甲方与乙方资源进行合作需要甲方另行与乙方的资源方签订合同；</p>-->
      <!--<p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">3、乙方为双方合作提供对接、问题沟通和业务协调，包括但不限于引入乙方资源客户的办公用品、员工福利、客户积分兑换等一切合作业务；</p>-->
      <!--<p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">4、甲方负责平台建设、项目管理、运营、技术支持、商品品牌授权、商家入驻、商品维护、商品推荐与供应链等，甲方与乙方的资源方另行约定的除外；</p>-->
      <!--<p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">5、平台建设和经营所需费用根据乙方资源情况，由甲方与乙方资源单独签订合同另行约定，产品的所有权在销售给消费者之前均属于甲方所有，乙方及其资源方不享有产品的所有权；</p>-->
      <!--<p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">6、乙方为合作业务提供营销与市场协作，包括但不限于引入乙方资源的办公用品、员工福利、客户积分兑换等一切合作业务，并引入乙方的资源方之外的客户资源。</p>-->
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第四条 双方的责任：</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;font-weight: bold">甲方的责任范围，主要负责：</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、负责商城平台建设、开发、运营、和管理；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">2、负责PC端、手机端、APP端等平台搭建、技术维护，含场景设计、页面制作；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">3、负责供应链管理(采购、仓储、国内发货、售后服务)等相关工作事宜；；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">4、负责产品质量保证、处理乙方资源方反馈的客户投诉、便于有效监督与执行；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">5、全权负责服务于乙方资源。</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;font-weight: bold">乙方的责任范围，主要负责：</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、负责市场营销、业务合作，业务宣传和推广；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">2、负责与其开发客户的业务联系、问题沟通、商业谈判和对接协调；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">3、货款及预付款催收及支付：根据合作的模式，负责相应的款项催收及预付款到甲方公司帐号；</p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第五条 收益分配、款项收取与结算：</h3>
      <div style="display:flex">
        <el-checkbox v-model="checked1" @change="handeleChange1" :disabled="readOnly"/>
        <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px; font-weight: 600;margin-left: -62px">（一）第一种合作模式：使用深圳市迈戈实业有限公司的公司资质同客户签订合作协议；</p>
      </div>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">是指通过乙方引进介绍给甲方的客户，由甲方同客户直接签定合同；合同签定后，甲方为乙方搭建专属的服务商系统，乙方可以通过此系统查看此每天的平台流水帐；我司保证此合作项目平台的财务数据公开透明；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、纯利润分配模式：客户通过线上平台下单的销售总额+线下采购的销售总额=客户销售总额</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">项目客户平台纯利润=项目客户销售总额-线上平台采购成本总额-线下采购成本总额-平台商品运费-线下商品运费-税费-企业所得税</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">2、分配方式为：</p>    <!-- 新增字段-->
      <!--<p style="text-indent: 4em; line-height: 2em;margin-bottom: 10px;">是指所有通过乙方对接给甲方所有的乙方资源平台或项目的“纯利润”收入（纯利润为销售总额-采购总额-运费-税费-企业所得税-运营费用），分配比例为：</p>-->
      <!--<p style="text-indent: 4em; line-height: 2em;margin-bottom: 10px;">甲方占比服务商系统后台纯利润<input :readonly="readOnly" v-model="contractContent.oneFirstPartyRadio" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">% ，乙方占比服务商系统后台纯利润<input :readonly="readOnly" v-model="contractContent.oneSecondPartyRadio" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">% 各自承担相应的费用；</p>-->
      <!--<p style="text-indent: 4em; line-height: 2em;margin-bottom: 10px;">其它本条未注明的，需要另行约定的，具体根据项目情况，甲乙双方另行签订补充协议。</p>-->
      <p  style="text-indent: 3em; line-height: 2em;margin-bottom: 10px;">1 ) 自营商品</p>
      <div style="display: flex;padding-left: 50px">
        <el-radio :disabled="readOnly" v-model="methodOneRadio.selfOperatedRadio" label="A"></el-radio>
        <p style="line-height: 2em;margin-bottom: 10px;">、按分成比例分配：甲方占比服务商系统后台纯利润
          <input v-if="checked1" :disabled=!checked1||selfOperatedRadio :readonly="readOnly"
                 v-model="contractContent.proprietaryFirst"
                 style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
                 type="number" min="0" max="100">
          <input v-if="!checked1" :disabled=!checked1 :readonly="readOnly"
                 style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
                 type="number" min="0" max="100">
          乙方占比服务商系统后台纯利润
          <input v-if="checked1" :disabled=!checked1||selfOperatedRadio :readonly="readOnly"
                 v-model="contractContent.proprietarySecond"
                 style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
                 type="number" min="0" max="100">
          <input v-if="!checked1" :disabled=!checked1 :readonly="readOnly"
                 style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
                 type="number" min="0" max="100">
          % ；双方各自承担运营费用；</p>
      </div>
      <div style="display: flex;padding-left: 50px">
        <el-radio :disabled="readOnly" v-model="methodOneRadio.selfOperatedRadio" label="B"></el-radio>
        <p style=" line-height: 2em;margin-bottom: 10px;">、按销售额提成计算：甲方按此项目销售额的
          <input v-if="checked1" :disabled=!checked1||!selfOperatedRadio :readonly="readOnly"
                 v-model="contractContent.firstPartyRadio"
                 style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
                 type="number" min="0" max="100">
          <input v-if="!checked1" :disabled=!checked1 :readonly="readOnly"
                 style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
                 type="number" min="0" max="100">% , 给予乙方提成；
        </p>
      </div>
      <!--京东-->
      <p  style="text-indent: 3em; line-height: 2em;margin-bottom: 10px;">2 ) 京东商品</p>
      <div style="display: flex;padding-left: 50px">
        <el-radio :disabled="readOnly" v-model="methodOneRadio.jdRadio" label="A"></el-radio>
        <p style=" line-height: 2em;margin-bottom: 10px;">、按分成比例分配:</p>
      </div>
      <p style="text-indent: 6em; line-height: 2em;margin-bottom: 10px;">甲方占比服务商系统后台纯利润<input
              :disabled=!checked1||jdRadio :readonly="readOnly" v-model="contractContent.jdFirst"
              style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
              type="number" min="0" max="100">%,乙方占比服务商系统后台纯利润 <input :disabled=!checked1||jdRadio :readonly="readOnly"
                                                                      v-model="contractContent.jdSecond"
                                                                      style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
                                                                      type="number" min="0" max="100">% ；双方各自承担运营费用；</p>

      <div style="display: flex;padding-left: 50px">
        <el-radio :disabled="readOnly" v-model="methodOneRadio.jdRadio" label="B"></el-radio>
        <p style="line-height: 2em;margin-bottom: 10px;">、按抽点服务分配:</p>
      </div>
      <p style="text-indent: 6em; line-height: 2em;margin-bottom: 10px;">甲方占比服务商系统后台纯利润点
        <input v-if="checked1" :disabled=!checked1||!jdRadio :readonly="readOnly" v-model="contractContent.jdFirstPoint"
               style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
               type="number" min="0" max="100">
        <input v-if="!checked1" :disabled=!checked1 :readonly="readOnly"
               style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
               type="number" min="0" max="100">
        个点,双方各自承担运营费用；</p>

      <!--苏宁-->
      <p  style="text-indent: 3em; line-height: 2em;margin-bottom: 10px;">3 )苏宁商品</p>
      <div style="display: flex;padding-left: 50px">
        <el-radio :disabled="readOnly" v-model="methodOneRadio.suningRadio" label="A"></el-radio>
        <p style="line-height: 2em;margin-bottom: 10px;">、按分成比例分配:</p>
      </div>
      <p style="text-indent: 6em; line-height: 2em;margin-bottom: 10px;">甲方占比服务商系统后台纯利润<input
              :disabled=!checked1||suningRadio :readonly="readOnly" v-model="contractContent.suningFirst"
              style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
              type="number" min="0" max="100">%,乙方占比服务商系统后台纯利润 <input :disabled=!checked1||suningRadio
                                                                      :readonly="readOnly"
                                                                      v-model="contractContent.suningSecond"
                                                                      style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
                                                                      type="number" min="0" max="100">% ；双方各自承担运营费用；</p>
      <div style="display: flex;padding-left: 50px">
        <el-radio :disabled="readOnly" v-model="methodOneRadio.suningRadio" label="B"></el-radio>
        <p style="line-height: 2em;margin-bottom: 10px;">、按抽点服务分配:</p>
      </div>
      <p style="text-indent: 6em; line-height: 2em;margin-bottom: 10px;">甲方占比服务商系统后台纯利润点
        <input v-if="checked1" :disabled=!checked1||!suningRadio :readonly="readOnly"
               v-model="contractContent.suningFirstPoint"
               style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
               type="number" min="0" max="100">
        <input v-if="!checked1" :disabled=!checked1 :readonly="readOnly"
               style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
               type="number" min="0" max="100">
        个点,各自承担相应的费用；</p>

      <!--网易-->
      <p  style="text-indent: 3em; line-height: 2em;margin-bottom: 10px;">4 ) 网易商品</p>
      <div style="display:flex;padding-left: 50px">
        <el-radio :disabled="readOnly" v-model="methodOneRadio.neteaseRadio" label="A"></el-radio>
        <p style=" line-height: 2em;margin-bottom: 10px;">、按分成比例分配:</p>
      </div>
      <p style="text-indent: 6em; line-height: 2em;margin-bottom: 10px;">甲方占比服务商系统后台纯利润<input
              :disabled=!checked1||neteaseRadio :readonly="readOnly" v-model="contractContent.youFirst"
              style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
              type="number" min="0" max="100">%,乙方占比服务商系统后台纯利润 <input :disabled=!checked1||neteaseRadio
                                                                      :readonly="readOnly"
                                                                      v-model="contractContent.youSecond"
                                                                      style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
                                                                      type="number" min="0" max="100">% ；双方各自承担运营费用；</p>
      <div style="display:flex;padding-left: 50px">
        <el-radio :disabled="readOnly" v-model="methodOneRadio.neteaseRadio" label="B"></el-radio>
        <p style="line-height: 2em;margin-bottom: 10px;">、按抽点服务分配:</p>
      </div>
      <p style="text-indent: 6em; line-height: 2em;margin-bottom: 10px;">甲方占比服务商系统后台纯利润点
        <input v-if="checked1" :disabled=!checked1||!neteaseRadio :readonly="readOnly"
               v-model="contractContent.youFirstPoint"
               style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
               type="number" min="0" max="100">
        <input v-if="!checked1" :disabled=!checked1 :readonly="readOnly"
               style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
               type="number" min="0" max="100">
        个点,双方各自承担运营费用；</p>

      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">3、结算方式：每个月核对一次销售明细及利润清单，乙方需按每月的对帐明细及甲方开具的发票额度同客户进行沟通并跟进货款的催收；甲方根据每个月的到款情况进行到款利润的分配结算；甲方按约定对公结算，乙方按约定开具服务费发票；如果客户原因部份款项未能收到的将由双方共同承担！
      <p  style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">4、乙方结算账号：</p>
      <p style="text-indent: 4em; line-height: 2em;">户名：<input :disabled=!checked1   :readonly="readOnly" v-model="contractContent.secondPartyBankAccountName" style="outline: none;color:	#666666;" type="text" placeholder="请输入户名"></p>
      <p style="text-indent: 4em; line-height: 2em;">开户行：<input :disabled=!checked1  :readonly="readOnly" v-model="contractContent.secondPartyBank" style="outline: none;color:	#666666;" type="text" placeholder="请输入开户行"></p>
      <p style="text-indent: 4em; line-height: 2em;margin-bottom: 10px;">银行账号：<input :disabled=!checked1  :readonly="readOnly" v-model="contractContent.secondPartyBankAccount"  style="outline: none;color:	#666666;" type="number" placeholder="请输入银行账号"></p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">5、甲方开票资料：</p>
      <p style="text-indent: 4em; line-height: 2em;">公司名称：深圳市迈戈实业有限公司</p>
      <p style="text-indent: 4em; line-height: 2em;">纳税识别号：914403007586390279</p>
      <p style="text-indent: 4em; line-height: 2em;">开票地址：深圳市福田区梅林街道梅都社区梅林路48号理想时代大厦8C</p>
      <p style="text-indent: 4em; line-height: 2em;">电话：82914275</p>
      <p style="text-indent: 4em; line-height: 2em;margin-bottom: 25px;">开户行及账号：平安银行深圳岗厦支行11006119953901</p>
      <div style="display: flex">
        <el-checkbox v-model="checked2" style="border: black" @change="handeleChange2"
                     :disabled="readOnly"></el-checkbox>
        <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px; font-weight: 600;margin-left: -62px">（二）第二种合作模式：乙方使用自已公司的资质同客户签定合作协议；</p>
      </div>
      <p  style="text-indent: 3em; line-height: 2em;margin-bottom: 10px;">
        是指乙方通过自已的资源，同客户直接签定合同；合同签定后，甲方为乙方搭建专属的服务商系统，并提供全品类商品的商城价及分销结算价格（平均毛利润在15%以上）；乙方可以通过此系统为客户搭建相应的服务平台；并根据商城后台的商城价及分销结算价格，自行进行价格调整，商城价格有对比京东、苏宁的、天猫价格，可以更精准的提高服务商的商品利润空间；
      </p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、结算方式：平台搭建后，乙方需预存货款到甲方公司帐号，甲方公司将按等值额度发放到乙方平台上，乙方及客户可以通过相应的额度分配进行商品的下单购买；甲方每个月核对一次销售明细并开具发票给乙方，乙方需在每次额度使用完之前进行预付款充值；</p>

      <!--  -  需要更改 --------------- -->
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">2、分配方式为：</p>    <!-- 新增字段-->
      <p style="text-indent: 3em; line-height: 2em;margin-bottom: 10px;">1 ) 自营商品</p>
      <div style="display: flex;padding-left: 50px">
        <el-radio :disabled="readOnly" v-model="methodTwoRadio" label="A"></el-radio>
        <p style="line-height: 2em;margin-bottom: 10px;">. 按分成比例分配：甲方占比服务商系统后台纯利润
          <input v-if="checked2" :disabled=!checked2||methodTwo1 :readonly="readOnly"
                 v-model="contractContent.proprietaryFirst"
                 style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
                 type="number" min="0" max="100">
          <input v-if="!checked2" :disabled=!checked2 :readonly="readOnly"
                 style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
                 type="number" min="0" max="100">
          %
          ，乙方占比服务商系统后台纯利润
          <input v-if="checked2" :disabled=!checked2||methodTwo1 :readonly="readOnly"
                 v-model="contractContent.proprietarySecond"
                 style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
                 type="number" min="0" max="100">
          <input v-if="!checked2" :disabled=!checked2 :readonly="readOnly"
                 style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
                 type="number" min="0" max="100">
          % ；双方各自承担运营费用；
        </p>
      </div>
      <div style="display: flex;padding-left: 50px">
        <el-radio :disabled="readOnly" v-model="methodTwoRadio" label="B"></el-radio>
        <p style="line-height: 2em;margin-bottom: 10px;">. 按销售额提成计算：甲方按此项目销售额的
          <input v-if="checked2" :disabled=!checked2||!methodTwo1 :readonly="readOnly"
                 v-model="contractContent.firstPartyRadio"
                 style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
                 type="number" min="0" max="100">
          <input v-if="!checked2" :disabled=!checked2 :readonly="readOnly"
                 style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
                 type="number" min="0" max="100">% , 给予乙方提成；
        </p>
      </div>
      <p style="text-indent: 3em; line-height: 2em;margin-bottom: 10px;">2 )京东商品按抽点服务分配：</p>
      <p style="text-indent: 6em; line-height: 2em;margin-bottom: 10px;">甲方占比服务商系统后台纯利润点
        <input v-if="checked2" :disabled=!checked2 :readonly="readOnly" v-model="contractContent.jdFirstPoint"
               style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
               type="number" min="0" max="100">
        <input v-if="!checked2" :disabled=!checked2 :readonly="readOnly"
               style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
               type="number" min="0" max="100">
        个点；各自承担相应的费用；
      </p>
      <p style="text-indent: 3em; line-height: 2em;margin-bottom: 10px;">3 )苏宁商品按抽点服务分配：</p>
      <p style="text-indent: 6em; line-height: 2em;margin-bottom: 10px;">甲方占比服务商系统后台纯利润点
        <input v-if="checked2" :disabled=!checked2 :readonly="readOnly" v-model="contractContent.suningFirstPoint"
               style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
               type="number" min="0" max="100">
        <input v-if="!checked2" :disabled=!checked2 :readonly="readOnly"
               style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
               type="number" min="0" max="100">
        个点；各自承担相应的费用；
      </p>
      <p style="text-indent: 3em; line-height: 2em;margin-bottom: 10px;">4)网易严选商品按抽点服务分配：</p>
      <p style="text-indent: 6em; line-height: 2em;margin-bottom: 10px;">甲方占比服务商系统后台纯利润点
        <input v-if="checked2" :disabled=!checked2 :readonly="readOnly" v-model="contractContent.youFirstPoint"
               style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
               type="number" min="0" max="100">
        <input v-if="!checked2" :disabled=!checked2 :readonly="readOnly"
               style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
               type="number" min="0" max="100">
        个点；各自承担相应的费用；
      </p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">3、甲方收款账号：</p>
      <p style="text-indent: 4em; line-height: 2em;">户名：<input :disabled=!checked2 :readonly="readOnly" v-model="contractContent.firstBankAccountName" style="outline: none;" type="text" placeholder="请输入户名"></p>
      <p style="text-indent: 4em; line-height: 2em;">开户行：<input :disabled=!checked2  :readonly="readOnly" v-model="contractContent.firstReBank" style="outline: none;" type="text" placeholder="请输入开户行"></p>
      <p style="text-indent: 4em; line-height: 2em;margin-bottom: 10px;">银行账号：<input :disabled=!checked2  :readonly="readOnly" v-model="contractContent.firstReBankAccount"  style="outline: none;" type="number" placeholder="请输入银行账号"></p>

      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">4、乙方开票资料：</p>
      <p style="text-indent: 4em; line-height: 2em;">公司名称：<input :disabled=!checked2  :readonly="readOnly" v-model="contractContent.secondParty" style="outline: none;" type="text" placeholder="请输入公司名称"></p>
      <p style="text-indent: 4em; line-height: 2em;">纳税识别号：<input :disabled=!checked2  :readonly="readOnly" v-model="contractContent.secondTiTaxNumber" style="outline: none;" type="text" placeholder="请输入纳税识别号"></p>
      <p style="text-indent: 4em; line-height: 2em;">开票地址：<input  :disabled=!checked2  :readonly="readOnly" v-model="contractContent.secondTiBillingAddress" style="outline: none;" type="text" placeholder="请输入开票地址"></p>
      <p style="text-indent: 4em; line-height: 2em;margin-bottom: 10px;">电话： <input :disabled=!checked2  :readonly="readOnly" v-model="contractContent.secondTiTelephone"  style="outline: none;" type="number" placeholder="请输入电话"></p>
      <p style="text-indent: 4em; line-height: 2em;margin-bottom: 10px;">开户行及账号： <input :disabled=!checked2  :readonly="readOnly" v-model="contractContent.secondTiBank"  style="outline: none;" type="text" placeholder="请输入开户行">
        <input :disabled=!checked2  :readonly="readOnly" v-model="contractContent.secondTiBankAccout"  style="outline: none;" type="number" placeholder="请输入账号"></p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px; margin-top: 35px;">第六条 合作期限：</h3>
      <p style="text-indent: 3em;margin-bottom: 25px;">本合作协议合作期限自<input :readonly="readOnly" v-model="contractEffectiveTimeBeginYear" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="number" min="2000" max="2100" >年<input :readonly="readOnly" v-model="contractEffectiveTimeBeginMonth" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="number" min="1" max="12">月<input :readonly="readOnly" v-model="contractEffectiveTimeBeginDay" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="number" min="1" max="31" >日起，至<input :readonly="readOnly" v-model="contractEffectiveTimeEndYear" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="number" min="2000" max="2100" >年<input :readonly="readOnly" v-model="contractEffectiveTimeEndMonth" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="number" min="1" max="12" >月<input :readonly="readOnly" v-model="contractEffectiveTimeEndDay" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="number" min="1" max="12" >日止。</p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第七条 保证与承诺：</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、双方保证任何一方不得以任何理由为名在双方合作后的资源平台从事非法活动；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">2、产品在销售给消费者之前，以及技术及平台的所有权均属于甲方所有；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">3、乙方的资源方在客户服务时接到客户反映发现有甲方多发、错发的货物，以及售后问题的，应做好详细记录，同时应立即通知甲方；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">4、甲方将按照《中华人民共和国产品质量法》、《中华人民共和国消费者权益保护法》及其它法规、部门规章和国家强制性标准的规定，对存在质量问题的售出商品提供无条件退换货服务；对非商品质量问题（商品不影响二次销售）的售出商品，自客户收到货提供<input :readonly="readOnly" v-model="contractContent.returnDay" style="width:50px;border-bottom: 1px solid #000;text-align: center; outline: none;padding: 0 6px" type="number" min="1" max="30" >日内可退换货服务、<input :readonly="readOnly" v-model="contractContent.changeDay" style="width:50px;border-bottom: 1px solid #000;text-align: center; outline: none;padding: 0 6px" type="number" min="1" max="90" >日内可换货服务；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">5、通过平台售出的商品，由甲方代表乙方资源为购买用户完成上述售后服务；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">6、甲方保证提供本次合作所涉及的核心技术及管理等方面的支持，保证生产的产品取得相关 管理部门认证证书，使所生产产品具备核心竞争力参与市场竞争；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">7、双方保证及时提供平台项目运营所需要的全部资料，保证资料的真实性、完整性和准确性，并承诺对本次合作中存在的重大遗漏、虚假陈述和故意隐瞒等承担一切法律责任。</p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第八条 权利与义务：</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;font-weight: bold">甲方权利与义务：</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、保证在商城上所销售商品的合法性，并对所提供的所有产品承担所有责任，包括并不限于知识产权、产品质量等；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">2、确保提供甲方的网上合作平台的信息系统性能满足合作需要的技术规范；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">3、负责平台所有运营与管理，提供项目所需电商技术与问题的解决方案和方法；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">4、有义务依照双方共同制定的客户服务规范对网站销售的产品进行退换货处理；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">5、享有本次合作的其它合法权利，如：战略性经营、利润分红、收益分配等。</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;font-weight: bold">乙方权利与义务：</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、乙方负责负责客户、渠道、资源协调与对接；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">2、有权要求甲方负责网上合作平台的商品丰富性、商城功能开发及售后提供服务； </p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">3、负责乙方各资源的沟通联系，商城内部推广及对外开展推广活动；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">4、处理甲方发出的协助请求及其他合理事宜；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">5、拥有对合作建议与监督的权利，并享有本次合作的其它合法权利，如：收益分配与股权分配等。</p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第九条 不可抗力：</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、在合作期间，由于地震、台风、水灾、火灾、战争或其他不能预见并且对其发生和后果 不能防止和避免的不可抗力事故，致使协议的履行直接被影响或者不能按约定的条件履行时，遇有上述不可抗力事故的一方，应立即将事故情况电报通知对方，并应在<input :readonly="readOnly" v-model="contractContent.accidentDay" style="width:50px;border-bottom: 1px solid #000; text-align: center; outline: none;padding: 0 6px" type="number" min="1" max="180" >天内提供事故的详细情况及协议不能履行、或者部分不能履行、或者需要延期履行的理由的有效证明文件。按照事故对协议的履行的影响程度，由双方协商决定是否解除协议、或者部分免除履行协议的责任、或者延期履行协议。</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">2、如因为不可抗力导致技术故障，进而影响服务的不能履行或履行延误，从而导致消费者理解错误而造成的任何损失，双方均不负责任。</p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第十条 商业保密条款</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、商业秘密：任何一方公开或未公开的任何技术信息和经营信息，包括但不限于：产品计划、销售计划、奖励政策、客户资料、财务信息等，以及非专利技术、设计、程序、技术数据、制作方法、资讯来源等，均构成该方的商业秘密；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">2、保密：双方对在本协议下知悉的另一方的任何商业秘密均负有保密义务，任何一方在任何时候均不得向第三方披露另一方的商业秘密，非经另一方书面许可不得向任何第三方泄露；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">3、任何一方违反本条规定的，应全额赔偿另一方因此遭受的全部直接和间接损失。如果损失难以计算，则按<input :readonly="readOnly" v-model="contractContent.breachOfAgreementMoney" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="number" min="1" max="100" >万元计算；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">4、本协议终止后至少<input :readonly="readOnly" v-model="contractContent.confidentialityPeriod" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="number" min="1" max="30" >年内，双方仍然负有本条款项下规定的保密义务。</p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第十一条 通知</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、根据本协议需要一方向另一方发出的全部通知以及双方的文件往来及与本协议有关的通知和要求等，必须采用书面形式，通过传真、邮寄或当面送交方式传递；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">2、一方变更通知或通讯地址，应自变更之日起 3 日内，以书面形式通知另一方；否则，由未通知方承担由此而引起的相关责任。</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;font-weight: bold">甲方通知或通讯地址：<input :readonly="readOnly" v-model="contractContent.firstPartyNotifyAddress" style="text-align: left; width:60%;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text"></p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;font-weight: bold">乙方通知或通讯地址：<input :readonly="readOnly" v-model="contractContent.secondPartyNotifyAddress" style="text-align: left;width:60%;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text"></p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第十二条 违约责任</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、甲乙双方任何一方严重违反本协议，造成本合同约定的合作业务无法经营或由于一方不 履行本协议规定的义务、经通知纠正后 15 日内仍未纠正的，视作根本违约，守约方有权解除本协议。如双方同意继续合作，违约方仍应赔偿守约方的经济损失。</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">2、甲方保证所提供的技术设备的正常运作，如完全因甲方技术设备原因给消费者造成相关损失，由甲方承担所有责任。</p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第十三条 协议的修改与解除：</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、协议修改必须经双方一致同意，任何一方单方所作的修改、添加等均不具有法律效力。</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">2、对本协议所作的任何修改，须经双方在书面协议上签字方能生效；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">3、有下列情形之一的，可以解除本协议：</p>
      <p style="text-indent: 4em; line-height: 2em;margin-bottom: 10px;">(1)、经双方协商一致；</p>
      <p style="text-indent: 4em; line-height: 2em;margin-bottom: 10px;">(2)、因不可抗力致使不能实现本协议目的；</p>
      <p style="text-indent: 4em; line-height: 2em;margin-bottom: 10px;">(3)、在履行期限届满之前，一方明确表示或者以自己的行为表明不履行主要义务，或不遵守本协议内容；</p>
      <p style="text-indent: 4em; line-height: 2em;margin-bottom: 10px;">(4)、一方延迟履行主要义务，经催告后在合理期限内仍未履行；</p>
      <p style="text-indent: 4em; line-height: 2em;margin-bottom: 10px;">(5)、甲方延迟履行义务或者有其他违约行为致使不能实现协议目的；</p>
      <p style="text-indent: 4em; line-height: 2em;margin-bottom: 10px;">(6)、法律规定的其他情形。</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">4、具备上述情形，守约方可单方面解除合同，合同自通知到达对方时解除。</p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第十四条 争议的处理：</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、本合同未涉及的部分，均按《中华人民共和国合同法》及相关法律法规的有关规定执行；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">2、本合同在履行过程中发生的争议，由双方当事人协商解决，协商不成时可向甲方所在地人民法院起诉。</p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第十五条协议的生效、终止及其他：</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、本协议一式二份，甲乙双方各执一份，自双方授权代表签字、盖章之日起正式生效；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">2、甲方与乙方的资源方进行的合作或甲乙双方之外有与本合同冲突的条款，一切以甲方另行与乙方的资源方签订的合同为准；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 40px;">3、本合同终止或解除后，不影响甲方与乙方资源合作方的合作，服务期及内容以甲方与乙方资源签订的协议为准，乙方不得向甲方索取任何费用。</p>
      <p style="text-indent: 2em; line-height: 2em;" class="footer"><span style="display: inline-block;width: 600px">甲方（盖章）：</span><span
              style="display: inline-block;width: 600px">乙方（盖章）：</span></p>
      <p style="text-indent: 2em; line-height: 2em;" class="footer"><span style="display: inline-block;width: 600px">授权签字：</span><span
              style="display: inline-block;width: 600px">授权签字：</span></p>
      <p style="text-indent: 2em; line-height: 2em;"  class="footer">
        <span style="display: inline-block;width: 600px">签署时间：<input :readonly="readOnly"
                                                                     v-model="firstPartySignDateYear"
                                                                     style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
                                                                     type="number" readonly>年<input :readonly="readOnly"
                                                                                                    v-model="firstPartySignDateMonth"
                                                                                                    style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
                                                                                                    type="number"
                                                                                                    readonly>月<input
                :readonly="readOnly" v-model="firstPartySignDateDay"
                style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
                type="number" readonly>日</span>
        <span style="display: inline-block;width: 600px">签署时间：<input :readonly="readOnly"
                                                                     v-model="secondPartySignDateYear"
                                                                     style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
                                                                     type="number" readonly>年<input :readonly="readOnly"
                                                                                                    v-model="secondPartySignDateMonth"
                                                                                                    style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
                                                                                                    type="number"
                                                                                                    readonly>月<input
                :readonly="readOnly" v-model="secondPartySignDateDay"
                style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px"
                type="number" readonly>日</span>
      </p>
      <p style="text-indent: 2em; line-height: 2em;"  class="footer">
        <span style="display: inline-block;width: 600px">地址：<input :readonly="readOnly"
                                                                   v-model="contractContent.firstPartyAddress"
                                                                   style="outline: none;width: 500px"
                                                                   type="text"></span>
        <span style="display: inline-block;width: 600px">地址：<input :readonly="readOnly"
                                                                   v-model="contractContent.secondPartyAddress"
                                                                   style="outline: none;width: 500px"
                                                                   type="text"></span>
      </p>
      <p style="text-indent: 2em; line-height: 2em;" class="footer"><span style="display: inline-block;width: 600px">电话：<input
              :readonly="readOnly" v-model="contractContent.firstPartyTelephone" style="outline: none;"
              type="text"></span><span style="display: inline-block;width: 600px">电话：<input :readonly="readOnly"
                                                                                            v-model="contractContent.secondPartyTelephone"
                                                                                            style="outline: none;"
                                                                                            type="text"></span></p>
      <p style="text-indent: 2em; line-height: 2em;" class="footer"><span style="display: inline-block;width: 600px">联系人：<input
              :readonly="readOnly" v-model="contractContent.firstPartyContact" style="outline: none" type="text"></span><span
              style="display: inline-block;width: 600px">联系人：<input :readonly="readOnly"
                                                                    v-model="contractContent.secondPartyContact"
                                                                    style="outline: none;" type="text"></span></p>
    </div>
    <div v-if="showExamineDetail" class="margin">
      <div class="msetting-account-wrapper" style="margin-left: -20px;margin-right: -20px;">
        <div class="tabs-header">
          <ul class="clearfix">
            <li
                @click="tabIndex(0)"
                :class="currentIndex===0 ? 'active' : ''"
                v-show="this.auditDetail!=''"
            >当前审核详细</li>
            <li
                @click="tabIndex(index+1)"
                :class="currentIndex===index+1 ? 'active' : ''"
                v-for="(item,index) in this.auditDetails"
                :key="index"
            >{{index==0?'首次审核':index+1+'级审核'}}</li>
          </ul>
        </div>
        <div class="tabs-content">
          <div class>
            <div class="mbottom">
              <div class="goods-fitter">
                <el-form label-width="260px" size="small">
                  <div class="search-wrapper">
                    <h4 class="title">审核明细({{auditDetail[indexa] && auditDetail[indexa].changeRemark}})</h4>
                    <div class="wrapper" v-if="this.auditDetail!=''">
                      <ul class="list">
                        <li
                            class="item"
                            v-for="(item,index) in  auditDetail[indexa] && auditDetail[indexa].auditDetailList"
                            :key="index"
                        >
                          <div
                              class="label word"
                              :class="item.auditResult!=1?'label_1':'label_2'"
                          >
                            <i
                                :class="item.auditResult!=1?'el-icon-circle-check':'el-icon-circle-close'"
                            ></i>
                            <span class="t2">{{item.sortOrder}}级审核</span>
                          </div>
                          <div class="word_line">
                            <span class="t1 tt">审核人：</span>
                            <span class="t1">{{item.sysuserName}}({{item.roleName}})</span>
                          </div>
                          <div class="word_line">
                            <span class="t1 tt">审核结果：</span>
                            <span class="t1" v-if="item.auditResult==0">
                                    <i :class="'el-icon-circle-check'"></i>
                                    {{"待审核"}}
                                  </span>
                            <span class="t1" v-if="item.auditResult==1">
                                    <i :class="'el-icon-circle-check'"></i>
                                    {{"同意"}}
                                  </span>
                            <span class="t1" v-if="item.auditResult==2">
                                    <i :class="'el-icon-circle-close'"></i>
                                    {{"不同意"}}
                                  </span>
                          </div>
                          <div class="word_line">
                            <span class="t1 tt">审核时间：</span>
                            <span class="t1">
                                    <i>
                                      <img src="../../../common/images/examine/icon_time.png" alt />
                                    </i>
                                    {{item.auditTime}}
                                  </span>
                          </div>
                          <div class="word_line">
                            <span class="t1 tt">审核意见：</span>
                            <span class="t1">{{item.comment}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div class="noDetails" v-if="this.auditDetail==''">暂无审核内容</div>
                  </div>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align: center; padding: 20px 0">
      <el-button v-if="needPrint" type="primary" size="small" v-print="'#printText'">打印</el-button>
      <el-button v-if="needKeep" type="primary" size="small" @click="submitContract(1)">保存草稿</el-button>
      <el-button v-if="needSubmit" type="primary" size="small" @click="submitContract(2)">提交并审核</el-button>
      <el-button @click="goBack" type="primary" size="small">返回</el-button>
    </div>
  </div>
</template>

<script>
import { reqContractInfoById, addContract, keepContract, editContract } from '@/api/apply/index'
import { throttleTipPop } from '@/utils/throttle'

export default {
  name: 'contact',
  data() {
    return {
      methodTwo1: false,   //方式2
      selfOperatedRadio: false,  //自营
      jdRadio: false,   //京东
      suningRadio: false,   //苏宁
      neteaseRadio: false,   //网易
      methodOneRadio: {    //分配方式1的单选框
        selfOperatedRadio: 'A',    //自营
        jdRadio: 'A',              //京东
        suningRadio: 'A',
        neteaseRadio: 'A',
      },
      methodTwoRadio: 'A',  //分配方式2的单选框
      checked1:true,
      checked2:false,
      contractNumber:'true',
      isEdit: false, // 是否为编辑
      needPrint: false, // 显示打印按钮
      needSubmit: false, // 显示提交按钮
      needKeep: false, // 显示保存按钮
      showExamineDetail: false, // 显示审核细节
      indexa: 0,
      auditDetail: [], //审核详细内容
      auditDetails: [], //审核详细头部
      currentIndex: 0,
      readOnly: false,
      disabled: true, // 是否禁止合作方式复选框
      coorperateMethods:[false,false,false,false,false,false,false,false,false,false,false,false], // 合作方式
      contractContent: {}, // 合同内容
      contractEffectiveTimeBeginYear: '', // 合同有效期开始年
      contractEffectiveTimeBeginMonth: '', // 合同有效期开始月
      contractEffectiveTimeBeginDay: '', // 合同有效期开始日
      contractEffectiveTimeEndYear: '', // 合同有效期结束年
      contractEffectiveTimeEndMonth: '', // 合同有效期结束月
      contractEffectiveTimeEndDay: '', // 合同有效期结束日
      firstPartySignDateYear: '', // 甲方-签署时间年
      firstPartySignDateMonth: '', // 甲方-签署时间月
      firstPartySignDateDay: '', // 甲方-签署时间日
      secondPartySignDateYear: '', // 乙方-签署时间年
      secondPartySignDateMonth: '', // 乙方-签署时间月
      secondPartySignDateDay: '', // 乙方-签署时间日
      myYearL:'',
      myYear:'',
      myDay:'',
      dynamicNumber:'',
    }
  },
  computed: {
      // 合作方案传参为'1,2,3'
      cooperationMethod() {
          let str = ''
          this.coorperateMethods.forEach((item, index) => {
              if(item) {
                  str += (index + 1) + ','
              }
          })
          str = str.substring(0, str.length-1)
          return str
      }
  },
  watch:{
    'contractContent.proprietaryFirst':{
      handler:function(val,oldval){
        try {
          if (val != null) {
            val -= 0;
            this.contractContent.proprietarySecond = (100 - val);
            if (this.contractContent.proprietarySecond < 0) {
              this.$message.error("自营商品分成比例填写有误");
              this.contractContent.proprietarySecond = 50;
            }
          }
        }catch (e) {}
      },
    },
    'contractContent.proprietarySecond'(val){
      try {
        if (val != null) {
          val -= 0;
          this.contractContent.proprietaryFirst = (100 - val);
          if (this.contractContent.proprietaryFirst < 0) {
            this.$message.error("自营商品分成比例填写有误");
            this.contractContent.proprietaryFirst = 50;
          }
        }
      }catch (e) {}
    },
    'contractContent.jdFirst':{
      handler:function(val,oldval){
        try {
          if (val != null) {
            val -= 0;
            this.contractContent.jdSecond = (100 - val);
            if (this.contractContent.jdSecond < 0) {
              this.$message.error("京东商品分成比例填写有误");
              this.contractContent.jdSecond = 50;
            }
          }
        }catch (e) {}
      },
    },
    'contractContent.jdSecond'(val){
      try {
        if (val != null) {
          val -= 0;
          this.contractContent.jdFirst = (100 - val);
          if (this.contractContent.jdFirst < 0) {
            this.$message.error("京东商品分成比例填写有误");
            this.contractContent.jdFirst = 50;
          }
        }
      }catch (e) {}
    },
    'contractContent.suningFirst':{
      handler:function(val,oldval){
        try {
          if (val != null) {
            val -= 0;
            this.contractContent.suningSecond = (100 - val);
            if (this.contractContent.suningSecond < 0) {
              this.$message.error("苏宁商品分成比例填写有误");
              this.contractContent.suningSecond = 50;
            }
          }
        }catch (e) {}
      },
    },
    'contractContent.suningSecond'(val){
      try {
        if (val != null) {
          val -= 0;
          this.contractContent.suningFirst = (100 - val);
          if (this.contractContent.suningFirst < 0) {
            this.$message.error("苏宁商品分成比例填写有误");
            this.contractContent.suningFirst = 50;
          }
        }
      }catch (e) {}
    },
    'contractContent.youFirst':{
      handler:function(val,oldval){
        try {
          if (val != null) {
            val -= 0;
            this.contractContent.youSecond = (100 - val);
            if (this.contractContent.youSecond < 0) {
              this.$message.error("网易商品分成比例填写有误");
              this.contractContent.youSecond = 50;
            }
          }
        }catch (e) {}
      },
    },
    'contractContent.youSecond'(val){
      try {
        if (val != null) {
          val -= 0;
          this.contractContent.youFirst = (100 - val);
          if (this.contractContent.youFirst < 0) {
            this.$message.error("网易商品分成比例填写有误");
            this.contractContent.youFirst = 50;
          }
        }
      }catch (e) {}
    },
    //方式2 自营
    methodTwoRadio(val) {
      if (val == 'A') {
        this.methodTwo1 = !this.methodTwo1
        this.contractContent.firstPartyRadio = null

      } else {
        this.methodTwo1 = !this.methodTwo1
        this.contractContent.proprietaryFirst = null
        this.contractContent.proprietarySecond = null
      }
    },
    // 方式1 自营
    'methodOneRadio.selfOperatedRadio'(val) {
      if (val == 'A') {
        this.selfOperatedRadio = !this.selfOperatedRadio
        this.contractContent.firstPartyRadio = null
      } else {
        this.selfOperatedRadio = !this.selfOperatedRadio
        this.contractContent.proprietaryFirst = null
        this.contractContent.proprietarySecond = null
      }
    },
    //京东
    'methodOneRadio.jdRadio'(val) {
      if (val == 'A') {
        this.jdRadio = !this.jdRadio
        this.contractContent.jdFirstPoint = null
      } else {
        this.jdRadio = !this.jdRadio
        this.contractContent.jdFirst = null
        this.contractContent.jdSecond = null
      }
    },
    //苏宁商品
    'methodOneRadio.suningRadio'(val) {
      if (val == 'A') {
        this.suningRadio = !this.suningRadio
        this.contractContent.suningFirstPoint = null
      } else {
        this.suningRadio = !this.suningRadio
        this.contractContent.suningFirst = null
        this.contractContent.suningSecond = null
      }
    },
    //网易商品
    'methodOneRadio.neteaseRadio'(val) {
      if (val == 'A') {
        this.neteaseRadio = !this.neteaseRadio
        this.contractContent.youFirstPoint = null
      } else {
        this.neteaseRadio = !this.neteaseRadio
        this.contractContent.youFirst = null
        this.contractContent.youSecond = null
      }
    },
  },
  mounted() {
      this.checkIfNewContract()
      const myDate = new Date();
      const myYear = myDate.getFullYear();
      const myMonth = myDate.getMonth() +1;
      const myDay = myDate.getDate()
      const dynamicNumber = Math.floor(Math.random()*10000)
      this.contractContent.contractSn="SO"+myYear+''+myMonth+''+myDay+''+dynamicNumber
  },
  methods: {
    //分配方式得切换
    handeleChange1() {
      this.checked2 = !this.checked2
    },
    handeleChange2() {
      this.checked1 = !this.checked1
    },
    //切换输入框
    handlecontractNumber(){
      this.contractNumber = false
    },
    handleblur(){
      this.contractNumber = true
    },
      // 判断为详情/新增/编辑/打印方案
      checkIfNewContract() {
          // 查看合同详情
          if (this.$route.query.checkDetail) {
              this.getContractContentById()
              this.readOnly = true
          }
          // 新增方案
          if (this.$route.query.add_new_contract) {
              this.initNewContractParams()
              this.needKeep = true
              this.needSubmit = true
              this.readOnly = false
          }
          // 编辑
          if (this.$route.query.editable) {
              this.needKeep = true
              this.needSubmit = true
              this.readOnly = false
              this.isEdit = true
              this.getContractContentById()
          }
          // 打印方案
          if (this.$route.query.printable) {
              this.getContractContentById()
              this.readOnly = true
              this.needPrint = true
          }
      },
    isRunNian(Year) {
      if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
        return true;
      } else {
        return false;
      }
    },
      v_day(year,month,day){
        try {
          year-=0, month-=0, day-=0
        }catch (e) {
          return false;
        }
        if(day<1)return false;
        if(month===1 || month===3 || month===5 || month===7 || month===8 || month===10 || month===12){
          if(day<=31)return true;
        }else if(month===2){
          if(this.isRunNian(year)){
            if(day<=29)return true;
          } else{
            if(day<=28)return true;
          }
        }else if(month===4 || month===6 || month===9 || month===11){
          if(day<=30)return true;
        }else {
          return false;
        }
        return false;
      },
      //  保存至草稿1 / 提交方案2
      async submitContract(index) {
          const hour = ' 00:00:00'
          let res = {}

          try {
            this.contractEffectiveTimeBeginYear-=0, this.contractEffectiveTimeBeginMonth-=0, this.contractEffectiveTimeBeginDay-=0
            this.contractEffectiveTimeEndYear-=0, this.contractEffectiveTimeEndMonth-=0, this.contractEffectiveTimeEndDay-=0
          }catch (e) {
            this.$message.error("合作期限时间填写有误!");return ;
          }
          let now = new Date();
          //合作期限 时间校验
          console.log(this.contractEffectiveTimeEndYear)
          if(!this.contractEffectiveTimeBeginYear || this.contractEffectiveTimeBeginYear<2000 || this.contractEffectiveTimeBeginYear>(now.getFullYear()+50) ){
            this.$message.error("合作期限时间填写有误!");return ;
          }
          if(!this.contractEffectiveTimeEndYear || this.contractEffectiveTimeBeginYear<2000 || this.contractEffectiveTimeBeginYear>(now.getFullYear()+100) ){
            this.$message.error("合作期限时间填写有误!");return ;
          }
          if(! this.v_day(this.contractEffectiveTimeBeginYear,this.contractEffectiveTimeBeginMonth,this.contractEffectiveTimeBeginDay)){
            this.$message.error("合作期限时间填写有误!");return ;
          }
          if(! this.v_day(this.contractEffectiveTimeEndYear,this.contractEffectiveTimeEndMonth,this.contractEffectiveTimeEndDay)){
            this.$message.error("合作期限时间填写有误!");return ;
          }

          if(this.checked2){
          	this.contractContent.cooperationMode=2;
          }else {
          	this.contractContent.cooperationMode=1;
          }

          this.contractContent.cooperationMethod = this.cooperationMethod
          this.contractContent.effectiveTimeStart = this.contractEffectiveTimeBeginYear + '-' + this.contractEffectiveTimeBeginMonth + '-' + this.contractEffectiveTimeBeginDay + hour
          this.contractContent.effectiveTimeEnd = this.contractEffectiveTimeEndYear + '-' + this.contractEffectiveTimeEndMonth + '-' + this.contractEffectiveTimeEndDay + hour
          this.contractContent.firstPartySignDate = this.firstPartySignDateYear + '-' + this.firstPartySignDateMonth + '-' + this.firstPartySignDateDay + hour
          this.contractContent.secondPartySignDate = this.secondPartySignDateYear + '-' + this.secondPartySignDateMonth + '-' + this.secondPartySignDateDay + hour
          if (this.isEdit) { // 为编辑合同
              if (index === 1){ //保存至草稿
                  res = await editContract(this.contractContent)
              } else if (index === 2) { // 提交合同
                  let data = {...this.contractContent}
                  data.enable = true;
                  res = await editContract(data)
              }
          } else { // 为新增合同
              if (index === 1){ //保存至草稿
                  res = await keepContract(this.contractContent)
              } else if (index === 2) { // 提交合同
                  res = await addContract(this.contractContent)
              }
          }
          if (res.code === 200) {
              throttleTipPop(this, 'success', res.message)
              this.$router.push({
                  path: '/apply/contractList',
              })
          }
      },
      // 返回
      goBack() {
          window.history.go(-1)
      },
      // ###审核明细
      tabIndex(index) {
          this.currentIndex = index;
          this.indexa = index;
          if (index == 0) {
              this.indexa = this.auditDetail.length - 1;
          } else {
              this.indexa = index - 1;
          }
      },

      // ###新增合同
      // 初始化新增合同参数
      initNewContractParams() {
          this.contractContent = {
            firstPartyRadio: '',
              proprietaryFirst:"",
              proprietarySecond:"",
              jdFirst:"",
              jdSecond:"",
              jdFirstPoint:"",
              suningFirst:"",
              suningSecond:"",
              suningFirstPoint:"",
              youFirst:"",
              youSecond:"",
              youFirstPoint:"",
              firstBankAccountName:"",
              firstReBank:'',
              firstReBankAccount:"",
              secondParty:'',
              secondTiTaxNumber:"",
              secondTiTelephone:"",
              secondTiBank:"",
              secondTiBankAccout:"",
              secondTiBillingAddress:"",
              signTime: '',
              contractName: '合作协议',
              contractSn: '',
            firstParty: '深圳市迈戈实业有限公司',
              secondParty: '',
              cooperationMethod: '',
              effectiveTimeStart: '',
              effectiveTimeEnd: '',
              projectOne: '',
              oneFirstPartyRadio: '',
              oneSecondPartyRadio: '',
              projectTwo: '',
              twoFirstPartyRadio: '',
              twoSecondPartyRadio: '',
              secondPartyBankAccountName: '',
              secondPartyBank: '',
              secondPartyBankAccount: '',
              firstPartyCompanyName: '深圳市迈戈实业有限公司',
              firstTaxNumber: '914403007586390279',
              firstBillingAddress: '深圳市福田区梅林街道梅都社区梅林路48号理想时代大厦8C',
              firstTelephone: '82914275',
              firstPartyBank: '平安银行深圳岗厦支行',
              firstPartyBankAccount: '11006119953901',
              returnDay: '',
              changeDay: '',
              accidentDay: '',
              breachOfAgreementDay: '',
              breachOfAgreementMoney: '',
              confidentialityPeriod: '',
            firstPartyNotifyAddress: '深圳市福田区梅林街道梅都社区梅林路48号理想时代大厦8C',
              secondPartyNotifyAddress: '',
              firstPartySignDate: '',
              firstPartyAddress: '',
              firstPartyTelephone: '',
              firstPartyContact: '',
              secondPartySignDate: '',
              secondPartyAddress: '',
              secondPartyTelephone: '',
              secondPartyContact: '',
              electronicContract: '',
              status: 0,
              auditUserId: 1,
              auditReason: '',
              auditTime: '',
              createUserId: 1,
              createTime: '',
              updateUserId: 1,
              updateTime: '',
              remark: '',
              deleteStatus: 0
          }
      },

      // ###查看合同详情
      // 根据id获取合同内容
      async getContractContentById() {
        const id = this.$route.query.id
        const res = await reqContractInfoById(id)
        if (res.code === 200) {
          this.contractContent = res.data
          this.cooperationMode = this.contractContent.cooperationMode
          if (this.cooperationMode == 1) {
            this.checked1 = true
            this.checked2 = false
          } else if (this.cooperationMode == 2) {
            this.checked1 = false
            this.checked2 = true
          }
        }
        // 获取合同有效期开始
        const startDate = this.getSplitTime(this.contractContent.effectiveTimeStart)
        this.contractEffectiveTimeBeginYear = startDate[0]
        this.contractEffectiveTimeBeginMonth = startDate[1]
        this.contractEffectiveTimeBeginDay = startDate[2]
        // 获取合同有效期结束
        const endDate = this.getSplitTime(this.contractContent.effectiveTimeEnd)
        this.contractEffectiveTimeEndYear = endDate[0]
        this.contractEffectiveTimeEndMonth = endDate[1]
        this.contractEffectiveTimeEndDay = endDate[2]
        // 获取合作方式
        this.getContractCooperateMethod(this.contractContent.cooperationMethod)
        // 获取甲方-签署时间
        const firstPartySignDate= this.getSplitTime(this.contractContent.firstPartySignDate)
        this.firstPartySignDateYear = firstPartySignDate[0]
        this.firstPartySignDateMonth = firstPartySignDate[1]
        this.firstPartySignDateDay = firstPartySignDate[2]
        // 获取乙方-签署时间
        const secondPartySignDate= this.getSplitTime(this.contractContent.secondPartySignDate)
        this.secondPartySignDateYear = secondPartySignDate[0]
        this.secondPartySignDateMonth = secondPartySignDate[1]
        this.secondPartySignDateDay = secondPartySignDate[2]
      },
      // 所有input禁止输入
      forbidInput() {
        const inputNodes = document.querySelectorAll('input')
        Array.forEach.call()
      },
      //  拆分获取合同合作方式
      getContractCooperateMethod(method){
          method.split(',').forEach((item) => {
            this.coorperateMethods[item*1 - 1] = true
          })
      },
      // 拆分获取返回时间
      getSplitTime(time) {
        if(time&&time.split){
          let date = time.split(' ')
          date = date[0].split('-')
          return  date
        }
        return ['','','']
      }
  },
};
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
    .search-wrapper1 {
      padding: 20px;
      border: 1px solid rgb(215, 224, 241);
      background: #fff;
      display: flex;
      align-items: center;
      .title1 {
        display: flex;
        margin-left: 40%;
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
  .text {
    padding: 40px 40px;
  }
  .checkbox {
    position: relative;
  }
  .checked:after {
    position: absolute;
    top: 1px;
    left: 0px;
    display: inline-block;
    content: '';
    width: 12px;
    height: 5px;
    border-left: 1px solid #000;
    border-bottom: 1px solid #000;
    transform: rotate(-45deg);
  }
  input[type='text']{
    color: #666666;
  }
.footer{
  width: 1200px;
  display: flex;
  justify-content: space-between;
}

  /deep/ .el-checkbox__inner {
    transform: scale(1.5);
  }

  /deep/ .el-radio {
    line-height: 30px;
    margin: 0;
  }
</style>
