import {Button, DatePicker, Form, Icon, Input, InputNumber, message, Radio, Tooltip} from "antd";
import md5 from "md5";
import axios from "axios";
import ApiUtil from "../../utils/ApiUtil";
import HttpUtil from "../../utils/HttpUtil";
import React from "react";

const key = 'updatable';

@Form.create()
class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validateStatus: null,

            confirmDirty: false,
            agree: false
        };
    }

    // 创建Form表单


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {

            if (!err) {
                let register = values
                register.birth = register.birth.format('YYYY-MM-DD')
                register.password = md5(register.password)
                message.loading({content: '注册中...', key});
                axios(
                    {
                        method: "post",
                        url: ApiUtil.URL_IP + ApiUtil.API_REGISTER_USER,
                        data: register
                    }
                ).then(
                    (res) => {
                        if (res.data.code === 0) {
                            message.success({content: res.data.msg, key, duration: 2});
                            this.props.form.resetFields();
                        } else {
                            message.error({content: res.data.msg, key, duration: 2});
                        }


                    }
                ).catch((res) => {
                    message.error(res.data.msg)
                })
            }
        });
    };

    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };
    validateUsername = (rule, value, callback) => {
        if (value) {
            HttpUtil.get(ApiUtil.API_CHECK_USER + value)
                .then(
                    re => {
                        if (re.code === 1) {
                            callback('该用户名已被使用')
                        } else {
                            callback();
                        }

                    }
                ).catch(error => {
                message.error(error.message);
            });
        }

    }
    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('您两次输入的密码不一致!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };


    render() {


        //form const settings
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
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

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item
                    hasFeedback
                    label={
                        <span>
                                                用户名&nbsp;
                            <Tooltip title="这是您用来登录的账号">
                                                <Icon type="question-circle-o"/>
                                                </Tooltip>
                                            </span>
                    }
                    extra={<span>
                                                 <Icon type="info-circle-o"/>&nbsp;用户名一旦确认，将不可更改！
                                            </span>}
                >
                    {getFieldDecorator('username', {
                        rules: [{
                            required: true,
                            message: '请输入您的用户名!',
                            whitespace: true
                        }, {validator: this.validateUsername}
                        ],
                    })(<Input/>)}

                </Form.Item>

                <Form.Item label="密码" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '请输入您的密码!',
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
                                message: '请再输入一次您的密码以确认!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur}/>)}
                </Form.Item>
                <Form.Item
                    label={
                        <span>
                                                昵称&nbsp;
                            <Tooltip title="您希望我们怎么称呼您?">
                                                <Icon type="question-circle-o"/>
                                                </Tooltip>
                                            </span>
                    }
                >
                    {getFieldDecorator('nickname', {
                        rules: [{
                            required: true,
                            message: '请输入您的昵称!',
                            whitespace: true
                        }],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label="性别">
                    {getFieldDecorator('sex', {
                        rules: [{
                            required: true,
                            message: "请选择性别"
                        }]
                    })(
                        <Radio.Group>
                            <Radio value={'男'}>男</Radio>
                            <Radio value={'女'}>女</Radio>
                        </Radio.Group>,
                    )}
                </Form.Item>
                <Form.Item label='年龄'>
                    {getFieldDecorator('age', {
                        rules: [{required: true, message: "请填写年龄"}]
                    })(<InputNumber min={1} max={120}/>)}
                    <span className="ant-form-text"> 岁</span>
                </Form.Item>
                <Form.Item label="出生日期">
                    {getFieldDecorator('birth', {
                        rules: [{type: 'object', required: true, message: '请选择出生日期!'}],
                    })(<DatePicker placeholder='请选择'/>)}
                </Form.Item>
                <Form.Item label="邮箱地址">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: '您输入的不是合法的邮箱格式!',
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
                        rules: [{required: true, message: '请输入您的手机号码!'}],
                    })(<Input addonBefore={'+86'} style={{width: '100%'}}/>)}
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" >
                        注册
                    </Button>
                </Form.Item>
            </Form>
        )

    }


}

export default RegisterForm