/* ===== Auth Pages (Login / Registro) ===== */
const AuthPage = (() => {
  let mode = 'login'; // 'login' | 'register'

  function render() {
    mode = 'login';
    return buildHTML();
  }

  function buildHTML() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page fade-in">
        <div style="text-align:center;margin-bottom:8px;">
          <a href="#/" style="font-size:1.6rem;font-weight:800;color:var(--c-secondary);display:flex;align-items:center;justify-content:center;gap:8px;"><img src="img/logo.svg" alt="" style="width:36px;height:36px;"> ColUniMatch</a>
        </div>
        <div class="auth-card" id="auth-card">
          <div class="tabs">
            <button class="tab ${mode === 'login' ? 'active' : ''}" data-mode="login">Iniciar sesión</button>
            <button class="tab ${mode === 'register' ? 'active' : ''}" data-mode="register">Registrarse</button>
          </div>
          ${mode === 'login' ? loginForm() : registerForm()}
        </div>
      </div>
    `;
    bindEvents();
  }

  function loginForm() {
    return `
      <h2>¡Hola de nuevo! 👋</h2>
      <p class="subtitle">Ingresa para ver tus recomendaciones guardadas.</p>
      <form id="auth-form">
        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input type="email" id="email" class="form-input" placeholder="tu@correo.com" required>
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" class="form-input" placeholder="Tu contraseña" required>
        </div>
        <div id="auth-error" class="error-msg" style="margin-bottom:12px;"></div>
        <button type="submit" class="btn btn-primary btn-block">Iniciar sesión</button>
      </form>
    `;
  }

  function registerForm() {
    return `
      <h2>¡Bienvenido/a! 🎉</h2>
      <p class="subtitle">Crea tu cuenta y encuentra tu universidad ideal.</p>
      <form id="auth-form">
        <div class="form-group">
          <label for="name">Nombre completo</label>
          <input type="text" id="name" class="form-input" placeholder="Tu nombre" required>
        </div>
        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input type="email" id="email" class="form-input" placeholder="tu@correo.com" required>
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" class="form-input" placeholder="Mínimo 4 caracteres" required minlength="4">
        </div>
        <div id="auth-error" class="error-msg" style="margin-bottom:12px;"></div>
        <button type="submit" class="btn btn-primary btn-block">Crear cuenta</button>
      </form>
    `;
  }

  function bindEvents() {
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        mode = tab.dataset.mode;
        buildHTML();
      });
    });

    document.getElementById('auth-form').addEventListener('submit', e => {
      e.preventDefault();
      const errEl = document.getElementById('auth-error');
      errEl.textContent = '';

      if (mode === 'login') {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const res = Storage.login(email, password);
        if (!res.ok) { errEl.textContent = res.msg; return; }
        App.onLogin();
      } else {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        if (password.length < 4) { errEl.textContent = 'La contraseña debe tener al menos 4 caracteres.'; return; }
        const res = Storage.register(name, email, password);
        if (!res.ok) { errEl.textContent = res.msg; return; }
        App.onLogin();
      }
    });
  }

  return { render };
})();

