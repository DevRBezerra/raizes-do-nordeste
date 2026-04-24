/* =============================================
   PEDIDO — Status em tempo real (mock)
   ============================================= */

let statusInterval = null;
let currentStatusIdx = 0;

document.addEventListener('DOMContentLoaded', () => {
  renderStatus();
});

function getOrder() {
  try {
    const saved = JSON.parse(localStorage.getItem('rn_current_order'));
    return saved || RN_DATA.mockOrder;
  } catch { return RN_DATA.mockOrder; }
}

function renderStatus() {
  const container = document.getElementById('status-container');
  const order = getOrder();
  const statusKeys = RN_DATA.orderStatuses.map(s => s.key);
  currentStatusIdx = statusKeys.indexOf(order.status);
  if (currentStatusIdx < 0) currentStatusIdx = 0;

  container.innerHTML = `
    <div class="status-card">
      <div class="status-header">
        <p class="order-number">Pedido ${order.id || order.mockOrder?.id || '#1043'}</p>
        <h2 id="current-status-label">${RN_DATA.orderStatuses[currentStatusIdx].icon} ${RN_DATA.orderStatuses[currentStatusIdx].label}</h2>
        <p style="color:var(--color-text-light);font-size:.9rem">
          📍 ${order.unit || 'Recife Centro'} · ${order.createdAt || '23/04/2026 08:14'}
        </p>
      </div>

      <div class="status-timeline" role="list" aria-label="Etapas do pedido">
        ${RN_DATA.orderStatuses.map((s, i) => `
          <div class="timeline-step ${i < currentStatusIdx ? 'done' : i === currentStatusIdx ? 'active' : ''}"
               role="listitem" aria-label="${s.label}${i < currentStatusIdx ? ' - concluído' : i === currentStatusIdx ? ' - em andamento' : ' - pendente'}">
            <div class="timeline-dot" aria-hidden="true">${i < currentStatusIdx ? '✓' : ''}</div>
            <h3>${s.icon} ${s.label}</h3>
            <p>${s.desc}</p>
          </div>
        `).join('')}
      </div>

      <div class="status-items">
        <h3>Itens do pedido</h3>
        ${(order.items || []).map(item => `
          <div class="status-item">
            <span>${item.qty}× ${item.name}</span>
            <span>${formatCurrency(item.price * item.qty)}</span>
          </div>
        `).join('')}
        <div class="status-item" style="font-weight:700;border-bottom:none;padding-top:.75rem">
          <span>Total</span>
          <span>${formatCurrency(order.total || order.subtotal || 0)}</span>
        </div>
      </div>

      <div style="margin-top:1.5rem;display:flex;gap:.75rem;flex-wrap:wrap">
        ${currentStatusIdx < RN_DATA.orderStatuses.length - 1 ? `
          <button class="btn-primary" onclick="advanceStatus()" id="btn-advance">
            Simular próxima etapa →
          </button>
        ` : `
          <div class="alert alert-success" style="width:100%">🎉 Pedido entregue! Bom apetite!</div>
        `}
        <a href="cardapio.html" class="btn-outline">Fazer novo pedido</a>
      </div>

      ${order.points ? `
        <div class="alert alert-info" style="margin-top:1rem">
          ⭐ Você ganhou <strong>+${order.points} pontos</strong> neste pedido!
        </div>
      ` : ''}
    </div>
  `;
}

function advanceStatus() {
  const statusKeys = RN_DATA.orderStatuses.map(s => s.key);
  if (currentStatusIdx >= statusKeys.length - 1) return;

  currentStatusIdx++;
  const order = getOrder();
  order.status = statusKeys[currentStatusIdx];
  localStorage.setItem('rn_current_order', JSON.stringify(order));

  renderStatus();
  showToast(`${RN_DATA.orderStatuses[currentStatusIdx].icon} ${RN_DATA.orderStatuses[currentStatusIdx].label}`, 'success');
}
