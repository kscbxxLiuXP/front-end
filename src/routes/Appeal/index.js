import React from "react";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import {Button, Empty, Modal, Transfer, Collapse, Table, Tag,message, Tabs} from 'antd';
import {withRouter} from "react-router-dom";
import {inject} from "mobx-react";
import AppealList from "./AppealList";
import axios from 'axios'
import ApiUtil from "../../utils/ApiUtil";
import {isAuthenticated} from "../../utils/Session";

const {TabPane} = Tabs;

@withRouter
class Appeal extends React.Component {
    state = {
        all: 0,
        process: 0,
        finish: 0,
        currentTab: '1',
        data: []
    }

    tabChange(key) {
        this.getData(key)
        this.setState({
            currentTab: key
        })
    }

    getData(key) {
        let type=''
        switch (key) {
            case '1':
                type = 0;
                break;
            case '2':
                type = 1;
                break;
            case '3':
                type = 2
                break;
        }
        axios({
            url: ApiUtil.URL_IP + '/api/getAppealList/' + isAuthenticated() + '/' + type,
            method: 'get'
        }).then(res => {
            this.setState({data: res.data.data})
        })
    }

    getCount() {
        axios({
            url: ApiUtil.URL_IP + '/api/getAppealCount/' + isAuthenticated(),
            method: 'get'
        }).then(res => {
            this.setState({
                all: res.data.data.all,
                finish: res.data.data.finish,
                process: res.data.data.process
            })
        })
    }

    componentDidMount() {
        this.getCount()
        this.getData('1')
    }

    render() {

        return (<div>
            <CustomBreadcrumb arr={['申诉中心']}/>
            <div className="result-card" style={
                {
                    background: "white",
                    borderRadius: "15px",
                    boxShadow: "0px 0px 20px rgba(137,137,137, 0.1)",
                    marginBottom: "20px",
                    minHeight: 300,
                    padding: "20px"
                }}>
                <Tabs animated={false} defaultActiveKey="1" onChange={(activeKey) => this.tabChange(activeKey)}
                      tabBarExtraContent={
                          <span>
                              <Button icon='reload' onClick={() => {
                                  this.getData(this.state.currentTab)
                                  message.info('已刷新')
                              }} style={{marginRight:20}}>刷新</Button>
                              <Button type='primary' onClick={() => {
                                  this.props.history.push('/home/appeal/new')
                              }}>新申诉</Button>
                          </span>
                      }>
                    <TabPane tab={`全部(${this.state.all})`} key="1">
                        {this.state.all === 0 ? <Empty description='暂时没有申诉'/> : <AppealList data={this.state.data}/>}
                    </TabPane>
                    <TabPane tab={`进行中(${this.state.process})`} key="2">
                        {this.state.process === 0 ? <Empty description='暂时没有申诉'/> :
                            <AppealList data={this.state.data}/>}
                    </TabPane>
                    <TabPane tab={`完成(${this.state.finish})`} key="3">
                        {this.state.finish === 0 ? <Empty description='暂时没有申诉'/> : <AppealList data={this.state.data}/>}
                    </TabPane>
                </Tabs>
            </div>

        </div>)
    }
}

export default Appeal