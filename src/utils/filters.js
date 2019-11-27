//全局过滤时间为XX年XX月XX日形式
let date= val => {
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

//返回时间格式为XX-XX-XX
let dateTime= val => {
    let str = '';
    if(val){
      str=val.slice(0 ,10)
      
    }
    return str      
}

export {date,dateTime};