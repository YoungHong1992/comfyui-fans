/**
 * 图片资源本地化：把 docs/ 中引用的官方图床（mintcdn / raw.githubusercontent 等）
 * 下载到 static/img/，并把文档中的 URL 改写为本地路径。
 *
 * - 优先使用标签上的 data-path（官方原始资源路径）还原目录结构
 * - 没有 data-path 的（markdown 图片、部分 <source>）按 URL 路径推导
 * - <iframe> 嵌入（YouTube / Bilibili 播放器）不属于图片资源，保持外链
 *
 * 用法: node scripts/localize-images.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const STATIC_IMG = path.join(ROOT, 'static', 'img');
const URL_PREFIX = '/img/';

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (entry.name.endsWith('.md')) out.push(p);
  }
  return out;
}

/** 从 URL 推导本地相对路径（无 data-path 时的兜底） */
function relFromUrl(url) {
  const u = new URL(url);
  const segs = u.pathname.split('/').filter(Boolean);
  const file = segs.pop() || 'asset';
  // 只保留最后一级目录，避免路径过深
  const dir = segs.pop() || '';
  return path.posix.join('external', u.hostname.replace(/\W+/g, '-'), dir, file);
}

/** 收集一个文件里的所有媒体引用：[原始 URL, data-path 或 null] */
function collectRefs(text) {
  const refs = [];
  const tagRe = /<(?:img|source|video)\b[^>]*>/g;
  let m;
  while ((m = tagRe.exec(text))) {
    const tag = m[0];
    const src = tag.match(/\bsrc="(https?:\/\/[^"]+)"/);
    if (!src) continue;
    const dp = tag.match(/\bdata-path="([^"]+)"/);
    refs.push([src[1], dp ? dp[1] : null]);
  }
  const mdRe = /!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g;
  while ((m = mdRe.exec(text))) {
    refs.push([m[1], null]);
  }
  return refs;
}

async function main() {
  const files = walk(DOCS_DIR);
  // url -> 本地相对路径
  const urlMap = new Map();
  const usedRels = new Map(); // rel -> url，处理 data-path 冲突

  const fileRefs = new Map();
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    const refs = collectRefs(text);
    if (refs.length) fileRefs.set(file, { text, refs });
    for (const [url, dp] of refs) {
      if (urlMap.has(url)) continue;
      let rel = dp ? dp.replace(/^images\//, '') : relFromUrl(url);
      // 同一 rel 被不同 URL 占用时，加哈希后缀避免互相覆盖
      if (usedRels.has(rel) && usedRels.get(rel) !== url) {
        const ext = path.posix.extname(rel);
        const base = rel.slice(0, rel.length - ext.length);
        let i = 2;
        while (usedRels.has(`${base}-${i}${ext}`)) i++;
        rel = `${base}-${i}${ext}`;
      }
      usedRels.set(rel, url);
      urlMap.set(url, rel);
    }
  }

  console.log(`共发现 ${urlMap.size} 个外部媒体引用，开始下载…`);

  const entries = [...urlMap.entries()];
  let done = 0;
  let failed = 0;
  const CHUNK = 6;
  for (let i = 0; i < entries.length; i += CHUNK) {
    await Promise.all(
      entries.slice(i, i + CHUNK).map(async ([url, rel]) => {
        const dest = path.join(STATIC_IMG, rel);
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const buf = Buffer.from(await res.arrayBuffer());
          fs.mkdirSync(path.dirname(dest), { recursive: true });
          fs.writeFileSync(dest, buf);
          done++;
        } catch (err) {
          failed++;
          console.error(`下载失败 ${url}: ${err.message}`);
        }
      })
    );
  }

  // 改写文档中的 URL 为本地路径
  for (const [file, { text }] of fileRefs) {
    let out = text;
    for (const [url, rel] of urlMap) {
      out = out.split(url).join(URL_PREFIX + rel.split(path.sep).join('/'));
    }
    if (out !== text) fs.writeFileSync(file, out);
  }

  console.log(`下载完成 ${done}，失败 ${failed}。已改写 ${fileRefs.size} 个文档文件。`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
