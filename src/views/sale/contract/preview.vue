<template>
  <div class="margin">
    <div class="goods-fitter">
      <div class="mcard" style="border:1px solid #d7e0f1">
        <div class="header">
          <el-button type="primary" size="small" @click="back">返回</el-button>
          <el-button class="operate" type="primary" size="small" @click="print" v-print="'#printTest'">打印</el-button>
       <!--    <el-button class="operate" type="primary" size="small">导出PDF</el-button> -->
        </div>

        <div class="look" id="printTest">
          <div class="contractTitle" style="text-align:center;margin-top:49px;margin-bottom:9px">
            <h2
              style="font-size:35px;
                  font-family:Microsoft YaHei;
                  font-weight:400;
                  line-height:59px;
                  color:rgba(52,62,74,1);
                  opacity:1;"
            >宣传品订购合同</h2>
            <div class="contractNo" style="overflow:hidden">
              <span
                style="float:right;line-height:94px;font-size:14px;color:rgba(102,98,97,1);margin-right:44px;"
              >合同编号：{{page.contractNo}}</span>
            </div>
              <div class="companyMessage" style="margin-left:44px;
                text-align:left">
              <span
                style="font-size:16px;
                display:inline-block;
                font-family:Microsoft YaHei;
                font-weight:400;
                line-height:28px;
                width:500px;
                color:rgba(102,98,97,1);
                margin-right:117px"
              >甲方: {{page.acompanyName}}</span>
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);"
              >乙方: {{page.bcompanyName}}</span>
              <br />
             <!--  <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:217px;
                line-height:28px;
                color:rgba(102,98,97,1);
                margin-right:400px"
              >地址: {{page.aaddress}}</span>
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:217px;
                line-height:28px;
                color:rgba(102,98,97,1);"
              >地址: {{page.baddress}}</span>
              <br /> -->
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);
                margin-right:117px"
              >联系人: {{page.acontact}}</span>
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);"
              >联系人: {{page.bcontact}}</span>
              <br />
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);
                margin-right:117px"
              >联系电话: {{page.atel}}</span>
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);"
              >联系电话: {{page.btel}}</span>
              <br />
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);
                margin-right:117px"
              >传真: {{page.afax}}</span>
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);"
              >传真: {{page.bfax}}</span>
              <br />
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);
                margin-right:117px"
              >电子邮箱: {{page.aemail}}</span>
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);"
              >电子邮箱: {{page.bemail}}</span>
              <br />
            </div>
            <div class="content" style="margin-left:44px;
                margin-top:60px;
                text-align:left">
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    乙方兹向甲方订购一批宣传品，现经甲乙双方充分协商，特订立本宣传品订购合同(以下简称"合同")如下，以便双方共同遵守：
                   
                </p>    
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    第一条 声明与承诺
                   
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    1、甲乙双方保证具备相应的资格、资质、权力及权限签署和履行本协议，并已履行必要的内部审批程序。
                   
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　2、甲乙双方保证有能力履行其于本协议项下之义务，且该等履行义务的行为不违反任何对其有约束力的法律法规、监管要求、法律文件或协议对其的限制。
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    第二条 合同标的  
                </p>    　　
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　乙方向甲方购买宣传品的名称、数量、单价、交货日期等情况详见附件-《宣传品清单》。
                </p>    　
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    第三条 合同金额 
                </p>     
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　本合同总金额共计人民币<span style="text-decoration:underline">{{page.contractFactFeeAmt}}</span>(小写：人民币【<span style="text-decoration:underline">{{page.contractFactFeeMoney}}</span>】元)，该等价格包含各项相关税费(包括但不限于增值税税费)及货物运至乙方指定地点的运费和相关费用。
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    第四条 交货地点
                </p>     
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　交货地点为乙方指定之交货地址(位于深圳福田理想城)。
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    第五条 付款及结算方式
                </p>     
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　合同签订后，按以下第【<span style="text-decoration:underline">{{page.settlementType}}</span>】种方式付款：
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　(1)分期付款：合同生效后<span style="text-decoration:underline">{{page.payLimitDay}}</span>日内，乙方即支付合同金额的<span style="text-decoration:underline">{{page.depositPercentage}}</span>% 即人民币<span style="text-decoration:underline">{{page.depositAmt}}圆</span>(小写：人民币【<span style="text-decoration:underline">{{page.deposit}}</span>】元)作为预付款，剩余款项在甲方完成全部交货后支付。
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　(2)一次性付款：所有货物经乙方验收确认后，乙方 <span style="text-decoration:underline">{{page.payLimitDay}}</span>个工作日内 一次性结清甲方全部货款。
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    第六条 发票有关责任与义务
                </p>     
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　甲方应向乙方开具合法的增值税抵扣凭证(包括但不限于增值税专用发票，下同)，并在每期向乙方请款时提交相应金额的增值税抵扣凭证。发票开具项目为明细 ，金额人民币<br/>
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    ">  
                  <span style="text-decoration:underline">{{page.goodsMoney}}</span>元，税额人民币<span style="text-decoration:underline">{{page.tax}}</span>元,价税合计金额人民币<span style="text-decoration:underline">{{page.contractFactFeeMoney}}</span>元，与合同签订的内容保持一致。乙方需向甲方提供增值税抵扣凭证开具所需信息。
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　甲方承诺：
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　1)在开具增值税抵扣凭证后<span style="text-decoration:underline">{{page.payLimitDay}}</span>个工作日之内送达至乙方。
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　2)因甲方开具的增值税抵扣凭证未能有效认证，所产生的延迟支付款项的责任由甲方承担。
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    第七条 付款方式：乙方将货款转入甲方指定账户。
                </p>     
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　合同签订后，按以下第【<span style="text-decoration:underline">{{page.settlementType}}</span>】种方式付款：
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　收款帐号：<span style="text-decoration:underline">{{page.bankAccount}}</span>
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　户名：<span style="text-decoration:underline">{{page.bankName}}</span>
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　开户行：<span style="text-decoration:underline">{{page.bankOpeningName}}</span>
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　纳税识别号(如非增值税一般纳税人，无需填写)：<span style="text-decoration:underline">{{page.taxNumber}}</span>
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    第八条 质量标准、验收方法
                </p>     
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　1、甲方承诺所提供宣传品符合国家和行业相关的产品质量安全标准。
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　2、乙方以其确认的样品、设计稿或其他制作要求作为验收依据。甲方保证其所提供产品的质量与双方确认的样品相同或符合乙方的设计稿及其他所有制作要求。
                </p>
                 <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    第九条 知识产权及其他权利保证
                </p>     
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　对于甲方为乙方所采购或定制的宣传品，甲方承诺其已取得合法使用该等宣传品所涉及之商标，专利及著作权等知识产权及其他权利的合法授权，以及获得在该等宣传品上
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    ">     
                    添加、印制、标识乙方公司名称及/或Logo的合法授权乙方使用、派发甲方所提供的宣传品不会引起任何第三方的知识产权或其他权利纠纷。否则，甲方须负责处理所有纠纷，并
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    ">    
                    赔偿因此给乙方造成的一切损失。
                </p>
                 <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    第十条 产品包装法及费用负担
                </p>     
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　包装按乙方确认的设计及样式生产，包装的物料、印刷等费用由甲方负担。
                </p>
                 <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    第十一条 运输方法及费用负担
                </p>     
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　甲方负责以汽车运输方式送货到乙方指定交货地点，并全额负担运费。
                </p>
                 <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    第十二条 保密
                </p>     
             
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　1、甲方承诺，本协议履行过程中所取得或获悉的有关乙方的文件、资料及其他信息载体或信息均被视为保密信息。
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　2、未经乙方书面同意，甲方只能在履行本协议范围内对保密信息进行使用，不得将保密信息用于与本协议无关的事项，也不得将保密信息泄漏给任何第三方或者与履行本<br/>
                 </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    ">      
                    协议事项无关的内部员工
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　3、甲方应尽必要努力，并通过严格的内控制度，确保接触到乙方保密信息的所有员工严格履行保密义务。
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　4、若依照有关法律、行政法规或有权机关的要求，甲方必须向有权机关或第三方披露保密信息的，应当在披露前及时告知乙方。
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　5、保密期限自乙方向甲方或其有关员工实际提供保密信息之日起算，至相关信息依本协议不再为保密信息之日起终止。
                </p>  
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    第十三条 违约责任
                </p>     
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　1、甲方应按期履行交货义务。如甲方未能在约定时间内交货，每延期交货一天，须按货物总金额 1% 的标准向乙方偿付违约金(含增值税及附加税费)。甲方延期交货超过
                 </p>
                 <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                   ">    
                    三天 ，乙方有权解除本合同，甲方应当返还乙方支付的全部费用。
                 </p>
                
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　2、甲方应保证向乙方交付的宣传品及其包装符合合同约定的质量标准，否则甲方应根据乙方要求承担退货或换货的责任，同时甲方应赔偿因此造成的乙方的全部损失。
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　3、因甲方违约而应当支付的违约金和承担的赔偿责任，乙方有权从尚未支付甲方的剩余款项中直接扣除，不足部分甲方应当足额赔偿。
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　4、本合同所涉及违约责任相关条款约定的违约金含增值税及附加税费。
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    第十四条 争议的解决
                </p>     
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　甲乙双方因履行本合同而发生的一切争议，合同双方应首先尝试通过协商方式解决。协商解决不成的，双方同意将争议提交当地仲裁委员会，根据该会届时有效的仲裁规则
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                   ">    
                  进行仲裁，仲裁地点在当地，仲裁裁决是终局的，对双方均有约束力。
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    第十五条 本合同经甲乙双方法定代表人(负责人)或其授权代表签字并加盖公章后生效，正本一式肆份，甲乙双方各执贰份，具有同等法律效力。
                </p>  
            </div>
            <div class="companyMessage" style="margin-top:58px;
            margin-left:44px;
                text-align:left">
              <span
                style="font-size:16px;
                display:inline-block;
                font-family:Microsoft YaHei;
                font-weight:400;
                line-height:28px;
                width:500px;
                color:rgba(102,98,97,1);
                margin-right:117px"
              >甲方（盖章）： </span>
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);"
              >供方（乙方）：</span>
              <br />
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);
                margin-right:117px"
              >地址：{{page.aaddress}}</span>
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);"
              >地址: {{page.baddress}}</span>
              <br />
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);
                margin-right:117px"
              >法人（签字）：</span>
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);"
              >法人（签字）：</span>
              <br />
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);
                margin-right:117px"
              >授权代表（签字）：</span>
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);"
              >授权代表（签字）：</span>
              <br />
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);
                margin-right:117px"
              >签约时间：</span>
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);"
              >签约时间：</span>
              <br />
            </div> 
            <div class="header1" style="width: 1200px;
                margin: 0 auto;
                border-bottom: 1px solid #999999;
                padding-bottom: 7px;
                overflow: hidden;
                margin-top:60px;">
                <span style="float:left;margin-left:25px;
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(102,98,97,1);">附件</span>
                <span style="float:right;
                margin-right:25px;
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(102,98,97,1);">价格单位：人名币元</span>
            </div>
            <div class="title2" style="text-align:center;margin-top:49px;margin-bottom:9px">
              <h2
                  style="font-size:35px;
                      font-family:Microsoft YaHei;
                      font-weight:400;
                      line-height:59px;
                      color:rgba(52,62,74,1);
                      opacity:1;"
                >宣传品订购合同</h2>
            </div>
            <div class="content" style="
                margin-top:48px;
                text-align:left">
                <div class="tableA" >
                    <table
                      class="border-table"
                      border="1"
                      cellspacing="0"
                      cellpadding="0"
                      style="width:100%;font-size:16px;
                      font-family:Microsoft YaHei;
                      font-weight:400;
                      line-height:21px;
                      margin:0 auto;"
                    >
                      <tbody>
                        <tr style="height:50px;line-height:50px" >
                          <td width="40" align="center">
                            <span style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">序号</span>
                          </td>
                        <!--   <td width="110" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">图样</strong>
                          </td> -->
                        
                          <td width="300" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">商品信息</strong>
                          </td>
                          <td width="100" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">规格型号</strong>
                          </td>
                          <td  width="80" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">税率</strong>
                          </td>
                          <td width="80" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">数量</strong>
                          </td>
                          <td  width="100" align="center" style="width:80px">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">不含税价</strong>
                          </td>
                          <td  width="80" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">税费</strong>
                          </td>
                          <td  width="80" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">含税价</strong>
                          </td>
                          <td  width="80" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">合计</strong>
                          </td>
                          <td width="100" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">交货日期</strong>
                          </td>
                          <td width="100" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">备注</strong>
                          </td>
                        </tr>
                        <tr v-for="(item,index) in page.goodsDetailListVo" :key="index">
                          <td align="center" style="vertical-align: middle;
                            text-align: center; ">
                            <span>{{index+1}}</span>
                            </td>
                     <!--  <td align="center" style="vertical-align: middle;
                            text-align: center; ">
                        <img v-show="!item.goodsImgUrl" src="@/common/images/暂无图片.jpg" alt=""  style="width:100px;height:100px;margin-top: 2px;"/>
                        <img v-show="item.goodsImgUrl" :src="item.goodsImgUrl" alt=""  style="width:100px;height:100px;margin-top: 2px;"/>
                        
                      </td> -->
                    
                      <td align="left"  valign="middle" >
                        <div class="goods">
                          <div class="txt_left">商品名称：{{item.goodsName}}</div>
                          <div class="txt_left">货号：{{item.goodsSn}}</div>
                          <div class="txt_left">型号：{{item.modelNumber}}</div>
                          <div class="txt_left">品牌：{{item.brandName}}</div>
                          <div class="txt_left">SKU：{{item.goodsSkuId}}</div>
                          
                        </div>
                      </td>
                      <td align="center"
                       style="vertical-align: middle;
                            text-align: center; ">{{item.goodsSpecSize}}</td>
                      <td align="center"
                       style="vertical-align: middle;
                            text-align: center; ">{{item.taxRate}}%</td>
                      <td align="center"
                       style="vertical-align: middle;
                            text-align: center; ">
                        <span>{{item.goodsCount}}</span>
                      </td>
                      <td align="center"
                       style="vertical-align: middle;
                            text-align: center; ">
                        <span>{{item.notTaxPrice}}</span>
                      </td>
                      <td align="center"
                       style="vertical-align: middle;
                            text-align: center; ">
                        <span>{{item.tax}}</span>
                      </td>
                      <td align="center"
                       style="vertical-align: middle;
                            text-align: center; ">
                        <span>{{item.goodsPrice}}</span>
                      </td>
                      <td align="center"
                       style="vertical-align: middle;
                            text-align: center; ">
                        <span>{{item.totalPrice}}</span>
                      </td>
                      <td align="center"
                       style="vertical-align: middle;
                            text-align: center; ">
                        <span>{{(item.deliveryCycle.substring(0,9))}}</span>
                      </td>
                      <td align="center"
                       style="vertical-align: middle;
                            text-align: center; ">
                        <span>{{item.remark}}</span>
                      </td>
                    </tr>
                      
                      </tbody>
                    </table>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import {previewContract} from '@/api/sale/index'
