---
title: Contact Page Research — Multi-Audience Best Practices
date: 2026-06-01
tags:
  - website
  - contact-page
  - research
  - ux
status: research-complete
---

# Contact Page Research — Multi-Audience Best Practices

Research for adding a `/contact` page to [[project_workshop_website|growthmindsetparenting.com]]. Sean's audience breaks into three distinct groups, each with different needs and expectations.

---

## Core Pattern: Audience Routing First

The best contact pages don't open with a form — they open with a choice. Visitors self-select their category, and each path feels custom-built for them.

> [!tip] Mental model
> Think of it as a hotel lobby with three concierge desks. You walk up to the right one, and they already know what kind of help you need.

---

## What Top Creators Do

**Brené Brown, Marie Forleo, Amy Porterfield** all use variations of the same structure:

- 3 audience cards at the top (icons or brief descriptions)
- Each card has its own mini-pitch ("I'm a parent who needs help with..." vs. "I'm a school looking for...")
- Clicking through routes to a tailored experience — different form, different info, different tone

**Dr. Becky Kennedy (direct competitor)** separates speaking from general contact. Speaking gets its own page, not just a form tab.

---

## What Each Audience Needs

| Audience | What They Want | Best Format |
|----------|---------------|-------------|
| **Parents** | To feel heard, not processed | Warm form + response time expectation ("I read every message") |
| **Schools / Speaking** | Professionalism, credentials, clarity on what they get | Link to speaking page + intake form (event date, audience size, budget range) |
| **Brands / Partnerships** | To feel like they're reaching a real business | Direct email or link to media kit — no generic form |

---

## Recommendation for Sean

Three cards at the top of the contact page:

### "I'm a parent"
Warm, supportive language. Form with name, email, and what's going on with their kid. Low friction.

### "I want Sean to speak"
Brief credibility line (25k followers, middle school niche). Form that pre-qualifies: event type, date, audience size. Or link out to a dedicated Speaking page.

### "Brand or partnership inquiry"
"View our media kit" button + direct email. This audience doesn't want a form — they want a real media contact.

---

## One Thing Most Creators Miss

The contact page is also a conversion surface. Amy Porterfield and Pat Flynn both use their contact pages to catch undecided visitors:

> [!example]
> "Not sure where to start? Join 10,000 parents in the Saturday letter." 
> 
> A callout like this catches browsers before they bounce.

---

## Next Step

Build `app/contact/page.jsx` in the existing Next.js site, using the terracotta design system. Three audience cards → routed experiences.

See [[project_workshop_website]] for site architecture and deploy status.
