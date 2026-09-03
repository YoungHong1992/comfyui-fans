#!/usr/bin/env node
/**
 * 把正文中指向官方文档（docs.comfy.org/zh）的链接，改写为本站对应路由。
 *
 * 只改写下表中「本站确实存在对应页面」的链接；表外的官方链接一律保持外链，
 * 因为本站没有收录那些主题（开发指南、Cloud API、账户与订阅等）。
 *
 * 用法：node scripts/localize-doc-links.js [--dry]
 */
const fs = require('fs');
const path = require('path');

const OFFICIAL = 'https://docs.comfy.org';

// 官方路径 -> 本站路由
const MAP = {
  // 带锚点的条目必须先匹配，故下方按 key 长度降序执行
  '/zh/get_started/first_generation#3-安装绘图模型':
    '/docs/get-started/first-generation#3-安装绘图模型',
  '/zh/installation/install_custom_node#方法一comfyui-manager（推荐）':
    '/docs/get-started/custom-nodes/install#方法一comfyui-manager推荐',

  // 开始使用
  '/zh/installation/system_requirements': '/docs/get-started/system-requirements',
  '/zh/installation/desktop/windows': '/docs/get-started/install/desktop',
  '/zh/installation/comfyui_portable_windows': '/docs/get-started/install/portable',
  '/zh/installation/manual_install': '/docs/get-started/install/manual',
  '/zh/installation/update_comfyui': '/docs/get-started/update',
  '/zh/installation/install_custom_node': '/docs/get-started/custom-nodes/install',
  '/zh/manager/overview': '/docs/get-started/custom-nodes/manager',
  '/zh/get_started/first_generation': '/docs/get-started/first-generation',

  // 基础概念
  '/zh/basic-concepts/workflow': '/docs/concepts/workflow',
  '/zh/basic-concepts/nodes': '/docs/concepts/nodes',
  '/zh/basic-concepts/links': '/docs/concepts/links',
  '/zh/basic-concepts/models': '/docs/concepts/models',
  '/zh/basic-concepts/custom-nodes': '/docs/concepts/custom-nodes',
  '/zh/basic-concepts/dependencies': '/docs/concepts/dependencies',
  '/zh/basic-concepts/properties': '/docs/concepts/properties',

  // 界面指南
  '/zh/interface/overview': '/docs/interface/overview',
  '/zh/interface/maskeditor': '/docs/interface/maskeditor',
  '/zh/interface/features/template': '/docs/interface/template',

  // 教程
  '/zh/tutorials/basic/text-to-image': '/docs/tutorials/basic/text-to-image',
  '/zh/tutorials/basic/image-to-image': '/docs/tutorials/basic/image-to-image',
  '/zh/tutorials/basic/inpaint': '/docs/tutorials/basic/inpaint',
  '/zh/tutorials/basic/multiple-loras': '/docs/tutorials/basic/multiple-loras',
  '/zh/tutorials/basic/lora': '/docs/tutorials/basic/lora',
  '/zh/tutorials/controlnet/mixing-controlnets': '/docs/tutorials/controlnet/mixing-controlnets',
};

const entries = Object.entries(MAP).sort((a, b) => b[0].length - a[0].length);
const dry = process.argv.includes('--dry');

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (/\.mdx?$/.test(name)) out.push(p);
  }
  return out;
}

const root = path.resolve(__dirname, '..');
let totalHits = 0;
const changed = [];

for (const file of walk(path.join(root, 'docs'))) {
  const before = fs.readFileSync(file, 'utf8');
  let after = before;
  let hits = 0;

  for (const [from, to] of entries) {
    const needle = OFFICIAL + from;
    let idx = after.indexOf(needle);
    while (idx !== -1) {
      after = after.slice(0, idx) + to + after.slice(idx + needle.length);
      hits += 1;
      idx = after.indexOf(needle, idx + to.length);
    }
  }

  if (hits > 0) {
    totalHits += hits;
    changed.push([path.relative(root, file), hits]);
    if (!dry) fs.writeFileSync(file, after, 'utf8');
  }
}

changed.sort((a, b) => b[1] - a[1]);
for (const [f, n] of changed) console.log(`${String(n).padStart(3)}  ${f}`);
console.log(`\n${dry ? '[dry-run] 可改写' : '已改写'} ${totalHits} 处，涉及 ${changed.length} 个文件`);

// 剩余仍为外链的官方链接（本站未收录，属预期）
const remaining = new Map();
for (const file of walk(path.join(root, 'docs'))) {
  const txt = fs.readFileSync(file, 'utf8');
  for (const m of txt.matchAll(/https:\/\/docs\.comfy\.org[^\s)"'>\]]*/g)) {
    remaining.set(m[0], (remaining.get(m[0]) || 0) + 1);
  }
}
if (remaining.size) {
  console.log('\n仍保持外链（本站未收录该主题）：');
  for (const [url, n] of [...remaining].sort((a, b) => b[1] - a[1])) {
    console.log(`${String(n).padStart(3)}  ${url}`);
  }
}
