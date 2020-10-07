import React from "react";
import {Skeleton, Typography} from "antd";
import {formatFileSize} from "../../utils/utils";


const {Text} = Typography;

class VideoInfoCard extends React.Component {
    render() {
        return (
            <div className='video-info-card' style={
                {
                    background: "white",
                    borderRadius: "15px",
                    boxShadow: "0px 0px 20px rgba(137, 137, 137, 0.1)",
                    marginBottom: "50px",
                    marginLeft: "20px",
                    paddingBottom:20,
                }}>
                <div style={{marginLeft: 30,paddingTop:20}}>
                    <div style={{fontWeight: "bold", marginBottom: "15px", fontSize: "18px"}}>视频信息</div>
                    <Skeleton loading={this.props.loading} active>
                        <img src={this.props.video.icon} style={{marginBottom:30}} alt="" width="200px"/>

                        <ul className='Video-info'>
                            <li className="list-group-item">
                                <div>
                                    <Text style={titleStyle}>视频ID：</Text>
                                    <br/>
                                    <Text type="secondary" style={contentStyle}
                                          copyable={{text: `${this.props.video.id}`}}>{this.props.video.id}</Text>
                                    <br/>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <Text style={titleStyle}>视频名称：</Text>
                                <br/>
                                <Text type="secondary" style={contentStyle}
                                      copyable={{text: `${this.props.video.videoname}`}}> {this.props.video.videoname}</Text>
                            </li>
                            <li className="list-group-item">
                                <Text style={titleStyle}>视频类型：</Text>
                                <br/>
                                <Text type="secondary"
                                      style={contentStyle}>{this.props.video.type}</Text>
                            </li>
                            <li className="list-group-item">
                                <Text style={titleStyle}>视频大小：</Text>
                                <br/>
                                <Text type="secondary"
                                      style={contentStyle}>{formatFileSize(this.props.video.size)}</Text>
                            </li>
                            <li className="list-group-item">
                                <Text style={titleStyle}>FPS：</Text>
                                <br/>
                                <Text type="secondary"
                                      style={contentStyle}>{this.props.video.fps}</Text>
                            </li>
                            <li className="list-group-item">
                                <Text style={titleStyle}>视频时长：</Text>
                                <br/>
                                <Text type="secondary"
                                      style={contentStyle}>{this.props.video.timeLength}</Text>
                            </li>
                            <li className="list-group-item">
                                <Text style={titleStyle}>视频Md5值：</Text>
                                <br/>
                                <Text type="secondary" copyable={{text: `${this.props.video.md5}`}}
                                      style={contentStyle}>{this.props.video.md5}</Text>
                            </li>
                            <li className="list-group-item">
                                <Text style={titleStyle}>上传者：</Text>
                                <br/>
                                <Text type="secondary" copyable={{text: `${this.props.video.authName}`}}
                                      style={contentStyle}>{this.props.video.authName}</Text>
                            </li>
                            <li className="list-group-item">
                                <Text style={titleStyle}>上传日期：</Text>
                                <br/>
                                <Text type="secondary"
                                      style={contentStyle}>{this.props.video.uploadtime}</Text>
                            </li>

                        </ul>
                    </Skeleton>
                </div>

            </div>)
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
export default VideoInfoCard