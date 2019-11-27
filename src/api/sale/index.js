import request from '@/utils/request'

// 分业查询询价单
export function getInquiry(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_inquiry/findPageList.json',
    method:'get',
    params:{
      cutCardFlag:data.cutCardFlag,
      pageIndex:data.current_page,
      pageSize:data.page_size, 
      customerName:data.customerName, 
      inquiryNo:data.enquiryNumber,
      inquiryStatus:data.type,
      invoiceType:data.invoiceType,
      startTime:data.startTime,
      endTime:data.endTime,
      goodsName:data.productSearch,
      customerId:data.customerId,
    }
  })
}

//根据询价单查询商品分页
export function getInGoods(data){
    return request({
      url:'/api/open/b/b2b2c/erpservice/sale_inquiry/findPageGoodsList.json',
      method:'get',
      params:{
        pageIndex:data.pageIndex,
        pageSize:data.pageSize,
        inquiryNo:data.inquiryNo,
      }
    })
  }
//详情商品详细
  export function getInGood(data){
    return request({
      url:'/api/open/b/b2b2c/erpservice/sale_inquiry/findPageGoodsList.json',
      method:'get',
      params:{
 
        inquiryNo:data
      }
    })
  }

//新增询价单
export function addInquiry(data){
    return request ({
        url:'/api/open/b/b2b2c/erpservice/sale_inquiry/save.json',
        method:'post',
        data:{
            customerName:data.customerName,
            customerContact:data.contacts,
            customerId:data.customerId,
            dealDate:data.deliveryDate,
            department:data.department,
            goodsDetailParam:data.arrs,
            invoiceType:parseInt(data.invoiceType),
            offerEndTime:data.quotationPeriod,
            phone:data.mobilePhone,
            saleUserName:data.salesRepresentatives,
            tel:data.phoneNumber,
            email:data.mail,
            invoiceTaxRate:data.taxRate,
            remark:data.remark,
            projectName:data.platformName
            
        }
    })
}


//删除询价单
export function deleteInquiry(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_inquiry/delete_by_inquiryId.json',
    method:'delete',
    params:{
      inquiryId:data
    }
  })
}

//删除报价单
export function deleteOffer(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_offer/delete_by_offerId.json',
    method:'delete',
    params:{
      offerId:data
    }
  })
}

//关闭询价单
export function closeInquiry(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_inquiry/close_by_id.json',
    method:'put',
    params:{
      inquiryId:data.inquiryId,
      closeReason:data.closeReason
    }
  })
}
//推送采购下拉列表
export function saleInquiry(data){
  return request({
    url:'/api/open/b/b2b2c/userservice/organize/find_buyer_organize.json',
    method:'get',
    params:{
     
    }
  })
}

//根据询价单id获取询价单信息
export function findInquiry(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_inquiry/find_by_id.json',
    method:'get',
    params:{
        inquiryId:data
    }
  })
}


//查询采销组的下拉列表
export function saleInquirys(data){
  return request({
    url:'/api/open/b/b2b2c/userservice/organize/find_buyer_organize.json',
    method:'GET',
    params:{
    }
  })
}


//移交给采购组
export function toSaleInquirys(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_inquiry/push_purchase_group.json',
    method:'PUT',
    params:{
      groupId:data.groupId,
      inquiryId:data.inquiryId,
      groupName:data.organizeName
    }
  })
}
//销售下拉列表
export function toSaleUser(data){
  return request({
    url:'/api/open/b/b2b2c/userservice/sysuserSalesman/find_by_simple.json',
    method:'get',
    params:{
      pageNum:1,
      pageSize:9999
    }
  })
}

//采购下拉列表
export function toPurchaser(data){
  return request({
    url:'/api/open/b/b2b2c/userservice/sysuser_buyer/find_simple_page.json',
    method:'get',
    params:{
      pageNum:1,
      pageSize:9999
    }
  })
}


//修改询价单详细

export function editInquiry(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_inquiry/update.json',
    method:'put',
    data:{
      customerName:data.customerName,
      customerContact:data.customerContact,
      customerId:data.customerId,
      dealDate:data.dealDate,
      department:data.department,
      inquiryId:data.inquiryId,
      goodsDetailParam:data.arrss,
      invoiceType:data.invoiceType,
      offerEndTime:data.offerEndTime,
      phone:data.phone,
      saleUserName:data.saleUserName,
      tel:data.tel,
      email:data.email,
      invoiceTaxRate:data.invoiceTaxRate,
      remark:data.remark 
    }
  })
}

