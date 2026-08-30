# Field Toolkit

> These tools provide reliable starting points, not final verdicts. After calculating, always check the histogram, zoom in to review, and fine-tune based on subject speed, output size, and your personal handholding stability.

## ND Long-Exposure Calculator {#nd-calculator}

Meter without an ND filter first, then enter the base shutter speed and the filter's stops of reduction. The calculated result assumes aperture, ISO, and scene illumination remain unchanged.

<div class="photo-tool" data-photo-tool="nd">
  <label>Base shutter speed (seconds)
    <input type="text" inputmode="decimal" data-field="base-shutter" value="1/125" aria-describedby="nd-shutter-hint" autocomplete="off" spellcheck="false">
    <span class="tool-hint" id="nd-shutter-hint">Enter fractions (e.g., 1/125) or decimal seconds (e.g., 0.008).</span>
  </label>
  <label>ND stops of reduction
    <input type="range" data-field="nd-stops" value="10" min="0" max="16" step="1">
    <output data-output="nd-stops">10 stops</output>
  </label>
  <p class="tool-result" aria-live="polite">New shutter speed: <strong data-output="nd-result">approx. 8.2 seconds</strong></p>
</div>

The calculation is:

\[
t_{\mathrm{new}} = t_{\mathrm{base}}\times 2^{\mathrm{stops}}
\]

For example, if the exposure without a filter is 1/125 s, a 10-stop ND will extend the shutter speed to approximately 8 seconds, not 30 seconds. Reaching 30 seconds requires roughly 12 stops of reduction, or further adjustments to aperture and ISO.

## Hyperfocal Distance Estimator {#hyperfocal-calculator}

Select the format, focal length, and aperture, and the tool will calculate the hyperfocal distance along with the near limit of sharpness when focused there. "Sharpness" here follows traditional circle of confusion standards; for high-resolution sensors, large prints, or close viewing distances, leave a margin rather than treating the boundary as absolutely sharp.

<div class="photo-tool" data-photo-tool="hyperfocal">
  <label>Format
    <select data-field="format">
      <option value="0.03">Full Frame</option>
      <option value="0.02">APS-C (approx. 1.5×)</option>
      <option value="0.015">M4/3</option>
    </select>
  </label>
  <label>Actual focal length (mm)
    <input type="number" data-field="focal" value="35" min="4" max="1200" step="1">
  </label>
  <label>Aperture f/
    <input type="number" data-field="aperture" value="8" min="0.7" max="64" step="0.1">
  </label>
  <p class="tool-result" aria-live="polite"><strong data-output="hyperfocal-result">Hyperfocal distance approx. 5.14 m; near limit approx. 2.57 m</strong></p>
</div>

## Depth of Field Estimator {#dof-calculator}

Enter the format, focal length, aperture, and focus distance, and the tool will calculate the near limit, far limit, and total depth of field. It uses the same circle of confusion standard as the hyperfocal calculation, offering an estimate of "acceptable sharpness" rather than a guarantee of critical sharpness; in portraiture, fine distinctions like eyelashes versus irises must still be confirmed by zooming in during playback.

<div class="photo-tool" data-photo-tool="dof">
  <label>Format
    <select data-field="format">
      <option value="0.03">Full Frame</option>
      <option value="0.02">APS-C (approx. 1.5×)</option>
      <option value="0.015">M4/3</option>
    </select>
  </label>
  <label>Actual focal length (mm)
    <input type="number" data-field="focal" value="85" min="4" max="1200" step="1">
  </label>
  <label>Aperture f/
    <input type="number" data-field="aperture" value="1.8" min="0.7" max="64" step="0.1">
  </label>
  <label>Focus distance (m)
    <input type="number" data-field="distance" value="2" min="0.1" max="1000" step="0.1">
  </label>
  <p class="tool-result" aria-live="polite"><strong data-output="dof-result">…</strong></p>
</div>

