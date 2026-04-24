/* =============================================
   CARRINHO PAGE
   ============================================= */

let usePoints = false;
const POINTS_VALUE = 0.01; // 1 ponto = R$ 0,01

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  renderUnitInfo();
  loadUserPoints();
});

function renderCart() {
  const container = document.getElementById('cart-items-container');
  const items = Cart.getAll();

  if (items.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <h2>Seu carrinho está vazio</h2>
        <p>Adicione produtos do cardápio para continuar.</p>
        <a href="cardapio.html" class="btn-primary" style="margin-top:1.5rem">Ver Cardápio</a>
      </div>
    `;
    document.getElementById('btn-checkout').disabled = true;
    updateSummary();
    return;
  }

  container.innerHTML = `
    <div class="cart-items" role="list" aria-label="Itens no carrinho">
      ${items.map(item => `
        <div class="cart-item" role="listitem" aria-label="${item.name}">
          <div class="cart-item-img" aria-hidden="true">${item.emoji}</div>
          <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p>${formatCurrency(item.price)} cada</p>
          </div>
          <div class="cart-item-actions">
            <div class="qty-control" aria-label="Quantidade de ${item.name}">
              <button class="qty-btn" onclick="updateItem(${item.id}, -1)" aria-label="Diminuir quantidade">−</button>
              <span class="qty-value" aria-live="polite">${item.qty}</span>
              <button class="qty-btn" onclick="updateItem(${item.id}, 1)" aria-label="Aumentar quantidade">+</button>
            </div>
            <span class="cart-item-price">${formatCurrency(item.price * item.qty)}</span>
            <button class="btn-remove" onclick="removeItem(${item.id})" aria-label="Remover ${item.name} do carrinho">🗑️</button>
          </div>
        </div>
      `).join('')}
    </div>
    <button class="btn-danger btn-sm" style="margin-top:1rem" onclick="clearCart()">🗑️ Limpar carrinho</button>
  `;

  document.getElementById('btn-checkout').disabled = false;
  updateSummary();
}

function updateItem(id, delta) {
  const items = Cart.getAll();
  const item = items.find(i => i.id === id);
  if (!item) return;
  Cart.updateQty(id, item.qty + delta);
  renderCart();
}

function removeItem(id) {
  Cart.remove(id);
  renderCart();
  showToast('Item removido do carrinho.', 'info');
}

function clearCart() {
  if (!confirm('Deseja limpar o carrinho?')) return;
  Cart.clear();
  renderCart();
}

function updateSummary() {
  const subtotal = Cart.subtotal();
  const user = getLoggedUser();
  const userPoints = user ? RN_DATA.mockUser.points : 0;
  const maxDiscount = userPoints * POINTS_VALUE;
  const discount = usePoints ? Math.min(maxDiscount, subtotal * 0.1) : 0; // máx 10% de desconto
  const total = subtotal - discount;

  document.getElementById('subtotal').textContent = formatCurrency(subtotal);
  document.getElementById('total').textContent = formatCurrency(total);

  const discountRow = document.getElementById('discount-row');
  if (discount > 0) {
    discountRow.style.display = 'flex';
    document.getElementById('discount-val').textContent = `-${formatCurrency(discount)}`;
  } else {
    discountRow.style.display = 'none';
  }
}

function loadUserPoints() {
  const user = getLoggedUser();
  const section = document.getElementById('fidelity-section');
  if (user && section) {
    section.style.display = 'flex';
    document.getElementById('user-points').textContent = `${RN_DATA.mockUser.points} pontos`;
  }
}

function togglePoints() {
  usePoints = document.getElementById('use-points').checked;
  updateSummary();
}

function renderUnitInfo() {
  const unit = Cart.getUnit();
  const el = document.getElementById('unit-info');
  if (el) {
    el.innerHTML = unit
      ? `📍 <strong>${unit.name}</strong> — ${unit.city}`
      : `📍 <span style="color:var(--color-text-light)">Nenhuma unidade selecionada</span> <a href="cardapio.html" style="color:var(--color-primary)">Selecionar</a>`;
  }
}

function selectPayment(radio) {
  document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('selected'));
  radio.closest('.payment-method').classList.add('selected');
  const pixInfo = document.getElementById('pix-info');
  if (pixInfo) pixInfo.classList.toggle('hidden', radio.value !== 'pix');
}

function checkout() {
  const items = Cart.getAll();
  if (items.length === 0) { showToast('⚠️ Carrinho vazio!', 'error'); return; }
  const unit = Cart.getUnit();
  if (!unit) { showToast('⚠️ Selecione uma unidade antes de finalizar.', 'error'); return; }

  window.location.href = 'pagamento.html';
}
