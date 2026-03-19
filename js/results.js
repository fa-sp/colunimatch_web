/* ===== Results Page ===== */
const ResultsPage = (() => {
  function render() {
    const user = Storage.getCurrentUser();
    const results = user ? user.results : null;

    if (!results || results.length === 0) {
      document.getElementById('app').innerHTML = `
        <div class="page fade-in text-center" style="padding-top:120px;">
          <p style="font-size:3rem;">🤔</p>
          <h2 style="color:var(--c-secondary);">Aún no tienes resultados</h2>
          <p style="color:var(--c-text-light);margin:12px 0 24px;">Completa el cuestionario para obtener tus recomendaciones personalizadas.</p>
          <a href="#/cuestionario" class="btn btn-primary">Comenzar cuestionario 📝</a>
        </div>
      `;
      return;
    }

    const cards = results.slice(0, 50).map((p, i) => `
      <div class="uni-card fade-in" style="animation-delay:${i * 0.03}s">
        <span class="uni-card-rank">${i + 1}</span>
        ${p.accredited ? '<div class="match-score">⭐ Acreditada en alta calidad</div>' : ''}
        <h3>${p.name}</h3>
        <h4 style="color:var(--c-text-light);font-size:.95rem;margin-bottom:8px;">🏫 ${p.instituteName}</h4>
        <div class="uni-card-meta">
          <span>📍 ${p.department}</span>
          ${p.level ? `<span>📚 ${p.level}</span>` : ''}
          ${p.modality ? `<span>💻 ${p.modality}</span>` : ''}
        </div>
        ${p.degree ? `<p class="uni-card-desc">🎓 Título: ${p.degree}</p>` : ''}
        <div class="uni-card-tags">
          <span class="uni-tag">Código ${p.code}</span>
          ${p.accredited ? '<span class="uni-tag" style="background:rgba(46,204,113,.12);color:#1a9c52;">Acreditada</span>' : ''}
        </div>
        <a href="${p.website ? (p.website.startsWith('http') ? p.website : 'https://' + p.website) : 'https://www.google.com/search?q=' + encodeURIComponent(p.instituteName)}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">${p.website ? 'Visitar sitio web →' : 'Buscar universidad →'}</a>
      </div>
    `).join('');

    const countText = results.length > 50
      ? `Mostrando 50 de ${results.length} programas encontrados`
      : `${results.length} programa${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}`;

    document.getElementById('app').innerHTML = `
      <div class="page fade-in">
        <div class="results-header">
          <h1><img src="img/logo.svg" alt="" style="width:32px;height:32px;display:inline-block;vertical-align:middle;margin-right:6px;">Programas recomendados</h1>
          <p>${countText}</p>
        </div>
        ${cards}
        <div class="text-center mt-20">
          <a href="#/cuestionario" class="btn btn-outline" style="margin-right:8px;">Volver al cuestionario</a>
          <a href="#/perfil" class="btn btn-secondary">Ver mi perfil</a>
        </div>
      </div>
    `;
  }

  return { render };
})();

