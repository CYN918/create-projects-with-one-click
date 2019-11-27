import request from "@/utils/request";

//获取平台信息
export function platformOpenInfo() {
  return request({
    url: "/api/open/c/b2b2c/settingservice/systemSetting/platformOpenInfo.json",
    method: "get"
  });
}

//获取系统路由详情
export function findRouterInfo() {
  return request({
    url: "/api/open/b/b2b2c/settingservice/route_config/current_route_info.json",
    method: "get"
  });;
}