The math from Chapter 5 can be directly verified here: at 85mm, f/1.8, and a focus distance of 2 meters, the front-to-back zone of sharpness combines to only about 6 centimeters; focus on the eyes, and having the tip of the nose and the ears fall outside the depth of field is a mathematically inevitable result.

## Starting Shutter Speeds for Motion

The values below account only for subject motion, not depth of field, noise, or image stabilization. When a subject moves across the frame, is close to the camera, or is intended for large-format output, you should typically shoot one stop faster than suggested; for subjects moving directly toward the camera or situated farther away, you may be able to shoot slightly slower.

<div class="photo-tool" data-photo-tool="motion">
  <label>Subject state
    <select data-field="motion">
      <option value="按手持稳定性决定|静物本身不限制快门；请按焦距、防抖、支撑和输出检查相机抖动">Still life / Architecture</option>
      <option value="1/125 秒起|适合较安静的人像；说话和手势可提高到 1/250 秒">Static portrait</option>
      <option value="1/250 秒起|横向行走或近距离拍摄可提高到 1/500 秒">Walking person</option>
      <option value="1/500 秒起|孩子、骑行和跳跃常需要 1/1000 秒">Running / Jumping</option>
      <option value="1/1000 秒起|飞鸟、球类和高速动作常需 1/2000 秒或更快">Sports / Birds in flight</option>
      <option value="1/30–1/60 秒起|相机随主体匀速转动，连续拍摄并检查成功率">Panning</option>
    </select>
  </label>
  <p class="tool-result" aria-live="polite"><strong data-output="motion-result">Determined by handholding stability</strong><br><span data-output="motion-note">Still subjects do not inherently limit shutter speed; check for camera shake based on focal length, image stabilization, support, and output size.</span></p>
</div>

## Star Shutter Speed Calculator {#star-shutter-calculator}

Enter lens and camera body parameters, and the tool will calculate the exposure time for both the 500 Rule and the simplified NPF Rule. The 500 Rule leans optimistic, while NPF is more conservative; when in doubt, take a shot using the shorter exposure first, zoom in to inspect the star points, and then lengthen the time step by step. Chapter 11 provides a complete explanation of the assumptions and boundaries of each rule.

<div class="photo-tool" data-photo-tool="star">
  <label>Sensor format
    <select data-field="format">
      <option value="1|36|1.5">Full Frame</option>
      <option value="1.5|23.5|1.5">APS-C (approx. 1.5×)</option>
      <option value="2|17.3|1.3333">M4/3</option>
    </select>
  </label>
  <label>Pixel count (millions)
    <input type="number" data-field="mp" value="24" min="6" max="200" step="1">
  </label>
  <label>Actual focal length (mm)
    <input type="number" data-field="focal" value="14" min="4" max="200" step="1">
  </label>
  <label>Aperture f/
    <input type="number" data-field="aperture" value="2.8" min="0.7" max="16" step="0.1">
  </label>
  <p class="tool-result" aria-live="polite"><strong data-output="star-result">…</strong><br><span data-output="star-note"></span></p>
</div>

## Four Steps Upon Arriving on Location

1. **First, define the frame**: Who or what is most important? Which highlights or shadows can be let go?
2. **Next, determine motion**: Secure the subject with shutter speed first, then decide whether you need image stabilization or a tripod.
3. **Then, decide on depth of field**: Is the background useful information or a distraction? Choose your aperture and shooting position accordingly.
4. **Finally, let ISO make up the display brightness**: ISO does not make the sensor collect more light; it is a gain choice after aperture and shutter speed are set.

![The Relationship Between Exposure, Light Gathering, and ISO](../images/exposure-capture-brightness.svg)

*Original diagram: Aperture and shutter speed determine how much light the sensor collects; ISO primarily changes signal gain and final image brightness. [Image Credits and Reuse Guidelines](image-credits.md#exposure-capture-brightness)*