//根据询价单id移交销售代表
export function toSalesRepresentative(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_inquiry/transfer_sale_user.json',
    method:'PUT',
    params:{
      saleUserId:data.sysuserId,
      inquiryId:data.inquiryId,
      saleUserName:data.sysuserName
    }
  })
}
//报价单分页查询
export function getQuotation(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_offer/findPageList.json',
    method:'get',
    params:{
      pageIndex:data.current_page,
      pageSize:data.page_size, 
      customerName:data.customerName, 
      offerNo:data.enquiryNumber,
      offerStatus:data.type,
      invoiceType:data.invoiceType,
      startTime:data.startTime,
      endTime:data.endTime,
      goodsName:data.productSearch,
      inquiryNo:data.inquiryNo
       }     
  })
}
//生成报价单、商品明细
export function createQuotation(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_offer/save.json',
    method:'POST',
    data:{
      customerName:data.customerName,
      customerContact:data.customerContact,
      customerId:data.customerId,
      dealDate:data.dealDate,
      dealAddress:data.dealAddress,
      department:data.department,
      inquiryId:data.inquiryId,
      goodsDetailParam:data.arrss,
      invoiceType:data.invoiceType,
      offerEndTime:data.offerEndTime,
      phone:data.phone,
      saleUserName:data.saleUserName,
      tel:data.tel,
      email:data.email,
      invoiceTaxRate:data.invoiceTaxRate,
      remark:data.remark, 
      offerCompany:data.offerDepartment,
      offerContact:data.offerContact,
      offerEmail:data.offerEmail,
      offerTel:data.offerPhone,
      offerCompanyId:80001,
    }
  })
}
//根据报价单id获取报价单信息
export function findOrder(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_offer/find_by_offerId.json',
    method:'GET',
    params:{
      offerId:data,

    }
  })
}
//分页查询报价单-商品明细列表
export function findOrderGoods(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_offer/findPageGoodsList.json',
    method:'GET',
    params:{
      pageIndex:data.pageIndex,
      pageSize:data.pageSize,
      offerNo:data.offerNo,

    }
  })
}

//修改报价单
export function editOffer(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_offer/update.json',
    method:'put',
    data:{
      customerName:data.customerName,//客户名
      customerContact:data.customerContact,//客户联系人
      customerId:data.customerId,//kehuID
      dealDate:data.dealDate,//交货期限
      dealAddress:data.dealAddress,//地址
      goodsDetailParam:data.arrss,//数组
      invoiceType:data.invoiceType,//发票类型
      invoiceTaxRate:data.invoiceTaxRate,//发票税率
      offerEndTime:data.offerEndTime,//报价期限
      department:data.department,//部门
      offerCompany:data.offerCompany,//报价部门
      offerContact:data.offerContact,//报价联系人
      offerEmail:data.offerEmail,//报价邮箱
      offerId:data.offerId,//报价单ID
      offerNo:data.offerNo,//报价单单号
      offerTel:data.offerTel,//报价联系电话
      tel:data.tel,
      email:data.email,//邮箱
      remark:data.remark,//备注
      inputUserId:data.inputUserId,//销售员ID
      inputUserName:data.inputUserName,//销售员名字
      phone:data.phone,
      
    }
  })
}

//预览报价单
export function previewOrder(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_offer/preview_by_offerId.json',
    method:'GET',
    params:{
      offerId:data,

    }
  })
}

//生成销售订单
export function createOrder(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_order/save_general.json',
    method:'POST',
    params:{
      offerId:data.offerId,
      depositAmount:data.depositAmount,

    }
  })
}

//新增销售订单
export function addOrder(data){
  return request ({
      url:'/api/open/b/b2b2c/erpservice/sale_order/save.json',
      method:'post',
      data:{
          customerName:data.customerName,
          customerContact:data.contacts,
          customerId:data.customerId,
          dealDate:'',
          deliveryAddress:data.deliveryAddress,
          distAddress:data.distAddress,
          department:data.department,
          goodsDetailParam:data.arrs,
          invoiceType:data.invoiceType,
          phone:data.mobilePhone,
          saleUserName:data.salesRepresentatives,
          tel:data.phoneNumber,
          email:data.mail,
          invoiceTaxRate:data.taxRate,
          remark:data.remark,
          projectName:data.projectName,
          depositAmount:data.deposit
      }
  })
}


