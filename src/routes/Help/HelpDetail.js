import React from "react";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import RenderHelp from "./RenderHelp";
import {BackTop} from "antd";


let id

class HelpDetail extends React.Component {
    state = {
        id: 0
    }



    componentDidMount() {
        id = this.props.match.params.id
        this.setState({id})
    }

    render() {
        return (
            <div>
                <CustomBreadcrumb arr={['帮助']}/>
                <RenderHelp id={this.state.id}/>
                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        );
    }
}

export default HelpDetail