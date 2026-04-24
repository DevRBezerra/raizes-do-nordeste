document.addEventListener('DOMContentLoaded', () => {
  renderUnits();
  renderHighlights();
});

function renderUnits() {
  let grid = document.getElementById('unit-grid');
  if (!grid) return;

  let selectedUnit = Cart.getUnit();

  grid.innerHTML = RN_DATA.units.map(unit => `
    <div class="unit-card ${selectedUnit?.id == unit.id ? 'selected' : ''}"
         role="listitem"
         tabindex="0"
         onclick="selectUnit(${unit.id})"
         onkeydown="if(event.key==='Enter') selectUnit(${unit.id})"
         aria-label="Selecionar unidade ${unit.name}">
      <span class="unit-icon" aria-hidden="true">${unit.emoji}</span>
      <div class="unit-info">
        <h3>${unit.name}</h3>
        <p>${unit.city} · ${unit.hours}</p>
        <p style="font-size:.8rem;color:var(--color-text-light)">${unit.type == 'completa' ? 'Cardápio completo' : 'Cardápio reduzido'}</p>
      </div>
      <div class="unit-status">
        <span class="badge ${unit.open ? 'badge-success' : 'badge-error'}">
          ${unit.open ? 'Aberta' : 'Fechada'}
        </span>
      </div>
    </div>
  `).join('');
}

function selectUnit(unitId) {
  let unit = RN_DATA.units.find(u => u.id == unitId);
  if (!unit) return;
  if (!unit.open) {
    mostrarAviso('⚠️ Esta unidade está fechada no momento.', 'error');
    return;
  }
  Cart.setUnit(unit);
  renderUnits();
  mostrarAviso(`📍 Unidade ${unit.name} selecionada!`, 'success');
  setTimeout(() => {
    window.location.href = 'src/pages/cardapio.html';
  }, 800);
}

function renderHighlights() {
  const grid = document.getElementById('highlights-grid');
  if (!grid) return;

  let featured = RN_DATA.products
    .filter(p => p.available && !p.seasonal)
    .slice(0, 4);

  grid.innerHTML = featured.map(p => `
    <div class="highlight-card card" role="listitem" tabindex="0"
         onclick="window.location.href='src/pages/cardapio.html'"
         onkeydown="if(event.key==='Enter') window.location.href='src/pages/cardapio.html'"
         aria-label="${p.name}, ${formatCurrency(p.price)}">
      <div class="highlight-img" aria-hidden="true">${p.emoji}</div>
      <div class="highlight-body">
        <h3>${p.name}</h3>
        <p class="highlight-price">${formatCurrency(p.price)}</p>
      </div>
    </div>
  `).join('');
}
