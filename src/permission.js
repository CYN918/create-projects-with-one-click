import router from './router'
import store from './store'
import { Message , MessageBox} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
import Vue from 'vue'
import { throttleTipPop2 } from "@/utils/throttle";

NProgress.configure({ showSpinner: false })// NProgress Configuration



const whiteList = ['/login']// no redirect whitelist

router.beforeEach((to, from, next) => {
  // NProgress.start() // start progress bar
  if(JSON.parse(localStorage.getItem('user'))){
    var userIofo =  JSON.parse(localStorage.getItem('user')).menuItems
  }
  if (getToken() && userIofo) { // determine if there has token
    /* has token */
      if (to.path === '/login') {
        next({ path: '/' })
        // NProgress.done() // if current page is dashboard will not trigger afterEach hook, so manually handle it
      }else if(to.path == '/supplychain' || to.path == '/registered'){
        next()
      } else if( to.path === '/'){
        if(getToken()){
          next({ path: '/dashboard/index' })
        }else{
          next({ path: '/' })
        }
      } else { // 判断当前用户是否已拉取完user
          let a = ''
          if(userIofo[0].isRootNode){
            userIofo[0].children.forEach(item => {
              if(item.children == null){
                item.children = []
              }
            })
            let arr = userIofo[0].children
            for(var i=0;i<arr.length;i++){
              if(arr[i].pageUrl == to.path){
                if(arr[i].children.length){
                  a = arr[i].children[0].pageUrl
                  next({ path: a  })
                  return true
                }
              }
            }
            next()
            // throttleTipPop2()
        } else {
          userIofo.forEach(item => {
            if(item.children == null){
              item.children = []
            }
          })
          let arr = userIofo
          for(var i=0;i<arr.length;i++){
            if(arr[i].pageUrl == to.path){
              if(arr[i].children.length){
                a = arr[i].children[0].pageUrl
                next({ path: a  })
                return true
              }
            }
          }
          // throttleTipPop2()
          next()
        }
      }
  }else if(to.path !== '/supplychain' && to.path !== '/' && to.path !== '/registered' ){
    next({ path: '/' })
  }  else {
      next();
  }
})

router.afterEach(() => {
  // NProgress.done() // finish progress bar
})
