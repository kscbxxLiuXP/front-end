import React from "react";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import {Button, Empty,  Table, Tag, message, Tabs,  Tooltip, Badge} from 'antd';
import {Link, withRouter} from "react-router-dom";
import axios from 'axios'
import ApiUtil from "../../utils/ApiUtil";
import moment from "moment";

const {TabPane} = Tabs;

@withRouter
class AppealManage extends React.Component {
    state = {
        all: 0,
        process: 0,
        finish: 0,
        currentTab: '1',
        data: [],

    }

    tabChange(key) {
        this.getData(key)
        this.setState({
            currentTab: key
        })
    }

    renderAppealState(appeal) {
        if (appeal.state === 1) {
            return (
                <Badge color="#2db7f5" text="受理中"/>
            )
        } else if (appeal.state === 2) {
            return (

                <Tooltip title={() => {
                    return <div>
                        <div>
                            审核人:{appeal.resolver}
                        </div>
                        <div>
                            审核时间:{appeal.resolveTime}
                        </div>

                    </div>
                }}>
                    <Badge color="#87d068" text="已完成"/>
                </Tooltip>

            )
        }
    }

    getTagColor(state) {
        if (state === '审核中')
            return 'blue'
        else if (state === '审核通过')
            return 'green'
        else
            return 'red'
    }

    column1 = [
        {
            title: '预览',
            dataIndex: 'icon',
            key: 'icon',
            render: (src, record) => <img src={record.video.icon} alt="" width="130px"/>,
            width: 150,
        },
        {
            title: '视频名称',
            dataIndex: 'name',
            key: 'name',
            render: (name, record) => record.video.videoname,

            ellipsis: true,
        },
        {
            title: '上传日期',
            dataIndex: 'uploadTime',
            key: 'uploadTime',
            render: (src, record) => record.video.uploadtime,
            sorter: (a, b) => moment(a.video.uploadtime) - moment(b.video.uploadtime),

        },
        {
            title: '审核状态',
            dataIndex: 'state',
            key: 'state',
            filters: [{
                text: '审核中',
                value: '审核中',
            }, {
                text: '审核通过',
                value: '审核通过',
            }, {
                text: '不通过',
                value: '不通过',
            }],
            onFilter: (value, record) => record.state === value,
            render: (state, r) => (
                <Tag color={this.getTagColor(r.video.status)} key={r.video.status}>{r.video.status}</Tag>)
        },
        {
            title: "申诉人",
            dataIndex: 'appealerName',
            key: 'appealerName',
            render: (a, r) => r.appeal.appealerName,
        },
        {
            title: "申诉时间",
            dataIndex: 'appealerTime',
            key: 'appealerTime',
            render: (a, r) => r.appeal.appealTime,
        },
        {
            title: "申诉状态",
            dataIndex: 'appealerState',
            key: 'appealerState',
            render: (a, r) => this.renderAppealState(r.appeal),
        },
        {
            title: '操作',
            key: 'action',
            width: 100,
            render: (text, record) => (
                <span>
                     <Link to={`/home/dbmanage/appeal/${record.video.id}`}>
                            <Tooltip title={'处理该审核'}>
                                <Button size='small'>
                                    处理
                                </Button>
                            </Tooltip>
                        </Link>
                </span>
            ),
        }];
    column2 = [
        {
            title: '预览',
            dataIndex: 'icon',
            key: 'icon',
            render: (src, record) => <img src={record.video.icon} alt="" width="130px"/>,
            width: 150,
        },
        {
            title: '视频名称',
            dataIndex: 'name',
            key: 'name',
            render: (name, record) => record.video.videoname,
            width: 250,
            ellipsis: true,
        },
        {
            title: '上传日期',
            dataIndex: 'uploadTime',
            key: 'uploadTime',
            render: (src, record) => record.video.uploadtime,
            sorter: (a, b) => moment(a.video.uploadtime) - moment(b.video.uploadtime),
            width: 120,
        },
        {
            title: '审核状态',
            dataIndex: 'state',
            key: 'state',
            filters: [{
                text: '审核中',
                value: '审核中',
            }, {
                text: '审核通过',
                value: '审核通过',
            }, {
                text: '不通过',
                value: '不通过',
            }],
            onFilter: (value, record) => record.state === value,
            render: (state, r) => (
                <Tag color={this.getTagColor(r.video.status)} key={r.video.status}>{r.video.status}</Tag>)
        },
        {
            title: "申诉人",
            dataIndex: 'appealerName',
            key: 'appealerName',
            render: (a, r) => r.appeal.appealerName,
        },
        {
            title: "申诉时间",
            dataIndex: 'appealerTime',
            key: 'appealerTime',
            render: (a, r) => r.appeal.appealTime,
        },
        {
            title: "处理人",
            dataIndex: 'resolver',
            key: 'resolver',
            render: (a, r) => r.appeal.resolver,
        },
        {
            title: "处理时间",
            dataIndex: 'resolveTime',
            key: 'resolveTime',
            render: (a, r) => r.appeal.resolveTime,
        },
        {
            title: "申诉状态",
            dataIndex: 'appealerState',
            key: 'appealerState',
            render: (a, r) => this.renderAppealState(r.appeal),
        },
        {
            title: '操作',
            key: 'action',
            width: 100,
            render: (text, record) => (
                <span>
                     <Link to={`/home/dbmanage/appeal/${record.video.id}`}>
                            <Tooltip title={'查看或者处理该申诉'}>
                                <Button size='small'>
                                    查看
                                </Button>
                            </Tooltip>
                        </Link>
                </span>
            ),
        }];

