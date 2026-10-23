/**
 * TabZoom - Service Worker
 * Enforces per-tab zoom scoping and manages toolbar badge display.
 */

const BADGE_COLOR = '#0ea5e9';

function updateBadge(tabId, zoomFactor) {
  const percent = Math.round(zoomFactor * 100);
  if (percent !== 100) {
    chrome.action.setBadgeText({ tabId, text: `${percent}%` });
    chrome.action.setBadgeBackgroundColor({ tabId, color: BADGE_COLOR });
  } else {
    chrome.action.setBadgeText({ tabId, text: '' });
  }
}

async function configureTabZoomScope(tabId) {
  try {
    await chrome.tabs.setZoomSettings(tabId, {
      scope: 'per-tab',
      mode: 'automatic'
    });
    const zoom = await chrome.tabs.getZoom(tabId);
    updateBadge(tabId, zoom);
  } catch (err) {
    // Tab closed or restricted internal page (chrome://); ignore safely
  }
}

// Hook tab creation & navigation
chrome.tabs.onCreated.addListener((tab) => {
  if (tab && tab.id) {
    configureTabZoomScope(tab.id);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'loading') {
    configureTabZoomScope(tabId);
  }
});

// Update badge when zoom changes via keyboard shortcuts (Ctrl +/-)
chrome.tabs.onZoomChange.addListener((zoomChangeInfo) => {
  const { tabId, newZoomFactor } = zoomChangeInfo;
  updateBadge(tabId, newZoomFactor);
});

// Sync badge on tab activation
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const zoom = await chrome.tabs.getZoom(activeInfo.tabId);
    updateBadge(activeInfo.tabId, zoom);
  } catch (err) {}
});
