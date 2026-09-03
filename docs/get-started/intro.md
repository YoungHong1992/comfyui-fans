---
title: 介绍
---

<div className="intro-hero">
  <img src="/img/logo/light.svg" className="logo-theme-light" width="204" height="57" />

  <img src="/img/logo/dark.svg" className="logo-theme-dark" width="204" height="57" />

  <div className="intro-social">
    <a href="https://github.com/Comfy-Org/ComfyUI/" target="_blank">
      <Icon icon="github" iconType="solid" size={32} />
    </a>

    <a href="https://x.com/ComfyUI" target="_blank">
      <Icon icon="x-twitter" iconType="solid" size={32} />
    </a>

    <a href="https://discord.com/invite/comfyorg" target="_blank">
      <Icon icon="discord" iconType="solid" size={32} />
    </a>

    <a href="https://raw.githubusercontent.com/Comfy-Org/docs/refs/heads/main/images/index/qrcode.jpg" target="_blank">
      <Icon icon="weixin" iconType="solid" size={32} />
    </a>

    <a href="https://www.youtube.com/@comfyorg" target="_blank">
      <Icon icon="youtube" iconType="solid" size={32} />
    </a>
  </div>

  <p className="intro-tagline">
    最强大的开源节点式生成式 AI 应用，支持构建图像、视频、音频和 3D 生成工作流。
  </p>
</div>

    <div className="intro-section">
      <h2>开始使用</h2>

      <CardGroup cols={3}>
        <Card title="下载安装" icon="download" href="https://docs.comfy.org/zh/installation/system_requirements">
          在 Windows、macOS 或 Linux 上安装 ComfyUI
        </Card>

        <Card title="首次生成" icon="rocket" href="https://docs.comfy.org/zh/get_started/first_generation">
          创建你的第一张 AI 生成图像
        </Card>

        <Card title="基础概念" icon="lightbulb" href="https://docs.comfy.org/zh/basic-concepts/workflow">
          理解工作流、节点和连接
        </Card>

        <Card title="Comfy 工作流" icon="globe" href="https://comfy.org/workflows">
          探索全球顶尖创作者和 ComfyUI 工作流模板
        </Card>
      </CardGroup>
    </div>

    <div className="intro-section">
      <h2>AI 智能体与 MCP</h2>

      <CardGroup cols={3}>
        <Card title="智能体工具概览" icon="robot" href="https://docs.comfy.org/zh/agent-tools">
          通过 MCP 连接 AI 智能体，生成图片、视频、音频和 3D 内容
        </Card>

        <Card title="Cloud MCP 服务器" icon="server" href="https://docs.comfy.org/zh/agent-tools/mcp">
          托管于 cloud.comfy.org 的 MCP — 在 Cloud GPU 上运行工作流
        </Card>

        <Card title="Comfy CLI" icon="terminal" href="https://docs.comfy.org/zh/agent-tools/cli">
          在终端使用 comfy generate（测试版）调用合作伙伴模型
        </Card>
      </CardGroup>
    </div>

    <div className="intro-section">
      <h2>学习与教程</h2>

      <CardGroup cols={3}>
        <Card title="界面指南" icon="window-maximize" href="https://docs.comfy.org/zh/interface/overview">
          了解 ComfyUI 界面导航
        </Card>

        <Card title="教程示例" icon="book-open" href="https://docs.comfy.org/zh/tutorials/basic/text-to-image">
          常见任务的分步指南
        </Card>

        <Card title="内置节点" icon="diagram-project" href="https://docs.comfy.org/zh/built-in-nodes/overview">
          详细了解每个 ComfyUI 节点
        </Card>
      </CardGroup>
    </div>

    <div className="intro-section">
      <h2>开发与扩展</h2>

      <CardGroup cols={3}>
        <Card title="开发指南" icon="code" href="https://docs.comfy.org/zh/development/overview">
          为 ComfyUI 开发做出贡献
        </Card>

        <Card title="自定义节点" icon="puzzle-piece" href="https://docs.comfy.org/zh/custom-nodes/overview">
          创建和发布自定义节点
        </Card>

        <Card title="本地 API" icon="terminal" href="https://docs.comfy.org/zh/development/comfyui-server/comms_overview">
          集成本地 ComfyUI 服务器
        </Card>

        <Card title="Cloud API" icon="cloud" href="https://docs.comfy.org/zh/development/cloud/overview">
          通过 Comfy Cloud API 运行工作流
        </Card>

        <Card title="Cloud API 参考" icon="book" href="https://docs.comfy.org/zh/development/cloud/api-reference">
          查看 ComfyUI Cloud API 参考文档
        </Card>
      </CardGroup>
    </div>

    <div className="intro-section">
      <h2>获取帮助</h2>

      <CardGroup cols={3}>
        <Card title="联系支持" icon="headset" href="https://docs.comfy.org/zh/support/contact-support">
          从我们的支持团队获取帮助
        </Card>

        <Card title="账户管理" icon="user-gear" href="https://docs.comfy.org/zh/account/create-account">
          创建、登录和管理你的账户
        </Card>

        <Card title="账单支持" icon="credit-card" href="https://docs.comfy.org/zh/support/subscription/subscribing">
          管理订阅和支付
        </Card>

        <Card title="故障排除" icon="circle-question" href="https://docs.comfy.org/zh/troubleshooting/overview">
          解决常见问题和错误
        </Card>

        <Card title="社区资源" icon="users" href="https://docs.comfy.org/zh/community/links">
          加入 ComfyUI 社区
        </Card>
      </CardGroup>
    </div>

    <div className="intro-about">
      <h2>关于 ComfyUI</h2>

      <p>
        由 <a href="https://github.com/comfyanonymous">comfyanonymous</a> 和其他<a href="https://github.com/Comfy-Org/ComfyUI/graphs/contributors">贡献者</a>开发。
      </p>

      <ul>
        <li><strong>ComfyUI</strong> 是一个基于节点的生成式 AI 界面和推理引擎</li>
        <li>用户可以通过节点组合各种 AI 模型和操作，实现高度可定制和可控的内容生成</li>
        <li>ComfyUI 完全开源，可以在本地设备上运行</li>
      </ul>
    </div>

