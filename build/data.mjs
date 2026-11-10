// Andromeda — single source of truth for both site versions.
// Every fact below comes from Andromeda's own material:
//  - "Andromeda (Presentación Esp)_general_feb2026.pptx" (history, solutions, process, doc types, contact)
//  - "+ Soluciones - Características, Tarifas, capacidad e idiomas_feb26.xlsx" (rates, capacity, languages, discounts)
//  - "Full Onboarding - Andromeda.xlsx" (verticals, personas, value props, exclusions, 30% new-client offer)
//  - "Landing Page Proposal - Andromeda" (approved copy angles, FAQ, CTA)
// Rules from the client: NO testimonials, NO personal documents (actas), NO interpretation.

export const BRAND = {
  name: 'Andromeda',
  legal: 'Andromeda Services, S.A. de C.V.',
  since: 2002,
  years: 24,
  phone: '55 5574 0012',
  phoneHref: '+525555740012',
  email: 'informacion@andromeda.mx',
  address: 'Tajín 503, Vértiz Narvarte, Benito Juárez, CDMX, México',
  // [VALIDAR] WhatsApp destination — onboarding lists Carlos Mejía's mobile; confirm the sales line before launch.
  whatsapp: '525512953576',
  sites: ['andromeda.lat', 'traduce.com', 'peritostraductores.com'],
  // Public profiles linked from andromeda.lat
  socials: [['linkedin', 'LinkedIn', 'https://www.linkedin.com/company/andromedalat/'], ['instagram', 'Instagram', 'https://instagram.com/andromedalatam/'], ['facebook', 'Facebook', 'https://www.facebook.com/share/vQXUZJwz975axPdV/']],
};

// ---- Solutions (Soluciones) — price sheet feb26, MXN per word, EN→ES ----
export const SERVICES = [
  {
    id: 'tradmagia', name: 'Tradmagia®', kind: 'Traducción híbrida optimizada',
    short: 'Híbrida optimizada para proyectos extensos, muy urgentes o con presupuesto reducido.',
    price: '0.15', first: '0.11', unit: 'palabra',
    quality: 'Margen de error ≤ 2%',
    capacity: 'Hasta 500,000 palabras en 24 h',
    scope: 'Tablas y textos creados digitalmente (TXT, RTF, CSV, HTML, Word, Excel).',
    bullets: ['Consciencia del contexto a nivel documento', 'Vocabulario y estilo acordes al dominio', 'Verificación semiautomática de integridad'],
    style: 'Híbrida (IA + control de calidad)', format: 'Apego al formato de tus archivos',
    included: ['Consciencia de contexto a nivel documento', 'Vocabulario y estilo por dominio', 'Verificación semiautomática de integridad', 'Corrección semiautomática de posibles alucinaciones'],
    addons: ['Servicio urgente', 'Servicio extraurgente', 'Descuento por volumen'],
    ideal: 'Proyectos extensos, muy urgentes y/o con presupuestos reducidos sin omisiones ni incongruencias.',
    tone: 'violet',
  },
  {
    id: 'tradiah', name: 'TradIAH®', kind: 'Inteligencia Artificial + revisión Humana',
    short: 'IA y revisión humana para manuales, expedientes farmacéuticos y reportes clínicos.',
    price: '0.30', first: '0.21', unit: 'palabra',
    quality: 'Margen de error ≤ 0.5%',
    capacity: 'Hasta 80,000 palabras en 24 h',
    scope: 'Tablas y textos creados digitalmente (PDF, TXT, RTF, CSV, HTML, Word, Excel, PowerPoint).',
    bullets: ['Maquetación final como copia espejo', 'Validación de términos técnicos por expertos', 'Apego a tus glosarios bilingües'],
    style: 'Híbrida con revisión humana', format: 'Maquetación espejo del original',
    included: ['Todo lo de Tradmagia®', 'Maquetación final como copia espejo', 'Validación de términos técnicos por expertos', 'Verificación semiautomática de exactitud', 'Apego a tus glosarios bilingües'],
    addons: ['Servicio urgente', 'Servicio extraurgente', 'Descuento por volumen'],
    ideal: 'Bases de datos, manuales técnicos, expedientes de productos farmacéuticos y reportes de ensayos clínicos.',
    tone: 'magenta',
  },
  {
    id: 'expertos', name: 'Expertos en tu sector', kind: 'Traducción 100% humana',
    short: 'Traducción profesional por especialistas de tu industria, con garantía de calidad del 100%.',
    price: '0.50', first: '0.35', unit: 'palabra',
    quality: 'Garantía de corrección o reembolso',
    capacity: 'Hasta 40,000 palabras en 24 h',
    scope: 'Tablas, textos e imágenes (PDF, TXT, RTF, CSV, HTML, Word, Excel, PowerPoint).',
    bullets: ['Segunda revisión por un experto de tu industria', 'Apego a tus materiales bilingües de referencia', 'Entrega de memorias de traducción'],
    style: '100% humana', format: 'Maquetación final incluida',
    included: ['Todo lo de TradIAH®', 'Segunda revisión por experto en tu industria', 'Apego a vocabulario y estilo de referencia', 'Certificado interno de traducción', 'Memorias de traducción de tu proyecto'],
    addons: ['Servicio urgente', 'Descuento por volumen'],
    ideal: 'Documentos legales, materiales de marketing y textos para publicación con apego estricto a glosarios.',
    tone: 'coral',
  },
  {
    id: 'perito', name: 'Perito traductor', kind: 'Traducción certificada (CDMX)',
    short: 'Firmada y sellada por perito autorizado por el CJF o el TSJ de la Ciudad de México.',
    price: '0.80', first: '0.56', unit: 'palabra',
    quality: 'Validez oficial ante autoridades',
    capacity: 'Hasta 16,000 palabras en 24 h',
    scope: 'Tablas, textos e imágenes en inglés o español (PDF, Word, Excel, PowerPoint y más).',
    bullets: ['Sello y firma de perito autorizado (CJF o TSJ CDMX)', 'Garantía de corrección o reembolso', 'Para trámites, juicios y autoridades'],
    style: 'Literal, con validez pericial', format: 'Entregable listo para uso oficial',
    included: ['Todo lo de Expertos en tu sector', 'Sello y firma de perito traductor autorizado', 'Válida ante autoridades y tribunales', 'Garantía de corrección o reembolso'],
    addons: ['Servicio urgente', 'Descuento por volumen'],
    ideal: 'Traducciones que deben ser avaladas por peritos autorizados por el Consejo de la Judicatura Federal o el Tribunal Superior de Justicia de la CDMX.',
    tone: 'ink',
  },
];
export const svc = (id) => SERVICES.find((s) => s.id === id);

