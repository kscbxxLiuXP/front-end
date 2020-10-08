import React from "react";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import RenderHelp from "./RenderHelp";


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
            </div>
        );
    }
}

export default HelpDetail