//分页查询销售订单
export function getOrder(data){
  return request ({
    url:'/api/open/b/b2b2c/erpservice/sale_order/findPageList.json',
    method:'get',
    params:{
        cutCardFlag:data.cutCardFlag,//切卡标识
        pageIndex:data.pageIndex,
        pageSize:data.pageSize,
        saleOrderNo:data.saleOrderNo,//销售订单号
        customerName:data.customerName,//客户名
        goodsName:data.goodsName,//商品名
        projectName:data.projectName,//平台名字
        submitApprovalStatus:data.submitApprovalStatus,//审核状态
        customerId:data.customerId,//客户ID
        offerNo:data.offerNo,
  }
})

}

//分页销售订单商品明细
export function getOrderGoods(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_order/findPageGoodsList.json',
    method:'GET',
    params:{
      pageIndex:data.pageIndex,
      pageSize:data.pageSize,
      saleOrderNo:data.saleOrderNo,

    }
  })
}



//删除销售订单
export function deleteOrders(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_order/delete_by_orderId.json',
    method:'delete',
    params:{
      orderId:data,

    }
  })
}

//根据ID查询销售订单
export function findOrders(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_order/find_by_orderId.json',
    method:'GET',
    params:{
      orderId:data,

    }
  })
}

//修改编辑销售订单

export function editOrders(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_order/update.json',
    method:'put',
    data:{
      customerContact:data.customerContact,
      customerId:data.customerId,
      customerName:data.customerName,
      orderId:data.orderId,
      department:data.department,
      phone:data.phone,
      tel:data.tel,
      fax:data.fax,
      dealAddress:data.dealAddress,
      email:data.email,
      remark:data.remark,
      projectName:data.projectName,
      dealDate:data.dealDate,
      invoiceType:data.invoiceType,
      invoiceTaxRate:data.invoiceTaxRate,
      depositAmount:data.depositAmount,
      inputUserName:data.inputUserName,
      offerCompany:data.offerCompany,
      offerContact:data.offerContact,
      offerTel:data.offerTel,
      offerEmail:data.offerEmail,
      goodsDetailParam:data.goodsDetailParam,

    }
  })
}

//生成下载PDF

export function  downPDF(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_order/download_pdf.json',
    method:'PUT',
    params:{
      orderId:data,

    }
  })
}


//生成合同
export function createContract(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_contract/save_contract.json',
    method:'post',
    data:data
    /*   acompanyName:data.partyA,
      acontact:data.partyAContacts,
      aaddress:data.partyAAddress,
      acompanyId:data.partyAId,
      aemail:data.partyAMail,
      afax:data.partyAFax,
      atel:data.partyANumber,
      bcompanyName:data.partyB,
      bcontact:data.partyBContacts,
      baddress:data.partyBAddress,
      bemail:data.partyBMail,
      bfax:data.partyBFax,
      btel:data.partyANumber,
      bankAccount:data.paymentAccount,
      bankName:data.accountName,
      bankOpeningName:data.openingBank,
      contractFactFee:data.contractAmount,
      deposit:data.handsel,
      orderId:data.orderId,
      payLimitDay:data.dateNum,
      payType:data.settlement,
      contractType:1,
      saleOrderNo:data.saleOrderNo,
      invoiceContent:data.invoiceContent,
      taxNumber:data.taxNumber */
    
  })
}

//编辑合同
export function editContract(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_contract/save_contract.json',
    method:'post',
    data:data
  })
}
//根据ID获得合同内容
export function findContract(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_contract/findByOrderId.json',
    method:'GET',
    params:{
      orderId:data,

    }
  })
}

//删除上传文件
export function deleteImg(data){
  return request({
     url:'/api/open/b/b2b2c/fileservice/delete',
    method:'GET',
    params:{
      fileName:data
    }
    })
}


