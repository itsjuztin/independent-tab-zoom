# Independent Tab Zoom

> Isolates browser zoom levels on a strict per-tab basis. Zoom in on one tab without unexpectedly resizing other tabs on the same domain.

[![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Privacy: 100% Local](https://img.shields.io/badge/Privacy-100%25%20Local-green.svg)](#privacy--security)

---

## Why This Exists

By default, Google Chrome links zoom levels across an entire domain. If you zoom in on a Google Doc, Reddit thread, or dashboard, every other open tab sharing that domain automatically shifts to the same scale.

**Independent Tab Zoom** overrides Chrome's default `per-origin` zoom scope and enforces `per-tab` isolation, allowing you to size individual pages freely without affecting your other tabs.

---

## Features

- **Automatic Per-Tab Scoping:** Automatically assigns independent zoom settings to tabs on creation and navigation.
- **Granular Stepper Controls:** Quick `-` and `+` buttons for clean 10% steps.
- **Wide Range Slider:** Smooth slider ranging from 25% up to 300%.
- **One-Click Presets:** Quick targets for 75%, 90%, 100%, 125%, 150%, and 200%.
- **Live Toolbar Badge:** Displays your active zoom percentage directly on the extension icon when a tab is zoomed (and hides when at neutral 100%).
- **Native Material Dark Styling:** Clean interface that blends seamlessly with Chromium's native menus.

---

## Installation

### Manual Install (Developer Mode)
1. Clone or download this repository.
2. In Google Chrome, go to `chrome://extensions/`.
3. Enable **Developer mode** (top-right toggle).
4. Click **Load unpacked** (top-left) and select this folder.

---

## Privacy & Security

- **100% Local:** Strictly uses Chrome's built-in `chrome.tabs.setZoomSettings` API.
- **Zero Tracking:** Collects no browsing history, page contents, or telemetry.

---

## The Developer Utility Suite

Check out the other tools in this open-source suite:
- [**Volume Booster & Equalizer for Tabs**](https://github.com/itsjuztin/volume-booster-tab) — Boost tab audio up to 1000% with soft-limiter anti-clipping and 3-band EQ.
- [**Playback Tools for YouTube**](https://github.com/itsjuztin/playback-tools-youtube) — Forces 4K/top resolution, auto-guards against bitrate drops, and cleans up Shorts & end cards.
- [**Playback Tools for Plex**](https://github.com/itsjuztin/playback-tools-plex) — Silent auto-skip for intros and credits, countdown bypass, and 1-click Picture-in-Picture.

---

## License

[MIT](LICENSE) © 2026 Justin
