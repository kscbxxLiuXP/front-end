import React from "react";

class MyCard extends React.Component {
    render() {
        let {
            title,
            bigtitle,
            style,
            ...other
        } = this.props;
        return (
            <div style={{
                background: "white",
                borderRadius: "15px",
                boxShadow: "0px 0px 20px rgba(137,137,137, 0.1)",
                marginBottom: "20px",
                padding: "20px",
                ...style,
            }} {...other}>
                {bigtitle?<div style={{fontWeight: "bold", textAlign:"center",marginBottom: "20px", fontSize: "25px"}}>{bigtitle}</div>:null}
                {title?<div style={{fontWeight: "bold", marginBottom: "20px", fontSize: "18px"}}>{title}</div>:null}
                {this.props.children}
            </div>
        )
    }
}

export default MyCard