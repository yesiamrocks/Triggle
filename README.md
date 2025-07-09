# Trigger-Based Animation Control Made Simple — **`triggle.js`**

![Vanilla JS](https://img.shields.io/badge/JS-Vanilla%20JS-brightgreen?style=for-the-badge)
![No Dependencies](https://img.shields.io/badge/Dependencies-None-lightgrey?style=for-the-badge)
![Optimized for Mobile](https://img.shields.io/badge/Mobile-Optimized-blue?style=for-the-badge)
[![NPM](https://img.shields.io/npm/v/triggle?style=for-the-badge&label=triggle)](https://www.npmjs.com/package/triggle)
[![Downloads](https://img.shields.io/npm/dt/triggle?style=for-the-badge)](https://www.npmjs.com/package/triggle)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/triggle?style=for-the-badge)](https://bundlephobia.com/package/triggle)
![License](https://img.shields.io/npm/l/triggle?style=for-the-badge)
[![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/triggle?style=for-the-badge)](https://www.jsdelivr.com/package/npm/triggle)
[![unpkg](https://img.shields.io/badge/CDN-unpkg-blue?style=for-the-badge)](https://unpkg.com/browse/triggle/)
[![View Demo](https://img.shields.io/badge/🎬%20Live-Demo-green?style=for-the-badge)](https://yesiamrocks.github.io/Triggle/)

`triggle.js` is a lightweight JavaScript library that makes it easy to control CSS animations using simple HTML attributes, no dependencies required.

Designed for performance and mobile-friendly by default, `triggle.js` lets you add animations that respond to user actions like mouse clicks, hovers, key presses, scroll events, and more. Just use intuitive `data-triggle` attributes to trigger animations exactly when and how you want them.

Whether you're building interactive buttons, scroll effects, or playful UI animations, triggle.js works beautifully with [`cssanimation.css`](https://github.com/yesiamrocks/cssanimation) and supports options like delays, durations, and auto-reset, giving you full control with minimal code.

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

👉 [Live Demo](https://yesiamrocks.github.io/triggle/) | [Download via NPM](https://www.npmjs.com/package/triggle) | [Check on jsDelivr](https://www.jsdelivr.com/package/npm/triggle) | [View on unpkg](https://app.unpkg.com/triggle@1.2.0)

## Installation

### Using NPM

```bash
npm install triggle
```

Then import it in your JavaScript:

```js
import "triggle";
```

### Using CDN

```js
<script src="https://cdn.jsdelivr.net/npm/triggle@latest/dist/triggle.min.js"></script>
```

## Animation Classes Powered by {css}animation

**Triggle** is designed to work hand-in-hand with the animation classes from **[{css}animation](https://github.com/yesiamrocks/cssanimation)**. These CSS classes are required to make the triggers actually animate elements, so be sure to include them in your project.

Install the animation library:

```bash
npm install @hellouxpavel/cssanimation
```

Then import it in your JavaScript:

```js
import "@hellouxpavel/cssanimation";
```

Or include it via CDN:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@hellouxpavel/cssanimation@latest/dist/cssanimation.min.css" />
```

Without the cssanimation classes, **Triggle** can still detect triggers, but no animation will play.

## Getting Started

To use triggle.js, simply add `data-triggle-*` attributes to any HTML element you want to animate:

```html
<div
  class="cssanimation"
  data-triggle="click"
  data-triggle-class="ca__fx-fadeInTop"
  data-triggle-reset="true">
  Click to Animate
</div>
```

**You can combine multiple triggers using a comma:** `data-triggle="mouseenter,click,keydown"`

What each part does:

- `class="cssanimation"` – Required. This enables animation support from the `@hellouxpavel/cssanimation` library.
- `data-triggle` – Specifies the event(s) that trigger the animation (e.g., `click`, `mouseenter`, `keydown`).
- `data-triggle-class` – The animation class (or classes) to apply when triggered.
- `data-triggle-reset="true"` – Optional. If set to `"true"`, the animation class is removed after it finishes, allowing it to trigger again.
- `data-triggle-once="true"` – Use `data-triggle-once="true"` to ensure an animation only runs a **single time**, even if the triggering event happens again.

> Make sure the **[{css}animation](https://github.com/yesiamrocks/cssanimation)** styles are included in your project for the animation to work properly.

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

## Attributes Reference

| Attribute                  | Type         | Description                                                        |
| -------------------------- | ------------ | ------------------------------------------------------------------ |
| `data-triggle`             | `string`     | Comma-separated events (e.g. `click,mouseenter`)                   |
| `data-triggle-class`       | `string`     | Space-separated CSS classes to animate                             |
| `data-triggle-reset`       | `true/false` | Removes animation class after it finishes                          |
| `data-triggle-delay`       | `string`     | CSS `animation-delay` (e.g., `0.5s`)                               |
| `data-triggle-duration`    | `string`     | CSS `animation-duration` (e.g., `1s`)                              |
| `data-triggle-toggle`      | `true/false` | Toggles class on and off (instead of just adding)                  |
| `data-triggle-once`        | `true/false` | Triggers animation only once                                       |
| `data-triggle-target`      | `string`     | CSS selector for the element to animate (defaults to self)         |
| `data-triggle-key`         | `string`     | Keyboard filter (e.g. `enter`, `ctrl+s`, `a*`)                     |
| `data-triggle-next`        | `string`     | CSS selector of element to animate **after this one finishes**     |
| `data-triggle-chain-delay` | `number`     | Delay (in ms) before triggering `data-triggle-next`                |
| `data-triggle-group`       | `string`     | Group name to animate multiple elements together                   |
| `data-triggle-stagger`     | `number`     | Delay (in ms) between each group's element animation               |
| `data-triggle-scroll`      | `true/false` | Use IntersectionObserver to animate when element scrolls into view |
| `data-triggle-chain-loop`  | `true`       | Enables infinite looping between chained elements                  |

## Hover with Delay and Reset

This example shows how to trigger an animation on hover with custom timing and automatic reset:

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

Timing Controls
Use these attributes to control animation timing:

- `data-triggle-delay="0.2s"` – Adds a delay before the animation starts.
- `data-triggle-duration="1.5s"` – Sets how long the animation should run.

## Targeting Another Element

You can trigger animations on a different element using the `data-triggle-target` attribute:

```html
<button
  data-triggle="click"
  data-triggle-class="ca__fx-fadeIn"
  data-triggle-target="#box"
  data-triggle-reset="true">
  Animate Box
</button>

<div id="box" class="box"></div>
```

How it works

- `data-triggle-target="#box"` – Selects the element to animate.
- `data-triggle-class="fadeIn"` – The class that will be applied to the target when the trigger fires.

> This is useful for triggering animations from buttons, controls, or any external source.

## Triggle Toggle Animation

Use `data-triggle-toggle="true"` to turn the animation class on and off with each trigger:

```html
<div
  data-triggle="click"
  data-triggle-class="ca__fx-moonFade"
  data-triggle-toggle="true">
  Click to toggle bounce
</div>
```

How it works

- On first click, the `ca__fx-moonFade` class is added.
- On second click, the same class is removed.

This cycle continues on every interaction.

> Useful for toggling active/inactive states with a single element.

## Triggle Scroll Animation

Animate elements as they scroll into view using `data-triggle-scroll="true"`:

```html
<div
  data-triggle="scroll"
  data-triggle-scroll="true"
  data-triggle-class="ca__fx-moonFadeUp"
  data-triggle-reset="true"
  data-triggle-once="true">
  I animate when visible
</div>
```

How it works

- Triggers the `ca__fx-moonFadeUp` animation once when at least 50% of the element enters the viewport.
- `data-triggle-once="true"` ensures the animation happens only once per page load.
- `data-triggle-reset="true"` allows it to reset after animation completes (if `once` is not used).

> Perfect for scroll-based reveals and in-view transitions.

## Triggle Scroll-Based Staggered Animation

Use `data-triggle-group` and `data-triggle-stagger` to animate multiple elements in a coordinated sequence when a trigger element comes into view.

Trigger Element:

```html
<div
  data-triggle="scroll"
  data-triggle-scroll="true"
  data-triggle-group="feature"
  data-triggle-class="ca__fx-moonFadeScaleUp"
  data-triggle-stagger="300"
  data-triggle-once="true"></div>
```

Staggered/Grouped Targets:

```html
<div
  data-triggle-class="ca__fx-moonFadeLeft"
  data-triggle-reset="true"
  data-triggle-group="feature">
  Card A
</div>

<div
  data-triggle-class="ca__fx-moonFadeRight"
  data-triggle-reset="true"
  data-triggle-group="feature">
  Card B
</div>

<div
  data-triggle-class="ca__fx-moonFade"
  data-triggle-reset="true"
  data-triggle-group="feature">
  Card C
</div>
```

How it works

- The **trigger element** activates the animation for all elements in the matching `data-triggle-group`.
- The `data-triggle-stagger="300"` adds a 300ms delay between each target's animation.
- Use `data-triggle-once="true"` if you want the animation only fires once when the group scrolls into view.
- Use `data-triggle-reset="true"` if you want the animation to fire every time the group scrolls into view.

> Great for scroll reveals, feature sections, or card-based layouts with subtle animation cascades.

## Chained Animation Example

Chain multiple animations by using `data-triggle-next` and control timing with `data-triggle-chain-delay`.

```html
<button
  data-triggle="click"
  data-triggle-class="ca__fx-swingIn"
  data-triggle-reset="true"
  data-triggle-next="#step2"
  data-triggle-chain-delay="500">
  Start
</button>

<div
  id="step2"
  data-triggle-class="ca__fx-systemBootIn"
  data-triggle-reset="true" />
```

When the button is clicked:

- It animates with `ca__fx-swingIn`
- After `ca__fx-swingIn` finishes, triggle waits 500ms and then triggers `#step2`
- `#step2` animates using the `ca__fx-systemBootIn` class

Key Attributes

- `data-triggle-next="#selector"` – Defines the next element to animate in sequence.
- `data-triggle-chain-delay="500"` – Wait time in milliseconds before triggering the next animation.

> Use chaining for guided flows, multi-step reveals, or onboarding sequences.

## Chain Loop Example (data-triggle-chain-loop)

```html
<div
  id="box1"
  data-triggle="click"
  data-triggle-class="fadeIn"
  data-triggle-next="#box2"
  data-triggle-chain-delay="500"
  data-triggle-chain-loop="true">
  Start Loop
</div>

<div
  id="box2"
  data-triggle-class="fadeOut"
  data-triggle-next="#box1"
  data-triggle-chain-delay="500"></div>
```

- This will loop between `box1` and `box2` indefinitely.

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

- Single key match (a) `data-triggle-key="Enter,Escape"`
- Wildcards (a\* matches abc) `data-triggle-key="en*, arrow*"`
- Modifier keys (ctrl+s, shift+enter, alt+x) `data-triggle-key="ctrl+z, shift+a, alt+x"`

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

## Supported Passive Events

The following triggers use passive listeners for optimal performance:

- `touchstart`
- `touchend`
- `scroll`

## Performance Notes

To improve responsiveness on mobile devices, `triggle.js` uses **passive event listeners** for scroll-blocking events like `touchstart`, `touchend`, and `scroll`. This eliminates warnings in modern browsers (e.g., Chrome) and improves interaction smoothness.

## Integration Tips

- Core class `.cssanimation` class is required (from [cssanimation](https://github.com/yesiamrocks/cssanimation)).
- Use `data-triggle-*` attributes only on the intended element — avoid duplication on deeply nested structures to prevent conflicts.

## Library Architecture Summary

- Lightweight, zero-dependency vanilla JS
- Fast event listener setup using DOMContentLoaded
- Respects animation timing via native CSS
- Easy to drop in any project
- Animation cleanup using `animationend`
- Designed for extensibility
