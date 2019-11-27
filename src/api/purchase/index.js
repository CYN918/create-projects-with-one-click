import request from '@/utils/request'

//分页获取采购询价单信息
export function getPurchaseInquiry(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_inquiry/list_inquiry.json',
        method:'get',
        params:{
          pageIndex:data.pageIndex,
          pageSize:data.pageSize,
          goodsInfo:data.goodsName,
          offerStatus:data.inquiryStatus,
          startTime:data.startTime,
          endTime:data.endTime,
          inquiryNo:data.oddNumbers
        }
      })
    }


    
//分页获取采购询价单关联的商品信息复制
export function getPurchaseInquiryGoods(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_inquiry/list_goods_detail.json',
        method:'get',
        params:{
            pageIndex:data.pageIndex,
            pageSize:data.pageSize,
            inquiryId:data.inquiryId
        }
      })
    }



//推送报价
export function pushOrder(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_inquiry/push_price.json',
        method:'put',
        params:{
            inquiryId:data
        }
      })
    }

//查看商品报价列表

export function purchaseListGoods(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_inquiry/list_goods_quote.json',
        method:'get',
        params:{
            sigdId:data
        }
      })
    }



//商品历史采购列表
export function purchaseHistory(data){
  return request({
      url:'/api/open/b/b2b2c/erpservice/purchase_inquiry/list_past_purchase.json',
      method:'get',
      params:{
          goodsId:data.goodsId,
          pageIndex:data.pageIndex,
          pageSize:data.pageSize,
          skuId:data.skuId,
          supplierId:data.supplierId,
          customerPlatform:data.customerPlatform,
      }
    })
  }



  //商品历史报价列表
export function offerHistory(data){
  return request({
      url:'/api/open/b/b2b2c/erpservice/purchase_inquiry/list_past_quote.json',
      method:'get',
      params:{
          goodsId:data.goodsId,
          pageIndex:data.pageIndex,
          pageSize:data.pageSize,
          skuId:data.skuId,
          supplierId:data.supplierId,
      }
    })
  }




    //保存供应商报价
export function saveInquiry(data){
  return request({
      url:'/api/open/b/b2b2c/erpservice/purchase_inquiry/save_price.json',
      method:'post',
      data:data
    })
  }

//指派给采购员
  export function forPurchase(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_inquiry/assign_purchaser.json',
        method:'PUT',
        params:{
          userId:data.userId,
          sigdId:data.sigdId
        }
      })
    }

//分页获取采购报价单信息
export function getPurchaseQuoted(data){
  return request({
      url:'/api/open/b/b2b2c/erpservice/purchase_inquiry/list_quoted.json',
      method:'get',
      params:{
        pageIndex:data.pageIndex,
        pageSize:data.pageSize,
        goodsInfo:data.goodsName,//商品名称
        offerStatus:data.inquiryStatus,//订单状态
        startTime:data.startTime,//开始时间
        endTime:data.endTime,//结束时间
        inquiryNo:data.oddNumbers,//询价单编号
        customerName:data.customerName//客户名称
      }
    })
  }

  //分页采购申请列表
export function getPurchaseApply(data){
  return request({
      url:'/api/open/b/b2b2c/erpservice/purchase_apply/list_order.json',
      method:'get',
      params:{
        pageIndex:data.pageIndex,
        pageSize:data.pageSize,
        customerPlatform:data.customerPlatform,//平台名称
        startTime:data.startTime,//开始时间
        endTime:data.endTime,//结束时间
        customerName:data.customerName,//客户名称
        saleOrderNo:data.saleOrderNo,//销售订单号
        supplierKey:data.supplierKey,//供应商
      }
    })
  }

  //分页采购申请商品明细列表
  export function getApplyGoods(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_apply/list_goods_detail.json',
        method:'get',
        params:{
          pageIndex:data.pageIndex,
          pageSize:data.pageSize,
          spoId:data.spoId,
        }
      })
    }


    
    
  //采购申请指定采购员
  export function toApplySaler(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_apply/assign_purchaser.json',
        method:'put',
        params:{
          spogdId:data.spogdId,
          userId:data.userId,
        }
      })
    }
   
  //采购申请商品报价列表
  export function getApplyGoodsList(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_apply/list_goods_quote.json',
        method:'get',
        params:{
          spogdId:data,
        }
      })
    }

  //采购申请保存供应商报价
    export function saveQuote(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_apply/save_price.json',
          method:'post',
          data:data
        })
      }
  

