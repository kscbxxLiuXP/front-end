import React from "react";
import {Skeleton, Steps} from "antd";

const {Step} = Steps;

class AppealStep extends React.Component {
    renderStep(appeal) {
        console.log(appeal)
        if (appeal.state === 1) {
            return (
                <Steps size='small' current={1}>
                    <Step title="提交申诉" description={appeal.appealTime}/>
                    <Step title="申诉审核中" subTitle={'2个工作日内完成'} description="请耐心等待哦！"/>
                    <Step title="申诉完成"/>
                </Steps>
            )
        } else if (appeal.state === 2) {
            return (
                <Steps size='small' current={2}>
                    <Step title="提交申诉" description={appeal.appealTime}/>
                    <Step title="申诉审核中" description=""/>
                    {appeal.appealResult === 1 ? <Step title="申诉完成" description="审核通过"/> :
                        <Step status='error' title="申诉完成" description="审核不通过"/>}

                </Steps>
            )
        }

    }

    render() {
        return (
            <div style={{}}>
                <Skeleton loading={this.props.loading} active>
                    {this.renderStep(this.props.appeal)}
                </Skeleton>
            </div>
        )
    }
}

export default AppealStep