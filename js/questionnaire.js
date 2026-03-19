/* ===== Multi-Step Questionnaire ===== */
const QuestionnairePage = (() => {
  let step = 0;
  let answers = {
    areas: [], areasWeight: 'importante',
    locations: [], locationWeight: 'importante',
    budget: 8000000, budgetWeight: 'importante',
    type: 'ambas', typeWeight: 'importante',
    research: 'no importa', researchWeight: 'importante'
  };
  let locationData = [];
  let locationSearch = '';

  const TOTAL_STEPS = 5;

  function render() {
    step = 0;
    const user = Storage.getCurrentUser();
    if (user && user.answers) {
      answers = { ...answers, ...user.answers };
    }
    fetchLocations();
    renderStep();
  }

  async function fetchLocations() {
    if (locationData.length > 0) return;
    try {
      const res = await fetch('https://www.datos.gov.co/resource/n5yy-8nav.json?$limit=5000');
      const data = await res.json();
      const seen = new Set();
      locationData = [];
      data.forEach(item => {
        const dept = item.departamento_domicilio || item.cod_departamento || '';
        const mun = item.municipio_domicilio || '';
        const label = mun && dept ? `${mun}, ${dept}` : (mun || dept);
        if (label && !seen.has(label.toUpperCase())) {
          seen.add(label.toUpperCase());
          locationData.push(label);
        }
      });
      locationData.sort((a, b) => a.localeCompare(b, 'es'));
    } catch (err) {
      console.warn('Error fetching locations, using fallback', err);
      locationData = [
        'Bogotá D.C., Bogotá D.C.', 'Medellín, Antioquia', 'Cali, Valle del Cauca',
        'Barranquilla, Atlántico', 'Cartagena, Bolívar', 'Bucaramanga, Santander',
        'Manizales, Caldas', 'Pereira, Risaralda', 'Santa Marta, Magdalena',
        'Pasto, Nariño', 'Neiva, Huila', 'Popayán, Cauca', 'Montería, Córdoba',
        'Villavicencio, Meta', 'Tunja, Boyacá', 'Ibagué, Tolima', 'Armenia, Quindío',
        'Cúcuta, Norte de Santander', 'Chía, Cundinamarca'
      ];
    }
  }

  function renderStep() {
    const app = document.getElementById('app');
    const progress = ((step + 1) / TOTAL_STEPS) * 100;

    let content = '';
    switch (step) {
      case 0: content = stepAreas(); break;
      case 1: content = stepLocation(); break;
      case 2: content = stepBudget(); break;
      case 3: content = stepType(); break;
      case 4: content = stepResearch(); break;
    }

    app.innerHTML = `
      <div class="page fade-in">
        <div class="step-label">Paso ${step + 1} de ${TOTAL_STEPS}</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>
        ${content}
        <div class="step-nav">
          ${step > 0 ? '<button class="btn btn-outline" id="prev-btn">← Anterior</button>' : '<span></span>'}
          ${step < TOTAL_STEPS - 1
            ? '<button class="btn btn-primary" id="next-btn">Siguiente →</button>'
            : '<button class="btn btn-primary" id="next-btn">Ver resultados 🎯</button>'}
        </div>
      </div>
    `;
    bindStepEvents();
  }

  /* ---- Step Builders ---- */

  function weightSelector(key) {
    const opts = ['menos importante', 'importante', 'muy importante'];
    return `
      <div class="weight-group">
        <span class="weight-label">¿Qué tan importante es esto para ti?</span>
        <div class="weight-options">
          ${opts.map(o => `<button type="button" class="weight-opt ${answers[key] === o ? 'selected' : ''}" data-wkey="${key}" data-wval="${o}">${o}</button>`).join('')}
        </div>
      </div>
    `;
  }

  function stepAreas() {
    return `
      <div class="question-card">
        <h2>🎯 ¿Qué áreas te interesan?</h2>
        <p>Selecciona una o más áreas de estudio que te apasionen.</p>
        <div class="checkbox-grid">
          ${ALL_AREAS.map(a => `
            <label class="checkbox-item ${answers.areas.includes(a) ? 'checked' : ''}">
              <input type="checkbox" value="${a}" ${answers.areas.includes(a) ? 'checked' : ''}> ${AREA_LABELS[a]}
            </label>
          `).join('')}
        </div>
        ${weightSelector('areasWeight')}
      </div>
    `;
  }

  function stepLocation() {
    return `
      <div class="question-card">
        <h2>📍 ¿Dónde te gustaría estudiar?</h2>
        <p>Busca y selecciona las ciudades o departamentos de tu interés.</p>
        <div class="multiselect-wrap">
          <input type="text" class="multiselect-input" id="loc-search"
                 placeholder="Escribe para buscar una ciudad..."
                 value="${locationSearch}" autocomplete="off">
          <div class="multiselect-dropdown" id="loc-dropdown"></div>
        </div>
        <div class="chips" id="loc-chips">
          ${answers.locations.map(l => `
            <span class="chip">${l} <button class="chip-remove" data-loc="${l}">×</button></span>
          `).join('')}
        </div>
        ${locationData.length === 0 ? '<p style="margin-top:12px;font-size:.85rem;color:var(--c-text-light);">⏳ Cargando ubicaciones desde datos.gov.co...</p>' : ''}
        ${weightSelector('locationWeight')}
      </div>
    `;
  }

  function stepBudget() {
    return `
      <div class="question-card">
        <h2>💰 ¿Cuál es tu presupuesto por semestre?</h2>
        <p>Arrastra el control para indicar cuánto puedes invertir por semestre en COP.</p>
        <div class="range-display" id="budget-display">${formatCOP(answers.budget)}</div>
        <input type="range" class="form-range" id="budget-range"
               min="200000" max="25000000" step="500000"
               value="${answers.budget}">
        <div class="range-labels">
          <span>$200.000</span>
          <span>$12.500.000</span>
          <span>$25.000.000</span>
        </div>
        <p style="margin-top:14px;font-size:.82rem;color:var(--c-text-light);">
          💡 Las universidades públicas van desde ~$200.000/sem (estrato 1) hasta ~$5.500.000/sem (estrato 6).
          Las privadas van desde ~$5.000.000 hasta ~$23.500.000/sem.
        </p>
        ${weightSelector('budgetWeight')}
      </div>
    `;
  }

  function stepType() {
    const types = { pública: '🏛️ Pública', privada: '🏢 Privada', ambas: '🤝 Ambas me interesan' };
    return `
      <div class="question-card">
        <h2>🏫 ¿Qué tipo de universidad prefieres?</h2>
        <p>Elige si tienes preferencia por universidades públicas o privadas.</p>
        ${Object.entries(types).map(([val, label]) => `
          <label class="checkbox-item ${answers.type === val ? 'checked' : ''}" style="margin-bottom:8px;">
            <input type="radio" name="utype" value="${val}" ${answers.type === val ? 'checked' : ''}> ${label}
          </label>
        `).join('')}
        ${weightSelector('typeWeight')}
      </div>
    `;
  }

  function stepResearch() {
    const opts = { 'sí': '🔬 Sí, quiero una universidad investigadora', 'no importa': '😊 No es prioritario para mí' };
    return `
      <div class="question-card">
        <h2>🔬 ¿Es importante la investigación?</h2>
        <p>¿Prefieres una universidad con fuerte enfoque investigativo?</p>
        ${Object.entries(opts).map(([val, label]) => `
          <label class="checkbox-item ${answers.research === val ? 'checked' : ''}" style="margin-bottom:8px;">
            <input type="radio" name="research" value="${val}" ${answers.research === val ? 'checked' : ''}> ${label}
          </label>
        `).join('')}
        ${weightSelector('researchWeight')}
      </div>
    `;
  }

  /* ---- Event Binding ---- */

  function bindStepEvents() {
    // Weight selectors
    document.querySelectorAll('.weight-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        answers[btn.dataset.wkey] = btn.dataset.wval;
        btn.parentElement.querySelectorAll('.weight-opt').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

    // Navigation
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => { step--; renderStep(); });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      collectCurrentStep();
      if (step < TOTAL_STEPS - 1) { step++; renderStep(); }
      else { submitAnswers(); }
    });

    // Step-specific bindings
    if (step === 0) bindAreasStep();
    if (step === 1) bindLocationStep();
    if (step === 2) bindBudgetStep();
    if (step === 3) bindRadioStep('utype', 'type');
    if (step === 4) bindRadioStep('research', 'research');
  }

  function bindAreasStep() {
    document.querySelectorAll('.checkbox-item input[type="checkbox"]').forEach(cb => {
      cb.parentElement.addEventListener('click', e => {
        e.preventDefault();
        cb.checked = !cb.checked;
        cb.parentElement.classList.toggle('checked', cb.checked);
        if (cb.checked) { if (!answers.areas.includes(cb.value)) answers.areas.push(cb.value); }
        else { answers.areas = answers.areas.filter(a => a !== cb.value); }
      });
    });
  }

  function bindBudgetStep() {
    const range = document.getElementById('budget-range');
    const display = document.getElementById('budget-display');
    range.addEventListener('input', () => {
      answers.budget = parseInt(range.value, 10);
      display.textContent = formatCOP(answers.budget);
    });
  }

  function bindLocationStep() {
    const input = document.getElementById('loc-search');
    const dropdown = document.getElementById('loc-dropdown');
    const chipsEl = document.getElementById('loc-chips');

    input.addEventListener('focus', () => updateDropdown());
    input.addEventListener('input', () => {
      locationSearch = input.value;
      updateDropdown();
    });

    document.addEventListener('click', e => {
      if (!e.target.closest('.multiselect-wrap')) dropdown.classList.remove('open');
    });

    function updateDropdown() {
      const q = input.value.toLowerCase().trim();
      const filtered = locationData.filter(l => l.toLowerCase().includes(q)).slice(0, 50);
      if (filtered.length === 0) {
        dropdown.innerHTML = '<div class="multiselect-option" style="color:var(--c-text-light)">No se encontraron resultados</div>';
      } else {
        dropdown.innerHTML = filtered.map(l =>
          `<div class="multiselect-option ${answers.locations.includes(l) ? 'selected' : ''}" data-loc="${l}">${l}</div>`
        ).join('');
      }
      dropdown.classList.add('open');

      dropdown.querySelectorAll('.multiselect-option[data-loc]').forEach(opt => {
        opt.addEventListener('click', () => {
          const loc = opt.dataset.loc;
          if (answers.locations.includes(loc)) {
            answers.locations = answers.locations.filter(x => x !== loc);
          } else {
            answers.locations.push(loc);
          }
          input.value = '';
          locationSearch = '';
          updateDropdown();
          renderChips();
        });
      });
    }

    function renderChips() {
      chipsEl.innerHTML = answers.locations.map(l =>
        `<span class="chip">${l} <button class="chip-remove" data-loc="${l}">×</button></span>`
      ).join('');
      chipsEl.querySelectorAll('.chip-remove').forEach(btn => {
        btn.addEventListener('click', () => {
          answers.locations = answers.locations.filter(x => x !== btn.dataset.loc);
          renderChips();
          updateDropdown();
        });
      });
    }

    chipsEl.querySelectorAll('.chip-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        answers.locations = answers.locations.filter(x => x !== btn.dataset.loc);
        renderChips();
      });
    });
  }

  function bindRadioStep(radioName, answerKey) {
    document.querySelectorAll(`.checkbox-item`).forEach(item => {
      const radio = item.querySelector(`input[name="${radioName}"]`);
      if (!radio) return;
      item.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll(`.checkbox-item`).forEach(i => {
          const r = i.querySelector(`input[name="${radioName}"]`);
          if (r) { r.checked = false; i.classList.remove('checked'); }
        });
        radio.checked = true;
        item.classList.add('checked');
        answers[answerKey] = radio.value;
      });
    });
  }

  function collectCurrentStep() {
    // Answers are collected in real-time via event handlers
  }

  async function submitAnswers() {
    if (answers.areas.length === 0) {
      App.toast('Por favor selecciona al menos un área de interés.');
      step = 0;
      renderStep();
      return;
    }
    Storage.saveAnswers(answers);

    /* Show loading state */
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page fade-in text-center" style="padding-top:120px;">
        <p style="font-size:3rem;">⏳</p>
        <h2 style="color:var(--c-secondary);">Buscando universidades...</h2>
        <p style="color:var(--c-text-light);margin-top:8px;">Consultando programas que coincidan con tus preferencias.</p>
      </div>
    `;

    try {
      const results = await Matcher.getRecommendations(answers);
      Storage.saveResults(results);
      window.location.hash = '#/resultados';
    } catch (err) {
      App.toast('Error al consultar la API. ¿Está corriendo el servidor?');
      renderStep();
    }
  }

  return { render };
})();

