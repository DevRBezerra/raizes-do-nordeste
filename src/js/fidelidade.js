document.addEventListener('DOMContentLoaded', () => {
  const user = getLoggedUser() || RN_DATA.mockUser;
  renderPointsCard(user);
  renderTiers(user.points);
  renderRewards(user.points);
  renderHistory();
});

function renderPointsCard(user) {
  const tier = getUserTier(user.points);
  let nextTier = RN_DATA.tiers.find(t => t.min > user.points);
  let progress = nextTier
    ? Math.round(((user.points - tier.min) / (nextTier.min - tier.min)) * 100)
    : 100;

  document.getElementById('points-card-container').innerHTML = `
    <div class="points-card" style="margin-bottom:2rem" role="region" aria-label="Seus pontos">
      <div class="points-value" aria-label="${user.points} pontos">${user.points}</div>
      <div class="points-label">pontos acumulados</div>
      <div class="points-tier" style="display:flex;align-items:center;justify-content:center;gap:8px">
        <div style="width:24px;height:24px;border-radius:4px;overflow:hidden">${tier.emoji}</div>
        Nível <strong>${tier.name}</strong>
      </div>
      ${nextTier ? `
        <div style="margin-top:1.25rem">
          <div style="display:flex;justify-content:space-between;font-size:.85rem;opacity:.85;margin-bottom:.4rem">
            <span>${user.points} pts</span>
            <span>${nextTier.min} pts para ${RN_DATA.tiers[RN_DATA.tiers.indexOf(nextTier)].name}</span>
          </div>
          <div style="background:rgba(255,255,255,.3);border-radius:999px;height:8px;overflow:hidden" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso para próximo nível">
            <div style="background:#fff;height:100%;width:${progress}%;border-radius:999px;transition:width .5s"></div>
          </div>
        </div>
      ` : '<div style="margin-top:1rem;font-size:.9rem;opacity:.9">🏆 Você atingiu o nível máximo!</div>'}
    </div>
  `;
}

function renderTiers(userPoints) {
  const grid = document.getElementById('tiers-grid');
  grid.innerHTML = RN_DATA.tiers.map(tier => {
    let isActive = userPoints >= tier.min && (tier.max === Infinity || userPoints <= tier.max);
    return `
      <div style="background:var(--color-surface);border-radius:12px;padding:1.25rem;box-shadow:var(--shadow-sm);border:2px solid ${isActive ? tier.color : 'var(--color-border)'}">
        <div style="width:60px;height:60px;border-radius:12px;overflow:hidden;margin:0 auto 0.5rem;display:flex;align-items:center;justify-content:center">${tier.emoji}</div>
        <h3 style="color:${tier.color}">${tier.name}</h3>
        <p style="font-size:.85rem;color:var(--color-text-light)">
          ${tier.max == Infinity ? `${tier.min}+ pontos` : `${tier.min}–${tier.max} pontos`}
        </p>
        ${isActive ? '<span class="badge badge-success" style="margin-top:.5rem">Seu nível atual</span>' : ''}
      </div>
    `;
  }).join('');
}

function renderRewards(userPoints) {
  let grid = document.getElementById('rewards-grid');
  grid.innerHTML = RN_DATA.rewards.map(r => {
    const canRedeem = userPoints >= r.cost;
    return `
      <div class="reward-card" role="listitem" aria-label="${r.name}, ${r.cost} pontos">
        <div class="reward-icon" aria-hidden="true" style="width:50px;height:50px;border-radius:8px;overflow:hidden;display:flex;align-items:center;justify-content:center">${r.emoji}</div>
        <div class="reward-info">
          <h3>${r.name}</h3>
          <p>${r.desc}</p>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:.4rem;flex-shrink:0">
          <span class="reward-cost">${r.cost} pts</span>
          <button class="btn-sm ${canRedeem ? 'btn-primary' : 'btn-outline'}"
                  onclick="redeemReward(${r.id}, ${r.cost})"
                  ${canRedeem ? '' : 'disabled'}
                  aria-label="${canRedeem ? 'Resgatar' : 'Pontos insuficientes'} — ${r.name}">
            ${canRedeem ? 'Resgatar' : 'Insuficiente'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function redeemReward(rewardId, cost) {
  let reward = RN_DATA.rewards.find(r => r.id == rewardId);
  if (!reward) return;

  const user = getLoggedUser() || RN_DATA.mockUser;
  if (user.points < cost) {
    mostrarAviso('⚠️ Pontos insuficientes para este resgate.', 'error');
    return;
  }

  if (!confirm(`Resgatar "${reward.name}" por ${cost} pontos?`)) return;

  user.points -= cost;
  localStorage.setItem('rn_user', JSON.stringify(user));
  mostrarAviso(`🎁 "${reward.name}" resgatado com sucesso!`, 'success');
  renderPointsCard(user);
  renderTiers(user.points);
  renderRewards(user.points);
}

function renderHistory() {
  let tbody = document.getElementById('history-body');
  tbody.innerHTML = RN_DATA.pointsHistory.map(h => `
    <tr>
      <td>${h.date}</td>
      <td>${h.desc}</td>
      <td class="${h.points > 0 ? 'points-plus' : 'points-minus'}">
        ${h.points > 0 ? '+' : ''}${h.points}
      </td>
    </tr>
  `).join('');
}
