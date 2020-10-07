import React from 'react'
import {Icon, Badge, Dropdown, Menu, Modal, Typography, notification, Tooltip, Tag} from 'antd'
import screenfull from 'screenfull'
import {inject, observer} from 'mobx-react'
import {Link, withRouter} from 'react-router-dom'
import {isAuthenticated} from '../../utils/Session'
import {formateDate, formateTime} from '../../utils/utils'
import cookie from "react-cookies";
import axios from 'axios'
import ApiUtil from "../../utils/ApiUtil";
import Clock from "react-clock";
import appStore from "../../store/appStore";
const {Text} = Typography;
const logo="\n" +
    " _   _ _     _           ______     _            _   \n" +
    "| | | (_)   | |          |  _  \\   | |          | |  \n" +
    "| | | |_  __| | ___  ___ | | | |___| |_ ___  ___| |_ \n" +
    "| | | | |/ _` |/ _ \\/ _ \\| | | / _ \\ __/ _ \\/ __| __|\n" +
    "\\ \\_/ / | (_| |  __/ (_) | |/ /  __/ ||  __/ (__| |_ \n" +
    " \\___/|_|\\__,_|\\___|\\___/|___/ \\___|\\__\\___|\\___|\\__|\n" +
    "                                                     \n" +
    "                                                     \n"
//withRouter一定要写在前面，不然路由变化不会反映到props中去
@withRouter  @observer
class HeaderBar extends React.Component {
    state = {
        icon: 'arrows-alt',
        count: 0,
        visible: false,
        avatar: require('./img/04.jpg'),
        time: ''
    }

    componentDidMount() {
        console.log(logo)
        screenfull.onchange(() => {
            this.setState({
                icon: screenfull.isFullscreen ? 'shrink' : 'arrows-alt'
            })
        })
        setInterval(() => {

            // new Date();
            let sysTime = formateTime(new Date().getTime());
            this.setState({
                time: sysTime,
                date: new Date(),
            });
        }, 1000);
        setInterval(() => {
            if (isAuthenticated())
                this.getMessageCount()
        }, 5000)
    }

    getMessageCount() {
        axios({
            method: "get",
            url: ApiUtil.URL_IP + '/api/getUnreadCount/' + isAuthenticated()
        }).then(
            res => {
                if (res.data.data > this.state.count) {
                    notification.open({
                        message: '提示',
                        description:
                            '您有新的消息，请注意查看！',
                        icon: <Icon type="smile" style={{color: '#108ee9'}}/>,
                        top: 80
                    });
                }
                this.setState({count: res.data.data})

            }
        )
    }

    componentWillMount() {
        axios({
            method: "get",
            url: ApiUtil.URL_IP + '/api/getUnreadCount/' + isAuthenticated()
        }).then(
            res => {
                this.setState({count: res.data.data})

            }
        )
        let sysTime = formateTime(new Date().getTime());
        this.setState({
            date: new Date(),
            time: sysTime
        })
    }

    componentWillUnmount() {

        screenfull.off('change')

    }

    toggle = () => {
        this.props.onToggle()
    }
    screenfullToggle = () => {
        if (screenfull.enabled) {
            screenfull.toggle()
        }
    }
    logout = () => {
        appStore.toggleLogin(false)
        this.props.history.push('/index')
    }

    render() {
        const {icon, count, visible, avatar} = this.state
        const { collapsed, location} = this.props
        const notLogin = (
            <div>
                <Link to={{pathname: '/login', state: {from: location}}}
                      style={{color: 'rgba(0, 0, 0, 0.65)'}}>登录</Link>&nbsp;
                <img src={require('../../assets/img/defaultUser.jpg')} alt=""/>
            </div>
        )
        const menu = (
            <Menu className='menu'>
                <Menu.ItemGroup title='用户中心' className='menu-group'>
                    <Menu.Item><Icon type="smile"/><span
                        onClick={() => {
                            this.props.history.push('/#/home')
                        }}>你好 - {isAuthenticated()}</span>
                    </Menu.Item>
                    <Menu.Item> <Icon type="user"/><span onClick={() => {
                        this.props.history.push('/home/personalCenter/information')
                    }}>个人信息</span></Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title='设置中心' className='menu-group'>
                    <Menu.Item><Icon type="setting"/><span onClick={() => {
                        this.props.history.push('/home/personalCenter/account')
                    }}>
                      账号设置</span></Menu.Item>
                    <Menu.Item><Icon type="setting"/><span>系统设置</span></Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title='操作' className='menu-group'>
                    <Menu.Item><Icon type="logout"/><span onClick={this.logout}>退出登录</span></Menu.Item>
                </Menu.ItemGroup>
            </Menu>
        )
        const login = (
            <Dropdown overlay={menu}>
                <img onClick={() => this.setState({visible: true})}
                     src={`${ApiUtil.URL_IP}/api/getAvatar/${isAuthenticated()}`} alt=""/>
            </Dropdown>
        )
        return (
            <div id='headerbar'>
                <Icon
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    className='trigger'
                    onClick={this.toggle}/>
                <Text style={{marginLeft: 15, marginRight: 15, fontSize: 20}}>{collapsed ? '短视频版权检测平台' : ''}</Text>
                {cookie.load('userId-admined') == 1 ? <Tag color="volcano">
                    管理员模式
                </Tag> : ''}


                <div style={{lineHeight: '64px', float: 'right'}}>

                    <ul className='header-ul'>
                        {/*<li><Clock value={this.state.date}/></li>*/}
                        <li><Icon type='clock-circle'/></li>
                        <li style={{marginLeft: '-50px'}}>{this.state.time}</li>

                        <Tooltip title="全屏">
                            <li style={{marginLeft: '-25px'}}><Icon type={icon} onClick={this.screenfullToggle}/></li>
                        </Tooltip>
                        <Tooltip title="消息中心">
                            <li style={{marginLeft: '-25px'}} onClick={() => {
                                this.props.history.push("/home/personalCenter/messages")
                            }}>
                                <Badge count={appStore.isLogin ? count : 0} overflowCount={99}
                                       style={{marginRight: -17}}>
                                    <Icon type="notification"/>
                                </Badge>
                            </li>
                        </Tooltip>
                        <li style={{marginLeft: '0px'}}>
                            {appStore.isLogin ? login : notLogin}
                        </li>
                    </ul>
                </div>
                <Modal
                    footer={null} closable={false}
                    visible={visible}
                    wrapClassName="vertical-center-modal"
                    onCancel={() => this.setState({visible: false})}>
                    <img src={`${ApiUtil.URL_IP}/api/getAvatar/${isAuthenticated()}`} alt="" width='100%'/>
                </Modal>
            </div>
        )
    }
}

export default HeaderBar
