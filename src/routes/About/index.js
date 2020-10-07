import React from 'react'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'

import {Card} from "antd";

export default class About extends React.Component {
    render() {
        return (
            <div>
                <CustomBreadcrumb arr={['关于']}/>
                <Card title='关于'>
                    我们是来自<b>东北大学</b>的大创五人组
                    <br/><br/>
                    正在 <b>毛克明(KeMing Mao)教授</b> 的带领下
                    <br/><br/>
                    完成 <b>基于大数据和深度学习的短视频版权检测系统</b> 的开发
                    <br/><br/>
                    奥利给，加油！
                </Card>
            </div>
        )
    }
}