//签订合同
export function signContract(data){
  return request({
     url:'/api/open/b/b2b2c/erpservice/sale_contract/sign_contract.json',
    method:'PUT',
    data:data
    })
}


//生成订货单前，先根据销售订单id获取生成订货单信息
export function getOrderMs(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_project_order/find_by_orderId.json',
   method:'GET',
   params:{
    orderId:data,
   }
   
   })
}


//生成订货单

export function createOrederForm(data){
  return request({
     url:'/api/open/b/b2b2c/erpservice/sale_project_order/save.json',
    method:'POST',
    data:data
    })
}

//查看合同分页
export function getContract(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_contract/findPageList.json',
   method:'GET',
   params:{
    aaCompanyName:data.aaCompanyName,//甲方（签订名称）
    bbCompanyName:data.bbCompanyName,// 乙方（客户名称）
    businessNo:data.businessNo,//销售单号
    contractNo:data.contractNo,//合同编号
    startTime:data.startTime,//开始日期
    endTime:data.endTime,//结束日期
    pageIndex:data.pageIndex,
    pageSize:data.pageSize,
   }
   })
}

//预览合同
export function previewContract(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_contract/preview_contract.json',
   method:'GET',
   params:{
     contractId:data
   }
   })
}

//合同商品明细列表
export function contractGoods(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_contract/findPageGoodsList.json',
   method:'GET',
   params:{
    saleOrderNo:data.saleOrderNo,
    pageIndex:data.pageIndex,
    pageSize:data.pageSize
   }
   })
}

//分页查询订货单列表
export function getProjectOrder(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_project_order/findPageList.json',
   method:'GET',
   params:{
    contractStatus:data.contractStatus,//合同状态
    customerName:data.customerName,//客户名称
    deliveryStatus:data.deliveryStatus,//配送状态/发货状态
    endTime:data.endTime,//结束日期
    invoiceStatus:data.invoiceStatus,//发票状态
    pageIndex:data.pageIndex,//页数, 默认第1页
    pageSize:data.pageSize,//每页条数，默认每页10条
    payStatus:data.payStatus,//支付状态/收款状态 
    saleOrderNo:data.saleOrderNo,//销售单号
    startTime:data.startTime,//开始日期
    customerContact:data.customerContact,//联系人姓名
    customerPhone:data.customerPhone,//联系人手机号码
    goodsName:data.goodsName,//商品搜索
    spoNo:data.spoNo,//订货单号
   }
   })
}

//推送采购

export function pushPurchase(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_project_order/app_purchase_push_group.json',
   method:'PUT',
   params:{
    groupId:data.groupId,
    groupName:data.groupName,
    spoId:data.spoId
   }
   })
}
//分页查询订货单-商品明细列表

export function getProjectOrderGoods(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_project_order/findPageGoodsList.json',
   method:'GET',
   params:{
    spoId:data.spoId,
    pageIndex:data.pageIndex,
    pageSize:data.pageSize
   }
   })
}

//销售订单-待审核-查看进度表
export function findOrderAuditPlan(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_order/find_audit_plan.json',
   method:'GET',
   params:{
    orderId:data
   }
   })
}

//销售订单-待审核-查看更改商品
export function findChangeGoodsOrder(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_order/find_goods_by_orderId.json',
   method:'GET',
   params:{
    orderId:data
   }
   })
}


//变更商品提交
export function saveChangeGoodsOrder(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_order/updateGoods.json',
   method:'put',
    data:data,
   })
}

//销售订单-待审核-推送审核初始化

export function initAuditOrder(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_order/find_push_audit_init.json',
   method:'get',
    params:{
        orderId:data
    }
   })
}
//销售订单-待审核--推送审核
export function pushAuditOrder(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_order/save_push_audit.json',
   method:'post',
    data:data
   })
}


//销售订单-待审核-审批页面展示数据
export function contractShow(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_order/audit_contract_show.json',
   method:'get',
   params:{
      orderId:data
    }
   })
}

//销售订单-待审核-查看进度表-加急处理
export function auditUrgent(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_order/find_audit_plan_urgent.json',
   method:'get',
   params:{
      orderId:data.orderId,
      userId:data.userId
    }
   })
}

//销售订单-待审核-审批
export function orderAudit(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_order/sale_order_audit.json',
   method:'post',
   data:{
      orderId:data.orderId,
      auditStatus:data.auditStatus,
      opinions:data.opinions,
    }
   })
}



