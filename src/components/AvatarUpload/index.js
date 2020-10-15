import React from "react";
import ApiUtil from "../../utils/ApiUtil";
import {Avatar, Button, Upload, Icon, message, Modal, Divider} from "antd";
import {isAuthenticated} from "../../utils/Session";
import axios from 'axios'

class AvatarUpload extends React.Component {
    state = {
        upload: false,
        visible: false,
        loading: false,

    }

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    render() {
        let _this = this;
        const prop = {
            name: 'file',
            action: ApiUtil.URL_IP + '/api/avatar/upload/' + isAuthenticated(),
            showUploadList: false,
            beforeUpload(file) {
                _this.setState({visible: true, loading: true})
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJpgOrPng) {
                    _this.setState({visible: false})
                    message.error('你只能上传 JPG/PNG 文件!');
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    _this.setState({visible: false})
                    message.error('图像必须小于 2MB!');
                }
                return isJpgOrPng && isLt2M;
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    _this.setState({loading: true, visible: true})
                }
                if (info.file.status === 'done') {
                    _this.setState({loading: false, visible: true})
                    _this.getBase64(info.file.originFileObj, imageUrl =>
                        _this.setState({
                            imageUrl,
                            loading: false,
                        }),
                    );
                } else if (info.file.status === 'error') {
                    _this.setState({visible: false, loading: false})
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <div>
                <Avatar size={100}
                        src={this.props.name === undefined ? '' : `${ApiUtil.URL_IP}/api/getAvatar/${this.props.name}`}/>
                <br/>
                <Upload {...prop}>
                    <Button>
                        <Icon type="upload"/> 更改头像
                    </Button>
                </Upload>
                <Modal
                    centered
                    footer={null}
                    closable={false}
                    visible={this.state.visible}
                    onOk={() => this.setState({visible: false})}
                >
                    {this.state.loading === true ? <div style={{textAlign: "center", marginTop: 50, marginBottom: 50}}>
                        <Icon style={{fontSize: 30}} type="loading"/>
                        <div>
                            上传中，请稍后
                        </div>
                    </div> : <div>
                        <img src={`${ApiUtil.URL_IP}/api/tmpPic/${isAuthenticated()}`} width={'100%'} alt='avatar'/>
                        <Divider/>
                        <div style={{marginTop: 10}}>
                            <Button onClick={() => {
                                axios({
                                    url: ApiUtil.URL_IP + '/api/cancelAvatarChange/' + isAuthenticated(),
                                    method: 'get'
                                }).then(() => {
                                    this.setState({
                                        loading: false,
                                        visible: false,
                                    })
                                })
                            }}>
                                取消
                            </Button>
                            <Button style={{marginLeft: 10}} type={"primary"} onClick={() => {
                                axios({
                                    url: ApiUtil.URL_IP + '/api/confirmAvatarChange/' + isAuthenticated(),
                                    method: "get"
                                }).then(res => {
                                    console.log(res.data)
                                    if (res.data.code === 0) {
                                        this.setState({
                                            visible: false,
                                            loading: false
                                        })
                                        Modal.confirm({
                                            title: '头像更改成功！',
                                            icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/>,
                                            content: '刷新界面后可看到最新头像，现在刷新吗？',
                                            centered:true,
                                            okText:'现在刷新',
                                            cancelText:'稍后刷新',
                                            onOk() {
                                                window.location.reload(true);
                                            },
                                        });

                                    } else {
                                        this.setState({
                                            visible: false,
                                            loading: false
                                        })
                                        message.error('更改失败，请重新再试', 1000)
                                    }
                                })
                            }}>
                                使用这张图片
                            </Button>
                        </div>

                    </div>}
                </Modal>
            </div>


        );
    }
}

export default AvatarUpload