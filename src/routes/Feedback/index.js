import React from 'react'

import CustomBreadcrumb from '../../components/CustomBreadcrumb'
import {Button,Input} from "antd";

class FeedBackDemo extends React.Component {

    render() {
        return (
            <div>
                <CustomBreadcrumb arr={['问题反馈']}/>
                <div className="info-card" style={
                    {
                        background: "white",
                        borderRadius: "15px",
                        boxShadow: "0px 0px 20px rgba(137,137,137, 0.1)",
                        marginTop: "20px",
                        marginBottom: "50px",
                        padding: "20px"
                    }}>
                    <div style={{fontWeight: "bold",marginLeft:"30px", marginBottom: "20px", fontSize: "18px"}}>问题反馈</div>
                    <div style={{marginLeft:"60px"}}
                    >
                        <div>
                            问题简要：
                            <Input style={{width:"50%"}}/>
                        </div>
                        <div style={{marginTop:"30px"}}>
                            详细信息：
                        </div>
                        <Input.TextArea  autoSize={{ minRows: 3 }} style={{width:"50%", marginTop:"-20px",marginLeft:"70px"}}/>
                        <br/>
                        <Button style={{marginLeft:"70px",marginTop:"20px"}} type="primary">提交</Button>
                    </div>

                </div>
            </div>

        )
    }
}


export default FeedBackDemo
