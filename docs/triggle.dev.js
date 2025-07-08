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

      return matchesKey && (requiredMods.length === 0 || matchesMods);
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

  function triggerAnimation(el, originEl = null) {
    const animationClass = el.getAttribute("data-triggle-class");
    const reset = el.getAttribute("data-triggle-reset") === "true";
    const delay = el.getAttribute("data-triggle-delay");
    const duration = el.getAttribute("data-triggle-duration");
    const toggle = el.getAttribute("data-triggle-toggle") === "true";
    const targetSelector = el.getAttribute("data-triggle-target");
    const nextSelector = el.getAttribute("data-triggle-next");
    const chainDelay =
      parseInt(el.getAttribute("data-triggle-chain-delay"), 10) || 0;
    const chainLoop = el.getAttribute("data-triggle-chain-loop") === "true";
    const groupName = el.getAttribute("data-triggle-group");
    const staggerValue =
      parseInt(el.getAttribute("data-triggle-stagger"), 10) || 0;

    const targetElement = getTargetElement(el, targetSelector);
    if (!targetElement) return;

    const animateNext = () => {
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
              nextToggle,
              () => {
                if (chainLoop && originEl) {
                  setTimeout(() => {
                    triggerAnimation(originEl, originEl);
                  }, chainDelay);
                } else if (chainLoop && !originEl) {
                  triggerAnimation(el, el);
                }
              }
            );
          }, chainDelay);
        }
      }

      if (groupName) {
        const groupEls = document.querySelectorAll(
          `[data-triggle-group="${groupName}"]`
        );
        groupEls.forEach((groupEl, i) => {
          const gClass = groupEl.getAttribute("data-triggle-class");
          const gReset = groupEl.getAttribute("data-triggle-reset") === "true";
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
  }

  function initTriggerAnimations() {
    const elements = document.querySelectorAll("[data-triggle]");

    elements.forEach((el) => {
      const triggers = el
        .getAttribute("data-triggle")
        .split(",")
        .map((t) => t.trim());
      const keyFilter = el.getAttribute("data-triggle-key");
      const once = el.getAttribute("data-triggle-once") === "true";
      const scrollTrigger = el.getAttribute("data-triggle-scroll") === "true";
      const groupName = el.getAttribute("data-triggle-group");
      const staggerValue =
        parseInt(el.getAttribute("data-triggle-stagger"), 10) || 0;

      const handler = (event) => {
        if ((event.type === "keydown" || event.type === "keyup") && keyFilter) {
          if (!matchesKeyFilter(keyFilter, event)) return;
        }
        triggerAnimation(el);
        if (once) el.removeEventListener(event.type, handler);
      };

      triggers.forEach((trigger) => {
        if (scrollTrigger && trigger === "scroll") {
          const observer = new IntersectionObserver(
            (entries, obs) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  if (groupName) {
                    // Scroll-based group with stagger
                    const groupEls = document.querySelectorAll(
                      `[data-triggle-group="${groupName}"]`
                    );
                    groupEls.forEach((groupEl, i) => {
                      const gClass = groupEl.getAttribute("data-triggle-class");
                      const gReset =
                        groupEl.getAttribute("data-triggle-reset") === "true";
                      const gDelay = groupEl.getAttribute("data-triggle-delay");
                      const gDuration = groupEl.getAttribute(
                        "data-triggle-duration"
                      );
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
                  } else {
                    triggerAnimation(el);
                  }

                  if (once) obs.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.5 }
          );
          observer.observe(el);
        } else {
          el.addEventListener(
            trigger,
            handler,
            PASSIVE_EVENTS.includes(trigger) ? { passive: true } : false
          );
        }
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
