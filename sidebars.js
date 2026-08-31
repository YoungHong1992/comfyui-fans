/**
 * 站点侧边栏结构 —— 对齐官方文档的信息架构（开始使用 / 基础概念 / 界面指南 / 教程），
 * 「教程」部分替换为本站的原创「总-分-总」工作流拆解系列。
 */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '介绍：如何使用本站',
    },
    {
      type: 'category',
      label: '开始使用',
      collapsible: true,
      collapsed: false,
      items: [
        'install',
        'first-generation',
      ],
    },
    {
      type: 'category',
      label: '基础概念',
      collapsible: true,
      collapsed: false,
      items: [
        'concepts/workflow',
        'concepts/nodes',
        'concepts/connections',
        'concepts/models',
      ],
    },
    {
      type: 'category',
      label: '界面指南',
      collapsible: true,
      collapsed: false,
      items: ['interface/overview'],
    },
    {
      type: 'category',
      label: '官方工作流拆解（总-分-总）',
      collapsible: true,
      collapsed: false,
      items: [
        'tutorials/t2i',
        'tutorials/i2i',
        'tutorials/inpaint',
        'tutorials/upscale',
        'tutorials/lora',
        'tutorials/controlnet',
        'tutorials/video',
      ],
    },
    {
      type: 'doc',
      id: 'summary',
      label: '总结：学习路线与进阶',
    },
  ],
};

module.exports = sidebars;
