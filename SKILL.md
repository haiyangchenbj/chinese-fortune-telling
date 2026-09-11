---
name: chinese-fortune-telling
slug: chinese-fortune-telling
displayName: "命理占卜 · Chinese Fortune Telling"
description: "Chinese fortune telling (算命 / 算卦 / 看八字 / 排盘) grounded in classical source texts: a bundled rule engine computes the chart, then the agent interprets it with an explicit school declaration. Computes BaZi Four Pillars (八字 / 四柱) with true-solar-time and 1986–1991 China DST correction via scripts/cantian (buildBaziFromSolar.ts, convertToTrueSolarTime.ts), pattern and useful-god analysis via scripts/engine/bazi-analysis.js, and Zi Wei Dou Shu palaces and four transformations via scripts/engine/ziwei.js. Also covers Liu Yao (六爻 / 起卦), Mei Hua Yi Shu (梅花易数), Qi Men Dun Jia (奇门遁甲), Da Liu Ren (大六壬), Qi Zheng Si Yu (七政四余), classical Western astrology, and date selection (择吉 / 择日 / 黄道吉日). Use whenever the user asks to 算命 / 算卦 / 批八字 / 看生辰八字 / 排盘 / 看命盘, asks about 运势 / 大运 / 流年 (luck cycles), 合婚 / 合盘 (compatibility), 择日 / 挑日子 (picking an auspicious date), wants a 起卦 / 占卜 / 问事 reading on one specific question, or asks whether a third-party fortune-telling app report (测测 / 生辰) is trustworthy. Also use for 术数 classic questions — 子平真诠、滴天髓、穷通宝鉴、三命通会、神峰通考、紫微斗数全书、增删卜易、卜筮正宗、梅花易数、御定奇门宝鉴、六壬大全、协纪辨方书、古典占星、Chinese metaphysics. Not for Tarot, sun-sign horoscopes, numerology, feng-shui layout, or any medical, legal, or investment recommendation. 中文摘要：以《子平真诠》《滴天髓》《穷通宝鉴》《协纪辨方书》等典籍为判据的命理推理引擎，排盘由随包脚本计算（含真太阳时与 1986–1991 夏令时校正），解读须声明流派并标注典籍出处。覆盖八字四柱、紫微斗数、六爻起卦、梅花易数、奇门遁甲、大六壬、七政四余、古典占星、合婚合盘、择日择吉。触发词：算命、算卦、看八字、批八字、生辰八字、排盘、看命盘、运势、流年、大运、合婚、合盘、择日、择吉、起卦、占卜、紫微斗数、六爻、梅花易数、奇门遁甲、子平真诠、滴天髓、穷通宝鉴。不做塔罗、星座运势、生命灵数、风水布局与医疗／法律／投资建议。"
description_zh: 算命、算卦、看八字、批生辰八字、排盘、看命盘、运势流年、紫微斗数、六爻起卦、梅花易数、奇门遁甲、合婚合盘、择日择吉——以《子平真诠》《滴天髓》《穷通宝鉴》《协纪辨方书》等经典为判据的命理推理引擎。排盘由脚本计算、可复算，解读须声明流派并标注典籍出处；不做星座运势、塔罗、生命灵数这类娱乐化内容。
description_en: Chinese fortune telling & BaZi chart reading — classical-source reasoning engine
version: 1.1.0
agent_created: true
read_when:
  - "帮我算算命 / 算个卦 / 看下我的八字 / 批生辰八字 / 排个盘 / 看命盘"
  - "今年运势怎么样 / 流年 / 大运走什么 / 什么时候转运"
  - "我们俩合不合 / 合婚 / 合盘 / 八字配对"
  - "下个月哪天适合开业 / 搬家 / 签约 / 挑个好日子 / 择吉"
  - "帮我起一卦 / 占卜 / 问个事 / 梅花易数 / 六爻 / 奇门起局"
  - "紫微斗数 / 七政四余 / 星盘"
  - "这个算命 App（测测 / 生辰）的结果准不准 / 帮我核验这份命理报告"
  - "子平真诠怎么讲 / 滴天髓 / 穷通宝鉴 / 三命通会 里的判法是什么"
not_for:
  - "塔罗牌占卜、星座运势、生命灵数／数字命理"
  - "风水布局、户型调理、九宫飞星方位布置（本 skill 只做择吉，不做空间调理）"
  - "疾病诊断、寿元预测、法律胜负、股票/基金/房产等具体投资标的建议"
  - "需要绝对肯定断言的场景（本 skill 强制非绝对句式）"
