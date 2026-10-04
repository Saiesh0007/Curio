# Architecture

## Tech Stack
- Frontend Framework: React
- Build Tool: Vite
- Styling: Modern CSS / Tailwind CSS (TBD, but standard practices apply)
- State Management: React Context API + `localStorage` for persisting the global learner state (e.g., XP, Badges, Level, Skill improvements).

## Directory Structure (Proposed)
```
src/
  components/    # Reusable UI elements (MissionHeader, XPDisplay, etc.)
  pages/         # Main views (Home, LearningWorld, Dashboard, etc.)
  missions/      # Individual mission interactive experiences
  data/          # Mock data and content
  context/       # Global state management
  assets/        # Images, icons, CSS
```

## Routing Strategy
Explicit and reliable routes are required. No generic mission routes.
- `/` - Landing / Home
- `/world` - Explore World
- `/world/marketplace` - Picnic Budget Mission
- `/world/science` - Plant Growth Experiment
- `/world/space` - Space Logic Mission
- `/world/creative` - Creature Creator
- `/world/inventor` - Bridge Builder
- `/world/forest` - Nature Detective
- `/world/story` - Story Builder
- `/skills` - Skill Map
- `/parents` - Parent Dashboard
- `/schools` - School / Teacher Mode
- `/safety` - Safety & Trust
- `/demo` - Guided Pitch Demo

## Core Requirements
- No backend required (mock data).
- Must run smoothly on Desktop (primary), Laptop, Tablet, Mobile.
- Must be free of console errors before completion.
