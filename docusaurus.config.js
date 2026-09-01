// @ts-check
// NOTE: This site is an independent teaching replica inspired by the layout of
// docs.comfy.org (which is hosted on Mintlify, a closed platform). Docusaurus
// is the closest self-hostable open-source equivalent. All tutorial prose is
// original writing; ComfyUI is an open-source project by Comfy Org.

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ComfyUI Fans',
  tagline: '对齐官方文档的 ComfyUI 中文教程站，让每位爱好者都能学会 ComfyUI',
  favicon: 'img/favicon.svg',
  url: 'https://comfyui.fans',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        logo: {
          alt: 'ComfyUI Fans',
          src: 'img/logo.svg',
        },
        items: [
          { to: '/docs/get-started/intro', label: '开始使用', position: 'left' },
          {
            type: 'dropdown',
            label: '官方教程',
            position: 'left',
            items: [
              { to: '/docs/tutorials/basic/text-to-image', label: '文生图：基础示例' },
              { to: '/docs/tutorials/basic/image-to-image', label: '图生图' },
              { to: '/docs/tutorials/basic/inpaint', label: '局部重绘' },
              { to: '/docs/tutorials/basic/upscale', label: '图像放大' },
              { to: '/docs/tutorials/basic/lora', label: 'LoRA' },
              { to: '/docs/tutorials/controlnet/overview', label: 'ControlNet' },
              { to: '/docs/tutorials/video/wan2_2', label: 'Wan2.2 视频生成' },
            ],
          },
          {
            type: 'dropdown',
            label: '基础概念',
            position: 'left',
            items: [
              { to: '/docs/concepts/workflow', label: '工作流：节点式可视化编程' },
              { to: '/docs/concepts/nodes', label: '节点' },
              { to: '/docs/concepts/links', label: '连线' },
              { to: '/docs/concepts/models', label: '模型' },
            ],
          },
          { to: '/docs/interface/overview', label: '界面指南', position: 'left' },
          { to: '/docs/summary', label: '学习总结', position: 'left' },
          {
            href: 'https://docs.comfy.org/zh',
            label: '官方文档 ↗',
            position: 'right',
          },
          {
            href: 'https://github.com/comfyanonymous/ComfyUI',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: '文档',
            items: [
              { label: '介绍', to: '/docs/get-started/intro' },
              { label: '安装 ComfyUI', to: '/docs/get-started/install/overview' },
              { label: '首次生成图像', to: '/docs/get-started/first-generation' },
              { label: '学习总结', to: '/docs/summary' },
            ],
          },
          {
            title: '官方教程',
            items: [
              { label: '文生图（必读）', to: '/docs/tutorials/basic/text-to-image' },
              { label: '图生图', to: '/docs/tutorials/basic/image-to-image' },
              { label: '局部重绘', to: '/docs/tutorials/basic/inpaint' },
              { label: 'ControlNet', to: '/docs/tutorials/controlnet/overview' },
            ],
          },
          {
            title: '官方资源',
            items: [
              {
                label: 'ComfyUI 官方文档',
                href: 'https://docs.comfy.org/zh',
              },
              {
                label: 'ComfyUI GitHub 仓库',
                href: 'https://github.com/comfyanonymous/ComfyUI',
              },
              {
                label: 'Comfy 官网',
                href: 'https://www.comfy.org/',
              },
              {
                label: 'Comfy Examples 工作流模板',
                href: 'https://comfyanonymous.github.io/ComfyUI_examples/',
              },
            ],
          },
        ],
        copyright: `ComfyUI Fans（comfyui.fans）· 个人学习用途的独立爱好者教学站，与 Comfy Org 无从属关系。ComfyUI 采用 GPL-3.0 开源协议。`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'powershell'],
      },
      mermaid: {
        options: {
          fontFamily: 'inherit',
        },
      },
    }),
};

module.exports = config;
