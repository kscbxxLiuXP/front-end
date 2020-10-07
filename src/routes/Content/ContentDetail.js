import React from 'react'
import {BackTop, Button, Card, Col, message, Progress, Result, Row, Skeleton, Typography} from 'antd'
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
        history:[],
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
            console.log(res.data.data)
            this.setState({
                video: res.data.data.video,
                copy: res.data.data.copyinfo,
                loading: false,
                history:res.data.data.history,
            })
        })
    }

    //页面渲染前先加载本页呈现的videoID
    componentWillMount() {
        this.getData()
    }


}

const titleStyle = {
    flex: 1,
    color: "#28314E",
    fontSize: 16,
    lineHeight: 2,
    marginVertical: 5,
}
const contentStyle = {
    flex: 1,
    color: "rgba(25,18,12,0.45)",
    fontSize: 14,
    lineHeight: 2,
    marginVertical: 5,
}
const videoTimeStyle = {
    flex: 1,
    color: "rgba(254,39,97,0.96)",
    fontSize: 14,
    lineHeight: 2,
    marginVertical: 5,
}
export default ContentDetail