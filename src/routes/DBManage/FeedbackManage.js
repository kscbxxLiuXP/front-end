import React from "react";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import MyCard from "../../components/MyCard/MyCard";
import {Button, Modal, Spin, Table, Tag, Descriptions, Badge, Input, message} from "antd";
import axios from 'axios'
import ApiUtil from "../../utils/ApiUtil";
import {isAuthenticated} from "../../utils/Session";


class FeedbackManage extends React.Component {
    state = {
        data: [],
        loading: false,
        visible: false,
        feedback: {},
        reply: ''
    }

    getData() {
        this.setState({loading:true})
        axios({
            url: ApiUtil.URL_IP + '/api/feedbackList',
            method: 'get'
        }).then(res => {
            this.setState({
                data: res.data.data,
                loading: false
            })
        })
    }

    componentDidMount() {
        this.getData()
    }

    columns = [
        {
            title: '简要概述',
            dataIndex: 'title',
            key: "title",
        },
        {
            title: '内容',
            dataIndex: 'content',
            key: "content",
            ellipse: true
        },
        {
            title: '反馈人',
            dataIndex: 'smtPerson',
            key: "smtPerson",
        },
        {
            title: '反馈时间',
            dataIndex: 'smtTime',
            key: "smtTime",
        },
        {
            title: '状态',
            dataIndex: 'readed',
            key: "readed",
            render: readed => <span>{
                readed === '0' ? <Tag color='#f50'>未读</Tag> : <Tag color='#87d068'>已读</Tag>
            }</span>
        },
        {
            title: '状态',
            dataIndex: 'applied',
            key: "applied",
            render: applied => <span>{
                applied === 0 ? <Tag color='#9E9295'>未回复</Tag> : <Tag color='#87d068'>已回复</Tag>
            }</span>
        },
        {
            title: '操作',
            dataIndex: 'operator',
            key: 'operator',
            width: 300,
            render: (text, record) => (
                <span>
                    <Button disabled={record.readed === '1'} type='primary' onClick={() => {
                        this.setReaded(record.id)
                    }}>
                        已读
                    </Button>
                    <Button type='primary' style={{marginLeft: 10}} onClick={() => {
                        this.setState({visible: true, feedback: record})
                        this.setReaded(record.id)
                    }}>
                        查看&回复
                    </Button>
                </span>
            )
        }

    ]
    setReaded = (id) => {
        axios({
            url: ApiUtil.URL_IP + '/api/feedbackSetReaded/' + id,
            method: 'get'
        }).then(
            () => {
                this.getData()
            }
        )
    }
    handleReplyChange = e => {
        this.setState({
            reply: e.target.value
        })
    }

    render() {
        const {feedback} = this.state
        return (
            <div>
                <CustomBreadcrumb arr={['管理', '反馈处理']}/>
                <MyCard title={'反馈'}>
                    <Button icon='reload' onClick={() => this.getData()}>刷新</Button>
                    <Spin spinning={this.state.loading} size="large" delay={500}>
                        <Table dataSource={this.state.data} columns={this.columns}
                               style={{marginTop: 20}}/>
                    </Spin>
                </MyCard>
                <Modal
                    title='反馈'
                    onCancel={() => this.setState({visible: false})}
                    width={800}
                    footer={<Button onClick={() => {
                        this.setState({visible: false, reply: ''})
                    }}>确认</Button>}
                    visible={this.state.visible}
                >
                    <Descriptions title="反馈" bordered>
                        <Descriptions.Item label="反馈人">{feedback.smtPerson}</Descriptions.Item>
                        <Descriptions.Item label="反馈时间" span={2}>{feedback.smtTime}</Descriptions.Item>
                        <Descriptions.Item label="已读状态"><Badge
                            status={feedback.readed === 0 ? "default" : "success"}/>{feedback.readed === 0 ? '未读' : '已读'}
                        </Descriptions.Item>
                        <Descriptions.Item label="回复状态" span={2}><Badge
                            status={feedback.applied === 0 ? "default" : "success"}/>{feedback.applied === 0 ? '未回复' : '已回复'}
                        </Descriptions.Item>
                        <Descriptions.Item label="简要描述" span={3}>{feedback.title}</Descriptions.Item>
                        <Descriptions.Item label="主要内容" span={3}>
                            {feedback.content}
                        </Descriptions.Item>
                    </Descriptions>
                    {
                        feedback.applied === 0 ?
                            <div style={{marginTop: 20}}>
                                <span style={{fontSize: 16, marginBottom: 20}}>回复：</span>
                                <Input.TextArea value={this.state.reply} rows={4} onChange={this.handleReplyChange}
                                                placeholder={'请输入回复内容'}/>

                                <Button type='primary' style={{marginTop: 20}} onClick={() => {
                                    let data = {
                                        id: feedback.id,
                                        applier: isAuthenticated(),
                                        applyContent: this.state.reply
                                    }
                                    axios({
                                        url: ApiUtil.URL_IP + '/api/replyFeedback',
                                        method: 'post',
                                        data: data
                                    }).then(res => {
                                        this.getData()
                                        if (res.data.code === 0) {
                                            message.success('回复成功！')
                                            this.setState({visible: false, reply: ''})
                                        } else {
                                            message.error('回复失败')
                                        }
                                    })
                                }}>
                                    回复
                                </Button>
                            </div>
                            :
                            <Descriptions title="回复" bordered style={{marginTop: 20}}>
                                <Descriptions.Item label="回复人">{feedback.applier}</Descriptions.Item>
                                <Descriptions.Item label="回复时间" span={2}>{feedback.applyTime}</Descriptions.Item>
                                <Descriptions.Item label="回复内容">{feedback.applyContent}</Descriptions.Item>
                            </Descriptions>

                    }

                </Modal>
            </div>
        );
    }
}

export default FeedbackManage