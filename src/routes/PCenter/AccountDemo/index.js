import React from 'react'
import CustomBreadcrumb from "../../../components/CustomBreadcrumb/index";
import cookie from "react-cookies";
import {Button, Col, Form, Input, message, Row,} from "antd";
import UserInfoCard from "../../../components/UserInfoCard";
import {isAuthenticated} from "../../../utils/Session";
import axios from 'axios'
import ApiUtil from "../../../utils/ApiUtil";
import md5 from 'md5'

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

@Form.create()
class AccountDemo extends React.Component {
    componentDidMount() {

        this.setState({

            admined: cookie.load('userId-admined'),
        })
    }

    changePassword(data) {
        axios({
            url: ApiUtil.API_CHECK_PASSWORD + data.username + '/' + data.oldpassword,
            method: 'get'
        }).then(res => {
            if (res.data.code === 1) {
                axios({
                    url: ApiUtil.URL_IP + '/api/changePassword',
                    method: 'post',
                    data: data
                }).then(res => {
                    if (res.data.code === 0) {
                        message.success('修改成功！')
                    } else {
                        message.error('修改失败，请重新尝试！')
                    }
                })
            } else {
                message.error('原密码错误！')
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = values
                data.username = isAuthenticated()
                data.password = md5(values.newpassword)
                data.oldpassword = md5(values.oldpassword)
                console.log(data)
                this.changePassword(data)
            }
        });
    };

    render() {

        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <CustomBreadcrumb arr={['个人中心', '账号相关']}/>
                <Row gutter={30}>
                    <Col span={6}>
                        <UserInfoCard name={isAuthenticated()}/>
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
                                <div style={{fontWeight: "bold", marginBottom: "20px", fontSize: "18px"}}>账号相关</div>
                                <Form {...formItemLayout} className='changepassword' onSubmit={this.handleSubmit}>
                                    <Form.Item label="原密码" hasFeedback>
                                        {getFieldDecorator('oldpassword', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入您原来的密码!',
                                                },
                                                {
                                                    validator: this.validateToNextPassword,
                                                },
                                            ],
                                        })(<Input.Password/>)}
                                    </Form.Item>
                                    <Form.Item label="新密码" hasFeedback>
                                        {getFieldDecorator('newpassword', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入新的密码!',
                                                },
                                                {
                                                    validator: this.validateToNextPassword,
                                                },
                                            ],
                                        })(<Input.Password/>)}
                                    </Form.Item>
                                    <Form.Item label="确认密码" hasFeedback>
                                        {getFieldDecorator('confirm', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请再输入一次密码!',
                                                },
                                                {
                                                    validator: this.compareToFirstPassword,
                                                },
                                            ],
                                        })(<Input.Password onBlur={this.handleConfirmBlur}/>)}
                                    </Form.Item>
                                    <Form.Item {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit">
                                            确定
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


export default AccountDemo
