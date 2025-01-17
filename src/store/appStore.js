import {observable, action} from 'mobx'
import {isAuthenticated, authenticateSuccess, logout} from '../utils/Session'
import cookie from "react-cookies"

class AppStore {
    @observable isLogin = !!isAuthenticated()  //利用cookie来判断用户是否登录，避免刷新页面后登录状态丢失
    @observable users = []  //模拟用户数据库
    @observable loginUser = {}  //当前登录用户信息

    @action toggleLogin(flag, info = {}) {
        this.loginUser = info  //设置登录用户信息
        if (flag) {
            authenticateSuccess(info.username)
            this.isLogin = true
            cookie.save('userId-admined', info.admined, { path: '/' })
        } else {
            logout()
            this.isLogin = false
            cookie.remove('userId-admined', { path: '/' })
        }

    }

}

export default new AppStore()