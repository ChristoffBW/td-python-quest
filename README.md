# TD Python Quest

A Duolingo-style game for learning **Python in TouchDesigner**. 18 units, 56 lessons and about 400 exercises, built from the official Derivative documentation (Python Tips, Working with OPs/CHOPs/DATs, Extensions, Storage, the `td`, `tdu`, `TDFunctions` and `TDJSON` modules, and the OP/Par/COMP/DAT/CHOP/TOP/SOP/Panel/Page/Channel/Cell class references, NumPy and TDStoreTools).

No build step and no dependencies: the whole game is `index.html`.

## Play locally

Open `index.html` in a browser.

## Progress

- Saved automatically in the browser (`localStorage`), per device.
- Multiple profiles, XP, streaks, stars, accuracy by exercise type, a 14-day XP chart and review suggestions (open the 📊 button).
- **Download backup** / **Import** moves progress between devices.

## Deploy (GitHub Pages)

Settings → Pages → Deploy from a branch → `main` / root.

## Adding content (keeps users' saved progress safe)

Progress is stored by position (`unit-lesson`), so existing content must never be reordered, renamed or removed. Add new units at the **end** of `UNITS` (or new lessons at the end of a unit), then run:

```bash
node tools/check-append-only.js          # fails if existing content moved
node tools/check-append-only.js --update # accept the new appended content
```
