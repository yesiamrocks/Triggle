# 🖱️ Trigger-based Animation Control — Triggle.js

![Vanilla JS](https://img.shields.io/badge/JS-Vanilla%20JS-brightgreen?style=for-the-badge)
![No Dependencies](https://img.shields.io/badge/Dependencies-None-lightgrey?style=for-the-badge)
![Optimized for Mobile](https://img.shields.io/badge/Mobile-Optimized-blue?style=for-the-badge)
[![npm](https://img.shields.io/npm/dw/triggle?style=for-the-badge)](https://www.npmjs.com/package/triggle)
[![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/triggle?style=for-the-badge)](https://cdn.jsdelivr.net/npm/triggle@latest/dist/)
[![unpkg](https://img.shields.io/badge/CDN-unpkg-blue?style=for-the-badge)](https://unpkg.com/browse/triggle/)
[![View Demo](https://img.shields.io/badge/🎬%20Live-Demo-green?style=for-the-badge)](yesiamrocks.github.io/Triggle/)

Enable trigger-based animations using simple `data-triggle` attributes. This plugin works seamlessly with `cssanimation.css` classes and lets you apply them on user interactions. It supports mouse, keyboard, touch, and custom event triggers — with optional animation control via delay, duration, reset, and key filters.

## Features

- Multiple animation triggers: click, mouseenter, keydown, blur, etc.
- Attribute-based configuration with no JavaScript required
- Support for specific keys (e.g. Enter, Escape, ctrl+z, shift+a)
- Wildcard key matching (en*, arrow*, etc.)
- Custom JS-dispatched events (e.g. customEvent)
- Global enable/disable toggle
- Dev mode with logs and diagnostics

## Try It Live

Explore all supported triggers and features in the interactive playground: 👉 [Live Demo](https://yesiamrocks.github.io/cssanimation/ca-trigger.html)

## Installation

### Using NPM

```bash
npm install triggle
```

### Using CDN

```js
<script src="https://cdn.jsdelivr.net/npm/triggle@latest/dist/triggle.min.js"></script>
```

## Animations via cssanimation.io

Triggle.js works perfectly with the animation classes from **[cssanimation](https://github.com/yesiamrocks/cssanimation)** Install them:

```bash
npm install @hellouxpavel/cssanimation
```

**or CDN**

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@hellouxpavel/cssanimation@latest/dist/cssanimation.min.css" />
```

## Getting Started

Add `data-triggle-*` attributes to your element:

```html
<div
  class="cssanimation"
  data-triggle="click"
  data-triggle-class="ca__fx-bounceX"
  data-triggle-reset="true">
  Click to Animate
</div>
```

## Supported Triggers

You can animate elements using the following trigger types via `data-triggle`:

| Trigger         | Description                          |
| --------------- | ------------------------------------ |
| `click`         | On mouse click                       |
| `dblclick`      | On double click                      |
| `mouseenter`    | When the mouse enters the element    |
| `mouseleave`    | When the mouse leaves the element    |
| `mousedown`     | On mouse button press                |
| `mouseup`       | On mouse button release              |
| `focus`         | When an input or element gains focus |
| `blur`          | When focus is lost                   |
| `input`         | When input value changes             |
| `keydown`       | On key press down                    |
| `keyup`         | On key release                       |
| `touchstart`    | On mobile touch start                |
| `touchend`      | On mobile touch end                  |
| `animationend`  | After a CSS animation completes      |
| `transitionend` | After a CSS transition completes     |
| `customEvent`   | Dispatched manually via JavaScript   |

**You can combine multiple triggers using a comma:**

> `data-triggle="mouseenter,click,keydown"`

## Attributes Reference

| Attribute               | Description                                                                |
| ----------------------- | -------------------------------------------------------------------------- |
| `data-triggle`          | Event name(s) that will trigger the animation (e.g., `click`, `hover`)     |
| `data-triggle-class`    | Animation class to be applied                                              |
| `data-triggle-reset`    | If `true`, animation class will be removed on animation end                |
| `data-triggle-delay`    | Optional CSS `animation-delay` value (e.g., `0.5s`)                        |
| `data-triggle-duration` | Optional CSS `animation-duration` value (e.g., `1s`)                       |
| `data-triggle-key`      | For `keydown`/`keyup` triggers — comma-separated list of valid key filters |

## Example: Hover with Delay and Reset

```html
<div
  class="cssanimation"
  data-triggle="mouseenter"
  data-triggle-class="ca__fx-fadeIn"
  data-triggle-delay="0.5s"
  data-triggle-duration="2s"
  data-triggle-reset="true">
  Hover me to fade in
</div>
```

## data-triggle-key

Limit animations to specific key presses:

```html
<input
  data-trigger="keydown"
  data-triggle-key="Enter,Escape"
  data-triggle-class="ca__fx-bounce" />
```

## Key Filters

### Exact keys

`data-triggle-key="Enter,Escape"`

### Modifier Support

`data-triggle-key="ctrl+z, shift+a, alt+x"`

### Wildcard Support

`data-triggle-key="en*, arrow*"`

## Automatically remove the animation class after it completes:

`data-triggle-reset="true"`

## Timing Controls

- `data-triggle-delay="0.2s"`
- `data-triggle-duration="1.5s"`

You can use any valid CSS time units.

## Custom Events

You can use any event name for `data-triggle`. This allows you to create custom event triggers using JavaScript's `dispatchEvent()` method. Example: `data-triggle="notify"` can be triggered by: `element.dispatchEvent(new Event("notify"));`

```html
<div
  id="notify"
  data-triggle="customTriggleEvent"
  data-triggle-class="ca__fx-flipX"
  data-triggle-reset="true"></div>

<script>
  document
    .getElementById("notify")
    .dispatchEvent(new Event("customTriggleEvent"));
</script>
```

### Supported Passive Events

The following triggers use passive listeners for optimal performance:

- `touchstart`
- `touchend`
- `scroll`

## Global Disable (Optional)

To disable all animations globally (e.g., for accessibility/testing), set:

```js
window.__trg_TRIGGER_DISABLED = true;
```

To re-enable:

```js
window.__trg_TRIGGER_DISABLED = false;
window.triggle.init();
```

## Debug Mode

```js
window.__trg_DEBUG = true;
window.__trg_TRIGGER_DISABLED = true;
```

## Performance Notes

To improve responsiveness on mobile devices, `triggle.js` uses **passive event listeners** for scroll-blocking events like `touchstart`, `touchend`, and `scroll`. This eliminates warnings in modern browsers (e.g., Chrome) and improves interaction smoothness.

## Integration Tips

- Core class `.cssanimation` class is required (from [cssanimation](https://github.com/yesiamrocks/cssanimation)).
- Use `data-triggle-*` attributes only on the intended element — avoid duplication on deeply nested structures to prevent conflicts.

## Plugin Architecture Summary

- Lightweight, zero-dependency vanilla JS
- Fast event listener setup using DOMContentLoaded
- Respects animation timing via native CSS
- Easy to drop in any project
- Animation cleanup using `animationend`
- Designed for extensibility
