import React from 'react';

export default {
  'zh-cn': {
    brand: {
      brandName: 'kkFileView',
      briefIntroduction: '一个预览地址覆盖 Office、PDF、图片、音视频、压缩包、CAD、3D 模型等常见文件类型。独立部署，快速接入业务系统，为用户提供统一的在线预览体验。',
      supportedFormats: [
        {
          title: '办公文档',
          items: 'Office / WPS / LibreOffice',
        },
        {
          title: '文档预览',
          items: 'PDF / OFD / RTF / 邮件 / 图书',
        },
        {
          title: '图像设计',
          items: '图片 / SVG / PSD / EPS / 系统图像',
        },
        {
          title: '工程模型',
          items: 'CAD / Visio / 3D 模型 / XMind',
        },
        {
          title: '文本代码',
          items: 'TXT / Markdown / XML / 源码',
        },
        {
          title: '媒体归档',
          items: '压缩包 / 音频 / 视频 / 医疗影像',
        },
      ],
      stats: [
        {
          value: '150+',
          label: '登记企业用户',
        },
        {
          value: '20+',
          label: '文件大类',
        },
        {
          value: '24k+',
          label: 'Star 数',
        },
        {
          value: '9.5k+',
          label: 'Fork 数',
        },
      ],
      buttons: [
        {
          text: '在线体验',
          link: 'https://file.kkview.cn',
          type: 'primary',
          target: '_blank',
        },
        {
          text: 'Gitee',
          link: 'https://gitee.com/kekingcn/file-online-preview',
          type: 'normal',
          target: '_blank',
          icon: 'gitee',
        },
        {
          text: 'Github',
          link: 'https://github.com/kekingcn/kkFileView',
          type: 'normal',
          target: '_blank',
          icon: 'github',
        },
      ],
    },
    introduction: {
      title: '官方开源社群',
      desc: '如果你希望更快完成部署和落地，可以通过知识星球联系我们，获得更直接的安装使用支持。',
      supports: [
        '解答安装部署相关问题',
        '解答配置、接入和常见使用问题',
        '围绕实际使用场景的排查与建议',
        '提供 Linux、Windows 安装发行包，公示安全补丁等',
      ],
      actions: [
        {
          text: '加入社区',
          link: 'https://wx.zsxq.com/group/48844125114258',
          target: '_blank',
        },
        {
          text: '在线体验',
          link: 'https://file.kkview.cn',
          target: '_blank',
        },
      ],
      img: '/img/zsxq.png',
    },
    features: {
      title: '特性一览',
      list: [
        {
          img: '/img/feature_transpart.png',
          title: '快速接入业务系统',
          content: '独立服务部署后，通过一个预览地址即可把文件预览能力接入现有业务流程',
        },
        {
          img: '/img/feature_hogh.png',
          title: '覆盖主流办公与多媒体格式',
          content: '覆盖 Office、WPS、PDF、图片、音视频、压缩包、CAD、3D 模型等常见文件类型',
        },
        {
          img: '/img/feature_loadbalances.png',
          title: '适配不同预览体验',
          content: '根据文件类型提供 PDF、分页图、图片轮播、文本渲染、音视频播放等预览方式',
        },
        {
          img: '/img/feature_service.png',
          title: '私有化部署，降低业务耦合',
          content: '预览服务独立运行，通过 HTTP 接口对接，适合内网、微服务和多业务系统共用',
        },
      ],
    },
    users: {
      title: '我们的用户',
      desc: '来自 Gitee 使用登记的用户。kkFileView 广泛应用于政务、教育、金融、制造、通信、软件服务等行业。',
      industries: ['政务', '教育', '金融', '制造', '通信', '软件服务'],
      more: {
        text: '查看更多用户',
        link: 'https://gitee.com/kekingcn/file-online-preview/issues/IGSBV',
      },
      list: [
        {
          name: '凯京科技',
          img: '/img/users_keking.png',
          link: 'https://www.keking.com',
        },
        {
          name: '云智互联',
          img: '/img/users_yzlink.png',
          link: 'https://www.yzlink.cn/',
          showName: true,
        },
        {
          name: '时代光华',
          img: '/img/users_tbc.png',
          link: 'https://www.21tb.com/',
        },
        {
          name: '上海汉得',
          img: '/img/users_hand.png',
          link: 'https://www.hand-china.com/',
        },
        {
          name: '烽火通信',
          img: '/img/users_fiberhome.png',
          link: 'https://www.fiberhome.com/',
        },
        {
          name: '中国中车',
          img: '/img/users_crrc.png',
          link: 'https://www.crrcgc.cc/',
        },
        {
          name: '铁骑力士',
          img: '/img/users_tqls.png',
          link: 'https://www.tqlsgroup.com/',
        },
        {
          name: '四川跬锐',
          img: '/img/users_scqrazy.png',
          link: 'https://scqrazy.com/',
          showName: true,
        },
        {
          name: '武汉未来立体',
          img: '/img/users_weilailiti.png',
          link: 'http://www.weilailiti.com/',
          showName: true,
        },
        {
          name: '重庆圭峰网络',
          img: '/img/users_gfwlest.png',
          link: 'https://www.gfwlest.com/',
          showName: true,
        },
        {
          name: '开源中国',
          img: '/img/users_oschina.svg',
          link: 'https://www.oschina.net/doc/',
          showName: true,
        },
        {
          name: '广州特种承压设备检测研究院',
          shortName: '广州特检院',
          img: '/img/users_gzsei.ico',
          link: 'https://www.gzsei.cn/',
          showName: true,
        },
        {
          name: '河南众诚科技股份有限公司',
          shortName: '河南众诚',
          img: '/img/users_zcfhq.png',
          link: 'http://www.zcfhq.com/',
          showName: true,
        },
        {
          name: '湖南长沙天河国云',
          shortName: '天河国云',
          img: '/img/users_tianhecloud.png',
          link: 'https://chain.tianhecloud.com/',
          showName: true,
        },
        {
          name: '华东勘测设计研究院',
          shortName: '华东勘测',
          img: '/img/users_hdec.png',
          link: 'https://www.hdec.com/',
        },
        {
          name: '南京软通动力',
          img: '/img/users_isoftstone.svg',
          link: 'https://www.isoftstone.com/',
        },
        {
          name: '广州明动软件',
          img: '/img/users_minstone2.png',
          link: 'http://www.minstone.com.cn/',
        },
        {
          name: '天津福天科技',
          img: '/img/users_ft.png',
          link: 'https://www.ft-8.com/',
          showName: true,
        },
        {
          name: '金蝶精一',
          img: '/img/users_kingdee_favicon.ico',
          link: 'https://kone.kingdee.com/',
          showName: true,
        },
        {
          name: '正元校云',
          img: '/img/users_hzsun.svg',
          link: 'https://www.hzsun.com/',
          showName: true,
        },
        {
          name: '佛山科学技术学院',
          shortName: '佛山科技学院',
          img: '/img/users_fosu.ico',
          link: 'https://www.fosu.edu.cn/',
          showName: true,
        },
        {
          name: '厦门麦丰密封件有限公司',
          shortName: '厦门麦丰',
          img: '/img/users_mf.png',
          link: 'https://mf.xm45.cn/',
        },
        {
          name: '新奥集团',
          img: '/img/users_enn.png',
          link: 'https://www.enn.cn/',
          showName: true,
        },
        {
          name: '潮阳农村商业银行',
          shortName: '潮阳农商行',
          img: '/img/users_chaoyangrcb.png',
          showName: true,
        },
        {
          name: '广西中广人才培训',
          shortName: '中广人才',
          img: '/img/users_gxzgrc.png',
          link: 'https://www.gxzgrc.com/',
        },
        {
          name: '携宁科技',
          img: '/img/users_sinitek.ico',
          link: 'https://www.sinitek.com/',
          showName: true,
        },
        {
          name: 'JSON8 在线工具',
          shortName: 'JSON8',
          img: '/img/users_json8.png',
          link: 'https://json8.cn/',
          showName: true,
        },
        {
          name: '科学城投资集团',
          img: '/img/users_scigz.png',
          link: 'https://sci-gz.com/',
          showName: true,
        },
        {
          name: '哈尔滨新光光电科技股份有限公司',
          shortName: '新光光电',
          img: '/img/users_xinguang.png',
          link: 'http://www.xggdkj.com/',
          showName: true,
        },
        {
          name: '驰骋低代码开发平台 ccfast',
          shortName: 'ccfast',
          img: '/img/users_ccfast.jpg',
          link: 'http://ccflow.org/',
          showName: true,
        },
        {
          name: '浙江大维',
          img: '/img/users_zjdawei.jpg',
        },
        {
          name: '北京中科创元科技有限公司',
          shortName: '中科创元',
          img: '/img/users_zkyc.png',
          link: 'http://www.zkyc.org.cn/',
          showName: true,
        },
        {
          name: '同济大学教务系统',
          shortName: '同济教务',
          img: '/img/users_tongji.png',
          link: 'https://jwc.tongji.edu.cn/',
          showName: true,
        },
        {
          name: '微达安计算机有限公司',
          shortName: '微达安',
          img: '/img/users_wda.png',
          link: 'https://www.jiansuofuwu.cn/',
          showName: true,
        },
        {
          name: '湖南享学信息科技有限公司',
          shortName: '湖南享学',
          img: '/img/users_hnxx.jpg',
          showName: true,
        },
        {
          name: '微柏软件',
          img: '/img/users_weibo_soft.png',
        },
        {
          name: '瑞章科技',
          img: '/img/users_ruizhang.gif',
          showName: true,
        },
        {
          name: '苏州物图',
          img: '/img/users_wutu.svg',
          showName: true,
        },
        {
          name: '广东祥和',
          img: '/img/users_xianghe.png',
        },
        {
          name: '湖北骁龙建科',
          img: '/img/users_xljk.png',
        },
        {
          name: '尼奥科技',
          img: '/img/users_hnneo.png',
        },
        {
          name: '安徽沃特',
          img: '/img/users_ahwote.png',
        },
        {
          name: '重庆首亨软件股份有限公司',
          shortName: '重庆首亨',
          img: '/img/users_shforce.png',
          link: 'https://www.shforce.com/',
        },
        {
          name: '中电瑞达',
          img: '/img/users_zdrd.png',
        },
        {
          name: '中投国信',
          img: '/img/users_ztgx.png',
        },
        {
          name: '西藏电子商务有限公司',
          shortName: '西藏电商',
          img: '/img/users_xzds.png',
        },
        {
          name: '苏州麦卡软件',
          shortName: '苏州麦卡',
          link: 'http://www.mc916.com/CN/index.aspx',
        },
        {
          name: '海南嘉年华娱乐管理有限公司',
          shortName: '海南嘉年华',
        },
        {
          name: '蚂蚁小火互联网科技有限公司',
          shortName: '蚂蚁小火',
        },
        {
          name: '成都高新联通',
        },
        {
          name: '广州昊麒科技有限公司',
          shortName: '广州昊麒',
        },
        {
          name: '南京施塔特科技有限公司',
          shortName: '南京施塔特',
        },
        {
          name: '艾泽科技有限公司',
          shortName: '艾泽科技',
        },
        {
          name: '广东广业开业科技有限公司',
          shortName: '广东广业',
        },
        {
          name: '上海逸广信息',
        },
        {
          name: '广西文普科技发展有限公司',
          shortName: '广西文普',
        },
        {
          name: '永耀智能',
        },
        {
          name: '成都市益新臣辉科技有限公司',
          shortName: '益新臣辉',
        },
        {
          name: '成都市精锐天成科技有限公司',
          shortName: '精锐天成',
        },
        {
          name: '深圳东深电子',
        },
        {
          name: '常州安瑞科技',
        },
        {
          name: '博慧众成',
        },
        {
          name: '智动力知识产权',
          shortName: '智动力',
        },
        {
          name: '筑智建科技（重庆）有限公司',
          shortName: '筑智建科技',
        },
        {
          name: '江苏华屹',
        },
        {
          name: '合肥青谷',
        },
        {
          name: '多糖实验室 DotAsys',
          shortName: '多糖实验室',
        },
        {
          name: '上海禹知信息科技有限公司',
          shortName: '上海禹知',
          link: 'https://www.yuknown.com/',
        },
        {
          name: '异想之旅',
          link: 'https://www.yixiangzhilv.com/',
        },
        {
          name: '北京铸云网络',
        },
        {
          name: '中移杭州信息技术有限公司',
          shortName: '中移杭州',
        },
        {
          name: '东方瑞创达',
        },
        {
          name: '深圳新维舟科技有限公司',
          shortName: '深圳新维舟',
          link: 'http://www.weark.cn/',
        },
        {
          name: '中科国力智能技术有限公司',
          shortName: '中科国力',
          link: 'https://www.knowology.cn/',
        },
        {
          name: '南京季利达',
        },
        {
          name: '北京卓信数据',
        },
        {
          name: '澄域环保',
        },
        {
          name: '北京时林',
        },
        {
          name: '慧勒科技',
        },
        {
          name: '凯拓未来',
        },
        {
          name: '日创',
        },
        {
          name: '小星科技',
        },
        {
          name: '郑州信源',
        },
        {
          name: '广州芸星信息科技',
          shortName: '广州芸星',
        },
        {
          name: '深圳 JOVE',
        },
        {
          name: '卢氏集团',
        },
        {
          name: '成都书声科技',
        },
        {
          name: '云南蓝谷科技',
        },
        {
          name: '长沙精实机电',
        },
        {
          name: '佳诚信息',
        },
        {
          name: '东莞市新佰人机器人科技有限责任公司',
          shortName: '新佰人机器人',
        },
        {
          name: '广州汇博信息技术有限公司',
          shortName: '广州汇博',
        },
        {
          name: '南京感知信息',
        },
        {
          name: '商小信科技',
        },
        {
          name: '银码亿科技',
        },
        {
          name: '快造工场',
        },
        {
          name: '连云港企策管理',
          shortName: '企策管理',
        },
        {
          name: '上海科技大学四川研究院',
          shortName: '上科大四川研究院',
        },
        {
          name: 'zfxcms',
        },
        {
          name: '重庆惟弈科技',
        },
        {
          name: '成都会众云科技有限公司',
          shortName: '会众云科技',
        },
        {
          name: '重庆商小信科技',
        },
        {
          name: '重庆企快快科技',
        },
        {
          name: '杭州翔基云创信息技术有限公司',
          shortName: '翔基云创',
        },
        {
          name: '山东东八区信息科技有限公司',
          shortName: '东八区科技',
        },
        {
          name: '科纳兹精工制造',
        },
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
          target: '_self',
        },
        {
          text: 'Online Demo',
          link: 'https://file.kkview.cn',
          type: 'primary',
          target: '_blank',
        },
        {
          text: 'View on Gitee',
          link: 'https://gitee.com/kekingcn/file-online-preview',
          type: 'normal',
          target: '_blank',
        },
        {
          text: 'View on Github',
          link: 'https://github.com/kekingcn/kkFileView',
          type: 'normal',
          target: '_blank',
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
        },
      ],
    },
    users: {
      title: 'users',
      desc: <span>some description</span>,
      list: [
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
      ],
    },
  },
};
