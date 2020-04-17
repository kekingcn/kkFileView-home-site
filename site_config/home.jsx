import React from 'react';

export default {
  'zh-cn': {
    brand: {
      brandName: 'kkFileView',
      briefIntroduction: 'kkFileView为文件文档在线预览解决方案，该项目使用流行的spring boot搭建，易上手和部署，基本支持主流办公文档的在线预览，如doc,docx,xls,xlsx,ppt,pptx,pdf,txt,zip,rar,图片,视频,音频等等',
      buttons: [
        {
          text: '立即开始',
          link: '/zh-cn/docs/home.html',
          type: 'primary',
        },
        {
          text: '查看码云',
          link: 'https://gitee.com/kekingcn/file-online-preview',
          type: 'normal',
        },
      ],
    },
    introduction: {
      title: '官方QQ交流群',
      desc: '本群不局限于讨论以本项目的问题，spring boot，spring cloud，dubbo，motan以及分布式，微服务相关问题都可以热聊起来',
      img: '/img/qq.png',
    },
    features: {
      title: '特性一览',
      list: [
        {
          img: '/img/feature_transpart.png',
          title: '一键部署，快速接入',
          content: '支持Windows、Linux平台一键部署，两行js代码就可以接入预览',
        },
        {
          img: '/img/feature_hogh.png',
          title: '支持常见文件格式，兼容新版Office文档',
          content: '支持文本、图片、Office文档、WPS文档、PDF、视频、音频、压缩包等常见文件类型预览',
        },
        {
          img: '/img/feature_loadbalances.png',
          title: '支持多种预览模式灵活切换',
          content: '支持pdf、懒加载分页图、轮播图片等预览模式动态配置、灵活切换',
        },
        {
          img: '/img/feature_service.png',
          title: '独立部署，提供restful接口，适用于微服务场景',
          content: '独立于业务系统外，提供restful http接口，开发语言无关，微服务场景下直接提供在线预览服务',
        },
      ],
    },
    start: {
      title: '快速开始',
      desc: '分发包支持Windows、Linux下直接解压部署、执行startup脚本直接启动；应用程序只需两行js代码即可接入预览',
      img: '/img/quick_start.png',
      button: {
        text: '阅读更多',
        link: '/zh-cn/docs/production.html',
      },
    },
    users: {
      title: '用户',
      // desc: <span>如下</span>,
      list: [
        '/img/users_keking.png',
        '/img/banmalaila.svg',
        '/img/users_tbc.png',
        '/img/users_yzlink.png'
      ],
    },
  },
  'en-us': {
    brand: {
      brandName: 'brandName',
      briefIntroduction: 'some description of product',
      buttons: [
        {
          text: 'Quick Start',
          link: '/en-us/docs/demo1.html',
          type: 'primary',
        },
        {
          text: 'View on Github',
          link: 'https://gitee.com/kekingcn/file-online-preview',
          type: 'normal',
        },
      ],
    },
    introduction: {
      title: 'introduction title',
      desc: 'some introduction of your product',
      img: '/img/architecture.png',
    },
    features: {
      title: 'Feature List',
      list: [
        {
          img: '/img/feature_transpart.png',
          title: 'feature1',
          content: 'feature description',
        },
        {
          img: '/img/feature_loadbalances.png',
          title: 'feature2',
          content: 'feature description',
        }
      ]
    },
    start: {
      title: 'Quick start',
      desc: 'some description text',
      img: '/img/quick_start.png',
      button: {
        text: 'READ MORE',
        link: '/en-us/docs/demo1.html',
      },
    },
    users: {
      title: 'users',
      desc: <span>some description</span>,
      list: [
        '/img/users_alibaba.png',
        '/img/users_alibaba.png'
      ],
    },
  },
};
