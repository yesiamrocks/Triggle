(function () {
  const PASSIVE_EVENTS = ["touchstart", "touchend", "scroll"];
  const targetCache = new WeakMap();

  function applyAnimation(
    el,
    animationClass,
    reset = false,
    delay,
    duration,
    toggle = false,
    onComplete
  ) {
    if (window.__trg_TRIGGER_DISABLED) return;

    if (delay) el.style.animationDelay = delay;
    if (duration) el.style.animationDuration = duration;

    const classList = animationClass.split(" ").filter(Boolean);

    if (toggle) {
      classList.forEach((cls) => el.classList.toggle(cls));
    } else {
      classList.forEach((cls) => el.classList.add(cls));
    }

    const clearStyles = () => {
      el.style.animationDelay = "";
      el.style.animationDuration = "";
    };

    if (reset && !toggle) {
      const onAnimationEnd = () => {
        classList.forEach((cls) => el.classList.remove(cls));
        clearStyles();
        el.removeEventListener("animationend", onAnimationEnd);

        el.dispatchEvent(
          new CustomEvent("triggle:animationEnd", {
            detail: { class: animationClass },
          })
        );

        if (typeof onComplete === "function") onComplete();
      };
      el.addEventListener("animationend", onAnimationEnd);
    } else {
      clearStyles();
      if (typeof onComplete === "function") onComplete();
    }
  }

  function matchesKeyFilter(keyFilter, event) {
    const rules = keyFilter.split(",").map((k) => k.trim().toLowerCase());
    return rules.some((rule) => {
      const parts = rule.split("+");
      const requiredKey = parts.pop();
      const requiredMods = parts;

      const matchesKey = requiredKey === event.key.toLowerCase();
      const matchesMods = requiredMods.every((mod) => {
        return (
          (mod === "ctrl" && event.ctrlKey) ||
          (mod === "shift" && event.shiftKey) ||
          (mod === "alt" && event.altKey)
        );
      });

      const match = matchesKey && (requiredMods.length === 0 || matchesMods);

      if (window.__trg_DEBUG) {
        console.log(`[triggle] key match: ${match}`, {
          rule,
          eventKey: event.key,
          event,
        });
      }

      return match;
    });
  }

  function getTargetElement(triggerEl, selector) {
    if (!selector) return triggerEl;

    if (targetCache.has(triggerEl)) return targetCache.get(triggerEl);

    const target =
      selector.startsWith(".") || selector.startsWith("#")
        ? document.querySelector(selector)
        : triggerEl.closest(selector);

    if (target) targetCache.set(triggerEl, target);
    return target;
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
      const toggle = el.getAttribute("data-triggle-toggle") === "true";
      const targetSelector = el.getAttribute("data-triggle-target");
      const nextSelector = el.getAttribute("data-triggle-next");
      const chainDelay =
        parseInt(el.getAttribute("data-triggle-chain-delay"), 10) || 0;
      const groupName = el.getAttribute("data-triggle-group");
      const staggerValue =
        parseInt(el.getAttribute("data-triggle-stagger"), 10) || 0;

      if (!animationClass && !groupName) {
        if (window.__trg_DEBUG) {
          console.warn(
            "[triggle] Missing data-triggle-class or group for:",
            el
          );
        }
        return;
      }

      const eventHandler = (event) => {
        if ((event.type === "keydown" || event.type === "keyup") && keyFilter) {
          if (!matchesKeyFilter(keyFilter, event)) return;
        }

        const targetElement = getTargetElement(el, targetSelector);

        if (!targetElement) {
          if (window.__trg_DEBUG) {
            console.warn(
              `[triggle] Target element not found: ${targetSelector}`,
              el
            );
          }
          return;
        }

        if (window.__trg_DEBUG) {
          console.log(`[triggle] trigger: ${event.type}`, {
            element: el,
            target: targetElement,
            animationClass,
            reset,
            delay,
            duration,
            once,
            toggle,
            nextSelector,
            chainDelay,
            groupName,
            staggerValue,
          });
        }

        const animateNext = () => {
          // 🔁 CHAINING: Animate next element if defined
          if (nextSelector) {
            const nextEl = document.querySelector(nextSelector);
            if (nextEl) {
              const nextClass = nextEl.getAttribute("data-triggle-class");
              const nextReset =
                nextEl.getAttribute("data-triggle-reset") === "true";
              const nextDelay = nextEl.getAttribute("data-triggle-delay");
              const nextDuration = nextEl.getAttribute("data-triggle-duration");
              const nextToggle =
                nextEl.getAttribute("data-triggle-toggle") === "true";

              setTimeout(() => {
                applyAnimation(
                  nextEl,
                  nextClass,
                  nextReset,
                  nextDelay,
                  nextDuration,
                  nextToggle
                );
              }, chainDelay);
            }
          }

          // 👥 GROUP: Trigger all elements with same group name
          if (groupName) {
            const groupElements = document.querySelectorAll(
              `[data-triggle-group="${groupName}"]`
            );
            groupElements.forEach((groupEl, i) => {
              const gClass = groupEl.getAttribute("data-triggle-class");
              const gReset =
                groupEl.getAttribute("data-triggle-reset") === "true";
              const gDelay = groupEl.getAttribute("data-triggle-delay");
              const gDuration = groupEl.getAttribute("data-triggle-duration");
              const gToggle =
                groupEl.getAttribute("data-triggle-toggle") === "true";

              const totalDelay =
                staggerValue > 0 ? `${i * staggerValue}ms` : gDelay;

              applyAnimation(
                groupEl,
                gClass,
                gReset,
                totalDelay,
                gDuration,
                gToggle
              );
            });
          }
        };

        applyAnimation(
          targetElement,
          animationClass,
          reset,
          delay,
          duration,
          toggle,
          animateNext
        );

        if (once) {
          el.removeEventListener(event.type, eventHandler);
        }
      };

      triggers.forEach((trigger) => {
        el.addEventListener(
          trigger,
          eventHandler,
          PASSIVE_EVENTS.includes(trigger) ? { passive: true } : false
        );
      });
    });
  }

  function destroyTriggerAnimations() {
    document.querySelectorAll("[data-triggle]").forEach((el) => {
      el.replaceWith(el.cloneNode(true));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTriggerAnimations);
  } else {
    initTriggerAnimations();
  }

  window.triggle = {
    init: initTriggerAnimations,
    destroy: destroyTriggerAnimations,
    apply: applyAnimation,
  };
})();
