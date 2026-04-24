/* =============================================
   PERFIL PAGE
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  const user = getLoggedUser() || RN_DATA.mockUser;
  loadProfile(user);
  renderOrders();
});

function loadProfile(user) {
  document.getElementById('profile-name').textContent = user.name;
  document.getElementById('profile-email').textContent = user.email;
  document.getElementById('p-name').value = user.name;
  document.getElementById('p-email').value = user.email;
  document.getElementById('p-phone').value = user.phone || '';
}

function showSection(section) {
  ['data', 'orders', 'privacy'].forEach(s => {
    document.getElementById(`section-${s}`).classList.toggle('hidden', s !== section);
  });
  document.querySelectorAll('.profile-nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('onclick')?.includes(`'${section}'`));
  });
}

function saveProfile(e) {
  e.preventDefault();
  const user = getLoggedUser() || RN_DATA.mockUser;
  user.name  = document.getElementById('p-name').value.trim();
  user.email = document.getElementById('p-email').value.trim();
  user.phone = document.getElementById('p-phone').value.trim();
  localStorage.setItem('rn_user', JSON.stringify(user));
  loadProfile(user);
  showToast('✅ Dados atualizados com sucesso!', 'success');
}

function renderOrders() {
  const container = document.getElementById('orders-list');
  const order = JSON.parse(localStorage.getItem('rn_current_order') || 'null');
  if (!order) {
    container.innerHTML = `<div class="text-center" style="padding:2rem;color:var(--color-text-light)"><p style="font-size:2rem">📦</p><p>Nenhum pedido encontrado.</p><a href="cardapio.html" class="btn-primary" style="margin-top:1rem">Fazer primeiro pedido</a></div>`;
    return;
  }
  container.innerHTML = `
    <div style="border:1px solid var(--color-border);border-radius:8px;padding:1rem">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;margin-bottom:.75rem">
        <strong>${order.id}</strong>
        <span class="badge badge-warning">${RN_DATA.orderStatuses.find(s => s.key === order.status)?.label || 'Em andamento'}</span>
      </div>
      <p style="font-size:.85rem;color:var(--color-text-light)">${order.createdAt} · ${order.unit}</p>
      <p style="font-weight:700;margin-top:.5rem">${formatCurrency(order.total || order.subtotal || 0)}</p>
      <a href="pedido.html" class="btn-outline btn-sm" style="margin-top:.75rem">Acompanhar</a>
    </div>
  `;
}

function logout() {
  if (!confirm('Deseja sair da sua conta?')) return;
  localStorage.removeItem('rn_user');
  showToast('👋 Até logo!', 'info');
  setTimeout(() => { window.location.href = '../../index.html'; }, 800);
}

function requestDelete() {
  if (!confirm('⚠️ Tem certeza? Esta ação é irreversível e excluirá todos os seus dados permanentemente.')) return;
  showToast('📧 Solicitação de exclusão enviada. Você receberá um e-mail de confirmação em até 15 dias.', 'info', 6000);
}
