import request from '@/utils/request'

export function getInvoiceList (data) {
  return request({
    url: '/finance/invoice_list',
    method: 'get',
    params: data
  })
}

export function getInvoiceInfo () {
  return request({
    url: '/finance/invoice_info',
    method: 'get'
  })
}

export function editInvoiceInfo (data) {
  return request({
    url: '/finance/invoice_info_edit',
    method: 'get',
    params: data
  })
}

export function getInvoiceAddress () {
  return request({
    url: '/finance/invoice_address',
    method: 'get'
  })
}

export function editAddress (data) {
  return request({
    url: '/finance/invoice_address_edit',
    method: 'get',
    params: data
  })
}

export function toInvoice (data) {
  return request({
    url: '/finance/invoice_to',
    method: 'get',
    params: data
  })
}

export function getRecoderList (data) {
  return request({
    url: '/finance/recoder_list',
    method: 'get',
    params: data
  })
}

export function getRelateOrder (data) {
  return request({
    url: '/finance/relate_order',
    method: 'get',
    params: data
  })
}

export function getCashAccount () {
  return request({
    url: '/finance/cash_account',
    method: 'get'
  })
}

export function editCashAccount (data) {
  return request({
    url: '/finance/cash_account_edit',
    method: 'get',
    params: data
  })
}
