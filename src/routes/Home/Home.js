import React from 'react'
import {
    Row,
    Col,
    Radio,
    List,
    Card,
    Icon,
    Avatar,
    Statistic,
    Button,
    Affix,
    message,
    Input,
    Divider,
    Badge,
    Modal
} from 'antd'
import './style.css'
import {isAuthenticated} from '../../utils/Session'

import axios from 'axios'
import ApiUtil from "../../utils/ApiUtil";
import Background from '../../assets/img/profile-back.png';
import ReactApexChart  from 'apexcharts'
import Chart from "react-apexcharts"


var sectionStyle = {
    width: "200px",
    height: "130px",
    // makesure here is String确保这里是一个字符串，以下是es6写法
    backgroundImage: `url(${Background})`,
    backgroundSize: '100%,100%',
    backgroundColor: '#d4dbf9',
    borderRadius: '5px',
    float: 'right'
};
var zh_cn = require("apexcharts/dist/locales/zh-cn.json")
class Home extends React.Component {
    constructor() {
        super();
        axios({
            method: 'get',
            url: ApiUtil.URL_IP + '/api/dashboard/' + isAuthenticated()
        }).then(
            (res) => {
                this.setState({dashboard: res.data.data})
                this.setWeek()
            }
        ).catch(err => {
            message.error(err.data.msg)
        })
    }
    state = {
        avatar: require('../../assets/img/04.jpg'),
        dashboard: {
            notices:[]
        },
        visible:false,
        cNotice: {},
        series: [{
            name: '审核通过',
            data: [0, 0, 0, 0, 0, 0]
        }, {
            name: '审核不通过',
            data: [0, 0, 0, 0, 0, 0],
        }, {
            name: '审核中',
            data:[0, 0, 0, 0, 0, 0],
        }],
        options: {
            chart: {
                locales: [zh_cn],
                defaultLocale: 'zh-cn',
                type: 'bar',
                height: 300,
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: false
                }
            },
            dataLabels:{
                enabled: false
            },
            colors: ['#34c38f', '#E91E63','#556ee6' , '#f1b44c'],
            plotOptions: {
                bar: {
                    horizontal: false,
                },
            },
            // xaxis: {
            //     type: 'datetime',
            //     categories: ['12:00:00 01/01/2011 GMT', '13:00:00 01/01/2011 GMT', '14:00:00 01/01/2011 GMT', '15:00:00 01/01/2011 GMT',
            //         '16:00:00 01/01/2011 GMT', '17:00:00 01/01/2011 GMT'
            //     ],
            // },
            xaxis: {
                type: 'datetime',
                categories: ['2011-01', '2011-02', '2011-03', '2011-04',
                    '2011-05', '2011-06'
                ],
                labels: {
                    datetimeFormatter: {
                        year: 'yyyy',
                        month: 'MMM \'yy',
                        day: 'dd MMM',
                        hour: 'HH:mm'
                    }
                }
            },
            legend: {
                position: 'bottom',
                offsetY: 10,
                height:30,
            },
            fill: {
                opacity: 1
            }
        },

    }

    setYear() {
        let pass=this.state.dashboard.year.pass
        let process=this.state.dashboard.year.process
        let fail=this.state.dashboard.year.fail
        let dateSequence=this.state.dashboard.year.dateSequence

        this.setState({
            series: [{
                name: '审核通过',
                data: pass
            }, {
                name: '审核不通过',
                data: fail
            }, {
                name: '审核中',
                data:process
            }],
            options: {
                chart: {
                    locales: [zh_cn],
                    defaultLocale: 'zh-cn',
                    type: 'bar',
                    height: 300,
                    stacked: true,
                    toolbar: {
                        show: true
                    },
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels:{
                    enabled: false
                },
                colors: ['#34c38f', '#E91E63','#556ee6' , '#f1b44c'],
                plotOptions: {
                    bar: {
                        horizontal: false,
                    },
                },
                // xaxis: {
                //     type: 'datetime',
                //     categories: ['12:00:00 01/01/2011 GMT', '13:00:00 01/01/2011 GMT', '14:00:00 01/01/2011 GMT', '15:00:00 01/01/2011 GMT',
                //         '16:00:00 01/01/2011 GMT', '17:00:00 01/01/2011 GMT'
                //     ],
                // },
                xaxis: {
                    type: 'datetime',
                    categories: dateSequence,
                },
                legend: {
                    position: 'bottom',
                    offsetY: 10,
                    height:30,
                },
                fill: {
                    opacity: 1
                }
            },
        })
    }
    setMonth() {
        let pass=this.state.dashboard.month.pass
        let process=this.state.dashboard.month.process
        let fail=this.state.dashboard.month.fail
        let dateSequence=this.state.dashboard.month.dateSequence

        this.setState({
            series: [{
                name: '审核通过',
                data: pass
            }, {
                name: '审核不通过',
                data: fail
            }, {
                name: '审核中',
                data:process
            }],
            options: {
                chart: {
                    locales: [zh_cn],
                    defaultLocale: 'zh-cn',
                    type: 'bar',
                    height: 300,
                    stacked: true,
                    toolbar: {
                        show: true
                    },
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels:{
                    enabled: false
                },
                colors: ['#34c38f', '#E91E63','#556ee6' , '#f1b44c'],
                plotOptions: {
                    bar: {
                        horizontal: false,
                    },
                },
                // xaxis: {
                //     type: 'datetime',
                //     categories: ['12:00:00 01/01/2011 GMT', '13:00:00 01/01/2011 GMT', '14:00:00 01/01/2011 GMT', '15:00:00 01/01/2011 GMT',
                //         '16:00:00 01/01/2011 GMT', '17:00:00 01/01/2011 GMT'
                //     ],
                // },
                xaxis: {
                    type: 'datetime',
                    categories: dateSequence,
                },
                legend: {
                    position: 'bottom',
                    offsetY: 10,
                    height:30,
                },
                fill: {
                    opacity: 1
                }
            },
        })
    }
    setWeek() {
        let pass=this.state.dashboard.week.pass
        let process=this.state.dashboard.week.process
        let fail=this.state.dashboard.week.fail
        let dateSequence=this.state.dashboard.week.dateSequence

        this.setState({
            series: [{
                name: '审核通过',
                data: pass
            }, {
                name: '审核不通过',
                data: fail
            }, {
                name: '审核中',
                data:process
            }],
            options: {
                chart: {
                    locales: [zh_cn],
                    defaultLocale: 'zh-cn',
                    type: 'bar',
                    height: 300,
                    stacked: true,
                    toolbar: {
                        show: true
                    },
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels:{
                    enabled: false
                },
                colors: ['#34c38f', '#E91E63','#556ee6' , '#f1b44c'],
                plotOptions: {
                    bar: {
                        horizontal: false,
                    },
                },
                xaxis: {
                    type: 'datetime',
                    categories: dateSequence,
                    labels: {
                        datetimeFormatter: {
                            year: 'yyyy',
                            month: 'yyyy.MM',
                            day: 'MM月dd日',
                            hour: 'HH:mm'
                        }
                    }
                },
                legend: {
                    position: 'bottom',
                    offsetY: 10,
                    height:30,
                },
                fill: {
                    opacity: 1
                }
            },
        })
    }
    render() {
        const {avatar} = this.state
        return (
            <div className='home'>
                <div style={{marginLeft: 20, fontWeight: "bold", fontSize: "20px"}}>Dashboard</div>
                <div style={{
                    marginLeft: 20,
                    marginBottom: "10px",
                    fontSize: '14px',
                    color: 'gray'
                }}>短视频版权检测平台，专注于保护视频创作者的版权!
                </div>
                <Row gutter={45}>
                    <Col span={8}>
                        <div className='info-card'>
                            <div className='info-card-up'>
                                <div className='info-card-text'>
                                    <div className='info-card-title'>Welcome Back!</div>
                                    <div className='info-card-subtitle'>欢迎使用版权检测系统</div>
                                </div>
                                <div style={sectionStyle}/>
                            </div>
                            <div className='avatar-wrapper'>
                                <Avatar className='avatar' size={64}
                                        src={`${ApiUtil.URL_IP}/api/getAvatar/${isAuthenticated()}`}/>
                            </div>
                            <div className='info-card-down'>
                                <Row gutter={10}>
                                    <Col span={8}>
                                        <div className='name-wrapper'>
                                            <div style={{fontSize: 18, tefontWeight: "bold"}}>
                                                {isAuthenticated()}
                                            </div>
                                            <div style={{color: '#7d8794'}}>
                                                {this.state.dashboard.nickname}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <div style={{marginTop: 20, fontWeight: "bold"}}>
                                            {this.state.dashboard.totalNum}
                                        </div>
                                        <div style={{marginTop: 5, fontSize: 12, color: '#7d8794'}}>
                                            总上传数
                                        </div>
                                        <Button style={{marginTop: 25, fontSize: 12, height: 30}}
                                                onClick={() => this.props.history.push('/home/personalCenter/information')}>
                                            个人资料<Icon type='right'/>
                                        </Button>
                                    </Col>
                                    <Col span={8}>
                                        <div style={{marginTop: 20, fontWeight: "bold"}}>
                                            {this.state.dashboard.passrate}%
                                        </div>
                                        <div style={{marginTop: 5, fontSize: 12, color: '#7d8794'}}>
                                            通过率
                                        </div>
                                    </Col>
                                </Row>

                            </div>

                        </div>
                        <div className='notice-wrapper'>
                            <div className='card-title'>公告</div>
                            <div style={{marginTop:30}}>
                            {this.state.dashboard.notices.map((item, index) => {
                                return (
                                    <a onClick={() => this.setState({visible: true, cNotice: item})} key={item.key} className='notice'>
                                        <div className='notice-title1'>
                                            <Icon style={{marginRight:10}} type="sound" />{item.title}
                                        </div>

                                        <div className='notice-time'>
                                            {item.time}>
                                        </div>
                                        <Divider/>
                                    </a>)
                            })}
                            </div>
                            <button className='btn-more-notice' onClick={()=>this.props.history.push('/home/notice')}><span>更多</span></button>
                        </div>

                    </Col>
                    <Col span={16}>
                        <div style={{marginTop: 20}}>
                            <Row gutter={30}>
                                <Col span={8}>
                                    <div className='data-panel'>
                                        <Row>
                                            <Col span={18}>
                                                <div className='data-panel-text'>
                                                    <div className='data-panel-title'>
                                                        审核中
                                                    </div>
                                                    <div className='data-panel-data'>
                                                        {this.state.dashboard.verifyNum}<span style={{fontSize:12,marginLeft:5}}>项</span>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col span={6}>
                                                <div className='data-panel-icon-wrapper'>
                                                    <Icon  className='data-panel-icon' type='clock-circle'/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div className='data-panel'>
                                        <Row>
                                            <Col span={18}>
                                                <div className='data-panel-text'>
                                                    <div className='data-panel-title'>
                                                        申诉
                                                    </div>
                                                    <div className='data-panel-data'>
                                                        {this.state.dashboard.appealNum}<span style={{fontSize:12,marginLeft:5}}>项</span>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col span={6}>
                                                <div className='data-panel-icon-wrapper'>
                                                    <Icon  className='data-panel-icon' type='bulb'/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div className='data-panel'>
                                        <Row>
                                            <Col span={18}>
                                                <div className='data-panel-text'>
                                                    <div className='data-panel-title'>
                                                        已完成
                                                    </div>
                                                    <div className='data-panel-data'>
                                                        {this.state.dashboard.finishNum}<span style={{fontSize:12,marginLeft:5}}>项</span>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col span={6}>
                                                <div className='data-panel-icon-wrapper'>
                                                    <div className='icon-back'/>
                                                    <Icon  className='data-panel-icon' type='check'/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className='chart-wrapper'>

                            <Radio.Group style={{float: "right", marginTop: 20}} defaultValue="a" buttonStyle="solid">
                                <Radio.Button value="a" onClick={()=>this.setWeek()}>最近一周</Radio.Button>
                                <Radio.Button value="b" onClick={()=>this.setMonth()}>最近一月</Radio.Button>
                                <Radio.Button value="c" onClick={()=>this.setYear()}>最近一年</Radio.Button>
                            </Radio.Group>
                            <div className='card-title'>创作记录</div>
                            <div style={{marginTop:10}}>
                                <Chart  options={this.state.options} series={this.state.series} type="bar"   height={430} />
                            </div>

                        </div>
                    </Col>
                </Row>
                <Modal title='公告' width={800}
                       visible={this.state.visible}
                       onOk={() => this.setState({visible: false})}
                       onCancel={() => this.setState({visible: false})}
                       footer={
                           <Button onClick={() => this.setState({visible: false})}>
                               确定
                           </Button>
                       }
                >
                    <div style={{fontSize: 20, textAlign: "center"}}>
                        {this.state.cNotice.title}
                    </div>
                    <div style={{color: "gray", marginTop: 20, textAlign: "right"}}>
                        {this.state.cNotice.publisher}
                    </div>
                    <div style={{color: "gray", marginTop: 10, textAlign: "right"}}>
                        {this.state.cNotice.time}
                    </div>
                    <div style={{minHeight: 400, marginTop: 20, fontSize: 14}}

                         dangerouslySetInnerHTML={{__html: this.state.cNotice.content}}/>
                </Modal>
            </div>
        )
    }
}

const styles = {
    bg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
    },


}

export default Home
