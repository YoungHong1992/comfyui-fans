import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

/**
 * 内联 SVG 图标（原创几何风格，stroke 继承 currentColor）
 */
const Icon = ({ name, color = 'var(--ifm-color-primary)' }) => {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.9,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  const paths = {
    download: <><path d="M12 3v11" /><path d="m7 10 5 5 5-5" /><path d="M4 20h16" /></>,
    sparkles: <><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" /><path d="M19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16Z" /></>,
    puzzle: <><path d="M9 4h6v3a2 2 0 1 0 4 0h1v6h-3a2 2 0 1 0 0 4h3v3h-6v-3a2 2 0 1 0-4 0v3H4v-6h3a2 2 0 1 0 0-4H4V4h5Z" /></>,
    monitor: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="m4 18 5-5 3 3 4-4 4 4" /></>,
    wand: <><path d="m5 19 9-9" /><path d="M15 4v4M13 6h4" /><path d="M18.5 12.5v3M17 14h3" /><path d="M7.5 3.5v2.4M6.3 4.7h2.4" /></>,
    palette: <><path d="M12 21a9 9 0 1 1 9-9c0 2.5-2 3-3.5 3H16a2 2 0 0 0-1.5 3.3c.6.8.1 2.7-2.5 2.7Z" /><circle cx="7.8" cy="10.5" r="1" /><circle cx="12" cy="7.6" r="1" /><circle cx="16.2" cy="10.5" r="1" /></>,
    film: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 5v14M17 5v14M3 9.5h4M3 14.5h4M17 9.5h4M17 14.5h4" /></>,
    grid: <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></>,
    rocket: <><path d="M12 15c-2 0-3-1-3-3 0-3.5 1.5-7 3-9 1.5 2 3 5.5 3 9 0 2-1 3-3 3Z" /><path d="M7 14c-1.5.5-2.5 2.5-3 5 2.5-.5 4.5-1.5 5-3M17 14c1.5.5 2.5 2.5 3 5-2.5-.5-4.5-1.5-5-3" /><circle cx="12" cy="9" r="1.4" /></>,
    book: <><path d="M4 19V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z" /><path d="M4 19a2 2 0 0 0 2 2h13" /></>,
    flow: <><circle cx="5" cy="12" r="2.2" /><circle cx="19" cy="6" r="2.2" /><circle cx="19" cy="18" r="2.2" /><path d="M7 11.5 16.8 6.6M7 12.5l9.8 4.9" /></>,
    brush: <><path d="m15 5 4 4L8.5 19.5 3 21l1.5-5.5L15 5Z" /><path d="m13 7 4 4" /></>,
    check: <><circle cx="12" cy="12" r="9" /><path d="m8.5 12.5 2.5 2.5 4.8-5.5" /></>,
  };
  return (
    <span className="card-icon" style={{ color, background: `color-mix(in srgb, ${color} 13%, transparent)` }}>
      <svg {...common}>{paths[name]}</svg>
    </span>
  );
};

const Card = ({ icon, color, title, desc, to }) => (
  <Link className="card" to={to}>
    {icon ? <Icon name={icon} color={color} /> : null}
    <span className="card-title">{title}</span>
    <span className="card-desc">{desc}</span>
  </Link>
);

