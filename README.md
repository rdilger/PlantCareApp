# PlantCare App

A mobile-first plant care app built with Vite + React. Runs entirely in the browser — no backend, no account required.

## Getting started

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

## Features

### Plant management
- Add plants with name, species, room, light preference, and watering schedule
- Edit all plant details inline from the detail screen
- Delete plants with two-step confirmation
- Color-coded plant avatars

### Watering
- Per-plant watering schedule (2–21 day interval)
- Full watering history stored per plant (array of timestamps, not just last-watered)
- Status indicators: Overdue / Due today / Soon / OK
- Quick water button on home and calendar screens

### Care journal
- Add timestamped health notes per plant (observations, repotting, pests, etc.)
- Notes visible in plant detail screen, newest first

### Calendar
- Monthly calendar with watering task dots per day
- Tap a day to see tasks; tap the checkmark to log watering
- Upcoming tasks preview strip (next 14 days)

### Discover
- Browse plant species with difficulty and light info
- Search and filter by category (easy-care, low light, pet-safe, etc.)
- Favorite plants with heart button; filter to favorites
- Add directly from Discover — name is pre-filled from species

### Notifications
- Browser Notification API reminders at each plant's configured reminder time
- Permission banner on first launch; falls back silently if denied

### Localization
- German and English supported
- Language auto-detected from `navigator.language` (de-* → Deutsch, else English)
- Manual override via language switcher in Profile tab
- All dates and calendar names use `Intl.DateTimeFormat` — no hardcoded strings

## Architecture

```
src/
  i18n/
    de.js               # German translations (flat dot-key object)
    en.js               # English translations
    LocaleContext.jsx   # React context + provider, Intl date helpers, interpolation
  hooks/
    usePlants.js        # Plant state, watering history, notes, localStorage persistence
    useNotifications.js # Browser Notification API, 60s interval check
  screens/
    HomeScreen.jsx
    CalendarScreen.jsx
    DiscoverScreen.jsx
    PlantDetailScreen.jsx
    AddPlantFlow.jsx
    ProfileScreen.jsx
  components/
    TabBar.jsx
    WaterStatus.jsx
    AppHeader.jsx
    IconBtn.jsx
    Buttons.jsx
    ScreenShell.jsx
    SectionHeader.jsx
  tokens.jsx            # Design tokens, Icon SVG component, PlantImg
  data.js               # Seed plants, discover catalog, room/light options
  App.jsx
  main.jsx
```

**State:** All state lives in `usePlants` (React + `localStorage`). Two keys:
- `plantcare_plants` — plant array including `notes[]`
- `plantcare_watered` — `{ [plantId]: string[] }` array of ISO timestamps per plant

**Styling:** Inline styles only, no CSS files. Design tokens in `tokens.jsx`.

**Screens:** All four tab screens stay mounted (hidden via `display: none`) to preserve scroll position and filter state across tab switches.

## Design tokens

| Token | Value | Usage |
|-------|-------|-------|
| `T.green` | `#1D9E75` | Primary actions, active states |
| `T.greenDark` | `#17835F` | Gradient end, text on light green |
| `T.greenLight` | `#E8F5EF` | Backgrounds, badges |
| `T.bg` | `#FAFAF7` | App background |
| `T.ink` | `#0F1915` | Primary text |
| `T.ink2` | `#3D4A44` | Secondary text |
| `T.ink3` | `#7A847F` | Tertiary text, icons |
| `T.line` | `#E8EAE6` | Borders |
| `T.danger` | `#D9534F` | Overdue, delete |

## Issue tracking

This project uses [beads (bd)](https://github.com/BeadsDB/beads) for issue tracking. The issue database lives in `~/.beads`.

```bash
bd ready               # show open issues
bd show <id>           # issue details
bd update <id> --claim # claim an issue
bd close <id>          # close an issue
```
