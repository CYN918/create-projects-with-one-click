import request from '@/utils/request'


 /* 员工管理分页 */
export function getEmployeePage(data) {
    return request({
      url: '/api/open/b/b2b2c/erpservice/employee/find_page.json',
      method: 'get',
      params: {
        pageNum: data.pageNum,   //当前页码
        pageSize: data.pageSize, //每页条数
        employeeName:data.employeeName, //员工姓名
        employeeType:data.employeeType, //员工类型
        organizeIde:data.organizeId  //部门
      }
    })
  }

  //保存员工信息
  export function saveEmployeeInfo(data) {
    return request({
      url: '/api/open/b/b2b2c/erpservice/employee/save.json',
      method: 'post',
      data:data
    })
  }


  
  //编辑前渲染数据
  export function initEmployeeInfo(data) {
    return request({
      url: '/api/open/b/b2b2c/erpservice/employee/find_edit_by_id.json',
      method: 'get',
      params:{
         employeeId: data
      }
    })
  }

  //查看员工信息
  export function findEmployeeInfo(data) {
    return request({
      url: '/api/open/b/b2b2c/erpservice/employee/find_info_by_id.json',
      method: 'get',
      params:{
         employeeId: data
      }
    })
  }

 //修改员工信息
  export function editEmployeeInfo(data) {
    return request({
      url: '/api/open/b/b2b2c/erpservice/employee/update.json',
      method: 'put',
      data: data
      
    })
  }

  //删除员工信息 
  export function deleteEmployeeInfo(data) {
    return request({
      url: '/api/open/b/b2b2c/erpservice/employee/delete.json',
      method: 'delete',
      params:{
        employeeId: data
     }
      
    })
  }