const Section = ({ icon, color, title, desc, children }) => (
  <section className="home-section">
    <div className="home-section-title">
      <Icon name={icon} color={color} />
      {title}
    </div>
    <p className="home-section-desc">{desc}</p>
    <div className={clsx('card-grid', 'cols-3')}>{children}</div>
  </section>
);

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="首页" description={siteConfig.tagline}>
      <main className="container">
        {/* ===== Hero ===== */}
        <div className="hero-banner">
          <span className="hero-badge">官方中文文档 · 原样搬运</span>
          <h1 className="hero-title">
            ComfyUI Fans
            <br />
            <span className="hero-title-sub">
              让每一位爱好者都能学会 ComfyUI
            </span>
          </h1>
          <p className="hero-sub">
            ComfyUI 是最流行的开源节点式生成式 AI 应用，可用于搭建图像、视频与音频生成工作流。
            本站对齐官方文档的信息架构，原样搬运官方中文教程内容；后续将推出逐节点的原创拆解文章。
          </p>
          <div className="hero-actions">
            <Link className="button button--lg btn-primary-lg" to="/docs/get-started/intro">
              从零开始学习
            </Link>
            <Link className="button button--lg btn-accent" to="/docs/tutorials/basic/text-to-image">
              直达文生图教程 →
            </Link>
          </div>
        </div>

        {/* ===== 开始使用 ===== */}
        <Section
          icon="rocket"
          title="开始使用"
          desc="五分钟完成安装，跑出你的第一张 AI 生成图像。"
        >
          <Card icon="download" title="系统要求与安装" desc="Windows / macOS / Linux 三大平台的安装方式、显卡与内存要求。" to="/docs/get-started/system-requirements" />
          <Card icon="sparkles" title="首次生成图像" desc="认识默认工作流的六个节点，按下队列按钮，生成属于你的第一张图。" to="/docs/get-started/first-generation" />
          <Card icon="puzzle" title="安装自定义节点" desc="用 ComfyUI-Manager 安装社区节点，解锁完整生态。" to="/docs/get-started/custom-nodes/install" />
          <Card icon="flow" title="工作流：节点式编程" desc="为什么 ComfyUI 用「节点 + 连线」组织生成流程？数据如何在节点间流动？" to="/docs/concepts/workflow" />
          <Card icon="monitor" title="界面指南" desc="画布、菜单、队列、节点库……官方界面的每个区域都有什么用？" to="/docs/interface/overview" />
          <Card icon="grid" title="连线与数据类型" desc="连线颜色对应不同的数据类型，颜色相同才能相连。" to="/docs/concepts/links" />
        </Section>

        {/* ===== 官方教程 ===== */}
        <Section
          icon="book"
          color="#c2410c"
          title="官方教程"
          desc="对齐官方教程目录：文生图、图生图、局部重绘、ControlNet……零基础也能一路学到底。"
        >
          <Card icon="image" color="#2563eb" title="文生图 ★ 必读" desc="官方最经典的入门工作流：加载模型、编写提示词、完成第一次生成。" to="/docs/tutorials/basic/text-to-image" />
          <Card icon="image" color="#2563eb" title="图生图" desc="以一张已有图像为起点，用降噪幅度控制改写程度。" to="/docs/tutorials/basic/image-to-image" />
          <Card icon="brush" color="#0891b2" title="局部重绘" desc="遮罩 + 降噪的组合拳：只重画画面的一角，其余原封不动。" to="/docs/tutorials/basic/inpaint" />
          <Card icon="grid" color="#7c3aed" title="图像放大" desc="加载放大模型，让生成结果拥有更高分辨率。" to="/docs/tutorials/basic/upscale" />
          <Card icon="palette" color="#0d9488" title="LoRA" desc="在 Checkpoint 之上叠加 LoRA，为模型注入角色或画风。" to="/docs/tutorials/basic/lora" />
          <Card icon="flow" color="#4f46e5" title="ControlNet" desc="用线条、深度、姿态控制画面结构，让提示词「指哪画哪」。" to="/docs/tutorials/controlnet/overview" />
          <Card icon="film" color="#be185d" title="视频生成工作流" desc="使用 Wan2.2 完成文生视频与图生视频。" to="/docs/tutorials/video/wan2_2" />
          <Card icon="check" color="#16a34a" title="学习总结与进阶路线" desc="全站知识点的总复盘：一张学习地图、一张参数速查表、一条进阶路径。" to="/docs/summary" />
        </Section>

        {/* ===== 官方资源 ===== */}
        <Section
          icon="book"
          color="#0f766e"
          title="官方资源"
          desc="本站内容搬运自官方中文文档，遇到偏差时请以官方渠道为准。"
        >
          <Card icon="book" color="#0f766e" title="ComfyUI 官方文档" desc="docs.comfy.org —— 官方中文文档，安装、概念与最新教程的第一手来源。" to="https://docs.comfy.org/zh" />
          <Card icon="grid" color="#0f766e" title="官方示例工作流库" desc="comfyanonymous.github.io/ComfyUI_examples —— 官方维护的各类工作流 JSON 模板。" to="https://comfyanonymous.github.io/ComfyUI_examples/" />
          <Card icon="puzzle" color="#0f766e" title="ComfyUI GitHub 仓库" desc="提问、报 Issue、下载最新版本，都在 comfyanonymous/ComfyUI。" to="https://github.com/comfyanonymous/ComfyUI" />
        </Section>
      </main>
    </Layout>
  );
}
