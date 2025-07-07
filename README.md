# 🖱️ Trigger-based Animation Control — Triggle.js

![Vanilla JS](https://img.shields.io/badge/JS-Vanilla%20JS-brightgreen?style=for-the-badge)
![No Dependencies](https://img.shields.io/badge/Dependencies-None-lightgrey?style=for-the-badge)
![Optimized for Mobile](https://img.shields.io/badge/Mobile-Optimized-blue?style=for-the-badge)
[![NPM](https://img.shields.io/npm/v/triggle?style=for-the-badge&label=triggle)](https://www.npmjs.com/package/triggle)
[![Downloads](https://img.shields.io/npm/dt/triggle?style=for-the-badge)](https://www.npmjs.com/package/triggle)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/triggle?style=for-the-badge)](https://bundlephobia.com/package/triggle)
![License](https://img.shields.io/npm/l/triggle?style=for-the-badge)
[![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/triggle?style=for-the-badge)](https://cdn.jsdelivr.net/npm/triggle@latest/dist/)
[![unpkg](https://img.shields.io/badge/CDN-unpkg-blue?style=for-the-badge)](https://unpkg.com/browse/triggle/)
[![View Demo](https://img.shields.io/badge/🎬%20Live-Demo-green?style=for-the-badge)](https://yesiamrocks.github.io/Triggle/)

Enable trigger-based animations using simple `data-triggle` attributes. This plugin works seamlessly with `cssanimation.css` classes and lets you apply them on user interactions. It supports mouse, keyboard, touch, and custom event triggers — with optional animation control via delay, duration, reset, and key filters.

## Features

- Animate on `click`, `mouseenter`, `scroll`, `keydown`, etc.
- Animate any element or target another with a selector
- Reset animation classes automatically
- Toggle class on/off with a single trigger
- Trigger with keyboard key filters (`ctrl+s`, `shift+a`, `a*`)
- Chain animations using `data-triggle-next`
- Delay the next animation with `data-triggle-chain-delay`
- Trigger multiple elements at once with `data-triggle-group`
- Stagger animations across groups with `data-triggle-stagger`
- One-time animation triggers with `data-triggle-once`
- Cleanup & reinitialization support
- Developer debug logging

## Try It Live

Explore all supported triggers and features in the interactive playground: 👉 [Live Demo](https://yesiamrocks.github.io/Triggle/)

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

- `data-triggle`: Event(s) to listen for (e.g., `click`, `mouseenter`)
- `data-triggle-class`: Class(es) to apply on trigger-
- `data-triggle-reset`: If `"true"`, removes class after animation ends

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

| Attribute                  | Type         | Description                                                    |
| -------------------------- | ------------ | -------------------------------------------------------------- |
| `data-triggle`             | `string`     | Comma-separated events (e.g. `click,mouseenter`)               |
| `data-triggle-class`       | `string`     | Space-separated CSS classes to animate                         |
| `data-triggle-reset`       | `true/false` | Removes animation class after it finishes                      |
| `data-triggle-delay`       | `string`     | CSS `animation-delay` (e.g., `0.5s`)                           |
| `data-triggle-duration`    | `string`     | CSS `animation-duration` (e.g., `1s`)                          |
| `data-triggle-toggle`      | `true/false` | Toggles class on and off (instead of just adding)              |
| `data-triggle-once`        | `true/false` | Triggers animation only once                                   |
| `data-triggle-target`      | `string`     | CSS selector for the element to animate (defaults to self)     |
| `data-triggle-key`         | `string`     | Keyboard filter (e.g. `enter`, `ctrl+s`, `a*`)                 |
| `data-triggle-next`        | `string`     | CSS selector of element to animate **after this one finishes** |
| `data-triggle-chain-delay` | `number`     | Delay (in ms) before triggering `data-triggle-next`            |
| `data-triggle-group`       | `string`     | Group name to animate multiple elements together               |
| `data-triggle-stagger`     | `number`     | Delay (in ms) between each group's element animation           |

## Hover with Delay and Reset

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

## Chained Animation Example

```html
<button
  data-triggle="click"
  data-triggle-class="zoomIn"
  data-triggle-reset="true"
  data-triggle-next="#step2"
  data-triggle-chain-delay="500">
  Start
</button>

<div id="step2" data-triggle-class="slideInUp" data-triggle-reset="true" />
```

When the button is clicked:

1. It animates with fadeIn
2. Once that finishes, #step2 animates with slideInUp
3. `#step2` will animate 500ms after `zoomIn` ends on the button.

## Group Triggering Example

```html
<div
  data-triggle="click"
  data-triggle-class="bounce"
  data-triggle-group="cards" />

<div
  class="card"
  data-triggle-class="fadeInUp"
  data-triggle-reset="true"
  data-triggle-group="cards" />

<div
  class="card"
  data-triggle-class="fadeInUp"
  data-triggle-reset="true"
  data-triggle-group="cards" />
```

All elements with `data-triggle-group="cards"` will animate together when the trigger is clicked.

## Group Trigger + Stagger

```html
<button
  data-triggle="click"
  data-triggle-class="pulse"
  data-triggle-group="cards"
  data-triggle-stagger="200">
  Animate All Cards
</button>

<div
  class="card"
  data-triggle-class="fadeInUp"
  data-triggle-reset="true"
  data-triggle-group="cards">
  Card 1
</div>

<div
  class="card"
  data-triggle-class="fadeInUp"
  data-triggle-reset="true"
  data-triggle-group="cards">
  Card 2
</div>

<div
  class="card"
  data-triggle-class="fadeInUp"
  data-triggle-reset="true"
  data-triggle-group="cards">
  Card 3
</div>
```

Cards animate one by one, **each 200ms** after the last.

## Targeting Another Element

```html
<button
  data-triggle="click"
  data-triggle-class="fadeIn"
  data-triggle-target="#box">
  Animate Box
</button>

<div id="box" class="box"></div>
```

## Keyboard Filter Example

Limit animations to specific key presses:

```html
<div
  data-triggle="keydown"
  data-triggle-class="ca__fx-fadeIn"
  data-triggle-key="ctrl+k,shift+a,a*"
  data-triggle-reset="true">
  Press keys
</div>
```

Supports:

- Single key match (a)
- Wildcards (a\* matches abc)
- Modifier keys (ctrl+s, shift+enter, alt+x)

## Toggle Animation Example

```html
<div
  data-triggle="click"
  data-triggle-class="bounce"
  data-triggle-toggle="true">
  Click to toggle bounce
</div>
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

## Manual Animation Trigger (Optional)

```js
window.triggle.apply(
  document.querySelector("#element"),
  "fadeIn",
  true, // reset
  "0.3s", // delay
  "1s", // duration
  false // toggle
);
```

## Cleanup

If you're using triggle in a single-page app or want to reinitialize:

```js
window.triggle.destroy(); // Removes all listeners
window.triggle.init(); // Re-initializes all triggers
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
