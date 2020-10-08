import React from 'react'
import {withRouter, Switch, Redirect} from 'react-router-dom'
import LoadableComponent from '../../utils/LoadableComponent'
import PrivateRoute from '../PrivateRoute'

//首页
const Home = LoadableComponent(() => import('../../routes/Home/index'))  //参数一定要是函数，否则不会懒加载，只会代码拆分

//公告
const VerifyNoticeDemo = LoadableComponent(() => import('../../routes/Notice'))

//个人中心组件
const PInformationDemo = LoadableComponent(() => import('../../routes/PCenter/PInformationDemo/index'))
const AccountDemo = LoadableComponent(() => import('../../routes/PCenter/AccountDemo/index'))
const MessageDemo = LoadableComponent(() => import('../../routes/PCenter/MessageDemo/index'))

//上传中心组件
const UploadDemo = LoadableComponent(() => import('../../routes/Upload'))


//创作中心
const ContentDemo = LoadableComponent(() => import('../../routes/Content/index'))

const ContentDetail = LoadableComponent(() => import('../../routes/Content/ContentDetail'))

//申诉中心
const Appeal = LoadableComponent(() => import ('../../routes/Appeal/index'))
const NewAppeal = LoadableComponent(() => import('../../routes/Appeal/NewAppeal'))
const AppealDetail = LoadableComponent(() => import('../../routes/Appeal/appealDetail'))

//管理中心组件
const FeatureManage = LoadableComponent(() => import('../../routes/DBManage/featureManage'))
const UserManage = LoadableComponent(() => import('../../routes/DBManage/userManage'))
const VideoManage = LoadableComponent(() => import('../../routes/DBManage/videoManage'))
const AppealManage = LoadableComponent(() => import('../../routes/DBManage/AppealManage'))
const AppealManageDetail = LoadableComponent(() => import('../../routes/DBManage/AppealManageDetail'))

//帮助组件
const Help = LoadableComponent(() => import('../../routes/Help/index'))
const HelpDetail = LoadableComponent(() => import('../../routes/Help/HelpDetail'))

//反馈组件
const FeedBackDemo = LoadableComponent(() => import('../../routes/Feedback/index'))

//关于组件
const About = LoadableComponent(() => import('../../routes/About/index'))

@withRouter
class ContentMain extends React.Component {
    render() {
        return (
            <div style={{padding: 16, position: 'relative'}}>
                <Switch>
                    {/*首页*/}
                    <PrivateRoute exact path='/home' component={Home}/>
                    {/*公告*/}
                    <PrivateRoute exact path='/home/notice' component={VerifyNoticeDemo}/>
                    {/*个人中心*/}
                    <PrivateRoute exact path='/home/personalCenter/information' component={PInformationDemo}/>
                    <PrivateRoute exact path='/home/personalCenter/account' component={AccountDemo}/>
                    <PrivateRoute exact path='/home/personalCenter/messages' component={MessageDemo}/>
                    {/*上传中心*/}
                    <PrivateRoute exact path='/home/upload' component={UploadDemo}/>

                    {/*创作中心*/}

                    <PrivateRoute exact path='/home/content' component={ContentDemo}/>
                    <PrivateRoute path='/home/content/:id' component={ContentDetail}/>
                    {/*申诉中心*/}
                    <PrivateRoute exact path='/home/appeal' component={Appeal}/>
                    <PrivateRoute exact path='/home/appeal/new' component={NewAppeal}/>
                    <PrivateRoute path='/home/appeal/:id' component={AppealDetail}/>
                    {/*管理中心*/}
                    <PrivateRoute exact path='/home/dbmanage/feature' component={FeatureManage}/>
                    <PrivateRoute exact path='/home/dbmanage/user' component={UserManage}/>
                    <PrivateRoute exact path='/home/dbmanage/video' component={VideoManage}/>
                    <PrivateRoute exact path='/home/dbmanage/appeal' component={AppealManage}/>
                    <PrivateRoute path='/home/dbmanage/appeal/:id' component={AppealManageDetail}/>
                    {/*问题反馈*/}
                    <PrivateRoute exact path='/home/feedback' component={FeedBackDemo}/>
                    {/*帮助*/}
                    <PrivateRoute exact path='/home/help' component={Help}/>
                    <PrivateRoute path='/home/help/:id' component={HelpDetail}/>
                    {/*关于*/}
                    <PrivateRoute exact path='/home/about' component={About}/>

                    {/*重定向*/}
                    <Redirect exact from='/' to='/home'/>
                    <Redirect to='/home'/>
                </Switch>
            </div>
        )
    }
}

export default ContentMain
