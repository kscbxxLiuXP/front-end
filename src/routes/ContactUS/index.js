import React from "react";
import Nav3 from "../../Home/Nav3";
import {Footer00DataSource, Nav30DataSource} from "../../Home/data.source";
import Footer0 from "../../Home/Footer0";
import {
    Layout,
   BackTop,
} from "antd";
import {enquireScreen} from "enquire-js";
import './style.css'
import MyFilpCard from "../../components/MyFlipCard";

const {Content} = Layout
let isMobile;
enquireScreen((b) => {
    isMobile = b;
});
const {location = {}} = typeof window !== 'undefined' ? window : {};

class ContactUS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile,
            show: !location.port, // 如果不是 dva 2.0 请删除
            confirmDirty: false,
        };
    }


    render() {

         return (
            <div style={{background: "#f0f2f5"}}>
                <Nav3
                    id="Nav3_0"
                    key="Nav3_0"
                    dataSource={Nav30DataSource}
                    isMobile={this.state.isMobile}
                    selectedKeys={['item1']}
                />
                <Content style={{padding: '0 50px'}}>
                    <div style={{
                        alignContent: 'center',
                        alignItems: 'center',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        justifyContent: 'center',
                    }}>
                        <div>
                            <div style={{width: '100%', textAlign: "center"}}>
                                <img style={{margin: "0 auto"}} src={require('../../assets/img/VideoDetect.png')} alt="logo"/>
                            </div>

                            <br/>
                            <div style={{fontSize: 20, marginTop: -20, marginBottom: 30, width: '100%', textAlign: "center"}}>
                                关于我们
                            </div>
                            <div>
                                <span style={{float: "left", marginLeft: -50, fontSize: 30, fontStyle: "oblique"}}>1.</span>
                                <MyFilpCard name={'半透明的墙'} src={require('../../assets/img/a1.jpg')} des={'没有感情的代码机器'}/>
                            </div>
                            <div>
                                <span style={{float: "right", marginRight: -50, fontSize: 30, fontStyle: "oblique"}}>.2</span>
                                <MyFilpCard name={'Arthas Menethil'} src={require('../../assets/img/a2.jpg')} des={'忠实哲学爱好者'}/>
                            </div>
                            <div>
                                <span style={{float: "left", marginLeft: -50, fontSize: 30, fontStyle: "oblique"}}>3.</span>
                                <MyFilpCard name={'金针小肥猪'} src={require('../../assets/img/a3.jpg')} des={'对掰门把手颇有研究'}/>
                            </div>
                            <div>
                                <span style={{float: "right", marginRight: -50, fontSize: 30, fontStyle: "oblique"}}>.4</span>
                                <MyFilpCard name={'北风寒'} src={require('../../assets/img/a4.jpg')} des={'智商达人'}/>
                            </div>
                            <div>
                                <span style={{float: "left", marginLeft: -50, fontSize: 30, fontStyle: "oblique"}}>5.</span>
                                <MyFilpCard name={'非鱼'} src={require('../../assets/img/a5.jpg')} des={'假沈阳本地人，大创组语文课代表'}/>
                            </div>

                            <div style={{textAlign: "center", marginTop: 30, marginBottom: 50}}>
                                <img width={300} src={require('../../assets/img/qr.jpg')} alt=""/>
                            </div>

                        </div>
                        <BackTop visibilityHeight={200} style={{right: 50}}/>

                    </div>
                </Content>
                <Footer0
                    id="Footer0_0"
                    key="Footer0_0"
                    dataSource={Footer00DataSource}
                    isMobile={this.state.isMobile}
                />
            </div>
        )
    }
}

export default ContactUS