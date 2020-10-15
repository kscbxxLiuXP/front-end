import React from "react";
import {Result,Tag, Typography, Button, Skeleton, Icon} from "antd";
import {withRouter} from "react-router-dom";

const { Paragraph, Text } = Typography;
@withRouter
class DetectResultCard extends React.Component {

    getResult(state) {
        if (state === '审核通过') {
            return (<Result
                status="success"
                title="您上传的视频审核成功啦！"
                subTitle="Congratulations，the video you have upload has been verified successfully."
            />)
        } else if (state === '不通过') {
            return (<Result
                status="error"
                title="对不起，您上传的视频未通过审核"
                subTitle="Sorry，the video you have upload failed to pass the verification."
                extra={[
                    <Button style={{width:200}} onClick={()=>{this.props.history.push('/home/appeal')}} key="console">
                        去申诉
                    </Button>,
                ]}
            >
                <div className="desc">
                    <Paragraph>
                        <Text
                            strong
                            style={{
                                fontSize: 16,
                            }}
                        >
                            您上传的视频可能存在以下问题:
                        </Text>
                    </Paragraph>
                    <Paragraph>
                        <Icon style={{ color: 'red' }} type="close-circle" /> 您的视频与编号为 <Tag>{this.props.copy.id}</Tag>的视频相似度过高
                    </Paragraph>
                </div>
            </Result>)
        } else if (state === '审核中') {
            return (<Result
                icon={<Icon type="smile" theme="twoTone" />}
                title="请稍等，您的视频正在审核中!"
                subTitle="Please wait!Your video is under video detection."
            />)
        }
    }

    render() {
        return (
            <div className="result-card" style={
                {
                    background: "white",
                    borderRadius: "15px",
                    boxShadow: "0px 0px 20px rgba(137,137,137, 0.1)",
                    marginBottom: "20px",
                    padding: "20px"
                }}>
                <div style={{fontWeight: "bold", marginBottom: "20px", fontSize: "18px"}}>审核结果</div>
                <Skeleton loading={this.props.loading} active>
                    {this.getResult(this.props.state)}
                </Skeleton>
            </div>
        )
    }
}

export default DetectResultCard