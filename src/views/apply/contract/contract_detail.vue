<template>
  <div class="margin">
    <div id="printText" style="background: white;" class="text">
      <h3 style="font-size: 36px;text-align: center;margin-bottom: 90px;">合作协议</h3>
      <p style="margin-bottom: 60px;text-align: center">合同编号：<input :readonly="readOnly" v-model="contractContent.contractSn" style="outline: none;" type="text"></p>
      <p style="margin-bottom: 30px;"><span style="font-weight: bold">甲方：</span><input :readonly="readOnly" v-model="contractContent.firstParty" style="text-align: center;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">（以下简称甲方）</p>
      <p style="margin-bottom: 40px;"><span style="font-weight: bold">乙方：</span><input :readonly="readOnly" v-model="contractContent.secondParty" style="text-align: center;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">（以下简称乙方）</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">甲乙双方本着公平公正、平等自愿的原则，为充分发挥双方各自优势，实现和谐共赢，根 据《中华人民共和国合同法》的规定，经友好协商达成合作，双方共同遵守，精诚合作，互相 支持，共同发展，具体如下：</p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第一条 合作目的：</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">由乙方通过乙方资源为甲方带来并开展业务 ，未另行约定的情况下全部由甲方搭建、运营 与经营管理，互惠互利，利益共享（有另行约定的，以甲方与乙方资源方另行约定为准）。</p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第二条 合作方式：</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">甲乙双方选择以下一种或多种方式进行合作：</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">
        <span style="margin-right: 50px">
          （1）、
        <label for="my_checkbox1" style="position: relative;top: 1px; margin-left: -12px;">
          <input :disabled="readOnly" v-model="coorperateMethods[0]" style="text-align: center;visibility: hidden" type="checkbox" id="my_checkbox1">
          <i class="checkbox" :class="{checked: coorperateMethods[0]}" style="display: inline-block; width: 14px;height: 14px; border: 1px solid #333;"></i>
        </label>
        资源合作；
        </span>
        <span style="margin-right: 50px">
          （2）、
        <label for="my_checkbox2" style="position: relative;top: 1px; margin-left: -12px;">
          <input :disabled="readOnly" v-model="coorperateMethods[1]" style="text-align: center;visibility: hidden" type="checkbox" id="my_checkbox2">
          <i class="checkbox" :class="{checked: coorperateMethods[1]}" style="display: inline-block; width: 14px;height: 14px; border: 1px solid #333;"></i>
        </label>
        技术合作；
        </span>
        <span>
          （3）、
        <label for="my_checkbox3" style="position: relative;top: 1px; margin-left: -12px;">
          <input :disabled="readOnly" v-model="coorperateMethods[2]" style="text-align: center;visibility: hidden" type="checkbox" id="my_checkbox3">
          <i class="checkbox" :class="{checked: coorperateMethods[2]}" style="display: inline-block; width: 14px;height: 14px; border: 1px solid #333;"></i>
        </label>
         ERP购买；
        </span>
      </p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">
        <span style="margin-right: 50px">
          （4）、
        <label for="my_checkbox4" style="position: relative;top: 1px; margin-left: -12px;">
          <input :disabled="readOnly" v-model="coorperateMethods[3]" style="text-align: center;visibility: hidden" type="checkbox" id="my_checkbox4">
          <i class="checkbox" :class="{checked: coorperateMethods[3]}" style="display: inline-block; width: 14px;height: 14px; border: 1px solid #333;"></i>
        </label>
        平台合作；
        </span>
        <span style="margin-right: 50px">
          （5）、
        <label for="my_checkbox5" style="position: relative;top: 1px; margin-left: -12px;">
          <input :disabled="readOnly" v-model="coorperateMethods[4]" style="text-align: center;visibility: hidden" type="checkbox" id="my_checkbox5">
          <i class="checkbox" :class="{checked: coorperateMethods[4]}" style="display: inline-block; width: 14px;height: 14px; border: 1px solid #333;"></i>
        </label>
        产品合作；
        </span>
        <span>
          （6）、
        <label for="my_checkbox6" style="position: relative;top: 1px; margin-left: -12px;">
          <input :disabled="readOnly" v-model="coorperateMethods[5]" style="text-align: center;visibility: hidden" type="checkbox" id="my_checkbox6">
          <i class="checkbox" :class="{checked: coorperateMethods[5]}" style="display: inline-block; width: 14px;height: 14px; border: 1px solid #333;"></i>
        </label>
         供应链合作。
        </span>
      </p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">具体为：</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">由乙方介绍或带来业务资源给甲方，由甲方与乙方资源另行签订合作合同的方式进行。</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">平台在未加说明的情况下，默认由甲方提供技术人员维护、运营和管理，并规划产品上线，有另外说明的以甲方与乙方资源另行签订的合作合同为准。</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 125px;">乙方负责对接与沟通，双方共同努力将平台打造成一个产品种类丰富齐全、性价比高、运行顺畅、客户体验舒适的优质平台。</p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px; margin-top: 35px;">第三条 合作期限：</h3>
      <p style="text-indent: 2em;margin-bottom: 25px;">本合作协议合作期限自<input :readonly="readOnly" v-model="contractEffectiveTimeBeginYear" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">年<input :readonly="readOnly" v-model="contractEffectiveTimeBeginMonth" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">月<input :readonly="readOnly" v-model="contractEffectiveTimeBeginDay" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">日起，至<input :readonly="readOnly" v-model="contractEffectiveTimeEndYear" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">年<input :readonly="readOnly" v-model="contractEffectiveTimeEndMonth" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">月<input :readonly="readOnly" v-model="contractEffectiveTimeEndDay" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">日止。</p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第四条 合作内容：</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、甲方通过平台向乙方资源提供商城平台里的企业集采、员工福利、礼品采购、办公用品采 购、劳保用品采购、积分商品兑换、汽车后市场、平台广告等一切产品或服务；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">2、甲方与乙方资源进行合作需要甲方另行与乙方的资源方签订合同；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">3、乙方为双方合作提供对接、问题沟通和业务协调，包括但不限于引入乙方资源客户的办公用品、员工福利、客户积分兑换等一切合作业务；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">4、甲方负责平台建设、项目管理、运营、技术支持、商品品牌授权、商家入驻、商品维护、商品推荐与供应链等，甲方与乙方的资源方另行约定的除外；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">5、平台建设和经营所需费用根据乙方资源情况，由甲方与乙方资源单独签订合同另行约定，产品的所有权在销售给消费者之前均属于甲方所有，乙方及其资源方不享有产品的所有权；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">6、乙方为合作业务提供营销与市场协作，包括但不限于引入乙方资源的办公用品、员工福利、客户积分兑换等一切合作业务，并引入乙方的资源方之外的客户资源。</p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第五条 双方的责任：</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;font-weight: bold">甲方的责任范围，主要负责：</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、负责平台建设、开发、运营、和管理；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">2、负责PC端、手机端、APP端等平台搭建、技术维护，含场景设计、页面制作；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">3、负责供应链管理(采购、仓储、国内发货等)与客服等相关工作；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">4、负责产品质量保证、处理乙方资源方反馈的客户投诉、便于有效监督与执行；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">5、全权负责服务于乙方资源。</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;font-weight: bold">乙方的责任范围，主要负责：</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、负责市场营销、业务合作，业务宣传和推广；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">2、负责与其资源的联系、沟通、对接与协调。</p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第六条 收益分配与结算：</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、本合同的收益分配，根据本合同第六条的第2条第1）、2）条二选一的方式进行分配；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">2、财务数据保持公开透明，收益分配分两种：</p>
      <p style="text-indent: 4em; line-height: 2em;margin-bottom: 10px;">是指所有通过乙方对接给甲方所有的乙方资源平台或项目的“纯利润”收入（纯利润为销售总额-采购总额-运费-税费-企业所得税-运营费用），分配比例为：</p>
      <p style="text-indent: 4em; line-height: 2em;margin-bottom: 10px;">1） 关于<input :readonly="readOnly" v-model="contractContent.projectOne" style="text-align: center;width:200px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">：甲方占<input :readonly="readOnly" v-model="contractContent.oneFirstPartyRadio" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">% ，乙方占<input :readonly="readOnly" v-model="contractContent.oneSecondPartyRadio" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">% ；运营费用由甲方出；</p>
      <p style="text-indent: 4em; line-height: 2em;margin-bottom: 10px;">2） 关于<input :readonly="readOnly" v-model="contractContent.projectTwo" style="text-align: center;width:200px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">：甲方占<input :readonly="readOnly" v-model="contractContent.twoFirstPartyRadio" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">% ，乙方占<input :readonly="readOnly" v-model="contractContent.twoSecondPartyRadio" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">%，运营费用由甲方出；</p>
      <p style="text-indent: 4em; line-height: 2em;margin-bottom: 10px;">其它本条未注明的，需要另行约定的，具体根据项目情况，甲乙双方另行签订补充协议。</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">3、结算方式：每个月核对一次销售明细及利润清单，并根据每个月的到款情况进行到款利润 的分配结算；甲方按约定对公结算，乙方按约定开具发票；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">4、乙方结算账号：</p>
      <p style="text-indent: 4em; line-height: 2em;">户名：<input :readonly="readOnly" v-model="contractContent.secondPartyBankAccountName" style="outline: none;" type="text"></p>
      <p style="text-indent: 4em; line-height: 2em;">开户行：<input :readonly="readOnly" v-model="contractContent.secondPartyBank" style="outline: none;" type="text"></p>
      <p style="text-indent: 4em; line-height: 2em;margin-bottom: 10px;">银行账号：<input :readonly="readOnly" v-model="contractContent.secondPartyBankAccount"  style="outline: none;" type="text"></p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">5、甲方开票资料：</p>
      <p style="text-indent: 4em; line-height: 2em;">公司名称：深圳市迈戈实业有限公司</p>
      <p style="text-indent: 4em; line-height: 2em;">纳税识别号：914403007586390279</p>
      <p style="text-indent: 4em; line-height: 2em;">开票地址：深圳市福田区梅林街道梅都社区梅林路48号理想时代大厦8C</p>
      <p style="text-indent: 4em; line-height: 2em;">电话：82914275</p>
      <p style="text-indent: 4em; line-height: 2em;margin-bottom: 25px;">开户行及账号：平安银行深圳岗厦支行11006119953901</p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第七条 保证与承诺：</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、双方保证任何一方不得以任何理由为名在双方合作后的资源平台从事非法活动；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">2、产品在销售给消费者之前，以及技术及平台的所有权均属于甲方所有；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">3、乙方的资源方在客户服务时接到客户反映发现有甲方多发、错发的货物，以及售后问题的，应做好详细记录，同时应立即通知甲方；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">4、甲方将按照《中华人民共和国产品质量法》、《中华人民共和国消费者权益保护法》及其它法规、部门规章和国家强制性标准的规定，对存在质量问题的售出商品提供无条件退换货服务；对非商品质量问题（商品不影响二次销售）的售出商品，自客户收到货提供<input :readonly="readOnly" v-model="contractContent.returnDay" style="width:50px;border-bottom: 1px solid #000;text-align: center; outline: none;padding: 0 6px" type="text">日内可退换货服务、<input :readonly="readOnly" v-model="contractContent.changeDay" style="width:50px;border-bottom: 1px solid #000;text-align: center; outline: none;padding: 0 6px" type="text">日内可换货服务；</p>
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
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、在合作期间，由于地震、台风、水灾、火灾、战争或其他不能预见并且对其发生和后果 不能防止和避免的不可抗力事故，致使协议的履行直接被影响或者不能按约定的条件履行时，遇有上述不可抗力事故的一方，应立即将事故情况电报通知对方，并应在<input :readonly="readOnly" v-model="contractContent.accidentDay" style="width:50px;border-bottom: 1px solid #000; text-align: center; outline: none;padding: 0 6px" type="text">天内提供事故的详细情况及协议不能履行、或者部分不能履行、或者需要延期履行的理由的有效证明文件。按照事故对协议的履行的影响程度，由双方协商决定是否解除协议、或者部分免除履行协议的责任、或者延期履行协议。</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">2、如因为不可抗力导致技术故障，进而影响服务的不能履行或履行延误，从而导致消费者理解错误而造成的任何损失，双方均不负责任。</p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第十条 商业保密条款</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、商业秘密：任何一方公开或未公开的任何技术信息和经营信息，包括但不限于：产品计划、销售计划、奖励政策、客户资料、财务信息等，以及非专利技术、设计、程序、技术数据、制作方法、资讯来源等，均构成该方的商业秘密；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">2、保密：双方对在本协议下知悉的另一方的任何商业秘密均负有保密义务，任何一方在任何时候均不得向第三方披露另一方的商业秘密，非经另一方书面许可不得向任何第三方泄露；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">3、任何一方违反本条规定的，应全额赔偿另一方因此遭受的全部直接和间接损失。如果损失难以计算，则按<input :readonly="readOnly" v-model="contractContent.breachOfAgreementMoney" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">万元计算；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">4、本协议终止后至少<input :readonly="readOnly" v-model="contractContent.confidentialityPeriod" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">年内，双方仍然负有本条款项下规定的保密义务。</p>
      <h3 style="text-indent: 2em;font-weight: bold;margin-bottom: 25px;">第十一条 通知</h3>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;">1、根据本协议需要一方向另一方发出的全部通知以及双方的文件往来及与本协议有关的通知和要求等，必须采用书面形式，通过传真、邮寄或当面送交方式传递；</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;">2、一方变更通知或通讯地址，应自变更之日起 3 日内，以书面形式通知另一方；否则，由未通知方承担由此而引起的相关责任。</p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 10px;font-weight: bold">甲方通知或通讯地址：<input :readonly="readOnly" v-model="contractContent.firstPartyNotifyAddress" style="width:60%;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text"></p>
      <p style="text-indent: 2em; line-height: 2em;margin-bottom: 25px;font-weight: bold">乙方通知或通讯地址：<input :readonly="readOnly" v-model="contractContent.secondPartyNotifyAddress" style="width:60%;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text"></p>
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
      <p style="text-indent: 2em; line-height: 2em;"><span style="display: inline-block;width: 320px">甲方（盖章）：</span><span style="display: inline-block;width: 320px">乙方（盖章）：</span></p>
      <p style="text-indent: 2em; line-height: 2em;"><span style="display: inline-block;width: 320px">授权签字：</span><span style="display: inline-block;width: 320px">授权签字：</span></p>
      <p style="text-indent: 2em; line-height: 2em;">
        <span style="display: inline-block;width: 320px">签署时间：<input :readonly="readOnly" v-model="firstPartySignDateYear" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">年<input :readonly="readOnly" v-model="firstPartySignDateMonth" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">月<input :readonly="readOnly" v-model="firstPartySignDateDay" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">日</span>
        <span style="display: inline-block;width: 320px">签署时间：<input :readonly="readOnly" v-model="secondPartySignDateYear" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">年<input :readonly="readOnly" v-model="secondPartySignDateMonth" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">月<input :readonly="readOnly" v-model="secondPartySignDateDay" style="text-align: center;width:50px;border-bottom: 1px solid #000; outline: none;padding: 0 6px" type="text">日</span>
      </p>
      <p style="text-indent: 2em; line-height: 2em;">
        <span style="display: inline-block;width: 320px">地址：<input :readonly="readOnly" v-model="contractContent.firstPartyAddress" style="outline: none;" type="text"></span>
        <span style="display: inline-block;width: 320px">地址：<input :readonly="readOnly" v-model="contractContent.secondPartyAddress" style="outline: none;" type="text"></span>
      </p>
      <p style="text-indent: 2em; line-height: 2em;"><span style="display: inline-block;width: 320px">电话：<input :readonly="readOnly" v-model="contractContent.firstPartyTelephone" style="outline: none;" type="text"></span><span style="display: inline-block;width: 320px">电话：<input :readonly="readOnly" v-model="contractContent.secondPartyTelephone" style="outline: none;" type="text"></span></p>
      <p style="text-indent: 2em; line-height: 2em;"><span style="display: inline-block;width: 320px">联系人：<input :readonly="readOnly" v-model="contractContent.firstPartyContact" style="outline: none;" type="text"></span><span style="display: inline-block;width: 320px">联系人：<input :readonly="readOnly" v-model="contractContent.secondPartyContact" style="outline: none;" type="text"></span></p>
    </div>
    <div class="margin">
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
      <el-button type="primary" size="small" v-print="'#printText'">打印</el-button>
      <el-button type="primary" size="small" @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { reqContractInfoById, addContractInfoById } from '@/api/apply/index'

