import router from '@/router'
import axios from "axios"
//https://www.easy-mock.com/mock/5c7b4ded55bd777ed3b51f12/example/geiquan
var url_d = 'https://www.easy-mock.com/mock/5c73a0393baee470d9b3e7ea/mock.api/'

export default {
    install(Vue, options) {
        Vue.prototype.hf = function (url, cu) {
            router.push({
                path: url,
                query: cu
            })


        }

        Vue.prototype.get = function (url, dtat, call) {
            axios.get(url_d + url, {
                params: dtat
            }).then(function (response) {
                call(response.data.data)
            })
        }
        Vue.prototype.time_c = function (t) {
            let time = new Date()
            let Year = time.getFullYear(),
                Month = time.getMonth() + 1,
                Data = time.getDate() < 10 ? 0 + '' + time.getDate() : time.getDate()
            Month < 10 ? Month = 0 + '' + Month : Month = Month
            return Year + "-" + Month + "-" + Data
        }

        Vue.prototype.rules_b = {
            x_name: [
                {
                    required: true,
                    message: '请输入分组名称，必须为2-30个汉字',
                    trigger: 'blur'
                }
          ],
        }


        Vue.prototype.time_d = function (t) {
            let time = new Date()
            time.setTime(t )
            let Year = time.getFullYear(),
                Month = time.getMonth() + 1,
                Data = time.getDate() < 10 ? 0 + '' + time.getDate() : time.getDate(),
                hour = time.getHours() < 10 ? 0 + '' + time.getHours() : time.getHours(),
                Minutes = time.getMinutes() < 10 ? 0 + '' + time.getMinutes() : time.getMinutes(),
                Seconds = time.getSeconds() < 10 ? 0 + '' + time.getSeconds() : time.getSeconds()
            Month < 10 ? Month = 0 + '' + Month : Month = Month
            return Year + "-" + Month + "-" + Data + " " + hour + ":" + Minutes + ":" + Seconds
        }


    }
}
