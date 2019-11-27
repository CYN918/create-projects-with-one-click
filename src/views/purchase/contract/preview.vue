<template>
  <div class="margin">
    <div class="goods-fitter">
      <div class="mcard" style="border:1px solid #d7e0f1">
        <div class="header">
          <el-button type="primary" size="small" @click="back">返回</el-button>
          <el-button class="operate" type="primary" size="small" @click="print" v-print="'#printTest'">打印</el-button>
          <el-button class="operate" type="primary" size="small">导出PDF</el-button>
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
            >采购合同</h2>
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
              >需方（甲方）: {{page.acompanyName}}</span>
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);"
              >供方（乙方）: {{page.bcompanyName}}</span>
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
              >业务联系人：{{page.acontact}}</span>
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);"
              >业务联系人：{{page.bcontact}}</span>
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
                min-width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);
                margin-right:117px"
              >邮箱: {{page.aemail}}</span>
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                min-width:500px;
                line-height:28px;
                color:rgba(102,98,97,1);"
              >邮箱: {{page.bemail}}</span>
              <br />
            </div>
            <div class="content" style="margin-left:44px;
                margin-top:60px;
                text-align:left">
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    一、制作内容：  
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    乙方应按照经甲方确认的产品样品提供货物：未经甲方同意，乙方不得对商品进行任何改动。
                   
                </p>    
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    二、商品名称、规格尺寸、定制要求及交期：
                   
                </p>
                 <div class="content" style="
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
                          <td width="110" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">图样</strong>
                          </td>
                        
                          <td width="220" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">商品信息</strong>
                          </td>
                          <td width="150" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">规格型号</strong>
                          </td>
                          <td  width="60" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">税率</strong>
                          </td>
                          <td width="90" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">数量</strong>
                          </td>
                          <td width="50" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">单位</strong>
                          </td>
                          <td  width="100" align="center" >
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">不含税价(元)</strong>
                          </td>
                          <td  width="95" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">税费(元)</strong>
                          </td>
                          <td  width="80" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">含税价(元)</strong>
                          </td>
                          <td  width="95" align="center">
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
                         
                        </tr>
                        <tr v-for="(item,index) in page.goodsDetails" :key="index">
                          <td align="center" style="vertical-align: middle;
                            text-align: center; ">
                            <span>{{index+1}}</span>
                            </td>
                         
                        
                          <td align="left"  valign="middle" >
                            <div class="goods">
                              <div class="txt_left">商品名称：{{item.goodsName}}</div>
                              <div class="txt_left">货号：{{item.goodsSn}}</div>
                              <div class="txt_left">型号：{{item.modelNumber}}</div>
                              <div class="txt_left">品牌：{{item.brandName}}</div>
                              <div class="txt_left">SKU：{{item.skuId}}</div>
                              
                            </div>
                          </td>
                          <td align="center"
                          style="vertical-align: middle;
                                text-align: center; ">{{item.specSize}}</td>
                          <td align="center"
                          style="vertical-align: middle;
                                text-align: center; ">{{item.taxRate}}%</td>
                          <td align="center"
                          style="vertical-align: middle;
                                text-align: center; ">
                            <span>{{item.purchaseQuantity}}</span>
                          </td>
                          <td align="center"
                          style="vertical-align: middle;
                                text-align: center; ">
                            <span>{{item.unit}}</span>
                          </td>
                          <td align="center"
                          style="vertical-align: middle;
                                text-align: center; ">
                            <span>{{item.notaxCostPrice}}</span>
                          </td>
                         
                          <td align="center"
                          style="vertical-align: middle;
                                text-align: center; ">
                            <span>{{item.taxation}}</span>
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
                            <span>{{item.distributionTime}}</span>
                          </td>
                        </tr>
                        <tr>
                             <td width="110" align="center">
                                <strong style="
                                font-size:16px;
                                font-family:Microsoft YaHei;
                                font-weight:bold;
                                line-height:20px;
                                color:rgba(102,98,97,1);">合计</strong>
                          </td>
                           <td align="left"  valign="middle" colspan = "10" style="height: 50px; line-height: 50px;">
                              <div class="goods">
                                <div class="txt_left" style="margin-left:20px;">（大写）人民币：{{page.capitalizationAmount}}                  <span style="margin-left:50px;">¥{{page.contractFactFee}}</span></div>
                                
                              </div>
                            </td>
                        </tr>
                         <tr>
                             <td width="110" align="center">
                                <strong style="
                                font-size:16px;
                                font-family:Microsoft YaHei;
                                font-weight:bold;
                                line-height:20px;
                                color:rgba(102,98,97,1);">交货地点</strong>
                          </td>
                           <td align="left"  valign="middle" colspan = "10" style="height: 50px; line-height: 50px;">
                              <div class="goods">
                                <div class="txt_left" style="margin-left:20px;">
                                  <span>{{page.shippingAddress}}.</span>
                                  </div>
                                
                              </div>
                            </td>
                        </tr>
                         <tr>
                             <td width="110" align="center">
                                <strong style="
                                font-size:16px;
                                font-family:Microsoft YaHei;
                                font-weight:bold;
                                line-height:20px;
                                color:rgba(102,98,97,1);">包装要求</strong>
                          </td>
                           <td align="left"  valign="middle" colspan = "10" style="height: 50px; line-height: 50px;">
                              <div class="goods">
                                <div class="txt_left" style="margin-left:20px;">品牌原装包装+品牌原厂外箱，保证运输安全；</div>
                                
                              </div>
                            </td>
                        </tr>
                        <tr>
                             <td width="110" align="center">
                                <strong style="
                                font-size:16px;
                                font-family:Microsoft YaHei;
                                font-weight:bold;
                                line-height:20px;
                                color:rgba(102,98,97,1);">质保期</strong>
                          </td>
                           <td align="left"  valign="middle" colspan = "10" style="height: 50px; line-height: 50px;">
                              <div class="goods">
                                <div class="txt_left" style="margin-left:20px;">交货日期起算，全国联保1年</div>
                                
                              </div>
                            </td>
                        </tr>
                        <tr>
                             <td width="110" align="center">
                                <strong style="
                                font-size:16px;
                                font-family:Microsoft YaHei;
                                font-weight:bold;
                                line-height:20px;
                                color:rgba(102,98,97,1);">回票时间</strong>
                          </td>
                           <td align="left"  valign="middle" colspan = "10" style="height: 50px; line-height: 50px;">
                              <div class="goods">
                                <div class="txt_left" style="margin-left:20px;">{{page.ticketDate | time}}（每批产品出货前乙方须开当批货物发票）</div>
                                
                              </div>
                            </td>
                        </tr>
                        <tr>
                             <td width="110" align="center">
                                <strong style="
                                font-size:16px;
                                font-family:Microsoft YaHei;
                                font-weight:bold;
                                line-height:20px;
                                color:rgba(102,98,97,1);">定制要求</strong>
                          </td>
                           <td align="left"  valign="middle" colspan = "10" style="height: 50px; line-height: 50px;">
                              <div class="goods">
                                <div class="txt_left" style="margin-left:20px;">{{page.productRequire}}.</div>
                                
                              </div>
                            </td>
                        </tr>
                      
                      </tbody>
                    </table>
                </div>
            </div>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">                  
                            三、双方权利与义务
                </p>    
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                   1.乙方所提供产品应完全符合国家法律法规规定，符合国家质量及环保等标准，如出现违规、侵权、质量问题等引起的一切经济和法律责任，均由乙方自行承担。品牌产品乙方
                  
                   
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    ">  
                  必须有正规品牌授权，供货产品为全新品牌原装正品，如有侵权及造假行为造成甲方的损失，乙方应承担全部责任并于双倍于货款总金额赔偿给甲方。
                </p>
                 
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　2.乙方向甲方供应的商品的包装应当按照国家规定的通用方式，乙方应当采取足以保护商品的包装方式，保证全部商品完好无损地运抵甲方指定地点。
                </p> 　　
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　3.由于甲方所订购的产品为促销产品，有严格的时间性,所以要求乙方必须严格按照合同签订的交期执行；如因乙方交期延误而导致甲方的整个促销活动不能如期进行的，由此甲
                    
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    ">  
                 方造成的一切损失应由乙方承担。不可抗力的因素（包括但不限于极端自然灾害、地震、战争、政府行政行为等）除外。
                </p>    　
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　 4.甲方提供给乙方的资料信息及价格条款数量、交货时间和地点等商业秘密，乙方应对这些资料严格保密，不得接触甲方客户，除为履行本合同外，不得以任何方式使用这些资
              
                </p>     
                 <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    ">  
                  料，不得向甲方以外的任何第三方泄露。在本合同被解除、终止或完成后，乙方均应遵守。若乙方违反规定给甲方造成任何直接或间接损失的，乙方应承担一切法律责任。
                </p>        
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　 5.乙方应当自觉遵守国家法律法规以及企业竞争有关廉政建设的各项规定，甲方严禁乙方以任何形式向甲方人员贿赂。如有发生，乙方在有权拒绝的同时，应向甲方廉政监督举
                   
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    ">  
                  报，甲方有责任为乙方保密，并保证乙方不会在正常业务中受不公平待遇。甲方廉政监督联系邮箱为：241526781@qq.com
                </p>      
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                  6.乙方应保证提供给甲方的产品具有合法的销售授权并不得侵犯他人的知识产权或第三方的合法权益。若有违反，乙方应承担一切法律责任，并赔偿甲方因此所受的一切损失。
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　  7.乙方需保证所生产的商品为客户要求的全新合格商品，如果质量问题，LOGO印刷问题、货不对版问题、包装问题、材质问题造成的客户拒收或退货，将由乙方全权负责，并
                    
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    ">  
                  将责担因此造成甲方的一切损失，退给甲方全额货款及补偿此批货物总货款30%以上的金额作为补偿款。
                </p>  
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                  8.未尽事宜，双方协商签订补充协议书，该补充协议书与本合同具有同等法律效力。
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    四、交货与验收		
                </p>     
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　乙方应严格按双方商定交货时间表交货。因甲方所订购的产品需全国派发，任何一项产品交付后，乙方必须提供签收单给甲方指定收货人签收确认。如果验收结果表明乙方未按
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    ">  
                   甲方确认的产品供货，甲方有权选择拒收不合格产品或对不合格产品进行退货。在乙方交付产品后的质保期内（从本合同约定的最早交货日期起算），乙方应对产品承担质量保证义
                  
                </p> 
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    ">  
                 务，如在后续使用中有发现质量方面的问题，乙方需配合及时处理并于24小时内最终解决问题，并在收到甲方更换要求后第一时间无条件为甲方更换产品，因质量问题产生退换货的
                </p>            
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    ">  
                费用（含运费）由乙方全额承担。如乙方不配合及时处理质量问题由此给甲方造成的一切经济损失均由乙方承担。乙方如未能按时交货或产品质量不合格，所造成的一切损失由乙方
                </p>                            
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    ">  
               承担；甲、乙双方如因特殊不可抗力因素需延迟交货的，需经双方协商同意并认可；否则每逾期一天，按货款总额的百分之五向甲方支付违约金；如逾期超过交期5天甲方有权视乙方
                </p> 
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    ">  
              逾期交货的情况单方面终止本合同并要求乙方于双倍于货款总金额进行违约赔偿。             
                </p> 
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    五、付款时间及方式
                </p>     
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　1.本合同双方盖章签订后，乙方当即安排备货，甲方无需提前支付定金，本合同总金额共计人民币【XXX整】(小写：人民币【XX.00】元)。产品出货前甲方按每批出货数量安排
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    ">  
                    支付当批货物的全额货款，每批货物付款前乙方须开票拍照给到甲方，待甲方收到发票后即安排付款，乙方收到甲方的付款扫描件后即安排发货。如因乙方未及时开票导致甲方付款
                    
                </p> 
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    ">  
                   延迟乙方不得以此延误交货期，整批货物发票开齐后结清货款。
                </p>                   
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                     2.本合同双方盖章签订后生效，合同总金额共计人民币【 XXX 整】(小写：人民币【 XX.00 】元)。按双方沟通约定，甲方安排支付  XX  %定金计人民币【 XXX 整】(小写：人民
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    ">  
                   币【 XX.00 】 元)，乙方当即安排备货。产品检验合格出货前并收到全额发票后甲方安排支付  XX  %尾款计人民币【 XXX 整】(小写：人民币【 XX.00 】元)。如有分批交货每批货物                  
                </p>  
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    ">  
                  付尾款前乙方须开该批货物发票给到甲方，甲方按分批交货数量安排该批货款。如因乙方未及时开票导致甲方付款延迟乙方不得以此延误交货期，整批货物发票开齐后结清货款。
                </p>  
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    六、账户信息
                </p>     
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　1、请严格按以下增值税开票资料及合同的产品名称、数量、单价和总金额等开票：
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　公司名称：深圳市迈戈实业有限公司
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　开 户 行：平安银行深圳岗厦支行
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　账    号：11006119953901
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　税  　号：914403007586390279
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　地址、电话：深圳市福田区梅林街道梅都社区梅林路48号理想时代大厦8C，0755-82914275
                </p>
                
                 <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    line-height:28px;
                    color:rgba(102,98,97,1);">
                    七、违约责任
                </p>     
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    margin-left:28px;">
                    　本合同任何一方不履行或迟延履行约定义务，应承担相应违约责任。如因本合同履行过程中引起纠纷,甲、乙双方应该友好协商解决,协商解决不成的，应向甲方所在地人民法院提
                    
                </p>
                <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    ">  
                  起诉讼解决。
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
                    本合同一式两份，甲、乙双方各执一份，具有同等法律效力，待甲、乙双方签字盖章后成立并生效（包括扫描件）。
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
              >需方（甲方）: </span>
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
              >地址: {{page.aaddress}}</span>
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
            <p style="
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    line-height:28px;
                    color:rgba(102,98,97,1);
                    text-align: left;
                    padding: 0 42px;
                    margin-top: 60px;
                    ">    
                   注：乙方在收到此份采购合同时，如无异议请盖章签字回传。
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import {findPurchaseContract} from '@/api/purchase/index'
export default {
  name: "Preview",
   filters: {
    time: function(val) {
        let str = '';
        let  skr = '';
        if(val){
          str=val.slice(0 ,10)
          skr = str.replace('-','年')
          skr = skr.replace('-','月')
          skr = skr.concat("日")
        }
        return skr
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
  watch:{
    'page.goodsDetails':{
      handler(val){
        if(val&&val.length>0){
          for(let i =0;i<val.length;i++){
              val[i].totalPrice = val[i].purchaseQuantity * val[i].goodsPrice
          }
        }
      }
    }
  },
  methods: {
    //获取合同ID
    getParams() {
      this.contractId = this.$route.query.Id
      console.log(this.contractId);
      
    },
    //预览合同
    _getContract(){
      findPurchaseContract(this.contractId).then(res=>{
          this.page = res.data;
          
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
    margin-right: 50px;
    position: relative;
    left:-25px;
    tr td {
      border: 1px solid #aaaaaa;
    }
  }
}


</style>