#!/usr/bin/env node
'use strict';

/**
 * run-engine.cjs — engine 层安全桥接：以 UTF-8 捕获脚本输出。
 *
 * 为什么需要它（两个真实问题）
 *   1. engine 层的脚本一律**不支持 --out**，只能 console.log；
 *   2. Windows 下（Git Bash / PowerShell）把 node 的中文 stdout 经管道传输会
 *      按 GBK 解码，中文全部乱码（实测：zhuanshi/ziwei/liuyao 输出均不可读）。
 *   本脚本用 spawnSync 拿 buffer，由 Node 自己按 utf8 解码后写盘，全程不经过 shell 管道。
 *
 * 用法
 *   node run-engine.cjs <脚本名> [参数...]
 *
 *   --out <f>  把 stdout 写入文件（**推荐**；不写则直接打印，中文可能乱码）
 *   @前缀      该参数改为「从文件读取内容」。用于 JSON 输入。
 *              ⚠ PowerShell 下必须加引号：`"@query.example.json"`。
 *                不加引号会被 PowerShell 解析为 splatting 运算符（解析期错误），
 *                整个脚本块一条命令都不执行。
 *
 * 示例
 *   node run-engine.cjs bazi-analysis.js 庚辰 辛巳 癸酉 己未 --out ..\..\out\bazi.txt
 *   node run-engine.cjs ziwei.js 2000-05-15 男 未 --out ..\..\out\ziwei.txt
 *   node run-engine.cjs zhuanshi.js best 2026-04 开业 --out ..\..\out\zeri.txt
 *
 * 注意
 *   若 --out 指向 workbuddy 之外的目录，先确保父目录存在（本脚本不建目录）。
 *   退出码：0 成功 / 1 参数错误 / 2 找不到脚本 / 其他 = 被调用脚本的退出码
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ENGINE_DIR = path.join(__dirname, 'engine');

const USAGE = `run-engine.cjs — engine 层安全桥接（UTF-8 安全，支持 --out）

用法:
  node run-engine.cjs <脚本名> [参数...]

  --out <f>   把 stdout 写入文件（推荐，避免中文乱码）
  @前缀       该参数改为从文件读取内容（用于 JSON 输入）
              ⚠ PowerShell 下必须加引号，如 "@input.json"

示例:
  node run-engine.cjs bazi-analysis.js 庚辰 辛巳 癸酉 己未 --out out\\bazi.txt
  node run-engine.cjs ziwei.js 2000-05-15 男 未 --out out\\ziwei.txt
  node run-engine.cjs zhuanshi.js best 2026-04 开业 --out out\\zeri.txt`;

function die(message, code) {
  process.stderr.write(message + '\n');
  process.exit(code);
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0 || argv[0] === '--help' || argv[0] === '-h') {
    process.stdout.write(USAGE + '\n');
    return;
  }

  const scriptName = argv[0];
  const scriptPath = path.join(ENGINE_DIR, scriptName);
  if (!fs.existsSync(scriptPath)) {
    die(
      `找不到脚本: ${scriptPath}\n可用脚本:\n  ` +
        fs
          .readdirSync(ENGINE_DIR)
          .filter((f) => f.endsWith('.js'))
          .join('\n  '),
      2,
    );
  }

  let outFile = null;
  const passthrough = [];
  for (let i = 1; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--out' || token === '-o') {
      outFile = argv[i + 1];
      if (!outFile) die('--out 后面必须跟一个文件路径', 1);
      i += 1;
      continue;
    }
    if (token.startsWith('@')) {
      const source = token.slice(1);
      if (!fs.existsSync(source)) die(`@ 引用的文件不存在: ${source}`, 1);
      passthrough.push(fs.readFileSync(source, 'utf8').trim());
      continue;
    }
    passthrough.push(token);
  }

  const result = spawnSync(process.execPath, [scriptPath, ...passthrough], {
    cwd: ENGINE_DIR,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });

  if (result.error) die(`调用失败: ${result.error.message}`, 2);

  const stdout = result.stdout || '';
  if (outFile) {
    fs.writeFileSync(outFile, stdout, 'utf8');
    process.stdout.write(`已写入 ${outFile}（${stdout.length} 字符）\n`);
  } else if (stdout) {
    // 直接打印仅作应急；中文可能被 shell 按 GBK 解码而乱码
    process.stdout.write(stdout);
  }
  if (result.stderr) process.stderr.write(result.stderr);
  process.exit(result.status === null ? 2 : result.status);
}

main();
