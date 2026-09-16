## Description:

This skill helps agents compute and interpret Chinese fortune-telling charts and readings, including BaZi, Zi Wei Dou Shu, Liu Yao, Mei Hua, Qi Men, compatibility, and auspicious-date selection, using bundled calculation scripts and classical-source interpretation boundaries.

This skill is ready for commercial/non-commercial use.

## Publisher:

[haiyangchenbj](https://clawhub.ai/user/haiyangchenbj)

### License/Terms of Use:

MIT-0

## Use Case:

External users and developers use this skill to generate Chinese metaphysics readings for birth-chart analysis, luck-cycle questions, single-question divination, compatibility checks, auspicious-date selection, and review of third-party fortune-telling reports. It is not intended for medical, legal, or investment recommendations.

### Deployment Geography for Use:

Global

## Known Risks and Mitigations:

Risk: Local bridge scripts may run files outside the intended folders.

Mitigation: Review or patch the wrappers before installation by adding explicit allowlists, rejecting absolute paths and traversal, and avoiding user-controlled script names or @file paths.

Risk: Readings may require sensitive personal data such as exact birth time, sex, birthplace, and longitude.

Mitigation: Tell users what data is optional, explain precision tradeoffs, and avoid retaining or exposing sensitive details beyond the requested reading.

Risk: Fortune-telling outputs can be mistaken for deterministic advice in high-impact domains.

Mitigation: Keep outputs non-absolute and decline medical, legal, and investment recommendations as described by the skill boundaries.

## Reference(s):

- [ClawHub skill page](https://clawhub.ai/haiyangchenbj/skills/chinese-fortune-telling)
- [00 · 流派分野与典籍源流](references/00-schools-and-sources.md)
- [01 · 子平格局派](references/01-bazi-geju.md)
- [02 · 调候扶抑派（滴天髓 · 穷通宝鉴）](references/02-bazi-tiaohou.md)
- [03 · 盲派：做功与宾主体用](references/03-bazi-mangpai.md)
- [04 · 紫微斗数](references/04-ziwei.md)
- [05 · 六爻纳甲](references/05-liuyao.md)
- [06 · 梅花易数](references/06-meihua.md)
- [07 · 奇门遁甲](references/07-qimen.md)
- [08 · 大六壬](references/08-daliuren.md)
- [09 · 七政四余](references/09-qizheng-siyu.md)
- [10 · 西方古典占星](references/10-western-classical.md)
- [11 · 择吉（协纪辨方书体系）](references/11-zeri.md)
- [12 · 合婚合盘与流年推断法](references/12-hehun-liunian.md)
- [99 · 断语纪律与红线](references/99-boundaries.md)

## Skill Output:

**Output Type(s):** [text, markdown, code, shell commands, configuration, guidance]

**Output Format:** [Markdown reports with supporting command examples and structured chart outputs]

**Output Parameters:** [1D]

**Other Properties Related to Output:** [Outputs should state the interpretive school, cite relevant classical references, avoid absolute predictions, and preserve sensitive birth details only as needed for the requested reading.]

## Skill Version(s):

1.2.0 (source: frontmatter and release evidence)

## Ethical Considerations:

Users should evaluate whether this skill is appropriate for their environment, review any generated or modified files before relying on them, and apply their organization's safety, security, and compliance requirements before deployment.
