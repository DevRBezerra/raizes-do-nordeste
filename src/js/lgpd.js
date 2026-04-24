let LGPD = (() => {
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
      let banner = document.getElementById('privacy-bar');
      if (banner) banner.classList.remove('hidden');
    }
  }

  return { hasConsent, getPrefs, savePrefs, init };
})();

function acceptLGPD() {
  LGPD.savePrefs({ essential: true, personalization: true, fidelity: true, analytics: true });
  let banner = document.getElementById('privacy-bar');
  if (banner) banner.classList.add('hidden');
  mostrarAviso('✅ Preferências salvas. Obrigado!', 'success');
}

function savePrivacyPrefs() {
  const prefs = {
    essential: true,
    personalization: document.getElementById('pref-personalization')?.checked ?? true,
    fidelity: document.getElementById('pref-fidelity')?.checked ?? true,
    analytics: document.getElementById('pref-analytics')?.checked ?? false,
  };
  LGPD.savePrefs(prefs);
  let banner = document.getElementById('privacy-bar');
  if (banner) banner.classList.add('hidden');
  closePrivacyModal();
  mostrarAviso('✅ Preferências de privacidade salvas!', 'success');
}

function openPrivacyModal() {
  let modal = document.getElementById('privacy-modal');
  if (modal) modal.classList.remove('hidden');
}

function closePrivacyModal() {
  const modal = document.getElementById('privacy-modal');
  if (modal) modal.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  LGPD.init();

  const toggle = document.getElementById('menu-toggle');
  let mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = !mobileNav.classList.contains('hidden');
      mobileNav.classList.toggle('hidden');
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.textContent = isOpen ? '☰' : '✕';
    });
  }

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
