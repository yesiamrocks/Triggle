(function () {
  function applyAnimation(el, animationClass, reset = false, delay, duration) {
    if (window.__trg_TRIGGER_DISABLED) return;

    if (delay) el.style.animationDelay = delay;
    if (duration) el.style.animationDuration = duration;

    const classList = animationClass.split(" ").filter(Boolean);
    classList.forEach((cls) => el.classList.add(cls));

    if (reset) {
      const onAnimationEnd = () => {
        classList.forEach((cls) => el.classList.remove(cls));
        el.style.animationDelay = "";
        el.style.animationDuration = "";
        el.removeEventListener("animationend", onAnimationEnd);
      };
      el.addEventListener("animationend", onAnimationEnd);
    }
  }

  function matchesKeyFilter(keyFilter, event) {
    const rules = keyFilter.split(",").map((k) => k.trim().toLowerCase());
    return rules.some((rule) => {
      if (rule.includes("+")) {
        const [mod, key] = rule.split("+");
        const match =
          key === event.key.toLowerCase() &&
          ((mod === "ctrl" && event.ctrlKey) ||
            (mod === "shift" && event.shiftKey) ||
            (mod === "alt" && event.altKey));
        if (window.__trg_DEBUG)
          console.log(
            `[triggle] modifier match: ${match}, rule: ${rule}, event.key: ${event.key}`
          );
        return match;
      } else if (rule.endsWith("*")) {
        const prefix = rule.replace("*", "");
        const match = event.key.toLowerCase().startsWith(prefix);
        if (window.__trg_DEBUG)
          console.log(
            `[triggle] wildcard match: ${match}, rule: ${rule}, event.key: ${event.key}`
          );
        return match;
      } else {
        const match = rule === event.key.toLowerCase();
        if (window.__trg_DEBUG)
          console.log(
            `[triggle] exact match: ${match}, rule: ${rule}, event.key: ${event.key}`
          );
        return match;
      }
    });
  }

  function initTriggerAnimations() {
    const elements = document.querySelectorAll("[data-triggle]");

    elements.forEach((el) => {
      const triggers = el
        .getAttribute("data-triggle")
        .split(",")
        .map((t) => t.trim());
      const animationClass = el.getAttribute("data-triggle-class");
      const reset = el.getAttribute("data-triggle-reset") === "true";
      const delay = el.getAttribute("data-triggle-delay");
      const duration = el.getAttribute("data-triggle-duration");
      const keyFilter = el.getAttribute("data-triggle-key");
      const once = el.getAttribute("data-triggle-once") === "true";

      if (!animationClass) {
        if (window.__trg_DEBUG) {
          console.warn(`[triggle] Missing data-triggle-class on element:`, el);
        }
        return;
      }

      triggers.forEach((trigger) => {
        const handler = function (event) {
          if ((trigger === "keydown" || trigger === "keyup") && keyFilter) {
            if (!matchesKeyFilter(keyFilter, event)) return;
          }

          if (window.__trg_DEBUG) {
            console.log(`[triggle] trigger: ${trigger}`, {
              element: el,
              animationClass,
              reset,
              delay,
              duration,
              once,
            });
          }

          applyAnimation(el, animationClass, reset, delay, duration);

          if (once) {
            el.removeEventListener(trigger, handler);
          }
        };

        el.addEventListener(trigger, handler);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTriggerAnimations);
  } else {
    initTriggerAnimations();
  }

  // Export to global
  window.triggle = {
    init: initTriggerAnimations,
  };

  // Optional CommonJS export
  if (typeof module !== "undefined") {
    module.exports = window.triggle;
  }
})();
