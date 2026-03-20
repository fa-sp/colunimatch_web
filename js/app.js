/* ===== Main App – Router & Bootstrapper ===== */
const App = (() => {
  const nav = document.getElementById('main-nav');
  const hamburger = document.getElementById('hamburger-btn');
  const navLinks = document.getElementById('nav-links');
  const logoutLink = document.getElementById('nav-logout');

  /* ---- Routing ---- */
  const routes = {
    '/': renderWelcome,
    '/login': () => AuthPage.render(),
    '/cuestionario': guard(() => QuestionnairePage.render()),
    '/resultados': guard(() => ResultsPage.render()),
    '/perfil': guard(() => ProfilePage.render()),
  };

  function guard(fn) {
    return () => {
      if (!Storage.getCurrentUser()) {
        window.location.hash = '#/login';
        return;
      }
      fn();
    };
  }

  function route() {
    const hash = window.location.hash.replace('#', '') || '/';
    const handler = routes[hash] || routes['/'];
    updateNav();
    handler();
  }

  function updateNav() {
    const user = Storage.getCurrentUser();
    const hash = window.location.hash || '#/';
    if (user && hash !== '#/' && hash !== '#/login') {
      nav.classList.remove('hidden');
      document.body.classList.add('has-nav');
    } else {
      nav.classList.add('hidden');
      document.body.classList.remove('has-nav');
    }
    navLinks.classList.remove('open');
  }

  /* ---- Welcome Page ---- */
  function renderWelcome() {
    const user = Storage.getCurrentUser();
    document.getElementById('app').innerHTML = `
      <div class="welcome fade-in">
        <div class="welcome-icon"><img src="img/logo.svg" alt="ColUniMatch"></div>
        <h1 style="color: #F2A900">Encuentra tu futuro<br><span style="color: #003893">universitario</span>
         <br><span style="color: #E74C3C">con ColUniMatch</span></h1>
        <p>
          En Colombia hay mas de <b>1400 programas y más de 360 universidades</b> - cuál es la mejor opción para ti?<br>
          Responde unas preguntas sencillas y te ayudaré a encontrar las mejores opciones para ti. 🇨🇴
        </p>
        <div class="welcome-features">
          <div class="welcome-feat">📝 Cuestionario personalizado</div>
          <div class="welcome-feat">🎯 Resultados a tu medida</div>
          <div class="welcome-feat">🏫 +360 universidades</div>
          <div class="welcome-feat">💡 100% gratuito</div>
        </div>
        ${user
          ? `<a href="#/cuestionario" class="btn btn-primary btn-block" style="max-width:320px;">Continuar como ${user.name.split(' ')[0]} →</a>
             <a href="#/perfil" class="btn btn-outline btn-sm">Ver mi perfil</a>`
          : `<a href="#/login" class="btn btn-primary btn-block" style="max-width:320px;">¡Empezar ahora! 🚀</a>`
        }
      </div>
    `;
  }

  /* ---- Auth callbacks ---- */
  function onLogin() {
    toast('¡Bienvenido/a! 🎉');
    window.location.hash = '#/cuestionario';
  }

  function onLogout() {
    toast('Sesión cerrada');
    window.location.hash = '#/';
  }

  /* ---- Toast ---- */
  function toast(msg) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2800);
  }

  /* ---- Init ---- */
  function init() {
    // Hamburger menu
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

    // Logout from nav
    logoutLink.addEventListener('click', e => {
      e.preventDefault();
      Storage.logout();
      onLogout();
    });

    // Router
    window.addEventListener('hashchange', route);
    route();
  }

  document.addEventListener('DOMContentLoaded', init);

  return { onLogin, onLogout, toast };
})();

