## Description:

Chinese fortune telling and BaZi chart reading skill that uses bundled local scripts to compute charts and classical-source references to guide agent interpretation across BaZi, Zi Wei Dou Shu, Liu Yao, Mei Hua, Qi Men, compatibility, and date selection.

This skill is ready for commercial/non-commercial use.

## Publisher:

[haiyangchenbj](https://clawhub.ai/user/haiyangchenbj)

### License/Terms of Use:

MIT-0

## Use Case:

External users and agent operators use this skill to compute and interpret Chinese metaphysics charts or divination readings, verify third-party fortune-telling reports, and produce bounded markdown dossiers for BaZi, Zi Wei Dou Shu, Liu Yao, Mei Hua, Qi Men, compatibility, and auspicious-date questions.

### Deployment Geography for Use:

Global

## Known Risks and Mitigations:

Risk: The skill can run bundled local Node scripts and write files, and its local file handling is broader than its stated safety boundaries.

Mitigation: Run it in a sandboxed workspace, review dependency installation before npm install, and restrict output paths and @file inputs away from sensitive project, profile, and agent-state files.

Risk: Fortune-telling workflows may request sensitive personal birth details such as date, time, sex, and birthplace.

Mitigation: Collect only the details needed for the requested chart, explain local-use boundaries before collection, and avoid persistent storage of the user's personal data.

## Reference(s):

- [Schools and Sources](references/00-schools-and-sources.md)
- [BaZi Geju](references/01-bazi-geju.md)
- [BaZi Tiaohou](references/02-bazi-tiaohou.md)
- [BaZi Mangpai](references/03-bazi-mangpai.md)
- [Zi Wei Dou Shu](references/04-ziwei.md)
- [Liu Yao](references/05-liuyao.md)
- [Mei Hua Yi Shu](references/06-meihua.md)
- [Qi Men Dun Jia](references/07-qimen.md)
- [Da Liu Ren](references/08-daliuren.md)
- [Qi Zheng Si Yu](references/09-qizheng-siyu.md)
- [Western Classical Astrology](references/10-western-classical.md)
- [Date Selection](references/11-zeri.md)
- [Compatibility and Luck Cycles](references/12-hehun-liunian.md)
- [Boundaries](references/99-boundaries.md)

## Skill Output:

**Output Type(s):** [text, markdown, shell commands, configuration, guidance]

**Output Format:** [Markdown reports with inline local shell commands and structured chart-reading guidance]

**Output Parameters:** [1D]

**Other Properties Related to Output:** [May write local markdown or text report files when the user asks for captured output.]

## Skill Version(s):

1.2.1 (source: frontmatter and server release metadata)

## Ethical Considerations:

Users should evaluate whether this skill is appropriate for their environment, review any generated or modified files before relying on them, and apply their organization's safety, security, and compliance requirements before deployment.
