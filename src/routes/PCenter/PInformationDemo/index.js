import React from 'react'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'
import cookie from "react-cookies";
import {Tooltip, Radio, DatePicker, Icon, Input, Form, Row, Col, Button, message, InputNumber} from "antd";
import {isAuthenticated} from "../../../utils/Session";
import UserInfoCard from "../../../components/UserInfoCard";
import axios from "axios";
import ApiUtil from "../../../utils/ApiUtil";
import moment from 'moment'
import AvatarUpload from "../../../components/AvatarUpload";
import MyCard from "../../../components/MyCard/MyCard";
import Clock from "react-clock";
import 'react-clock/dist/Clock.css';

const formItemLayout = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 4},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const key = 'updatable';
@Form.create()
class PInformationDemo extends React.Component {
    state = {
        user: {},
        time: new Date(),
        timer:null,
    }

    componentDidMount() {
        this.setState({
            timer:setInterval(()=>{
                this.setState({
                    time: new Date(),
                });
//需要定时执行的方法

            }, 1000)
        })
    }

    componentWillMount() {
        axios({
            method: "get",
            url: ApiUtil.URL_IP + '/api/getUser/' + isAuthenticated()
        }).then(res => {
            let user = res.data.data
            this.setState({user: user})
            this.props.form.setFieldsValue({
                nickname: user.nickname,
                sex: user.sex,
                age: user.age,
                birth: moment(user.birth, 'YYYY-MM-DD'),
                email: user.email,
                phone: user.phone,
                sign: user.sign
            });
        })

        this.setState({
            admined: cookie.load('userId-admined'),
            avatar: require('../../../assets/img/04.jpg')
        })

    }
    componentWillUnmount() {
        clearTimeout(this.state.timer)
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            let register = values
            register.birth = register.birth.format('YYYY-MM-DD')
            if (!err) {
                message.loading({content: '正在提交更改...', key});
                axios(
                    {
                        method: "post",
                        url: ApiUtil.URL_IP + '/api/updateUser/' + isAuthenticated(),
                        data: register
                    }
                ).then(
                    (res) => {
                        message.success({content: res.data.msg, key, duration: 2});
                    }
                ).catch((res) => {
                    message.error({content: res.data.msg, key, duration: 2});
                })
            }
        });
    };

    render() {

        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <CustomBreadcrumb arr={['个人中心', '个人资料']}/>
                <Row gutter={30}>
                    <Col span={6}>
                        <UserInfoCard name={isAuthenticated()}/>
                        <MyCard style={{marginLeft: 30, marginTop: -30, height: 210, alignContent: 'center',
                            alignItems: 'center',
                            boxSizing: 'border-box',
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            justifyContent: 'center',}}>
                            <Clock renderNumbers={true} value={this.state.time} />
                        </MyCard>
                    </Col>
                    <Col span={18}>
                        <div className="info-card" style={
                            {
                                background: "white",
                                borderRadius: "15px",
                                boxShadow: "0px 0px 20px rgba(137,137,137, 0.1)",
                                marginTop: "20px",
                                marginBottom: "50px",
                                padding: "20px"
                            }}>
                            <div style={{marginLeft: "30px"}}>
                                <div style={{fontWeight: "bold", marginBottom: "20px", fontSize: "18px"}}>个人资料</div>
                                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                    <Form.Item label='头像'>
                                        <AvatarUpload name={this.state.user.username}/>
                                    </Form.Item>
                                    <Form.Item label="用户名">
                                         <span>{isAuthenticated()}&nbsp;
                                             <Tooltip title="您不可以更改您的用户名">
                                                <Icon type="question-circle-o"/>
                                            </Tooltip>
                                            </span>

                                    </Form.Item>

                                    <Form.Item
                                        label={
                                            <span>昵称&nbsp;
                                                <Tooltip title="您希望我们怎么称呼您？">
                                                <Icon type="question-circle-o"/>
                                            </Tooltip>
                                            </span>
                                        }
                                    >
                                        {getFieldDecorator('nickname', {
                                            // initialValue: this.state.user.nickname,
                                            rules: [{
                                                required: true,
                                                message: '请输入您的昵称！',
                                                whitespace: true
                                            }],
                                        })(<Input/>)}
                                    </Form.Item>
                                    <Form.Item label="性别">
                                        {getFieldDecorator('sex', {
                                            // initialValue: this.state.user.sex,
                                            rules: [{required: true}]
                                        })(
                                            <Radio.Group>
                                                <Radio value="男">男</Radio>
                                                <Radio value="女">女</Radio>
                                            </Radio.Group>,
                                        )}
                                    </Form.Item>
                                    <Form.Item label='年龄'>
                                        {getFieldDecorator('age', {
                                            // initialValue: this.state.user.age,
                                            rules: [{required: true, message: "请填写年龄"}]
                                        })(<InputNumber min={1} max={120}/>)}
                                        <span className="ant-form-text"> 岁</span>
                                    </Form.Item>
                                    <Form.Item label="出生日期">
                                        {getFieldDecorator('birth', {
                                            // initialValue: moment(this.state.user.birth, 'YYYY-MM-DD'),
                                            rules: [{type: 'object', required: true, message: 'Please select time!'}],
                                        })(<DatePicker placeholder={'请选择出生日期'}/>)}
                                    </Form.Item>
                                    <Form.Item label="邮箱地址">
                                        {getFieldDecorator('email', {
                                            // initialValue: this.state.user.email,
                                            rules: [
                                                {
                                                    type: 'email',
                                                    message: '您输入的不是合法邮箱地址!',
                                                },
                                                {
                                                    required: true,
                                                    message: '请输入您的邮箱地址!',
                                                },
                                            ],
                                        })(<Input/>)}
                                    </Form.Item>
                                    <Form.Item label="手机号码">
                                        {getFieldDecorator('phone', {
                                            // initialValue: this.state.user.phone,
                                            rules: [{required: true, message: '请输入您的手机号码!'}],
                                        })(<Input addonBefore={"+86"}
                                                  style={{width: '100%'}}/>)}
                                    </Form.Item>
                                    <Form.Item
                                        label={
                                            <span>个性签名&nbsp;
                                                <Tooltip title="留下您的座右铭吧！">
                                                <Icon type="question-circle-o"/>
                                            </Tooltip>
                                            </span>
                                        }
                                    >
                                        {getFieldDecorator('sign', {
                                            // initialValue: this.state.user.sign,
                                            rules: [{
                                                required: false,
                                                message: '请输入您的昵称！',
                                                whitespace: true
                                            }],
                                        })(<Input.TextArea/>)}
                                    </Form.Item>
                                    <Form.Item {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit">
                                            保存
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>

                        </div>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default PInformationDemo
