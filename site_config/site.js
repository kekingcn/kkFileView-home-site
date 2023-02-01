// 全局的一些配置
export default {
  rootPath: '', // 发布到服务器的根目录，需以/开头但不能有尾/，如果只有/，请填写空字符串
  port: 8080, // 本地开发服务器的启动端口
  domain: 'www.kkview.cn', // 站点部署域名，无需协议和path等
  defaultSearch: 'baidu', // 默认搜索引擎，baidu或者google
  defaultLanguage: 'zh-cn',
  'en-us': {
    pageMenu: [
      {
        key: 'home', // 用作顶部菜单的选中
        text: 'HOME',
        link: '/en-us/index.html',
      },
      {
        key: 'docs',
        text: 'DOCS',
        link: '/en-us/docs/home.html',
      },
      {
        key: 'blog',
        text: 'BLOG',
        link: '/en-us/blog/index.html',
      },
      // {
      //   key: 'community',
      //   text: 'COMMUNITY',
      //   link: '/en-us/community/index.html',
      // },
    ],
    disclaimer: {
      title: 'Disclaimer',
      content: 'the disclaimer content',
    },
    documentation: {
      title: 'Documentation',
      list: [
        {
          text: 'Overview',
          link: '/en-us/docs/demo1.html',
        },
        {
          text: 'Quick start',
          link: '/en-us/docs/demo2.html',
        },
        {
          text: 'Developer guide',
          link: '/en-us/docs/dir/demo3.html',
        },
      ],
    },
    resources: {
      title: 'Resources',
      list: [
        // {
        //   text: 'Blog',
        //   link: '/en-us/blog/index.html',
        // },
        // {
        //   text: 'Community',
        //   link: '/en-us/community/index.html',
        // },
      ],
    },
    copyright: 'Copyright © 2023 KK开源社区 沪ICP备2023002907号-1',
  },
  'zh-cn': {
    pageMenu: [
      {
        key: 'home',
        text: '首页',
        link: '/zh-cn/index.html',
      },
      {
        key: 'docs',
        text: '文档',
        link: '/zh-cn/docs/home.html',
      },
      {
        key: 'blog',
        text: '博客',
        link: '/zh-cn/blog/index.html',
      },
      // {
      //   key: 'community',
      //   text: '社区',
      //   link: '/zh-cn/community/index.html',
      // },
    ],
    disclaimer: {
      title: '免责声明',
      content: '',
    },
    documentation: {
      title: '文档',
      list: [
        {
          text: '概览',
          link: '/zh-cn/docs/home.html',
        },
        {
          text: '在线演示',
          link: 'https://file.keking.cn/',
        },
        {
          text: '部署指南',
          link: '/zh-cn/docs/production.html',
        },
        {
          text: '常见问题',
          link: '/zh-cn/docs/faq.html',
        }
      ],
    },
    resources: {
      title: '相关站点',
      list: [
        {
          text: '凯京科技',
          link: 'https://www.keking.com',
        },
        {
          text: '斑马来拉',
          link: 'https://www.banmalaila.com',
        },
        {
          text: '凯京技术团队官博',
          link: 'https://my.oschina.net/keking',
        },
        {
          text: 'KLBLOG',
          link: 'http://www.kailing.pub/',
        }
      ],
    },
    copyright: 'Copyright © 2023 KK开源社区     沪ICP备2023002907号-1',
  },
};

