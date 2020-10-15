import React from "react";
import {Button, Divider, Badge, Icon, List, Tag, Tooltip} from "antd";
import './appealList.css'
import {formatFileSize} from "../../utils/utils";
import {withRouter} from "react-router-dom";

const {Item} = List

@withRouter
class AppealList extends React.Component {

    renderAppealState(appeal) {
        if (appeal.state === 1) {
            return (
                <Badge color="#2db7f5" text="申诉受理中"/>
            )
        } else if (appeal.state === 2) {
            return (

                <Tooltip title={() => {
                    return <div>
                        <div>
                            审核人:{appeal.resolver}
                        </div>
                        <div>
                            审核时间:{appeal.resolveTime}
                        </div>

                    </div>
                }}>
                    <Badge  color="#87d068" text="申诉已完成"/>
                </Tooltip>

            )
        }
    }

    render() {
        return (
            <div>
                <List
                    dataSource={this.props.data}
                    renderItem={item => (
                        <Item>
                            <div className='container'>
                                <img className='icon' src={item.video.icon === undefined ? '' : item.video.icon} alt=""
                                     width='150px' height='100px'/>
                                <div className='videoinfo'>
                                    <div className='title-wrapper'>
                                        <a className='title'
                                           href={`#/home/content/${item.video.id}`}>{item.video.videoname.split('.')[item.video.videoname.split('.').length - 2]}</a>
                                    </div>
                                    <div className='time'>
                                        {item.appeal.appealTime}
                                    </div>
                                    <div className='container-bottom'>
                                        <div>{item.video.timeLength}</div>
                                        <div><Divider type={"vertical"}/></div>

                                        <div><Tag color="#2db7f5">{item.video.type}</Tag></div>
                                        <div><Divider type={"vertical"}/></div>
                                        <div><Icon type='file'/>{formatFileSize(item.video.size)}</div>
                                        <div><Divider type={"vertical"}/></div>
                                        <div><Icon type='user'/>{item.video.authName}</div>
                                        <div><Divider type={"vertical"}/></div>
                                        <div><Tag color={item.video.status==='不通过'?"#f50":'#87d068'}>{item.video.status}</Tag></div>
                                    </div>
                                </div>
                                <div className='operator'>
                                    <div>
                                        {this.renderAppealState(item.appeal)}
                                        <Button style={{marginLeft: 20}} icon='search' onClick={() => {
                                            this.props.history.push('/home/appeal/' + item.video.id)
                                        }}>查看</Button>
                                    </div>

                                </div>
                            </div>
                        </Item>
                    )}
                />
            </div>
        );
    }
}

export default AppealList