metadata:
  openclaw:
    emoji: "☯"
    tags: [算命, 算卦, 看八字, 批八字, 生辰八字, 排盘, 起卦, 看运势, 四柱, 命理, 术数, 紫微斗数, 六爻, 梅花易数, 奇门遁甲, 大六壬, 七政四余, 择吉, 择日, 合婚, 合盘, BaZi, Four Pillars, Chinese fortune telling, fortune telling, Chinese astrology, Zi Wei Dou Shu, Chinese divination, divination, I Ching, date selection, Chinese metaphysics]
    runtime:
      node: ">=22.6"
tags: [算命, 算卦, 看八字, 批八字, 生辰八字, 排盘, 看命盘, 起卦, 占卜, 看运势, 流年, 大运, 四柱, 命理, 术数, 紫微斗数, 六爻, 梅花易数, 奇门遁甲, 大六壬, 七政四余, 合婚, 合盘, 择吉, 择日, BaZi, Four Pillars, Chinese fortune telling, fortune telling, Chinese astrology, Zi Wei Dou Shu, Chinese divination, divination, I Ching, date selection, Chinese metaphysics]
---

# 命理占卜 · Chinese Fortune Telling

命理（八字／紫微）与占卜（六爻／梅花／奇门／大六壬）的经典判据推理引擎 —— 也就是通常说的**算命、算卦、看八字、排盘、起卦、合婚、择日**。

以经典文献为判据。**规则引擎做「算」，模型做「读」**——任何干支、星曜、卦象必须由 `scripts/` 算出，模型不得自造。解读必须声明所用流派，并可回溯到具体典籍。

## 何时使用 / 何时不用

用于：问命（一生格局）、问运（大运流年）、问事（单件吉凶）、合婚合盘、择吉选日、核验第三方命理报告。

不用于：塔罗、星座运势、生命灵数、风水空间调理、以及任何医疗／法律／投资结论。用户问这些时直接说明本 skill 不做，不要勉强套用术数框架。

## 路径与运行时

```
SKILL_ROOT = 本 skill 所在目录（下文 $SKILL_ROOT 指代它）
NODE       = node（需 ≥ 22.6，且已在 PATH 中；低于 22.6 需自行准备 tsx）
CANTIAN    = {SKILL_ROOT}/scripts/cantian   # 排盘 / 真太阳时 / 运势区间（.ts，依赖 cantian-tymext）
ENGINE     = {SKILL_ROOT}/scripts/engine    # 格局用神 / 紫微 / 占断 / 择吉（.js，依赖 iztro）

# 两个桥接层（**capture 输出一律走它们**，见下）
run-cantian.cjs   # 调 CANTIAN 的 .ts 脚本；支持 @file 传 JSON、--out 落盘
run-engine.cjs    # 调 ENGINE 的 .js 脚本；支持 @file 传 JSON、--out 落盘
```

**首次使用前装一次依赖**（依赖不随包分发，约 20 MB；全部为公开 npm 包，MIT）：

```powershell
Set-Location $SKILL_ROOT\scripts\cantian ; npm install
Set-Location $SKILL_ROOT\scripts\engine  ; npm install
```

装好后全程离线运行，不发起任何网络请求。

**为什么必须走桥接层**：`cantian` 的 `queryFortuneRange.ts` 要求 JSON 作为单个 argv 传入，PowerShell 会破坏引号；`engine` 的脚本一律不支持 `--out`，而 Windows 下经管道传中文 stdout 会被按 GBK 解码，输出全部乱码。两个桥接层都用 `spawnSync` 拿 buffer、由 Node 自己按 utf8 解码，全程不过 shell 管道。

引擎随本 skill 一并分发，不依赖任何外部插件目录。

PowerShell 下必须每轮先设 `[Console]::OutputEncoding = [System.Text.Encoding]::UTF8`，否则中文输出乱码。

## Workflow

### Step 1 [Deterministic] 问题分流

先归类，**禁止一次性混用多个体系**（信息过载且无法归因）。

