import React from "react"
import {Avatar, Button, Divider} from "antd";
import ApiUtil from "../../utils/ApiUtil";
import axios from "axios";
import {isAuthenticated} from "../../utils/Session";

class UserInfoCard extends React.Component {
    state = {
        user: {}
    }

    componentDidMount() {
        axios(
            {
                url: ApiUtil.URL_IP + '/api/getUser/' + this.props.name,
                method: "get"
            }
        ).then(res => {
            this.setState({user: res.data.data})

        })
    }

    render() {
        return (<div className="info-card" style={
            {
                background: "white",
                borderRadius: "15px",
                boxShadow: "0px 0px 20px rgba(137, 137, 137, 0.1)",
                marginBottom: "50px",
                marginLeft: "30px"
            }}>
            <div style={{
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "20px",
                fontSize: "25px"
            }}><Avatar style={{marginTop: "50px", marginBottom: "15px"}} size={100}
                       src={`${ApiUtil.URL_IP}/api/getAvatar/${this.props.name}`}/>
                <br/>
                Hi,{this.state.user.nickname}
                <br/>
            </div>
            <Divider/>
            <div style={{

                marginLeft: "20px"
            }}>
                <div style={{
                    float: "left", fontWeight: "bold",
                    fontSize: "20px",
                }}>
                    帮助中心
                </div>
                <div style={{float: "right", marginRight: "20px"}}>
                    <a>更多></a>
                </div>
            </div>
            <br/>
            <div style={{marginLeft: "40px", marginTop: "20px"}}>
                <Button shape="round" icon="download" style={{marginTop: "10px"}}>
                    Download
                </Button>
                <br/>
                <Button shape="round" icon="download" style={{marginTop: "10px"}}>
                    Download
                </Button>
                <br/> <Button shape="round" icon="download" style={{marginTop: "10px"}}>
                Download
            </Button>
                <br/> <Button shape="round" icon="download" style={{marginTop: "10px"}}>
                Download
            </Button>
                <br/> <Button shape="round" icon="download" style={{marginTop: "10px"}}>
                Download
            </Button>
                <br/>
            </div>
            <Divider/>
            <div style={{

                marginLeft: "20px"
            }}>

                <div style={{
                    float: "left", fontWeight: "bold",
                    fontSize: "20px",
                }}>
                    问题反馈
                </div>
                <div style={{float: "right", marginRight: "20px"}}>
                    <a>反馈></a>
                </div>
            </div>
            <br/>
            <div style={{marginLeft: "40px", marginTop: "20px"}}>
                <br/>
            </div>
        </div>)
    }
}

export default UserInfoCard