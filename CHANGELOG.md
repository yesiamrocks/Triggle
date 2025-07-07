# Changelog

## 1.1.0 - 2025-07-07

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

## 1.0.3 - 2025-06-30

### Added

- Passive event listeners for `touchstart`, `touchend`, and `scroll` to enhance mobile responsiveness
- Compatibility fix for Chrome warning about non-passive touch events

### Changed

- Global trigger control renamed from `window.caTrigger` to `window.triggle` for consistency with project branding

### Notes

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