    getData(key) {
        let type = ''
        switch (key) {
            case '1':
                type = 0;
                break;
            case '2':
                type = 1;
                break;
            case '3':
                type = 2
                break;
            default:
                type=0;
        }
        axios({
            url: ApiUtil.URL_IP + '/api/getAppealListAll/' + type,
            method: 'get'
        }).then(res => {
            this.setState({data: res.data.data})
        })
    }

    getCount() {
        axios({
            url: ApiUtil.URL_IP + '/api/getAllAppealCount',
            method: 'get'
        }).then(res => {
            this.setState({
                all: res.data.data.all,
                finish: res.data.data.finish,
                process: res.data.data.process
            })
        })
    }

    componentDidMount() {
        this.getCount()
        this.getData('2')
    }

    render() {

        return (<div>
            <CustomBreadcrumb arr={['数据管理', '申诉处理']}/>
            <div className="result-card" style={
                {
                    background: "white",
                    borderRadius: "15px",
                    boxShadow: "0px 0px 20px rgba(137,137,137, 0.1)",
                    marginBottom: "20px",
                    minHeight: 300,
                    padding: "20px"
                }}>
                <Tabs animated={false} defaultActiveKey="2" onChange={(activeKey) => this.tabChange(activeKey)}
                      tabBarExtraContent={
                          <span>
                              <Button icon='reload' onClick={() => {
                                  this.getData(this.state.currentTab)
                                  message.info('已刷新')
                              }} style={{marginRight: 20}}>刷新</Button>
                          </span>
                      }>
                    {/*<TabPane tab={`全部(${this.state.all})`} key="1">*/}
                    {/*    {this.state.all === 0 ? <Empty description='暂时没有申诉'/> :*/}
                    {/*        <Table dataSource={this.state.data} columns={this.columns}/>}*/}
                    {/*</TabPane>*/}
                    <TabPane tab={`待处理(${this.state.process})`} key="2">
                        {this.state.process === 0 ? <Empty description='暂时没有申诉'/> :
                            <Table dataSource={this.state.data} columns={this.column1}/>}
                    </TabPane>
                    <TabPane tab={`已处理(${this.state.finish})`} key="3">
                        {this.state.finish === 0 ? <Empty description='暂时没有申诉'/> :
                            <Table dataSource={this.state.data} columns={this.column2}/>}
                    </TabPane>
                </Tabs>
            </div>

        </div>)
    }
}

export default AppealManage