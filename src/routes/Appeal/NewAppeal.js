import React from "react";
import {Badge, Button, Collapse, Result, Empty, Input, Modal, Table, Tag, Icon, Transfer, message} from "antd";
import VideoCompareCard from "../../components/VideoContentDetail/VideoCompareCard";
import axios from "axios";
import ApiUtil from "../../utils/ApiUtil";
import {isAuthenticated} from "../../utils/Session";
import difference from 'lodash/difference';
import MyCard from "../../components/MyCard/MyCard";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";

const {Panel} = Collapse;

// Customize Table Transfer
const TableTransfer = ({leftColumns, rightColumns, ...restProps}) => (
    <Transfer {...restProps} showSelectAll={false}>
        {({
              direction,
              filteredItems,
              onItemSelectAll,
              onItemSelect,
              selectedKeys: listSelectedKeys,
              disabled: listDisabled,
          }) => {
            const columns = direction === 'left' ? leftColumns : rightColumns;

            const rowSelection = {
                getCheckboxProps: item => ({disabled: listDisabled || item.disabled}),
                onSelectAll(selected, selectedRows) {
                    const treeSelectedKeys = selectedRows
                        .filter(item => !item.disabled)
                        .map(({key}) => key);
                    const diffKeys = selected
                        ? difference(treeSelectedKeys, listSelectedKeys)
                        : difference(listSelectedKeys, treeSelectedKeys);
                    onItemSelectAll(diffKeys, selected);
                },
                onSelect({key}, selected) {
                    onItemSelect(key, selected);
                },
                selectedRowKeys: listSelectedKeys,
            };

            return (
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={filteredItems}
                    size="small"
                    style={{pointerEvents: listDisabled ? 'none' : null}}
                    onRow={({key, disabled: itemDisabled}) => ({
                        onClick: () => {
                            if (itemDisabled || listDisabled) return;
                            onItemSelect(key, !listSelectedKeys.includes(key));
                        },
                    })}
                />
            );
        }}
    </Transfer>
);


const leftTableColumns = [
    {
        dataIndex: 'name',
        title: '视频名称',
    },
    {
        dataIndex: 'tag',
        title: '状态',
        render: tag => <Tag color='red'>{tag}</Tag>,
    },
    {
        dataIndex: 'time',
        title: '上传日期',
    },
];
const rightTableColumns = [
    {
        dataIndex: 'name',
        title: '视频名称',
    },
];

class NewAppeal extends React.Component {
    state = {
        targetKeys: [],
        disabled: false,
        showSearch: true,
        videoList: [],
        appealData: [],
        errorVisible: false,
        confirmVisible: false,
        errorInfo: [],
        submitted: false

    }

    componentDidMount() {
        this.getVideoListData()
    }

    getVideoListData() {
        axios({
            url: ApiUtil.URL_IP + '/api/getFailedVideoList/' + isAuthenticated(),
            method: 'get'
        }).then(res => {
            let list = res.data.data
            let appealData = []
            list.map((item) => {
                let r = {
                    key: item.key,
                    id: item.video.id,
                    name: item.video.videoname,
                    selected: false,
                    appeal: ''
                }
                appealData.push(r)
                return 1
            })
            this.setState({videoList: res.data.data, appealData: appealData})

        })
    }

    onChange = nextTargetKeys => {
        this.setState({targetKeys: nextTargetKeys});
        let list = this.state.appealData
        list.forEach((item2) => {
            let b = false
            nextTargetKeys.forEach((item1) => {
                if (item1 === item2.key) {
                    b = true
                }
            })
            item2.selected = b;
        })
        this.setState({appealData: list})

    };

    //设置申诉值
    setAppealValue(key, value) {
        let list = this.state.appealData
        list.forEach((item) => {
            if (key === item.key) {
                item.appeal = value
            }
        })
        this.setState({appealData: list})
    }

    //获取申诉值
    getListValue(key) {
        let list = this.state.appealData
        let d = ''
        list.map((item) => {
            if (key === item.key) {
                d = item.appeal
            }
            return 1
        })
        return d
    }

    checkAppealData() {
        let q = []
        let b = true
        this.state.appealData.forEach((item) => {
            if (item.selected === true && item.appeal.trim() === '') {
                q.push(item.name)
                b = false
            }
        })
        if (b === false) {
            this.setState({errorInfo: q, errorVisible: true})
            console.log(q)
        }

        return b
    }

