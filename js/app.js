/**
 * AGM 2026 — APPLICATION LOGIC
 * -----------------------------------------------------------------------
 * Rendering, animation and interaction. Content lives in data.js —
 * this file should rarely need editing when updating the presentation.
 * -----------------------------------------------------------------------
 */
(function () {
  "use strict";

  var prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Muted greens/golds only — stays inside the existing brand palette
  // rather than introducing new hues just for the charts.
  var CHART_PALETTE = [
    "#4F6B47", "#B37E2E", "#8CA67F", "#8A5A22",
    "#6C8A62", "#D9B47E", "#37492F", "#C79A5B", "#A9C49A"
  ];

  /* ===================================================================
   * UTILITIES
   * =================================================================== */

  function formatInt(n) {
    return Math.round(n).toLocaleString("en-IN");
  }

  function formatCroreDisplay(exactRupees) {
    return "₹" + (exactRupees / 10000000).toFixed(2) + " Cr";
  }

  function formatRupeeShort(n) {
    // Used for in-bar values under the sales breakdown (in Lakh/Cr as appropriate)
    if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
    if (n >= 100000) return "₹" + (n / 100000).toFixed(1) + " L";
    return "₹" + formatInt(n);
  }

  /**
   * Renders a donut chart into `container` using conic-gradient — no
   * canvas/SVG/library needed. `categories` is an array of {name, value}
   * IN THE SAME ORDER used for that section's bars, so colours line up.
   */
  function buildDonutChart(container, centerEl, categories, centerDisplay) {
    if (!container) return;
    var total = categories.reduce(function (sum, c) { return sum + c.value; }, 0);
    var cumulative = 0;
    var stops = categories.map(function (cat, i) {
      var startPct = (cumulative / total) * 100;
      cumulative += cat.value;
      var endPct = (cumulative / total) * 100;
      var color = CHART_PALETTE[i % CHART_PALETTE.length];
      return color + " " + startPct.toFixed(2) + "% " + endPct.toFixed(2) + "%";
    });
    container.style.background = "conic-gradient(" + stops.join(", ") + ")";
    if (centerEl) centerEl.textContent = centerDisplay;
  }

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  /**
   * Animate a number from 0 to `target`, calling onUpdate(value) each frame.
   * Uses requestAnimationFrame; respects prefers-reduced-motion by jumping
   * straight to the final value.
   */
  function animateNumber(target, duration, onUpdate, onComplete) {
    if (prefersReducedMotion) {
      onUpdate(target);
      if (onComplete) onComplete();
      return;
    }
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var elapsed = ts - start;
      var t = Math.min(elapsed / duration, 1);
      var eased = easeOutExpo(t);
      onUpdate(target * eased);
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        onUpdate(target);
        if (onComplete) onComplete();
      }
    }
    requestAnimationFrame(step);
  }

  /* ===================================================================
   * SCROLL REVEAL (generic .reveal-block handler)
   * =================================================================== */

  function initRevealObserver() {
    var blocks = document.querySelectorAll(".reveal-block");
    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      blocks.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    blocks.forEach(function (el) { observer.observe(el); });
  }

  /* ===================================================================
   * SECTION 02 — SYSTEMS COUNTER + BREAKDOWN
   * =================================================================== */

  function initSystemsSection() {
    var stage = document.getElementById("systems-counter-stage");
    var counterEl = document.getElementById("systems-counter");
    var labelEl = document.getElementById("systems-counter-label");
    var introLine = document.getElementById("systems-intro-line");
    var breakdownEl = document.getElementById("systems-breakdown");

    if (!stage || typeof fy2526Systems === "undefined") return;

    labelEl.textContent = fy2526Systems.totalLabel;
    introLine.textContent = copy.systemsIntro;

    // Build breakdown rows (hidden until revealed)
    var maxValue = Math.max.apply(
      null,
      fy2526Systems.categories.map(function (c) { return c.value; })
    );
    fy2526Systems.categories.forEach(function (cat, i) {
      var color = CHART_PALETTE[i % CHART_PALETTE.length];
      var row = buildBreakdownRow(cat.name, cat.value, maxValue, false, i, color);
      breakdownEl.appendChild(row);
    });

    var donutEl = document.getElementById("systems-donut");
    var donutTotalEl = document.getElementById("systems-donut-total");
    buildDonutChart(donutEl, donutTotalEl, fy2526Systems.categories, formatInt(fy2526Systems.total));

    var hasRun = false;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !hasRun) {
            hasRun = true;
            animateNumber(fy2526Systems.total, 2200, function (v) {
              counterEl.textContent = formatInt(v);
            });
            if (donutEl) donutEl.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(stage);

    initBreakdownReveal(breakdownEl, false);
  }

  /* ===================================================================
   * SECTION 03 — SALES COUNTER + BREAKDOWN
   * =================================================================== */

  function initSalesSection() {
    var stage = document.getElementById("sales-counter-stage");
    var counterEl = document.getElementById("sales-counter");
    var introLine = document.getElementById("sales-intro-line");
    var breakdownEl = document.getElementById("sales-breakdown");
    var headingEl = document.getElementById("sales-heading");

    if (!stage || typeof fy2526Sales === "undefined") return;

    headingEl.textContent = "Sales";
    introLine.textContent = copy.salesIntro;

    var sorted = fy2526Sales.categories.slice().sort(function (a, b) {
      return b.value - a.value;
    });
    var maxValue = sorted[0].value;

    sorted.forEach(function (cat, i) {
      var color = CHART_PALETTE[i % CHART_PALETTE.length];
      var row = buildBreakdownRow(cat.name, cat.value, maxValue, true, i, color);
      breakdownEl.appendChild(row);
    });

    var donutEl = document.getElementById("sales-donut");
    var donutTotalEl = document.getElementById("sales-donut-total");
    buildDonutChart(donutEl, donutTotalEl, sorted, formatCroreDisplay(fy2526Sales.totalExact));

    var hasRun = false;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !hasRun) {
            hasRun = true;
            animateNumber(fy2526Sales.totalExact, 2200, function (v) {
              counterEl.textContent = formatCroreDisplay(v);
            });
            if (donutEl) donutEl.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(stage);

    initBreakdownReveal(breakdownEl, true);
  }

  function buildBreakdownRow(name, value, maxValue, isCurrency, index, color) {
    var row = document.createElement("div");
    row.className = "breakdown-row";
    row.style.transitionDelay = prefersReducedMotion ? "0ms" : (index * 70) + "ms";

    var label = document.createElement("p");
    label.className = "breakdown-label";
    if (color) {
      var swatch = document.createElement("span");
      swatch.className = "breakdown-swatch";
      swatch.style.background = color;
      label.appendChild(swatch);
    }
    var labelText = document.createElement("span");
    labelText.textContent = name;
    label.appendChild(labelText);

    var track = document.createElement("div");
    track.className = "breakdown-bar-track";
    var fill = document.createElement("div");
    fill.className = "breakdown-bar-fill";
    fill.style.setProperty("--target-width", (value / maxValue) * 100 + "%");
    track.appendChild(fill);

    var valueEl = document.createElement("p");
    valueEl.className = "breakdown-value";
    valueEl.textContent = isCurrency ? formatRupeeShort(value) : formatInt(value);

    row.appendChild(label);
    row.appendChild(track);
    row.appendChild(valueEl);
    return row;
  }

  function initBreakdownReveal(container) {
    var rows = container.querySelectorAll(".breakdown-row");
    if (!("IntersectionObserver" in window)) {
      rows.forEach(function (r) {
        r.classList.add("is-visible");
        var fill = r.querySelector(".breakdown-bar-fill");
        fill.style.width = fill.style.getPropertyValue("--target-width");
      });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            var fill = entry.target.querySelector(".breakdown-bar-fill");
            requestAnimationFrame(function () {
              fill.style.width = fill.style.getPropertyValue("--target-width");
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    rows.forEach(function (r) { observer.observe(r); });
  }

  /* ===================================================================
   * SECTION 04 — FY 2026–27 CURRENT MOMENTUM
   * =================================================================== */

  function initCurrentSection() {
    if (typeof fy2627Current === "undefined") return;

    document.getElementById("current-subheading").textContent = copy.currentSubheading;
    document.getElementById("current-intro-line").textContent = copy.currentIntro;
    document.getElementById("current-asof").textContent = fy2627Current.asOfLabel;

    var salesFigureEl = document.getElementById("current-sales-figure");
    var systemsFigureEl = document.getElementById("current-systems-figure");
    var stage = document.querySelector(".milestones");

    var hasRun = false;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !hasRun) {
            hasRun = true;
            // Sales: count up to the exact underlying figure, display in Cr.
            animateNumber(fy2627Current.totalSalesExact, 1600, function (v) {
              salesFigureEl.textContent = "₹" + (v / 10000000).toFixed(2) + " Cr";
            }, function () {
              salesFigureEl.textContent = fy2627Current.totalSalesDisplay;
            });
            // Systems: "3K" is a rounded label — animate the numeral, then settle on label.
            animateNumber(3000, 1600, function (v) {
              systemsFigureEl.textContent = formatInt(v);
            }, function () {
              systemsFigureEl.textContent = fy2627Current.systemsDisplay;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    if (stage) observer.observe(stage);

    renderBifurcation("sales-bifurcation-body", fy2627Current.salesBifurcation, formatRupeeShort);
    renderBifurcation("systems-bifurcation-body", fy2627Current.systemsBifurcation, formatInt);
  }

  function renderBifurcation(containerId, dataArr, formatter) {
    var el = document.getElementById(containerId);
    if (!el) return;
    if (!dataArr || dataArr.length === 0) {
      // Leave the CSS empty-state ("To be added") in place.
      return;
    }
    el.classList.add("has-data");
    el.innerHTML = "";
    var list = document.createElement("div");
    list.style.width = "100%";
    dataArr.forEach(function (item) {
      var row = document.createElement("div");
      row.style.display = "flex";
      row.style.justifyContent = "space-between";
      row.style.padding = "6px 0";
      row.style.fontSize = "13px";
      row.style.fontFamily = "var(--font-body)";
      row.style.color = "var(--ink-70)";
      var name = document.createElement("span");
      name.textContent = item.name;
      var val = document.createElement("span");
      val.textContent = formatter(item.value);
      row.appendChild(name);
      row.appendChild(val);
      list.appendChild(row);
    });
    el.appendChild(list);
  }

  /* ===================================================================
   * SECTION 05 — STORIES (horizontal scroll within vertical page)
   * =================================================================== */

  var StoryController = (function () {
    var viewport, track, dotsEl, currentEl, totalEl, section, prevBtn, nextBtn;
    var current = 0;
    var total = 0;
    var isActive = false; // true when the section owns wheel/keyboard input

    function build() {
      viewport = document.getElementById("story-viewport");
      track = document.getElementById("story-track");
      dotsEl = document.getElementById("story-dots");
      currentEl = document.getElementById("story-current");
      totalEl = document.getElementById("story-total");
      section = document.getElementById("section-stories");
      prevBtn = document.getElementById("story-arrow-prev");
      nextBtn = document.getElementById("story-arrow-next");

      if (!track || typeof stories === "undefined") return;

      document.getElementById("stories-heading").textContent = copy.storiesHeading;
      document.getElementById("stories-intro-line").textContent = copy.storiesIntro;

      total = stories.length;
      totalEl.textContent = String(total).padStart(2, "0");

      stories.forEach(function (story, i) {
        track.appendChild(buildStoryPanel(story, i));
        var dot = document.createElement("span");
        dot.className = "story-dot" + (i === 0 ? " is-active" : "");
        dot.addEventListener("click", function () { goTo(i); });
        dotsEl.appendChild(dot);
      });

      updateUI();

      if (prevBtn) prevBtn.addEventListener("click", function () { prev(); });
      if (nextBtn) nextBtn.addEventListener("click", function () { next(); });

      viewport.addEventListener("wheel", onWheel, { passive: false });
      viewport.addEventListener("keydown", onKeydown);
      window.addEventListener("keydown", onWindowKeydown);

      // Lazy-load images as their panel nears view
      var imgObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var img = entry.target.querySelector("img[data-src]");
              if (img) {
                var src = img.getAttribute("data-src");
                if (src) {
                  img.src = src;
                  img.addEventListener("load", function () { img.classList.add("is-loaded"); });
                  img.addEventListener("error", function () {
                    img.remove(); // graceful fallback to the placeholder gradient
                  });
                }
                img.removeAttribute("data-src");
              }
            }
          });
        },
        { root: viewport, threshold: 0.15 }
      );
      track.querySelectorAll(".story-panel").forEach(function (p) { imgObserver.observe(p); });
    }

    function buildStoryPanel(story, i) {
      var panel = document.createElement("article");
      panel.className = "story-panel";

      var media = document.createElement("div");
      media.className = "story-media";
      if (story.image) {
        var img = document.createElement("img");
        img.setAttribute("data-src", story.image);
        img.alt = story.title || ("Story " + (i + 1));
        img.loading = "lazy";
        media.appendChild(img);
      }
      var placeholder = document.createElement("div");
      placeholder.className = "story-media-placeholder";
      placeholder.textContent = story.image ? "" : "Photo to be added";
      media.appendChild(placeholder);

      var copyEl = document.createElement("div");
      copyEl.className = "story-copy";

      var indexEl = document.createElement("p");
      indexEl.className = "story-index";
      indexEl.textContent = String(i + 1).padStart(2, "0") + " / " + String(total || stories.length).padStart(2, "0");

      var title = document.createElement("h3");
      title.className = "story-title";
      title.textContent = story.title || "Story title goes here";

      var category = document.createElement("p");
      category.className = "story-category";
      category.textContent = story.category || "Category";

      var desc = document.createElement("p");
      desc.className = "story-description";
      desc.textContent = story.description || "";

      copyEl.appendChild(indexEl);
      copyEl.appendChild(title);
      copyEl.appendChild(category);
      copyEl.appendChild(desc);

      if (story.metric) {
        var metric = document.createElement("p");
        metric.className = "story-metric";
        metric.textContent = story.metric;
        copyEl.appendChild(metric);
      }

      if (story.location || story.year) {
        var meta = document.createElement("div");
        meta.className = "story-meta";
        if (story.location) {
          var loc = document.createElement("span");
          loc.textContent = story.location;
          meta.appendChild(loc);
        }
        if (story.year) {
          var yr = document.createElement("span");
          yr.textContent = story.year;
          meta.appendChild(yr);
        }
        copyEl.appendChild(meta);
      }

      panel.appendChild(media);
      panel.appendChild(copyEl);
      return panel;
    }

    function updateUI() {
      var offset = current * -100;
      track.style.transform = "translateX(" + offset + "%)";
      currentEl.textContent = String(current + 1).padStart(2, "0");
      var dots = dotsEl.querySelectorAll(".story-dot");
      dots.forEach(function (d, i) { d.classList.toggle("is-active", i === current); });
      if (prevBtn) prevBtn.disabled = current === 0;
      if (nextBtn) nextBtn.disabled = current === total - 1;
    }

    function goTo(index) {
      current = Math.max(0, Math.min(total - 1, index));
      updateUI();
    }

    function next() {
      if (current < total - 1) { goTo(current + 1); return true; }
      return false;
    }
    function prev() {
      if (current > 0) { goTo(current - 1); return true; }
      return false;
    }

    // Vertical wheel movement is translated into horizontal story movement
    // while the section is centered in the viewport; once the user has
    // exhausted the stories in a direction, the page continues to scroll
    // vertically as normal.
    function onWheel(e) {
      if (!isActive) return;
      var horizontalIntent = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (horizontalIntent > 0) {
        if (next()) e.preventDefault();
      } else if (horizontalIntent < 0) {
        if (prev()) e.preventDefault();
      }
    }

    function onKeydown(e) {
      if (!isActive) return;
      if (e.key === "ArrowRight") { if (next()) e.preventDefault(); }
      else if (e.key === "ArrowLeft") { if (prev()) e.preventDefault(); }
    }
    function onWindowKeydown(e) {
      if (document.activeElement === viewport) return; // handled by onKeydown
      if (!isActive) return;
      if (e.key === "ArrowRight") { if (next()) e.preventDefault(); }
      else if (e.key === "ArrowLeft") { if (prev()) e.preventDefault(); }
    }

    function setActive(val) { isActive = val; }

    return { build: build, setActive: setActive, next: next, prev: prev };
  })();

  function initStoriesActivation() {
    var section = document.getElementById("section-stories");
    if (!section || !("IntersectionObserver" in window)) return;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          StoryController.setActive(entry.isIntersecting && entry.intersectionRatio > 0.6);
        });
      },
      { threshold: [0, 0.6, 1] }
    );
    observer.observe(section);
  }

  /* ===================================================================
   * PROGRESS RAIL
   * =================================================================== */

  function initProgressRail() {
    var items = document.querySelectorAll(".progress-item");
    var currentLabel = document.getElementById("progress-current");
    if (!items.length) return;

    items.forEach(function (item) {
      item.addEventListener("click", function () {
        var target = document.getElementById(item.getAttribute("data-target"));
        if (target) target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      });
    });

    var sections = Array.prototype.map.call(items, function (item) {
      return document.getElementById(item.getAttribute("data-target"));
    });

    if (!("IntersectionObserver" in window)) return;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var idx = sections.indexOf(entry.target);
            if (idx === -1) return;
            items.forEach(function (item, i) {
              item.classList.toggle("is-active", i === idx);
            });
            currentLabel.textContent = String(idx + 1).padStart(2, "0");
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach(function (s) { if (s) observer.observe(s); });
  }

  /* ===================================================================
   * HERO MEDIA
   * =================================================================== */

  function initHeroMedia() {
    var media = document.getElementById("hero-media");
    if (!media || typeof imageSources === "undefined") return;
    if (imageSources.hero) {
      media.style.setProperty("--hero-image-url", "url('" + imageSources.hero + "')");
      media.classList.add("has-image");
    }
  }

  function initBrandLogo() {
    var img = document.getElementById("brand-logo-img");
    if (!img || typeof imageSources === "undefined" || !imageSources.logo) return;
    img.addEventListener("load", function () { img.classList.add("is-loaded"); });
    img.addEventListener("error", function () { img.classList.remove("is-loaded"); });
    img.src = imageSources.logo;
  }

  /* ===================================================================
   * INIT
   * =================================================================== */

  document.addEventListener("DOMContentLoaded", function () {
    initHeroMedia();
    initBrandLogo();
    initSystemsSection();
    initSalesSection();
    initCurrentSection();
    StoryController.build();
    initStoriesActivation();
    initRevealObserver();
    initProgressRail();
  });
})();
