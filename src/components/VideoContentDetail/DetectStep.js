import React from "react";
import {Skeleton, Steps, Tooltip} from "antd";

const {Step} = Steps;

class DetectStep extends React.Component {
    state = {
        a1: {},
        a2: {},
        a3: {},
        a4: {},
        a5: {}
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps, nextContext) {
        nextProps.his.forEach((item) => {
            if (item.type === 1) {
                this.setState({
                    a1: item
                })
            } else if (item.type === 2) {
                this.setState({
                    a2: item
                })
            } else if (item.type === 3) {
                this.setState({
                    a3: item
                })
            } else if (item.type === 4) {
                this.setState({
                    a4: item
                })
            } else if (item.type === 5) {
                this.setState({
                    a5: item
                })
            }
        })
    }

    renderCurrent(length) {
        if (length === 1) {
            return 0
        } else if (length === 2) {
            return 1
        } else if (length === 3) {
            return 2
        } else if (length === 4) {
            return 4
        } else if (length === 5) {
            return 5
        }
    }

    render1() {
        if (this.state.a4.type !== undefined) {
            return <Step title={<Tooltip title={this.state.a1.time}><span>视频上传</span></Tooltip>}/>
        } else {
            return <Step title='视频上传' description={this.state.a1.time}/>
        }
    }

    render2() {
        if (this.state.a2.type === undefined) {
            return <Step title="审核中"/>
        } else {
            if (this.state.a4.type !== undefined) {
                return <Step title={<Tooltip title={this.state.a2.time}><span>审核中</span></Tooltip>}/>
            } else {
                return <Step title='审核中' description={this.state.a2.time}/>
            }
        }
    }

    //审核完成
    render3() {
        if (this.state.a3.type === undefined) {
            return <Step status='wait' title="审核完成"/>
        } else {
            if (this.state.a3.state === 1) {
                return <Step status='finish' title="审核完成" description={this.state.a3.time}/>
            } else {
                return <Step status='error' title={<Tooltip title={this.state.a3.time}><span>审核完成</span></Tooltip>} description="审核不通过"/>
            }
        }

    }

    render4() {
        if(this.state.a4.type!==undefined){
            return <Step title="申诉申请" description={this.state.a4.time}/>
        }

    }

    render5() {
        if(this.state.a4.type!==undefined){
            return <Step  title="申诉处理" description=""/>
        }

    }

    render6() {
        if(this.state.a4.type!==undefined){
            if(this.state.a5.type===undefined){
                return <Step title="申诉完成" description=""/>
            }else{
                if(this.state.a5.state===0)
                    return <Step status='error' title={<Tooltip title={this.state.a3.time}><span>申诉完成</span></Tooltip>} description="审核不通过"/>
            }

        }

    }

    render() {
        return (
            <div style={{
                background: "white",
                borderRadius: "15px",
                boxShadow: "0px 0px 20px rgba(137,137,137, 0.1)",
                marginBottom: "20px",
                padding: "20px",
                width: '100%'
            }}>
                <Skeleton loading={this.props.loading} active>
                    <Steps size='small' current={this.renderCurrent(this.props.his.length)}>
                        {this.render1()}
                        {this.render2()}
                        {this.render3()}
                        {this.render4()}
                        {this.render5()}
                        {this.render6()}
                    </Steps>
                </Skeleton>
            </div>
        )
    }
}

export default DetectStep