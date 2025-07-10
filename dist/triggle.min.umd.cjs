(function() {
  "use strict";!function(t) {
  "function" == typeof define && define.amd ? define(t) : t();
}
  !function() {
    const t = ["touchstart", "touchend", "scroll"], e = /* @__PURE__ */ new WeakMap();
    function r(t2, e2, r2 = false, i2, a2, g = false, n) {
      if (window.__trg_TRIGGER_DISABLED) return;
      i2 && (t2.style.animationDelay = i2), a2 && (t2.style.animationDuration = a2);
      const o = e2.split(" ").filter(Boolean);
      g ? o.forEach((e3) => t2.classList.toggle(e3)) : o.forEach((e3) => t2.classList.add(e3));
      const l = () => {
        t2.style.animationDelay = "", t2.style.animationDuration = "";
      };
      if (r2 && !g) {
        const r3 = () => {
          o.forEach((e3) => t2.classList.remove(e3)), l(), t2.removeEventListener("animationend", r3), t2.dispatchEvent(new CustomEvent("triggle:animationEnd", { detail: { class: e2 } })), "function" == typeof n && n();
        };
        t2.addEventListener("animationend", r3);
      } else l(), "function" == typeof n && n();
    }
    function i(t2, a2 = null) {
      const g = t2.getAttribute("data-triggle-class"), n = "true" === t2.getAttribute("data-triggle-reset"), o = t2.getAttribute("data-triggle-delay"), l = t2.getAttribute("data-triggle-duration"), u = "true" === t2.getAttribute("data-triggle-toggle"), s = t2.getAttribute("data-triggle-target"), d = t2.getAttribute("data-triggle-next"), c = parseInt(t2.getAttribute("data-triggle-chain-delay"), 10) || 0, f = "true" === t2.getAttribute("data-triggle-chain-loop"), A = t2.getAttribute("data-triggle-group"), b = parseInt(t2.getAttribute("data-triggle-stagger"), 10) || 0, y = function(t3, r2) {
        if (!r2) return t3;
        if (e.has(t3)) return e.get(t3);
        const i2 = r2.startsWith(".") || r2.startsWith("#") ? document.querySelector(r2) : t3.closest(r2);
        return i2 && e.set(t3, i2), i2;
      }(t2, s);
      if (!y) return;
      r(y, g, n, o, l, u, () => {
        if (d) {
          const e2 = document.querySelector(d);
          if (e2) {
            const g2 = e2.getAttribute("data-triggle-class"), n2 = "true" === e2.getAttribute("data-triggle-reset"), o2 = e2.getAttribute("data-triggle-delay"), l2 = e2.getAttribute("data-triggle-duration"), u2 = "true" === e2.getAttribute("data-triggle-toggle");
            setTimeout(() => {
              r(e2, g2, n2, o2, l2, u2, () => {
                f && a2 ? setTimeout(() => {
                  i(a2, a2);
                }, c) : f && !a2 && i(t2, t2);
              });
            }, c);
          }
        }
        if (A) {
          document.querySelectorAll(`[data-triggle-group="${A}"]`).forEach((t3, e2) => {
            const i2 = t3.getAttribute("data-triggle-class"), a3 = "true" === t3.getAttribute("data-triggle-reset"), g2 = t3.getAttribute("data-triggle-delay"), n2 = t3.getAttribute("data-triggle-duration"), o2 = "true" === t3.getAttribute("data-triggle-toggle");
            r(t3, i2, a3, b > 0 ? e2 * b + "ms" : g2, n2, o2);
          });
        }
      });
    }
    function a() {
      document.querySelectorAll("[data-triggle]").forEach((e2) => {
        const a2 = e2.getAttribute("data-triggle").split(",").map((t2) => t2.trim()), g = e2.getAttribute("data-triggle-key"), n = "true" === e2.getAttribute("data-triggle-once"), o = "true" === e2.getAttribute("data-triggle-scroll"), l = e2.getAttribute("data-triggle-group"), u = parseInt(e2.getAttribute("data-triggle-stagger"), 10) || 0, s = (t2) => {
          ("keydown" !== t2.type && "keyup" !== t2.type || !g || function(t3, e3) {
            return t3.split(",").map((t4) => t4.trim().toLowerCase()).some((t4) => {
              const r2 = t4.split("+"), i2 = r2.pop(), a3 = r2, g2 = i2 === e3.key.toLowerCase(), n2 = a3.every((t5) => "ctrl" === t5 && e3.ctrlKey || "shift" === t5 && e3.shiftKey || "alt" === t5 && e3.altKey);
              return g2 && (0 === a3.length || n2);
            });
          }(g, t2)) && (i(e2), n && e2.removeEventListener(t2.type, s));
        };
        a2.forEach((a3) => {
          if (o && "scroll" === a3) {
            new IntersectionObserver((t2, a4) => {
              t2.forEach((t3) => {
                if (t3.isIntersecting) {
                  if (l) {
                    document.querySelectorAll(`[data-triggle-group="${l}"]`).forEach((t4, e3) => {
                      const i2 = t4.getAttribute("data-triggle-class"), a5 = "true" === t4.getAttribute("data-triggle-reset"), g2 = t4.getAttribute("data-triggle-delay"), n2 = t4.getAttribute("data-triggle-duration"), o2 = "true" === t4.getAttribute("data-triggle-toggle");
                      r(t4, i2, a5, u > 0 ? e3 * u + "ms" : g2, n2, o2);
                    });
                  } else i(e2);
                  n && a4.unobserve(t3.target);
                }
              });
            }, { threshold: 0.5 }).observe(e2);
          } else e2.addEventListener(a3, s, !!t.includes(a3) && { passive: true });
        });
      });
    }
    "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", a) : a(), window.triggle = { init: a, destroy: function() {
      document.querySelectorAll("[data-triggle]").forEach((t2) => {
        t2.replaceWith(t2.cloneNode(true));
      });
    }, apply: r };
  }();
});
//# sourceMappingURL=triggle.min.umd.cjs.map
