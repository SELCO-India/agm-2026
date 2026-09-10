/**
 * AGM 2026 — APPLICATION LOGIC
 */
(function () {
  "use strict";
  var prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var CHART_PALETTE = [
    "#4F6B47", "#B37E2E", "#8CA67F", "#8A5A22",
    "#6C8A62", "#D9B47E", "#37492F", "#C79A5B", "#A9C49A"
  ];

  function formatInt(n) {
    return Math.round(n).toLocaleString("en-IN");
  }
  function formatCroreDisplay(exactRupees) {
    return "₹" + (exactRupees / 10000000).toFixed(2) + " Cr";
  }
  function formatRupeeShort(n) {
    if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
    if (n >= 100000) return "₹" + (n / 100000).toFixed(1) + " L";
    return "₹" + formatInt(n);
  }
  function formatSubtleCurrencies(inrExact) {
    var eur = (inrExact / 90).toFixed(0);
    var usd = (inrExact / 83).toFixed(0);
    var eurStr = eur >= 1000000 ? (eur/1000000).toFixed(2) + "M" : (eur >= 1000 ? (eur/1000).toFixed(1) + "k" : formatInt(eur));
    var usdStr = usd >= 1000000 ? (usd/1000000).toFixed(2) + "M" : (usd >= 1000 ? (usd/1000).toFixed(1) + "k" : formatInt(usd));
    return " (€" + eurStr + " / $" + usdStr + ")";
  }

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

  function initSystemsSection() {
    var stage = document.getElementById("systems-counter-stage");
    var counterEl = document.getElementById("systems-counter");
    var labelEl = document.getElementById("systems-counter-label");
    var introLine = document.getElementById("systems-intro-line");
    var breakdownEl = document.getElementById("systems-breakdown");
    if (!stage || typeof fy2526Systems === "undefined") return;
    labelEl.textContent = fy2526Systems.totalLabel;
    introLine.textContent = copy.systemsIntro;
    var maxValue = Math.max.apply(null, fy2526Systems.categories.map(function (c) { return c.value; }));
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
    initBreakdownReveal(breakdownEl);
  }

  function initSalesSection() {
    var stage = document.getElementById("sales-counter-stage");
    var counterEl = document.getElementById("sales-counter");
    var subtleLabelEl = document.getElementById("sales-subtle-label");
    var introLine = document.getElementById("sales-intro-line");
    var breakdownEl = document.getElementById("sales-breakdown");
    var headingEl = document.getElementById("sales-heading");
    if (!stage || typeof fy2526Sales === "undefined") return;
    headingEl.textContent = "Sales";
    introLine.textContent = copy.salesIntro;
    if (subtleLabelEl) subtleLabelEl.textContent = fy2526Sales.totalSubtleDisplay;
    var sorted = fy2526Sales.categories.slice().sort(function (a, b) { return b.value - a.value; });
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
    initBreakdownReveal(breakdownEl);
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
    
    var valueWrap = document.createElement("div");
    valueWrap.className = "breakdown-value-wrap";
    var valueEl = document.createElement("p");
    valueEl.className = "breakdown-value";
    valueEl.textContent = isCurrency ? formatRupeeShort(value) : formatInt(value);
    valueWrap.appendChild(valueEl);

    if (isCurrency) {
      var subtleEl = document.createElement("p");
      subtleEl.className = "breakdown-subtle";
      subtleEl.textContent = formatSubtleCurrencies(value);
      valueWrap.appendChild(subtleEl);
    }

    row.appendChild(label);
    row.appendChild(track);
    row.appendChild(valueWrap);
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

  function initCurrentSection() {
    if (typeof fy2627Current === "undefined") return;
    document.getElementById("current-subheading").textContent = copy.currentSubheading;
    document.getElementById("current-intro-line").textContent = copy.currentIntro;
    document.getElementById("current-asof").textContent = fy2627Current.asOfLabel;
    var salesFigureEl = document.getElementById("current-sales-figure");
    var salesSubtleEl = document.getElementById("current-sales-subtle");
    var systemsFigureEl = document.getElementById("current-systems-figure");
    var stage = document.querySelector(".milestones");
    if (salesSubtleEl) salesSubtleEl.textContent = fy2627Current.totalSalesSubtleDisplay;

    var hasRun = false;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !hasRun) {
            hasRun = true;
            animateNumber(fy2627Current.totalSalesExact, 1600, function (v) {
              salesFigureEl.textContent = "₹" + (v / 10000000).toFixed(2) + " Cr";
            }, function () {
              salesFigureEl.textContent = fy2627Current.totalSalesDisplay;
            });
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

    renderBifurcation("sales-bifurcation-body", fy2627Current.salesBifurcation, function(val) {
      return formatRupeeShort(val) + '<span class="subtle-curr">' + formatSubtleCurrencies(val) + '</span>';
    });
    renderBifurcation("systems-bifurcation-body", fy2627Current.systemsBifurcation, formatInt);
    renderBifurcation("capacity-bifurcation-body", fy2627Current.capacityBifurcation, function(n) {
      return n.toLocaleString("en-IN", { maximumFractionDigits: 1 }) + " kWp";
    });
  }

  function renderBifurcation(containerId, dataArr, formatter) {
    var el = document.getElementById(containerId);
    if (!el || !dataArr || dataArr.length === 0) return;
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
      val.innerHTML = formatter(item.value);
      row.appendChild(name);
      row.appendChild(val);
      list.appendChild(row);
    });
    el.appendChild(list);
  }

  function renderLineItems(containerId, items) {
    var el = document.getElementById(containerId);
    if (!el || !items || !items.length) return;
    el.classList.add("has-data");
    el.innerHTML = "";
    var list = document.createElement("div");
    list.style.width = "100%";
    items.forEach(function (item) {
      var row = document.createElement("div");
      row.style.display = "flex";
      row.style.justifyContent = "space-between";
      row.style.padding = "6px 0";
      row.style.fontSize = item.emphasis ? "14px" : "13px";
      row.style.fontWeight = item.emphasis ? "600" : "400";
      row.style.fontFamily = "var(--font-body)";
      row.style.color = item.emphasis ? "var(--ink)" : "var(--ink-70)";
      var label = document.createElement("span");
      label.textContent = item.label;
      var val = document.createElement("span");
      if (item.isText) {
        val.textContent = item.value;
      } else {
        val.innerHTML = formatRupeeShort(item.value) + '<span class="subtle-curr">' + formatSubtleCurrencies(item.value) + '</span>';
      }
      row.appendChild(label);
      row.appendChild(val);
      list.appendChild(row);
    });
    el.appendChild(list);
  }

  function initFinancialsSection() {
    if (typeof financialsSummary === "undefined") return;
    var periodEl = document.getElementById("financials-period");
    if (periodEl) periodEl.textContent = financialsSummary.period;
    renderLineItems("income-expenditure-body", financialsSummary.incomeExpenditure);
    var debtorsEl = document.getElementById("debtors-body");
    if (debtorsEl && financialsSummary.debtors) {
      debtorsEl.classList.add("has-data");
      debtorsEl.innerHTML =
        '<div><p style="font-family:var(--font-display); font-size:clamp(22px,2.6vw,30px); color:var(--ink);">' +
        formatRupeeShort(financialsSummary.debtors.value) +
        '<span style="font-size:14px; font-family:var(--font-body); color:var(--ink-45); margin-left:6px;">' +
        formatSubtleCurrencies(financialsSummary.debtors.value) + '</span></p>' +
        '<p style="font-size:12px; color:var(--ink-45); margin-top:4px;">As on ' +
        financialsSummary.debtors.asOf + "</p></div>";
    }
    var trendsWrap = document.getElementById("financial-trends-list");
    if (trendsWrap && financialsSummary.trends) {
      trendsWrap.innerHTML = "";
      financialsSummary.trends.forEach(function (t) {
        var isUp = t.changePct >= 0;
        var row = document.createElement("div");
        row.className = "trend-row";
        row.innerHTML =
          '<p class="trend-name">' + t.name + "</p>" +
          '<div class="trend-figures">' +
          '<p class="trend-current">' + formatRupeeShort(t.currentValue) +
          '<span class="subtle-curr">' + formatSubtleCurrencies(t.currentValue) + '</span></p>' +
          '<p class="trend-previous">' + t.previousLabel + ": " + formatRupeeShort(t.previousValue) + "</p>" +
          "</div>" +
          '<p class="trend-delta ' + (isUp ? "is-up" : "is-down") + '">' +
          (isUp ? "▲ " : "▼ ") + Math.abs(t.changePct).toFixed(2) + "%</p>";
        trendsWrap.appendChild(row);
      });
    }
  }

  var StoryController = (function () {
    var viewport, track, dotsEl, currentEl, totalEl, prevBtn, nextBtn;
    var current = 0;
    var total = 0;
    var isActive = false;

    function build() {
      viewport = document.getElementById("story-viewport");
      track = document.getElementById("story-track");
      dotsEl = document.getElementById("story-dots");
      currentEl = document.getElementById("story-current");
      totalEl = document.getElementById("story-total");
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
    }

    function buildStoryPanel(story, i) {
      var panel = document.createElement("article");
      panel.className = "story-panel";
      var media = document.createElement("div");
      media.className = "story-media";
      
      if (story.image) {
        var img = document.createElement("img");
        img.src = story.image;
        img.alt = story.title || ("Story " + (i + 1));
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
      title.textContent = story.title || "";
      var category = document.createElement("p");
      category.className = "story-category";
      category.textContent = story.category || "";
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
    function next() { if (current < total - 1) { goTo(current + 1); return true; } return false; }
    function prev() { if (current > 0) { goTo(current - 1); return true; } return false; }

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
      if (document.activeElement === viewport) return;
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

  var PlanController = (function () {
    var viewport, track, dotsEl, currentEl, totalEl, prevBtn, nextBtn;
    var current = 0;
    var total = 0;
    var isActive = false;

    function build() {
      viewport = document.getElementById("plan-viewport");
      track = document.getElementById("plan-track");
      dotsEl = document.getElementById("plan-dots");
      currentEl = document.getElementById("plan-current");
      totalEl = document.getElementById("plan-total");
      prevBtn = document.getElementById("plan-arrow-prev");
      nextBtn = document.getElementById("plan-arrow-next");

      if (!track || typeof futurePlans === "undefined") return;

      document.getElementById("future-kicker").textContent = futurePlans.kicker;
      document.getElementById("future-heading").textContent = futurePlans.heading;
      document.getElementById("future-intro-line").textContent = futurePlans.intro;
      document.getElementById("future-closing").textContent = "“" + futurePlans.closing + "”";

      total = futurePlans.months.length;
      totalEl.textContent = String(total).padStart(2, "0");

      futurePlans.months.forEach(function (month, i) {
        track.appendChild(buildPlanCard(month));
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

      renderSalesPlanTable();
    }

    function buildPlanCard(month) {
      var panel = document.createElement("article");
      panel.className = "story-panel plan-panel";

      var label = document.createElement("p");
      label.className = "plan-month-label";
      label.textContent = month.label;

      var theme = document.createElement("h3");
      theme.className = "plan-theme";
      theme.textContent = month.theme;

      var stats = document.createElement("div");
      stats.className = "plan-stats";
      stats.innerHTML =
        '<div><p class="plan-stat-label">Sales Revenue</p><p class="plan-stat-value">' + month.salesRevenue + "</p></div>" +
        '<div><p class="plan-stat-label">Collections</p><p class="plan-stat-value">' + month.collections + "</p></div>";

      var actions = document.createElement("div");
      actions.className = "plan-actions";
      month.actions.forEach(function (a) {
        var p = document.createElement("p");
        p.className = "plan-action";
        p.textContent = a;
        actions.appendChild(p);
      });

      panel.appendChild(label);
      panel.appendChild(theme);
      panel.appendChild(stats);
      panel.appendChild(actions);
      return panel;
    }

    function renderSalesPlanTable() {
      var el = document.getElementById("future-sales-table");
      if (!el || typeof fy2627SalesPlan === "undefined") return;
      var rowsHtml = fy2627SalesPlan.rows.map(function (r) {
        return "<tr><td>" + r.month + "</td><td>" + r.salesPlan + "</td><td>" + r.collectionPlan + "</td></tr>";
      }).join("");

      var t = fy2627SalesPlan.totals;
      el.innerHTML =
        "<thead><tr><th>Month</th><th>Sales Plan</th><th>Collection Plan</th></tr></thead>" +
        "<tbody>" + rowsHtml + "</tbody>" +
        "<tfoot><tr><td>Total</td><td>" + t.salesPlan + "</td><td>" + t.collectionPlan + "</td></tr></tfoot>";
      document.getElementById("future-narrative").textContent = fy2627SalesPlan.narrative;
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
    function next() { if (current < total - 1) { goTo(current + 1); return true; } return false; }
    function prev() { if (current > 0) { goTo(current - 1); return true; } return false; }

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
    function setActive(val) { isActive = val; }
    return { build: build, setActive: setActive };
  })();

  function initPlanActivation() {
    var section = document.getElementById("section-future");
    if (!section || !("IntersectionObserver" in window)) return;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          PlanController.setActive(entry.isIntersecting && entry.intersectionRatio > 0.6);
        });
      },
      { threshold: [0, 0.6, 1] }
    );
    observer.observe(section);
  }

  function initHero() {
    var mediaEl = document.getElementById("hero-media");
    var logoImg = document.getElementById("brand-logo-img");
    if (typeof imageSources !== "undefined") {
      if (imageSources.hero && mediaEl) {
        mediaEl.style.setProperty("--hero-image-url", 'url("' + imageSources.hero + '")');
        mediaEl.classList.add("has-image");
      }
      if (imageSources.logo && logoImg) {
        logoImg.src = imageSources.logo;
        logoImg.addEventListener("load", function () { logoImg.classList.add("is-loaded"); });
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHero();
    initRevealObserver();
    initSystemsSection();
    initSalesSection();
    initCurrentSection();
    initFinancialsSection();
    PlanController.build();
    initPlanActivation();
    StoryController.build();
    initStoriesActivation();
  });
})();
