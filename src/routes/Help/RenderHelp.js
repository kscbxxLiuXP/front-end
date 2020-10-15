import React from "react";
import {Divider, Radio, Button, BackTop} from "antd";
import './style.css'

const helpList = [
    {
        key: 1,
        title: '如何上传我的视频',
        id: 1
    },
    {
        key: 2,
        title: '怎么修改我的账号密码',
        id: 2
    },
    {
        key: 3,
        title: '如何查看我上传过的视频',
        id: 3
    },
    {
        key: 4,
        title: '我对系统检测的结果有异议',
        id: 4
    },
    {
        key: 5,
        title: '如何申诉',
        id: 5
    }
]


class RenderHelp extends React.Component {
    state = {
        disable: false
    }

    renderHelp(id) {


        if (id === '1') {
            //如何上传我的视频
            return (
                <div>
                    <div className='step'>1、点击左侧导航栏的 <strong>上传中心</strong></div>
                    <div className='step'>2、将视频<strong>拖入</strong>到上传区域或者直接点击上传按钮</div>
                    <div className='step'>3、上传的具体要求请查看 <strong>上传中心</strong> 的提示</div>
                    <img width={1000} src={require('../../assets/help/help-1.png')} alt=""/>
                </div>)
        } else if (id === '2') {
            //怎么修改我的账号密码
            return (
                <div>
                    <div className='step'>1、修改密码的选项在 <strong>个人中心</strong> - <strong>账号相关</strong> 里面</div>
                    <img width={200} src={require('../../assets/help/help-2.png')} alt=""/>
                </div>)
        } else if (id === '3') {
            //如何查看我上传过的视频
            return (
                <div>
                    <div className='step'>1、查看我的上传视频请前往 <strong>我的创作</strong>  查看</div>
                    <img width={150} src={require('../../assets/help/help-3-1.png')} alt=""/>
                    <div className='step'>2、在列表中点击 <strong>查看</strong>  可以看到审核信息</div>
                    <img width={1200} src={require('../../assets/help/help-3-2.png')} alt=""/>
                </div>)
        } else if (id === '4') {
            //我对系统检测的结果有异议
            return (
                <div>
                    <div className='step'>1、进入创作中心的 <strong>详情</strong>  页面</div>
                    <div className='step'>2、如果您对系统检测的结果有异议，点击下方的 <strong>去申诉</strong> 按钮前往申诉引导页 </div>
                    <img width={700} src={require('../../assets/help/help-4.png')} alt=""/>
                </div>)
        } else if (id === '5') {
            //如何申诉
            return (
                <div>
                    <div className='step'>1、点击 <strong>新申诉</strong>  </div>
                    <img width={700} src={require('../../assets/help/help-5-1.png')} alt=""/>
                    <div className='step'>2、从左侧列表中选择需要申诉的视频，然后点击 <strong>></strong> 按钮 </div>
                    <img width={700} src={require('../../assets/help/help-5-2.png')} alt=""/>
                    <div className='step'>3、填写好申诉内容后，点击 <strong>提交</strong> 按钮 </div>
                    <img width={700} src={require('../../assets/help/help-5-3.png')} alt=""/>
                    <div className='step'>4、看到 <strong>申诉提交成功</strong> 后说明申诉已提交，等待人工审核即可 </div>
                    <img width={700} src={require('../../assets/help/help-5-4.png')} alt=""/>
                </div>)
        } else if (id === '6') {
            return (
                <div>

                </div>)
        }
    }

    getTitle(id) {
        let title = ''
        helpList.forEach((item) => {
            if (item.id.toString() === id.toString()) {
                title = item.title
            }
        })
        return title
    }

    render() {
        return (
            <div>
                <div style={{
                    background: "white",
                    borderRadius: "15px",
                    boxShadow: "0px 0px 10px rgba(140,140,140, 0.1)",
                    marginBottom: "20px",
                    padding: "20px",
                }}>
                    <div style={{width: '100%', padding: 30, background: '#f5f5f5'}}>
                        <div style={{float: "right", fontSize: 14}}>
                            <Button className='back-button' icon='left' type="dashed" onClick={() => {
                                window.history.back()
                            }} ghost>
                                返回
                            </Button>
                        </div>
                        <div style={{fontSize: 20, marginTop: 50, fontWeight: "bold"}}>
                            <span>
                                <div className='Divider' style={{width: 5, height: 20, background: '#99d2d5'}}/>

                                {this.getTitle(this.props.id)}
                            </span>


                        </div>
                    </div>
                    <div style={{marginTop: 30, fontSize: 14, marginLeft: 20}}>
                        {this.renderHelp(this.props.id)}
                    </div>
                    <Divider/>
                    <div style={{fontSize: 16, color: "gray"}}>
                        是否解决问题？
                        <div style={{float: "right"}}>
                            <Radio.Group disabled={this.state.disable} onChange={() => this.setState({disable: true})}>
                                <Radio value={1}>已解决</Radio>
                                <Radio value={2}>未解决</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                </div>

                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        );
    }
}

export default RenderHelp