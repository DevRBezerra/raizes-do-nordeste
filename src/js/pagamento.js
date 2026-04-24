document.addEventListener('DOMContentLoaded', () => {
  renderOrderSummary();
});

function renderOrderSummary() {
  let items = Cart.getAll();
  const subtotal = Cart.subtotal();
  let container = document.getElementById('order-summary-items');

  if (items.length === 0) {
    window.location.href = 'carrinho.html';
    return;
  }

  container.innerHTML = `
    <div style="border:1px solid var(--color-border);border-radius:8px;overflow:hidden">
      ${items.map(item => `
        <div style="display:flex;justify-content:space-between;padding:.75rem 1rem;border-bottom:1px solid var(--color-border);font-size:.9rem">
          <span style="display:flex;align-items:center;gap:8px">
            <div style="width:20px;height:20px;border-radius:4px;overflow:hidden;flex-shrink:0">${item.emoji}</div> 
            ${item.name} × ${item.qty}
          </span>
          <span style="font-weight:600">${formatCurrency(item.price * item.qty)}</span>
        </div>
      `).join('')}
    </div>
  `;

  document.getElementById('pay-subtotal').textContent = formatCurrency(subtotal);
  document.getElementById('pay-total').textContent = formatCurrency(subtotal);
}

function processPayment() {
  showStep('processing');

  let delay = 2000 + Math.random() * 1000;
  setTimeout(() => {
    
    let success = Math.random() > 0.1;
    if (success) {
      paymentSuccess();
    } else {
      paymentError('Cartão recusado pela operadora. Verifique os dados ou tente outro cartão.');
    }
  }, delay);
}

function paymentSuccess() {
  const subtotal = Cart.subtotal();
  let orderNum = '#' + (1040 + Math.floor(Math.random() * 100));
  let points = Math.floor(subtotal);

  document.getElementById('order-number').textContent = orderNum;
  document.getElementById('paid-total').textContent = formatCurrency(subtotal);
  document.getElementById('points-earned').textContent = `+${points} pontos`;

  const order = {
    id: orderNum,
    items: Cart.getAll(),
    subtotal,
    total: subtotal,
    points,
    status: 'received',
    unit: Cart.getUnit()?.name || 'Unidade',
    createdAt: new Date().toLocaleString('pt-BR'),
    payment: 'Cartão de Crédito',
  };
  localStorage.setItem('rn_current_order', JSON.stringify(order));

  let user = getLoggedUser();
  if (user) {
    user.points = (user.points || 0) + points;
    localStorage.setItem('rn_user', JSON.stringify(user));
  }

  Cart.clear();
  showStep('success');
}

function paymentError(msg) {
  document.getElementById('error-message').textContent = msg;
  showStep('error');
}

function retryPayment() {
  showStep('confirm');
}

function showStep(step) {
  ['confirm', 'processing', 'success', 'error'].forEach(s => {
    document.getElementById(`step-${s}`).classList.toggle('hidden', s != step);
  });
}
