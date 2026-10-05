# CURIO — Learning isn't a lesson. It's an adventure.

**LEARN. PLAY. DO. CREATE.**

Curio is an interactive learning world for children aged **5–8**, built India-first. Children learn an idea, play with it in an interactive challenge, **do it in the real world** with their family, and **create** something new — with an AI coach that looks at what they actually built.

🔗 **Live prototype:** https://curio-nine-dusky.vercel.app
🎯 **Built for:** Pitch Perfect 2026 (college startup / business pitch competition)

> **Status:** working MVP prototype. All pricing, unit economics and market figures in this document are **illustrative targets** unless a source is cited, and must be validated before being presented as facts.

---

## Table of contents

1. [The pitch in 60 seconds](#1-the-pitch-in-60-seconds)
2. [Problem](#2-problem)
3. [Solution](#3-solution)
4. [Product features (what is built)](#4-product-features-what-is-built)
5. [Curio Coach — vision + LLM + real objects](#5-curio-coach--vision--llm--real-objects)
6. [Curio Build Box — physical + digital](#6-curio-build-box--physical--digital)
7. [Safety, privacy and trust](#7-safety-privacy-and-trust)
8. [Target audience and market](#8-target-audience-and-market)
9. [Business model and monetization](#9-business-model-and-monetization)
10. [Competitors and moat](#10-competitors-and-moat)
11. [Execution, traction and roadmap](#11-execution-traction-and-roadmap)
12. [Risks and mitigations](#12-risks-and-mitigations)
13. [Competition coverage map (Rounds 2 and 3)](#13-competition-coverage-map-rounds-2-and-3)
14. [Live demo script](#14-live-demo-script)
15. [Pitch defense — likely questions](#15-pitch-defense--likely-questions)
16. [Technical overview](#16-technical-overview)
17. [Running the project](#17-running-the-project)
18. [Known limitations](#18-known-limitations)

---

## 1. The pitch in 60 seconds

- **Problem:** Most screen time for young children is passive. Learning stays on the screen, and parents can't see what their child can actually *do*.
- **Solution:** A learning world where every mission follows one loop — **Learn → Play → Do → Create** — and ends **off the screen**, with a real-world task done with family.
- **What makes it different:** Curio connects **digital missions, physical build kits and an AI coach that sees real creations**. Competitors are strong at on-screen academics or gamification; Curio focuses on applying learning in the real world.
- **Business:** Freemium app → Premium Family subscription → monthly **Build Box** add-on → **School licensing** with classroom kit packs.
- **Proof it's real:** A working, deployed prototype with 5 interactive missions, parent and teacher dashboards, a parent gate, a live AI coach, and a physical-kit unlock flow.

---

## 2. Problem

| Problem | Why it matters |
|---|---|
| **Screen time is mostly passive** | Children watch and tap. Many apps reward time-on-screen and streaks rather than understanding. |
| **Learning stays on the screen** | Answering a quiz correctly is not the same as being able to use an idea in daily life (money, plants, building, reasoning). |
| **Parents can't see real progress** | Scores and streaks don't tell a parent what their child is good at or how to help at home. |
| **Most content isn't India-first** | Contexts, currency and language often don't match Indian children's daily lives; regional-language support is limited. |
| **Schools lack simple tools** | Teachers of young classes need quick ways to spot gaps and assign meaningful practice, aligned to the curriculum. |

---

## 3. Solution

Every Curio mission follows the same four-step loop:

| Step | Where | What happens |
|---|---|---|
| 💡 **LEARN** | On screen · 2–3 min | A short, visual idea. No lectures. |
| 🎮 **PLAY** | On screen · 5–8 min | An interactive challenge where choices have consequences. |
| 🌍 **DO** | Off screen · at home | A real-world mission done with family. |
| 🎨 **CREATE** | Back on screen · 5 min | Build something new with what was learned — and show it to Curio Coach. |

**Product principles** (from `docs/Rules.md`):
- *Rewards encourage learning. They don't replace it.* No casino-like mechanics, no loot boxes.
- Curio describes **"emerging strengths"** — it never labels or diagnoses a child.
- **India-first:** ₹ currency, Indian names and contexts, English / हिन्दी / मराठी.
- Honest claims only — no unverifiable statements about competitors.

---

## 4. Product features (what is built)

### Pages

| Route | Page | Highlights |
|---|---|---|
| `/` | **Landing page** | Hero with a clickable illustrated world map, the Curio loop, problem framing, Curio Coach section, Build Box teaser, kids/parents/schools cards, safety strip. |
| `/world` | **Learning World** | Map of 7 mission locations, XP and level, "Play again" for completed missions, **Reset demo** button for presenters. |
| `/how-it-works` | **How It Works** | Interactive Learn→Play→Do→Create walkthrough across 3 real missions, sign-up-to-progress journey, child/parent/teacher roles. |
| `/kits` | **Curio Build Box** | Monthly physical kit concept, QR/code unlock demo, 6-kit catalog, plans, unit economics, risks. |
| `/parents` | **Parent Dashboard** | Behind the parent gate. Weekly activity, emerging strengths, area to support, real-world activity ideas, logged real-world results. English / Hindi / Marathi. |
| `/schools` | **School / Teacher Mode** | Class skill heatmap, auto-detected class gap and strength, one-click "assign a support mission", assignment tracking, curriculum map (NCF-FS). |
| `/safety` | **Safety & Trust** | Six safety commitments, "what we collect / what we don't", interactive parent-gate demo, DPDP Act compliance roadmap. |
| `/business` | **Business Model** | Freemium, Premium Family, Build Box and School Licensing tiers; growth partnerships. |
| `/differentiation` | **Competitive Differentiation** | Honest comparison table (Curio today vs 12-month target vs 5 competitors) and "Why it's hard to copy". |
| `/demo` | **Pitch Demo** | Guided 4-stage experience (plants): Learn → interactive Play → Do → Create → learning impact summary. |

### Missions

| Location | Mission | Skills | Status |
|---|---|---|---|
| 🏪 Marketplace | **Plan the Perfect Picnic** — buy food for 5 friends with ₹200, then decide what to do with the change (save, share, donate, treat) | Math, financial literacy, decision making | ✅ Built |
| 🔬 Science Lab | **Maya's Seed** — set sunlight, water and soil, observe what grows and why | Science, variables, cause & effect | ✅ Built |
| 🚀 Space Station | **Base Camp Selection** — compare planets, choose a safe home for the crew, handle an emergency | Reasoning, science, decision making | ✅ Built |
| 🎨 Creative Studio | **Creature Creator** — design your own creature and its features | Creativity, design, expression | ✅ Built |
| 💡 Inventor's Workshop | **Build a Bridge** — shape test (square vs triangle), design beam/arch/truss with limited sticks, load test, build it for real, log the result, AI Coach feedback | Engineering, shapes, forces, problem solving | ✅ Built · **AI** · **Kit-enabled** |
| 🌳 Explorer Forest | Nature Detective | Observation, classification | 🔒 Coming soon |
| 📖 Story Village | Finish the Story | Reading, vocabulary | 🔒 Coming soon |

### Cross-cutting features

- **Learner progress** (XP, level, 9 skills, badges, completed missions, unlocked kits, real-world results) saved in the browser.
- **Badges:** Money Explorer, Junior Scientist, Space Explorer, Creative Inventor, Young Engineer.
- **Parent gate:** a 4-digit number written in words must be typed as digits; new number every time; 30-second lockout after 3 wrong tries. Protects the Parent Dashboard, purchases and AI photo consent.
- **Multilingual:** Parent Dashboard and Curio Coach in English, Hindi and Marathi.
- **Responsive:** desktop, laptop, tablet and phone; mobile menu below laptop width.
- **Accessibility touches:** reduced-motion support, ARIA labels on interactive controls, no browser `alert()` pop-ups.

---

## 5. Curio Coach — vision + LLM + real objects

The AI feature that connects the digital world to what children build in real life.

**How it works**
1. In the Build a Bridge mission's **Hack it!** step, a parent gives consent through the parent gate (once per session).
2. The child photographs their real bridge. The photo is **resized on the device** (max 1024 px JPEG).
3. A serverless function sends it to a vision-language model, which returns structured feedback:
   - 👀 **What I see** · 🌟 **Specific praise** · 🔬 **Why it works** · 🛠️ **One hack to try next** · a short note for the parent.
4. The child can choose **English or हिन्दी** (Marathi is available, but quality is currently weaker).
5. The result appears on the **Parent Dashboard**.

**Shortcut for demos:** `/world/inventor?coach=1` opens the mission directly at the Coach step (also linked from the landing page).

**AI provider**
| Environment variable | Provider | Notes |
|---|---|---|
| `GROQ_API_KEY` | Groq free tier, model `qwen/qwen3.8-27b` | Currently live. ~2 photos per minute on the free tier. |
| `ANTHROPIC_API_KEY` | Claude (`claude-opus-5-5`) | Used automatically if set. Higher quality, especially for Hindi/Marathi; paid. |
| neither | Demo mode | Clearly labelled sample feedback. |

**Safeguards:** parent consent; photos are not stored by Curio; if a face or person is visible, the coach asks for a new photo instead of describing them; unsafe or unrelated photos are handled gently; replies use a strict JSON schema; per-IP rate limiting; input validation.

**Why it's a moat (and why it isn't):** any company can call the same AI models. The advantage is what the AI sees — photos and results of children's **real-world builds**, connected to Curio's missions and kits — data that screen-only apps don't collect.

---

## 6. Curio Build Box — physical + digital

Inspired by subscription build-box models such as **Mark Rober's CrunchLabs**, adapted for **ages 5–8 in India** (simpler builds, local materials, ₹ pricing, guides in English/Hindi/Marathi), and connected to a full Curio mission. *Curio is an independent project and is not affiliated with CrunchLabs or Mark Rober.*

**How a box works:** 📦 Box arrives → 📱 Scan the QR → 💡 Learn → 🔧 Build → 🧪 Test → 🛠️ Hack it.

| Month | Kit | Pairs with | Mission status |
|---|---|---|---|
| 1 | 🌉 Bridge Builder — craft sticks, connectors, toy truck, coin weights | Inventor's Workshop | ✅ Live (kit mode) |
| 2 | 💰 Coin Sorter Bank — cardboard sorter by coin size | Marketplace | ✅ Mission live |
| 3 | 🌱 Seed Lab — mini greenhouse, seed pods, soil discs | Science Lab | ✅ Mission live |
| 4 | 🎈 Balloon Rocket Racer | Space Station | ✅ Mission live |
| 5 | 🎭 Shadow Puppet Theatre | Story Village | 🔒 In development |
| 6 | 🔍 Nature Detective | Explorer Forest | 🔒 In development |

**Demo:** on `/kits`, click **Scan the box QR** (or enter `CURIO-BRIDGE`) → the bridge mission switches to kit mode.

**Every mission still works without a box**, using paper, books and coins from home.

---

## 7. Safety, privacy and trust

**Commitments**
- 🚫 No ads, ever. No selling or sharing of children's data with advertisers.
- 🔒 Parent-controlled accounts; parents can view or delete data.
- 🙈 No open chat, no strangers, no public leaderboards.
- 📷 Real-world photos visible only to the family; AI analysis only with parent consent; not stored by Curio.
- 🛒 No purchases by children — payments behind the parent gate; no loot boxes or pay-to-win.
- ⏳ Short missions that end off-screen; no infinite feeds or streak pressure.

**Data minimisation:** collects only first name, age, mission progress and optional photos. Does **not** collect surname, phone, email, location or advertising IDs.

**Regulatory direction:** designed around India's **Digital Personal Data Protection (DPDP) Act, 2023**, which requires verifiable parental consent for children's data and prohibits tracking, behavioural monitoring and targeted advertising aimed at children. A formal legal and privacy review is planned before public launch. *These are design principles; they are not yet independently audited or certified.*

**AI vendor:** Groq's terms state API inputs are not used for training; Zero Data Retention can be enabled in the Groq console (recommended).

---

## 8. Target audience and market

### Customer profiles

| Segment | Who | What they need | Who pays |
|---|---|---|---|
| **Primary user** | Children aged 5–8 (pre-primary to Class 3) | Fun, hands-on learning that feels like play | — |
| **Primary buyer** | Urban and semi-urban Indian parents (often both working), smartphone at home, concerned about passive screen time | Meaningful screen time, visible progress, activities to do together, trust and safety | Premium / Build Box |
| **Institutional buyer** | Affordable private schools, CBSE/state-board primary sections, after-school centres | Simple class analytics, curriculum-aligned activities, hands-on kits | School licence + classroom packs |
| **Gifting buyer** | Relatives buying birthday/festival gifts | A gift that is educational and fun | Build Box (one-off or subscription) |

**Beachhead:** families and schools in **Pune / Maharashtra** — supports the English + Hindi + Marathi launch and a one-city kit pilot.

### Market sizing (to complete with sourced data)

| Level | Definition | Value |
|---|---|---|
| **TAM** | Indian households with children aged 5–8 and a smartphone | *[add sourced figure]* |
| **SAM** | Urban/semi-urban families in Tier 1–2 cities willing to pay for learning products | *[add sourced figure]* |
| **SOM (3 years)** | Realistic paid families + schools reachable from the Pune beachhead | *[add bottom-up estimate]* |

> Use cited sources (e.g. Census/UDISE+ data for child population and schools, published EdTech market reports) and show a **bottom-up** SOM: number of schools × students per class × conversion, plus families reached per channel × conversion.

### Market validation (in progress — highest priority)

Planned evidence to collect before the pitch:
- [ ] **Parent survey** (target 50+ parents of 5–8 year olds): screen-time concerns, willingness to pay ₹299–499/month, interest in a monthly kit.
- [ ] **Child play-tests** (target 5–10 children): time on task, which missions they finish, quotes/photos (with parent consent).
- [ ] **Paper-bridge home pilot:** families do the bridge mission at home and log results.
- [ ] **School interest:** 1–2 letters of interest or conversations with primary teachers.
- [ ] **Supplier quote** for kit materials (craft sticks, connectors) to validate kit cost.

---

## 9. Business model and monetization

### Revenue streams

| Tier | Price (illustrative) | What's included |
|---|---|---|
| **Freemium** | Free | Selected starter missions, basic world access, basic progress tracking |
| **Premium Family** | ₹299–499 / month | Full world, new weekly missions, detailed parent insights, personalised recommendations, expanded real-world activities, creation gallery |
| **Build Box** | ₹899 / month | One physical kit per month + its matching missions |
| **Build Box + Premium** | ₹1,099 / month | Everything in Premium plus the monthly box |
| **School Licensing** | Annual institutional licence *(per-student price to be finalised)* | Teacher dashboard, class analytics and gaps, mission assignments, curriculum mapping |
| **Classroom Packs** | Per pack *(to be priced)* | 30 kits + teacher guide, ordered with a school licence |

**Free tier strategy:** the free tier is an acquisition funnel to Premium — **not ad-supported** (consistent with the no-ads promise).

### Build Box unit economics (illustrative, excluding GST)

| Item | ₹ per box |
|---|---|
| Kit materials | 280 |
| Packaging & printed guide | 60 |
| Shipping | 90 |
| Payment fees & replacements | 40 |
| Content & support | 50 |
| **Total cost** | **520** |
| **Price** | **899** |
| **Contribution per box** | **₹379 (~42%)** |

To validate: supplier and courier quotes, return/damage rate, and GST treatment.

### Growth and distribution

- **Schools** as the main channel: each school brings families; families can introduce Curio to schools.
- **Partnerships:** schools, educational institutions, publishers, NGOs (for access in under-served areas).
- **Parent communities:** Instagram/YouTube short demos of real builds, parent WhatsApp groups, school events.
- **Gifting:** the Build Box as a birthday/festival gift; unboxing as organic marketing.

### Round 3 financials checklist (to prepare)

- [ ] 3-year revenue projection by stream (Premium, Build Box, Schools)
- [ ] Customer acquisition cost (CAC) by channel and lifetime value (LTV)
- [ ] Monthly burn, break-even month and key assumptions
- [ ] Funding ask, use of funds, and valuation rationale
- [ ] Sensitivity: what if conversion or kit margin is lower?

---

## 10. Competitors and moat

### Competitive landscape

Ratings are the team's assessment of publicly available product information for the 5–8 age group, intended to show **positioning**, not overall quality. Curio's "today" row reflects the prototype honestly.

| Platform | Academic | Gamification | Real-world application | Physical + digital | Creativity | Life skills | Parent insights | Personalisation | School integration |
|---|---|---|---|---|---|---|---|---|---|
| **Curio — today (prototype)** | Limited | Moderate | Moderate | Moderate | Moderate | Moderate | Moderate | Limited | Limited |
| **Curio — 12-month target** | Moderate | Moderate | **Strong** | **Strong** | **Strong** | **Strong** | **Strong** | Moderate | Moderate |
| Khan Academy Kids | Strong | Moderate | Limited | Limited | Moderate | Limited | Moderate | Moderate | Strong |
| Duolingo | Moderate | Strong | Limited | Limited | Limited | Limited | Limited | Strong | Limited |
| BYJU'S | Strong | Moderate | Limited | Limited | Limited | Moderate | Strong | Strong | Moderate |
| Osmo | Moderate | Strong | Moderate | Strong | Strong | Moderate | Moderate | Limited | Moderate |
| Prodigy | Strong | Strong | Limited | Limited | Limited | Limited | Moderate | Moderate | Strong |

**Adjacent inspiration:** CrunchLabs (subscription build boxes with video lessons) — proves families will pay monthly for hands-on STEM kits; Curio adapts the idea for a younger, Indian audience and connects it to an app.

### Where Curio fits

Competitors are strong in **on-screen academics** or **habit-forming gamification**. Curio sits at the intersection of **real-world application, creativity and physical-digital play**, built for Indian families.

### Why it's hard to copy

1. **🔁 Real-world loop by design** — every mission ends off-screen. Apps optimised for time-on-screen have little incentive to send children away.
2. **🇮🇳 India-first, multilingual** — ₹, Indian names and contexts, English/Hindi/Marathi from day one.
3. **📈 Data competitors don't collect** — logged real-world activities and photos of real builds show how children *apply* learning.
4. **👀 Vision + LLM + real objects** — Curio Coach gives feedback on physical creations. The AI is available to anyone; the real-world builds it learns from are not.
5. **🧰 Physical kits connected to the app** — kit design, sourcing and delivery are operational know-how, not just code.
6. **🏫 Home + school network** — the same missions work for families and classrooms.

> Honest framing for judges: *any single feature can be copied — the advantage is the combination and the focus on learning that leaves the screen.*

---

## 11. Execution, traction and roadmap

### Built so far (traction)

- ✅ Deployed prototype with auto-deploy from GitHub → Vercel
- ✅ 5 interactive missions with the full loop; 2 more designed
- ✅ Parent Dashboard (3 languages), Teacher Mode, Safety & Trust, How It Works, Business, Moat, guided Pitch Demo
- ✅ Live AI coach on real photos (Groq free tier; Claude-ready)
- ✅ Physical kit unlock flow and kit-mode mission
- ⏳ User validation (survey, play-tests, school conversations) — in progress

### Roadmap

| Phase | Timeline | Goals |
|---|---|---|
| **0 — Prototype** | Now | Working MVP, pitch, initial validation |
| **1 — Pilot** | 0–6 months | 50–100 families + 1–2 schools in Pune; finish Forest & Story missions; first Bridge Builder kit batch; measure completion and real-world task rates |
| **2 — City launch** | 6–12 months | Premium + Build Box subscriptions in Pune/Maharashtra; accounts and cloud sync; teacher onboarding; validated curriculum mapping |
| **3 — Scale** | 12–24 months | More states and languages, more missions per location, school partnerships, publisher/NGO partnerships, improved personalisation |

### Scalability

- **Content:** each mission follows the same loop, so new missions are a repeatable process.
- **Languages:** UI and AI coach already support multiple Indian languages; adding languages is mainly content work.
- **Infrastructure:** serverless (Vercel) — scales with usage; AI provider is swappable.
- **Distribution:** schools give many families at once; kits can use local suppliers per region.

---

## 12. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Children don't complete real-world tasks | Short, fun tasks; parent nudges; tasks work with household items; logging is quick |
| Physical products have thinner margins | Low-cost local materials; app-only Premium stays the main plan; box is an add-on |
| Inventory and delivery complexity | Pre-orders in one city; small batches before scaling |
| Families without a box feel left out | Every mission works with household items |
| Large competitors copy features | Focus on the combination (real-world loop + kits + India-first + AI on real builds) and speed |
| Child data and privacy concerns | Data minimisation, parent gate and consent, no ads, DPDP-aligned design, legal review before launch |
| AI gives a wrong or unsuitable reply | Strict output schema, safety rules in the prompt, parent consent, feedback framed as suggestions; human review planned for pilots |
| Free AI tier limits | ~2 photos/minute today; switch to a paid provider (Claude) when usage grows |

---

## 13. Competition coverage map (Rounds 2 and 3)

### Round 2 criteria

| Criterion | Where it's covered |
|---|---|
| **Problem** | Landing "Why Curio" section · [§2](#2-problem) |
| **Solution** | Landing, How It Works, Pitch Demo, 5 live missions · [§3](#3-solution), [§4](#4-product-features-what-is-built) |
| **Market validation & target audience** | [§8](#8-target-audience-and-market) — customer profiles done; **validation evidence still to collect** |
| **Monetization** | `/business`, `/kits` unit economics · [§9](#9-business-model-and-monetization) |
| **Execution & scalability** | Live deployed MVP, Teacher Mode, roadmap · [§11](#11-execution-traction-and-roadmap) |
| **Moat (USP)** | `/differentiation`, Curio Coach, Build Box · [§10](#10-competitors-and-moat) |
| **Working prototype / MVP** | https://curio-nine-dusky.vercel.app |

### Round 3 focus areas (to prepare)

| Area | Status |
|---|---|
| Business & revenue model | ✅ Defined (tiers, kit economics) |
| Market & competition | ✅ Competitor analysis · ⏳ sourced market size |
| Marketing strategy | ⏳ Channel plan above; needs CAC estimates |
| Financials & profitability | ⏳ 3-year projection, break-even |
| Scalability & growth | ✅ Roadmap and scaling plan |
| Valuation & deal structure | ⏳ Ask, equity offered, rationale |
| Return potential & investment risk | ⏳ Exit/return story; risk table above |
| Founder credibility & leadership | ⏳ Team slide (roles, backgrounds, why us) |
| Pitch defense & adaptability | ✅ Question bank in [§15](#15-pitch-defense--likely-questions) |

---

## 14. Live demo script

About **3 minutes**. Before going on stage: open the site, click **↺ Reset demo** on `/world`, and unlock the Parent Dashboard once.

1. **Landing page (20s)** — the problem and the Curio loop.
2. **Build Box (30s)** — `/kits` → **Scan the box QR** → kit unlocked.
3. **Build a Bridge (60s)** — try an **Arch** (fails at 24/25 coins — "so close!"), then **Truss with 9 sticks** (holds).
4. **Curio Coach (30s)** — Hack it! → photo of a real paper bridge → AI feedback in English or Hindi. *(Shortcut: `/world/inventor?coach=1`.)*
5. **Parent Dashboard (20s)** — parent gate → the logged bridge result.
6. **Teacher Mode (20s)** — **Assign a support mission** for the class's Life Skills gap.
7. **Business + Moat (20s)** — tiers, kit economics, honest competitor table.

**Backup plan:** if the AI is rate-limited, wait a minute or show the demo-mode reply and say so; keep the site open in a tab before presenting; share the link/QR on the last slide.

---

## 15. Pitch defense — likely questions

| Question | Answer direction |
|---|---|
| *Why won't BYJU'S or Khan Academy just copy this?* | Features can be copied; the combination (real-world loop + kits + India-first + AI on real builds) and a focus that conflicts with time-on-screen models is harder. |
| *How do you know children actually do the real-world tasks?* | Logged results and photos (with consent), parent dashboard visibility; pilot will measure completion rates. |
| *Why would parents pay?* | Validation survey results *(add numbers)*; value = meaningful screen time + visible progress + activities together. |
| *How do the kits make money?* | ~42% target contribution per box (illustrative); app-only Premium remains the core plan. |
| *Is the AI safe for children?* | Parent consent, no photo storage, faces never described, strict output format, safety rules, vendor doesn't train on inputs. |
| *What does the free tier cost you?* | Mostly hosting and AI calls; no ads; funnel to Premium. |
| *Why Pune / Maharashtra first?* | Team location, Marathi + Hindi + English support, one-city kit logistics. |
| *What's your traction?* | Working deployed MVP; validation data *(add)*; school conversations *(add)*. |

---

## 16. Technical overview

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router 7, Vite 8 |
| Styling | Tailwind CSS 4 (`@theme` tokens), Inter + Baloo 2 fonts |
| State | React Context + `localStorage` (learner progress), `sessionStorage` (parent unlock) |
| Serverless API | Vercel Functions (`api/coach.js`) |
| AI | Groq (`qwen/qwen3.8-27b`) or Anthropic Claude (`claude-opus-5-5`), strict JSON schema output |
| Hosting | Vercel, auto-deploy on push to `main` |
| Linting | Oxlint |

### Project structure

```
api/
  coach.js                 Curio Coach serverless function (Groq / Claude)
docs/                      Product, design, rules, phases, architecture, changelog
src/
  App.jsx                  Routes and navigation
  context/LearnerContext   Learner state, missions, kits, real-world results
  components/
    CurioCoach.jsx         AI photo feedback panel
    ParentGate.jsx         Parent gate and modal
    MissionHeader.jsx
  lib/parentGate.js        Gate helpers (number-to-words, session unlock)
  missions/                Marketplace, Science, Space, Creative, Inventor
  pages/                   Landing, LearningWorld, HowItWorks, BuildBox, ParentDashboard,
                           TeacherMode, SafetyTrust, BusinessModel, CompetitiveDiff, PitchDemo
vercel.json                SPA rewrites (excluding /api) and function settings
```

---

## 17. Running the project

**Requirements:** Node.js 20.19+ or 22.12+ (required by Vite 8) and npm.

```bash
npm install
npm run dev       # http://localhost:5173 (Curio Coach runs in demo mode locally)
npm run lint
npm run build
npm run preview
```

**Running the AI coach locally** (needs the Vercel CLI and a key):

```bash
vercel env pull .env.local   # or create .env.local with GROQ_API_KEY=...
vercel dev
```

**Environment variables** (set in Vercel → Project → Settings → Environment Variables; never commit keys):

| Variable | Purpose |
|---|---|
| `GROQ_API_KEY` | Free-tier vision model for Curio Coach |
| `ANTHROPIC_API_KEY` | Optional; uses Claude instead of Groq when set |

**Deploy:** push to `main` — Vercel builds and deploys automatically. Test risky changes on a branch first (Vercel creates a preview URL).

---

## 18. Known limitations

- Learner progress is stored per browser; there are no user accounts or cloud sync yet.
- Parent Dashboard, Teacher Mode and some statistics use **sample data** (clearly labelled where shown).
- Explorer Forest and Story Village missions are not built yet.
- Curio Coach currently supports the Bridge mission only; Marathi replies are weaker on the free model; the free tier allows ~2 photos per minute.
- Pricing, unit economics and the curriculum mapping are **indicative** and need validation.
- Safety commitments are design principles, not yet audited or certified.

---

*Prototype built for Pitch Perfect 2026. Curio is an independent student project; product names of other companies are used for comparison only.*