//待出货列表
export function getOutStorage(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/invoice_bill/not_list.json',
   method:'get',
   params:{
      pageIndex:data.pageIndex,
      pageSize:data.pageSize,
      customer:data.customer,
      endTime:data.endTime,
      saleOrderNo:data.saleOrderNo,
      startTime:data.startTime,
    }
   })
}


//待出货商品明细列表
export function getOutStorageGoods(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/invoice_bill/not_list_detail.json',
   method:'get',
   params:{
      pageIndex:data.pageIndex,
      pageSize:data.pageSize,
      spoId:data.spoId
    }
   })
}

//待出货商品-生成销售出货单前数据
export function outStorageOrderData(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/invoice_bill/find_no_bill_info.json',
   method:'get',
   params:{
    spoId:data,
    }
   })
}

//待出货商品-保存新增销售出货单

export function saveOutOrder(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/invoice_bill/save_bill.json',
   method:'post',
   data:data
   })
}

//销售出货清单列表
export function getOrderList(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/invoice_bill/list.json',
   method:'get',
   params:{
      pageIndex:data.pageIndex,
      pageSize:data.pageSize,
      customer:data.customer,
      endTime:data.endTime,
      orderNo:data.orderNo,
      startTime:data.startTime,
    }
   })
}

//销售出货清单-明细列表
export function getOrderGoodsList(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/invoice_bill/list_detail.json',
   method:'get',
   params:{
    pageIndex:data.pageIndex,
    pageSize:data.pageSize,
    invoiceBillId:data.invoiceBillId
  }
   })
}


//销售出货清单-生成出库单前数据
export function outStorageFormData(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/invoice_bill/find_sbill_init_data.json',
   method:'get',
   params:{
    invoiceBillId:data,
    }
   })
}


//销售出货清单-生成出库单
export function saveOutStorageOrder(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/invoice_bill/save_shipment_bill.json',
   method:'post',
   data:data
   })
}

//销售出货清单-删除销售出货清单
export function deleteOrderList(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/invoice_bill/delete_bill.json',
   method:'delete',
   params:{
    invoiceBillId:data,
    }
   })
}

//商品出库单列表
export function getGoodsOrderList(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/shipment_bill/list.json',
   method:'get',
   params:{
      pageIndex:data.pageIndex,
      pageSize:data.pageSize,
      customerName:data.customerName,
      endTime:data.endTime,
      orderNo:data.orderNo,//单号
      startTime:data.startTime,
      departmentId:data.departmentId,//部门ID
      status:data.status,//状态
      contact:data.contact,

    }
   })
}

//商品出库单-明细列表
export function getShipmentList(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/shipment_bill/list_detail.json',
   method:'get',
   params:{
    pageIndex:data.pageIndex,
    pageSize:data.pageSize,
    shipmentBillId:data.shipmentBillId//出库单ID
  }
   })
}

//商品出库单-发货前初始化数据
export function getDeliverData(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/shipment_bill/find_deliver_goods_data.json',
   method:'get',
   params:{
    shipmentBillId:data//出库单ID
  }
   })
}



//商品出库单-出库单详情
export function getDeliverDetail(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/shipment_bill/find_bill_word.json',
   method:'get',
   params:{
    shipmentBillId:data//出库单ID
  }
   })
}

//商品出库单-发货
export function sendDeliverGoods(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/shipment_bill/deliver_goods.json',
   method:'put',
   data:{
    logisticsCode:data.logisticsCode,
    logisticsNo:data.logisticsNo,
    logisticsNoFileUrl:data.logisticsNoFileUrl,//附件
    remark:data.remark,
    shipmentBillId:data.shipmentBillId,//出库单ID
    transportType:data.transportType,
  }
   })
}

//已出库单列表

export function getOutStorageList(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/shipment_bill/list_deliver.json',
   method:'get',
   params:{
      pageIndex:data.pageIndex,
      pageSize:data.pageSize,
      customerName:data.customerName,
      endTime:data.endTime,
      orderNo:data.orderNo,//单号
      startTime:data.startTime,
      departmentId:data.departmentId,//部门ID
      status:data.status,//状态
      contact:data.contact,
    }
   })
}