//采购商品，生成采购订单
export function createPurchase(data){
  return request({
      url:'/api/open/b/b2b2c/erpservice/purchase_apply/purchase_goods.json',
      method:'post',
      params:{
        quoteId:data
      }
    })
  }

  
//采购订单-待审核列表分页
export function getPurchaseAudit(data){
  return request({
      url:'/api/open/b/b2b2c/erpservice/purchase_order/list_audit.json',
      method:'get',
      params:{
        pageIndex:data.pageIndex,
        pageSize:data.pageSize,
        customerPlatform:data.customerPlatform,//平台名称
        startTime:data.startTime,//开始时间
        endTime:data.endTime,//结束时间
        customerName:data.customerName,//客户名称
        supplierInfo:data.supplierInfo,//供应商
        orderNo:data.orderNo //单号
      }
    })
  }

  
  
//采购商品，生成采购订单
export function getAuditGoods(data){
  return request({
      url:'/api/open/b/b2b2c/erpservice/purchase_order/list_apply.json',
      method:'get',
      params:{
        pageIndex:data.pageIndex,
        pageSize:data.pageSize,
        purchaseOrderId:data.purchaseOrderId,
       
      }
    })
  }

  
  //采购合同详情（用于生成采购合同）
  export function purchaseContractDetail(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_order/find_contract_by_bno.json',
        method:'get',
        params:{
          purchaseOrderNo:data
        }
      })
    }


    
    //采购合同详情（编辑采购合同页面渲染）
    export function findPurchaseContractDetail(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/find_contract.json',
          method:'get',
          params:{
            contractNo:data
          }
        })
      }
    
  //生成/修改采购合同（采购）
  export function createPurchaseContract(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_order/save_update_contract.json',
        method:'post',
        data:data
      })
    }

  //采购订单-待审核列表-查看进度表
  export function findPurchaseAuditPlan(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_order/find_audit_plan.json',
        method:'get',
        params:{
          contractId:data
        }
      })
    }
  
  //采购订单-待审核列表-推送审核初始化数据 
  export function InitAuditData(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/find_push_audit_init_data.json',
          method:'get',
          params:{
            contractId:data
          }
        })
      }


  //删除采购订单
  export function deletePurchaseData(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_order/delete_order.json',
        method:'put',
        params:{
          purchaseOrderId:data.purchaseOrderId,
          contractId:data.contractId
        }
      })
    }

    
    //采购订单-待审核列表-推送审核
    export function pushPurchaseAudit(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/save_push_audit.json',
          method:'post',
          data:{
            contractId:data.contractId,
            reason:data.reason,
            limitTime:data.limitTime,

          }
        })
      }
    
    //采购订单-签订合同列表
    export function getPurchaseContract(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/list_sign_contract.json',
          method:'get',
          params:{
            pageIndex:data.pageIndex,//页码
            pageSize:data.pageSize,//每页条数
            customerName:data.customerName,//客户名称
            customerPlatform:data.customerPlatform,//客户平台
            startTime:data.startTime,//交货日期-开始日期
            endTime:data.endTime,//交货日期-结束日期
            orderNo:data.orderNo,//单号
            status:data.status,//合同状态
            supplierInfo:data.supplierInfo,//供应商
          }
        })
      }
  
  
  //采购订单-签订合同列表- 签订合同审申请初始化数据
  export function initSignContract(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_order/find_sign_contract_init_data.json',
        method:'post',
       params:{
            contractId:data
        }
      })
    }

    
    //购订单-待审核列表-审批页面中推送审核人信息
    export function SignContractMessage(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/find_audit_push_data.json',
          method:'get',
         params:{
          contractId:data
          }
        })
      }

      
    // 采购订单-待审核列表-审批
    export function SignContractAudit(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/audit_contract_apply.json',
          method:'post',
          data:data
        })
      }
    
    
    //采购订单-签订合同列表-合同商品清单
    export function findContractGoods(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/find_sc_gd.json',
          method:'get',
          params:{
            contractId:data
          }
        })
      }


    //采购订单-待审核列表-当前用户信息
    export function findUserMessage(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/find_audit_user_data.json',
          method:'get',
          params:{
            contractId:data
          }
        })
      }

    //
    
    
  //采购订单-签订合同列表-合同商品清单
  export function findScGoods(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_order/find_sc_gd.json',
        method:'get',
        params:{
          contractId:data
        }
      })
    }

  
  //采购订单-签订合同列表-订单商品清单
  export function findPoGoods(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_order/find_po_gd.json',
        method:'get',
        params:{
          contractId:data
        }
      })
    }

    
    //购订单-签订合同列表-推送审核(签定合同)
    export function savePurchaseAudit(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/save_sc_push_audit.json',
          method:'post',
          data:data
        })
      }

    //待入库订单列表
    export function inStorageList(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/storage_bill/not_list.json',
          method:'get',
          params:{
            pageIndex:data.pageIndex,//页码
            pageSize:data.pageSize,//	每页条数
            customerName:data.customerName,//客户名称
            endTime:data.endTime,//交货日期-结束日期
            logisticsNo:data.logisticsNo,//物流单号
            orderNo:data.orderNo,//采购单号
            projectName:data.projectName,//客户平台
            startTime:data.startTime,//交货日期-开始日期
            supplier:data.supplier,//供应商ID


          }
        })
      }

    
    //待入库商品-采购商品明细列表
    export function inStorageGoods(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/storage_bill/not_list_detail.json',
          method:'get',
          params:{
            pageIndex: data.pageIndex,
            pageSize:data.pageSize,
            purchaseOrderId:data.purchaseOrderId
          }
        })
      }
     
      
      //待入库商品-生成采购入库单前数据
      export function inStorageData(data){
        return request({
            url:'/api/open/b/b2b2c/erpservice/storage_bill/find_bill_info.json',
            method:'get',
            params:{
              purchaseOrderId:data
            }
          })
        }

      //物流公司下拉列表
      
      export function logisticsSelect(){
        return request({
            url:'/api/open/b/b2b2c/erpservice/storage_bill/logistics_select.json',
            method:'get',

          })
        }

      //下拉框形式仓库数据
      export function warehouseSelect(){
        return request({
            url:'/api/open/b/b2b2c/erpservice/warehouse/select.json',
            method:'get',

          })
        }

 
   //待入库商品-生成采购入库单
   export function saveStorage(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/storage_bill/save_bill.json',
        method:'post',
        data:data

      })
    }
    
    
    //待入库商品-更新物流信息
    export function updateStorage(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/storage_bill/update_logistics.json',
          method:'put',
          data:data
  
        })
      }

    //已入库单列表