| 类型 | 特征 | 主体系 | 辅助 |
|---|---|---|---|
| 问命 | 一生格局、性格底色、事业方向 | 八字（+紫微） | 七政四余 |
| 问运 | 某段时期的走势、何时转运 | 八字大运流年 | 紫微大限流年 |
| 问事 | 单件具体事成败、应期 | 六爻 / 梅花 | 奇门 |
| 合婚 | 双方关系、婚姻窗口 | 合盘（日主＋纳音＋宫位） | 紫微夫妻宫 |
| 择吉 | 挑日子、挑时辰 | 协纪辨方书体系 | 奇门 |
| 核验 | 第三方报告是否可信 | 交叉校验（`verify-pillars.cjs`） | — |

### Step 2 [Deterministic] 采集六要素与精度分级

必需：① 公历或农历出生日期 ② 出生时间（**钟表时间**，注明是否早/晚子时）③ 性别 ④ 出生地（真太阳时校正必需，要经度或城市名）⑤ 可选：双胞胎／剖腹产。

| 级别 | 拥有 | 可输出 |
|---|---|---|
| S | 日期＋准确时间＋出生地 | 四柱／紫微全盘／卦象，含真太阳时校正 |
| A | 日期＋时间，无出生地 | 同上但未校正真太阳时，须声明「结论仅供参考」 |
| B | 日期＋性别，无时间 | 仅年月日柱，无法定时柱与核心格局 |
| C | 仅年份 | 信息不足以排盘，转向六爻／梅花这类不依赖生辰的体系 |

**缺时辰绝不排时柱，也绝不用「推算」补时辰**，只能给到 B 级并明说。

### Step 3 [Deterministic] 时间校正（先做，不可跳）

```powershell
Set-Location $SKILL_ROOT\scripts
& $NODE verify-pillars.cjs true-solar --beijing "2000-05-15T14:30:00" --longitude 120.16
```

该命令同时输出三件事，缺一不可：真太阳时、**1986–1991 夏令时判定**（落窗口则扣回 1 小时）、**距时辰边界的分钟数**。

距边界 ≤20 分钟时不得断言单一时辰——必须同时给出相邻两个时辰的盘并说明分歧源于出生时刻。这是硬规则，不是提示。

出生地不在 cantian 内置城市表内（如县级地名）时**必须传十进制经度**，不能用邻近地级市代替。

### Step 4 [Deterministic] 排盘

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

> **`@file` 在 PowerShell 下必须加引号**：写成 `"@query.example.json"`，不能写 `@query.example.json`。
> PowerShell 把行首的 `@名` 解析为 **splatting 运算符**，未加引号是**解析期错误** —— 结果是**整个脚本块一条命令都不执行**，也不报「引用文件不存在」，排查时极易误判成桥接脚本的问题。JSON 输入一律加引号。

### Step 5 [Deterministic] 按需加载流派判据

**只加载本次用到的 1–3 篇**，不要全部读入。

| 体系 | Reference |
|---|---|
| 流派分野、典籍源流、四库坐标 | `references/00-schools-and-sources.md` |
| 子平·格局派（渊海子平／三命通会／星平会海／神峰通考／子平真诠） | `references/01-bazi-geju.md` |
| 子平·调候旺衰派（滴天髓／穷通宝鉴／千里命稿） | `references/02-bazi-tiaohou.md` |
| 盲派做功·宾主体用 | `references/03-bazi-mangpai.md` |
| 紫微斗数（三合派／飞星四化派） | `references/04-ziwei.md` |
| 六爻纳甲（火珠林／增删卜易／卜筮正宗） | `references/05-liuyao.md` |
| 梅花易数 | `references/06-meihua.md` |
| 奇门遁甲（御定奇门宝鉴／烟波钓叟歌） | `references/07-qimen.md` |
| 大六壬（六壬大全／毕法赋） | `references/08-daliuren.md` |
| 七政四余（果老星宗／星学大成） | `references/09-qizheng-siyu.md` |
| 西方古典占星（Tetrabiblos／Lilly） | `references/10-western-classical.md` |
| 择吉（协纪辨方书） | `references/11-zeri.md` |
| 合婚合盘与流年推断法 | `references/12-hehun-liunian.md` |
| 断语纪律与红线 | `references/99-boundaries.md` |

### Step 6 [Deterministic] 第三方字段筛选与本系统重算

核验第三方命理报告时，采用唯一筛选标准：**有命理意义，且能在本系统按透明、固定的规则重算，才保留；只有产品分数、稀有度或无法复算的算法，直接丢弃。**「与第三方结果一致」不是保留理由，最多是交叉验证结果。