export const DISCOUNTS = [
  ['30%', 'en tu primer proyecto como cliente nuevo'],
  ['10%', 'en proyectos de más de 20,000 palabras'],
  ['20%', 'en proyectos de más de 100,000 palabras'],
  ['30%', 'en proyectos de más de 1 millón de palabras'],
];

export const PROCESS = [
  { n: 1, t: 'Envía tu documento y recibe tu cotización', d: 'Comparte tus archivos, el par de idiomas y el uso del documento. Definimos solución, formato y tiempos desde la cotización.' },
  { n: 2, t: 'Traducción y doble revisión', d: 'Un traductor especialista traduce y un segundo traductor con más de 15 años de experiencia revisa terminología y exactitud.' },
  { n: 3, t: 'Recibe tu entregable', d: 'Formato corregido o maquetado y, si lo requieres, sello y firma de perito traductor autorizado.' },
];

export const QC = [
  'Lectura final del traductor o equipo de traductores como primer filtro de calidad.',
  'Corrección de errores ortotipográficos, gramaticales y de traducción: omisiones, adiciones, significados incorrectos y texto no traducido.',
  'Revisión por un segundo traductor con más de 15 años de experiencia y/o formación en traducción, medicina, química, farmacobiología, ingenierías, derecho o finanzas.',
  'Validación de la precisión y homogeneidad terminológica con bases terminológicas y glosarios creados con expertos del sector.',
  'Corrección o maquetación del formato final: encabezados, pies de página, figuras, tablas de contenido, referencias cruzadas e hipervínculos.',
];

export const TRUST = [
  { icon: 'gavel', t: 'Peritos autorizados por el CJF y el TSJ CDMX' },
  { icon: 'calendar', t: `${24} años traduciendo desde 2002` },
  { icon: 'shield', t: 'Garantía de corrección o reembolso' },
  { icon: 'lock', t: 'Confidencialidad para información sensible' },
];

export const CREDENTIALS = [
  'Consejo de la Judicatura Federal', 'Tribunal Superior de Justicia CDMX', '16 de las 20 farmacéuticas más importantes del mundo',
  'Terminología ICH · FDA · COFEPRIS', 'Revisores con +15 años de experiencia', 'Desde 2002 en la Ciudad de México',
];

// ---- Documents we translate (presentation, "Tipos de traducción") — corporate only, never personal docs ----
export const DOCS = [
  { t: 'Contratos', i: 'file-text', uc: 'legal-pericial' },
  { t: 'Protocolos clínicos', i: 'flask', uc: 'investigacion-clinica' },
  { t: 'Dosieres de registro sanitario', i: 'pill', uc: 'registros-cofepris' },
  { t: 'Informes de auditoría', i: 'chart', uc: 'financiera-auditoria' },
  { t: 'Manuales de usuario', i: 'book', uc: 'manuales-tecnicos' },
  { t: 'Patentes', i: 'bulb', uc: 'patentes' },
  { t: 'Consentimientos informados', i: 'signature', uc: 'investigacion-clinica' },
  { t: 'Estados financieros', i: 'coins', uc: 'financiera-auditoria' },
  { t: 'Fichas técnicas', i: 'cog', uc: 'manuales-tecnicos' },
  { t: 'Licitaciones', i: 'stamp', uc: 'licitaciones-gobierno' },
];

