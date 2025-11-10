## ChainTale Architecture & Roadmap

### Vision
- Build a collaborative storytelling platform where communities (`Tags`) craft tales one line at a time.
- Deliver a playful, high-contrast UI with gamified feedback loops to keep writers returning daily.
- Ensure extensibility for future live collaboration and mobile clients.

### High-Level Architecture
- **Frontend**: React app (Lovable auto-generated base + Tailwind/Framer Motion layer) deployed on Vercel.
- **Backend**: FastAPI service on Render/Heroku providing REST + optional WebSocket updates.
- **Database**: MongoDB Atlas with dedicated collections for `users`, `tags`, `stories`, `badges`, `featured_tales`.
- **Auth**: JWT (access + refresh) stored in httpOnly cookies.
- **Scheduling**: APScheduler/CRON on backend (or Render Cron) to archive stories and compute weekly features.
- **Object Storage (optional)**: S3-equivalent for custom avatar uploads.
- **Observability**: Structured logging + Sentry; future metrics via Prometheus-compatible service.

```
Browser (React) 
   │
   ├─ HTTPS REST (JSON) → FastAPI Gateway
   │        ├─ Auth & Rate Limit Middleware
   │        ├─ Story Services (lines, voting, comments)
   │        ├─ Gamification Services (badges, streaks, leaderboard)
   │        └─ Scheduler (daily archival + weekly highlights)
   │
   └─ WebSocket (optional live story updates)
```

### Domain Breakdown
- **Accounts**: Registration, login (JWT), profile edits, avatar uploads.
- **Tags & Stories**: CRUD for tags, current story retrieval, line submissions with validation, word counts, archive transitions.
- **Community Feedback**: Voting, comments, featured tales pipeline.
- **Gamification**: Badge engine, streak tracking, daily limits, leaderboard ranking.

### Backend Service Design
- **Routers**
  - `auth_router`: `/register`, `/login`, `/refresh`, `/logout`.
  - `tags_router`: `/tags`, `/tags/{id}`.
  - `stories_router`: `/story/{tag_id}`, `/story/{tag_id}/add-line`, `/line/{line_id}/vote`, `/line/{line_id}/comment`.
  - `archive_router`: `/archive`.
  - `leaderboard_router`: `/leaderboard`.
  - `badges_router`: `/badges`, `/badges/grant`.
- **Core Modules**
  - `models`: Pydantic schemas, MongoDB access helpers.
  - `services`: encapsulate story logic, badge evaluation, archival process.
  - `security`: JWT utilities, password hashing, rate-limit middleware.
  - `tasks`: scheduled jobs for archival + weekly features.
- **Data Access**
  - Use Motor (async Mongo driver) with repository pattern.
  - Create compound indexes:
    - `stories.lines.user_id + timestamp` (rate limit checks).
    - `stories.tag_id + is_archived`.
    - `featured_tales.week`.
- **Validation Rules**
  - One sentence/day/tag per user (tracked via `lines.timestamp`).
  - Prevent consecutive posts (`lines[-1].user_id != current_user`).
  - Automatic word count aggregation per story (update on insert).

### Gamification Strategy
- **Badge Engine**
  - Event-driven evaluation (`line_posted`, `comment_added`, `vote_received`).
  - Idempotent assignments recorded under `users.badges`.
  - Badge definitions stored in `badges` collection for easy customization.
- **Streak Tracking**
  - Update `streak_days` on daily participation; reset if no activity.
  - UI surfaces streak with gradient meter and pulse animation.
- **Leaderboard**
  - Weekly job aggregates upvotes per user (per week window) and caches results.
  - Endpoint returns ranking + badge status.

### Frontend Structure
- **Routing**
  - `/` Homepage (Trending Tags, Weekly Featured carousel, CTA).
  - `/tag/:slug` Tag story page.
  - `/profile/:username`.
  - `/archive`.
  - `/leaderboard`.
  - `/explore`.
- **State Management**
  - React Query (TanStack) for data fetching + caching.
  - Zustand/Recoil for global UI state (theme, modals).
  - JWT stored via secure cookies; access token refreshed via silent endpoint.
- **UI System**
  - Tailwind with custom gradient theme tokens.
  - Shared components: `TagCard`, `StoryLineCard`, `BadgePill`, `GradientButton`, `Carousel`, `LeaderboardRow`.
  - Animations with Framer Motion (pulse, shimmer, fade).
- **Accessibility**
  - WCAG AA contrast compliance for text vs gradient backgrounds.
  - Keyboard focus rings, ARIA landmarks for story navigation.

### Data Lifecycle & Archiving
- Story enters `archive` when:
  - 30 days since `stories.created_at`, OR
  - `word_count >= 5000`.
- Archival Task:
  1. Query active stories meeting criteria.
  2. Flip `is_archived` to `true`, snapshot to `featured_tales` where applicable.
  3. Notify users via email/web push (future).
  4. Remove from active tag listing; display in Archive page.

### Security & Compliance
- Passwords hashed via Argon2.
- JWT signed with rotating secrets; refresh tokens stored server-side blacklist (Redis or Mongo collection).
- Rate limiting for write endpoints (FastAPI dependency + Mongo tracking).
- Input sanitation (allow Markdown subset, strip scripts).

### Deployment Pipeline
- **Frontend**: Vercel (CI triggers on `main`). Environment vars for API base URL.
- **Backend**: Render (Dockerfile). CI/CD via GitHub Actions -> Render deploy hook.
- **Monitoring**: Add health checks, uptime pings, logging to STDOUT.

### Roadmap (Phase 0 → Phase 3)
- **Phase 0 – Foundations**
  - Scaffold FastAPI backend + Mongo connection.
  - Scaffold React frontend with global theme + navigation.
  - Implement auth & basic tag browsing.
- **Phase 1 – Story Core**
  - Story creation, line submissions with rules, voting & comments.
  - Homepage trending logic, Tag view, Explore page.
  - Basic achievements (First Line, Streak Writer).
- **Phase 2 – Gamification & Community**
  - Full badge engine, streak tracker UI, leaderboard, featured tales automation.
  - Archive pipeline + archive browsing filters.
  - Notification hooks (email digest or in-app).
- **Phase 3 – Polish & Growth**
  - WebSocket live updates, moderation tools, custom avatars upload.
  - Advanced analytics dashboard, localization, mobile-friendly PWA.

### Immediate Next Steps
1. Finalize backend project skeleton (`backend/`) with FastAPI, Motor, auth scaffolding.
2. Generate Lovable/React project (`frontend/`), integrate theme tokens.
3. Define shared TypeScript interfaces mirroring backend schemas.
4. Set up GitHub Actions + basic lint/test configs.

