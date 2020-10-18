import React from "react";
import Nav3 from "../../Home/Nav3";
import {Footer00DataSource, Nav30DataSource} from "../../Home/data.source";
import Footer0 from "../../Home/Footer0";
import {
    Layout, Form,
    Input,
    Tooltip,
    Icon,
    Checkbox,
    InputNumber,
    Button,
    Radio, DatePicker, message, Modal,
} from "antd";
import {enquireScreen} from "enquire-js";
import './style.css'
import HttpUtil from "../../utils/HttpUtil";
import ApiUtil from "../../utils/ApiUtil";
import md5 from "md5";
import axios from 'axios'

const {Content} = Layout
const key = 'updatable';
let isMobile;
enquireScreen((b) => {
    isMobile = b;
});
const {location = {}} = typeof window !== 'undefined' ? window : {};
const constract = "短视频版权检测平台 用户许可协议\n\n版权所有（C） 2020 NEU-短视频版权检测系统大创组\n\nNEU-短视频版权检测系统大创组为 短视频版权检测平台 的开发商，依法独立拥有 短视频版权检测平台 的所有著作权。\n\n短视频版权检测平台的著作权已在中华人民共和国国家版权局注册（中国国家版权局著作权登记号：2006SR05908），著作权受到法律和国际公约保护。使用者：无论个人或组织、盈利与否、用途如何（包括以学习和研究为目的），均需仔细阅读本许可协议，在理解、同意、并遵守本许可协议的全部条件和条款后，方可开始使用短视频版权检测平台。\n\n本许可协议适用于且仅适用于 短视频版权检测平台，NEU-短视频版权检测系统大创组拥有对本使用许可协议的最终解释权。下面提到的“本软件”均系指短视频版权检测平台。“基于本软件的衍生著作”均系指基于 短视频版权检测平台 而产生的任何的衍生著作，例如对 短视频版权检测平台 进行翻译或是修改而产生的软件著作。\n\n有关本软件的用户许可协议、商业授权与技术服务的详细内容，均由NEU-短视频版权检测系统大创组独家提供。NEU-短视频版权检测系统大创组拥有在不事先通知的情况下，修改许可协议和服务价目表的权力，修改后的协议或价目表对自改变之日起的新授权用户生效。 \n\n电子文本形式的许可协议如同双方书面签署的协议一样，具有完全的和等同的法律效力。您一旦开始确认本协议并安装、使用、修改或分发本软件（或任何基于本软件的衍生著作），则表示您已经完全接受本许可协议的所有的条件和条款。如果您有任何违反本许可协议的行为，动易公司有权收回对您的许可授权，责令停止损害，并追究您的相关法律及经济责任。\n\n1、许可\n1.1\t本软件仅供给个人用户非商业使用。如果您是个人用户，那么您可以在完全遵守本用户许可协议的基础上，将本软件应用于非商业用途，而不必支付软件授权许可费用。 \n1.2\t您可以在本协议规定的约束和限制范围内修改本软件的源代码和界面风格以适应您的网站要求。\n1.3\t您可以在本协议规定的约束和限制范围内通过任何的媒介和渠道复制与分发本软件的源代码的副本（要求是逐字拷贝的副本）。\n1.4\t您可以去除本软件在模板（不论是前台还是后台模板）中的动易著作权信息，但您不得去除源代码中的动易著作权信息，且必须完整保留本软件中的License.txt文件，并维持文件内容及位置的原样。\n1.5\t您拥有使用本软件构建的网站全部内容所有权，并独立承担与这些内容的相关法律义务。\n1.6\t在获得商业授权之后，您可以将本软件应用于商业用途。 \n\n2、约束和限制\n2.1\t未获商业授权之前，不得将本软件用于商业用途，不得用于任何非个人所有的项目之中，例如属于企业、政府单位所有的网站。\n2.2\t未获商业授权之前，不得以任何形式提供与本软件相关的收费服务，包括但不限于以下行为：为用户提供本软件的相关咨询或培训服务并收费一定费用；用本软件为他人建站并收取一定费用；用本软件提供SaaS（软件做为服务）服务。\n2.3\t不得对本软件或与之关联的商业授权进行出租、出售、抵押或发放子许可证。\n2.4\t禁止任何以获利为目的的分发本软件的行为。\n2.5\t禁止在本软件的整体或任何部分基础上以发展任何派生版本、修改版本或第三方版本用于重新分发。\n\n3、无担保及免责声明\n3.1\t用户出于自愿而使用本软件，您必须了解使用本软件的风险，且同意自己承担使用本软件的风险。\n3.2\t用户利用本软件构建的网站的任何信息内容以及导致的任何版权纠纷和法律争议及后果与NEU-短视频版权检测系统大创组无关，NEU-短视频版权检测系统大创组对此不承担任何责任。\n3.3\t在适用法律允许的最大范围内，NEU-短视频版权检测系统大创组在任何情况下不就因使用或不能使用本软件所发生的特殊的、意外的、非直接或间接的损失承担赔偿责任（包括但不限于，资料损失，资料执行不精确，或应由您或第三人承担的损失，或本程序无法与其他程序运作等）。即使用户已事先被NEU-短视频版权检测系统大创组告知该损害发生的可能性。\n"

@Form.create()
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validateStatus: null,
            isMobile,
            show: !location.port, // 如果不是 dva 2.0 请删除
            confirmDirty: false,
            autoCompleteResult: [],
            agree: false,
            visible: false,
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            let register = values
            register.birth = register.birth.format('YYYY-MM-DD')
            register.password = md5(register.password)
            if (!err) {
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
                            return
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


    agreementOnChange = e => {
        this.setState({agree: e.target.checked})
    }

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
            <div style={{background: "#f0f2f5"}}>
                <Nav3
                    id="Nav3_0"
                    key="Nav3_0"
                    selectedKeys={['item3']}
                    dataSource={Nav30DataSource}
                    isMobile={this.state.isMobile}
                />
                <Content style={{padding: '0 50px'}}>
                    <div className='registerpage'>
                        <div className='container'>
                            <div className='register-box' style={{
                                background: "white",
                                borderRadius: "15px",
                                boxShadow: "0px 0px 20px rgba(137,137,137, 0.1)",
                                marginTop: "20px",
                                marginBottom: "50px",
                                padding: "20px",
                                paddingRight: "80px"
                            }}>
                                <div style={{
                                    fontWeight: "bold",
                                    marginBottom: "20px",
                                    marginLeft: "30px",
                                    fontSize: "25px"
                                }}>注册
                                </div>
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
                                        {getFieldDecorator('agreement', {
                                            valuePropName: 'checked',
                                        })(
                                            <Checkbox onChange={this.agreementOnChange}>
                                                我已经阅读了 <a onClick={()=>this.setState({visible:true})}>《短视频版权检测用户协议》</a>
                                            </Checkbox>,
                                        )}
                                    </Form.Item>
                                    <Form.Item {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit" disabled={!this.state.agree}>
                                            注册
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </Content>
                <Footer0
                    id="Footer0_0"
                    key="Footer0_0"
                    dataSource={Footer00DataSource}
                    isMobile={this.state.isMobile}
                />
                <Modal
                    visible={this.state.visible}
                    footer={<Button onClick={() => this.setState({visible: false})}>确定</Button>}
                    onCancel={() => this.setState({visible: false})}
                    title={'用户协议'}
                    centered
                >
                    <div style={{whiteSpace:"pre-wrap",overflowY:"scroll",wordBreak:"break-word",width:'100%',height:400}}>
                        {constract}
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Register