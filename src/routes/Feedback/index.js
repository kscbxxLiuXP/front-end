import React from 'react'

import CustomBreadcrumb from '../../components/CustomBreadcrumb'
import {Button, Input, message, Modal, Result} from "antd";
import MyCard from "../../components/MyCard/MyCard";
import axios from 'axios'
import {isAuthenticated} from "../../utils/Session";
import ApiUtil from "../../utils/ApiUtil";

class FeedBackDemo extends React.Component {
    state = {
        submitted: false,
        title: '',
        content: '',
    }
    handleTitleChange = e => {
        this.setState({
            title: e.target.value
        })
    }
    handleContentChange = e => {
        this.setState({
            content: e.target.value
        })
    }
    handleSubmit = e => {
        let _this = this
        Modal.confirm({
            title: '你确认要提交吗？',
            okText: '提交',
            cancelText: '取消',
            onOk() {
                let data = {
                    title: _this.state.title,
                    content: _this.state.content,
                    smtPerson: isAuthenticated(),
                }
                axios({
                    url: ApiUtil.URL_IP + '/api/newFeedback',
                    method: 'post',
                    data: data
                }).then(res => {
                    if (res.data.code === 0) {
                        _this.setState({
                                submitted: true
                            }
                        )
                    } else {
                        message.error("提交失败，请重新尝试！")
                    }
                })

            }
        })
    }

    render() {
        return (
            <div>
                <CustomBreadcrumb arr={['问题反馈']}/>
                {this.state.submitted ? <MyCard >
                    <Result
                        status="success"
                        title="您的反馈已经成功提交，感谢您对我们的支持!"
                        subTitle="Your feedback has been successfully submitted.Thanks for your support for us."
                        extra={[
                            <Button type="primary" key="console" onClick={() => {
                                this.setState({
                                    submitted: false,
                                    title: '',
                                    content: '',
                                })
                            }}>
                                返回
                            </Button>
                        ]}
                    />
                </MyCard> : <div className="info-card" style={
                    {
                        background: "white",
                        borderRadius: "15px",
                        boxShadow: "0px 0px 20px rgba(137,137,137, 0.1)",
                        marginTop: "20px",
                        marginBottom: "50px",
                        padding: "20px"
                    }}>
                    <div style={{fontWeight: "bold", marginLeft: "30px", marginBottom: "20px", fontSize: "18px"}}>问题反馈
                    </div>
                    <div style={{marginLeft: "60px"}}
                    >
                        <div>
                            问题简要：
                            <Input value={this.state.title} onChange={this.handleTitleChange} style={{width: "50%"}}/>
                        </div>
                        <div style={{marginTop: "30px"}}>
                            详细信息：
                        </div>
                        <Input.TextArea value={this.state.content} onChange={this.handleContentChange}
                                        autoSize={{minRows: 3}}
                                        style={{width: "50%", marginTop: "-20px", marginLeft: "70px"}}/>
                        <br/>
                        <Button style={{marginLeft: "70px", marginTop: "20px"}} onClick={this.handleSubmit}
                                type="primary">提交</Button>
                    </div>

                </div>}

            </div>

        )
    }
}


export default FeedBackDemo