// ---- Use cases (8) ----
export const USE_CASES = [
  {
    slug: 'legal-pericial', name: 'Traducción pericial y legal', card: 'Legal y pericial',
    img: 'uc-legal', img2: 'hero-seal', img3: 'certificados', split: 'hero-perito',
    h1a: 'Traducción pericial', h1b: 'y legal certificada',
    lead: 'Contratos, poderes, expedientes y documentación para juicios y trámites, firmados y sellados por perito traductor autorizado por el CJF o el TSJ de la CDMX. Desde $0.56 MXN por palabra en tu primer proyecto.',
    sTitle: 'Traducciones con validez ante tribunales y autoridades',
    sParas: [
      'Cuando un documento termina en un juzgado, una dependencia de gobierno o una autoridad reguladora, una traducción simple no basta: debe estar avalada por un perito traductor autorizado.',
      'Nuestros peritos están autorizados por el Consejo de la Judicatura Federal y el Tribunal Superior de Justicia de la Ciudad de México. Cada entregable lleva sello y firma, listo para presentación oficial.',
      'Despachos jurídicos, despachos contables y departamentos legales de empresas confían en Andromeda desde 2002 para documentos donde un rechazo cuesta meses.',
    ],
    checks: [
      ['Validez pericial', 'Sello y firma de perito autorizado por el CJF o el TSJ de la CDMX.'],
      ['Aceptación a la primera', 'Formato y terminología pensados para evitar observaciones por forma.'],
      ['Garantía de calidad', 'Corrección de cualquier error sin costo o reembolso ante inconformidad persistente.'],
    ],
    dTitle: 'Documentos legales que traducimos con frecuencia',
    dPara: 'Trabajamos para despachos jurídicos, despachos contables, departamentos legales, instituciones y dependencias de gobierno, autoridades reguladoras y juzgados. Algunos de los documentos más comunes:',
    docs: ['Contratos', 'Patentes', 'Normatividad', 'Documentación para trámites', 'Procedimientos administrativos y juicios', 'Políticas de privacidad', 'Términos y condiciones'],
    services: ['perito', 'expertos'],
    faq: [
      ['¿Cuándo necesito traducción pericial y cuándo una traducción profesional?', 'Depende de la autoridad o tribunal que recibirá el documento y de su uso. En la llamada revisamos tu caso, el formato requerido y confirmamos la vía correcta para evitar un rechazo por validez.'],
      ['¿Quién firma la traducción pericial?', 'Un perito traductor autorizado por el Consejo de la Judicatura Federal o por el Tribunal Superior de Justicia de la Ciudad de México.'],
      ['¿En qué idiomas ofrecen traducción pericial?', 'La traducción certificada por perito se realiza en inglés y español, y se ofrece en la Ciudad de México.'],
      ['¿Cuánto tarda una traducción pericial?', 'En servicio regular procesamos hasta 4,000 palabras en 24 horas; en servicio urgente, hasta 16,000 palabras en 24 horas. No hacemos entregas el mismo día de la solicitud.'],
    ],
  },
  {
    slug: 'registros-cofepris', name: 'Registros sanitarios COFEPRIS', card: 'Registros COFEPRIS',
    img: 'uc-farma', img2: 'uc-clinica', img3: 'revisor', split: 'uc-farma',
    h1a: 'Registros sanitarios', h1b: 'y trámites COFEPRIS',
    lead: 'Dosieres, información para prescribir, certificados de análisis y documentación regulatoria traducidos con terminología farmacéutica validada por expertos. TradIAH® desde $0.21 MXN por palabra en tu primer proyecto.',
    sTitle: 'Documentación regulatoria sin observaciones por traducción',
    sParas: [
      'Para obtener licencias y registros sanitarios, la autoridad exige la documentación en español. Un término inconsistente entre documentos puede detener un trámite completo.',
      'El sector farmacéutico es donde nació nuestra especialidad: hoy colaboramos con 16 de las 20 compañías farmacéuticas más importantes del mundo, desde comunicados internos hasta proyectos regulatorios complejos.',
      'Cada proyecto pasa por revisión de un segundo traductor con formación en medicina, química o farmacobiología, y por validación terminológica con glosarios creados con expertos del sector.',
    ],
    checks: [
      ['Terminología farmacéutica', 'Glosarios y bases terminológicas creados con expertos del sector.'],
      ['Consistencia entre documentos', 'Apego a tus glosarios bilingües y a tus materiales de referencia.'],
      ['Capacidad para dosieres', 'TradIAH®: hasta 80,000 palabras en 24 horas.'],
    ],
    dTitle: 'Documentación regulatoria que traducimos',
    dPara: 'Acompañamos a áreas de asuntos regulatorios en cada trámite y renovación. Algunos de los documentos más comunes:',
    docs: ['Dosieres y documentación para registros sanitarios', 'Información para prescribir', 'Certificados de análisis', 'Monografías de excipientes', 'Prospectos de empaque', 'PNO para procesos de fabricación', 'Informes periódicos de actualización de seguridad'],
    services: ['tradiah', 'expertos'],
    faq: [
      ['¿Qué solución recomiendan para un dosier de registro sanitario?', 'TradIAH® es ideal para expedientes de productos farmacéuticos: combina IA con validación de términos técnicos por expertos y un margen de error de 0.5% o menos. Si requieres apego estricto a glosarios, recomendamos Expertos en tu sector.'],
      ['¿Pueden trabajar con nuestro glosario corporativo?', 'Sí. Nos apegamos a tus glosarios bilingües y a tus materiales de referencia para mantener consistencia entre documentos y proyectos.'],
      ['¿Entregan con el mismo formato del original?', 'TradIAH® y Expertos en tu sector incluyen maquetación final como copia espejo del archivo original.'],
      ['¿Cuánto volumen pueden procesar?', 'TradIAH® procesa hasta 80,000 palabras en 24 horas en servicio extraurgente y hasta 800,000 en una semana.'],
    ],
  },
  {
    slug: 'investigacion-clinica', name: 'Investigación clínica', card: 'Investigación clínica',
    img: 'uc-clinica', img2: 'uc-farma', img3: 'revisor', split: 'uc-clinica',
    h1a: 'Investigación clínica', h1b: 'sin margen de error',
    lead: 'Protocolos, manuales del investigador, consentimientos informados y reportes de estudios clínicos traducidos por especialistas y revisados por un segundo experto. Desde $0.21 MXN por palabra en tu primer proyecto.',
    sTitle: 'Traducción para estudios clínicos y su documentación',
    sParas: [
      'Un protocolo o un consentimiento informado no admite ambigüedad: la seguridad del estudio y la aprobación de los comités dependen de que cada término sea exacto.',
      'Nuestros revisores cuentan con formación en medicina, química y farmacobiología, y validan la homogeneidad de los términos técnicos en todo el proyecto con glosarios creados con expertos.',
      'Con TradIAH® mantienes velocidad en volúmenes grandes; con Expertos en tu sector obtienes traducción 100% humana con garantía de corrección o reembolso.',
    ],
    checks: [
      ['Revisión por especialistas', 'Segundo traductor con formación médica o científica.'],
      ['Exactitud ≥ 99.5%', 'TradIAH® con margen de error de 0.5% o menos.'],
      ['Confidencialidad', 'Manejo controlado de información sensible del estudio.'],
    ],
    dTitle: 'Documentos de investigación clínica que traducimos',
    dPara: 'Trabajamos con patrocinadores, CROs y áreas médicas en cada fase del estudio. Algunos de los documentos más comunes:',
    docs: ['Protocolos de estudios clínicos', 'Manuales del investigador', 'Formularios de consentimiento informado', 'Informes y resultados de estudios clínicos', 'Artículos médicos', 'Protocolos y reportes de validación'],
    services: ['tradiah', 'expertos'],
    faq: [
      ['¿Quién revisa la terminología médica?', 'Un segundo traductor o equipo con más de 15 años de experiencia y/o formación en medicina, química o farmacobiología.'],
      ['¿Pueden mantener consistencia entre versiones de un protocolo?', 'Sí. Gestionamos glosarios y, con Expertos en tu sector, podemos entregarte las memorias de traducción de tu proyecto.'],
      ['¿Qué pasa si encuentro un error?', 'En Expertos en tu sector corregimos cualquier error sin costo adicional o hacemos un reembolso parcial o total ante una inconformidad persistente.'],
      ['¿Trabajan con archivos PDF y PowerPoint?', 'Sí. TradIAH® y Expertos en tu sector aceptan PDF, Word, Excel, PowerPoint, TXT, RTF, CSV y HTML.'],
    ],
  },
  {
    slug: 'financiera-auditoria', name: 'Finanzas y auditoría', card: 'Finanzas y auditoría',
    img: 'uc-financiero', img2: 'hero-cdmx', img3: 'revisor', split: 'uc-financiero',
    h1a: 'Traducción financiera', h1b: 'y de auditoría',
    lead: 'Estados financieros, informes de auditoría y reportes para reguladores, con precisión sin ambigüedad y validez pericial cuando el trámite lo exige. Desde $0.35 MXN por palabra en tu primer proyecto.',
    sTitle: 'Precisión para cierres, auditorías y reguladores',
    sParas: [
      'Los reportes financieros llegan con fechas límite y reguladores esperando. Una cifra mal referida o un término ambiguo puede reabrir una revisión completa.',
      'Traducimos informes financieros, balances, cuentas de resultados e informes fiscales para instituciones financieras, bancarias, aseguradoras, afianzadoras y consultoras.',
      'Cuando el documento debe presentarse ante una autoridad, nuestros peritos autorizados lo firman y sellan para darle validez oficial.',
    ],
    checks: [
      ['Precisión sin ambigüedad', 'Revisores con formación en finanzas y derecho.'],
      ['Validez cuando se requiere', 'Traducción pericial firmada y sellada por perito autorizado.'],
      ['Confidencialidad', 'Información financiera sensible manejada con control.'],
    ],
    dTitle: 'Documentos financieros que traducimos',
    dPara: 'Acompañamos a direcciones de finanzas y cumplimiento en cada auditoría y cierre. Algunos de los documentos más comunes:',
    docs: ['Informes financieros', 'Balances y cuentas de resultados', 'Informes de auditoría', 'Informes fiscales', 'Notas de investigación sobre bonos y acciones', 'Solicitudes de propuestas (RFP)', 'Comunicados de prensa financieros'],
    services: ['expertos', 'perito'],
    faq: [
      ['¿Pueden traducir un informe de auditoría con validez oficial?', 'Sí. Si el documento se presentará ante una autoridad, lo traduce y firma un perito traductor autorizado por el CJF o el TSJ de la CDMX.'],
      ['¿Cómo protegen la información financiera?', 'Manejamos la información sensible con control y claridad de proceso para que Finanzas y Cumplimiento puedan aprobar sin fricción.'],
      ['¿Ofrecen descuentos para reportes recurrentes?', 'Sí: 10% en proyectos de más de 20,000 palabras, 20% en más de 100,000 y 30% en más de un millón. Además, 30% en tu primer proyecto.'],
      ['¿Cuánto tarda?', 'Expertos en tu sector procesa hasta 40,000 palabras en 24 horas en servicio extraurgente. No hacemos entregas el mismo día de la solicitud.'],
    ],
  },
  {
    slug: 'manuales-tecnicos', name: 'Manuales técnicos y calidad', card: 'Manuales técnicos',
    img: 'uc-tecnico', img2: 'uc-patentes', img3: 'equipo', split: 'uc-tecnico',
    h1a: 'Manuales técnicos', h1b: 'y documentos de calidad',
    lead: 'Manuales de usuario, fichas técnicas, PNO y documentos de control de calidad para manufactura, automotriz y maquinaria. Tradmagia® desde $0.11 MXN por palabra en tu primer proyecto.',
    sTitle: 'Cada producto nuevo, cada manual, a tiempo',
    sParas: [
      'Cada línea de producción, cada producto importado o exportado y cada auditoría de calidad genera documentación que alguien tiene que traducir, y rápido.',
      'Con Tradmagia® procesamos hasta 500,000 palabras en 24 horas con un margen de error de 2% o menos; con TradIAH® sumamos maquetación espejo y validación de términos técnicos por expertos.',
      'Nuestros revisores tienen formación en ingenierías y validan la terminología con glosarios creados con expertos del sector.',
    ],
    checks: [
      ['Volumen y velocidad', 'Tradmagia®: hasta 500,000 palabras en 24 horas.'],
      ['Maquetación espejo', 'TradIAH® entrega con el mismo formato del original.'],
      ['Terminología técnica', 'Validada por revisores con formación en ingeniería.'],
    ],
    dTitle: 'Documentos técnicos que traducimos',
    dPara: 'Trabajamos con operaciones y calidad en manufactura, automotriz y maquinaria. Algunos de los documentos más comunes:',
    docs: ['Manuales de usuario', 'Instrucciones de instalación y funcionamiento', 'Fichas técnicas', 'Informes de seguridad', 'Manuales de mantenimiento y reparación', 'Documentos de control de calidad', 'Informes de inspección', 'PNO'],
    services: ['tradmagia', 'tradiah'],
    faq: [
      ['¿Qué solución conviene para un manual extenso?', 'Tradmagia® es ideal para proyectos extensos o muy urgentes; TradIAH® agrega maquetación espejo y validación de términos técnicos por expertos.'],
      ['¿Respetan el formato de mis archivos?', 'Tradmagia® se apega al formato de tus archivos; TradIAH® incluye maquetación final como copia espejo.'],
      ['¿Pueden traducir catálogos y material de ventas?', 'Sí. También traducimos catálogos de productos, guías de producto y material de ventas y marketing técnico.'],
      ['¿Hay descuento por volumen?', '10% en proyectos de más de 20,000 palabras, 20% en más de 100,000 y 30% en más de un millón de palabras.'],
    ],
  },
  {
    slug: 'patentes', name: 'Patentes', card: 'Patentes',
    img: 'uc-patentes', img2: 'uc-tecnico', img3: 'certificados', split: 'uc-patentes',
    h1a: 'Traducción de patentes', h1b: 'técnica y legal',
    lead: 'Patentes que exigen precisión técnica y rigor legal a la vez, traducidas por especialistas con revisión de un segundo experto. Desde $0.35 MXN por palabra en tu primer proyecto.',
    sTitle: 'Donde lo técnico y lo legal se encuentran',
    sParas: [
      'Una patente combina lenguaje técnico especializado con implicaciones legales: una reivindicación mal traducida puede cambiar el alcance de la protección.',
      'Traducimos patentes para el sector farmacéutico, técnico e industrial con traductores especialistas y revisores con formación en ingeniería, química y derecho.',
      'Si el trámite lo requiere, la traducción puede entregarse firmada y sellada por perito traductor autorizado.',
    ],
    checks: [
      ['Doble especialidad', 'Revisión técnica y legal de la terminología.'],
      ['Consistencia terminológica', 'Glosarios y memorias de traducción de tu proyecto.'],
      ['Validez pericial', 'Disponible cuando el trámite lo exige.'],
    ],
    dTitle: 'Documentos de propiedad intelectual que traducimos',
    dPara: 'Trabajamos con despachos, áreas legales y equipos de I+D. Algunos de los documentos más comunes:',
    docs: ['Patentes', 'Especificaciones técnicas', 'Artículos médicos y científicos', 'Normatividad', 'Documentación para trámites'],
    services: ['expertos', 'perito'],
    faq: [
      ['¿Quién traduce una patente farmacéutica?', 'Un traductor especialista y un segundo revisor con formación en el área correspondiente, como química, farmacobiología o ingeniería.'],
      ['¿Pueden certificar la traducción de una patente?', 'Sí, en inglés y español, con sello y firma de perito traductor autorizado por el CJF o el TSJ de la CDMX.'],
      ['¿Me entregan las memorias de traducción?', 'Sí. Con Expertos en tu sector podemos entregarte las memorias de traducción de tu proyecto.'],
      ['¿Qué pasa si hay un error?', 'Corregimos cualquier error sin costo adicional o hacemos un reembolso parcial o total ante una inconformidad persistente.'],
    ],
  },
  {
    slug: 'dispositivos-medicos', name: 'Dispositivos médicos', card: 'Dispositivos médicos',
    img: 'uc-dispositivos', img2: 'uc-farma', img3: 'revisor', split: 'uc-dispositivos',
    h1a: 'Dispositivos médicos', h1b: 'etiquetas e instructivos',
    lead: 'Instructivos de uso, etiquetas, manuales y documentación de registro para dispositivos médicos, con terminología exacta y maquetación espejo. Desde $0.21 MXN por palabra en tu primer proyecto.',
    sTitle: 'Instructivos y etiquetas que pasan la revisión',
    sParas: [
      'Un instructivo de uso o una etiqueta mal traducida puede generar observaciones en el registro o riesgos para el usuario final.',
      'Combinamos especialistas médicos y técnicos con validación terminológica para que cada instructivo, etiqueta y manual sea exacto y consistente.',
      'TradIAH® entrega con maquetación final como copia espejo, así tus archivos quedan listos para producción.',
    ],
    checks: [
      ['Terminología médica y técnica', 'Revisores con formación médica e ingenieril.'],
      ['Maquetación espejo', 'Etiquetas e instructivos listos para producción.'],
      ['Exactitud ≥ 99.5%', 'Con TradIAH® y validación por expertos.'],
    ],
    dTitle: 'Documentación de dispositivos médicos que traducimos',
    dPara: 'Acompañamos a fabricantes y distribuidores en registro, lanzamiento y mantenimiento. Algunos de los documentos más comunes:',
    docs: ['Instructivos de uso', 'Prospectos de empaque', 'Manuales de usuario', 'Fichas técnicas', 'Documentación para registros sanitarios', 'Informes de seguridad'],
    services: ['tradiah', 'expertos'],
    faq: [
      ['¿Entregan las etiquetas con el diseño original?', 'Sí. TradIAH® y Expertos en tu sector incluyen maquetación final como copia espejo.'],
      ['¿Quién valida la terminología?', 'Revisores con formación médica, química o en ingeniería, apoyados en glosarios creados con expertos del sector.'],
      ['¿Pueden trabajar con imágenes con texto?', 'Expertos en tu sector traduce tablas, textos e imágenes en PDF, Word, Excel y PowerPoint.'],
      ['¿Cuál es el monto mínimo?', 'El mínimo de facturación es de $2,000 MXN en Tradmagia® y TradIAH®, y de $500 MXN en Expertos en tu sector.'],
    ],
  },
  {
    slug: 'licitaciones-gobierno', name: 'Licitaciones y gobierno', card: 'Licitaciones y gobierno',
    img: 'uc-licitaciones', img2: 'hero-seal', img3: 'hero-cdmx', split: 'uc-licitaciones',
    h1a: 'Licitaciones', h1b: 'y trámites de gobierno',
    lead: 'Propuestas, bases de licitación y documentación para dependencias de gobierno y autoridades, con validez pericial cuando se requiere. Desde $0.35 MXN por palabra en tu primer proyecto.',
    sTitle: 'Propuestas completas, a tiempo y con validez',
    sParas: [
      'Una licitación tiene fecha de cierre y requisitos de forma. Un documento sin traducción válida puede descalificar una propuesta completa.',
      'Traducimos licitaciones, normatividad y documentación para trámites para empresas, instituciones y dependencias de gobierno.',
      'Definimos desde la cotización requisito de validez, formato y plan de entrega para que tu propuesta llegue completa antes del cierre.',
    ],
    checks: [
      ['Plan de entrega claro', 'Tiempos y formato definidos desde la cotización.'],
      ['Validez pericial', 'Sello y firma de perito autorizado cuando se requiere.'],
      ['Servicio urgente', 'Capacidad ampliada cuando el cierre se acerca.'],
    ],
    dTitle: 'Documentos para licitaciones y trámites que traducimos',
    dPara: 'Trabajamos con empresas proveedoras, instituciones y dependencias de gobierno. Algunos de los documentos más comunes:',
    docs: ['Licitaciones', 'Normatividad', 'Documentación para trámites', 'Procedimientos administrativos', 'Contratos', 'Solicitudes de propuestas (RFP)'],
    services: ['expertos', 'perito'],
    faq: [
      ['¿Pueden ayudarme con una licitación con fecha de cierre cercana?', 'Sí. Ofrecemos servicio urgente con capacidad ampliada; definimos tiempos desde la cotización. No hacemos entregas el mismo día de la solicitud.'],
      ['¿La traducción tendrá validez ante la dependencia?', 'Si se requiere, la firma y sella un perito traductor autorizado por el CJF o el TSJ de la CDMX.'],
      ['¿Trabajan con documentos escaneados?', 'Sí. Expertos en tu sector y Perito traductor trabajan con documentos con texto escaneado.'],
      ['¿Cómo inicio?', 'Agenda una cita o envía tu documento; te respondemos con solución, formato, tiempos y cotización.'],
    ],
  },
];