    render() {
        const {targetKeys} = this.state;
        return (
            <div>
                <CustomBreadcrumb arr={['申诉中心', '新申诉']}/>
                <div style={{
                    alignContent: 'center',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    justifyContent: 'center',
                }}>
                    {this.state.submitted ? <div>
                        <MyCard style={{width: 1000}}>
                            <Result
                                status="success"
                                title="您的申诉已经成功提交，请耐心等待审核!"
                                subTitle="Your appeal has been successfully submitted.Please wait for our later information."
                                extra={[
                                    <Button type="primary" key="console" onClick={() => {
                                        this.props.history.push('/home/appeal')
                                    }}>
                                        返回申诉中心
                                    </Button>
                                ]}
                            />
                        </MyCard>
                    </div> : <div>
                        <MyCard title='选择申诉视频：' bigtitle='新的申诉' style={{width: 1000}}>
                            <TableTransfer
                                titles={['可选', '已选']}
                                dataSource={this.state.videoList}
                                targetKeys={targetKeys}
                                showSearch={true}
                                onChange={this.onChange}
                                locale={{itemUnit: '项', itemsUnit: '项', searchPlaceholder: '请输入搜索内容'}}
                                filterOption={(inputValue, item) =>
                                    item.name.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
                                }
                                leftColumns={leftTableColumns}
                                rightColumns={rightTableColumns}
                            />

                        </MyCard>
                        <MyCard style={{minHeight: 200, width: 1000,}} title='已经选择的视频：'>

                            {this.state.targetKeys.length === 0 ? <Empty/> :
                                <Collapse bordered={false}
                                          defaultActiveKey={['0']}
                                          style={{background: "white"}}
                                          expandIcon={({isActive}) => <Icon type="caret-right"
                                                                            rotate={isActive ? 90 : 0}/>}
                                          accordion>
                                    {this.state.targetKeys.map((item, key) => {
                                        return (
                                            this.state.videoList.map((v) => {
                                                if (v.key === item) {

                                                    return (<Panel header={`申诉-${v.name}`} key={key}
                                                                   style={customPanelStyle}>
                                                            <MyCard title={'视频比较'}> <VideoCompareCard video={v.video}
                                                                                       copy={v.copyinfo}/></MyCard>

                                                            <div>问题描述：</div>
                                                            <Input.TextArea onChange={(e) => {
                                                                this.setAppealValue(item, e.target.value)
                                                            }} value={this.getListValue(item)} rows={5}/>
                                                        </Panel>
                                                    )
                                                }
                                                return null
                                            })
                                        )
                                    })}

                                </Collapse>}
                        </MyCard>
                        <MyCard>
                            <Button type='primary' onClick={() => {
                                if (this.checkAppealData()) {
                                    let _this = this
                                    Modal.confirm({
                                        title: '您确定要提交吗?',
                                        content: '',
                                        okText: '确认',
                                        cancelText: '取消',
                                        onOk() {
                                            return new Promise((resolve, reject) => {
                                                axios({
                                                    url: ApiUtil.URL_IP + '/api/addNewAppeal/' + isAuthenticated(),
                                                    method: 'post',
                                                    data: _this.state.appealData
                                                }).then(res => {
                                                    if (res.data.code === 1) {
                                                        reject()
                                                    } else if (res.data.code === 0) {
                                                        _this.setState({submitted: true})
                                                        resolve()
                                                    }
                                                }).catch(e => reject())
                                            }).catch(() => message.error('提交失败，请重新再试'));
                                        },
                                        onCancel() {
                                        },
                                    });
                                }
                            }} disabled={this.state.targetKeys.length === 0}>提交</Button>
                            <span style={{marginLeft: 20}}>共 {this.state.targetKeys.length} 项</span>
                        </MyCard>
                    </div>
                    }


                </div>
                <Modal
                    title="错误信息"
                    visible={this.state.errorVisible}
                    cancelText={'取消'}
                    okText={'确认'}
                    onOk={() => {
                        this.setState({errorVisible: false})
                    }}
                    onCancel={() => {
                        this.setState({errorVisible: false})
                    }}
                >
                    <p>您提交的申诉有如下问题:</p>
                    {this.state.errorInfo.map((item, index) => {
                        return (<p key={index}><Badge color={'red'}/>{item} 没有填写申诉内容！</p>)
                    })}

                </Modal>
            </div>
        )
    }
}

const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 10,
    border: 0,
    overflow: 'hidden',
};
export default NewAppeal