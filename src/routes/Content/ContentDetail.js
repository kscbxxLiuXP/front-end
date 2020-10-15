import React from 'react'
import {BackTop, Button, Col, message, Modal, Row, } from 'antd'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'

import ApiUtil from "../../utils/ApiUtil";
import axios from 'axios'
import VideoInfoCard from "../../components/VideoContentDetail/VideoInfoCard";
import DetectResultCard from "../../components/VideoContentDetail/DetectResultCard";
import DetectStep from "../../components/VideoContentDetail/DetectStep";
import VideoPreview from "../../components/VideoContentDetail/VideoPreview";
import VideoCompareCard from "../../components/VideoContentDetail/VideoCompareCard";
import MyCard from "../../components/MyCard/MyCard";

let id


class ContentDetail extends React.Component {
    state = {
        video: [],
        success: '',
        loading: true,
        copyid: '',
        copyurl: '',
        copyinfo: [],
        history: [],
    }

    videoPreview(state) {
        if (state === '审核通过') {
            return (<VideoPreview id={this.state.video.id}/>)
        } else if (state === '不通过') {
            return (
                <MyCard title={'视频比较'}><VideoCompareCard video={this.state.video} copy={this.state.copy}/></MyCard>)
        }
    }

    render() {
        return (
            <div>
                <CustomBreadcrumb arr={['我的创作', id]}/>
                <Row gutter={20}>
                    <Col span={7}>
                        <MyCard style={{marginLeft: '20px'}} title={'操作'}>
                            <Button style={{width: '100%',height:'40px'}} type='danger' onClick={() => {
                                Modal.confirm({
                                    title: '您确定要删除这个视频吗？',
                                    content: '删除后将无法恢复',
                                    okText: '确定',
                                    okType: 'danger',
                                    cancelText: '取消',
                                    onOk() {
                                        axios({
                                            url: ApiUtil.URL_IP + '/api/deleteFile/' + id,
                                            method: 'get',
                                        }).then(res => {
                                            if (res.data.code === 0) {
                                                message.success('删除成功！')
                                                window.history.back()
                                            } else {
                                                message.error('删除失败，请稍后再试！')
                                            }
                                        })
                                    },
                                });
                            }}>删除该视频</Button>
                        </MyCard>
                        <VideoInfoCard title='信息' loading={this.state.loading} video={this.state.video}/>

                    </Col>
                    <Col span={17}>
                        <DetectStep video={this.state.video} his={this.state.history} loading={this.state.loading}/>
                        <DetectResultCard loading={this.state.loading} copy={this.state.copy}
                                          state={this.state.video.status}/>
                        {this.videoPreview(this.state.video.status)}
                    </Col>
                </Row>

                <BackTop visibilityHeight={200} style={{right: 50}}/>

            </div>
        )
    }

    getData() {
        this.setState({loading: true})
        id = this.props.match.params.id
        axios({
                url: ApiUtil.URL_IP + '/api/getVideoContent/' + id,
                method: 'get'
            }
        ).then(res => {
            this.setState({
                video: res.data.data.video,
                copy: res.data.data.copyinfo,
                loading: false,
                history: res.data.data.history,
            })
        })
    }

    //页面渲染前先加载本页呈现的videoID
    componentWillMount() {
        this.getData()
    }


}
export default ContentDetail