import React from "react";
import ApiUtil from "../../utils/ApiUtil";
import axios from "axios";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import {BackTop, Row, Anchor, Input, Typography, Button, Icon, Tag, Result} from "antd";
import MyCard from "../../components/MyCard/MyCard";
import AppealStep from "./AppealStep";
import VideoCompareCard from "../../components/VideoContentDetail/VideoCompareCard";
import AppealResult from "./AppealResult";

let id

class AppealDetail extends React.Component {
    state = {
        id: 0,
        video: {},
        copy: {},
        appeal: {},
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
                loading: false,
            })
        })
    }

    componentWillMount() {
        id = this.props.match.params.id
        this.setState({id: id})
        this.getData()
    }

    render() {
        return (
            <div>
                <CustomBreadcrumb arr={['申诉中心', this.state.id]}/>

                <div style={{
                    alignContent: 'center',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    justifyContent: 'center',
                }}
                     className='container-wrapper'>
                    <div style={{width: 1200}} id='con'>
                        <MyCard id={'1'}>
                            <div style={{width: '100%', textAlign: "center", fontSize: 20, marginBottom: 3}}>
                                {`申诉- ${this.state.video.videoname}`}
                            </div>
                            <div style={{float: "right", whiteSpace: "pre"}}>
                                {`申诉人：${this.state.appeal.appealerName}\t申诉时间：${this.state.appeal.appealTime}`}
                            </div>
                        </MyCard>
                        <MyCard title={'进度'}>
                            <AppealStep appeal={this.state.appeal}/>
                        </MyCard>
                        <MyCard title={'结果'}>
                            <AppealResult appeal={this.state.appeal}/>
                        </MyCard>
                        {this.state.video.videoname !== undefined ?
                            <MyCard title={'视频比较'}> <VideoCompareCard id={'3'} video={this.state.video} copy={this.state.copy}/></MyCard>
                            :
                            <MyCard title={'视频比较'}>Loading...</MyCard>}
                        <MyCard title={'申诉内容'}>
                            <Input.TextArea value={this.state.appeal.appealContent}/>
                        </MyCard>

                    </div>
                </div>

                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        );
    }
}

export default AppealDetail