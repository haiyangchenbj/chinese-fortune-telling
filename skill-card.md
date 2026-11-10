## Description:

Provides Chinese fortune-telling and chart readings grounded in classical sources, with reproducible calculations and an explicit school declaration.

This skill is ready for commercial/non-commercial use.

## Publisher:

[haiyangchenbj](https://clawhub.ai/user/haiyangchenbj)

### License/Terms of Use:


## Use Case:

External users can request Chinese metaphysical readings, chart calculations, compatibility analysis, or auspicious-date selection. The skill provides source-grounded interpretations and identifies the school used.

### Deployment Geography for Use:

Global

## Known Risks and Mitigations:

Risk: Sensitive birth details may be saved in identifiable local reports despite privacy assurances.

Mitigation: Before collecting birth details, make archiving optional, obtain explicit approval, agree on the storage location, and explain how the records can be deleted.

Risk: Setup downloads npm dependencies.

Mitigation: Review the dependency sources and package changes before installing or running the bundled tools.

Risk: Calculation defects could produce misleading readings.

Mitigation: Do not use readings to make consequential decisions; independently verify calculations when accuracy matters.

## Reference(s):

- [Schools and classical sources](artifact/references/00-schools-and-sources.md)
- [Interpretation boundaries](artifact/references/99-boundaries.md)
- [Calculation engine usage](artifact/references/engine-usage.md)

## Skill Output:

**Output Type(s):** [Analysis, Markdown, Guidance]

**Output Format:** [Markdown readings and plain-text interpretations, optionally including computed chart details and named source references]

**Output Parameters:** [1D]

**Other Properties Related to Output:** [Interpretations use non-absolute language and are not medical, legal, or investment advice.]

## Skill Version(s):

1.2.3 (source: frontmatter)

## Ethical Considerations:

Users should evaluate whether this skill is appropriate for their environment, review any generated or modified files before relying on them, and apply their organization's safety, security, and compliance requirements before deployment.
