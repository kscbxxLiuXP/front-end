import React from 'react'
import { Layout} from 'antd'
import SiderNav from '../../components/SiderNav'
import ContentMain from '../../components/ContentMain'
import HeaderBar from '../../components/HeaderBar'
import {Typography} from "antd";

const { Header, Footer, Sider, Content } = Layout;
const {Text} = Typography

class Index extends React.Component {
    state = {
        collapsed: false
    }

    toggle = () => {
        // console.log(this)  状态提升后，到底是谁调用的它
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render() {
        // 设置Sider的minHeight可以使左右自适应对齐
        return (
            <div id='page'>
                <Layout>
                    <Sider collapsible
                           trigger={null}
                           collapsed={this.state.collapsed}
                           style={{background:"white"}}
                    >
                        <SiderNav collapsed={this.state.collapsed}/>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: '0 16px'}}>
                            <HeaderBar collapsed={this.state.collapsed} onToggle={this.toggle}/>
                        </Header>
                        <Content>
                            <ContentMain/>
                        </Content>
                        <Footer style={{textAlign: 'center', backgroundColor: '#1C1C1C'}}>
                            <div>
                                <Text style={{color: '#C9C9C9'}}>基于大数据和深度学习的短视频版权检测系统 | 辽ICP备18019311号</Text>

                                <br/> <Text style={{color: '#C9C9C9'}}>©2020 Created by NEU 大创五人组</Text>
                            </div>
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Index
