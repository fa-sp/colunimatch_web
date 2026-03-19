/* ===== Profile Page ===== */
const ProfilePage = (() => {
  function render() {
    const user = Storage.getCurrentUser();
    if (!user) { window.location.hash = '#/login'; return; }

    const ans = user.answers;
    const results = user.results;

    const weightBadge = w => {
      if (w === 'muy importante') return '<span class="pref-weight w-high">muy importante</span>';
      if (w === 'importante') return '<span class="pref-weight w-med">importante</span>';
      return '<span class="pref-weight w-low">menos importante</span>';
    };

    let prefsHTML = '<p style="color:var(--c-text-light);font-size:.92rem;">Aún no has completado el cuestionario.</p>';
    if (ans) {
      prefsHTML = `
        <div class="pref-item">
          <span class="pref-label">Áreas de interés</span>
          <span class="pref-value">${ans.areas.map(a => AREA_LABELS[a] || a).join(', ')} ${weightBadge(ans.areasWeight)}</span>
        </div>
        <div class="pref-item">
          <span class="pref-label">Ubicaciones</span>
          <span class="pref-value">${ans.locations.length > 0 ? ans.locations.join(', ') : 'Sin preferencia'} ${weightBadge(ans.locationWeight)}</span>
        </div>
        <div class="pref-item">
          <span class="pref-label">Presupuesto</span>
          <span class="pref-value">${formatCOP(ans.budget)}/sem ${weightBadge(ans.budgetWeight)}</span>
        </div>
        <div class="pref-item">
          <span class="pref-label">Tipo de universidad</span>
          <span class="pref-value">${ans.type} ${weightBadge(ans.typeWeight)}</span>
        </div>
        <div class="pref-item">
          <span class="pref-label">Investigación</span>
          <span class="pref-value">${ans.research} ${weightBadge(ans.researchWeight)}</span>
        </div>
      `;
    }

    let savedHTML = '';
    if (results && results.length > 0) {
      savedHTML = results.slice(0, 5).map((p, i) => `
        <div class="uni-card" style="border-left-color:${i === 0 ? 'var(--c-success)' : 'var(--c-primary)'};">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <h3 style="margin:0;font-size:1rem;">${p.name}</h3>
            ${p.accredited ? '<span class="match-score">⭐ Acreditada</span>' : ''}
          </div>
          <div class="uni-card-meta">
            <span>🏫 ${p.instituteName}</span>
            <span>📍 ${p.department}</span>
          </div>
        </div>
      `).join('');
    } else {
      savedHTML = '<p style="color:var(--c-text-light);font-size:.92rem;">Completa el cuestionario para ver tus recomendaciones aquí.</p>';
    }

    document.getElementById('app').innerHTML = `
      <div class="page fade-in">
        <div class="profile-header">
          <div class="profile-avatar">👤</div>
          <h2>${user.name}</h2>
          <p>${user.email}</p>
        </div>

        <div class="profile-section">
          <h3>📋 Mis preferencias</h3>
          ${prefsHTML}
          <div class="mt-20">
            <a href="#/cuestionario" class="btn btn-outline btn-sm btn-block">${ans ? '✏️ Editar preferencias' : '📝 Completar cuestionario'}</a>
          </div>
        </div>

        <div class="profile-section">
          <h3><img src="img/logo.svg" alt="" style="width:20px;height:20px;display:inline-block;vertical-align:middle;margin-right:4px;"> Universidades guardadas</h3>
          ${savedHTML}
          ${results && results.length > 0 ? '<div class="mt-12"><a href="#/resultados" class="btn btn-secondary btn-sm btn-block">Ver todos los resultados</a></div>' : ''}
        </div>

        <div class="text-center mt-20" style="padding-bottom:32px;">
          <button class="btn btn-danger btn-sm" id="logout-btn">Cerrar sesión</button>
        </div>
      </div>
    `;

    document.getElementById('logout-btn').addEventListener('click', () => {
      Storage.logout();
      App.onLogout();
    });
  }

  return { render };
})();

