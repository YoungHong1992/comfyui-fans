#!/usr/bin/env node
/**
 * 校验 docs/ 内所有站内链接：
 *   1. /docs/... 路由是否存在对应文档文件
 *   2. #锚点（同页与跨页）是否存在对应标题
 *
 * 锚点按 Docusaurus 的 slugger 规则计算，与实际渲染结果一致。
 * 用法：node scripts/check-internal-links.js
 */
const fs = require('fs');
const path = require('path');
const {createSlugger} = require('@docusaurus/utils');

const root = path.resolve(__dirname, '..');
const docsDir = path.join(root, 'docs');

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (/\.mdx?$/.test(name)) out.push(p);
  }
  return out;
}

const files = walk(docsDir);

// docId（相对 docs/ 的无扩展路径，正斜杠） -> 该文档的锚点集合
const anchorsByDoc = new Map();
for (const file of files) {
  const docId = path
    .relative(docsDir, file)
    .replace(/\\/g, '/')
    .replace(/\.mdx?$/, '');
  const text = fs.readFileSync(file, 'utf8');
  const slugger = createSlugger();
  const anchors = new Set();
  for (const line of text.split(/\r?\n/)) {
    const m = /^(#{1,6})\s+(.*?)\s*$/.exec(line);
    if (!m) continue;
    let heading = m[2];
    // 支持显式 {#custom-id}
    const explicit = /\{#([^}]+)\}\s*$/.exec(heading);
    if (explicit) {
      anchors.add(explicit[1]);
      continue;
    }
    // 去掉行内 markdown 标记，贴近 Docusaurus 的取值
    heading = heading
      .replace(/`([^`]*)`/g, '$1')
      .replace(/\*\*([^*]*)\*\*/g, '$1')
      .replace(/\*([^*]*)\*/g, '$1')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
    anchors.add(slugger.slug(heading));
  }
  anchorsByDoc.set(docId, anchors);
}

const problems = [];

for (const file of files) {
  const rel = path.relative(root, file);
  const selfId = path
    .relative(docsDir, file)
    .replace(/\\/g, '/')
    .replace(/\.mdx?$/, '');
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);

  lines.forEach((line, i) => {
    const targets = [];
    // markdown 链接 [text](target)
    for (const m of line.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) targets.push(m[1]);
    // JSX href="target" / to="target" / src="target"（src 覆盖 img、video、iframe）
    for (const m of line.matchAll(/(?:href|to|src)="([^"]+)"/g)) targets.push(m[1]);

    for (const raw of targets) {
      if (/^(https?:)?\/\//.test(raw) || raw.startsWith('mailto:')) continue;

      const [pathPart, hash] = raw.split('#');

      let targetId = null;
      if (pathPart === '' || pathPart === undefined) {
        targetId = selfId; // 同页锚点
      } else if (pathPart.startsWith('/docs/')) {
        targetId = pathPart.replace(/^\/docs\//, '').replace(/\/$/, '');
      } else if (pathPart.startsWith('/img/') || pathPart.startsWith('/assets/')) {
        const asset = path.join(root, 'static', pathPart);
        if (!fs.existsSync(asset)) {
          problems.push(`${rel}:${i + 1}  静态资源不存在  ${raw}`);
        }
        continue;
      } else if (pathPart.startsWith('/')) {
        continue; // 其它站内路径（如 /）交给构建校验
      } else {
        continue; // 相对路径，交给构建校验
      }

      if (!anchorsByDoc.has(targetId)) {
        problems.push(`${rel}:${i + 1}  文档不存在  ${raw}  (期望 docs/${targetId}.md)`);
        continue;
      }
      if (hash) {
        const decoded = decodeURIComponent(hash);
        if (!anchorsByDoc.get(targetId).has(decoded)) {
          problems.push(`${rel}:${i + 1}  锚点不存在  ${raw}`);
        }
      }
    }
  });
}

if (problems.length === 0) {
  console.log(`✔ 站内链接与锚点校验通过（${files.length} 个文档）`);
} else {
  console.log(`✘ 发现 ${problems.length} 个问题：\n`);
  for (const p of problems) console.log('  ' + p);
  process.exitCode = 1;
}
