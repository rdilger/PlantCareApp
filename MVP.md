# MVP Feature Set

> This document tracks what was originally planned vs. what shipped.

## Shipped in v0.1

### Plant management
- Add, edit, delete plants (name, species, room, light, frequency, reminder time)
- Color-coded plant avatars with letter initials

### Watering
- Per-plant watering schedule (2–21 day interval)
- Full watering history (array of timestamps per plant)
- Status: Overdue / Due today / Soon (≤ 2 days) / OK
- Log watering from home screen, calendar, or plant detail

### Care journal
- Timestamped health notes per plant
- Add via text input + Enter or button; delete individually

### Calendar
- Monthly calendar view with task dots
- Day selection shows task list with water checkmarks
- Upcoming 14-day preview strip

### Discover
- 9 plant species with difficulty, light, and category tags
- Search + category filter + favorites (persisted to localStorage)
- Add from Discover pre-fills plant name

### Notifications
- Browser Notification API at configured reminder time
- 60s interval check; fires once per plant per day when due/overdue
- Permission banner on first launch

### Localization
- German (default for de-* locales) and English
- Auto-detected from `navigator.language`, manual override in Profile
- Language switcher in Profile tab

## Originally out of scope — still out of scope
- Fertilizing tracking
- Soil condition tracking
- Calendar export / third-party calendar integration
- Care delegation / multi-user
- Advanced health tracking with photos or measurements
- Historical trend analysis / charts
- Backend / cloud sync
