import React from "react";
import {Player} from "video-react";
import ApiUtil from "../../utils/ApiUtil";
import { Col, Row, Typography} from "antd";

const {Text} = Typography

class VideoCompareCard extends React.Component {

    render() {
        return (
            <div >
                <Row gutter={20}>
                    <Col span={12}>
                        <Player
                            playsInline
                            src={ApiUtil.URL_IP + ApiUtil.API_FILE_GET + this.props.video.id}
                        />
                        <div>
                            <Text style={titleStyle}>上传视频重复时间段：</Text>
                            <br/>
                            <Text style={videoTimeStyle}
                            >&emsp;&emsp;开始时间：{this.props.copy.startTime}<br/>&emsp;&emsp;结束时间：{this.props.copy.endTime}</Text>
                            <br/>
                        </div>
                    </Col>

                    <Col span={12}>

                        <Player
                            playsInline
                            src={ApiUtil.URL_IP + ApiUtil.API_FILE_GET + this.props.copy.id}
                        />

                        <div>
                            <Text style={titleStyle}>库视频重复时间段：</Text>
                            <br/>
                            <Text style={videoTimeStyle}
                            >&emsp;&emsp;开始时间：{this.props.copy.cStartTime}<br/>&emsp;&emsp;结束时间：{this.props.copy.cEndTime}</Text>
                            <br/>
                        </div>

                    </Col>
                </Row>



            </div>
        )
    }
}

const titleStyle = {
    flex: 1,
    color: "#28314E",
    fontSize: 16,
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
export default VideoCompareCard