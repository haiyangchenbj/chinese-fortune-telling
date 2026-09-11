#!/usr/bin/env node
'use strict';

/**
 * run-cantian.cjs — 安全桥接层：把参数原样交给 cantian 的 TS 脚本。
 *
 * 为什么需要它
 *   cantian 的 queryFortuneRange.ts 要求把一个 JSON 字符串作为**单个 argv** 传入
 *   （见该文件 parseInput: const raw = args[2]）。
 *   PowerShell / cmd 在传递含双引号的参数时会破坏引号，报
 *   「参数 JSON 解析失败。请传入合法 JSON。」
 *   本脚本用 argv 数组直接传参，完全不经过 shell 解析，因此引号、换行、中文都安全。
 *
 * 用法
 *   node run-cantian.cjs <脚本名> [参数...]
 *
 *   @前缀      该参数改为「从文件读取内容」。用于 JSON 输入。
 *              ⚠ PowerShell 下必须加引号：`"@query.example.json"`。
 *                不加引号会被 PowerShell 解析为 splatting 运算符（解析期错误），
 *                整个脚本块一条命令都不执行，且不报任何有用信息。
 *   --out <f>  把 stdout 写入文件（默认直接打印到终端）。
 *
 * 示例
 *   node run-cantian.cjs buildBaziFromSolar.ts 2000-05-15T14:30:00 1 1
 *   node run-cantian.cjs convertToTrueSolarTime.ts 2000-05-15T14:30:00 120.16
 *   node run-cantian.cjs queryFortuneRange.ts "@query.example.json" --out result.txt
 *
 * 退出码
 *   0 成功 / 1 参数错误 / 2 找不到脚本 / 其他 = 被调用脚本的退出码（stderr 原样透传）
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const CANTIAN_DIR = path.join(__dirname, 'cantian');

const USAGE = `run-cantian.cjs — 安全桥接层：把参数原样传给 cantian 的 TS 脚本

用法:
  node run-cantian.cjs <脚本名> [参数...]

  @前缀       该参数改为从文件读取内容（用于 JSON 输入）。
              ⚠ PowerShell 下必须加引号，如 "@query.json"
  --out <f>   把 stdout 写入文件（默认打印到终端）

示例:
  node run-cantian.cjs buildBaziFromSolar.ts 2000-05-15T14:30:00 1 1
  node run-cantian.cjs queryFortuneRange.ts "@query.example.json" --out result.txt`;

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
  const scriptPath = path.join(CANTIAN_DIR, scriptName);
  if (!fs.existsSync(scriptPath)) {
    die(`找不到脚本: ${scriptPath}\n可用脚本:\n  ` +
      fs.readdirSync(CANTIAN_DIR).filter((f) => f.endsWith('.ts')).join('\n  '), 2);
  }

  // 拆出 --out，其余按顺序透传；@ 前缀展开为文件内容
  let outFile = null;
  const passthrough = [];
  for (let i = 1; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--out') {
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
    cwd: CANTIAN_DIR,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });

  if (result.error) die(`调用失败: ${result.error.message}`, 2);

  const stdout = result.stdout || '';
  if (outFile) {
    fs.writeFileSync(outFile, stdout, 'utf8');
    process.stdout.write(`已写入 ${outFile}（${stdout.length} 字符）\n`);
  } else {
    process.stdout.write(stdout);
  }
  if (result.stderr) process.stderr.write(result.stderr);
  process.exit(result.status === null ? 2 : result.status);
}

main();
