import { defineConfig } from 'vitepress'
import { set_sidebar } from '../utils/auto-gen-sidebar.mjs'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "1和0的回合",
  description: "1&0=0",
  head: [["link", { rel: "icon", href: "/logo.svg" }]],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      // { text: '前端', link: '/frontend' },
      {
        text: '后端', items: [
          // { text: 'Kafka', link: '/backend/kafka/kafka' },
          // { text: 'Redis', link: '/backend/redis/redis' },
          { text: '帆软代理', link: '/middleware/finereport' }
        ]
      },
      {
        text: '硬件', items: [
          { text: '群晖nas', link: '/hardware/synology' }
        ]
      },
      {
        text: '样例', items: [
          { text: 'API Example', link: 'api-examples' },
          { text: 'markdown Example', link: 'markdown-examples' },
        ]
      },
    ],
    // 添加logo配置
    logo: {
      src: '/logo.svg',
      alt: 'My Logo',
    },

    outline: [2, 6],
    outlineTitle: '文章目录',
    // 添加搜索配置
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索'
          },
          modal: {
            noResultsText: '无法找到结果',
            resetButtonTitle: '清除搜索',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    sidebar: {
      // "/frontend/react": set_sidebar("frontend/react"),
      // "/backend/redis": set_sidebar("backend/redis"),
      // "/backend/kafka": set_sidebar("backend/kafka"),
      '/middleware/finereport': [
        {
          text: '帆软分析',
          items: [
            { text: '帆软简介', link: '/middleware/finereport/' },
            { text: '帆软登录', link: '/middleware/finereport/login' },
            { text: '帆软请求过程', link: '/middleware/finereport/view-report' },
            { text: '帆软请求分析', link: '/middleware/finereport/view-report-analyze' }
          ]
        },
        {
          text: '帆软代理',
          items: [
            { text: '帆软代理需求', link: '/middleware/finereport-proxy/' },
            { text: '帆软代理设计', link: '/middleware/finereport-proxy/finereport-proxy-design' },
          ]
        }
      ],
      '/hardware/synology': [
        {
          text: '使用记录',
          items: [
            { text: '硬盘已损毁', link: '/hardware/synology/using/disk-broken' },
            { text: '存储池容量过低', link: '/hardware/synology/using/low-storage-space' },
            { text: 'DDNS注册失败', link: '/hardware/synology/using/ddns-wrong-password' },
          ]
        },
        {
          text: '维修记录',
          items: [
            { text: '主板故障', link: '/hardware/synology/fix/20241108' }
          ]
        }
      ]
    },


    socialLinks: [
      { icon: 'github', link: 'https://github.com/MikeZheng' },
      {
        icon: {
          svg: '<svg t="1731935618487" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4238" width="200" height="200"><path d="M512 992C246.895625 992 32 777.104375 32 512S246.895625 32 512 32s480 214.895625 480 480-214.895625 480-480 480z m242.9521875-533.3278125h-272.56875a23.7121875 23.7121875 0 0 0-23.71125 23.7121875l-0.024375 59.255625c0 13.08 10.6078125 23.7121875 23.6878125 23.7121875h165.96c13.104375 0 23.7121875 10.6078125 23.7121875 23.6878125v11.855625a71.1121875 71.1121875 0 0 1-71.1121875 71.1121875h-225.215625a23.7121875 23.7121875 0 0 1-23.6878125-23.7121875V423.1278125a71.1121875 71.1121875 0 0 1 71.0878125-71.1121875h331.824375a23.7121875 23.7121875 0 0 0 23.6878125-23.71125l0.0721875-59.2565625a23.7121875 23.7121875 0 0 0-23.68875-23.7121875H423.08a177.76875 177.76875 0 0 0-177.76875 177.7921875V754.953125c0 13.1034375 10.60875 23.7121875 23.713125 23.7121875h349.63125a159.984375 159.984375 0 0 0 159.984375-159.984375V482.36a23.7121875 23.7121875 0 0 0-23.7121875-23.6878125z" fill="#C71D23" p-id="4239"></path></svg>'
        },
        link: 'https://gitee.com/zrich'
      }
    ],

    // 添加底部配置
    footer: {
      copyright: '<a href="https://ipw.cn/ipv6webcheck/?site=www.zhengzhenfu.com" title="本站支持IPv6访问" target=\'_blank\'><img style=\'display:inline-block;vertical-align:middle\' alt="本站支持IPv6访问" src="https://static.ipw.cn/icon/ipv6-s1.svg"></a><a href="https://beian.miit.gov.cn/" target="_blank">您的备案号</a><a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2022104972号</a>',
      message: '本站内容仅用于学习交流，请勿用于商业用途。'
    }
  }
})
