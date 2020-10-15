import React from 'react'
import {
    Card,
    Icon,
    Upload,
    message,
    BackTop,
    Spin,
    Input,
    DatePicker,
    Button,
    Modal,
    Table,
    Drawer,
    Typography, Tag, Tooltip
} from 'antd'
import CustomBreadcrumb from '../../components/CustomBreadcrumb'
import {isAuthenticated} from "../../utils/Session";
import ApiUtil from "../../utils/ApiUtil";
import HttpUtil from "../../utils/HttpUtil";


import {formatFileSize, getfilemd5sum} from "../../utils/utils";
import {Link} from "react-router-dom";
import moment from "moment";
import Highlighter from "react-highlight-words";
import axios from 'axios'


const Dragger = Upload.Dragger;

const {RangePicker} = DatePicker;
const dateFormat = 'YYYY-MM-DD'
const {Text} = Typography;

function deleteFile(filename, fileList) {
    //上传失败，在上传列表中删除上传失败的文件
    let index = -1;
    for (let i = 0; i < fileList.length; i++) {
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

            message.success({content: `${info.file.name} 文件上传成功，后台正在构建特征`, key});
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

class VideoManageDemo extends React.Component {

    constructor() {

        super(); //这句也很重要,这样才能在里面继承this

        this.state = {
            visible: false,
            loading: true,
            data: [],
            selectedRowKeys: [], // Check here to configure the default column
            searchName: '',
            searchSTime: null,
            searchETime: null,
            searchAuth: "",
            searchID: '',
            deleteList: [],
            deleteConfirmVisible: false

        }
        this.beforeUpload = this.beforeUpload.bind(this)
        //this.click  = this.click.bind(this);  //这句是关键,没有加就会如上的错误,自己可以尝试下
        this.toggleLoading = this.toggleLoading.bind(this)
    }

    getTagColor(state) {
        if (state === '审核中')
            return 'blue'
        else if (state === '审核通过')
            return 'green'
        else
            return 'red'
    }

    getNameFilter = () => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`搜索 视频名称`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => {
                        confirm();
                        this.setState({
                            searchName: selectedKeys[0],
                        });
                    }}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => {
                        confirm();
                        this.setState({
                            searchName: selectedKeys[0],
                        });
                    }}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    搜索
                </Button>
                <Button onClick={() => {
                    clearFilters();
                    this.setState({searchName: ''});
                }} size="small" style={{width: 90}}>
                    重置
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record['name']
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            <Highlighter
                highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                searchWords={[this.state.searchName]}
                autoEscape
                textToHighlight={text.toString()}
            />

    });
    getAuthFilter = () => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`搜索 视频名称`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => {
                        confirm();
                        this.setState({
                            searchAuth: selectedKeys[0],
                        });
                    }}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => {
                        confirm();
                        this.setState({
                            searchAuth: selectedKeys[0],
                        });
                    }}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    搜索
                </Button>
                <Button onClick={() => {
                    clearFilters();
                    this.setState({searchAuth: ''});
                }} size="small" style={{width: 90}}>
                    重置
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record['auth']
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            <Highlighter
                highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                searchWords={[this.state.searchAuth]}
                autoEscape
                textToHighlight={text.toString()}
            />

    });
    getIDFilter = () => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`搜索 视频名称`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => {
                        confirm();
                        this.setState({
                            searchID: selectedKeys[0],
                        });
                    }}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => {
                        confirm();
                        this.setState({
                            searchID: selectedKeys[0],
                        });
                    }}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    搜索
                </Button>
                <Button onClick={() => {
                    clearFilters();
                    this.setState({searchID: ''});
                }} size="small" style={{width: 90}}>
                    重置
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record['id']
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            <Highlighter
                highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                searchWords={[this.state.searchID]}
                autoEscape
                textToHighlight={text.toString()}
            />

    });
    getDateFilter = () => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>

                <RangePicker
                    ranges={{
                        '今天': [moment(), moment()],
                        '本月': [moment().startOf('month'), moment().endOf('month')],
                    }}
                    value={selectedKeys[0]}

                    style={{marginBottom: -10, display: 'block'}}
                    onChange={(values) => {
                        setSelectedKeys(values ? [values] : [])
                        this.setState({
                            searchSTime: values[0],
                            searchETime: values[1]
                        })
                    }}
                    format={dateFormat}
                />
                <br/>
                <Button
                    type="primary"
                    onClick={() => {
                        confirm();
                    }}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    搜索
                </Button>
                <Button onClick={() => {
                    clearFilters();
                    this.setState({
                        searchSTime: null,
                        searchETime: null
                    });
                }} size="small" style={{width: 90}}>
                    重置
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="filter" theme='filled' style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            moment(record.uploadTime) >= value[0] && moment(record.uploadTime) <= value[1],


    });
    columns = [
        {
            title: '预览',
            dataIndex: 'icon',
            key: 'icon',
            render: src => <img src={src} alt="" width="100px"/>,
            width: 60
        },
        {
            title: '视频ID',
            dataIndex: 'id',
            key: 'id',
            ...this.getIDFilter(),
        },
        {
            title: '视频名称',
            dataIndex: 'name',
            key: 'name',
            ...this.getNameFilter(),
        },
        {
            title: "视频类型",
            dataIndex: 'type',
            key: 'type',
            filters: [{
                text: 'mp4',
                value: 'mp4',
            }, {
                text: 'rmvb',
                value: 'rmvb',
            }],
            onFilter: (value, record) => record.type === value,
            render: type => <Tag color="#2db7f5">{type}</Tag>
        },
        {
            title: "视频时长",
            dataIndex: 'timeLength',
            key: 'timeLength',
        },
        {
            title: '文件大小',
            dataIndex: 'size',
            key: 'size',
            sorter: (a, b) => a.size - b.size,
            render: size => formatFileSize(size)
        },
        {
            title: '上传日期',
            dataIndex: 'uploadTime',
            key: 'uploadTime',
            ...this.getDateFilter(),
            sorter: (a, b) => moment(a.uploadTime) - moment(b.uploadTime),
            defaultSortOrder: 'descend',
        },
        {
            title: '上传者',
            dataIndex: 'auth',
            key: 'auth',
            ...this.getAuthFilter(),
        },
        {
            title: '审核状态',
            dataIndex: 'state',
            key: 'state',
            filters: [{
                text: '审核中',
                value: '审核中',
            }, {
                text: '审核通过',
                value: '审核通过',
            }, {
                text: '不通过',
                value: '不通过',
            }],
            onFilter: (value, record) => record.state === value,
            render: state => (<Tag color={this.getTagColor(state)} key={state}>{state}</Tag>)
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <span>
                     <Link to={`/home/content/${record.id}`}>
                            <Tooltip title={'查看该审核的详细内容'}>
                                <Button type='primary' shape='round' size='small' icon="search">
                                    查看
                                </Button>
                            </Tooltip>
                        </Link>
                </span>
                </span>
            ),
        }];

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
                                message.loading({content: `校验成功，正在上传 ${file.name} `, key, duration: 0})
                                reslove(file)
                            }

                        }
                    ).catch(error => {
                    reject()
                    message.error({content: error.message, key, duration: 2});
                });
            }).catch(error => {
                reject()
                message.error({content: error.message, key, duration: 2})
            })

        })
        return promise

    }

