import React from "react";
import {
    PageHeader,
    Button,
    Descriptions,
    Switch,
    Icon,
    Col,
    Card,
    Row,
    Divider,
    Input,
    Affix,
    Badge,
     Modal, message
} from 'antd';
import axios from "axios";
import ApiUtil from "../../utils/ApiUtil";
import {isAuthenticated} from "../../utils/Session";
import VideoCompareCard from "../../components/VideoContentDetail/VideoCompareCard";
import moment from 'moment';

let id

class AppealManageDetail extends React.Component {
    state = {
        id: 0,
        video: {},
        copy: {},
        appeal: {},
        pass: false,
        feedback: '申诉完成，申诉成功！',
        visible: false,
        type: 0,
    }

    getData() {
        this.setState({loading: true})
        axios({
                url: ApiUtil.URL_IP + '/api/getAppealDetail/' + id,
                method: 'get'
            }
        ).then(res => {
            this.setState({
                video: res.data.data.video,
                copy: res.data.data.copyinfo,
                appeal: res.data.data.appeal,
                feedback: res.data.data.appeal.appealFeedback,
                pass: res.data.data.appeal.appealResult === 1,
                loading: false,
                type: res.data.data.appeal.appealResult ===null ? 0 : 1
            })
        })
    }

    componentWillMount() {
        id = this.props.match.params.id
        this.setState({id: id})
        this.getData()
    }

    renderResult(result) {
        if (result === null) {
            return '--'
        } else {
            if (result === 1) {
                return <span style={{color: '#5ba730'}}>通过</span>
            } else if (result === 0) {
                return <span style={{color: '#d51468'}}>不通过</span>
            }
        }
    }

    handleSubmit() {
        let data = {
            id: this.state.appeal.videoID,
            appealResult: this.state.pass === true ? 1 : 0,
            appealFeedback: this.state.feedback,
            resolver: isAuthenticated(),
            resolveTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            type:this.state.type
        }
        axios({
            url: ApiUtil.URL_IP + '/api/resolveAppeal',
            method: 'post',
            data: data
        }).then(re => {
            this.setState({visible: false})
            if (re.data.code === 0) {
                message.success('申诉处理成功')
                this.getData()
            } else {
                message.error('申诉提交失败')
            }
        })

    }

    render() {
        return (
            <div>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="申诉处理"
                    subTitle={id}
                >
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="申请人">{this.state.appeal.appealerName}</Descriptions.Item>
                        <Descriptions.Item label="视频ID">  {this.state.appeal.videoID}</Descriptions.Item>
                        <Descriptions.Item label="申请 时间">{this.state.appeal.appealTime}</Descriptions.Item>
                        <Descriptions.Item label="申诉处理状态">{this.state.appeal.state === 1 ?
                            <Badge color="#2db7f5" text="受理中"/> :
                            <Badge color="#87d068" text="申诉已完成"/>}</Descriptions.Item>
                        <Descriptions.Item
                            label="申诉处理人"> {this.state.appeal.resolver === null ? '--' : this.state.appeal.resolver} </Descriptions.Item>
                        <Descriptions.Item
                            label="申诉处理时间">{this.state.appeal.resolveTime === 'None' ? '--' : this.state.appeal.resolveTime}</Descriptions.Item>
                        <Descriptions.Item
                            label="申诉结果">  {this.renderResult(this.state.appeal.appealResult)} </Descriptions.Item>

                    </Descriptions>
                </PageHeader>
                <div style={{marginTop: 10}}>
                    <Row gutter={5}>
                        <Col span={18}>
                            <Card title='申诉内容'>
                                {this.state.appeal.appealContent}
                            </Card>
                            <Card style={{marginTop: 10}} title='视频比较'>
                                {this.state.video.videoname !== undefined ?
                                    <VideoCompareCard id={'3'} video={this.state.video} copy={this.state.copy}/>
                                    :
                                    'Loading...'}
                            </Card>

                        </Col>
                        <Col span={6}>
                            <Affix>
                                <Card title={'处理面板'}>
                                    <div style={{padding: '10px ', marginTop: -20}}>
                                        结果预览：
                                        <div style={{padding: 20, marginTop: 10, background: "#f5f5f5"}}>
                                            <div>
                                                视频ID：{this.state.video.id}

                                            </div>
                                            <div style={{marginTop: 5}}>
                                                处理人：{isAuthenticated()}
                                            </div>
                                            <div style={{marginTop: 5}}>
                                                处理结果：{this.state.pass === false ?
                                                <span style={{color: '#d51468'}}>不通过</span> :
                                                <span style={{color: '#5ba730'}}>通过</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <Divider/>
                                    <div>
                                        申诉通过： <Switch
                                        checkedChildren={<Icon type="check"/>}
                                        unCheckedChildren={<Icon type="close"/>}
                                        onChange={checked => this.setState({pass: checked})}
                                        checked={this.state.pass}

                                    />
                                    </div>
                                    <div style={{marginTop: 5}}>
                                        申诉反馈：<Input.TextArea onChange={event => {
                                        this.setState({feedback: event.target.value})
                                    }} style={{marginTop: 5}} value={this.state.feedback}/>
                                    </div>
                                    <Button style={{marginTop: 10}} type='primary'
                                            onClick={() => this.setState({visible: true})}>提交</Button>

                                </Card>
                            </Affix>
                        </Col>
                    </Row>
                </div>
                <Modal
                    title='请确认'
                    cancelText={'取消'}
                    okText={'确认'}
                    onCancel={() => this.setState({visible: false})}
                    onOk={() => this.handleSubmit()}
                    visible={this.state.visible}
                >
                    <div style={{padding: 20, marginTop: 10, background: "#f5f5f5"}}>
                        <div>
                            视频ID：{this.state.video.id}

                        </div>
                        <div style={{marginTop: 5}}>
                            申请人：{this.state.appeal.appealerName}
                        </div>
                        <div style={{marginTop: 5}}>
                            处理人：{isAuthenticated()}
                        </div>
                        <div style={{marginTop: 5}}>
                            处理结果：{this.state.pass === false ?
                            <span style={{color: '#d51468'}}>不通过</span> :
                            <span style={{color: '#5ba730'}}>通过</span>}
                        </div>
                    </div>
                </Modal>
            </div>

        );
    }
}

export default AppealManageDetail