import React from 'react'
import {BackTop, Card, Carousel} from 'antd'
import CustomBreadcrumb from '../../components/CustomBreadcrumb'
import './css/style.css'
import '../../../node_modules/animate.css/animate.css'

import axios from 'axios'
import ApiUtil from "../../utils/ApiUtil";

const animations = [
    ['bounceInDown', 'bounceInUp'],
    ['bounceInLeft', 'bounceInRight'],
    ['rotateIn', 'rotateIn'],
    ['flipInX', 'flipInY'],
    ['rotateInDownLeft', 'rotateInUpRight'],
    ['rotateInDownRight', 'rotateInUpLeft'],
    ['zoomInLeft', 'zoomInRight'],
    ['zoomInDown', 'zoomInUp'],
    ['zoomIn', 'zoomIn'],
    ['lightSpeedIn', 'bounceInLeft'],
]


function getAnimation(animations) {
    let index = Math.floor(Math.random() * animations.length)
    let arr = animations[index]
    arr = arr.map(item => {
        return `${item} animated slider-active`
    })
    return arr
}

class NoticeDemo extends React.Component {
    state = {
        current: 0,
        notices: []
    }
    animations = getAnimation(animations)

    componentWillUpdate() {
        //当current变化时，也就是state变化时重新给animations赋值，否则animations不会改变.实现类似vue的watch
        //用componentWUpdate还是componentDidUpdate根据具体场景，componentDidUpdate一般是需要用到state时调用（因为setState是异步，需要等更新完成）
        let temp = getAnimation(animations)
        while (this.animations[0] === temp[0]) {
            temp = getAnimation(animations)
        }
        this.animations = temp

    }

    componentDidMount() {
        axios(
            {
                method: 'get',
                url: ApiUtil.URL_IP + "/api/noticeList"
            }
        ).then(res => {
            console.log(res.data.data.notices)
            this.setState({notices: res.data.data.notices})
        })
    }

    render() {
        const {current} = this.state
        const cardContent = `<ul class="card-ul">
            <li>公告内容</li>
            <li>公告内容</li>
            <li>公告内容</li>
          </ul>`
        return (
            <div>
                <CustomBreadcrumb arr={['公告']}/>
                <Card style={{marginBottom: 10}}>
                    <Carousel speed={100} arrows afterChange={(current) => this.setState({current})} autoplay>
                        <div>
                            <div className='slider-item' style={{background: '#364d79'}}>
                                <h3 className={current === 0 ? this.animations[0] : ''}>短视频版权检测平台</h3>
                                <p className={current === 0 ? this.animations[1] : ''}>致力于保护每一个用户的知识产权</p>
                            </div>
                        </div>
                        <div>
                            <div className='slider-item' style={{background: '#64cbcc'}}>
                                <h3 className={current === 1 ? this.animations[0] : ''}>短视频版权检测平台</h3>
                                <p className={current === 1 ? this.animations[1] : ''}>致力于保护每一个用户的知识产权</p>
                            </div>
                        </div>
                        <div>
                            <div className='slider-item' style={{background: 'sandybrown'}}>
                                <h3 className={current === 2 ? this.animations[0] : ''}>短视频版权检测平台</h3>
                                <p className={current === 2 ? this.animations[1] : ''}>致力于保护每一个用户的知识产权</p>
                            </div>
                        </div>
                        <div>
                            <div className='slider-item' style={{background: 'darkseagreen'}}>
                                <h3 className={current === 3 ? this.animations[0] : ''}>短视频版权检测平台</h3>
                                <p className={current === 3 ? this.animations[1] : ''}>致力于保护每一个用户的知识产权</p>
                            </div>
                        </div>
                    </Carousel>
                </Card>
                <Card>
                    {this.state.notices.map((notice, index) => {
                        return (<Card key={index} style={{marginTop: "30px"}} hoverable title={notice.title} extra={
                            <div style={{whiteSpace: "pre"}}>
                                {notice.publisher} 发布于 {notice.timeformat}
                            </div>

                        }>
                            {notice.content}
                        </Card>)
                    })}
                </Card>
                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}

export default NoticeDemo
