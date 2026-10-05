# Memory & Changelog

## Current Status
- ✅ Project planning and documentation initiated.
- ✅ Initialized Vite + React project, integrated Tailwind CSS.
- ✅ Established `LearnerContext` for state management.
- ✅ Implemented `LearningWorld` map with 7 location stubs.
- ✅ Built highly interactive `MarketplaceMission`, `ScienceMission`, `SpaceMission`, and `CreativeMission`.
- ✅ Built `ParentDashboard` with multilingual support.
- ✅ Built `PitchDemo` 4-stage guided flow.
- ✅ Successfully ran production build check (0 errors).

## Next Actions
- Verify styling consistency across different screen sizes.
- (Optional) Build out the remaining 3 missions (Inventor, Forest, Story) if requested.

## Changelog
- **[2026-10-05]**: Created `docs` directory and initial documentation.
- **[2026-10-05]**: Initialized React+Vite project, installed Tailwind, and built out core routes.
- **[2026-10-05]**: Added 4 interactive missions, parent dashboard, and pitch demo. Fixed Tailwind PostCSS build errors and verified successful production build.
- **[2026-10-05]**: Demo hardening for Round 2: "Coming soon" state for unbuilt missions + catch-all route, mission replay and "Reset demo" button, mobile nav menu, SPA links on home CTAs, inline feedback instead of `alert()`, interactive PLAY stage in Pitch Demo, defined `animate-fade-in-up`, real page title, removed hardcoded mission count on Parent Dashboard. Lint clean, build passing.
- **[2026-10-05]**: Rewrote Competitive Differentiation with honest "Curio today" vs "12-month target" rows, a methodology note, and a "Why it's hard to copy" section. Added Safety & Trust page (`/safety`) with commitments, data-collection table, interactive parent-gate demo, and DPDP Act 2023 compliance roadmap.
- **[2026-10-05]**: Added School / Teacher Mode (`/schools`): class overview with skill heatmap, auto-detected class gap and strength, one-click "assign a support mission", mission assignment flow, and NCF-FS 2022 curriculum map (indicative). Linked from Business Model school tier. Nav collapses to menu below `lg`.
- **[2026-10-05]**: Added How It Works page (`/how-it-works`): interactive LEARN→PLAY→DO→CREATE walkthrough across 3 real missions, sign-up-to-progress journey, child/parent/teacher roles linking to their views, CTA to Pitch Demo and Safety. Linked from nav and home page.
- **[2026-10-05]**: Stronger parent gate (`components/ParentGate.jsx`, `lib/parentGate.js`): type a 4-digit number written in words, new number each try, 30s lockout after 3 wrong attempts; now protects Parent Dashboard (session unlock + Lock button) and Build Box pre-orders. Added Curio Build Box page (`/kits`, inspired by CrunchLabs-style build boxes): QR/code unlock demo, 6-kit catalog, plans, illustrative unit economics (₹899 box, ~42% contribution), risks. Added Inventor's Workshop "Build a Bridge" mission (`/world/inventor`) with kit mode vs household mode, logs real-world results to Parent Dashboard. Build Box tier added to Business Model; kits added to moat and Teacher Mode.
