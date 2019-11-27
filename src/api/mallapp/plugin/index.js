import request from '@/utils/request'

// 获取券列表
export function getTicketList (data) {
  return request({
    url: '/mplugin/ticket_list',
    method: 'get',
    params: data
  })
}

// add or edit ticket
export function addScoreTicket (data) {
  return request({
    url: '/mplugin/ticket_edit',
    method: 'get',
    params: data
  })
}

// get ticket
export function getScoreTicket (id) {
  return request({
    url: '/mplugin/ticket_get',
    method: 'get',
    params: {
      id
    }
  })
}

// get rules
export function getRules (id) {
  return request({
    url: '/mpiugin/ticket_rules_get',
    method: 'get',
    params: {
      id
    }
  })
}

// set rules
export function setRules (data) {
  return request({
    url: '/mplugin/ticket_rules_set',
    method: 'get',
    params: data
  })
}

// import rules
export function importRules (data) {
  return request({
    url: '/mplugin/ticket_rules_import',
    method: 'get',
    params: data
  })
}

// get ticket log
export function getTicketLog (id) {
  return request({
    url: '/mplugin/ticket_log',
    method: 'get',
    params: {
      id
    }
  })
}

// get ticket detail list
export function getTicketDetailList (data) {
  return request({
    url: '/mplugin/ticket_detail_list',
    method: 'get',
    params: data
  })
}

// 获取兑换码操作历史
export function getTicketLogList (data) {
  return request({
    url: '/mplugin/ticket_log_list',
    method: 'get',
    params: data
  })
}

// 获取兑换码操作历史的兑换码列表
export function getScoreLogList (data) {
  return request({
    url: '/mplugin/score_log_detail',
    method: 'get',
    params: data
  })
}
