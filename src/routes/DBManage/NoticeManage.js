import React from "react";
import axios from "axios";
import ApiUtil from "../../utils/ApiUtil";
import {Button, Modal, Spin, Table, Icon, message, DatePicker, Input} from "antd";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import MyCard from "../../components/MyCard/MyCard";
import moment from "moment";
import './style.css'
import {Editor} from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from 'html-to-draftjs';
import {convertToRaw, ContentState, EditorState} from "draft-js";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {isAuthenticated} from "../../utils/Session";
import locale from 'antd/es/date-picker/locale/zh_CN';

class NoticeManage extends React.Component {
    state = {
        notices: [],
        previewVisible: false,
        cNotice: {},
        loading: true,
        editVisible: false,
        newVisible: false,
        newEditor: EditorState.createEmpty(),
        newTitle: '',
        editor: null,
        editTitle: '',
        editAuth: '',
        editTime: '',
        editID: '',
        value: ''
    }

    getData() {
        axios(
            {
                method: 'get',
                url: ApiUtil.URL_IP + "/api/noticeList"
            }
        ).then(res => {


            this.setState({notices: res.data.data.notices, loading: false})
        })
    }

    componentDidMount() {
        this.getData()
    }

    columns = [
        {
            dataIndex: 'icon',
            key: 'icon',
            render: text => <Icon type="notification"/>,
            width: 15
        }
        ,
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <a onClick={() => this.setState({previewVisible: true, cNotice: record})}
                                         className='title'>{text}</a>
        },
        {
            title: '发布人',
            dataIndex: 'publisher',
            key: 'publisher',
            width: 200,
        },
        {
            title: '发布日期',
            dataIndex: 'time',
            key: 'time',
            width: 200,
        },
        {
            title: '操作',
            dataIndex: 'operator',
            key: 'operator',
            width: 300,
            render: (text, record) => (
                <span>
                    <Button icon='edit' onClick={() => this.setState({
                        editVisible: true,
                        editTitle: record.title,
                        editAuth: record.publisher,
                        editTime: record.time,
                        editID:record.id,
                        cNotice: record,
                        editor: EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(record.content).contentBlocks))
                    })}>编辑</Button>
                    <Button style={{marginLeft: 10}} icon='eye'
                            onClick={() => this.setState({previewVisible: true, cNotice: record})}>查看</Button>
                    <Button style={{marginLeft: 10}} icon='delete' onClick={() => {
                        let _this = this
                        Modal.confirm({
                            title: '你确定要删除这个公告吗?',
                            okText: '删除',
                            okType: 'danger',
                            cancelText: '取消',
                            onOk() {
                                axios({
                                    url: ApiUtil.URL_IP + '/api/deleteNotice/' + record.id,
                                    method: 'get'
                                }).then(res => {
                                    if (res.data.code === 0) {
                                        message.success("删除成功！")
                                        _this.getData()
                                    } else {
                                        message.error("删除失败！")
                                    }
                                })
                            }
                        })
                    }}>删除</Button>
                </span>)
        }
    ]

    showConfirm = () => {
        let _this = this
        Modal.confirm({
            title: '你确定要发布这条公告吗',
            okText: "确定",
            cancelText: "取消",
            onOk() {

                let content = draftToHtml(convertToRaw(_this.state.newEditor.getCurrentContent()))
                let data = {
                    content: content,
                    publisher: isAuthenticated(),
                    title: _this.state.newTitle
                }
                axios({
                    url: ApiUtil.URL_IP + '/api/newNotice',
                    method: 'post',
                    data: data
                }).then(res => {
                    if (res.data.code === 0) {
                        message.success("发布成功")
                        _this.getData()
                        _this.setState({newVisible: false, newTitle: '', newEditor: EditorState.createEmpty(),})
                    } else {
                        message.error('发布失败')
                    }
                })
            },
        });
    }
    showConfirm2 = () => {
        let _this = this
        Modal.confirm({
            title: '你确定要更改这条公告吗',
            okText: "确定",
            cancelText: "取消",
            onOk() {

                let content = draftToHtml(convertToRaw(_this.state.editor.getCurrentContent()))
                let data = {
                    content: content,
                    publisher: _this.state.editAuth,
                    title: _this.state.editTitle,
                    time: _this.state.editTime,
                    id: _this.state.editID,
                }
                axios({
                    url: ApiUtil.URL_IP + '/api/updateNotice',
                    method: 'post',
                    data: data
                }).then(res => {
                    if (res.data.code === 0) {
                        message.success("发布成功")
                        _this.getData()
                        _this.setState({
                            editVisible: false,
                            editTitle: '',
                            editor: EditorState.createEmpty(),
                            editAuth: ''
                        })
                    } else {
                        message.error('发布失败')
                    }
                })
            },
        });
    }
    handleNewTitleChange = e => {
        this.setState({newTitle: e.target.value})
    }
    handleEditTitleChange = e => {
        this.setState({editTitle: e.target.value})
    }
    onNewEditorStateChange = (editorState) => {
        this.setState({
            newEditor: editorState,
        });
    };
    onEditorStateChange = (editorState) => {
        this.setState({
            editor: editorState,
        });
    };
    handleEditAuthChange = e => {
        this.setState({editAuth: e.target.value})
    }
    handleTimeChange = (value, dateString) => {
        this.setState({
            value: value,
            editTime: dateString
        })
    }

    handleTimeConfirm = (value) => {
        this.setState({
            value: value,
            editTime: value.format('YYYY-MM-DD HH:mm:ss')
        })
    }

    render() {

        const {newEditor, editor} = this.state
        return (
            <div>
                <CustomBreadcrumb arr={['管理','公告管理']}/>
                <MyCard title={'公告'}>
                    <Button icon='upload' onClick={() => this.setState({newVisible: true})}>发布公告</Button>
                    <Button icon='reload' onClick={() => this.getData()}>刷新</Button>
                    <Spin spinning={this.state.loading} size="large" delay={500}>
                        <Table dataSource={this.state.notices} columns={this.columns}
                               style={{marginTop: 20}}/>
                    </Spin>
                </MyCard>
                {/*公告发布Modal*/}
                <Modal title='发布公告' width={800}
                       visible={this.state.newVisible}
                       onOk={() => this.setState({newVisible: false})}
                       onCancel={() => this.setState({newVisible: false})}
                       footer={null}
                >
                    <div style={{marginTop: "20px"}}>
                        <span style={{whiteSpace: "pre"}}>标   题：</span>
                        <Input value={this.state.newTitle} onChange={this.handleNewTitleChange}
                               style={{width: "50%"}}/>
                    </div>
                    <div style={{marginTop: "20px"}}>
                        <div style={{whiteSpace: "pre"}}>正 文：</div>
                        <div className="editor-wrapper">
                            <Editor
                                editorState={newEditor}
                                wrapperClassName="demo-wrapper"
                                editorClassName="editor-class"
                                localization={{
                                    locale: 'zh',
                                }}
                                onEditorStateChange={this.onNewEditorStateChange}
                            />
                        </div>
                    </div>
                    <Button type="primary" style={{marginLeft: 20}} onClick={this.showConfirm}>发布</Button>
                </Modal>
                <Modal title='编辑公告' width={800}
                       visible={this.state.editVisible}
                       onOk={() => this.setState({editVisible: false})}
                       onCancel={() => this.setState({editVisible: false})}
                       footer={null}
                >
                    <div style={{marginTop: "20px"}}>
                        <span style={{whiteSpace: "pre"}}>标   题：</span>
                        <Input value={this.state.editTitle} onChange={this.handleEditTitleChange}
                               style={{width: "50%"}}/>
                    </div>
                    <div style={{marginTop: "20px"}}>
                        <span style={{whiteSpace: "pre"}}>发 布 人：</span>
                        <Input value={this.state.editAuth} onChange={this.handleEditAuthChange}
                               style={{width: "50%"}}/>
                    </div>
                    <div style={{marginTop: "20px"}}>
                        <span style={{whiteSpace: "pre"}}>发布时间：</span>
                        <DatePicker showTime locale={locale} value={moment(this.state.editTime)} placeholder="选择发布时间"
                                    onChange={this.handleTimeChange}
                                    onOk={this.handleTimeConfirm}/>
                    </div>
                    <div style={{marginTop: "20px"}}>
                        <div style={{whiteSpace: "pre"}}>正 文：</div>
                        <div className="editor-wrapper">
                            <Editor
                                editorState={editor}
                                wrapperClassName="demo-wrapper"
                                editorClassName="editor-class"
                                localization={{
                                    locale: 'zh',
                                }}
                                onEditorStateChange={this.onEditorStateChange}
                            />
                        </div>
                    </div>
                    <Button type="primary" style={{marginLeft: 20}} onClick={this.showConfirm2}>更改</Button>
                </Modal>
                <Modal title='公告查看' width={800}
                       visible={this.state.previewVisible}
                       onOk={() => this.setState({previewVisible: false})}
                       onCancel={() => this.setState({previewVisible: false})}
                       footer={
                           <Button onClick={() => this.setState({previewVisible: false})}>
                               确定
                           </Button>
                       }
                >
                    <div style={{fontSize: 20, textAlign: "center"}}>
                        {this.state.cNotice.title}
                    </div>
                    <div style={{color: "gray", marginTop: 20, textAlign: "right"}}>
                        {this.state.cNotice.publisher}
                    </div>
                    <div style={{color: "gray", marginTop: 10, textAlign: "right"}}>
                        {this.state.cNotice.time}
                    </div>
                    <div style={{minHeight: 400, marginTop: 20, fontSize: 14}}
                         dangerouslySetInnerHTML={{__html: this.state.cNotice.content}}/>
                </Modal>
            </div>
        );
    }
}

export default NoticeManage