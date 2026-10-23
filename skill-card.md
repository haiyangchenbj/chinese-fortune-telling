## Description:

Produces Chinese astrology and divination readings, including BaZi charts, compatibility analysis, and auspicious-date suggestions, using bundled calculations and classical reference texts.

This skill is ready for commercial/non-commercial use.

## Publisher:

[haiyangchenbj](https://clawhub.ai/user/haiyangchenbj)

### License/Terms of Use:

MIT-0

## Use Case:

People seeking Chinese fortune-telling readings can use this skill to generate BaZi charts, explore relationship compatibility, consider auspicious dates, or interpret a specific divination question. Readings are interpretive and are not medical, legal, or investment advice.

### Deployment Geography for Use:

Global

## Known Risks and Mitigations:

Risk: Birth dates, exact times, birthplaces, gender, and relationship details are sensitive personal information.

Mitigation: Obtain consent before collecting details; provide only information needed for the requested reading.

Risk: Generated Markdown reports may retain personal details locally despite the skill's no-persistence claim.

Mitigation: Review where reports are saved, protect their access, and delete them when no longer needed.

Risk: An optional knowledge-directory override can point to unintended local content.

Mitigation: Leave FORTUNE_KNOWLEDGE_DIR unset unless its target is vetted and non-sensitive.

## Reference(s):

- [ClawHub skill release](https://clawhub.ai/haiyangchenbj/skills/chinese-fortune-telling)
- [Schools and classical sources](artifact/references/00-schools-and-sources.md)
- [Interpretation boundaries](artifact/references/99-boundaries.md)

## Skill Output:

**Output Type(s):** [Text, Markdown, Guidance]

**Output Format:** [Narrative Markdown readings, optional report files, and date-selection tables]

**Output Parameters:** [1D]

**Other Properties Related to Output:** [May save local Markdown reports containing personal birth or relationship details.]

## Skill Version(s):

1.2.2 (source: skill frontmatter and ClawHub release)

## Ethical Considerations:

Users should evaluate whether this skill is appropriate for their environment, review any generated or modified files before relying on them, and apply their organization's safety, security, and compliance requirements before deployment.
