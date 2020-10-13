import React from 'react'
import {
    Table,
    Tag,
    Spin,
    DatePicker,
    message,
    Input,
    Icon,
    Button,
    Tooltip,
    BackTop,
    Badge,
    Divider,
    Modal,
} from 'antd'
import Highlighter from 'react-highlight-words';
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import HttpUtil from "../../utils/HttpUtil";
import ApiUtil from "../../utils/ApiUtil";
import {isAuthenticated} from "../../utils/Session";
import {Link} from "react-router-dom";
import {formatFileSize} from "../../utils/utils";
import moment from 'moment'
import axios from "axios";

const {RangePicker} = DatePicker;
const dateFormat = 'YYYY-MM-DD'

class ContentDemo extends React.Component {
    state = {
        loading: true,
        data: [],
        searchName: '',
        searchSTime: null,
        searchETime: null

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
                    clearFilters(),
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
    getDateFilter = () => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>

                <RangePicker
                    ranges={{
                        '今天': [moment(), moment()],
                        '本月': [moment().startOf('month'), moment().endOf('month')],
                    }}
                    ref={node => {
                        this.searchRange = node;
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
                    clearFilters(), this.setState({
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
                     <Link to={`/home/content/${record.id}`}>
                            <Tooltip title={'查看该审核的详细内容'}>
                                <Button type='primary' shape='round' size='small' icon="search">
                                    查看
                                </Button>
                            </Tooltip>
                        </Link>
                    <Divider type='vertical'/>
                      <Tooltip title={'删除'}>
                    <Button shape='round' size='small' type='danger' onClick={()=>{
                        let _this = this
                        Modal.confirm({
                            title: '您确定要删除这个视频吗？',
                            content: '删除后将无法恢复',
                            okText: '确定',
                            okType: 'danger',
                            cancelText: '取消',
                            onOk() {
                                axios({
                                    url: ApiUtil.URL_IP + '/api/deleteFile/' + record.id,
                                    method: 'get',
                                }).then(res => {
                                    if (res.data.code === 0) {
                                        message.success('删除成功！')
                                        _this.getData()
                                    } else {
                                        message.error('删除失败，请稍后再试！')
                                    }
                                })
                            },
                        });
                    }} icon={'delete'}/>
                      </Tooltip>
                </span>
            ),
        }];


    // 获取帖子列表
    getData() {
        // 调用后台API获取列表数据，并将返回的数据设置到state中
        HttpUtil.get(ApiUtil.API_VERIFY_RECORD + isAuthenticated())
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
        this.getData();
        window.addEventListener('resize', this.handleWindowWidth);
    }

    render() {
        const cardContent = `<ul class="card-ul">
            <li>在本页面您可以查看您的创作列表以及审核情况</li>
               <li>点击“查看”进行更详细的查看</li>
          </ul>`
        return (
            <div>
                <CustomBreadcrumb arr={['我的创作']}/>
                <div className="info-card" style={
                    {
                        background: "white",
                        borderRadius: "15px",
                        boxShadow: "0px 0px 20px rgba(137,137,137, 0.1)",
                        marginTop: "20px",
                        marginBottom: "20px",
                        padding: "20px"
                    }}>
                    <div style={{marginLeft: "30px"}}>
                        <div style={{fontWeight: "bold", marginBottom: "20px", fontSize: "18px"}}>提示</div>
                        <div style={{marginLeft: "60px"}}>

                            <div style={{marginTop: 10}}><Badge status="success"/>在本页面您可以查看您的创作列表以及审核情况</div>
                            <div style={{marginTop: 10}}><Badge status="success"/>点击 <Tag color="#2db7f5">查看</Tag>进行更详细的查看
                            </div>
                            <div style={{marginTop: 10}}><Badge status="success"/> <Tag
                                color="#f50">不通过</Tag> 的投稿，在详情页面可以进行 <Tag color="#2db7f5">申诉</Tag>
                            </div>
                            <div style={{marginTop: 10}}><Badge status="success"/> 点击表格头部的 <Icon type="filter"
                                                                                                 theme='filled'/> ，<Icon
                                type="search"/>，<Icon type="caret-up"/>，<Icon type="caret-down"/> 可以进行高级搜索
                            </div>
                        </div>
                    </div>
                </div>

                <div className="info-card" style={
                    {
                        background: "white",
                        borderRadius: "15px",
                        boxShadow: "0px 0px 20px rgba(137,137,137, 0.1)",
                        marginTop: "20px",
                        marginBottom: "50px",
                        padding: "20px"
                    }}>

                    <div style={{fontWeight: "bold", marginLeft: "30px", marginBottom: "20px", fontSize: "18px"}}>创作列表
                    </div>
                    <div style={{marginLeft: "10px"}}>
                        <Spin spinning={this.state.loading} size="large" delay={500}>
                            <Table dataSource={this.state.data} columns={this.columns}/>
                        </Spin>


                    </div>
                </div>

                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}

const styles = {
    affixBox: {
        position: 'absolute',
        top: 100,
        right: 50,
        with: 170
    }
}

export default ContentDemo
