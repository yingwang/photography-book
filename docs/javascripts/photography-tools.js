(function () {
  "use strict";

  function formatShutter(seconds) {
    if (!Number.isFinite(seconds) || seconds <= 0) return "请输入有效数值";
    if (seconds < 0.5) {
      const denominator = Math.round(1 / seconds);
      return `约 1/${denominator} 秒`;
    }
    if (seconds < 60) return `约 ${seconds < 10 ? seconds.toFixed(1) : Math.round(seconds)} 秒`;
    const minutes = Math.floor(seconds / 60);
    const remainder = Math.round(seconds % 60);
    return remainder ? `约 ${minutes} 分 ${remainder} 秒` : `约 ${minutes} 分钟`;
  }

  function initNdTool(root) {
    const base = root.querySelector('[data-field="base-shutter"]');
    const stops = root.querySelector('[data-field="nd-stops"]');
    const stopsOutput = root.querySelector('[data-output="nd-stops"]');
    const result = root.querySelector('[data-output="nd-result"]');
    const update = function () {
      const stopCount = Number(stops.value);
      stopsOutput.textContent = `${stopCount} 档`;
      result.textContent = formatShutter(Number(base.value) * Math.pow(2, stopCount));
    };
    base.addEventListener("input", update);
    stops.addEventListener("input", update);
    update();
  }

  function initHyperfocalTool(root) {
    const format = root.querySelector('[data-field="format"]');
    const focal = root.querySelector('[data-field="focal"]');
    const aperture = root.querySelector('[data-field="aperture"]');
    const result = root.querySelector('[data-output="hyperfocal-result"]');
    const update = function () {
      const c = Number(format.value);
      const f = Number(focal.value);
      const n = Number(aperture.value);
      if (![c, f, n].every(Number.isFinite) || f <= 0 || n <= 0) {
        result.textContent = "请输入有效数值";
        return;
      }
      const hMm = (f * f) / (n * c) + f;
      const hM = hMm / 1000;
      result.textContent = `超焦距约 ${hM.toFixed(2)} m；近端约 ${(hM / 2).toFixed(2)} m`;
    };
    format.addEventListener("change", update);
    focal.addEventListener("input", update);
    aperture.addEventListener("input", update);
    update();
  }

  function formatDistance(mm) {
    if (!Number.isFinite(mm)) return "无穷远";
    if (mm < 1000) {
      const cm = mm / 10;
      return `${cm < 10 ? cm.toFixed(1) : Math.round(cm)} 厘米`;
    }
    const m = mm / 1000;
    if (m < 10) return `${m.toFixed(2)} m`;
    if (m < 100) return `${m.toFixed(1)} m`;
    return `${Math.round(m)} m`;
  }

  function initDofTool(root) {
    const format = root.querySelector('[data-field="format"]');
    const focal = root.querySelector('[data-field="focal"]');
    const aperture = root.querySelector('[data-field="aperture"]');
    const distance = root.querySelector('[data-field="distance"]');
    const result = root.querySelector('[data-output="dof-result"]');
    const update = function () {
      const c = Number(format.value);
      const f = Number(focal.value);
      const n = Number(aperture.value);
      const s = Number(distance.value) * 1000;
      if (![c, f, n, s].every(Number.isFinite) || f <= 0 || n <= 0 || s <= 0) {
        result.textContent = "请输入有效数值";
        return;
      }
      if (s <= f * 1.5) {
        result.textContent = "对焦距离太近，超出这套估算的适用范围";
        return;
      }
      const h = (f * f) / (n * c) + f;
      const near = (s * (h - f)) / (h + s - 2 * f);
      if (s >= h) {
        result.textContent = `近端约 ${formatDistance(near)}，远端到无穷远（对焦距离已达超焦距）`;
        return;
      }
      const far = (s * (h - f)) / (h - s);
      result.textContent = `近端约 ${formatDistance(near)}，远端约 ${formatDistance(far)}；景深总厚度约 ${formatDistance(far - near)}`;
    };
    format.addEventListener("change", update);
    [focal, aperture, distance].forEach(function (el) {
      el.addEventListener("input", update);
    });
    update();
  }

  function formatStarSeconds(seconds) {
    if (!Number.isFinite(seconds) || seconds <= 0) return "—";
    return seconds >= 10 ? `${Math.round(seconds)} 秒` : `${seconds.toFixed(1)} 秒`;
  }

  function initStarTool(root) {
    const format = root.querySelector('[data-field="format"]');
    const mp = root.querySelector('[data-field="mp"]');
    const focal = root.querySelector('[data-field="focal"]');
    const aperture = root.querySelector('[data-field="aperture"]');
    const result = root.querySelector('[data-output="star-result"]');
    const note = root.querySelector('[data-output="star-note"]');
    const update = function () {
      const parts = format.value.split("|").map(Number);
      const crop = parts[0];
      const widthMm = parts[1];
      const aspect = parts[2];
      const mpValue = Number(mp.value);
      const f = Number(focal.value);
      const n = Number(aperture.value);
      if (![crop, widthMm, aspect, mpValue, f, n].every(Number.isFinite) || mpValue <= 0 || f <= 0 || n <= 0) {
        result.textContent = "请输入有效数值";
        note.textContent = "";
        return;
      }
      const widthPx = Math.sqrt(mpValue * 1e6 * aspect);
      const pitch = (widthMm * 1000) / widthPx;
      const rule500 = 500 / (crop * f);
      const npf = (35 * n + 30 * pitch) / f;
      result.textContent = `500 法则约 ${formatStarSeconds(rule500)}；NPF 法则约 ${formatStarSeconds(npf)}`;
      note.textContent = `像素间距约 ${pitch.toFixed(1)} µm。NPF 短于 500 法则是正常的；先按短的拍一张，放大检查星点，再逐步延长。`;
    };
    format.addEventListener("change", update);
    [mp, focal, aperture].forEach(function (el) {
      el.addEventListener("input", update);
    });
    update();
  }

  function initMotionTool(root) {
    const motion = root.querySelector('[data-field="motion"]');
    const result = root.querySelector('[data-output="motion-result"]');
    const note = root.querySelector('[data-output="motion-note"]');
    const update = function () {
      const parts = motion.value.split("|");
      result.textContent = parts[0];
      note.textContent = parts[1] || "";
    };
    motion.addEventListener("change", update);
    update();
  }

  function init() {
    document.querySelectorAll('[data-photo-tool="nd"]').forEach(initNdTool);
    document.querySelectorAll('[data-photo-tool="hyperfocal"]').forEach(initHyperfocalTool);
    document.querySelectorAll('[data-photo-tool="dof"]').forEach(initDofTool);
    document.querySelectorAll('[data-photo-tool="motion"]').forEach(initMotionTool);
    document.querySelectorAll('[data-photo-tool="star"]').forEach(initStarTool);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