// ---- Languages (price sheet). EN↔ES is the base pair. ----
export const LANGS = [
  { slug: 'ingles', name: 'Inglés', adj: 'inglés', flag: '🇺🇸', img: 'lang-ingles', pair: 'inglés ↔ español', tier: 'base', perito: true, svcs: ['tradmagia', 'tradiah', 'expertos', 'perito'],
    note: 'Inglés es nuestro par principal: traducimos de inglés a español (México y Latinoamérica) y de español a inglés (Estados Unidos), en las cuatro soluciones, incluida la traducción certificada por perito.',
    tip: 'Para traducciones al inglés, indícanos si el documento se usará en Estados Unidos u otro país para ajustar terminología y convenciones.' },
  { slug: 'portugues', name: 'Portugués', adj: 'portugués', flag: '🇧🇷', img: 'lang-portugues', pair: 'portugués ↔ español · portugués ↔ inglés', tier: '+50% a +100%', perito: false, svcs: ['tradmagia', 'tradiah', 'expertos'],
    note: 'Traducimos de portugués a español (México y Latinoamérica), de español a portugués (Brasil), de portugués a inglés y de inglés a portugués.',
    tip: 'Portugués a español: tarifas y tiempos 50% mayores que inglés a español. Español o inglés a portugués (Brasil) y portugués a inglés: 100% mayores.' },
  { slug: 'frances', name: 'Francés', adj: 'francés', flag: '🇫🇷', img: 'lang-frances', pair: 'francés → español', tier: '+50%', perito: false, svcs: ['tradmagia', 'tradiah', 'expertos'],
    note: 'Traducimos de francés a español (México y Latinoamérica) con Tradmagia®, TradIAH® y Expertos en tu sector.',
    tip: 'Francés a español: tarifas y tiempos de entrega 50% mayores que los de inglés a español.' },
  { slug: 'italiano', name: 'Italiano', adj: 'italiano', flag: '🇮🇹', img: 'lang-italiano', pair: 'italiano → español', tier: '+50%', perito: false, svcs: ['tradmagia', 'tradiah', 'expertos'],
    note: 'Traducimos de italiano a español (México y Latinoamérica) con Tradmagia®, TradIAH® y Expertos en tu sector.',
    tip: 'Italiano a español: tarifas y tiempos de entrega 50% mayores que los de inglés a español.' },
  { slug: 'aleman', name: 'Alemán', adj: 'alemán', flag: '🇩🇪', img: 'lang-aleman', pair: 'alemán → español', tier: '+100%', perito: false, svcs: ['tradmagia', 'tradiah', 'expertos'],
    note: 'Traducimos de alemán a español (México y Latinoamérica) con Tradmagia®, TradIAH® y Expertos en tu sector.',
    tip: 'Alemán a español: tarifas y tiempos de entrega 100% mayores que los de inglés a español.' },
  { slug: 'japones', name: 'Japonés', adj: 'japonés', flag: '🇯🇵', img: 'lang-japones', pair: 'japonés → español', tier: '+100%', perito: false, svcs: ['tradmagia'],
    note: 'Traducimos de japonés a español (México y Latinoamérica) con Tradmagia®, nuestra traducción híbrida optimizada.',
    tip: 'Japonés a español: disponible en Tradmagia®, con tarifas y tiempos de entrega 100% mayores que los de inglés a español.' },
  { slug: 'chino', name: 'Chino', adj: 'chino', flag: '🇨🇳', img: 'lang-chino', pair: 'chino → español', tier: '+100%', perito: false, svcs: ['tradmagia'],
    note: 'Traducimos de chino a español (México y Latinoamérica) con Tradmagia®, nuestra traducción híbrida optimizada.',
    tip: 'Chino a español: disponible en Tradmagia®, con tarifas y tiempos de entrega 100% mayores que los de inglés a español.' },
  { slug: 'ruso', name: 'Ruso', adj: 'ruso', flag: '🇷🇺', img: 'lang-ruso', pair: 'ruso → español', tier: '+100%', perito: false, svcs: ['tradmagia'],
    note: 'Traducimos de ruso a español (México y Latinoamérica) con Tradmagia®, nuestra traducción híbrida optimizada.',
    tip: 'Ruso a español: disponible en Tradmagia®, con tarifas y tiempos de entrega 100% mayores que los de inglés a español.' },
];

