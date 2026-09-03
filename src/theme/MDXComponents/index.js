/**
 * Mintlify → Docusaurus 组件映射层。
 * 本站文档源自官方文档，使用 Mintlify 专属组件（<Tip> <Card> <Steps> 等），
 * 在这里统一映射为 Docusaurus 等价物。
 */
import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import Admonition from '@theme/Admonition';
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

function makeAdmonition(type) {
  return function MintlifyAdmonition({title, children}) {
    return (
      <Admonition type={type} title={title}>
        {children}
      </Admonition>
    );
  };
}

function Step({title, children}) {
  return (
    <li className="mint-step">
      {title ? <strong className="mint-step-title">{title}</strong> : null}
      <div className="mint-step-body">{children}</div>
    </li>
  );
}

function Steps({children}) {
  return <ol className="mint-steps">{children}</ol>;
}

function Card({title, href, children}) {
  const inner = (
    <div className="mint-card">
      {title ? <div className="mint-card-title">{title}</div> : null}
      {children ? <div className="mint-card-body">{children}</div> : null}
    </div>
  );
  if (!href) {
    return inner;
  }

  const isExternal = /^(https?:)?\/\//.test(href) || href.startsWith('mailto:');
  // 站内静态资源（/img/xxx.png 等素材下载）带扩展名，不是 SPA 路由，
  // 必须用原生 <a>：走 <Link> 会被当成路由处理并触发坏链报错。
  const isAsset = !isExternal && /\.[a-z0-9]{2,5}(?:[?#].*)?$/i.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        className="mint-card-link"
        target="_blank"
        rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  if (isAsset) {
    return (
      <a href={href} className="mint-card-link">
        {inner}
      </a>
    );
  }
  // 站内文档路由：走 <Link> 以获得 SPA 跳转，并纳入 onBrokenLinks 校验。
  return (
    <Link to={href} className="mint-card-link">
      {inner}
    </Link>
  );
}

function CardGroup({children}) {
  return <div className="mint-card-group">{children}</div>;
}

function Accordion({title, children}) {
  return (
    <details className="mint-accordion">
      <summary>{title}</summary>
      <div className="mint-accordion-body">{children}</div>
    </details>
  );
}

function AccordionGroup({children}) {
  return <div className="mint-accordion-group">{children}</div>;
}

function Columns({children}) {
  return <div className="mint-columns">{children}</div>;
}

// 行内图标（如 <Icon icon="arrows-rotate" />）直接省略不渲染
function Icon() {
  return null;
}

export default {
  ...MDXComponents,
  Note: makeAdmonition('note'),
  Tip: makeAdmonition('tip'),
  Info: makeAdmonition('info'),
  Warning: makeAdmonition('warning'),
  Check: makeAdmonition('tip'),
  Tabs,
  TabItem,
  Steps,
  Step,
  Card,
  CardGroup,
  Accordion,
  AccordionGroup,
  Columns,
  Icon,
};
