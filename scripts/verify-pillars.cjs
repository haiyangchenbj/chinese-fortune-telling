#!/usr/bin/env node
'use strict';

/**
 * verify-pillars.cjs — 四柱交叉校验工具
 *
 * 解决的问题（都来自实战踩坑）
 *   1. 第三方 App 的命盘用了哪个时辰？——用「十神占比反解」逐项比对推定。
 *   2. 1986–1991 年出生的钟表时间是否落在夏令时窗口？——必须扣回 1 小时。
 *   3. 真太阳时换算后是否贴近时辰边界？——贴近时不得断言单一时辰。
 *   4. 两个引擎（cantian / bazi-analysis）算出的四柱是否一致？
 *
 * 用法
 *   node verify-pillars.cjs true-solar --beijing "2000-05-15T14:30:00" --longitude 120.16
 *   node verify-pillars.cjs true-solar --beijing "2000-05-15T14:30:00" --city 北京
 *   node verify-pillars.cjs shishen --pillars "庚辰 辛巳 癸酉 己未"
 *   node verify-pillars.cjs wuxing  --pillars "庚辰 辛巳 癸酉 己未"
 *   node verify-pillars.cjs hour-scan --solar "2000-05-15T14:34:17" --gender 1
 *   node verify-pillars.cjs compare --solar "2000-05-15T14:34:17" --gender 1 --claim "庚辰 辛巳 癸酉 己未"
 *
 * 时辰口径说明
 *   sect 1 = 23:00–23:59 的日柱取**次日**（夜子时进位派）
 *   sect 2 = 23:00–23:59 的日柱取**当日**（默认）
 *
 * 退出码
 *   0 成功 / 1 参数错误 / 2 引擎调用失败 / 3 校验发现不一致
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const CANTIAN_DIR = path.join(__dirname, 'cantian');
const ENGINE_DIR = path.join(__dirname, 'engine');

const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const SHICHEN_REPRESENTATIVE_HOUR = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];

// 1986–1991 年中国大陆夏令时窗口（北京时间口径，含首尾日）
// 依据：《在全国范围内实行夏令时的通知》，1986 年首发；1987 起固定为
// 四月中旬第一个星期日 02:00 起，九月中旬第一个星期日 02:00 止。
const DST_WINDOWS = [
  { year: 1986, start: '1986-05-04', end: '1986-09-14' },
  { year: 1987, start: '1987-04-12', end: '1987-09-13' },
  { year: 1988, start: '1988-04-10', end: '1988-09-11', note: '起日另有一说 1988-04-17，边界日需人工确认' },
  { year: 1989, start: '1989-04-16', end: '1989-09-17' },
  { year: 1990, start: '1990-04-15', end: '1990-09-16' },
  { year: 1991, start: '1991-04-14', end: '1991-09-15' },
];

const TEN_GODS = ['比肩', '劫财', '食神', '伤官', '偏财', '正财', '七杀', '正官', '偏印', '正印'];
const ELEMENTS = ['木', '火', '土', '金', '水'];
const STEM_ELEMENTS = {
  甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土', 己: '土',
  庚: '金', 辛: '金', 壬: '水', 癸: '水',
};
const BRANCH_ELEMENTS = {
  子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火',
  午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水',
};

const USAGE = `verify-pillars.cjs — 四柱交叉校验工具

用法:
  node verify-pillars.cjs true-solar --beijing <时间> (--longitude <经度> | --city <城市>)
  node verify-pillars.cjs shishen   --pillars "<年柱> <月柱> <日柱> <时柱>"
  node verify-pillars.cjs wuxing   --pillars "<年柱> <月柱> <日柱> <时柱>"
  node verify-pillars.cjs hour-scan --solar <时间> [--gender 1|0] [--sect 1|2]
  node verify-pillars.cjs compare   --solar <时间> [--gender 1|0] [--sect 1|2] --claim "<四柱>"

时间格式: YYYY-MM-DDTHH:mm[:ss]（不带时区）
--gender  1=男（默认）  0=女
--sect    1=夜子时进位  2=不进位（默认）

示例:
  node verify-pillars.cjs true-solar --beijing "2000-05-15T14:30:00" --longitude 114.5333
  node verify-pillars.cjs hour-scan --solar "2000-05-15T14:34:17" --gender 1`;

function die(message, code) {
  process.stderr.write(message + '\n');
  process.exit(code);
}

function parseFlags(argv) {
  const flags = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) {
      flags[key] = true;
    } else {
      flags[key] = next;
      i += 1;
    }
  }
  return flags;
}

function runNode(scriptPath, args, cwd) {
  const result = spawnSync(process.execPath, [scriptPath, ...args], {
    cwd,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  if (result.error) die(`调用引擎失败: ${scriptPath}\n${result.error.message}`, 2);
  if (result.status !== 0) {
    die(`引擎返回非零退出码 ${result.status}: ${scriptPath}\n${(result.stderr || '').trim()}`, 2);
  }
  return result.stdout || '';
}

function trueSolar(beijingTime, location) {
  return runNode(
    path.join(CANTIAN_DIR, 'convertToTrueSolarTime.ts'),
    [beijingTime, location],
    CANTIAN_DIR
  ).trim();
}

function buildBazi(solarTime, gender, sect) {
  const md = runNode(
    path.join(CANTIAN_DIR, 'buildBaziFromSolar.ts'),
    [solarTime, String(gender), String(sect)],
    CANTIAN_DIR
  );
  const match = md.match(/^- 八字：(.+)$/m);
  if (!match) die('无法从 cantian 输出中解析四柱：\n' + md.slice(0, 400), 2);
  return match[1].trim().split(/\s+/);
}

function analyzeShishen(pillars) {
  const report = runNode(
    path.join(ENGINE_DIR, 'bazi-analysis.js'),
    pillars,
    ENGINE_DIR
  );
  const counts = {};
  TEN_GODS.forEach((g) => { counts[g] = 0; });

  const block = (report.split('▶ 十神')[1] || '').split('▶')[0];
  const re = /（([^）]*)）/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    // 括号内形如「正官」或「丁食神/己偏财」或「辛七杀」
    m[1].split('/').forEach((piece) => {
      TEN_GODS.forEach((g) => {
        if (piece.endsWith(g)) counts[g] += 1;
      });
    });
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return { counts, total, report };
}

function shichenOfHour(hour) {
  return BRANCHES[Math.floor((hour + 1) / 2) % 12];
}

function hourOfTime(timeStr) {
  const m = /T(\d{1,2}):/.exec(timeStr);
  return m ? Number.parseInt(m[1], 10) : null;
}

function minutesOfTime(timeStr) {
  const m = /T(\d{1,2}):(\d{2})/.exec(timeStr);
  return m ? Number.parseInt(m[1], 10) * 60 + Number.parseInt(m[2], 10) : null;
}

function dateOfTime(timeStr) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(timeStr);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

function daysBetween(a, b) {
  return Math.round((new Date(a + 'T00:00:00').getTime() - new Date(b + 'T00:00:00').getTime()) / 86400000);
}

function findDstWindow(dateStr) {
  const year = Number.parseInt(dateStr.slice(0, 4), 10);
  const window = DST_WINDOWS.find((w) => w.year === year);
  if (!window) return { inside: false, window: null };
  const afterStart = daysBetween(dateStr, window.start) >= 0;
  const beforeEnd = daysBetween(dateStr, window.end) <= 0;
  return { inside: afterStart && beforeEnd, window };
}

function minusOneHour(timeStr) {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(timeStr);
  if (!m) die(`时间格式无法解析: ${timeStr}`, 1);
  const d = new Date(
    Number(m[1]), Number(m[2]) - 1, Number(m[3]),
    Number(m[4]), Number(m[5]), m[6] ? Number(m[6]) : 0
  );
  d.setHours(d.getHours() - 1);
  const p = (v) => String(v).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

// 以「距本时辰最近边界的分钟数」衡量精度风险。20 分钟以内即判为脆弱：
// 均时差表误差（数十秒）、报时取整（常以 5 分钟或「几点」口径给出，±15 分钟）、
// 夏令时首尾日三个因素叠加，足以翻转时辰。实战案例：
// 2000-05-15 钟表 08:00 → 扣夏令时 → 真太阳时 06:44:35，距卯/辰边界仅 15 分钟，
// 第三方 App 未扣夏令时因此定成辰时，两版结论分歧。
const BOUNDARY_RISK_MINUTES = 20;

function boundaryRisk(timeStr) {
  const total = minutesOfTime(timeStr);
  if (total === null) return null;
  const hour = Math.floor(total / 60);
  const idx = Math.floor((hour + 1) / 2) % 12;
  const startHour = (idx * 2 - 1 + 24) % 24;
  const intoShichen = (((total - startHour * 60) % 1440) + 1440) % 1440;
  const dist = Math.min(intoShichen, 120 - intoShichen);
  return { idx, startHour, endHour: (idx * 2 + 1) % 24, dist };
}

function cmdTrueSolar(flags) {
  const beijing = flags.beijing;
  const location = flags.longitude !== undefined ? flags.longitude : flags.city;
  if (!beijing || !location) die('true-solar 需要 --beijing 与 (--longitude | --city)\n\n' + USAGE, 1);

  const tst = trueSolar(beijing, location);
  const dateStr = dateOfTime(tst);
  const { inside, window } = findDstWindow(dateStr);
  const corrected = inside ? minusOneHour(tst) : tst;
  const out = [];

  out.push('【真太阳时换算】');
  out.push(`  钟表时间（东八区）：${beijing}`);
  out.push(`  地点参数：${location}`);
  out.push(`  真太阳时（未扣夏令时）：${tst}  → ${shichenOfHour(hourOfTime(tst))}时`);

  if (inside) {
    out.push('');
    out.push(`  ⚠ 该日落在夏令时窗口 ${window.start} ~ ${window.end}（北京时间口径）`);
    if (window.note) out.push(`    注：${window.note}`);
    out.push(`  真太阳时（扣回 1 小时后）：${corrected}  → ${shichenOfHour(hourOfTime(corrected))}时`);
    out.push(`  用于定时辰的是扣减后的 ${corrected}。`);
    if (Math.abs(daysBetween(dateStr, window.start)) <= 3 || Math.abs(daysBetween(dateStr, window.end)) <= 3) {
      out.push('  ⚠ 出生时间距窗口首尾 ≤3 天，夏令时当日是否已生效需人工确认。');
    }
  } else {
    out.push('');
    out.push('  ✅ 未落在 1986–1991 夏令时窗口内，无需扣减。');
  }

  // 边界贴近度提示——以实际用于定时辰的时间（即扣减后）为准
  const risk = boundaryRisk(corrected);
  if (risk && risk.dist <= BOUNDARY_RISK_MINUTES) {
    out.push('');
    out.push(`  ⚠ 距「${BRANCHES[risk.idx]}时」的边界仅约 ${risk.dist} 分钟`);
    out.push(`    （${BRANCHES[risk.idx]}时区间 ${String(risk.startHour).padStart(2, '0')}:00–${String(risk.endHour).padStart(2, '0')}:00）`);
    out.push('    此时不得断言单一时辰：应同时给出相邻时辰的盘，并明说分歧源于出生时刻。');
    out.push('    风险来源：cantian 均时差表存在少量录入纠偏（误差可达数十秒）、报时取整、');
    out.push('    以及夏令时首尾日边界。三者叠加足以翻转时辰。');
  }

  process.stdout.write(out.join('\n') + '\n');
}

function formatCounts({ counts, total }) {
  const parts = TEN_GODS
    .filter((g) => counts[g] > 0)
    .map((g) => `${g}${counts[g]}`);
  return `${parts.join(' / ')}   （合计 ${total}）`;
}

function parsePillarsFlag(flags, command) {
  const raw = flags.pillars;
  if (!raw) die(`${command} 需要 --pillars "<年柱> <月柱> <日柱> <时柱>"\n\n` + USAGE, 1);
  const pillars = String(raw).trim().split(/\s+/);
  if (pillars.length !== 4) die(`需要恰好 4 个柱，收到 ${pillars.length} 个：${raw}`, 1);
  pillars.forEach((pillar) => {
    if (!/^[甲乙丙丁戊己庚辛壬癸子丑寅卯辰巳午未申酉戌亥]{2}$/.test(pillar)) {
      die(`四柱格式错误：${pillar}。每柱应为一个天干加一个地支。`, 1);
    }
  });
  return pillars;
}

function cmdShishen(flags) {
  const pillars = parsePillarsFlag(flags, 'shishen');
  const { counts, total } = analyzeShishen(pillars);
  process.stdout.write(`【十神占比】四柱 ${pillars.join(' ')}\n  ${formatCounts({ counts, total })}\n`);
}

function cmdWuxing(flags) {
  const pillars = parsePillarsFlag(flags, 'wuxing');
  const counts = Object.fromEntries(ELEMENTS.map((element) => [element, 0]));
  pillars.forEach((pillar) => {
    const [stem, branch] = [...pillar];
    counts[STEM_ELEMENTS[stem]] += 1;
    counts[BRANCH_ELEMENTS[branch]] += 1;
  });
  const total = pillars.length * 2;
  const parts = ELEMENTS.map((element) => {
    const percentage = (counts[element] / total * 100).toFixed(1).replace('.0', '');
    return `${element} ${counts[element]}/${total}（${percentage}%）`;
  });
  process.stdout.write(
    `【明面五行分布】四柱 ${pillars.join(' ')}\n` +
    `  ${parts.join(' / ')}\n` +
    '  口径：天干 4 位＋地支 4 位各计一位，不纳入藏干；此统计不等同旺衰强弱分。\n'
  );
}

function cmdHourScan(flags) {
  const solar = flags.solar;
  if (!solar) die('hour-scan 需要 --solar <真太阳时>\n\n' + USAGE, 1);
  const gender = flags.gender === undefined ? 1 : Number(flags.gender);
  const sect = flags.sect === undefined ? 2 : Number(flags.sect);
  const dateStr = dateOfTime(solar);
  if (!dateStr) die(`时间格式无法解析: ${solar}`, 1);

  const rows = [];
  for (let i = 0; i < 12; i += 1) {
    const branch = BRANCHES[i];
    const hour = SHICHEN_REPRESENTATIVE_HOUR[i];
    const hh = String(hour).padStart(2, '0');
    const candidate = `${dateStr}T${hh}:30:00`;
    let pillars;
    try {
      pillars = buildBazi(candidate, gender, sect);
    } catch (e) {
      rows.push({ branch, pillars: '(计算失败)', summary: String(e.message || e) });
      continue;
    }
    const { counts, total } = analyzeShishen(pillars);
    rows.push({ branch, pillars: pillars.join(' '), summary: formatCounts({ counts, total }) });
  }

  const out = [];
  out.push('【十二时辰候选 · 十神占比反解】');
  out.push(`  基准真太阳时：${solar}   性别：${gender === 1 ? '男' : '女'}   sect：${sect}`);
  out.push('');
  rows.forEach((r) => {
    out.push(`  ${r.branch}时  ${r.pillars.padEnd(22)}  ${r.summary}`);
  });
  out.push('');
  out.push('  用法：把第三方报告的十神占比数字与本表逐项比对，');
  out.push('  命中项最多且量级一致的那一行，即该报告实际采用的时辰。');
  process.stdout.write(out.join('\n') + '\n');
}

function cmdCompare(flags) {
  const solar = flags.solar;
  if (!solar) die('compare 需要 --solar <真太阳时>\n\n' + USAGE, 1);
  const gender = flags.gender === undefined ? 1 : Number(flags.gender);
  const sect = flags.sect === undefined ? 2 : Number(flags.sect);

  const actual = buildBazi(solar, gender, sect);
  const out = [];
  out.push('【四柱复核】');
  out.push(`  输入真太阳时：${solar}   性别：${gender === 1 ? '男' : '女'}   sect：${sect}`);
  out.push(`  cantian 排盘：${actual.join(' ')}`);

  if (flags.claim) {
    const claim = String(flags.claim).trim().split(/\s+/);
    out.push(`  待核对方四柱：${claim.join(' ')}`);
    out.push('');
    const diffs = [];
    ['年柱', '月柱', '日柱', '时柱'].forEach((label, i) => {
      const same = claim[i] === actual[i];
      if (!same) diffs.push(`${label}：引擎 ${actual[i]} vs 待核对 ${claim[i]}`);
      out.push(`  ${same ? '✅' : '❌'} ${label}  引擎 ${actual[i]}   待核对 ${claim[i]}`);
    });

    const a = analyzeShishen(actual);
    const b = analyzeShishen(claim);
    out.push('');
    out.push('【十神占比对照】');
    out.push(`  引擎盘：${formatCounts(a)}`);
    out.push(`  待核对：${formatCounts(b)}`);
    TEN_GODS.forEach((g) => {
      if (a.counts[g] !== b.counts[g]) out.push(`    · ${g}：${a.counts[g]} vs ${b.counts[g]}`);
    });

    if (diffs.length) {
      out.push('');
      out.push('【结论】四柱存在分歧：');
      diffs.forEach((d) => out.push('  - ' + d));
      out.push('  处理方法：确认是否 (a) 夏令时未扣回，(b) 时辰边界，(c) 子时口径不同。见 true-solar 子命令。');
    } else {
      out.push('');
      out.push('【结论】四柱完全一致 ✅');
    }
    process.stdout.write(out.join('\n') + '\n');
    if (diffs.length) process.exit(3);
    return;
  }

  const { counts, total } = analyzeShishen(actual);
  out.push(`  十神占比：${formatCounts({ counts, total })}`);
  process.stdout.write(out.join('\n') + '\n');
}

function main() {
  const argv = process.argv.slice(2);
  const cmd = argv[0];
  if (!cmd || cmd === '--help' || cmd === '-h') {
    process.stdout.write(USAGE + '\n');
    return;
  }
  if (!fs.existsSync(CANTIAN_DIR)) die(`找不到 cantian 目录: ${CANTIAN_DIR}`, 2);
  if (!fs.existsSync(ENGINE_DIR)) die(`找不到 engine 目录: ${ENGINE_DIR}`, 2);

  const flags = parseFlags(argv.slice(1));
  switch (cmd) {
    case 'true-solar': cmdTrueSolar(flags); break;
    case 'shishen': cmdShishen(flags); break;
    case 'wuxing': cmdWuxing(flags); break;
    case 'hour-scan': cmdHourScan(flags); break;
    case 'compare': cmdCompare(flags); break;
    default: die(`未知子命令: ${cmd}\n\n` + USAGE, 1);
  }
}

main();