export const INDUSTRIES = ['Médica y científica', 'Farmacéutica', 'Legal', 'Financiera', 'Técnica e industrial', 'Comercial'];

// No testimonials allowed — this replaces the reviews wall with what buyers demand before approving a vendor.
export const REQUIREMENTS = [
  ['Necesito evidencia de validez, un proceso claro y un entregable listo para presentación oficial.', 'Dirección Jurídica'],
  ['Si vamos a mover documentación sensible, necesito confidencialidad real y tiempos comprometidos desde la cotización.', 'Cumplimiento'],
  ['El dosier tiene que usar exactamente los mismos términos que los registros anteriores.', 'Asuntos Regulatorios'],
  ['El informe de auditoría llega con fecha límite y el regulador no espera.', 'Dirección de Finanzas'],
  ['Cada producto nuevo trae su manual. Necesito volumen sin perder la terminología.', 'Calidad y Operaciones'],
  ['El consentimiento informado no puede tener una sola ambigüedad.', 'Investigación Clínica'],
  ['La patente necesita precisión técnica y rigor legal al mismo tiempo.', 'Propiedad Intelectual'],
  ['La propuesta cierra el viernes y todos los anexos deben estar traducidos.', 'Licitaciones'],
  ['Quiero un solo proveedor que mantenga mis glosarios de un proyecto a otro.', 'Procurement'],
  ['Si hay un error, necesito saber que lo corrigen sin costo.', 'Dirección Jurídica'],
  ['Necesito que la etiqueta se entregue con el mismo diseño del original.', 'Asuntos Regulatorios'],
  ['Mi equipo no tiene tiempo de revisar la traducción. Tiene que llegar bien.', 'Dirección de Operaciones'],
];