//已出库单列表-明细列表
export function getOutStorageGoodsList(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/shipment_bill/list_deliver_detail.json',
   method:'get',
   params:{
    pageIndex:data.pageIndex,
    pageSize:data.pageSize,
    shipmentBillId:data.shipmentBillId//出库单ID
  }
   })
}

//代开开票-分页查询申请开票列表
export function getInvoicesList(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_invoice/findPageList.json',
   method:'get',
   params:{
    cutCardFlag:0,
    pageSize:data.pageSize,//每页条数
    pageIndex:data.pageIndex,//页数
    customerName:data.customerName,//客户名称
    endTime:data.endTime,//结束日期
    goodsName:data.goodsName,//商品名称
    invoiceAmount:data.invoiceAmount,//发票金额
    invoiceNo:data.invoiceNo,//发票编号
    invoiceStatus:data.invoiceStatus,//发票状态
    invoiceType:data.invoiceType,//发票类型
    projectName:data.projectName,//平台名称/项目名称
    saleOrderNo:data.saleOrderNo,//销售单号
    startTime:data.startTime,//开始日期
  }
   })
}

//申请开票-分页查询申请开票列表
export function getApplyInvoicesList(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_invoice/findPageInvoiceList.json',
   method:'get',
   params:{
    cutCardFlag:1,
    pageSize:data.pageSize,//每页条数
    pageIndex:data.pageIndex,//页数
    customerName:data.customerName,//客户名称
    endTime:data.endTime,//结束日期
    goodsName:data.goodsName,//商品名称
    invoiceAmount:data.invoiceAmount,//发票金额
    invoiceNo:data.invoiceNo,//发票编号
    invoiceStatus:data.invoiceStatus,//发票状态
    invoiceType:data.invoiceType,//发票类型
    projectName:data.projectName,//平台名称/项目名称
    saleOrderNo:data.saleOrderNo,//销售单号
    startTime:data.startTime,//开始日期
  }
   })
}





//待开发票-分页查询商品明细列表
export function getInvoiceGoodsList(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_invoice/findPageGoodsList.json',
   method:'get',
   params:{
    pageIndex:data.pageIndex,
    pageSize:data.pageSize,
    saleOrderNo:data.saleOrderNo//销售单ID
  }
   })
}



//待开发票-申请开发票-页面展示数据
export function findInvioceData(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_invoice/find_Invoice_by_orderId.json',
   method:'get',
   params:{
    orderId:data
  }
   })
}



//级联查询省市区
export function findLocation(data){
  return request({
    url:'/api/open/b/b2b2c/userservice/region/find_by_parent.json',
   method:'get',
   params:{
    parentId:data
  }
   })
}


//开发票-申请开发票
export function applyInvioce(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_invoice/app_for_invoice.json',
   method:'put',
   data:data
   })
}

//申请开票-去开票
export function toApplyInvioce(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_invoice/open_for_invoice.json',
   method:'put',
   data:data
   })
}

//申请开票-编辑开发票-页面展示数据
export function getInvioceData(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_invoice/find_Invoice_by_invoiceId.json',
   method:'get',
   params:{
    invoiceId:data
  }
   })
}


//申请开票-编辑开发票
export function editApplyInvioce(data){
  return request({
   url:'/api/open/b/b2b2c/erpservice/sale_invoice/update_for_invoice.json',
   method:'put',
   data:data
   })
}

//已开发票-分页查询申请开票列表
export function getInvoicedList(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/sale_invoice/findPageFinishInvoiceList.json',
   method:'get',
   params:{
    cutCardFlag:2,
    pageSize:data.pageSize,//每页条数
    pageIndex:data.pageIndex,//页数
    customerName:data.customerName,//客户名称
    endTime:data.endTime,//结束日期
    goodsName:data.goodsName,//商品名称
    invoiceAmount:data.invoiceAmount,//发票金额
    invoiceNo:data.invoiceNo,//发票编号
    invoiceStatus:data.invoiceStatus,//发票状态
    invoiceType:data.invoiceType,//发票类型
    projectName:data.projectName,//平台名称/项目名称
    saleOrderNo:data.saleOrderNo,//销售单号
    startTime:data.startTime,//开始日期
  }
   })
}