export function getInStoragedList(data){
  return request({
    url:'/api/open/b/b2b2c/erpservice/storage_bill/list_warehousing.json',
   method:'get',
   params:{
      pageIndex:data.pageIndex,
      pageSize:data.pageSize,
      customerName:data.customerName,
      endTime:data.endTime,
      orderNo:data.orderNo,//单号
      logisticsNo:data. logisticsNo,//物流单号
      startTime:data.startTime,
      supplier:data.supplier,//供应商ID
      projectName:data.projectName,//客户平台
    }
   })
}


//商品入库单-商品明细列表
export function inStoragedGoods(data){
  return request({
      url:'/api/open/b/b2b2c/erpservice/storage_bill/list_detail.json',
      method:'get',
      params:{
        pageIndex: data.pageIndex,
        pageSize:data.pageSize,
        storageBillId:data.storageBillId
      }
    })
  }

    //商品入库单列表
    export function getInStorageOrderList(data){
      return request({
        url:'/api/open/b/b2b2c/erpservice/storage_bill/list.json',
       method:'get',
       params:{
          pageIndex:data.pageIndex,
          pageSize:data.pageSize,
          customerName:data.customerName,
          endTime:data.endTime,
          orderNo:data.orderNo,//单号
          logisticsNo:data. logisticsNo,//物流单号
          startTime:data.startTime,
          supplier:data.supplier,//供应商ID
          projectName:data.projectName,//客户平台
        }
       })
    }


    //采购订单合同列表
    export function ContractList(data){
      return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_order_contract/list.json',
       method:'get',
       params:{
          pageIndex:data.pageIndex,
          pageSize:data.pageSize,
          company:data.company,//签单公司
          endTime:data.endTime,
          contractNo:data.contractNo,//合同编号
          orderNo:data.orderNo,//采购单号
          startTime:data.startTime,
          supplier:data.supplier,//供应商
        }
       })
    }
    
    
    //采购订单合同-关联商品明细列表
    export function ContractGoodsList(data){
      return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_order_contract/list_apply.json',
       method:'get',
       params:{
          pageIndex:data.pageIndex,
          pageSize:data.pageSize,
          contractId:data.contractId
        }
       })
    }

    
    //签订合同列表-审核页面-合同信息    
    export function findSignContract(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/find_sign_contract_info.json',
          method:'post',
          params:{
            contractId:data
          }
  
        })
      }

    //签订合同列表-当前用户信息
    export function findSignUser(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/find_sign_audit_user_data.json',
          method:'get',
          params:{
            contractId:data
          }
  
        })
      }

    
    //签订合同列表-审批页面中推送审核人信息
    export function findSignAuditData(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/find_sign_audit_push_data.json',
          method:'get',
          params:{
            contractId:data
          }
  
        })
      }

    //签订合同列表-查看进度表
    
    export function findContractPlan(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/find_sc_audit_plan.json',
          method:'get',
          params:{
            contractId:data
          }
        })
      }

    //签订合同列表-审核
    export function auditSignContract(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/audit_sign_contract.json',
          method:'post',
          data:data
        })
      }

    //签订合同列表- 申请取消合同初始化数据
    export function findCancelContract(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/find_cancel_contract_init_data.json',
          method:'post',
          params:{
            contractId:data
          }
        })
      }

    
    //签订合同列表-取消合同-审批页面中当前用户信息
    export function findCancelUser(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/find_cancel_audit_user_data.json',
          method:'get',
          params:{
            contractId:data
          }
        })
      }

      
    //签订合同列表-取消合同-审批页面中推送审核人信息
      export function findCancelAudit(data){
        return request({
            url:'/api/open/b/b2b2c/erpservice/purchase_order/find_cancel_audit_push_data.json',
            method:'get',
            params:{
              contractId:data
            }
          })
        }  

    //签订合同列表-取消合同推送审核
    export function CancelContractAudit(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/save_scc_push_audit.json',
          method:'post',
          data:{
            contractId:data.contractId,
            cancelTime:data.cancelTime,
            cancelReason:data.cancelReason
          }
      })
    }

    //签订合同列表-取消合同-审批页面-合同信息
    export function getCancelContractInfo(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/find_cancel_contract_info.json',
          method:'post',
          params:{
            contractId:data
          }
        })
      } 

    //签订合同列表-取消合同审批
    export function CancelContractApproval(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/audit_scc_contract.json',
          method:'post',
          data:{
            id:data.contractId,
            auditStatus:data.auditStatus,
            opinions:data.opinions
          }
        })
      }

    //签订合同列表-取消合同-查看进度表
    export function getCancelContractPlan(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/find_scc_audit_plan.json',
          method:'get',
          params:{
            contractId:data
          }
        })
      } 

    
    //待收发票列表
    export function getPurchaseInvoiceList(data){
      return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_order_invoice/not_list.json',
       method:'get',
       params:{
          pageIndex:data.pageIndex,
          pageSize:data.pageSize,
          customer:data.customer,//客户名称
          endTime:data.endTime,
          invoiceNo:data.invoiceNo,//发票编号
          orderNo:data.orderNo,//采购单号
          startTime:data.startTime,
          price:data.price,//发票金额
          status:data.status,//装填
        }
       })
    }

    
    //申请收发票初始化数据
    export function getInvoiceInfo(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order_invoice/find_apply_info.json',
          method:'get',
          params:{
            purchaseOrderId:data
          }
        })
      } 

      
    //保存申请收发票信息
    export function saveInvoiceInfo(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order_invoice/save_invoice.json',
          method:'post',
          data:data
        })
      } 

    //申请收发票列表
    export function getApplyInvoiceList(data){
      return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_order_invoice/list_apply.json',
       method:'get',
       params:{
          pageIndex:data.pageIndex,
          pageSize:data.pageSize,
          customer:data.customer,//客户名称
          endTime:data.endTime,
          invoiceNo:data.invoiceNo,//发票编号
          orderNo:data.orderNo,//采购单号
          startTime:data.startTime,
          price:data.price,//发票金额
          status:data.status,//装填
        }
       })
    }

    //发票明细列表
    export function InvoiceGoodsList(data){
      return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_order_invoice/list_detail.json',
       method:'get',
       params:{
          pageIndex:data.pageIndex,
          pageSize:data.pageSize,
          invoiceId:data.invoiceId
        }
       })
    }

    //申请收发票初始化数据
     export function editInvoiceInfo(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order_invoice/get_invoice_edit.json',
          method:'get',
          params:{
            invoiceId:data
          }
        })
      } 
      
    //已收发票列表
    export function getInvoicedList(data){
      return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_order_invoice/list.json',
       method:'get',
       params:{
          pageIndex:data.pageIndex,
          pageSize:data.pageSize,
          customer:data.customer,//客户名称
          endTime:data.endTime,
          invoiceNo:data.invoiceNo,//发票编号
          orderNo:data.orderNo,//采购单号
          startTime:data.startTime,
          price:data.price,//发票金额
          status:data.status,//装填
        }
       })
    }

    //申请收发票编辑保存   
    export function updateInvoiceInfo(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order_invoice/update_invoice.json',
          method:'put',
          data:data,
          
        })
      } 

    
    //收发票动作前数据
    export function findInvoiceInfo(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order_invoice/find_record.json',
          method:'get',
          params:{
            invoiceId:data
          }
        })
      } 

      //保存收发票记录
      export function saveInvoiceRecord(data){
        return request({
            url:'/api/open/b/b2b2c/erpservice/purchase_order_invoice/save_record.json',
            method:'post',
            data:{
              invoiceId:data.invoiceId,
              invoiceNo:data.invoiceNo,
              fileInvoiceUrl:data.fileInvoiceUrl,
              collectDate:data.collectDate,
              remark:data.remark,
              purchaseOrderId:data.purchaseOrderId,
            }
          })
        } 
  
        
        //发票详情
        export function findInvoiceDetail(data){
          return request({
              url:'/api/open/b/b2b2c/erpservice/purchase_order_invoice/find_detail.json',
              method:'get',
              params:{
                invoiceId:data
              }
            })
          } 

      //查看采购合同
      export function findPurchaseContract(data){
        return request({
            url:'/api/open/b/b2b2c/erpservice/purchase_order_contract/find_word.json',
            method:'get',
            params:{
              contractId:data
            }
          })
        } 

      
      //付款申请列表
      export function getApplyPayList(data){
        return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/payment_bill/list_apply.json',
         method:'get',
         params:{
            pageIndex:data.pageIndex,
            pageSize:data.pageSize,
            customerName:data.customerName,//客户名称
            endTime:data.endTime,
            orderNo:data.orderNo,//采购单号
            startTime:data.startTime,
            projectName:data.projectName,//平台
            supplierInfo:data.supplierInfo,//供应商

          }
         })
      }

      
      //付款申请-申请单前渲染数据
      export function findPaymentInfo(data){
        return request({
            url:'/api/open/b/b2b2c/erpservice/purchase_order/payment_bill/find_apply_data.json',
            method:'get',
            params:{
              purchaseOrderId:data
            }
          })
        } 

        
      //付款申请-保存申请的付款单
        export function savePurchasePayment(data){
          return request({
              url:'/api/open/b/b2b2c/erpservice/purchase_order/payment_bill/save.json',
              method:'post',
              data:data
            })
          } 

    
    //查看采购付款单详情
    export function detailPurchasePayment(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/payment_bill/find_apply_detail.json',
          method:'get',
          params:{
            id:data.purchaseOrderId,
            type:data.type
          }
        })
      } 

  //获取付款单分页列表
  export function getPaidList(data){
    return request({
      url:'/api/open/b/b2b2c/erpservice/purchase_order/payment_bill/list.json',
     method:'get',
     params:{
        pageIndex:data.pageIndex,
        pageSize:data.pageSize,
        customerName:data.customerName,//客户名称
        endTime:data.endTime,
        orderNo:data.orderNo,//采购单号
        startTime:data.startTime,
        projectName:data.projectName,//平台
        supplierInfo:data.supplierInfo,//供应商
        status:data.status
      }
     })
  }

  //付款单详情
  export function detailPaymentBill(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_order/payment_bill/find_detail.json',
        method:'get',
        params:{
          billNo:data
        }
      })
    } 

  //付款单-编辑单前渲染数据
  export function initPaymentBill(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_order/payment_bill/find_bill_inti_data.json',
        method:'get',
        params:{
          billNo:data
        }
      })
    } 

    //付款单-保存更新的付款单
    export function editPurchasePayment(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/payment_bill/update.json',
          method:'put',
          data:data
        })
      } 

    //付款单-撤回申请
    export function deletePurchasePayment(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/payment_bill/withdraw_apply.json',
          method:'delete',
          params:{
            billNo:data
         }
        })
      }
      
      
    //待审核列表-审批页面中审核人信息
      export function findPaymentAudit(data){
        return request({
            url:'/api/open/b/b2b2c/erpservice/purchase_order/payment_bill/find_audit_push_data.json',
            method:'get',
            params:{
              billNo:data.billNo,
              purchaseOrderId:data.purchaseOrderId,
           }
          })
        }
    
    //付款单-保存审批
    export function savePaymentAudit(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/payment_bill/save_audit.json',
          method:'post',
          data:{
            id:data.id,
            auditStatus:data.auditStatus,
            opinions:data.opinions
         }
        })
      }

      
      //付款单-查看进度表
      export function previewPaymentTimeline(data){
        return request({
            url:'/api/open/b/b2b2c/erpservice/purchase_order/payment_bill/find_audit_plan.json',
            method:'get',
            params:{
              payBillId:data
           }
          })
        }

    
    //付款单-财务支付
    export function payPayment(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/payment_bill/pay.json',
          method:'put',
          data:{
            billNo:data.billNo,
            currentAccount:data.currentAccount, //往来科目
            capitalAccount:data.capitalAccount, //资金科目
            annex:data.annex,//银行付款凭证
            payAcountId:data.payAcountId,//收款账号id,财务管理-设置管理-资金账号
            payAcountNo:data.payAcountNo,//收款账号

         }
        })
      }

    //付款申请-批量申请前渲染数据
    
    export function batchPaymentApply(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/payment_bill/find_batch_apply_data.json',
          method:'post',
          data:data
        })
      }

  //付款单-保存更新的付款单(批量)
  export function saveBatchPayment(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_order/payment_bill/save_batch.json',
        method:'post',
        data:data
      })
    } 

  //采购合同详情（合同页面）
  export function findBatchContract(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_order/find_contract.json',
        method:'get',
        params:{
          contractNo:data
        }
      })
    } 

  //审批流程-加急处理
  export function allPlanUrgent(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_order/push_audit_plan_urgent.json',
        method:'post',
        params:{
          no:data.no,//业务ID
          type:data.type,//业务类型
          userId:data.userId,//用户ID
        }
      })
    } 
  

  //待审核-批量合并生成合同前渲染数据
  export function initBatchContract(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_order/batch/find_init_data.json',
        method:'post',
        data:data
      })
    } 

    //待审核-批量合并生成合同
    export function saveBatchContract(data){
      return request({
          url:'/api/open/b/b2b2c/erpservice/purchase_order/batch/save.json',
          method:'post',
          data:data
        })
      } 

  //删除供应商报价
  export function deleteInquiryPrice(data){
    return request({
        url:'/api/open/b/b2b2c/erpservice/purchase_inquiry/delete_price.json',
        method:'delete',
        params:{
          quoteId:data.quoteId,
          sigdId:data.sigdId
        }
      })
    } 

//付款单-商品明细列表
export function getPaymentGoodsList(data){
  return request({
      url:'/api/open/b/b2b2c/erpservice/purchase_order/payment_bill/list_detail.json',
      method:'get',
      params:{
        pageIndex:data.pageIndex,
        pageSize:data.pageSize,
        billNo:data.billNo
      }
    })
  } 
