# TrackLog

Copy-trade record in R. One `index.html`, no build. Data in Supabase behind Google sign-in; the page holds only the publishable key.

- Import: one JSON per day (`schema: yc-day-1`, see `data/`). Re-importing a date replaces it.
- `YC_VERSION` in `index.html` must equal `CACHE_NAME` in `sw.js`; bump both on every deploy.