| 字段 | 处理 | 本系统口径 |
|---|---|---|
| 四柱、真太阳时、夏令时、节气月界 | **保留为基础输入** | 必须由 `cantian` 与 `verify-pillars.cjs` 重算；第三方时辰不能覆盖本系统校正 |
| 明面五行分布 | **保留为统计辅助** | 天干 4 位 + 地支 4 位的五行计数，可转百分比；明确标注「明面分布」，不等同旺衰强弱。藏干另列，不与明面计数混合 |
| 十神计数／比例 | **保留为核验与结构辅助** | `verify-pillars.cjs shishen` 固定计算；排除日主，按天干与地支藏干固定计数；可用于反推第三方采用的时柱和计数口径，不单独推出强弱或财富结论 |
| 格局、强弱、调候、喜用 | **保留本系统重算结果** | 只引 `bazi-analysis.js` 与指定典籍；第三方同名只能记「交叉一致」，不能替代本系统判定 |
| 大运排布 | **保留本系统重算结果** | 性别、顺逆、起运年龄、交节基准全部重算；第三方排布只作核验 |
| 大运评分 | **丢弃** | 无透明、稳定、可复算的评分函数；不进入档案或结论 |
| 神煞名称与落柱 | **保留本系统重算结果，低权重** | 有传统判据且本系统能计算，可作为辅助字段；不得单独推出贵人、财富、疾病或事件 |
| 神煞稀有度、百分比、才华／魄力／成就分数 | **丢弃** | 产品自定义指标，无法由本系统经典判据重算 |
| 行业、方位、数字、颜色、伴侣五行 | **不直接保留** | 只有在本系统从喜用、配偶星、夫妻宫和行运重新推导后，才可写为有限度建议；第三方原句丢弃 |

#### 统计辅助的显示纪律

- 五行比例只能写成「明面八位中木 5/8（62.5%）」这类**带分母和口径**的统计，不能写成「木气 62.5%，所以身强」。
- 十神比例必须附总数、是否排除日主、是否计入藏干；第三方报告没有口径时，不能与本系统百分比直接比较。
- 统计辅助的视觉和文字层级低于格局、强弱、调候。
- 正式档案只展示本系统重算字段；第三方来源、原始数值和冲突过程进入内部核验留痕，不回填正式档案。

### Step 7 [LLM] 解读

按 `references/99-boundaries.md` 的句式纪律撰写。必须包含**流派声明**：用哪一派、为什么选它、该派在此局上的首要判据是什么。同一命局在格局派与调候派下结论可能相反，不声明流派的分析不可复核。

#### 7.1 专业判断与现实解释同段完成

报告的验收标准是：**读者看完后大致能懂，不需要再找另一个模型翻译**。专业术语可以保留，但不能只把术语串成结论。

每个主要判断按以下顺序自然写出：

1. **专业判断**：保留格局、十神、干支关系和典籍依据；分值只在口径透明时出现。
2. **机制解释**：说明是哪一柱、哪一支、哪一个生克／合冲造成该判断。
3. **现实落点**：紧接一句说明它在工作、资源、关系或行动节奏上通常表现为什么。
4. **边界**：用「倾向」「更容易」「需要留意」收口，不升级成确定性预测。

术语首次出现时必须在同一句给短释。例如：

- 「群比争财」后解释为「比劫偏多，资源分配和边界问题更值得提前管理」；
- 「官印相生」后解释为「规则、资质和平台背书更容易形成职业支撑」；
- 「卯酉冲」后解释为「原有节奏或关系位置容易出现重新调整」；
- 「贵人」必须落到可观察的支持机制，不能写成无条件兜底。

#### 7.2 各模块最低结构

- **命局定调**：一句总判断 + 现实中的主要矛盾，禁止只写五行计数。
- **专业校验**：先列真太阳时、夏令时、边界和节气事实，再解释这些事实为什么会改变月柱／时柱。
- **核心特征**：每条采用「判断 → 机制 → 现实表现」，4–5 条足够；神煞只能作为辅助信号。
- **大运／流年**：每个阶段写「主题 → 触发依据 → 适合推进的事项 → 需要防的事项」，不写未经判据支持的升级话术。
- **行动建议**：把命理倾向翻成可执行的决策纪律，不写「开运」「转运」等不可验证动作。
- **健康**：只写作息、运动、饮食和体检意识等一般性建议，不做疾病诊断。

### Step 8 [LLM] 自检

