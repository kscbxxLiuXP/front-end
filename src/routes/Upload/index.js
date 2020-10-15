import React from 'react'
import {Icon, Upload, message, BackTop, Spin, Row, Col, Badge, Tag} from 'antd'
import CustomBreadcrumb from '../../components/CustomBreadcrumb'

import {isAuthenticated} from "../../utils/Session";
import ApiUtil from "../../utils/ApiUtil";
import HttpUtil from "../../utils/HttpUtil";


import {getfilemd5sum} from "../../utils/utils";
import UserInfoCard from "../../components/UserInfoCard";

const Dragger = Upload.Dragger;


function deleteFile(filename, fileList) {
    //上传失败，在上传列表中删除上传失败的文件
    let index = -1;
    for (var i = 0; i < fileList.length; i++) {
        if (fileList[i] === filename) index = i;
    }
    fileList.splice(index, 1);
    return fileList;
}

const props2 = {
    name: 'file',
    multiple: true,
    onChange(info) {

        if (info.file.status === 'done') {

            message.success({content: `${info.file.name} 文件上传成功`, key});
            console.log('md5' + info.file.md5)
        } else if (info.file.status === 'error') {
            message.error({content: `${info.file.name} 文件上传失败`, key});
        } else if (info.file.status === 'removed') {
            //message.warn(`${info.file.name} 文件删除中……`);
            HttpUtil.get(`${ApiUtil.API_FILE_DELETE_BY_MD5}/${info.file.md5}`)
                .then(
                    re => {
                        message.info(re.data.code === 0 ? '文件删除成功' : '文件删除失败');
                    }
                ).catch(error => {
                message.error(error.message);
            });
        }

    },
    showUploadList: {

        showRemoveIcon: true,

    },
};
const key = 'updatable'

class UploadDemo extends React.Component {
    constructor() {

        super();

        this.state = {
            visible: false,
            avatar: require('../../assets/img/04.jpg')
        }
        this.beforeUpload = this.beforeUpload.bind(this)
        //this.click  = this.click.bind(this);  //这句是关键,没有加就会如上的错误,自己可以尝试下
        this.toggleLoading = this.toggleLoading.bind(this)
    }

    toggleLoading() {
        this.setState({visible: !this.state.visible})
    }

    beforeUpload(file, fileList) {


        message.loading({content: "正在检验文件中,请稍后.......", key, duration: 0})
        const promise = new Promise(function (reslove, reject) {

            message.loading({content: "正在检验文件格式", key, duration: 0});

            const isVIDEO = file.type === 'video/mp4'
            if (!isVIDEO) {
                message.error({content: "您上传的文件不是视频文件或格式不支持！", key, duration: 2});
                fileList = this.deleteFile(file.name, fileList);
                return false;
            }
            message.loading({content: "正在检验文件大小", key, duration: 0});
            const isLt200M = file.size / 1024 / 1024 < 20;
            if (!isLt200M) {

                message.error({content: "视频大小不能超过15MB！", key, duration: 2});
                fileList = this.deleteFile(file.name, fileList);
                return false;
            }
            message.loading({content: "正在检验文件md5值", key, duration: 0});

            const reader = new FileReader();
            reader.readAsDataURL(file);
            let filemd5;

            getfilemd5sum(file).then(value => {
                filemd5 = value
                file.md5 = filemd5
                HttpUtil.get(ApiUtil.API_CHECK_FILE_MD5 + filemd5)
                    .then(
                        re => {

                            if (re.code === 1) {
                                //存在MD5值
                                message.error({content: '该文件已经上传过啦！！', key})
                                fileList = deleteFile(file.name, fileList);
                                reject()
                            } else {
                                message.success({content: `校验成功，正在上传 ${file.name} `, key, duration: 0})
                                reslove(file)
                            }

                        }
                    ).catch(error => {
                    reject()
                    message.error(error.message);
                });
            }).catch(error => {
                reject()
                message.error(error.message)
            })

        })
        return promise

    }


    render() {

        return (
            <div>
                <CustomBreadcrumb arr={['上传中心']}/>
                <Row gutter={30}>
                    <Col span={6}>
                        <UserInfoCard name={isAuthenticated()}/>
                    </Col>
                    <Col span={18}>
                        <div className="info-card" style={
                            {
                                background: "white",
                                borderRadius: "15px",
                                boxShadow: "0px 0px 20px rgba(137,137,137, 0.1)",
                                marginTop: "20px",
                                marginBottom: "50px",
                                padding: "20px"
                            }}>
                            <div style={{
                                fontWeight: "bold",
                                marginLeft: "30px",
                                marginBottom: "20px",
                                fontSize: "18px"
                            }}>提示
                            </div>
                            <div style={{marginLeft: "60px"}}>

                                <div style={{marginTop: 10}}>
                                    <Badge status="success"/><b>上传</b>是您需要检测的视频文件通过网页或者上传工具发布到服务器上的过程。
                                </div>
                                <div style={{marginTop: 10}}><Badge status="success"/>您可以点击下方的上传按钮</div>
                                <div style={{marginTop: 10}}><Badge status="success"/>您也可以直接将文件拖拽到此页面</div>
                                <div style={{marginTop: 10}}><Badge status="success"/>
                                    文件格式必须是视频文件,包括：
                                    <Tag color="#2db7f5">mp4</Tag>
                                    <Tag color="#2db7f5">rmvb</Tag>
                                    <Tag color="#2db7f5">avi</Tag>
                                    <Tag color="#2db7f5">mov</Tag>等
                                </div>
                                <div style={{marginTop: 10}}><Badge status="success"/>文件大小不得超过 <Tag
                                    color="#f50">15MB</Tag></div>
                            </div>
                        </div>

                        <Spin tip='验证中。。。。' spinning={this.state.visible}>
                            <div className="info-card" style={
                                {
                                    background: "white",
                                    borderRadius: "15px",
                                    boxShadow: "0px 0px 20px rgba(137,137,137, 0.1)",
                                    marginTop: "20px",
                                    marginBottom: "50px",
                                    padding: "20px",
                                    height:'330px'
                                }}>
                                <div style={{
                                    fontWeight: "bold",
                                    marginLeft: "30px",
                                    marginBottom: "20px",
                                    fontSize: "18px"
                                }}>上传
                                </div>
                                <div  style={{height:230}}>
                                    <Dragger action={ApiUtil.API_FILE_UPLOAD + isAuthenticated()}
                                             beforeUpload={this.beforeUpload.bind(this)} {...props2}>
                                        <p className="ant-upload-drag-icon">
                                            <Icon type="inbox"/>
                                        </p>
                                        <p className="ant-upload-text">点击或拖拽到此处完成上传</p>
                                        <p className="ant-upload-hint">支持单个或批量上传。严禁上传公司数据或其他带文件</p>
                                    </Dragger>
                                </div>

                            </div>
                        </Spin>
                    </Col>
                </Row>

                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}


export default UploadDemo