// 获取用户列表
    getData() {
        // 调用后台API获取列表数据，并将返回的数据设置到state中
        HttpUtil.get(ApiUtil.API_VIDEO_LIST)
            .then( // 等待两次请求依次完成了才刷新界面
                recordList => {
                    this.setState({
                        data: recordList,
                        loading: false,
                    });
                }
            ).catch(error => {
            message.error(error.message);
            this.setState({loading: false})
        });
    }

    componentDidMount() {

        window.addEventListener('resize', this.handleWindowWidth);
    }

    componentWillMount() {
        this.getData();
    }

    onSelectChange = selectedRowKeys => {
        this.setState({selectedRowKeys});
    };

    handleTextChange() {

    }

    handleFilterChange() {

    }

    createUser() {
        this.setState({
            visible: true,
        });
    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    editUser() {

    }

    deleteVideo() {
        axios({
            url: ApiUtil.URL_IP + '/api/deleteManyFile',
            method: 'post',
            data: this.state.deleteList
        }).then(
            res => {
                if (res.data.code === 0) {
                    message.success('删除成功')
                } else {
                    message.error('删除失败，请重新再试！')
                    res.data.data.forEach((item) => {
                        message.error('删除' + item + '失败！')
                    })
                }
                this.getData()
                this.setState({deleteConfirmVisible: false})
            }
        )
    }

    onSelectChange = selectedRowKeys => {
        this.setState({selectedRowKeys});
        let list = []
        this.state.data.forEach((item) => {
            if (selectedRowKeys.indexOf(item.key) !== -1) {
                let vd = {
                    key: item.id,
                    id: item.id,
                    name: item.name,
                }
                list.push(vd)

            }
        })
        this.setState({
            deleteList: list
        })
    };

    render() {
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <CustomBreadcrumb arr={['数据管理', '数据库管理']}/>
                <Card style={{marginTop: 10}}>
                    <Button type="primary" icon='upload' onClick={this.createUser.bind(this)}
                            style={{}}>上传视频</Button>
                    <Button type="danger" icon='delete' onClick={() => this.setState({deleteConfirmVisible: true})}
                            disabled={!hasSelected}
                            style={{marginLeft: 10}}>删除视频</Button>
                    <span style={{marginLeft: 8}}>
                     {hasSelected ? `已选 ${selectedRowKeys.length} 项` : ''}
                    </span>
                    <Spin spinning={this.state.loading} size="large" delay={500}>
                        <Table rowSelection={rowSelection} dataSource={this.state.data} columns={this.columns}
                               style={{marginTop: 15}}/>
                    </Spin>
                </Card>
                <Drawer
                    title="上传视频"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{paddingBottom: 80}}

                >

                    <Card bordered={false} className='card-item' title='拖拽上传'>

                        <Dragger action={ApiUtil.API_FILE_ADD_VIDEO_TO_DB + isAuthenticated()}
                                 beforeUpload={this.beforeUpload.bind(this)}{...props2}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox"/>
                            </p>
                            <p className="ant-upload-text">点击或拖拽到此处完成上传</p>
                            <p className="ant-upload-hint">支持单个或批量上传。严禁上传公司数据或其他带文件</p>
                        </Dragger>
                        <br/>
                        <Text type='danger' style={{marginTop: 15}}>*此处上传的视频将会略过视频检索部分，直接进入版权库</Text>
                    </Card>
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClose} style={{marginRight: 8}}>
                            取消
                        </Button>
                        <Button onClick={this.onClose} type="primary">
                            提交
                        </Button>
                    </div>
                </Drawer>
                <Modal
                    title="删除视频"
                    visible={this.state.deleteConfirmVisible}
                    onCancel={() => {
                        this.setState({deleteConfirmVisible: false})
                    }}
                    footer={[
                        <Button key="back" onClick={() => {
                            this.setState({deleteConfirmVisible: false})
                        }}>
                            取消
                        </Button>,
                        <Button key="submit" type="danger" onClick={
                            () => {
                                this.deleteVideo()
                            }
                        }>
                            确认
                        </Button>,
                    ]}
                >
                    请确认您要删除的视频：
                    <br/>
                    <br/>
                    {this.state.deleteList.map((item, index) => {
                        return <div key={index}>{item.name}</div>
                    })}
                </Modal>
                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}

export default VideoManageDemo