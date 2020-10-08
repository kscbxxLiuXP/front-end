import React from 'react'
import Nav3 from "../../Home/Nav3";
import {Footer00DataSource, Nav30DataSource} from "../../Home/data.source";
import {enquireScreen} from "enquire-js";
import Footer0 from "../../Home/Footer0";
import {Col, Form, Input, Row, Button, Layout, notification, Tooltip, message} from "antd";
import GVerify from "../../utils/gVerify";
import './style.css'
import {withRouter} from "react-router-dom";
import { observer} from "mobx-react";
import HttpUtil from "../../utils/HttpUtil";
import ApiUtil from "../../utils/ApiUtil";
import md5 from "md5";
import '../../Home/css/antMotionStyle.css'
import appStore from "../../store/appStore";

const {Content,Footer} = Layout;

let isMobile;
enquireScreen((b) => {
    isMobile = b;
});
const {location = {}} = typeof window !== 'undefined' ? window : {};

@Form.create() @withRouter  @observer
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focusItem: -1,
            isMobile,
            show: !location.port, // 如果不是 dva 2.0 请删除
            code: '',//验证码
            user: '',
            check: 0
        };
    }

    componentDidMount() {

        //初始化验证码
        this.verifyCode = new GVerify('v_container')
        this.setState({code: this.verifyCode.options.code})
        notification.open({
            message: '初始登录',
            duration: 0,
            top: 100,
            description: (<ul>
                <li>账号：admin</li>
                <li>密码：admin</li>
            </ul>)
        })
    }

    componentWillUnmount() {
        this.verifyCode = null
        notification.destroy()
    }



    loginSubmit = (e) => {

        e.preventDefault()
        this.setState({
            focusItem: -1
        })
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 表单登录时，若验证码长度小于4则不会验证，所以我们这里要手动验证一次，线上的未修复
                if (this.verifyCode.options.code.toUpperCase() !== values.verification.toUpperCase()) {
                    this.props.form.setFields({
                        verification: {
                            value: values.verification,
                            errors: [new Error('验证码错误')]
                        }
                    })
                    return
                }


                const users = appStore.users
                console.log(users)

                // 检测用户名是否存在
                // const result = users.find(item => item.username === values.username)
                HttpUtil.get(ApiUtil.API_CHECK_USER + values.username)
                    .then(
                        re => {
                            if (re.code === 1) {
                                //检测密码是否错误
                                console.log(md5(values.password))
                                HttpUtil.get(ApiUtil.API_CHECK_PASSWORD + values.username + '/' + md5(values.password))
                                    .then(
                                        re => {
                                            if (re.code === 1) {
                                                this.setState({check: 1})
                                                message.success('认证成功');
                                                appStore.toggleLogin(true, {
                                                    username: values.username,
                                                    admined: re.admined
                                                })
                                                this.props.history.push('/')
                                            } else {
                                                this.setState({check: 0})
                                                message.error('认证失败');
                                            }

                                        }
                                    ).catch(error => {
                                    message.error(error.message);
                                });
                                if (this.state.check !== 1) {
                                    this.props.form.setFields({
                                        password: {
                                            value: values.password,
                                            errors: [new Error('密码错误')]
                                        }
                                    })
                                    return
                                }

                            } else {
                                this.props.form.setFields({
                                    username: {
                                        value: values.username,
                                        errors: [new Error('用户名不存在')]
                                    }
                                })
                                return
                            }

                        }
                    ).catch(error => {
                    message.error(error.message);
                });

            }
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form
        const {focusItem} = this.state
        return (
            <Layout style={{background: "#f0f2f5",height:'100%',width:'100%',position:"absolute"}}>
                <Nav3
                    id="Nav3_0"
                    key="Nav3_0"
                    dataSource={Nav30DataSource}
                    isMobile={this.state.isMobile}
                />
                <Content style={{padding: '0 50px'}}>
                    {/*<div style={{fontWeight: "bold", marginBottom: "20px", fontSize: "18px"}}>账号相关</div>*/}
                    <div className='loginpage' id='loginpage'>
                        <div className='container'>
                            <div className='login-box-active login-box'>
                                <div className='owl'>
                                    <div className='hand-left hand'
                                         style={focusItem === 1 ? styles.focusHandLeft : {}}/>
                                    <div className='hand-right hand'
                                         style={focusItem === 1 ? styles.focusHandRight : {}}/>
                                    <div className='arms-box'>
                                        <div className='arms arms-left'
                                             style={focusItem === 1 ? styles.focusArmsLeft : {}}/>
                                        <div className='arms arms-right'
                                             style={focusItem === 1 ? styles.focusArmsRight : {}}/>
                                    </div>
                                </div>
                                <Form onSubmit={this.loginSubmit}>
                                    <Form.Item>
                                        {getFieldDecorator('username', {
                                            rules: [{required: true, message: '请输入用户名'}]
                                        })(
                                            <Input
                                                placeholder='用户名'
                                                addonBefore={<Tooltip title='用户名'><span className='iconfont icon-User'
                                                                                        style={focusItem === 0 ? styles.focus : {}}/></Tooltip>}
                                                onFocus={() => this.setState({focusItem: 0})}
                                                onBlur={() => this.setState({focusItem: -1})}
                                                size='large'/>
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('password', {
                                            rules: [{required: true, message: '请输入密码'}]
                                        })(
                                            <Input
                                                placeholder='密码'
                                                addonBefore={<Tooltip title='密码'><span className='iconfont icon-suo1'
                                                                                       style={focusItem === 1 ? styles.focus : {}}/></Tooltip>}
                                                type='password'
                                                onFocus={() => this.setState({focusItem: 1})}
                                                onBlur={() => this.setState({focusItem: -1})}
                                                size='large'/>
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('verification', {
                                            validateFirst: true,
                                            rules: [
                                                {required: true, message: '请输入验证码'},
                                                {
                                                    validator: (rule, value, callback) => {
                                                        if (value.length >= 4 && !this.verifyCode.validate(value)) {
                                                            callback('验证码错误')
                                                        }
                                                        callback()
                                                    }
                                                }
                                            ]
                                        })(
                                            <Row gutter={8}>
                                                <Col span={16}>
                                                    <Input
                                                        placeholder='验证码'
                                                        addonBefore={<Tooltip title='验证码'><span
                                                            className='iconfont icon-securityCode-b'
                                                            style={focusItem === 2 ? styles.focus : {}}/></Tooltip>}
                                                        onFocus={() => this.setState({focusItem: 2})}
                                                        onBlur={() => this.setState({focusItem: -1})}
                                                        size='large'/>
                                                </Col>
                                                <Col span={8}>
                                                    <div id='v_container' style={{height: 40}}/>
                                                </Col>
                                            </Row>
                                        )}
                                    </Form.Item>
                                    <div className='bottom'>
                                        <span className='registerBtn' onClick={()=>{this.props.history.push('/register')}}>注册</span>&emsp;
                                        <Button type='primary' htmlType="submit">登录</Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </Content>

                <Footer style={{padding:0}}>
                    <Footer0
                        id="Footer0_0"
                        key="Footer0_0"
                        dataSource={Footer00DataSource}
                        isMobile={this.state.isMobile}
                    />
                </Footer>

            </Layout>
        )
    }
}

const styles = {
    focus: {
        transform: 'scale(0.6)',
        width: 40
    },
    focusHandLeft: {
        transform: 'translateX(-42px) translateY(-15px) scale(0.7)',
    },
    focusHandRight: {
        transform: 'translateX(42px) translateY(-15px) scale(0.7)',
    },
    focusArmsLeft: {
        transform: 'translateY(-40px) translateX(-40px) scaleX(-1)'
    },
    focusArmsRight: {
        transform: 'translateY(-40px) translateX(40px)'
    }
}
export default Login
