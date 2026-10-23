/**
 * TabZoom - Popup Controller
 * Controls per-tab zoom levels independently.
 */

let activeTabId = null;

function updateUi(percent) {
  const rounded = Math.round(percent);
  document.getElementById('zoomPercent').textContent = rounded;
  document.getElementById('zoomSlider').value = rounded;

  document.querySelectorAll('.preset-btn').forEach(btn => {
    const val = parseInt(btn.dataset.zoom, 10);
    btn.classList.toggle('active', val === rounded);
  });
}

async function setZoom(percent) {
  if (!activeTabId) return;
  const factor = percent / 100.0;
  try {
    await chrome.tabs.setZoomSettings(activeTabId, { scope: 'per-tab', mode: 'automatic' });
    await chrome.tabs.setZoom(activeTabId, factor);
    updateUi(percent);
  } catch (err) {
    // Restricted tab
  }
}

async function initPopup() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.id) return;

  activeTabId = tab.id;
  document.getElementById('tabTarget').textContent = tab.title || 'Current Tab';

  try {
    await chrome.tabs.setZoomSettings(activeTabId, { scope: 'per-tab', mode: 'automatic' });
    const factor = await chrome.tabs.getZoom(activeTabId);
    updateUi(factor * 100);
  } catch (err) {
    updateUi(100);
  }

  // Stepper buttons
  document.getElementById('btnMinus').addEventListener('click', async () => {
    const current = parseInt(document.getElementById('zoomPercent').textContent, 10);
    const next = Math.max(25, current - 10);
    await setZoom(next);
  });

  document.getElementById('btnPlus').addEventListener('click', async () => {
    const current = parseInt(document.getElementById('zoomPercent').textContent, 10);
    const next = Math.min(300, current + 10);
    await setZoom(next);
  });

  // Slider
  document.getElementById('zoomSlider').addEventListener('input', async (e) => {
    const val = parseInt(e.target.value, 10);
    await setZoom(val);
  });

  // Presets
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const val = parseInt(btn.dataset.zoom, 10);
      await setZoom(val);
    });
  });

  // Reset
  document.getElementById('btnReset').addEventListener('click', async () => {
    await setZoom(100);
  });
}

document.addEventListener('DOMContentLoaded', initPopup);
