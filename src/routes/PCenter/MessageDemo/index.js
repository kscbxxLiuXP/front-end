import React from 'react'
import {
    Select,
    Spin,
    Tabs,
    Icon,
    Menu,
    BackTop,
    Modal,
    Tag,
    Drawer,
    Dropdown,
    Input,
    Button,
    Divider, Table, Tooltip, message
} from 'antd'
import CustomBreadcrumb from "../../../components/CustomBreadcrumb/index";
import debounce from 'lodash/debounce';
import BraftEditor from "braft-editor";
import 'braft-editor/dist/index.css'
import axios from 'axios'
import ApiUtil from "../../../utils/ApiUtil";
import {isAuthenticated} from "../../../utils/Session";
import {EditorState, convertToRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css'

const {confirm} = Modal
const {TabPane} = Tabs;
const {Option} = Select;


class MessageDemo extends React.Component {
    constructor(props) {
        super(props);
        this.lastFetchId = 0;
        this.fetchUser = debounce(this.fetchUser, 800);
        this.showDrawer = this.showDrawer.bind(this)
    }

    state = {
        visible: false,
        currentMessage: {},
        msgContent: '',
        msgData: [],
        selectdata: [],
        value: [],
        subject: '',
        preview: false,
        fetching: false,
        editorState: BraftEditor.createEditorState(),
        editor: EditorState.createEmpty(),


    }
    handleEditorChange = (editorState) => {
        this.setState({editorState})
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editor: editorState,
        });
    };
    preview = () => {
        this.setState({preview: true})

    }

    buildPreviewHtml() {

        return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${this.state.editorState.toHTML()}</div>
        </body>
      </html>
    `

    }

    fetchUser = value => {
        console.log('fetching user', value);
        if (value.trim() === '')
            return
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        this.setState({selectdata: [], fetching: true});

        axios({
            method: 'get',
            url: ApiUtil.URL_IP + '/api/fetch/' + value
        }).then(res => {
                if (fetchId !== this.lastFetchId) {
                    // for fetch callback order
                    return;
                }
                const selectdata = res.data.data
                this.setState({selectdata, fetching: false});
            }
        )
    };
    handleChange = value => {
        this.setState({
            value,
            selectdata: [],
            fetching: false,
        });
    };
    handleSubjectChange = e => {
        this.setState({subject: e.target.value})
    }

    handleMenuClick(e) {
        console.log('click', e);
    }

    showDrawer = (record, e) => {
        console.log(record)
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    handleSubmit = () => {
        let receivers = this.state.value

        if (this.state.value.length === 0) {
            Modal.error({title: '请填写收件人！'})
            return
        }
        if (this.state.subject === '') {
            Modal.error({title: '请填写主题！'})
            return
        }
        let msg = {
            mFrom: isAuthenticated(),
            mTo: this.state.value.map((item, index) => {
                return item.key
            }),
            content: draftToHtml(convertToRaw(this.state.editor.getCurrentContent())),
            subject: this.state.subject
        }
        console.log(msg)
        axios({
            url: ApiUtil.URL_IP + '/api/sendMessage',
            method: 'post',
            data: msg
        }).then(res => {
            let result = res.data.code
            if (result === 0) {
                message.success("发送成功！")
                this.setState({subject: '', value: [], editor: EditorState.createEmpty(),})

            } else {
                message.error("发送失败！")
            }
        })
    }

    getData() {
        axios({
            url: ApiUtil.URL_IP + "/api/getMessageList/" + isAuthenticated(),
            method: 'get'
        }).then(res => {
            this.setState({msgData: res.data.data})
        })
    }

    componentDidMount() {
        this.getData()
    }

    setMessageState(id, state) {
        let data = {
            id: id, state: state
        }
        axios(
            {
                url: ApiUtil.URL_IP + '/api/setMessageState',
                method: "post",
                data: data
            }
        ).then(res => {
            if (res.data.code === 1) {
                message.error(res.data.msg)
            }else if(res.data.code===0){

                this.getData()
            }
        }).catch((err) => {
            message.error(err.data.msg)
        })
    }

    deleteMessage(id, e, _this) {
        confirm({
            title: '您确定要删除这个消息吗?',
            content: '删除后将无法恢复',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                axios(
                    {
                        method: 'get',
                        url: ApiUtil.URL_IP + "/api/deleteMessage/" + id

                    }
                ).then(res => {
                    message.success(res.data.msg)
                    const arr = _this.state.msgData.slice()
                    _this.setState({
                        msgData: arr.filter(item => item.id !== id)
                    })
                })
            },
        });
    }

    render() {


        const columns = [
            {
                title: '发件人',
                dataIndex: 'mFrom',
                key: 'mFrom',
                width: 100,
                render: (text, record) => <span>{
                    record.readed === 0 ? <b>{text}</b> : <span>{text}</span>
                }</span>,
                ellipsis: true,
            },
            {
                title: '主题',
                dataIndex: 'subject',
                key: 'subject',
                render: (text, record) => <span>{
                    record.readed === 0 ? <b>{text}</b> : <span>{text}</span>
                }</span>,
            },
            {
                title: '时间',
                dataIndex: 'time',
                key: 'time',
                width: 200,
                render: (text, record) => <span>{
                    record.readed === 0 ? <b>{text}</b> : <span>{text}</span>
                }</span>,
            },
            {
                title: '状态',
                key: 'readed',
                dataIndex: 'readed',
                render: tag => (
                    <span>
                {tag === 0 ? <Tag color='red'>未读</Tag> : <Tag color='green'>已读</Tag>}
      </span>
                ),
                width: 75
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                <Tooltip title={'查看'}>
               <Button type='primary' shape='round' size='small' icon="search"
                       onClick={() => {
                           record.readed = 1
                           this.setState({
                               visible: true,
                               currentMessage: record
                           });
                           this.setMessageState(record.id, 1)
                       }}/>
               </Tooltip>
                <Divider type={"vertical"}/>
               <Dropdown overlay={
                   <Menu onClick={e => {
                       record.readed = e.key
                       this.setMessageState(record.id, e.key)
                       this.forceUpdate()
                   }}>
                       <Menu.Item key="1">已读</Menu.Item>
                       <Menu.Item key="0">未读</Menu.Item>
                   </Menu>
               }>
                    <Tooltip title={'标记为'}>
                          <Button type='primary' shape='round' size='small' icon='flag'>
                             <Icon type="down"/>
                          </Button>
                    </Tooltip>

                </Dropdown>
                <Divider type={"vertical"}/>
                    <Tooltip title={'删除'}>
                        <Button type='danger' shape='round' size='small' icon="delete" onClick={e => {
                            this.deleteMessage(record.id, e, this)
                        }}/>
                    </Tooltip>
            </span>
                ),
                width: 200
            },
        ];


        const {fetching, selectdata, value, editor} = this.state;
        //富文本编辑器设置

        const excludeControls = [
            'letter-spacing',
            'line-height',
            'clear',
            'headings',
            'list-ol',
            'list-ul',
            'remove-styles',
            'superscript',
            'subscript',
            'hr',
            'text-align'
        ]

        const extendControls = [
            {
                key: 'custom-button',
                type: 'button',
                text: '预览',
                onClick: this.preview
            }
        ]

        return (
            <div>
                <CustomBreadcrumb arr={['个人中心', '消息中心']}/>

                <div className="info-card" style={
                    {
                        background: "white",
                        borderRadius: "15px",
                        boxShadow: "0px 0px 20px rgba(137,137,137, 0.1)",
                        marginTop: "20px",
                        marginBottom: "50px",
                        padding: "20px"
                    }}>
                    <Tabs defaultActiveKey="1" onTabClick={() => {
                        this.getData()
                    }} tabBarExtraContent={<Button icon='reload' onClick={()=>this.getData()}>刷新</Button>}>
                        <TabPane tab="收件箱" key="1">
                            <Table columns={columns}
                                   dataSource={this.state.msgData} size='middle'/>
                        </TabPane>
                        <TabPane tab="发件箱" key="2">
                            <div style={{marginLeft: "30px"}}>
                                <div>
                                    <span style={{width: 50, textAlign: "right"}}>收件人：</span>
                                    <Select
                                        mode="multiple"
                                        labelInValue
                                        value={value}
                                        placeholder="选择用户"
                                        loading={fetching}
                                        notFoundContent={fetching ? <Spin size="small"/> : null}
                                        filterOption={false}
                                        onSearch={this.fetchUser}
                                        onChange={this.handleChange}
                                        style={{width: '50%'}}
                                    >
                                        {selectdata.map(d => (
                                            <Option key={d.value}>{d.text}</Option>
                                        ))}
                                    </Select>
                                </div>
                                <div style={{marginTop: "20px"}}>
                                    <span style={{whiteSpace: "pre"}}>主   题：</span>
                                    <Input value={this.state.subject} onChange={this.handleSubjectChange}
                                           style={{width: "50%"}}/>
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
                                    <textarea
                                        disabled
                                        style={{width:'100%' }}
                                        value={draftToHtml(convertToRaw(editor.getCurrentContent()))}
                                    />

                                </div>

                                <Button type="primary" style={{marginTop: 20}} onClick={this.preview}>预览</Button>
                                <Button type="primary" style={{marginLeft: 20}} onClick={this.handleSubmit}>提交</Button>
                            </div>

                        </TabPane>

                    </Tabs>

                </div>
                <Drawer
                    title={`来自${this.state.currentMessage.mFrom}的消息`}
                    placement='right'
                    width={640}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}

                >
                    <div style={{
                        width: '100%',
                        textAlign: "center",
                        fontSize: 18,
                        fontWeight: "bold"
                    }}>{this.state.currentMessage.subject}</div>
                    <div style={{marginTop: 20}} dangerouslySetInnerHTML={{__html: this.state.currentMessage.content}}/>
                </Drawer>
                <Modal visible={this.state.preview}
                       title={'预览'}
                       onOk={() => this.setState({
                           preview: false
                       })}
                       onCancel={() => this.setState({
                           preview: false
                       })}
                       footer={[
                           <Button key="submit" type="primary" onClick={() => this.setState({
                               preview: false
                           })}>
                               确认
                           </Button>,
                       ]}
                       width={800}

                >
                    <div style={{
                        width: '100%',
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "bold"
                    }}>{this.state.subject}</div>
                    <div style={{padding: 20, marginBottom: 50}}
                         dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(this.state.editor.getCurrentContent()))}}/>
                </Modal>
                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}


export default MessageDemo
