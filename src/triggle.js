(function (factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function () {
  "use strict";
  (function () {
    const PASSIVE_EVENTS = ["touchstart", "touchend", "scroll"];
    const targetCache = new WeakMap();
    const observerMap = new WeakMap();
    const eventListenerMap = new WeakMap();

    const animationPresets = {
      fadeIn: "ca__fx-fadeIn",
      fadeInUp: "ca__fx-fadeInUp",
      fadeInDown: "ca__fx-fadeInDown",
      zoomIn: "ca__fx-zoomIn",
      zoomOut: "ca__fx-zoomOut",
      bounceIn: "ca__fx-bounceIn",
      bounceOut: "ca__fx-bounceOut",
      slideInLeft: "ca__fx-slideInLeft",
      slideInRight: "ca__fx-slideInRight",
      flipInX: "ca__fx-flipInX",
      flipInY: "ca__fx-flipInY",
    };

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
      if (!animationClass) return;
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

    function getTargetElements(triggerEl, selector) {
      if (!selector) return [triggerEl];
      if (targetCache.has(triggerEl)) return targetCache.get(triggerEl);

      const targets = selector
        .split(",")
        .map((s) => s.trim())
        .flatMap((sel) => {
          try {
            return [
              ...triggerEl.querySelectorAll(sel),
              triggerEl.closest(sel),
              ...document.querySelectorAll(sel),
            ].filter(Boolean);
          } catch {
            return [];
          }
        });

      if (targets.length > 0) targetCache.set(triggerEl, targets);
      return targets;
    }

    function triggerGroup(groupName, staggerValue = 0) {
      const groupEls = document.querySelectorAll(
        `[data-triggle-group="${groupName}"]`
      );
      groupEls.forEach((groupEl, i) => {
        const gClass = groupEl.getAttribute("data-triggle-class");
        const gReset = groupEl.getAttribute("data-triggle-reset") === "true";
        const gDelay = groupEl.getAttribute("data-triggle-delay");
        const gDuration = groupEl.getAttribute("data-triggle-duration");
        const gToggle = groupEl.getAttribute("data-triggle-toggle") === "true";
        const totalDelay = staggerValue > 0 ? `${i * staggerValue}ms` : gDelay;
        applyAnimation(groupEl, gClass, gReset, totalDelay, gDuration, gToggle);
      });
    }

    function triggerAnimation(el, originEl = null) {
      const targetSelector = el.getAttribute("data-triggle-target");
      const targetElements = getTargetElements(el, targetSelector);
      const nextSelector = el.getAttribute("data-triggle-next");
      const chainDelay =
        parseInt(el.getAttribute("data-triggle-chain-delay"), 10) || 0;
      const chainLoop = el.getAttribute("data-triggle-chain-loop") === "true";
      const groupName = el.getAttribute("data-triggle-group");
      const staggerValue =
        parseInt(el.getAttribute("data-triggle-stagger"), 10) || 0;

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
          triggerGroup(groupName, staggerValue);
        }
      };

      const targets =
        targetElements && targetElements.length > 0 ? targetElements : [el];

      let remaining = targets.length;

      targets.forEach((targetEl) => {
        const preset = targetEl.getAttribute("data-triggle-preset");
        let animationClass = targetEl.getAttribute("data-triggle-class");
        if (!animationClass && preset && animationPresets[preset]) {
          animationClass = animationPresets[preset];
        }

        if (!animationClass) {
          remaining--;
          if (remaining === 0) animateNext();
          return;
        }

        const reset = targetEl.getAttribute("data-triggle-reset") === "true";
        const delay = targetEl.getAttribute("data-triggle-delay");
        const duration = targetEl.getAttribute("data-triggle-duration");
        const toggle = targetEl.getAttribute("data-triggle-toggle") === "true";

        applyAnimation(
          targetEl,
          animationClass,
          reset,
          delay,
          duration,
          toggle,
          () => {
            remaining--;
            if (remaining === 0) animateNext();
          }
        );
      });
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
        const scrollThreshold =
          parseFloat(el.getAttribute("data-triggle-threshold")) || 0.5;
        const groupName = el.getAttribute("data-triggle-group");
        const staggerValue =
          parseInt(el.getAttribute("data-triggle-stagger"), 10) || 0;

        const handler = (event) => {
          if (
            (event.type === "keydown" || event.type === "keyup") &&
            keyFilter
          ) {
            if (!matchesKeyFilter(keyFilter, event)) return;
          }
          triggerAnimation(el);
          if (once) el.removeEventListener(event.type, handler);
        };

        const registeredEvents = [];
        triggers.forEach((trigger) => {
          if (scrollTrigger && trigger === "scroll") {
            const observer = new IntersectionObserver(
              (entries, obs) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    if (groupName) {
                      triggerGroup(groupName, staggerValue);
                    } else {
                      triggerAnimation(el);
                    }
                    if (once) obs.unobserve(entry.target);
                  }
                });
              },
              { threshold: scrollThreshold }
            );
            observer.observe(el);
            observerMap.set(el, observer);
          } else {
            const options = PASSIVE_EVENTS.includes(trigger)
              ? { passive: true }
              : false;
            el.addEventListener(trigger, handler, options);
            registeredEvents.push({ type: trigger, handler, options });
          }
        });

        if (registeredEvents.length > 0) {
          eventListenerMap.set(el, registeredEvents);
        }
      });
    }

    function destroyTriggerAnimations() {
      document.querySelectorAll("[data-triggle]").forEach((el) => {
        const observer = observerMap.get(el);
        if (observer) {
          observer.disconnect();
          observerMap.delete(el);
        }

        const listeners = eventListenerMap.get(el);
        if (listeners) {
          listeners.forEach(({ type, handler, options }) => {
            el.removeEventListener(type, handler, options);
          });
          eventListenerMap.delete(el);
        }
      });
    }

    function observeMutations() {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType !== 1) return;
            if (
              node.matches?.("[data-triggle]") ||
              node.querySelector?.("[data-triggle]")
            ) {
              triggle.init();
            }
          });
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        initTriggerAnimations();
        observeMutations();
      });
    } else {
      initTriggerAnimations();
      observeMutations();
    }

    window.triggle = {
      init: initTriggerAnimations,
      destroy: destroyTriggerAnimations,
      apply: applyAnimation,
    };
  })();
});
