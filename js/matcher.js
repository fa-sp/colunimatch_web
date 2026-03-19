/* ===== API Client – talks to ColUniMatch Ktor backend ===== */
const Matcher = (() => {
  const API_BASE = 'http://localhost:8080';

  /* Map questionnaire areas to program search terms the API understands */
  const AREA_TO_PROGRAMS = {
    'ingeniería': ['INGENIERIA', 'INGENIERO'],
    'medicina': ['MEDICINA', 'MEDICO'],
    'salud': ['SALUD', 'ENFERMERIA', 'ODONTOLOGIA', 'FISIOTERAPIA'],
    'derecho': ['DERECHO', 'ABOGADO', 'JURISPRUDENCIA'],
    'economía': ['ECONOMIA', 'ECONOMISTA', 'FINANZAS'],
    'administración': ['ADMINISTRACION', 'NEGOCIOS'],
    'ciencias sociales': ['CIENCIAS SOCIALES', 'SOCIOLOGIA', 'POLITICA', 'PSICOLOGIA', 'ANTROPOLOGIA'],
    'ciencias': ['CIENCIAS', 'FISICA', 'QUIMICA', 'MATEMATICA', 'BIOLOGIA'],
    'artes': ['ARTES', 'DISEÑO', 'MUSICA'],
    'comunicación': ['COMUNICACION', 'PERIODISMO'],
    'educación': ['EDUCACION', 'LICENCIATURA', 'PEDAGOGIA'],
    'agronomía': ['AGRONOMIA', 'AGROPECUARIA', 'VETERINARIA', 'ZOOTECNIA'],
    'arquitectura': ['ARQUITECTURA', 'URBANISMO']
  };

  function mapAnswersToRequest(answers) {
    /* Build programas search terms from selected areas */
    const programas = [];
    (answers.areas || []).forEach(area => {
      const terms = AREA_TO_PROGRAMS[area];
      if (terms) programas.push(...terms);
    });

    /* Extract department names from location selections (format: "City, Department") */
    const departamentos = [];
    (answers.locations || []).forEach(loc => {
      const parts = loc.split(',');
      if (parts.length >= 2) {
        departamentos.push(parts[parts.length - 1].trim());
      } else {
        departamentos.push(loc.trim());
      }
    });
    /* Deduplicate departments */
    const uniqueDepartamentos = [...new Set(departamentos)];

    const acreditada = answers.research === 'sí';

    return {
      departamentos: uniqueDepartamentos.length > 0 ? uniqueDepartamentos : null,
      acreditada_alta_calidad: acreditada,
      programas: programas.length > 0 ? programas : null
    };
  }

  async function getRecommendations(answers) {
    const requestBody = mapAnswersToRequest(answers);

    try {
      const response = await fetch(`${API_BASE}/unisearch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`API responded with ${response.status}`);
      }

      const programs = await response.json();

      /* Transform API results into the format the UI expects */
      return programs.map(p => ({
        name: p.nombre,
        instituteName: p.institutoNombre,
        department: p.institutoDepartamento || 'Colombia',
        code: p.codigoPrograma,
        level: p.nivel,
        modality: p.modalidad,
        degree: p.titulooObtenido,
        accredited: p.acreditada_alta_calidad,
        updatedAt: p.fechaActualizacion,
        website: p.paginaWeb
      }));
    } catch (err) {
      console.error('API call failed:', err);
      throw err;
    }
  }

  return { getRecommendations };
})();
