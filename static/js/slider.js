function updateSliderAndTooltip(slider, sliderTooltip) {
  if (!slider || !sliderTooltip) return;

  const sliderWidth = slider.offsetWidth;
  const tooltipWidth = sliderTooltip.offsetWidth;
  const min = parseInt(slider.min);
  const max = parseInt(slider.max);
  const val = parseInt(slider.value);

  sliderTooltip.textContent = val;

  const percent = (val - min) / (max - min);
  let offset = sliderWidth * percent;

  const maxOffset = sliderWidth - tooltipWidth / 2;
  const minOffset = tooltipWidth / 2;

  offset = Math.max(minOffset, Math.min(offset, maxOffset));

  sliderTooltip.style.left = `${offset}px`;
}

const yearSlider = document.getElementById('year');
const yearTooltip = document.getElementById('year-tooltip');
if (yearSlider && yearTooltip) {
  yearSlider.addEventListener('input', () => updateSliderAndTooltip(yearSlider, yearTooltip));
  window.addEventListener('load', () => updateSliderAndTooltip(yearSlider, yearTooltip));
}

const qtySlider = document.getElementById('quantity');
const qtyTooltip = document.getElementById('quantity-tooltip');
if (qtySlider && qtyTooltip) {
  qtySlider.addEventListener('input', () => updateSliderAndTooltip(qtySlider, qtyTooltip));
  window.addEventListener('load', () => updateSliderAndTooltip(qtySlider, qtyTooltip));
}

let yearTouched = false;
let qtyTouched = false;

if (yearSlider && yearTooltip) {
  yearSlider.addEventListener('input', () => {
    updateSliderAndTooltip(yearSlider, yearTooltip);
    yearTouched = true;
  });
}

if (qtySlider && qtyTooltip) {
  qtySlider.addEventListener('input', () => {
    updateSliderAndTooltip(qtySlider, qtyTooltip);
    qtyTouched = true;
  });
}
