/**
 * 站点侧边栏结构 —— 对齐官方文档（docs.comfy.org/zh）的信息架构：
 * 开始使用 / 基础概念 / 界面指南 / 教程。
 * 内容基于官方文档整理，包含本站的调整，并做组件映射与链接修复。
 */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '开始使用',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'get-started/intro',
          label: '介绍',
        },
        'get-started/system-requirements',
        {
          type: 'category',
          label: '安装 ComfyUI',
          collapsible: true,
          collapsed: false,
          items: [
            'get-started/install/overview',
            'get-started/install/desktop',
            'get-started/install/portable',
            'get-started/install/manual',
          ],
        },
        'get-started/first-generation',
        'get-started/shared-models',
        'get-started/update',
        {
          type: 'category',
          label: '自定义节点与 Manager',
          collapsible: true,
          collapsed: false,
          items: [
            'get-started/custom-nodes/install',
            'get-started/custom-nodes/manager',
            'get-started/custom-nodes/manager-install',
          ],
        },
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
        'concepts/links',
        'concepts/models',
        'concepts/custom-nodes',
        'concepts/dependencies',
        'concepts/properties',
      ],
    },
    {
      type: 'category',
      label: '界面指南',
      collapsible: true,
      collapsed: false,
      items: [
        'interface/overview',
        'interface/maskeditor',
        'interface/template',
        'interface/shortcuts',
      ],
    },
    {
      type: 'category',
      label: '教程',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: '基础示例',
          collapsible: true,
          collapsed: false,
          items: [
            'tutorials/basic/text-to-image',
            'tutorials/basic/image-to-image',
            'tutorials/basic/inpaint',
            'tutorials/basic/outpaint',
            'tutorials/basic/upscale',
            'tutorials/basic/lora',
            'tutorials/basic/multiple-loras',
          ],
        },
        {
          type: 'category',
          label: 'ControlNet',
          collapsible: true,
          collapsed: false,
          items: [
            'tutorials/controlnet/overview',
            'tutorials/controlnet/pose-controlnet-2-pass',
            'tutorials/controlnet/depth-controlnet',
            'tutorials/controlnet/mixing-controlnets',
          ],
        },
        'tutorials/utility/preprocessors',
        {
          type: 'category',
          label: '模型专题',
          collapsible: true,
          collapsed: false,
          items: [
            'tutorials/flux/flux-1-text-to-image',
            'tutorials/qwen/qwen-image',
            'tutorials/video/wan2_2',
          ],
        },
      ],
    },
    {
      type: 'doc',
      id: 'summary',
      label: '学习总结',
    },
  ],
};

module.exports = sidebars;
