import request from '@/utils/request'

export function getFinanceList (data) {
  return request({
    url: '/mfinance/finance_list',
    method: 'get',
    params: data
  })
}
