document.addEventListener('DOMContentLoaded', () => {
  // carrega tudo
  renderUnits();
  renderHighlights();
});

function renderUnits() {
  let grid = document.getElementById('unit-grid');
  if (!grid) return;

  let selectedUnit = Cart.getUnit();

  grid.innerHTML = RN_DATA.units.map(unit => `
    <div class="unit-card ${selectedUnit?.id == unit.id ? 'selected' : ''}"
         onclick="selectUnit(${unit.id})"
         onkeydown="if(event.key==='Enter') selectUnit(${unit.id})">
      <div style="width:40px;height:40px;border-radius:50%;overflow:hidden;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--color-bg)">${unit.emoji}</div>
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
    <div class="highlight-card card" 
         onclick="window.location.href='src/pages/cardapio.html'"
         onkeydown="if(event.key==='Enter') window.location.href='src/pages/cardapio.html'">
      <div class="highlight-img">${p.emoji}</div>
      <div class="highlight-body">
        <h3>${p.name}</h3>
        <p class="highlight-price">${formatCurrency(p.price)}</p>
      </div>
    </div>
  `).join('');
}
