import React from "react";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import {Button, Col, Divider, Row} from 'antd'
import MyCard from "../../components/MyCard/MyCard";
import {withRouter, Link} from "react-router-dom";
import './style.css'

let id = 0
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

@withRouter
class Help extends React.Component {
    state = {
        id: 0
    }

    render() {

        return (
            <div>
                <CustomBreadcrumb arr={['帮助']}/>
                <MyCard style={{height: 600}} title='帮助列表'>
                    <div style={{marginLeft:30,marginTop: "20px"}}>
                        {helpList.map((item, index) => {
                            return <div key={item.id}>
                                <a className='title'
                                   href={'/#/home/help/' + item.id}>
                                    <span style={{textAlign:"left",width:'100%'}}>
                                             {item.title}
                                    </span>
                                    <span style={{float:"right",fontSize:22}}>
                                        >
                                    </span>

                                </a>
                                <Divider/>
                            </div>
                        })}
                    </div>
                </MyCard>

            </div>
        );
    }
}

export default Help