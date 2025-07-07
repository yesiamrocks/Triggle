# Changelog

## 1.0.3 - 2025-06-30

## Added

- Passive event listeners for `touchstart`, `touchend`, and `scroll` to enhance mobile responsiveness
- Compatibility fix for Chrome warning about non-passive touch events

## Changed

- Global trigger control renamed from `window.caTrigger` to `window.triggle` for consistency with project branding

## Notes

- If using manual reinitialization, update your code to `triggle.init()` instead of `caTrigger.init()`

## 1.0.2 - 2025-06-30

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
