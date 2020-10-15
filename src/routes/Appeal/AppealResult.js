import React from "react";
import {Result, Typography, Skeleton, Icon} from "antd";

const {Paragraph, Text} = Typography;

class AppealResult extends React.Component {
    getResult(appeal) {
        if (appeal.state === 2) {
            return (<Result
                status={appeal.appealResult === 1 ? 'success' : "error"}
                title={appeal.appealResult === 1 ? '申诉成功' : "对不起，您的本次申诉没有通过"}
                subTitle={appeal.appealResult === 1 ? 'Success, your appeal has passed verification! ' : "Sorry，there are some problems with your appeal."}
            >
                <div className="desc">
                    <Paragraph>
                        <Text
                            strong
                            style={{
                                fontSize: 16,
                            }}
                        >
                            {appeal.appealResult === 1 ? '信息' : "您本次申诉可能存在以下问题:"}
                        </Text>
                    </Paragraph>
                    {appeal.appealResult === 1 ? <Paragraph>
                        <Icon style={{color: 'green'}} type="info-circle"/> {appeal.appealFeedback}
                    </Paragraph> : <Paragraph>
                        <Icon style={{color: 'red'}} type="close-circle"/> {appeal.appealFeedback}
                    </Paragraph>}

                </div>
            </Result>)
        } else if (appeal.state === 1) {
            return (<Result
                icon={<Icon type="smile" theme="twoTone"/>}
                title="请稍等，您的申诉正在处理中!"
                subTitle="Please wait!Your appeal is under verification."
            />)
        }
    }

    render() {
        return (

            <Skeleton loading={this.props.loading} active>
                {this.getResult(this.props.appeal)}
            </Skeleton>

        )
    }
}

export default AppealResult