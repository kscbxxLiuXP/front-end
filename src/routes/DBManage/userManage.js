import React from "react";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import {
    Avatar,
    BackTop,
    Button,
    Card,
    DatePicker,
    Drawer,
    Dropdown,
    Form,
    Icon,
    Input,
    InputNumber,
    Menu,
    message,
    Modal,
    Radio,
    Spin,
    Table,
    Tag,
    Tooltip
} from "antd";
import HttpUtil from "../../utils/HttpUtil";
import ApiUtil from "../../utils/ApiUtil";
import Highlighter from "react-highlight-words";
import moment from "moment";
import {isAuthenticated} from "../../utils/Session";
import axios from "axios";
import md5 from 'md5';
import RegisterForm from "../../components/RegisterForm";

const NicknameHighlight = '#ffc069';
const UsernameHighlight = '#83d072';
const EmailHighlight = '#85cce8';
const PhoneHighlight = '#ee85ba';
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
class UserManageDemo extends React.Component {

    state = {
        loading: true,
        data: [],
        user: {},
        selectedRowKeys: [], // Check here to configure the default column
        visible: false,
        //search filter
        searchNickName: '',
        searchUsername: '',
        searchSex: '',
        searchEmail: '',
        searchPhone: '',
        searchLevel: '',
        editUserVisible: false,
        createUserVisible: false,
        deleteVisible: false,
        resetPasswordVisible: false,
        setPasswordVisible: false,
        setAdminVisible: false,
        setUserVisible: false,
        newPassword: '',
        authPassword: '',
    }

