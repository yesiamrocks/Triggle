# Changelog

## v1.5.2 - 2025-07-23

### Changed

- Updated project license to **Apache License, Version 2.0**

### Added

- Introduced a `NOTICE` file with attribution details for legal clarity
  - Author: Shafayetul Islam Pavel
  - Project: Triggle
  - Attribution is now required when using, modifying, or redistributing the software

## v1.5.1 - 2025-07-21

### Changed

- Updated all instances of `triggle.js` to **Triggle** in README for consistent branding and cleaner presentation.

## v1.5.0 - 2025-07-17

### Added

- `data-triggle-target`: New attribute to animate elements other than the trigger itself
- Preset support via `data-triggle-preset` using `{css}animation` classes like `ca__fx-bounceIn`
- Manual control via `window.triggle.apply(...)` now works as expected

### Improved

- More robust `getTargetElements()` logic — supports document-wide target lookups
- Modular architecture ready for scale (MutationObserver, cache, scroll observers, etc.)

### Fixed

- Animation would not trigger when `data-triggle-target` referenced an external element
- Cleaned up event + observer memory handling for safer `.destroy()` calls

## v1.4.1 - 2025-07-09

### Updated

- **README.md** now includes clear usage examples for both builds:
  - `triggle.js` (unminified, default for bundlers)
  - `triggle.min.js` (manually importable for production)
- Documented how to import Triggle via:
  - `import 'triggle'`
  - `import 'triggle/triggle.min.js'`
  - `<script src="...">` using CDN like jsDelivr

### Internal

- Updated `package.json` `"exports"` field:
  - `.` maps to `dist/triggle.js`
  - `./triggle.min.js` added as an optional import target
- Ensures consumers can choose between unminified and minified builds
- Improved clarity and modular import support for bundlers

## v1.4.0 - 2025-07-09

### Added

- **Dual output build system**: Generates both `triggle.js` (unminified) and `triggle.min.js` (minified) using Vite.
- **Sourcemaps** for both builds for easier debugging.
- Custom `vite.config.js` for the unminified output.
- New `vite.min.config.js` using `@rollup/plugin-terser` for production minification.
- File-safe `dist/` build process using `emptyOutDir: false`.

### Changed

- Replaced deprecated `rollup-plugin-terser` with `@rollup/plugin-terser` for modern ES module compatibility.
- Updated `package.json` scripts:
  - `npm run build` now runs both builds
  - `build:minified` and `build:unminified` available separately

## v1.3.0 – 2025-07-09

### Changed

- Switched license model to dual-license:
  - Parity License for open-source and personal use
  - Commercial license required for closed-source or revenue-generating projects

### Added

- LICENSE updated to reflect Parity 7.0.0
- New COMMERCIAL-LICENSE.md for paid usage terms
- README badge and footer updated for clarity

## v1.2.0 - 2025-07-07

### Added

- `data-triggle-scroll` now supports scroll-triggered group animations using `IntersectionObserver`
- `data-triggle-stagger` now works with scroll-triggered groups
- Added support for placing scroll observers separately from animated targets

### Improved

- Group scroll animation now works even if group items are already in the viewport
- Better modularity of scroll-triggered logic for staggered groups

### Fixed

- Only first 1–2 elements animating when scroll-stagger was used — now resolved by isolating trigger element

### Compatibility

- Fully backward compatible with click, hover, chained, and keydown triggers

## v1.1.0 - 2025-07-07

### Added

- `data-triggle-stagger`: Staggered animation delay across grouped elements (e.g., cards, list items)
- `data-triggle-chain-delay`: Adds delay before triggering chained animation targets
- `data-triggle-group`: Now fully supports animating multiple elements simultaneously
- New `applyAnimation()` chaining support with custom callbacks

### Improved

- Group animations are now modular and support flexible timing strategies
- Debug logging for groups, chaining, and staggered sequences

### Updated

- README.md updated with new examples and explanations
- All core features now documented and consistent with HTML attribute usage

### Compatibility

- Fully backward compatible with previous `data-triggle`, `data-triggle-class`, and key/mouse event handling

## v1.0.3 - 2025-06-30

### Added

- Passive event listeners for `touchstart`, `touchend`, and `scroll` to enhance mobile responsiveness
- Compatibility fix for Chrome warning about non-passive touch events

### Changed

- Global trigger control renamed from `window.caTrigger` to `window.triggle` for consistency with project branding

### Notes

- If using manual reinitialization, update your code to `triggle.init()` instead of `caTrigger.init()`

## v1.0.2 - 2025-06-30

### Added

- Documented support for key filters using `data-triggle-key` including modifier keys and wildcards.
- Detailed table of supported triggers in README.
- Examples for delay, duration, and reset usage in README.
- Custom event trigger documentation (`customTriggleEvent`).

### Updated

- Polished the entire README.md content:
  - Improved clarity and structure.
  - Added CDN and NPM installation instructions.
  - Added better attribute reference and examples.
  - Enhanced integration tips and usage notes.
  - Linked to live demo and cssanimation.io usage.
  - Improved documentation for `data-triggle` attribute.