export default {
  name: 'contact',
  data() {
    return {
      indexa: 0,
      auditDetail: [], //审核详细内容
      auditDetails: [], //审核详细头部
      currentIndex: 0,
      readOnly: false,
      disabled: true, // 是否禁止合作方式复选框
      coorperateMethods:[false,false,false,false,false,false], // 合作方式
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
  mounted() {
      this.checkIfNewContract()
  },
  methods: {
      // 返回
      goBack() {
          window.history.go(-1)
      },
      // 提交方案
      async submitContract() {
          const hour = ' 00:00:00'
          this.contractContent.cooperationMethod = this.cooperationMethod
          this.contractContent.effectiveTimeStart = this.contractEffectiveTimeBeginYear + '-' + this.contractEffectiveTimeBeginMonth + '-' + this.contractEffectiveTimeBeginDay + hour
          this.contractContent.effectiveTimeEnd = this.contractEffectiveTimeEndYear + '-' + this.contractEffectiveTimeEndMonth + '-' + this.contractEffectiveTimeEndDay + hour
          this.contractContent.firstPartySignDate = this.firstPartySignDateYear + '-' + this.firstPartySignDateMonth + '-' + this.firstPartySignDateDay + hour
          this.contractContent.secondPartySignDate = this.secondPartySignDateYear + '-' + this.secondPartySignDateMonth + '-' + this.secondPartySignDateDay + hour
          const res = await addContractInfoById(this.contractContent)
          console.log(res)
      },
      // 判断是否为新增方案
      checkIfNewContract() {
          // 查看合同详情
          if (this.$route.query.id) {
              this.getContractContentById()
              this.readOnly = true
          }
          // 新增方案
          if (this.$route.query.add_new_contract) {
              this.initNewContractParams()
              this.readOnly = false
          }
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

      // ###新增方案
      // 初始化新增合同参数
      initNewContractParams() {
          this.contractContent = {
              signTime: '',
              contractName: '',
              contractSn: '',
              firstParty: '',
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
              firstPartyCompanyName: '',
              firstTaxNumber: '',
              firstBillingAddress: '',
              firstTelephone: '',
              firstPartyBank: '',
              firstPartyBankAccount: '',
              returnDay: '',
              changeDay: '',
              accidentDay: '',
              breachOfAgreementDay: '',
              breachOfAgreementMoney: '',
              confidentialityPeriod: '',
              firstPartyNotifyAddress: '',
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
        let date = time.split(' ')
        date = date[0].split('-')
        return  date
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
        color: #333;
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
</style>