    getNickNameFilter = () => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`搜索 昵称`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => {
                        confirm();
                        this.setState({
                            searchNickName: selectedKeys[0],
                        });
                    }}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => {
                        confirm();
                        this.setState({
                            searchNickName: selectedKeys[0],
                        });
                    }}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    搜索
                </Button>
                <Button onClick={() => {
                    clearFilters();
                    this.setState({searchNickName: ''});
                }} size="small" style={{width: 90}}>
                    重置
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record['nickname']
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            <Highlighter
                highlightStyle={{backgroundColor: `${NicknameHighlight}`, padding: 0}}
                searchWords={[this.state.searchNickName]}
                autoEscape
                textToHighlight={text.toString()}
            />

    });
    getUserNameFilter = () => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`搜索 用户名`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => {
                        confirm();
                        this.setState({
                            searchUsername: selectedKeys[0],
                        });
                    }}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => {
                        confirm();
                        this.setState({
                            searchUsername: selectedKeys[0],
                        });
                    }}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    搜索
                </Button>
                <Button onClick={() => {
                    clearFilters();
                    this.setState({searchUsername: ''});
                }} size="small" style={{width: 90}}>
                    重置
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record['username']
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            <Highlighter
                highlightStyle={{backgroundColor: `${UsernameHighlight}`, padding: 0}}
                searchWords={[this.state.searchUsername]}
                autoEscape
                textToHighlight={text.toString()}
            />

    });
    getEmailFilter = () => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`搜索 邮箱地址`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => {
                        confirm();
                        this.setState({
                            searchEmail: selectedKeys[0],
                        });
                    }}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => {
                        confirm();
                        this.setState({
                            searchEmail: selectedKeys[0],
                        });
                    }}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    搜索
                </Button>
                <Button onClick={() => {
                    clearFilters();
                    this.setState({searchEmail: ''});
                }} size="small" style={{width: 90}}>
                    重置
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record['email']
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            <Highlighter
                highlightStyle={{backgroundColor: `${EmailHighlight}`, padding: 0}}
                searchWords={[this.state.searchEmail]}
                autoEscape
                textToHighlight={text.toString()}
            />

    });
    getPhoneFilter = () => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`搜索 手机号码`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => {
                        confirm();
                        this.setState({
                            searchPhone: selectedKeys[0],
                        });
                    }}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => {
                        confirm();
                        this.setState({
                            searchPhone: selectedKeys[0],
                        });
                    }}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    搜索
                </Button>
                <Button onClick={() => {
                    clearFilters();
                    this.setState({searchPhone: ''});
                }} size="small" style={{width: 90}}>
                    重置
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record['phone']
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            <Highlighter
                highlightStyle={{backgroundColor: `${PhoneHighlight}`, padding: 0}}
                searchWords={[this.state.searchPhone]}
                autoEscape
                textToHighlight={text.toString()}
            />

    });
    columns = [
        {
            title: '头像',
            dataIndex: 'avatar',
            key: 'avatar',
            width: 50,
            render: avatar => (<Avatar size={50}
                                       src={`${ApiUtil.URL_IP}/api/avatar/${avatar}`}/>)
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            ...this.getUserNameFilter(),
        },
        {
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
            ...this.getNickNameFilter(),
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            filters: [{
                text: '男',
                value: '男',
            }, {
                text: '女',
                value: '女',
            }],
            onFilter: (value, record) => record.sex === value,
        },
        {
            title: '出生日期',
            dataIndex: 'birth',
            key: 'birth',
            sorter: (a, b) => moment(a.birth) - moment(b.birth),
        },
        {
            title: '邮箱地址',
            dataIndex: 'email',
            key: 'email',
            ...this.getEmailFilter(),
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
            ...this.getPhoneFilter(),
        },
        {
            title: '注册日期',
            dataIndex: 'registerTime',
            key: 'registerTime',
            sorter: (a, b) => moment(a.registerTime) - moment(b.registerTime),
        },
        {
            title: '用户等级',
            dataIndex: 'level',
            key: 'level',
            width: 50,
            filters: [{
                text: '管理员',
                value: 1,
            }, {
                text: '普通用户',
                value: 0,
            }],
            onFilter: (value, record) => record.level === value,
            render: level => <Tag color={level === 1 ? "#2db7f5" : "#95bb6e"}>{level === 1 ? "管理员" : "普通用户"}</Tag>
        },
        {
            title: '操作',
            key: 'action',
            width: 210,
            render: (text, record) => (
                <span>
                        <Button size='small' icon="edit" style={{margin: 2}}
                                onClick={() => {
                                    let user = record
                                    this.setState({user: user, editUserVisible: true})
                                    this.props.form.setFieldsValue({
                                            username: user.username,
                                            nickname: user.nickname,
                                            sex: user.sex,
                                            age: user.age,
                                            birth: moment(user.birth, 'YYYY-MM-DD'),
                                            email: user.email,
                                            phone: user.phone,
                                            sign: user.sign
                                        }
                                    );
                                }}>编辑</Button>

                        <Button size='small' icon="user-delete" style={{margin: 2}}
                                onClick={() => {
                                    let user = record
                                    this.setState({user: user, deleteVisible: true})
                                }}>删除</Button>
                          <Dropdown overlay={
                              <Menu onClick={e => {
                                  if (e.key === '1') {
                                      let user = record
                                      this.setState({user: user, resetPasswordVisible: true})
                                  } else if (e.key === '2') {
                                      let user = record
                                      this.setState({user: user, setPasswordVisible: true})
                                  } else if (e.key === '3') {
                                      let user = record
                                      this.setState({user: user, setAdminVisible: true})
                                  } else if (e.key === '4') {
                                      let user = record
                                      this.setState({user: user, setUserVisible: true})
                                  }
                              }}>
                                  <Menu.Item key="1"><Icon type="undo"/>重置密码</Menu.Item>
                                  <Menu.Item key="2"><Icon type="key"/>设置密码</Menu.Item>
                                  {record.level === 0 ? <Menu.Item key="3"><Icon type="user"/>设为管理员</Menu.Item> :
                                      <Menu.Item disabled={record.username === isAuthenticated()} key="4"><Icon
                                          type="user"/>设为普通用户</Menu.Item>}
                              </Menu>
                          }>

                          <Button size='small' style={{margin: 2}}>
                             …
                          </Button>


                </Dropdown>
                </span>
            )
        }
    ];

    // 获取用户列表
    getData() {
        this.setState({loading: true})
        // 调用后台API获取列表数据，并将返回的数据设置到state中
        HttpUtil.get(ApiUtil.API_USER_LIST)
            .then( // 等待两次请求依次完成了才刷新界面
                recordList => {
                    this.setState({
                        data: recordList,
                        loading: false,
                    });
                }
            ).catch(error => {
            message.error(error.message);
            this.setState({loading: false})
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowWidth);
    }

    componentWillMount() {
        this.getData();
    }

    handleEditUserSubmit = e => {
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
                        this.setState({editUserVisible: false})
                        this.getData()
                    }
                ).catch((res) => {
                    message.error({content: res.data.msg, key, duration: 2});
                })
            }
        });
    };


    createUser() {
        this.setState({
            visible: true,
        });
    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    deleteUser() {
        message.loading({content: '正在删除用户...', key});
        let username = this.state.user.username
        axios({
            url: ApiUtil.URL_IP + '/api/deleteUser/' + username,
            method: 'get'
        }).then(
            (res) => {
                message.success({content: res.data.msg, key, duration: 2});
                this.setState({deleteVisible: false})
                this.getData()
            }
        )

    }

    restPassword() {
        message.loading({content: '正在重置密码...', key});
        axios({
            url: ApiUtil.URL_IP + '/api/resetPassword/' + this.state.user.username,
            method: 'get'
        }).then(
            (res) => {

                message.success({content: res.data.msg, key, duration: 2});
                this.setState({resetPasswordVisible: false})
            }
        )
    }

    setPassword() {
        message.loading({content: '正在设置新密码...', key});
        let data = {
            username: this.state.user.username,
            password: md5(this.state.newPassword)
        }
        axios({
            url: ApiUtil.URL_IP + '/api/changePassword',
            method: 'post',
            data: data
        }).then(
            (res) => {
                message.success({content: res.data.msg, key, duration: 2});
                this.setState({setPasswordVisible: false, newPassword: ''})
            }
        )
    }

    setAdmin() {
        message.loading({content: '正在更改权限中...', key});
        let data = {
            username: this.state.user.username,
            authPassword: this.state.authPassword,
            auth: 1
        }
        axios({
            url: ApiUtil.URL_IP + '/api/setAuth',
            method: 'post',
            data: data
        }).then(
            (res) => {
                if (res.data.code === 1)
                    message.error({content: res.data.msg, key, duration: 2});
                else
                    message.success({content: res.data.msg, key, duration: 2});
                this.setState({setAdminVisible: false, authPassword: ''})
                this.getData()
            }
        )
    }

    setUser() {
        message.loading({content: '正在更改权限中...', key});
        let data = {
            username: this.state.user.username,
            authPassword: this.state.authPassword,
            auth: 0
        }
        axios({
            url: ApiUtil.URL_IP + '/api/setAuth',
            method: 'post',
            data: data
        }).then(
            (res) => {
                if (res.data.code === 1)
                    message.error({content: res.data.msg, key, duration: 2});
                else
                    message.success({content: res.data.msg, key, duration: 2});
                this.setState({setUserVisible: false, authPassword: ''})
                this.getData()
            }
        )
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <CustomBreadcrumb arr={['数据管理', '用户管理']}/>
                <Card style={{marginTop: 10}}>
                    <Button type="primary" icon='plus' onClick={this.createUser.bind(this)}
                            style={{}}>创建用户</Button>
                    <Button type="primary" icon='reload'
                            style={{marginLeft: 10}} onClick={() => {
                        this.getData()
                    }}>刷新</Button>
                    <Spin spinning={this.state.loading} size="large" delay={500}>
                        <Table dataSource={this.state.data} columns={this.columns} bordered
                               style={{marginTop: 20}}/>
                    </Spin>
                </Card>
                <Drawer
                    title="新建用户"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{paddingBottom: 80}}

                > <RegisterForm/>
                </Drawer>
                <Modal
                    title="编辑用户"
                    footer={null}
                    visible={this.state.editUserVisible}
                    onCancel={() => {
                        this.setState({editUserVisible: false})
                    }}
                >
                    <Form {...formItemLayout} onSubmit={this.handleEditUserSubmit}>
                        <Form.Item label={<span>用户名&nbsp;
                            <Tooltip title="您不可以更改您的用户名">
                                <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>}>
                            {getFieldDecorator('username', {
                                // initialValue: this.state.user.nickname,
                                rules: [{
                                    required: true,
                                    message: '请输入您的用户名！',
                                    whitespace: true
                                }],
                            })(<Input disabled/>)}


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
                            <Button style={{marginRight: 30}} onClick={() => {
                                this.setState({editUserVisible: false})
                            }}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit">
                                保存
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="删除用户"
                    visible={this.state.deleteVisible}
                    onCancel={() => {
                        this.setState({deleteVisible: false})
                    }}
                    footer={[
                        <Button key="back" onClick={() => {
                            this.setState({deleteVisible: false})
                        }}>
                            取消
                        </Button>,
                        <Button key="submit" type="danger" onClick={
                            () => {
                                this.deleteUser()
                            }
                        }>
                            确认
                        </Button>,
                    ]}
                >
                    您确定要删除 {this.state.user.username} ({this.state.user.nickname}) 吗？
                </Modal>
                <Modal
                    title="重置密码"
                    visible={this.state.resetPasswordVisible}
                    footer={[
                        <Button key="back" onClick={() => {
                            this.setState({resetPasswordVisible: false})
                        }}>
                            取消
                        </Button>,
                        <Button key="submit" type="danger" onClick={
                            () => {
                                this.restPassword()
                            }
                        }>
                            确认
                        </Button>,
                    ]}
                    onCancel={() => {
                        this.setState({resetPasswordVisible: false})
                    }}
                >
                    <p>您确定要重置 {this.state.user.username} ({this.state.user.nickname}) 的密码吗？</p>
                    <p>新的密码将为：videodetect</p>
                </Modal>
                <Modal
                    title="设置密码"
                    visible={this.state.setPasswordVisible}
                    footer={[
                        <Button key="back" onClick={() => {
                            this.setState({setPasswordVisible: false})
                        }}>
                            取消
                        </Button>,
                        <Button key="submit" type="danger" onClick={
                            () => {
                                this.setPassword()
                            }
                        }>
                            确认
                        </Button>,
                    ]}

                    onCancel={() => {
                        this.setState({setPasswordVisible: false})
                    }}
                >
                    <div><span>新的密码：</span> <Input.Password autoComplete='new-password' value={this.state.newPassword}
                                                            onChange={(e) => {
                                                                this.setState({newPassword: e.target.value})
                                                            }}>
                    </Input.Password>
                    </div>
                </Modal>
                <Modal
                    title="设为管理员"
                    visible={this.state.setAdminVisible}
                    footer={[
                        <Button key="back" onClick={() => {
                            this.setState({setAdminVisible: false})
                        }}>
                            取消
                        </Button>,
                        <Button key="submit" type="danger" onClick={
                            () => {
                                this.setAdmin()
                            }
                        }>
                            确认
                        </Button>,
                    ]}

                    onCancel={() => {
                        this.setState({setAdminVisible: false})
                    }}
                >
                    <p>您将要把 {this.state.user.username} ({this.state.user.nickname}) 设置为管理员？</p>
                    <div><span>请您输入授权码以确认：</span> <Input.Password autoComplete='new-password'
                                                                  value={this.state.authPassword}
                                                                  onChange={(e) => {
                                                                      this.setState({authPassword: e.target.value})
                                                                  }}>
                    </Input.Password>
                    </div>
                </Modal>
                <Modal
                    title="设为普通用户"
                    visible={this.state.setUserVisible}
                    footer={[
                        <Button key="back" onClick={() => {
                            this.setState({setUserVisible: false})
                        }}>
                            取消
                        </Button>,
                        <Button key="submit" type="danger" onClick={
                            () => {
                                this.setUser()
                            }
                        }>
                            确认
                        </Button>,
                    ]}

                    onCancel={() => {
                        this.setState({setUserVisible: false})
                    }}
                >
                    <p>您将要把 {this.state.user.username} ({this.state.user.nickname}) 设置为普通用户吗？</p>
                    <div><span>请您输入授权码以确认：</span> <Input.Password autoComplete='new-password'
                                                                  value={this.state.authPassword}
                                                                  onChange={(e) => {
                                                                      this.setState({authPassword: e.target.value})
                                                                  }}>
                    </Input.Password>
                    </div>
                </Modal>
                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}

export default UserManageDemo