export default {
  name: "Preview",
   filters: {
    date: function(val) {
      val.substring(0,9)
      val.replace(reg,"$5年$8月$11日")
      return val
    }
    },
  data() {
    return{
     page:[],
     contractId: "",//路由传过来的ID
     tableData:[
          {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
    }
  },
  created() {
    this.getParams();
    this._getContract();
  },
  methods: {
    //获取合同ID
    getParams() {
      this.contractId = this.$route.query.id
      
    },
    //预览合同
    _getContract(){
      previewContract(this.contractId).then(res=>{
          this.page = res.data
          
      })
    },
  
    back(){
      this.$router.back();
    },
    print(){

    }
  }
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
  .search-wrapper {
    padding: 20px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
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
  .el-date-picker {
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
.mail-fitter {
  .mail-wrapper {
    padding: 20px;
    padding-bottom: 0;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    .title1 {
      margin-left: -20px;
      font-size: 16px;
      font-weight: 400;
      color: 3333;
      padding-left: 10px;
      line-height: 1.4;
      border-left: 4px solid $themeColor;
      margin-bottom: 23px;
    }
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
.detail {
  font-size: 14px;
  color: #606266;
}
.i-div {
  cursor: pointer;
}

.line-div {
  display: flex;
  justify-content: space-around;
}
.fuzhi {
  background: rgba(229, 162, 75, 1);
}
.huishouzhan {
  background: rgba(247, 108, 110, 1);
}
.el-select-width {
  max-width: 300px;
  margin-right: 5px;
}
.el-date-picker {
  max-width: 240px;
  margin-right: 5px;
}
.el-input-width {
  display: inline-block;
  max-width: 180px;
}
.el-select {
  width: 100% !important;
}
//自定义表格样式
.martop {
  margin-top: 10px;
}
.imgitem {
  display: flex;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
}

.more {
  cursor: pointer;
}
.mores {
  padding-top: 110px;
  box-sizing: border-box;
}
.blue {
  color: #4a99fa !important;
  cursor: pointer;
}
.goods_num {
  color: #f66c6c !important;
  font-size: 16px;
  margin-right: 5px;
}
.leftbottom {
  color: #4a99fa;
  border-bottom: 1px dashed rgba(215, 220, 231, 1);
  padding-bottom: 8px;
}
.line {
  display: flex;
  justify-content: flex-start;
}
.small_top {
  margin-top: 10px;
}
.mcard1 {
  border: 1px solid #d7e0f1;
  margin-top: 20px;
}
.pushTip {
  padding-left: 98px;
  padding-right: 70px;
  .star {
    color: red;
  }
}
.txt_red {
  color: #f66c6c;
}

.el-input-group__append button.el-button {
  width: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.tip {
  margin-top: -30px;
  text-align: center;
  line-height: 22px;
  .tipImg {
    position: relative;
    left: -16px;
    top: 28px;
  }
}
.look {
  width: 1200px;
  margin: 0 auto;
}
.header {
  width: 1320px;
  margin: 0 auto;
  border-bottom: 1px solid #999999;
  padding-bottom: 7px;
  overflow: hidden;
  .operate {
    float: right;
  }
  .operate:nth-of-type(1) {
    margin-right: 40px;
    margin-left: 12px;
  }

}
  .tableA {
  table {
    width: 1200px;
    border-color: #aaaaaa;
    border-collapse: collapse;
    margin: 0 auto;

    tr td {
      border: 1px solid #aaaaaa;
    }
  }
}


</style>