输出前逐条过：真太阳时是否校正 → 夏令时是否扣回 → 时辰是否贴边界（贴了就双盘并陈）→ 生日当天是否恰逢节气交接（是则月柱按交接时刻判定）→ 大运换运年份是否 10 年等差且与起运日期自洽 → 十神统计口径是否写清 → **强弱分与用神是否只取自 `bazi-analysis.js`** → 每个主要术语是否有现实解释 → 每个阶段是否有可执行动作 → 是否出现必然性或产品化强断言。

### Step 9 [Deterministic] 落盘

用 `templates/` 下对应模板生成归档文件，命名 `命理档案·{日主}{性别}命（{出生年月日}{时辰}）.md`，同类文件（如合盘）单独成档，不并入单人档案。

## Hard Rules

> 不可违反，优先级高于用户偏好。

1. **不许模型自造干支、星曜、卦象。** 一律先跑脚本。脚本输出与模型预期冲突时，以脚本为准并复核输入。
2. **必须声明流派。** 未声明流派的分析视为不合格。格局派与调候派是两套本质不同的学说，不得混着说还不标注。
3. **时辰未定时不排时柱**，不得用「反推」「推测」补时辰。第三方报告的反推只能用于核验，不能替代用户确认。
4. **生日当天有节气交接时，月柱按交接时刻判定**，不能只按日期。2000-05-05 立夏当天就是实例：同一个日期，12:00 得庚辰月、13:00 得辛巳月。
5. **贴边界的时辰必须双盘并陈**（距边界 ≤20 分钟），并明说分歧来源，不得挑一个说得漂亮。
6. **非绝对句式。** 只用「易于／利于／不利于……」「命理上呈现……倾向」「建议在……方向多投入」，禁止「你一定」「必将」「肯定会」「不可能」。
7. **红线内容不回答**，转中性话术：寿元生死、重大疾病、堕胎吉凶、犯罪复仇、投资标的、法律胜负、未经同意占卜他人隐私。用户出现情绪危机信号时停止命理输出，转情绪支持。
8. **不出娱乐化内容。** 不提塔罗、星座运势、生命灵数；不做「幸运色转运」这类无典籍依据的话术。
9. **术语必须带现实解释。** 主要专业判断后要紧接机制和现实落点；现实解释只能翻译已有判据，不得凭空增加人物画像、财富结论或事件预测。
10. **专业判断与现实建议分层。** 神煞不能单独推出贵人兜底，五行缺失不能推出疾病，命理不能直接推出投资、担保、买房或职业跃迁等高风险决策。

## Failure Handling

| 场景 | 处置 |
|---|---|
| 缺出生时间 | 降到 B 级，明说无法定时柱与核心格局，问用户是否补 |
| 缺出生地 | 按 A 级处理，声明未做真太阳时校正；若时辰贴边界则强烈建议补经度 |
| 出生地在城市表外 | 索要经度。拒给则用省会近似并显著标注误差量级 |
| 出生日期落在夏令时窗口首尾 ±3 天 | 不自行裁决是否生效，列为待人工确认项 |
| 真太阳时贴时辰边界 | 双盘并陈（见 Hard Rule 5） |
| 出现在城市表外且用户只给「几点」 | 精度降级，明说时辰可能翻转 |
| 脚本报模块缺失 | 在该目录 `npm install` 后重试一次；仍失败则报告缺失包名 |
| 脚本输出的四柱与第三方报告不一致 | 跑 `verify-pillars.cjs compare` 定位差异柱位与可能原因（夏令时／边界／子时口径） |
| 引擎脚本自身报错 | 记下脚本名与参数，换用另一引擎交叉验证；两个引擎都失败才判定为环境问题 |
| 用户要求预测生死／疾病／投资 | 拒答并说明原因，可转向性格与决策倾向这类可谈的部分 |

## Output Format

按问题类型收口，长度受控，不堆神煞、不重复免责声明。每个主要模块遵守「专业判断 → 机制 → 现实落点 → 边界」的顺序；现实落点直接融入段落。

**八字／紫微完整命盘**（800–1500 字）：
1. 命盘速览（四柱＋日主＋格局＋调候用神）＋一句读者能直接理解的总判断
2. 核心特征 3–5 条（每条：专业判断／机制／现实表现）
3. 分维度解读（按用户所问，未问的不铺开；落到现实选择和风险）
4. 大运／流年与应期（阶段主题／触发依据／可推进事项／需防事项）
5. 行动建议（宜／缓／避；每条是可执行的决策纪律）
6. 流派声明与免责（一段，不重复）

