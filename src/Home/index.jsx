/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';
import {enquireScreen} from 'enquire-js';

import Nav3 from './Nav3';
import Banner1 from './Banner1';
import Content0 from './Content0';
import Footer0 from './Footer0';
import Content13 from "./Content13";
import Feature8 from "./Feature8";
import {
    Nav30DataSource,
    Banner10DataSource,
    Content00DataSource,
    Footer00DataSource,
    Content130DataSource,
    Feature80DataSource
} from './data.source';
import './css/antMotionStyle.css';

let isMobile;
enquireScreen((b) => {
    isMobile = b;
});

const {location = {}} = typeof window !== 'undefined' ? window : {};

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile,
            show: !location.port, // 如果不是 dva 2.0 请删除
        };
    }

    componentDidMount() {
        // 适配手机屏幕;
        enquireScreen((b) => {
            this.setState({isMobile: !!b});
        });
        // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
        /* 如果不是 dva 2.0 请删除 start */
        if (location.port) {
            // 样式 build 时间在 200-300ms 之间;
            setTimeout(() => {
                this.setState({
                    show: true,
                });
            }, 500);
        }
        /* 如果不是 dva 2.0 请删除 end */
    }

    render() {
        const children = [
            <Nav3
                id="Nav3_0"
                key="Nav3_0"
                dataSource={Nav30DataSource}
                isMobile={this.state.isMobile}
                selectedKeys={['item0']}
            />,
            <Banner1
                id="Banner1_0"
                key="Banner1_0"
                dataSource={Banner10DataSource}
                isMobile={this.state.isMobile}
            />,

            <Content13
                id="Content13_0"
                key="Content13_0"
                dataSource={Content130DataSource}
                isMobile={this.state.isMobile}
            />,
            <Feature8
                id="Feature8_0"
                key="Feature8_0"
                dataSource={Feature80DataSource}
                isMobile={this.state.isMobile}
            />,
            <Content0
                id="Content0_0"
                key="Content0_0"
                dataSource={Content00DataSource}
                isMobile={this.state.isMobile}
            />,
            <Footer0
                id="Footer0_0"
                key="Footer0_0"
                dataSource={Footer00DataSource}
                isMobile={this.state.isMobile}
            />,
        ];
        return (
            <div
                className="templates-wrapper"
            >
                {/* 如果不是 dva 2.0 替换成 {children} start */}
                {this.state.show && children}
                {/* 如果不是 dva 2.0 替换成 {children} end */}
            </div>
        );
    }
}
