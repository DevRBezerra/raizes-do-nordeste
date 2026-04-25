function showTab(tab) {
  const isLogin = tab == 'login';
  document.getElementById('form-login').classList.toggle('hidden', !isLogin);
  document.getElementById('form-register').classList.toggle('hidden', isLogin);
  document.getElementById('tab-login').className = isLogin ? 'btn-primary' : 'btn-outline';
  document.getElementById('tab-register').className = isLogin ? 'btn-outline' : 'btn-primary';
  document.getElementById('tab-login').setAttribute('aria-selected', String(isLogin));
  document.getElementById('tab-register').setAttribute('aria-selected', String(!isLogin));
}

function fazerLogin(e) {
  e.preventDefault();
  limparErros();

  let email = document.getElementById('login-email').value.trim();
  let password = document.getElementById('login-password').value;
  let valid = true;

  if (!email || !checarEmail(email)) {
    mostrarErroCampo('login-email', 'login-email-error', 'Informe um e-mail válido.');
    valid = false;
  }
  if (!password || password.length < 6) {
    mostrarErroCampo('login-password', 'login-pass-error', 'Senha deve ter pelo menos 6 caracteres.');
    valid = false;
  }
  if (!valid) return;

  // Login com o usuário padrão (Maria)
  if (email === 'maria@email.com' && password === '123456') {
    sucessoLogin(RN_DATA.mockUser);
  } else if (password.length >= 6) {
    // Permite login com qualquer outro e-mail para testes
    sucessoLogin({ name: email.split('@')[0], email, points: 0, tier: 'Semente' });
  } else {
    exibirAlerta('login-error', '❌ E-mail ou senha incorretos. Tente novamente.');
  }
}

function sucessoLogin(user) {
  localStorage.setItem('rn_user', JSON.stringify(user));
  mostrarAviso(`✅ Bem-vindo(a), ${user.name.split(' ')[0]}!`, 'success');
  setTimeout(() => {
    const redirect = new URLSearchParams(window.location.search).get('redirect') || '../../index.html';
    window.location.href = redirect;
  }, 800);
}

function criarConta(e) {
  e.preventDefault();
  limparErros();

  let name  = document.getElementById('reg-name').value.trim();
  let email = document.getElementById('reg-email').value.trim();
  let pass  = document.getElementById('reg-password').value;
  let terms = document.getElementById('consent-terms').checked;
  let valid = true;

  if (!name || name.length < 3) {
    mostrarErroCampo('reg-name', 'reg-name-error', 'Informe seu nome completo.');
    valid = false;
  }
  if (!email || !checarEmail(email)) {
    mostrarErroCampo('reg-email', 'reg-email-error', 'Informe um e-mail válido.');
    valid = false;
  }
  if (!pass || pass.length < 8) {
    mostrarErroCampo('reg-password', 'reg-pass-error', 'Senha deve ter pelo menos 8 caracteres.');
    valid = false;
  }
  if (!terms) {
    exibirAlerta('register-error', '⚠️ Você precisa aceitar os Termos de Uso para continuar.');
    valid = false;
  }
  if (!valid) return;

  const newUser = {
    name,
    email,
    points: 100, 
    tier: 'Semente',
    memberSince: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
  };
  localStorage.setItem('rn_user', JSON.stringify(newUser));
  mostrarAviso('🎉 Conta criada! Você ganhou 100 pontos de boas-vindas!', 'success');
  setTimeout(() => { window.location.href = '../../index.html'; }, 1200);
}

function logout() {
  if (!confirm('Deseja sair da sua conta?')) return;
  Auth.logout();
}

function togglePassword(inputId, btn) {
  let input = document.getElementById(inputId);
  if (input.type == 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
    btn.setAttribute('aria-label', 'Ocultar senha');
  } else {
    input.type = 'password';
    btn.textContent = '👁️';
    btn.setAttribute('aria-label', 'Mostrar senha');
  }
}

function checkStrength(value) {
  let fill = document.getElementById('strength-fill');
  const hint = document.getElementById('reg-pass-strength');
  if (!fill || !hint) return;

  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;

  let levels = [
    { pct: '0%',   color: 'transparent', label: '' },
    { pct: '25%',  color: '#E74C3C',     label: 'Fraca' },
    { pct: '50%',  color: '#E67E22',     label: 'Razoável' },
    { pct: '75%',  color: '#F39C12',     label: 'Boa' },
    { pct: '100%', color: '#27AE60',     label: 'Forte' },
  ];
  const lvl = levels[score] || levels[0];
  fill.style.width = lvl.pct;
  fill.style.background = lvl.color;
  hint.textContent = lvl.label ? `Força da senha: ${lvl.label}` : '';
}

function checarEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

function mostrarErroCampo(inputId, errorId, msg) {
  let input = document.getElementById(inputId);
  let error = document.getElementById(errorId);
  if (input) input.classList.add('error');
  if (error) { error.textContent = msg; error.classList.remove('hidden'); }
}

function exibirAlerta(alertId, msg) {
  let el = document.getElementById(alertId);
  if (el) { el.textContent = msg; el.classList.remove('hidden'); }
}

function limparErros() {
  document.querySelectorAll('.form-error').forEach(e => { e.textContent = ''; e.classList.add('hidden'); });
  document.querySelectorAll('.form-input.error').forEach(e => e.classList.remove('error'));
  document.querySelectorAll('.alert-error').forEach(e => e.classList.add('hidden'));
}
