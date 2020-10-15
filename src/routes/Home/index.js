import React from 'react'
import {Row, Col, Radio, List, Card, Icon, Avatar, Statistic, Button, Affix, message} from 'antd'
import './style.css'
import {isAuthenticated} from '../../utils/Session'
import {Chart, Axis, Geom, Tooltip} from 'bizcharts'
import axios from 'axios'
import ApiUtil from "../../utils/ApiUtil";

const chartdata = [
    {year: '1991', value: 3},
    {year: '1992', value: 4},
    {year: '1993', value: 3.5},
    {year: '1994', value: 5},
    {year: '1995', value: 4.9},
    {year: '1996', value: 6},
    {year: '1997', value: 7},
    {year: '1998', value: 9},
    {year: '1999', value: 13}
]
const cols = {
    'value': {min: 0},
    'year': {range: [0, 1]}
}

class Home extends React.Component {
    state = {
        avatar: require('../../assets/img/04.jpg'),
        dashboard: {}
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: ApiUtil.URL_IP + '/api/dashboard/' + isAuthenticated()
        }).then(
            (res) => {
                this.setState({dashboard: res.data.data})
            }
        ).catch(err => {
            message.error(err.data.msg)
        })
    }


    render() {
        return (
            <div className='home'>
                <Row gutter={10}>
                    <Col span={6}>

                        <div className="info" style={{marginTop: "50px", margin: "auto", width: "200px", padding: 20}}>
                            <div style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                marginTop: "15px",
                                fontSize: "20px"
                            }}><Avatar size={64} src={`${ApiUtil.URL_IP}/api/getAvatar/${isAuthenticated()}`}/>
                                <br/>
                                {this.state.dashboard.nickname}
                                <br/>
                                <Button onClick={() => {
                                    this.props.history.push('/home/personalCenter/information')
                                }} style={{margin: "auto"}} size="small">查看个人资料</Button>
                            </div>
                        </div>
                        <Card hoverable style={{
                            marginTop: "30px",

                            height: "500px",
                            width: "100%",
                            overflowY: "scroll"
                        }}
                        >

                            <Affix target={() => this.container}>
                                <div style={{fontSize: "18px", marginTop: "-10px", marginBottom: "20px"}}>消息列表
                                </div>
                            </Affix>
                            <List
                                dataSource={[
                                    {
                                        name: 'Lily',
                                    },
                                    {
                                        name: 'Lily',
                                    },
                                    {
                                        name: 'Lily',
                                    },
                                    {
                                        name: 'Lily',
                                    },
                                    {
                                        name: 'Lily',
                                    },
                                    {
                                        name: 'Lily',
                                    },
                                    {
                                        name: 'Lily',
                                    },

                                ]}
                                renderItem={item => (
                                    <List.Item
                                        key={item.id}
                                        actions={[
                                            <a onClick={this.showDrawer} key={`a-${item.id}`}>
                                                View Profile
                                            </a>,
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar
                                                    src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"/>
                                            }
                                            title={<a href="https://ant.design/index-cn">{item.name}</a>}
                                            description="Progresser XTech"
                                        />
                                    </List.Item>
                                )}
                            />


                        </Card>
                    </Col>
                    <Col span={18}>
                        <div style={{fontWeight: "bold", fontSize: "25px"}}>Dashboard</div>
                        <div style={{marginBottom: "10px"}}>短视频版权检测平台，专注于保护视频创作者的版权!</div>
                        <Row gutter={4}>
                            <Col span={8}>
                                <Card hoverable>
                                    <Statistic
                                        title="总共上传视频"
                                        value={11}
                                        valueStyle={{color: '#3f8600'}}
                                        prefix={<Icon type="arrow-up"/>}
                                        suffix="个"
                                    />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card hoverable>
                                    <Statistic
                                        title="总共上传视频"
                                        value={11}
                                        valueStyle={{color: '#3f8600'}}
                                        prefix={<Icon type="arrow-up"/>}
                                        suffix="个"
                                    />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card hoverable>
                                    <Statistic
                                        title="总共上传视频"
                                        value={11}
                                        valueStyle={{color: '#3f8600'}}
                                        prefix={<Icon type="arrow-up"/>}
                                        suffix="个"
                                    />
                                </Card>
                            </Col>
                        </Row>
                        <Card title='我的创作上传'
                              bordered={false}
                              className='card-item'
                              style={{marginTop: "30px"}}
                              extra={<Radio.Group defaultValue="a" buttonStyle="solid">
                                  <Radio.Button value="a">昨日</Radio.Button>
                                  <Radio.Button value="b">最近一周</Radio.Button>
                                  <Radio.Button value="c">最近一月</Radio.Button>
                              </Radio.Group>}
                        >
                            <Chart height={400} data={chartdata} scale={cols} forceFit>
                                <Axis name="year"/>
                                <Axis name="value"/>
                                <Tooltip crosshairs={{type: 'y'}}/>
                                <Geom type="line" position="year*value" size={2}/>
                                <Geom type='point' position="year*value" size={4} shape={'circle'}
                                      style={{stroke: '#fff', lineWidth: 1}}/>
                            </Chart>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home
