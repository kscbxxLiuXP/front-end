import React from 'react'
import CustomMenu from "../CustomMenu/index";
import {Affix, Typography} from "antd";
import cookie from "react-cookies";

const {Text} = Typography;


class SiderNav extends React.Component {

    getMenu() {
        let menus
        if (cookie.load('userId-admined') == 1) {
            menus = [
                {
                    title: '首页',
                    icon: 'home',
                    key: '/home'
                },
                {
                    title: '公告',
                    icon: 'sound',
                    key: '/home/notice',

                },
                {
                    title: '个人中心',
                    icon: 'bars',
                    key: '/home/personalCenter',
                    subs: [
                        {key: '/home/personalCenter/information', title: '个人资料', icon: 'user'},
                        {key: '/home/personalCenter/account', title: '账号相关', icon: 'link'},
                        {key: '/home/personalCenter/messages', title: '消息中心', icon: 'bell'},
                    ]
                },
                {
                    title: '上传中心',
                    icon: 'upload',
                    key: '/home/upload',

                },
                {
                    title: '我的创作',
                    icon: 'edit',
                    key: '/home/content',

                },
                {
                    title: '申诉中心',
                    icon: 'bulb',
                    key: '/home/appeal',
                },
                {
                    title: '管理',
                    icon: 'desktop',
                    key: '/home/dbmanage',
                    subs: [
                        {key: '/home/dbmanage/user', title: '用户管理', icon: 'usergroup-add'},
                        {key: '/home/dbmanage/feature', title: '特征库管理', icon: 'diff'},
                        {key: '/home/dbmanage/video', title: '视频库管理', icon: 'video-camera'},
                        {key: '/home/dbmanage/appeal', title: '申诉处理', icon: 'bulb'},
                    ]
                },
                {
                    title: '问题反馈',
                    icon: 'question-circle',
                    key: '/home/feedback',

                },
                {
                    title: '关于',
                    icon: 'info-circle-o',
                    key: '/home/about'
                }
            ]
        } else {
            menus = [
                {
                    title: '首页',
                    icon: 'home',
                    key: '/home'
                },
                {
                    title: '公告',
                    icon: 'sound',
                    key: '/home/notice',

                },
                {
                    title: '个人中心',
                    icon: 'bars',
                    key: '/home/personalCenter',
                    subs: [
                        {key: '/home/personalCenter/information', title: '个人资料', icon: 'user'},
                        {key: '/home/personalCenter/account', title: '账号相关', icon: 'link'},
                        {key: '/home/personalCenter/messages', title: '消息中心', icon: 'bell'},
                    ]
                },
                {
                    title: '上传中心',
                    icon: 'upload',
                    key: '/home/upload',

                },
                {
                    title: '我的创作',
                    icon: 'edit',
                    key: '/home/content',

                },
                {
                    title: '申诉中心',
                    icon: 'bulb',
                    key: '/home/appeal',
                },
                {
                    title: '问题反馈',
                    icon: 'question-circle',
                    key: '/home/feedback',

                },
                {
                    title: '关于',
                    icon: 'info-circle-o',
                    key: '/home/about'
                }
            ]
        }
        return menus
    }

    render() {
        return (
            <div style={{height: '100vh'}}>

                <div style={styles.logo}>
                    <img style={{maxWidth: 20, height: 'auto', alignContent: 'center'}} alt='logo'
                         src={require('../../assets/img/shortVideo.png')}/>
                    {this.props.collapsed ? null :
                        <Text style={{
                            flex: 1,
                            fontSize: 16,
                            lineHeight: 2,
                            marginVertical: 10,
                            marginLeft: 5,
                        }}>短视频版权检测</Text>}</div>

                <CustomMenu menus={this.getMenu()}/>

            </div>
        )
    }
}

const styles = {
    logo: {
        height: '32px',

        margin: '14px',
        color: 'white',
        textAlign: 'center',
        fontSize: 16

    }
}

export default SiderNav
