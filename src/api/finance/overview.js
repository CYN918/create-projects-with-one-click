import request from '@/utils/request'

export function getOverviewMoney () {
  return request({
    url: '/finance/overview/cash',
    method: 'get'
  })
}

export function editWarningMoney (warningMoney) {
  return request({
    url: '/finance/overview/warning_money_edit',
    method: 'get',
    params: {
      warning_money: warningMoney
    }
  })
}

export function getOveriewSummary (type) {
  return request({
    url: '/finance/overview/summary',
    method: 'get',
    params: {
      type
    }
  })
}
