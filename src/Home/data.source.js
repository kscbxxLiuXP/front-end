import React from 'react';

export const Nav30DataSource = {
    wrapper: {className: 'header3 home-page-wrapper'},
    page: {className: 'home-page'},
    logo: {
        className: 'header3-logo',
        children:
            require('../assets/img/VideoDetect.png'),
    },
    Menu: {
        className: 'header3-menu',
        children: [
            {
                name: 'item0',
                className: 'header3-item',
                children: {
                    href: '#/index',
                    children: [
                        {
                            children: (
                                <span>
                                    <p>首页</p>
                                </span>
                            ),
                            name: 'text',
                        },
                    ],
                }
            },
            {
                name: 'item1',
                className: 'header3-item',
                children: {
                    href: '#/contactus',
                    children: [
                        {
                            children: (
                                <span>
                  <span>
                    <p>联系我们</p>
                  </span>
                </span>
                            ),
                            name: 'text',
                        },
                    ],
                },
            },
            {
                name: 'item2',
                className: 'header3-item',
                children: {
                    href: '#/login',
                    children: [
                        {
                            children: (
                                <span>
                  <p>登录</p>
                </span>
                            ),
                            name: 'text',
                        },
                    ],
                },
            },
            {
                name: 'item3',
                className: 'header3-item',
                children: {
                    href: '#/register',
                    children: [
                        {
                            children: (
                                <span>
                  <p>注册</p>
                </span>
                            ),
                            name: 'text',
                        },
                    ],
                },
            },
        ],
    },
    mobileMenu: {className: 'header3-mobile-menu'},
};
export const Banner10DataSource = {
    wrapper: {className: 'banner1'},
    BannerAnim: {
        children: [
            {
                name: 'elem0',
                BannerElement: {className: 'banner-user-elem'},
                textWrapper: {className: 'banner1-text-wrapper'},
                bg: {className: 'bg bg0'},
                title: {
                    className: 'banner1-title',
                    children:
                        require('../assets/img/VideoDetect2.png'),
                },
                content: {
                    className: 'banner1-content',
                    children: '一个专注于短视频的版权检测方案',
                },
                button: {className: 'banner1-button', children: 'Learn More'},
            },
            {
                name: 'elem1',
                BannerElement: {className: 'banner-user-elem'},
                textWrapper: {className: 'banner1-text-wrapper'},
                bg: {className: 'bg bg1'},
                title: {
                    className: 'banner1-title',
                    children:
                        require('../assets/img/VideoDetect2.png'),
                },
                content: {
                    className: 'banner1-content',
                    children: '一个专注于短视频的版权检测方案',
                },
                button: {className: 'banner1-button', children: 'Learn More'},
            },
            {
                name: 'elem2',
                BannerElement: {className: 'banner-user-elem'},
                textWrapper: {className: 'banner1-text-wrapper'},
                bg: {className: 'bg bg2'},
                title: {
                    className: 'banner1-title',
                    children:
                        require('../assets/img/VideoDetect2.png'),
                },
                content: {
                    className: 'banner1-content',
                    children: '一个专注于短视频的版权检测方案',
                },
                button: {className: 'banner1-button', children: 'Learn More'},
            },
        ],
    },
};
export const Content00DataSource = {
    wrapper: {className: 'home-page-wrapper content0-wrapper'},
    page: {className: 'home-page content0'},
    OverPack: {playScale: 0.3, className: ''},
    titleWrapper: {
        className: 'title-wrapper',
        children: [{name: 'title', children: '产品与服务'}],
    },
    childWrapper: {
        className: 'content0-block-wrapper',
        children: [
            {
                name: 'block0',
                className: 'content0-block',
                md: 8,
                xs: 24,
                children: {
                    className: 'content0-block-item',
                    children: [
                        {
                            name: 'image',
                            className: 'content0-block-icon',
                            children:
                                'https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png',
                        },
                        {
                            name: 'title',
                            className: 'content0-block-title',
                            children: '一站式业务接入',
                        },
                        {name: 'content', children: '支付、结算、核算接入产品效率翻四倍'},
                    ],
                },
            },
            {
                name: 'block1',
                className: 'content0-block',
                md: 8,
                xs: 24,
                children: {
                    className: 'content0-block-item',
                    children: [
                        {
                            name: 'image',
                            className: 'content0-block-icon',
                            children:
                                'https://zos.alipayobjects.com/rmsportal/YPMsLQuCEXtuEkmXTTdk.png',
                        },
                        {
                            name: 'title',
                            className: 'content0-block-title',
                            children: '一站式事中风险监控',
                        },
                        {
                            name: 'content',
                            children: '在所有需求配置环节事前风险控制和质量控制能力',
                        },
                    ],
                },
            },
            {
                name: 'block2',
                className: 'content0-block',
                md: 8,
                xs: 24,
                children: {
                    className: 'content0-block-item',
                    children: [
                        {
                            name: 'image',
                            className: 'content0-block-icon',
                            children:
                                'https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png',
                        },
                        {
                            name: 'title',
                            className: 'content0-block-title',
                            children: '一站式数据运营',
                        },
                        {
                            name: 'content',
                            children: '沉淀产品接入效率和运营小二工作效率数据',
                        },
                    ],
                },
            },
        ],
    },
};
export const Feature80DataSource = {
    wrapper: {className: 'home-page-wrapper feature8-wrapper'},
    page: {className: 'home-page feature8'},
    OverPack: {playScale: 0.3},
    titleWrapper: {
        className: 'feature8-title-wrapper',
        children: [
            {name: 'title', className: 'feature8-title-h1', children: '使用流程'},
            {
                name: 'content',
                className: 'feature8-title-content',
                children: '流程简单清晰，快速响应需求',
            },
        ],
    },
    childWrapper: {
        className: 'feature8-button-wrapper',
        children: [
            {
                name: 'button',
                className: 'feature8-button',
                children: {href: '#', children: '立即体验'},
            },
        ],
    },
    Carousel: {
        dots: false,
        className: 'feature8-carousel',
        wrapper: {className: 'feature8-block-wrapper'},
        children: {
            className: 'feature8-block',
            titleWrapper: {
                className: 'feature8-carousel-title-wrapper',
                title: {className: 'feature8-carousel-title'},
            },
            children: [
                {
                    name: 'block0',
                    className: 'feature8-block-row',
                    gutter: 120,
                    title: {
                        className: 'feature8-carousel-title-block',
                        children: '用户使用流畅',
                    },
                    children: [
                        {
                            className: 'feature8-block-col',
                            md: 6,
                            xs: 24,
                            name: 'child0',
                            arrow: {
                                className: 'feature8-block-arrow',
                                children:
                                    'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
                            },
                            children: {
                                className: 'feature8-block-child',
                                children: [
                                    {
                                        name: 'image',
                                        className: 'feature8-block-image',
                                        children:
                                            'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                                    },
                                    {
                                        name: 'title',
                                        className: 'feature8-block-title',
                                        children: '需求沟通',
                                    },
                                    {
                                        name: 'content',
                                        className: 'feature8-block-content',
                                        children: '沟通业务需求，对接人：诚凡、芸彩',
                                    },
                                ],
                            },
                        },
                        {
                            className: 'feature8-block-col',
                            md: 6,
                            xs: 24,
                            name: 'child1',
                            arrow: {
                                className: 'feature8-block-arrow',
                                children:
                                    'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
                            },
                            children: {
                                className: 'feature8-block-child',
                                children: [
                                    {
                                        name: 'image',
                                        className: 'feature8-block-image',
                                        children:
                                            'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                                    },
                                    {
                                        name: 'title',
                                        className: 'feature8-block-title',
                                        children: '需求沟通',
                                    },
                                    {
                                        name: 'content',
                                        className: 'feature8-block-content',
                                        children:
                                            '沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩',
                                    },
                                ],
                            },
                        },
                        {
                            className: 'feature8-block-col',
                            md: 6,
                            xs: 24,
                            name: 'child2',
                            arrow: {
                                className: 'feature8-block-arrow',
                                children:
                                    'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
                            },
                            children: {
                                className: 'feature8-block-child',
                                children: [
                                    {
                                        name: 'image',
                                        className: 'feature8-block-image',
                                        children:
                                            'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                                    },
                                    {
                                        name: 'title',
                                        className: 'feature8-block-title',
                                        children: '需求沟通',
                                    },
                                    {
                                        name: 'content',
                                        className: 'feature8-block-content',
                                        children:
                                            '沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩',
                                    },
                                ],
                            },
                        },
                        {
                            className: 'feature8-block-col',
                            md: 6,
                            xs: 24,
                            name: 'child3',
                            arrow: {
                                className: 'feature8-block-arrow',
                                children:
                                    'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
                            },
                            children: {
                                className: 'feature8-block-child',
                                children: [
                                    {
                                        name: 'image',
                                        className: 'feature8-block-image',
                                        children:
                                            'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                                    },
                                    {
                                        name: 'title',
                                        className: 'feature8-block-title',
                                        children: '需求沟通',
                                    },
                                    {
                                        name: 'content',
                                        className: 'feature8-block-content',
                                        children:
                                            '沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩',
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    name: 'block1',
                    className: 'feature8-block-row',
                    gutter: 120,
                    title: {
                        children: '后台检测流程',
                        className: 'feature8-carousel-title-block',
                    },
                    children: [
                        {
                            className: 'feature8-block-col',
                            md: 6,
                            xs: 24,
                            name: 'child0',
                            arrow: {
                                className: 'feature8-block-arrow',
                                children:
                                    'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
                            },
                            children: {
                                className: 'feature8-block-child',
                                children: [
                                    {
                                        name: 'image',
                                        className: 'feature8-block-image',
                                        children:
                                            'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                                    },
                                    {
                                        name: 'title',
                                        className: 'feature8-block-title',
                                        children: '需求沟通',
                                    },
                                    {
                                        name: 'content',
                                        className: 'feature8-block-content',
                                        children: '沟通业务需求，对接人：诚凡、芸彩',
                                    },
                                ],
                            },
                        },
                        {
                            className: 'feature8-block-col',
                            md: 6,
                            xs: 24,
                            name: 'child1',
                            arrow: {
                                className: 'feature8-block-arrow',
                                children:
                                    'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
                            },
                            children: {
                                className: 'feature8-block-child',
                                children: [
                                    {
                                        name: 'image',
                                        className: 'feature8-block-image',
                                        children:
                                            'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                                    },
                                    {
                                        name: 'title',
                                        className: 'feature8-block-title',
                                        children: '需求沟通',
                                    },
                                    {
                                        name: 'content',
                                        className: 'feature8-block-content',
                                        children:
                                            '沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩',
                                    },
                                ],
                            },
                        },
                        {
                            className: 'feature8-block-col',
                            md: 6,
                            xs: 24,
                            name: 'child2',
                            arrow: {
                                className: 'feature8-block-arrow',
                                children:
                                    'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
                            },
                            children: {
                                className: 'feature8-block-child',
                                children: [
                                    {
                                        name: 'image',
                                        className: 'feature8-block-image',
                                        children:
                                            'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                                    },
                                    {
                                        name: 'title',
                                        className: 'feature8-block-title',
                                        children: '需求沟通',
                                    },
                                    {
                                        name: 'content',
                                        className: 'feature8-block-content',
                                        children:
                                            '沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩',
                                    },
                                ],
                            },
                        },
                        {
                            className: 'feature8-block-col',
                            md: 6,
                            xs: 24,
                            name: 'child3',
                            arrow: {
                                className: 'feature8-block-arrow',
                                children:
                                    'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
                            },
                            children: {
                                className: 'feature8-block-child',
                                children: [
                                    {
                                        name: 'image',
                                        className: 'feature8-block-image',
                                        children:
                                            'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg',
                                    },
                                    {
                                        name: 'title',
                                        className: 'feature8-block-title',
                                        children: '需求沟通',
                                    },
                                    {
                                        name: 'content',
                                        className: 'feature8-block-content',
                                        children:
                                            '沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩',
                                    },
                                ],
                            },
                        },
                    ],
                },
            ],
        },
    },
};
export const Content130DataSource = {
    OverPack: {
        className: 'home-page-wrapper content13-wrapper',
        playScale: 0.3,
    },
    titleWrapper: {
        className: 'title-wrapper',
        children: [
            {
                name: 'image',
                children:
                    'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
                className: 'title-image',
            },
            {name: 'title', children: '短视频版权检测', className: 'title-h1'},
            {
                name: 'content',
                children:
                    '我们的产品包括 重复检测、特征提取、特征库构建，版权库管理等功能',
                className: 'title-content',
            },
            {
                name: 'content2',
                children: '是一套非常优秀的版权管理和检测系统',
                className: 'title-content',
            },
        ],
    },
};
export const Footer00DataSource = {
    wrapper: {className: 'home-page-wrapper footer0-wrapper'},
    OverPack: {className: 'home-page footer0', playScale: 0.05},
    copyright: {
        className: 'copyright',
        children: (
            <span>
        ©2020 VideoDetect 短视频版权检测 All Rights
        Reserved
      </span>
        ),
    },
};