**流年问答** 300–600 字：每年写「主题 → 依据 → 现实动作」，不写必然事件。  
**六爻／梅花单次占断** 300–500 字：每一步写「卦象判定 → 作用机制 → 现实含义」。  
**择吉**：表格给候选日＋评分＋宜忌，并说明适用条件。

归档文件用 `templates/dossier.md`（单人）／`templates/hehun.md`（合盘）／`templates/gua-report.md`（占断）。

## 已知边界

> 引擎缺陷共 **10 处**（下表 + 各 reference 的「引擎能力边界」节）。凡标注为缺陷的字段一律自算或交叉验证，不得直接采信。

- **`engine/ziwei.js` 的八字月柱在交节日错误（已实测三例）**：它按「日期」判月柱，不按节气交接时刻，导致交节日全天月柱提前一位。实测 2000-05-05（立夏，cantian 实测翻转点在 **12:00–13:00** 之间）：06:00 时 cantian 得 `庚辰`、ziwei 得 `辛巳`；2000-06-05（芒种，实测翻转点在 **16:00–18:00** 之间）06:00 时 cantian 得 `辛巳`、ziwei 得 `壬午`，同向偏移；非交节日 2000-06-10 两者一致。**紫微盘体本身不受影响**（命宫以农历月定，与节气月无关）。**月柱一律以 cantian 为准**，交节日更不可采信 ziwei 的月柱。
  - **污染范围（2026-09-11 实测补全）**：该偏移不止影响打印的月柱，会向下游传播三块——**月令**（辰月→巳月）、**格局**（正官格→偏财格）、**扶抑取用方向**。实测 2000-05-05 立夏当天：ziwei 报「巳月·偏财格」，而 `bazi-analysis.js` 报「辰月·正官格（善用神 ❌ 否）」。→ 引用 ziwei 输出时**必须屏蔽其「八字」「月令」「格局」「用神」四块**，只采信命宫、十二宫、四化、大运大限。
- **`engine/ziwei.js` 内置的八字强弱算法与 `bazi-analysis.js` 口径不一致，方向可能相反（2026-09-11 新发现）**：同一命局两边给的日主强弱与扶抑方向可以完全对立。实测两组命例：甲木日主一方（2000-06-05 06:00），`bazi-analysis.js` 判 **弱 106 分、宜取印比生扶（水木）**，`ziwei.js` 判 **偏强 316 分、宜补土、宜避木火**——**方向相反**；癸水日主一方（2000-05-05 06:00）两引擎方向一致，但分值差 127（165 vs 292）。→ **强弱分与用神一律只引 `bazi-analysis.js`**（子平派专责模块），**永不在结论里引用 ziwei 输出的「综合 N 分」**。
- 不做风水空间调理（相宅相墓属四库术数类，但本 skill 不主推，也未随包附带相关脚本）。
- `engine/marriage.js` 的评分口径只计日主关系与年支关系，月柱冲、夫妻宫合**不计入分数**，因此分数偏低是口径问题而非关系差；须结合 `references/12-hehun-liunian.md` 的分项判读，不可只报分数。
- `engine/marriage.js` 的建议文案存在一处模板瑕疵：无论实际有无天干相合都会输出「天干相合，感情纽带强」。以「详细分析」区的数据为准，不要转述这句。
- `engine/marriage.js` 的地支关系表缺六破、六害、暗合。**注意**：cantian 的「刑冲合会」字段是**有**卯辰相害的（已实测），缺口只在 marriage.js 一侧，不要在结论里说「引擎不支持害」。
- `engine/jieqi.js` 只输出节气**日期**，不含交接**时刻**。要精确定位交节时刻，用 `run-cantian.cjs buildBaziFromSolar.ts` 逐时刻扫描月柱翻转点。
- `engine/zhuanshi.js` 的建除十二神整体偏移一位、冲字段格式错误（详见 `references/11-zeri.md`）。
- `engine/liuyao.js` 的六亲以日干而非卦宫为「我」、且无卦宫概念、世应为简化版（详见 `references/05-liuyao.md`）。
- `engine/meihua.js` 不做体用旺衰（详见 `references/06-meihua.md`）。
- `engine/qimen.js` 不输出局数、神盘、三奇六仪（详见 `references/07-qimen.md`）。
- cantian 的均时差表存在已标注的录入纠偏，误差可达数十秒；贴边界时须第二来源核对。