export const FAQ_HOME = [
  ['¿Cuándo necesito traducción pericial y cuándo una traducción profesional?', 'Depende de la autoridad o tribunal destino y del uso del documento. En la llamada revisamos tu caso, el formato requerido y confirmamos la vía correcta para evitar un rechazo por validez.'],
  ['¿Cuánto cuesta una traducción?', 'Cobramos por palabra: Tradmagia® $0.15, TradIAH® $0.30, Expertos en tu sector $0.50 y Perito traductor $0.80 MXN (inglés a español, servicio regular). En tu primer proyecto tienes 30% de descuento, más descuentos por volumen desde 20,000 palabras.'],
  ['¿Cuánto tardan?', 'Depende de la solución y el volumen: desde 4,000 palabras en 24 horas (perito, servicio regular) hasta 500,000 palabras en 24 horas con Tradmagia® extraurgente. No hacemos entregas el mismo día de la solicitud.'],
  ['¿Cómo aseguran calidad y consistencia en documentos recurrentes?', 'Trabajamos con especialistas por industria, revisión de un segundo traductor con más de 15 años de experiencia y validación terminológica con glosarios creados con expertos del sector.'],
  ['¿Traducen documentos personales o interpretación?', 'No. Nos especializamos en traducción escrita de documentos corporativos: médicos, farmacéuticos, legales, financieros, técnicos y comerciales.'],
  ['¿Qué pasa si encuentro un error?', 'En Expertos en tu sector y Perito traductor corregimos cualquier error sin costo adicional o hacemos un reembolso parcial o total ante una inconformidad persistente.'],
];

export const CTA_FEATURES = [
  ['award', 'Calidad garantizada', 'Doble revisión y corrección de cualquier error sin costo.'],
  ['bolt', 'Capacidad real', 'Hasta 500,000 palabras en 24 horas con Tradmagia®.'],
  ['tag', 'Precio claro', 'Tarifa por palabra y 30% de descuento en tu primer proyecto.'],
  ['lock', 'Confidencial', 'Información sensible manejada con control de proceso.'],
];

export const lc = (s) => s.replace(/(^|\s)([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)/g, (m, sp, w) => sp + w.toLowerCase());
