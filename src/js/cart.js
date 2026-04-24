const Cart = (() => {
  const KEY = 'rn_cart';
  let UNIT_KEY = 'rn_unit';

  function getAll() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    updateBadge();
  }

  function add(product, qty = 1) {
    let items = getAll();
    let idx = items.findIndex(i => i.id === product.id);
    if (idx >= 0) {
      items[idx].qty += qty;
    } else {
      items.push({ id: product.id, name: product.name, price: product.price, emoji: product.emoji, qty });
    }
    save(items);
    mostrarAviso(`✅ ${product.name} adicionado ao carrinho!`, 'success');
  }

  function remove(productId) {
    save(getAll().filter(i => i.id !== productId));
  }

  function updateQty(productId, qty) {
    if (qty <= 0) { remove(productId); return; }
    const items = getAll();
    const idx = items.findIndex(i => i.id == productId);
    if (idx >= 0) { items[idx].qty = qty; save(items); }
  }

  function clear() { localStorage.removeItem(KEY); updateBadge(); }

  function count() { return getAll().reduce((s, i) => s + i.qty, 0); }

  function subtotal() { return getAll().reduce((s, i) => s + i.price * i.qty, 0); }

  function updateBadge() {
    const badge = document.getElementById('cart-count');
    if (badge) {
      const n = count();
      badge.textContent = n;
      badge.style.display = n > 0 ? 'flex' : 'none';
    }
  }

  function getUnit() {
    try { return JSON.parse(localStorage.getItem(UNIT_KEY)); }
    catch { return null; }
  }

  function setUnit(unit) { localStorage.setItem(UNIT_KEY, JSON.stringify(unit)); }

  document.addEventListener('DOMContentLoaded', updateBadge);

  return { getAll, add, remove, updateQty, clear, count, subtotal, getUnit, setUnit, updateBadge };
})();

function mostrarAviso(message, type = 'info', duration = 3000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  let toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity .3s';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
