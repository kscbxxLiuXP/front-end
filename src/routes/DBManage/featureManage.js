import React from "react";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import {
    BackTop,
    Button,
    Card,
    Col,
    Drawer,
    Form,
    Icon,
    Input,
    message,
    Row,
    Select,
    Spin,
    Table,
    DatePicker, Typography, Tooltip, Modal, Divider,
} from "antd";
import HttpUtil from "../../utils/HttpUtil";
import ApiUtil from "../../utils/ApiUtil";
import Highlighter from "react-highlight-words";
import moment from "moment";
import {Link} from "react-router-dom";
import ReactJson from "react-json-view";
import axios from "axios";

const {Option} = Select;
const {Paragraph, Text} = Typography;

const {RangePicker} = DatePicker;
const key = 'updatable';

class FeatureManageDemo extends React.Component {

    getFeatureFilter = () => ({
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
                            searchFeatureID: selectedKeys[0],
                        });
                    }}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => {
                        confirm();
                        this.setState({
                            searchFeatureID: selectedKeys[0],
                        });
                    }}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    搜索
                </Button>
                <Button onClick={() => {
                    clearFilters(), this.setState({searchFeatureID: ''});
                }} size="small" style={{width: 90}}>
                    重置
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record['featureid']
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
                highlightStyle={{backgroundColor: ' #ffc069', padding: 0}}
                searchWords={[this.state.searchFeatureID]}
                autoEscape
                textToHighlight={text.toString()}
            />

    });
    getDateFilter = () => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>

                <RangePicker
                    ranges={{
                        '今天': [moment(), moment()],
                        '本月': [moment().startOf('month'), moment().endOf('month')],
                    }}
                    ref={node => {
                        this.searchRange = node;
                    }}
                    value={selectedKeys[0]}

                    style={{marginBottom: -10, display: 'block'}}
                    onChange={(values) => {
                        setSelectedKeys(values ? [values] : [])
                        this.setState({
                            searchSTime: values[0],
                            searchETime: values[1]
                        })
                    }}
                    format={'YYYY-MM-DD'}
                />
                <br/>
                <Button
                    type="primary"
                    onClick={() => {
                        confirm();
                    }}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    搜索
                </Button>
                <Button onClick={() => {
                    clearFilters(), this.setState({
                        searchSTime: null,
                        searchETime: null
                    });
                }} size="small" style={{width: 90}}>
                    重置
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="filter" theme='filled' style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            moment(record.featuretime) >= value[0] && moment(record.featuretime) <= value[1],


    });
    columns = [
        {
            title: '预览',
            dataIndex: 'icon',
            key: 'icon',
            render: src => <img src={src} alt="" width="100px"/>,
            width: 120
        },
        {
            title: '特征ID',
            dataIndex: 'featureid',
            key: 'featureid',
            width: 170,
            ...this.getFeatureFilter(),
        }, {
            title: '创建时间',
            dataIndex: 'featuretime',
            key: 'featuretime',
            ...this.getDateFilter(),
            sorter: (a, b) => moment(a.featuretime) - moment(b.featuretime),
            width: 200,
        }, {
            title: '特征参数',
            dataIndex: 'featurearg',
            key: 'featurearg',
            ellipsis: true
        }, {
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button type='primary' shape='round' size='small' icon="eye" onClick={() => {
                        this.setState({featureVisible: true, arg: record.featurearg})
                    }}/>
                      <Divider type='vertical'/>
                      <Tooltip title={'删除'}>
                    <Button shape='round' size='small' type='danger' onClick={() => {
                    this.setState({deleteVisible:true,featureid:record.featureid})

                    }} icon={'delete'}/>
                      </Tooltip>
                </span>
            ),
            width: 150
        }
    ];

    state = {
        loading: true,
        data: [],
        // selectedRowKeys: [], // Check here to configure the default column
        visible: false,
        searchFeatureID: '',
        searchSTime: null,
        searchETime: null,
        featureVisible: false,
        deleteVisible:false,
        arg: '',
        authPassword:'',
        featureid:0,
    }

    // 获取用户列表
    getData() {
        this.setState({loading: true})
        // 调用后台API获取列表数据，并将返回的数据设置到state中
        HttpUtil.get(ApiUtil.API_FEATURE_LIST)
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

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    };

    handleTextChange() {

    }

    handleFilterChange() {

    }

    createFeature() {
        this.setState({
            visible: true,
        });
    }

    onClose = () => {
        this.setState({
            visible: false,
            authPassword:''
        });
    };
    deleteFeature() {
        message.loading({content: '正在删除特征中...', key});
        let data = {
            authPassword: this.state.authPassword,
            id:this.state.featureid
        }
        axios({
            url: ApiUtil.URL_IP + '/api/deleteFeature',
            method: 'post',
            data: data
        }).then(
            (res) => {
                if (res.data.code === 1)
                    message.error({content: res.data.msg, key, duration: 2});
                else
                    message.success({content: res.data.msg, key, duration: 2});
                this.setState({deleteVisible: false, authPassword: ''})
                this.getData()
            }
        )
    }


    render() {
        const {loading, selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const a = {
            '1': 111,
            'aaa': 232
        }
        // const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <CustomBreadcrumb arr={['数据管理', '特征库管理']}/>

                <Card style={{marginTop: 10}}>
                    <Button type="primary" icon='plus' onClick={this.createFeature.bind(this)}
                            style={{}}>创建特征</Button>
                    <Button type="primary" icon='reload'
                            style={{marginLeft: 10}} onClick={() => {
                        this.getData()
                        message.info('已刷新')
                    }}>刷新</Button>
                    <Spin spinning={this.state.loading} size="large" delay={500}>
                        <Table dataSource={this.state.data} columns={this.columns}
                               style={{marginTop: 20}}/>
                    </Spin>
                </Card>
                <Drawer
                    title="创建特征"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{paddingBottom: 80}}

                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col>
                                <Form.Item
                                    name="featureID"
                                    label="特征ID"
                                    rules={[{required: true, message: '请输入特征ID'}]}
                                >
                                    <Input placeholder="请输入特征ID"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col>
                                <Form.Item
                                    name="dateTime"
                                    label="创建时间"
                                    rules={[{required: true, message: '请选择创建时间'}]}
                                >
                                    <DatePicker showTime
                                                style={{width: '100%'}}
                                                getPopupContainer={trigger => trigger.parentNode}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="arg"
                                    label="特征参数"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请键入特征参数',
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={4} placeholder="请输入特征参数"/>
                                    <Text type='danger'>*该参数影响到视频检索，请谨慎填写！</Text>
                                </Form.Item>

                            </Col>
                        </Row>
                    </Form>
                    <div><span>请您输入授权码以确认：</span> <Input.Password autoComplete='new-password'
                                                                  value={this.state.authPassword}
                                                                  onChange={(e) => {
                                                                      this.setState({authPassword: e.target.value})
                                                                  }}>
                    </Input.Password>
                    </div>
                    <div
                        style={{
                            textAlign: 'right',
                            marginTop:20
                        }}
                    >
                        <Button onClick={this.onClose} style={{marginRight: 8}}>
                            取消
                        </Button>
                        <Button onClick={this.onClose} type="primary">
                            提交
                        </Button>
                    </div>
                </Drawer>
                <Modal
                    title="查看特征"
                    visible={this.state.featureVisible}
                    footer={[
                        <Button key="submit" type="primary" onClick={
                            () => {
                                this.setState({featureVisible: false})
                            }
                        }>
                            确认
                        </Button>,
                    ]}
                    onCancel={() => {
                        this.setState({featureVisible: false})
                    }}
                >
                    <div style={{height: 600, width: '100%', overflowY: 'scroll'}}>
                        {this.state.arg}
                    </div>

                    {/*<ReactJson src= {a} />*/}
                    {/*<ReactJson src= {this.state.arg} />*/}

                </Modal>
                <Modal
                    title="删除特征"
                    visible={this.state.deleteVisible}
                    footer={[
                        <Button key="back" onClick={() => {
                            this.setState({deleteVisible: false})
                        }}>
                            取消
                        </Button>,
                        <Button key="submit" type="danger" onClick={
                            () => {
                                this.deleteFeature()
                            }
                        }>
                            确认
                        </Button>,
                    ]}
                    onCancel={() => {
                        this.setState({deleteVisible: false})
                    }}
                >
                    <p>您将要删除ID为 {this.state.featureid} 的特征</p>
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

const styles = {
    searchItem: {
        width: 150,
        marginTop: 4,
        marginRight: 10,
    },
    prefixIcon: {
        color: 'rgba(0,0,0,.25)',
    },
    divider: {
        marginTop: 4,
        marginBottom: 8,
    }

}
export default FeatureManageDemo