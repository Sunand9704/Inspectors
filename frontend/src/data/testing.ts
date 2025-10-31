export type TestingSection = {
  slug: string;
  title: string;
  image: string;
  description: string;
  details: string[];
};

export const testingSections: TestingSection[] = [
  {
    slug: 'visual-testing',
    title: 'Visual Testing',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657735/INSPECTORS/testing/visual-testing/INSPECTORS/testing/visual-testing/cover-photo.jpg',
    description: 'Surface-level visual inspection to detect defects and anomalies.',
    details: [
      'Direct and remote visual inspection',
      'Corrosion and coating assessment',
      'Weld bead evaluation',
    ],
  },
  {
    slug: 'drone-inspection',
    title: 'Drone Inspection',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657737/INSPECTORS/testing/drone-inspection/INSPECTORS/testing/drone-inspection/cover-photo.jpg',
    description: 'Aerial inspections for hard-to-reach assets using UAVs.',
    details: ['Confined space and elevated assets', 'Thermal imaging options', 'High-resolution photogrammetry'],
  },
  {
    slug: 'borescope-inspection',
    title: 'Borescope Inspection',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657739/INSPECTORS/testing/borescope-inspection/INSPECTORS/testing/borescope-inspection/cover-photo.jpg',
    description: 'Remote visual inspection of internal components and cavities.',
    details: ['Articulating scopes', 'High-intensity lighting', 'Digital capture and reporting'],
  },
  {
    slug: 'ultrasonic-testing',
    title: 'Ultrasonic Testing',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657740/INSPECTORS/testing/ultrasonic-testing/INSPECTORS/testing/ultrasonic-testing/cover-photo.jpg',
    description: 'High-frequency sound waves to detect internal flaws.',
    details: ['Thickness gauging', 'Shear-wave and straight-beam', 'Weld inspection'],
  },
  {
    slug: 'phased-array-ut',
    title: 'Phased Array Ultrasonic Testing',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657741/INSPECTORS/testing/phased-array-ut/INSPECTORS/testing/phased-array-ut/cover-photo.jpg',
    description: 'Advanced UT with steerable beams for complex geometries.',
    details: ['Sectorial scanning', 'Encoded mapping', 'Complex welds and components'],
  },
  {
    slug: 'guided-wave-lrut',
    title: 'Guided Wave & LRUT',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657742/INSPECTORS/testing/guided-wave-lrut/INSPECTORS/testing/guided-wave-lrut/cover-photo.png',
    description: 'Long-range ultrasonic screening for pipelines and piping.',
    details: ['Buried or insulated lines', 'Screening over long distances', 'Pinpoint follow-up'],
  },
  {
    slug: 'liquid-penetrant-testing',
    title: 'Liquid Penetrant Testing',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657744/INSPECTORS/testing/liquid-penetrant-testing/INSPECTORS/testing/liquid-penetrant-testing/cover-photo.jpg',
    description: 'Capillary action reveals surface-breaking defects.',
    details: ['Visible and fluorescent systems', 'Portable or lab processing', 'Crack and leak detection'],
  },
  {
    slug: 'radiographic-testing',
    title: 'Radiographic Testing',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657746/INSPECTORS/testing/radiographic-testing/INSPECTORS/testing/radiographic-testing/cover-photo.png',
    description: 'X-ray or gamma imaging to visualize internal discontinuities.',
    details: ['Film or digital radiography', 'Welds and castings', 'Code-compliant techniques'],
  },
  {
    slug: 'magnetic-particle-testing',
    title: 'Magnetic Particle & Fluorescent MT',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657748/INSPECTORS/testing/magnetic-particle-testing/INSPECTORS/testing/magnetic-particle-testing/cover-photo.jpg',
    description: 'Magnetization reveals surface and near-surface indications.',
    details: ['Yoke and bench methods', 'AC/DC magnetization', 'Wet fluorescent'],
  },
  {
    slug: 'eddy-current-testing',
    title: 'Eddy Current Testing',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657750/INSPECTORS/testing/eddy-current-testing/INSPECTORS/testing/eddy-current-testing/cover-photo.jpg',
    description: 'Electromagnetic method for surface and sub-surface flaws.',
    details: ['Surface cracks', 'Tubing inspection', 'Conductivity measurements'],
  },
  {
    slug: 'time-of-flight-diffraction',
    title: 'Time of Flight Diffraction',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657751/INSPECTORS/testing/time-of-flight-diffraction/INSPECTORS/testing/time-of-flight-diffraction/cover-photo.jpg',
    description: 'Accurate defect sizing using diffracted ultrasonic waves.',
    details: ['Weld flaw sizing', 'High-accuracy depth measurement', 'Complementary to PAUT'],
  },
  {
    slug: 'hardness-testing',
    title: 'Hardness Testing',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657752/INSPECTORS/testing/hardness-testing/INSPECTORS/testing/hardness-testing/cover-photo.jpg',
    description: 'Material hardness verification using standard methods.',
    details: ['Portable and bench methods', 'Brinell, Rockwell, Vickers', 'Heat-treatment verification'],
  },
  {
    slug: 'lifting-gear-load-testing',
    title: 'Lifting Gear Load Testing',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657753/INSPECTORS/testing/lifting-gear-load-testing/INSPECTORS/testing/lifting-gear-load-testing/cover-photo.jpg',
    description: 'Proof load tests for cranes, slings, hooks, and lifting gear.',
    details: ['On-site load testing', 'Certificates of compliance', 'Periodic inspection programs'],
  },
  {
    slug: 'leak-testing',
    title: 'Leak Testing',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657755/INSPECTORS/testing/leak-testing/INSPECTORS/testing/leak-testing/cover-photo.jpg',
    description: 'Helium, pressure decay, or bubble testing for leak detection.',
    details: ['Helium mass spectrometry', 'Pressure decay', 'Vacuum box testing'],
  },
  {
    slug: 'positive-material-identification',
    title: 'Positive Material Identification',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657756/INSPECTORS/testing/positive-material-identification/INSPECTORS/testing/positive-material-identification/cover-photo.jpg',
    description: 'Alloy verification and chemistry using XRF or OES.',
    details: ['On-site XRF', 'Laboratory OES', 'Material traceability'],
  },
];

export function getTestingSectionBySlug(slug: string): TestingSection | undefined {
  return testingSections.find((s) => s.slug === slug);
}



