export default {
  'en-us': {
    sidemenu: [
      {
        title: 'header title',
        children: [
          {
            title: 'kkFileView',
            link: '/en-us/docs/demo1.html',
          },
          {
            title: 'demo2',
            link: '/en-us/docs/demo2.html',
          },
          {
            title: 'dir',
            opened: true,
            children: [
              {
                title: 'demo3',
                link: '/en-us/docs/dir/demo3.html',
              },
            ],
          },
        ],
      },
    ],
    barText: 'Documentation',
  },
  'zh-cn': {
    sidemenu: [
      {
        title: 'kkFileView',
        children: [
          {
            title: '概述',
            link: '/zh-cn/docs/home.html',
          },
          {
            title: '部署指南',
            link: '/zh-cn/docs/production.html',
          },
          {
            title: '使用指南',
            link: '/zh-cn/docs/usage.html',
          },
          {
            title: '配置说明',
            link: '/zh-cn/docs/config.html',
          },
          {
            title: '常见问题',
            link: '/zh-cn/docs/faq.html',
          },
          {
            title: '编译指南',
            link: '/zh-cn/docs/build.html',
          },
          // {
          //   title: '目录',
          //   opened: true,
          //   children: [
          //     {
          //       title: '示例3',
          //       link: '/zh-cn/docs/dir/demo3.html',
          //     },
          //   ],
          // },

        ],
      },
    ],
    barText: '文档',
  },
};
