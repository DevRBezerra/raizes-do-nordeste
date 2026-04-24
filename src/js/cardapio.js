let currentUnit = null;
let currentCategory = 'all';
let searchTerm = '';

document.addEventListener('DOMContentLoaded', () => {
  populateUnitSelect();
  renderCategories();
  renderPromos();

  let saved = Cart.getUnit();
  if (saved) {
    currentUnit = saved;
    document.getElementById('unit-select').value = saved.id;
    updateUnitSubtitle();
    renderProducts();
  }
});

function populateUnitSelect() {
  let sel = document.getElementById('unit-select');
  RN_DATA.units.forEach(u => {
    let opt = document.createElement('option');
    opt.value = u.id;
    opt.textContent = `${u.emoji} ${u.name} — ${u.open ? 'Aberta' : 'Fechada'}`;
    if (!u.open) opt.disabled = true;
    sel.appendChild(opt);
  });
}

function changeUnit(unitId) {
  if (!unitId) { currentUnit = null; renderProducts(); return; }
  let unit = RN_DATA.units.find(u => u.id == parseInt(unitId));
  if (!unit || !unit.open) { mostrarAviso('⚠️ Esta unidade está fechada.', 'error'); return; }
  currentUnit = unit;
  Cart.setUnit(unit);
  updateUnitSubtitle();
  renderProducts();
  mostrarAviso(`📍 Unidade ${unit.name} selecionada!`, 'success');
}

function updateUnitSubtitle() {
  const el = document.getElementById('unit-subtitle');
  if (el && currentUnit) {
    el.textContent = `${currentUnit.name} · ${currentUnit.city} · ${currentUnit.hours}`;
  }
}

function renderCategories() {
  const list = document.getElementById('category-list');
  const allBtn = `<button class="category-btn active" onclick="filterCategory('all')" data-cat="all" role="listitem">🍽️ Todos</button>`;
  const cats = RN_DATA.categories.map(c => `
    <button class="category-btn" onclick="filterCategory('${c.id}')" data-cat="${c.id}" role="listitem">
      ${c.icon} ${c.name.replace(/^[^\s]+\s/, '')}
      ${c.seasonal ? '<span class="badge badge-warning" style="margin-left:.3rem">Sazonal</span>' : ''}
    </button>
  `).join('');
  list.innerHTML = allBtn + cats;
}

function filterCategory(catId) {
  currentCategory = catId;
  document.querySelectorAll('.category-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === catId);
  });
  renderProducts();
}

function filterProducts(term) {
  searchTerm = term.toLowerCase();
  renderProducts();
}

function renderProducts() {
  const container = document.getElementById('products-container');
  if (!currentUnit) {
    container.innerHTML = `<div class="text-center" style="padding:3rem;color:var(--color-text-light)"><p style="font-size:2rem">📍</p><p>Selecione uma unidade para ver o cardápio</p></div>`;
    return;
  }

  let products = getProductsByUnit(currentUnit.id);

  if (currentCategory !== 'all') {
    products = products.filter(p => p.category == currentCategory);
  }

  if (searchTerm) {
    products = products.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.desc.toLowerCase().includes(searchTerm)
    );
  }

  if (products.length === 0) {
    container.innerHTML = `<div class="text-center" style="padding:3rem;color:var(--color-text-light)"><p style="font-size:2rem">🔍</p><p>Nenhum produto encontrado.</p></div>`;
    return;
  }

  const grouped = {};
  products.forEach(p => {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  });

  let html = '';
  Object.entries(grouped).forEach(([catId, prods]) => {
    const cat = RN_DATA.categories.find(c => c.id === catId);
    if (!cat) return;
    html += `
      <section class="category-section" aria-labelledby="cat-${catId}">
        <h2 id="cat-${catId}">${cat.name}</h2>
        <div class="product-grid" role="list">
          ${prods.map(p => renderProductCard(p)).join('')}
        </div>
      </section>
    `;
  });

  container.innerHTML = html;
}

function renderProductCard(p) {
  let cartItems = Cart.getAll();
  let inCart = cartItems.find(i => i.id == p.id);
  const qty = inCart ? inCart.qty : 0;

  return `
    <article class="product-card ${!p.available ? 'product-unavailable' : ''}" role="listitem" aria-label="${p.name}">
      <div class="product-img" aria-hidden="true">${p.emoji}</div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        ${p.seasonal ? '<span class="badge badge-warning">Sazonal</span>' : ''}
        ${!p.available ? '<span class="badge badge-error">Indisponível</span>' : ''}
        <div class="product-footer">
          <span class="product-price">${formatCurrency(p.price)}</span>
          ${p.available ? `
            <div class="qty-control" aria-label="Quantidade de ${p.name}">
              <button class="qty-btn" onclick="changeQty(${p.id}, -1)" aria-label="Remover um ${p.name}">−</button>
              <span class="qty-value" id="qty-${p.id}" aria-live="polite">${qty}</span>
              <button class="qty-btn" onclick="changeQty(${p.id}, 1)" aria-label="Adicionar um ${p.name}">+</button>
            </div>
          ` : '<span style="font-size:.85rem;color:var(--color-text-light)">Indisponível</span>'}
        </div>
      </div>
    </article>
  `;
}

function changeQty(productId, delta) {
  let product = RN_DATA.products.find(p => p.id === productId);
  if (!product) return;

  const cartItems = Cart.getAll();
  let inCart = cartItems.find(i => i.id == productId);
  let currentQty = inCart ? inCart.qty : 0;
  let newQty = currentQty + delta;

  if (newQty <= 0) {
    Cart.remove(productId);
  } else if (currentQty == 0 && delta > 0) {
    Cart.add(product, 1);
  } else {
    Cart.updateQty(productId, newQty);
  }

  let qtyEl = document.getElementById(`qty-${productId}`);
  if (qtyEl) qtyEl.textContent = Math.max(0, newQty);
}

function renderPromos() {
  const container = document.getElementById('promo-banner');
  if (!container) return;
  container.innerHTML = `
    <div style="display:flex;gap:.75rem;overflow-x:auto;padding-bottom:.5rem" role="list" aria-label="Promoções">
      ${RN_DATA.promotions.map(p => `
        <div style="background:linear-gradient(135deg,#C0392B,#E67E22);color:#fff;border-radius:12px;padding:1rem 1.25rem;min-width:220px;flex-shrink:0" role="listitem">
          <div style="font-size:1.5rem">${p.emoji}</div>
          <div style="font-weight:700;margin:.25rem 0">${p.title}</div>
          <div style="font-size:.85rem;opacity:.9">${p.desc}</div>
        </div>
      `).join('')}
    </div>
  `;
}
