# SkillGap AI

> Diagnostic skill assessment that finds *why* gaps exist, not just that they do. HR discovers which skills to assess, employees get adaptive follow-ups on low scores, and teams receive targeted interventions per root cause — not generic training for everyone.

## The Problem

Standard skill assessments return a number — "your team scores 2.3/5 on AI literacy." But a number doesn't tell you *why* the gap exists or what would actually fix it.

HR ends up buying the same generic training for everyone:
- 40% of employees had no tool access — training was useless for them
- 30% already knew the content — felt it was a waste of time
- 30% couldn't attend — sprint was too full

Budget is spent. The gap doesn't close. HR doesn't know why.

**The root cause: data without insight leads to interventions that miss the actual problem.**

## The Solution

SkillGap AI is a 4-step diagnostic platform:

### Step 1 — HR Discovery
HR answers plain-language questions about their team's real challenges — no technical knowledge required. Questions like: *"What's slowing your team down?"* and *"What's changing in your company?"* — not *"Which competencies need upskilling?"*

### Step 2 — AI Recommends Which Skills to Assess
Based on HR's answers, AI maps the challenges to specific skill gaps and recommends an assessment plan with clear reasoning. Skills that aren't relevant are explicitly excluded — so budget isn't wasted on the wrong assessment.

### Step 3 — Adaptive Employee Assessment
Employees self-assess their proficiency (1–5). Every score ≤ 3 automatically surfaces targeted follow-up questions to identify the root cause:
- Is the gap about missing tool access?
- Lack of formal training?
- No time to practice?
- No company policy or guidance?

### Step 4 — HR Gets Actionable Insights
Instead of a bar chart of scores, HR receives:
- **Root cause breakdown** per skill (not just the gap size)
- **Employee clusters** grouped by *why* they have the gap — each cluster needs a different intervention
- **Verbatim employee quotes** from open-text responses
- **Targeted intervention plan** per cluster — not one course for everyone

## Running the Next.js App

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Routes

| Route | Description |
|---|---|
| `/` | Overview and product story |
| `/discovery` | HR Discovery wizard and AI skill recommendation |
| `/assess` | Adaptive employee skill assessment |
| `/dashboard` | HR skill gap dashboard and intervention plan |

## Target Users

- **HR Managers** and **L&D (Learning & Development) teams** at mid-to-large companies
- Especially relevant during technology transitions — e.g. company-wide AI adoption, new tooling rollout, rapid team scaling
- Teams that have run assessments before but found the results weren't actionable

## Background

This prototype was built during a Ruangguru internal hackathon. The initial idea was an AI skill assessment tool, but mentor feedback surfaced a deeper problem: most skill assessment data (like engagement surveys rated 1–5) gives companies numbers without context.

The PES (Employee Engagement Survey) format was used as an analogy — if an employee rates "I would recommend this company as a great place to work" as a 2, HR knows there's a problem but has no idea what it is or how to fix it. SkillGap AI applies the same diagnostic thinking to skill gaps.

## Key Insight

> A score of 2/5 on "AI Tool Usage" could mean:
> - The employee never had tool access (fix: IT procurement)
> - The employee has tools but no time to learn (fix: dedicated learning hours)
> - The employee needs structured training (fix: enroll in a course)
> - The employee's manager doesn't encourage AI usage (fix: leadership alignment)
>
> **These are four completely different problems that require four completely different solutions.** Without knowing which one applies, any intervention is a guess.