export function upLoadDesign(data){
  return request({
   url:'/api/open/b/b2b2c/erpservice/purchase_order/save_design_draft.json',
   method:'post',
   params:{
    designDraftUrl:data.designDraftUrl,
    gdId:data.gdId
   }
   })
}

//已完成列表分页
export function completedList(data){
  return request({
   url:'/api/open/b/b2b2c/erpservice/sale_order_fisnish/findPageList.json',
   method:'get',
   params:{
    pageSize:data.pageSize,//每页条数
    pageIndex:data.pageIndex,//页数
    saleOrderNo:data.saleOrderNo,//销售单号
    startTime:data.startTime,//开始日期
    endTime:data.endTime,//结束日期
   }
   })
}


//已完成商品列表分页
export function completedGoodsList(data){
  return request({
   url:'/api/open/b/b2b2c/erpservice/sale_order_fisnish/findPageGoodsList.json',
   method:'get',
   params:{
    pageSize:data.pageSize,//每页条数
    pageIndex:data.pageIndex,//页数
    saleOrderNo:data.saleOrderNo,//销售单号
   }
   })
}


//详情，根据销售订单id获取已完成销售订单信息
export function getCompletedDetail(data){
  return request({
   url:'/api/open/b/b2b2c/erpservice/sale_order_fisnish/find_by_orderId.json',
   method:'get',
   params:{
    orderId:data
   }
   })
}

//重新报价
export function resetInquiry(data){
  return request({
   url:'/api/open/b/b2b2c/erpservice/sale_inquiry/reset_by_inquiryId.json',
   method:'put',
   params:data
   })
}


//销售订单-商品明细-设计稿上传
export function uploadFileDesignDraftUrl(data){
  return request({
   url:'/api/open/b/b2b2c/erpservice/sale_order/upload_fileDesignDraftUrl.json',
   method:'put',
   params:{
    fileDesignDraftUrl:data.fileDesignDraftUrl,
    sordId:data.sordId
   }
   })
}

//分页查询销售订单列表(代收款，已收款)
export function getSalePayList(data){
  return request({
   url:'/api/open/b/b2b2c/erpservice/sale_order_pay/findPageList.json',
   method:'get',
   params:{
    cutCardFlag:data.cutCardFlag,
    payStatus:data.payStatus,
    pageSize:data.pageSize,
    pageIndex:data.pageIndex,
    customerName:data.customerName,
    saleOrderNo:data.saleOrderNo,
    startTime:data.startTime,
    endTime:data.endTime,
   }
   })
}

//分页查询销售订单-商品明细列表(代收款，已收款)
export function getSalePayGoodsList(data){
  return request({
   url:'/api/open/b/b2b2c/erpservice/sale_order_pay/findPageGoodsList.json',
   method:'get',
   params:{
    pageSize:data.pageSize,
    pageIndex:data.pageIndex,
    saleOrderNo:data.saleOrderNo
   }
   })
}

//分页查询销售订单-收款记录列表
export function getSalePagePayList(data){
  return request({
   url:'/api/open/b/b2b2c/erpservice/sale_order_pay/findPagePayList.json',
   method:'get',
   params:{
    pageSize:data.pageSize,
    pageIndex:data.pageIndex,
    saleOrderNo:data.saleOrderNo
   }
   })
}

//删除收款

export function deletePayId(data){
  return request({
   url:'/api/open/b/b2b2c/erpservice/sale_order_pay/delete_by_payId.json',
   method:'delete',
   params:{
     payId:data
   }
   })
}

//新增收款

export function savePayment(data){
  return request({
   url:'/api/open/b/b2b2c/erpservice/sale_order_pay/savePayment.json',
   method:'post',
   data:data
   })
}


//资金账户下拉列表
export function findAccountInfo(data){
  return request({
   url:'/api/open/b/b2b2c/financeservice/account_info/findList.json',
   method:'get',
   params:data
   })
}

//导入发票
export function uploadingInvoice(data){
  return request({
   url:'/api/open/b/b2b2c/erpservice/sale_invoice/uploading.json',
   method:'post',
   data:data
   })
}

//下载发票模板
export function downloadInvoice(data){
  return request({
   url:'/api/open/b/b2b2c/erpservice/sale_invoice/download.json',
   method:'get',
   params:data,
   })
}
