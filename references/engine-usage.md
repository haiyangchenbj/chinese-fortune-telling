# 引擎与桥接脚本命令行用法（engine-usage）

> 本文件是 SKILL.md「Step 3 时间校正 / Step 4 排盘」命令示例的完整版。SKILL.md 正文用描述名指代脚本，实际文件名以本文件映射表为准，命令必须使用真实文件名。

## 文件名映射

| 描述名（SKILL.md 用语） | 实际文件 |
|---|---|
| 核验桥接脚本 | `scripts/verify-pillars.cjs` |
| 八字分析引擎脚本 | `scripts/engine/bazi-analysis.js` |
| 紫微引擎脚本 | `scripts/engine/ziwei.js` |
| cantian 择吉查询脚本 | `scripts/cantian/queryFortuneRange.ts` |

## Step 3 时间校正（原命令）

```powershell
Set-Location $SKILL_ROOT\scripts
& $NODE verify-pillars.cjs true-solar --beijing "2000-05-15T14:30:00" --longitude 120.16
```

该命令同时输出三件事，缺一不可：真太阳时、**1986–1991 夏令时判定**（落窗口则扣回 1 小时）、**距时辰边界的分钟数**。

## Step 4 排盘（原命令）

```powershell
Set-Location $SKILL_ROOT\scripts
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# 八字四柱（cantian 脚本无 --out，必须经 run-cantian.cjs 捕获）
# 参数：真太阳时、性别 1男/0女、子时流派 2=归当天(默认) / 1=归次日
& $NODE run-cantian.cjs buildBaziFromSolar.ts "2000-05-15T14:34:17" 1 2 --out "$env:TEMP\bazi.md"

# 格局用神（参数是四柱，不是出生时间——上游文档此处有误）
& $NODE run-engine.cjs bazi-analysis.js 庚辰 辛巳 癸酉 己未 --out "$env:TEMP\geju.txt"

# 统计辅助：明面五行比例（只计天干 4 位＋地支 4 位，不纳藏干；不等同旺衰）
& $NODE verify-pillars.cjs wuxing --pillars "庚辰 辛巳 癸酉 己未"
# 十神计数（排除日主，计入天干与地支藏干；用于结构观察与第三方口径核验）
& $NODE verify-pillars.cjs shishen --pillars "庚辰 辛巳 癸酉 己未"

# 紫微斗数（参数：日期、性别、时辰；时辰可传 HH:MM 或单字如 未）
& $NODE run-engine.cjs ziwei.js 2000-05-15 男 未 --out "$env:TEMP\ziwei.txt"

# 流年/流月/流日区间（JSON 走桥接脚本；注意 @ 必须加引号，见下方警告）
& $NODE run-cantian.cjs queryFortuneRange.ts "@query.example.json" --out "$env:TEMP\liunian.txt"

# 占断（同样走 run-engine.cjs）
& $NODE run-engine.cjs liuyao.js 012013 事业 --out "$env:TEMP\liuyao.txt"
& $NODE run-engine.cjs meihua.js 3 5 2 --out "$env:TEMP\meihua.txt"
& $NODE run-engine.cjs qimen.js 2026-03-24 15 --out "$env:TEMP\qimen.txt"

# 合婚 / 择吉
& $NODE run-engine.cjs marriage.js 甲 "甲子 乙丑 丙寅 丁卯" 乙 "庚辰 辛巳 癸酉 己未" --out "$env:TEMP\hehun.txt"
& $NODE run-engine.cjs zhuanshi.js best 2026-04 开业 --out "$env:TEMP\zeri.txt"
```

> **不要**直接 `& $NODE buildBaziFromSolar.ts ... --out f`——该脚本不认识 `--out`（只有 289 字节，仅 `console.log`），参数会被静默忽略且不报错。
