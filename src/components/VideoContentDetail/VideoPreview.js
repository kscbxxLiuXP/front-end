import React from "react";
import {Player} from "video-react";
import ApiUtil from "../../utils/ApiUtil";


class VideoPreview extends React.Component {
    render() {
        return (<div style={{
            background: "white",
            borderRadius: "15px",
            boxShadow: "0px 0px 20px rgba(137,137,137, 0.1)",
            marginBottom: "50px",
            padding: "20px"
        }}><div style={{fontWeight: "bold", marginBottom: "20px", fontSize: "18px"}}>视频预览</div>
            <Player
                playsInline
                src={ApiUtil.URL_IP + ApiUtil.API_FILE_GET + this.props.id}
            />
        </div>)
    }
}

export default VideoPreview