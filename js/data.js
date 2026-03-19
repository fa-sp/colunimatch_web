/* ===== Colombian Universities Dataset ===== */
/* costPerSemester: approximate COP range per semester (2025-2026)       */
/*   - Public universities: varies by estrato socioeconómico (1-6)      */
/*   - Private universities: varies by program (Medicine typically highest) */
const UNIVERSITIES = [
  {
    id: 1, name: "Universidad de los Andes",
    city: "Bogotá", department: "Bogotá D.C.", type: "privada",
    costPerSemester: { min: 18200000, max: 23500000 },
    areas: ["ingeniería", "ciencias sociales", "derecho", "economía", "medicina", "ciencias", "artes"],
    size: "grande",
    research: true,
    description: "Una de las universidades más prestigiosas de Colombia, reconocida por su excelencia académica e investigación de clase mundial.",
    url: "https://uniandes.edu.co"
  },
  {
    id: 2, name: "Universidad Nacional de Colombia",
    city: "Bogotá", department: "Bogotá D.C.", type: "pública",
    costPerSemester: { min: 200000, max: 5500000 },
    areas: ["ingeniería", "ciencias", "medicina", "artes", "ciencias sociales", "agronomía", "derecho", "economía"],
    size: "grande",
    research: true,
    description: "La universidad pública más importante del país, con múltiples sedes y una amplia oferta académica en todas las áreas del conocimiento.",
    url: "https://unal.edu.co"
  },
  {
    id: 3, name: "Universidad Javeriana",
    city: "Bogotá", department: "Bogotá D.C.", type: "privada",
    costPerSemester: { min: 15500000, max: 22800000 },
    areas: ["medicina", "derecho", "ingeniería", "comunicación", "ciencias sociales", "artes", "economía"],
    size: "grande",
    research: true,
    description: "Universidad jesuita de tradición centenaria, reconocida por su formación integral y compromiso social.",
    url: "https://www.javeriana.edu.co"
  },
  {
    id: 4, name: "Universidad del Rosario",
    city: "Bogotá", department: "Bogotá D.C.", type: "privada",
    costPerSemester: { min: 14000000, max: 20500000 },
    areas: ["derecho", "medicina", "economía", "ciencias sociales", "ciencias"],
    size: "mediana",
    research: true,
    description: "Una de las universidades más antiguas de América, destacada en derecho, ciencias políticas y medicina.",
    url: "https://www.urosario.edu.co"
  },
  {
    id: 5, name: "Universidad de Antioquia",
    city: "Medellín", department: "Antioquia", type: "pública",
    costPerSemester: { min: 200000, max: 4800000 },
    areas: ["medicina", "ciencias", "ingeniería", "ciencias sociales", "artes", "derecho", "educación"],
    size: "grande",
    research: true,
    description: "La universidad pública más importante del departamento de Antioquia, con excelencia en investigación y formación humana.",
    url: "https://www.udea.edu.co"
  },
  {
    id: 6, name: "Universidad EAFIT",
    city: "Medellín", department: "Antioquia", type: "privada",
    costPerSemester: { min: 12500000, max: 17500000 },
    areas: ["ingeniería", "economía", "administración", "derecho", "ciencias"],
    size: "mediana",
    research: true,
    description: "Reconocida por su enfoque en negocios, ingeniería y emprendimiento, con fuerte conexión con el sector empresarial.",
    url: "https://www.eafit.edu.co"
  },
  {
    id: 7, name: "Universidad del Valle",
    city: "Cali", department: "Valle del Cauca", type: "pública",
    costPerSemester: { min: 200000, max: 4200000 },
    areas: ["ingeniería", "ciencias", "salud", "ciencias sociales", "artes", "educación"],
    size: "grande",
    research: true,
    description: "Principal universidad pública del suroccidente colombiano, con fortaleza en ciencias, ingeniería y salud.",
    url: "https://www.univalle.edu.co"
  },
  {
    id: 8, name: "Universidad del Norte",
    city: "Barranquilla", department: "Atlántico", type: "privada",
    costPerSemester: { min: 10500000, max: 16800000 },
    areas: ["ingeniería", "medicina", "derecho", "ciencias sociales", "comunicación", "economía"],
    size: "mediana",
    research: true,
    description: "Líder académica en la región Caribe, con programas acreditados de alta calidad y campus moderno.",
    url: "https://www.uninorte.edu.co"
  },
  {
    id: 9, name: "Universidad Industrial de Santander",
    city: "Bucaramanga", department: "Santander", type: "pública",
    costPerSemester: { min: 200000, max: 4500000 },
    areas: ["ingeniería", "ciencias", "salud", "ciencias sociales", "economía"],
    size: "grande",
    research: true,
    description: "Reconocida por sus programas de ingeniería y ciencias, es un referente en el nororiente colombiano.",
    url: "https://www.uis.edu.co"
  },
  {
    id: 10, name: "Universidad de Cartagena",
    city: "Cartagena", department: "Bolívar", type: "pública",
    costPerSemester: { min: 200000, max: 3800000 },
    areas: ["medicina", "derecho", "ingeniería", "ciencias sociales", "economía"],
    size: "mediana",
    research: false,
    description: "Universidad pública histórica en la costa caribe, con programas tradicionales de alta trayectoria.",
    url: "https://www.unicartagena.edu.co"
  },
  {
    id: 11, name: "Universidad Externado de Colombia",
    city: "Bogotá", department: "Bogotá D.C.", type: "privada",
    costPerSemester: { min: 13500000, max: 18500000 },
    areas: ["derecho", "ciencias sociales", "economía", "comunicación", "administración"],
    size: "mediana",
    research: true,
    description: "Reconocida especialmente por su Facultad de Derecho, una de las más prestigiosas de Latinoamérica.",
    url: "https://www.uexternado.edu.co"
  },
  {
    id: 12, name: "Universidad de La Sabana",
    city: "Chía", department: "Cundinamarca", type: "privada",
    costPerSemester: { min: 13000000, max: 20000000 },
    areas: ["comunicación", "medicina", "ingeniería", "educación", "derecho", "economía"],
    size: "mediana",
    research: true,
    description: "Campus universitario excepcional a las afueras de Bogotá, con enfoque en formación integral y valores.",
    url: "https://www.unisabana.edu.co"
  },
  {
    id: 13, name: "Universidad Pontificia Bolivariana",
    city: "Medellín", department: "Antioquia", type: "privada",
    costPerSemester: { min: 8000000, max: 13500000 },
    areas: ["ingeniería", "arquitectura", "comunicación", "derecho", "ciencias sociales", "educación"],
    size: "mediana",
    research: true,
    description: "Universidad católica con fuerte tradición en ingeniería, arquitectura y comunicación social.",
    url: "https://www.upb.edu.co"
  },
  {
    id: 14, name: "Universidad ICESI",
    city: "Cali", department: "Valle del Cauca", type: "privada",
    costPerSemester: { min: 12000000, max: 18000000 },
    areas: ["ingeniería", "economía", "administración", "medicina", "derecho", "ciencias"],
    size: "mediana",
    research: true,
    description: "Universidad líder en el Valle del Cauca, reconocida por innovación, emprendimiento y rigurosidad académica.",
    url: "https://www.icesi.edu.co"
  },
  {
    id: 15, name: "Universidad Tecnológica de Pereira",
    city: "Pereira", department: "Risaralda", type: "pública",
    costPerSemester: { min: 200000, max: 4200000 },
    areas: ["ingeniería", "ciencias", "medicina", "educación", "artes"],
    size: "mediana",
    research: true,
    description: "Referente académico en el Eje Cafetero con fortaleza en ingenierías y ciencias de la salud.",
    url: "https://www.utp.edu.co"
  },
  {
    id: 16, name: "Universidad de Caldas",
    city: "Manizales", department: "Caldas", type: "pública",
    costPerSemester: { min: 200000, max: 3800000 },
    areas: ["artes", "ciencias", "ciencias sociales", "derecho", "ingeniería", "salud"],
    size: "mediana",
    research: false,
    description: "Universidad pública con campus en la zona cafetera, destacada en artes, ciencias y humanidades.",
    url: "https://www.ucaldas.edu.co"
  },
  {
    id: 17, name: "Universidad EAN",
    city: "Bogotá", department: "Bogotá D.C.", type: "privada",
    costPerSemester: { min: 6000000, max: 9500000 },
    areas: ["administración", "economía", "ingeniería", "comunicación"],
    size: "pequeña",
    research: false,
    description: "Enfocada en emprendimiento y negocios sostenibles, con programas innovadores y flexibles.",
    url: "https://universidadean.edu.co"
  },
  {
    id: 18, name: "Universidad del Magdalena",
    city: "Santa Marta", department: "Magdalena", type: "pública",
    costPerSemester: { min: 200000, max: 3200000 },
    areas: ["ingeniería", "ciencias", "ciencias sociales", "educación", "salud"],
    size: "mediana",
    research: false,
    description: "Principal universidad pública de la región del Magdalena, cerca del mar Caribe y la Sierra Nevada.",
    url: "https://www.unimagdalena.edu.co"
  },
  {
    id: 19, name: "Universidad Pedagógica Nacional",
    city: "Bogotá", department: "Bogotá D.C.", type: "pública",
    costPerSemester: { min: 200000, max: 3200000 },
    areas: ["educación", "ciencias sociales", "ciencias", "artes"],
    size: "pequeña",
    research: true,
    description: "La universidad líder en formación de docentes en Colombia, con enfoque pedagógico e investigativo.",
    url: "https://www.pedagogica.edu.co"
  },
  {
    id: 20, name: "Universidad de Nariño",
    city: "Pasto", department: "Nariño", type: "pública",
    costPerSemester: { min: 200000, max: 3000000 },
    areas: ["ingeniería", "ciencias", "artes", "derecho", "ciencias sociales", "agronomía"],
    size: "mediana",
    research: false,
    description: "La principal universidad del sur de Colombia, comprometida con el desarrollo regional y la diversidad cultural.",
    url: "https://www.udenar.edu.co"
  },
  {
    id: 21, name: "Universidad Autónoma de Bucaramanga",
    city: "Bucaramanga", department: "Santander", type: "privada",
    costPerSemester: { min: 6500000, max: 11500000 },
    areas: ["ingeniería", "derecho", "comunicación", "ciencias sociales", "economía", "salud"],
    size: "mediana",
    research: false,
    description: "Universidad privada del nororiente con programas virtuales y presenciales de calidad.",
    url: "https://www.unab.edu.co"
  },
  {
    id: 22, name: "Universidad del Cauca",
    city: "Popayán", department: "Cauca", type: "pública",
    costPerSemester: { min: 200000, max: 3800000 },
    areas: ["ingeniería", "derecho", "ciencias", "ciencias sociales", "artes", "salud"],
    size: "mediana",
    research: true,
    description: "Universidad bicentenaria ubicada en la ciudad blanca de Colombia, con tradición en ciencias e ingeniería.",
    url: "https://www.unicauca.edu.co"
  },
  {
    id: 23, name: "Universidad de Córdoba",
    city: "Montería", department: "Córdoba", type: "pública",
    costPerSemester: { min: 200000, max: 2800000 },
    areas: ["agronomía", "ingeniería", "ciencias", "salud", "educación"],
    size: "mediana",
    research: false,
    description: "Reconocida por sus programas agropecuarios y de ciencias ambientales en la región del Sinú.",
    url: "https://www.unicordoba.edu.co"
  },
  {
    id: 24, name: "Universidad Santo Tomás",
    city: "Bogotá", department: "Bogotá D.C.", type: "privada",
    costPerSemester: { min: 6500000, max: 11500000 },
    areas: ["derecho", "ingeniería", "economía", "ciencias sociales", "arquitectura", "educación"],
    size: "grande",
    research: false,
    description: "La primera universidad de Colombia (1580), de tradición dominicana, con sedes en varias ciudades del país.",
    url: "https://www.usta.edu.co"
  },
  {
    id: 25, name: "Universidad CES",
    city: "Medellín", department: "Antioquia", type: "privada",
    costPerSemester: { min: 14000000, max: 22500000 },
    areas: ["medicina", "salud", "derecho", "administración", "ciencias"],
    size: "pequeña",
    research: true,
    description: "Especializada en ciencias de la salud, reconocida como una de las mejores facultades de medicina del país.",
    url: "https://www.ces.edu.co"
  },
  {
    id: 26, name: "Universidad Autónoma de Occidente",
    city: "Cali", department: "Valle del Cauca", type: "privada",
    costPerSemester: { min: 7000000, max: 12000000 },
    areas: ["ingeniería", "comunicación", "economía", "ciencias sociales"],
    size: "mediana",
    research: false,
    description: "Universidad caleña con campus moderno, destacada en ingeniería y comunicación social.",
    url: "https://www.uao.edu.co"
  },
  {
    id: 27, name: "Universidad Militar Nueva Granada",
    city: "Bogotá", department: "Bogotá D.C.", type: "pública",
    costPerSemester: { min: 1500000, max: 6500000 },
    areas: ["ingeniería", "derecho", "medicina", "economía", "ciencias"],
    size: "mediana",
    research: true,
    description: "Universidad pública del sector defensa con programas acreditados y campus Cajicá.",
    url: "https://www.umng.edu.co"
  },
  {
    id: 28, name: "Universidad de Manizales",
    city: "Manizales", department: "Caldas", type: "privada",
    costPerSemester: { min: 5000000, max: 9500000 },
    areas: ["derecho", "comunicación", "ingeniería", "ciencias sociales", "educación"],
    size: "pequeña",
    research: false,
    description: "Universidad privada del Eje Cafetero con ambiente acogedor y formación humana integral.",
    url: "https://umanizales.edu.co"
  },
  {
    id: 29, name: "Universidad Surcolombiana",
    city: "Neiva", department: "Huila", type: "pública",
    costPerSemester: { min: 200000, max: 3800000 },
    areas: ["ingeniería", "ciencias sociales", "salud", "educación", "derecho"],
    size: "mediana",
    research: false,
    description: "Principal universidad pública del Huila, con compromiso regional y programas pertinentes.",
    url: "https://www.usco.edu.co"
  },
  {
    id: 30, name: "Escuela Colombiana de Ingeniería",
    city: "Bogotá", department: "Bogotá D.C.", type: "privada",
    costPerSemester: { min: 9500000, max: 14500000 },
    areas: ["ingeniería", "economía", "ciencias", "administración"],
    size: "pequeña",
    research: true,
    description: "Institución especializada en ingeniería con enfoque práctico y alta tasa de empleabilidad de sus egresados.",
    url: "https://www.escuelaing.edu.co"
  }
];

const AREA_LABELS = {
  "ingeniería": "🔧 Ingeniería y Tecnología",
  "medicina": "🏥 Medicina",
  "salud": "💊 Ciencias de la Salud",
  "derecho": "⚖️ Derecho",
  "economía": "📊 Economía y Finanzas",
  "administración": "💼 Administración y Negocios",
  "ciencias sociales": "🌍 Ciencias Sociales y Humanas",
  "ciencias": "🔬 Ciencias Exactas y Naturales",
  "artes": "🎨 Artes y Diseño",
  "comunicación": "📡 Comunicación y Periodismo",
  "educación": "📚 Educación",
  "agronomía": "🌱 Ciencias Agropecuarias",
  "arquitectura": "🏛️ Arquitectura"
};

const ALL_AREAS = Object.keys(AREA_LABELS);

/* Helper: format COP currency */
function formatCOP(value) {
  return '$' + value.toLocaleString('es-CO');
}
