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
    document.querySelectorAll('[data-photo-tool="motion"]').forEach(initMotionTool);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
