/* =============================================
   LGPD — Consentimento e preferências
   ============================================= */

const LGPD = (() => {
  const KEY = 'rn_lgpd_consent';

  function hasConsent() {
    return !!localStorage.getItem(KEY);
  }

  function getPrefs() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch { return {}; }
  }

  function savePrefs(prefs) {
    localStorage.setItem(KEY, JSON.stringify({ ...prefs, timestamp: new Date().toISOString() }));
  }

  function init() {
    if (!hasConsent()) {
      const banner = document.getElementById('lgpd-banner');
      if (banner) banner.classList.remove('hidden');
    }
  }

  return { hasConsent, getPrefs, savePrefs, init };
})();

function acceptLGPD() {
  LGPD.savePrefs({ essential: true, personalization: true, fidelity: true, analytics: true });
  const banner = document.getElementById('lgpd-banner');
  if (banner) banner.classList.add('hidden');
  showToast('✅ Preferências salvas. Obrigado!', 'success');
}

function savePrivacyPrefs() {
  const prefs = {
    essential: true,
    personalization: document.getElementById('pref-personalization')?.checked ?? true,
    fidelity: document.getElementById('pref-fidelity')?.checked ?? true,
    analytics: document.getElementById('pref-analytics')?.checked ?? false,
  };
  LGPD.savePrefs(prefs);
  const banner = document.getElementById('lgpd-banner');
  if (banner) banner.classList.add('hidden');
  closePrivacyModal();
  showToast('✅ Preferências de privacidade salvas!', 'success');
}

function openPrivacyModal() {
  const modal = document.getElementById('privacy-modal');
  if (modal) modal.classList.remove('hidden');
}

function closePrivacyModal() {
  const modal = document.getElementById('privacy-modal');
  if (modal) modal.classList.add('hidden');
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  LGPD.init();

  const toggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = !mobileNav.classList.contains('hidden');
      mobileNav.classList.toggle('hidden');
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.textContent = isOpen ? '☰' : '✕';
    });
  }

  // Update login button if user is logged in
  const user = getLoggedUser();
  const btnLogin = document.getElementById('btn-login');
  if (user && btnLogin) {
    btnLogin.textContent = user.name.split(' ')[0];
    btnLogin.href = 'src/pages/perfil.html';
  }
});

function getLoggedUser() {
  try { return JSON.parse(localStorage.getItem('rn_user')); }
  catch { return null; }
}
