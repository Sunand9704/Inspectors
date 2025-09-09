export type INSPECTORSItem = {
  slug: string;
  title: string;
  image: string;
  description: string;
  details: string[];
};

export const inspectorsItems: INSPECTORSItem[] = [
  {
    slug: 'vibration-analysis-balancing',
    title: 'Vibration Analysis & Balancing',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657757/inspectors/inspectors/vibration-analysis-balancing/inspectors/inspectors/vibration-analysis-balancing/cover-photo.jpg',
    description: 'Condition diagnostics of rotating assets using vibration signatures and in-situ balancing.',
    details: [
      'Spectrum and time waveform analysis',
      'On-site dynamic balancing',
      'Bearing and alignment fault detection',
    ],
  },
  {
    slug: 'laser-shaft-alignment',
    title: 'Laser Shaft Alignment',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657758/inspectors/inspectors/laser-shaft-alignment/inspectors/inspectors/laser-shaft-alignment/cover-photo.jpg',
    description: 'Precision alignment to reduce vibration, bearing wear, and energy consumption.',
    details: ['Coupling and belt alignment', 'Soft-foot detection', 'Thermal growth compensation'],
  },
  {
    slug: 'remote-inspectors-iot-cloud',
    title: 'Remote CBM via IoT Sensor & Cloud Monitoring',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657759/inspectors/inspectors/remote-inspectors-iot-cloud/inspectors/inspectors/remote-inspectors-iot-cloud/cover-photo.jpg',
    description: 'Wireless sensors and dashboards for continuous asset health monitoring.',
    details: ['Edge devices and gateways', 'Alerting and analytics', 'Dashboards and reporting'],
  },
  {
    slug: 'infrared-thermography',
    title: 'Infrared Thermography Testing',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657761/inspectors/inspectors/infrared-thermography/inspectors/inspectors/infrared-thermography/cover-photo.jpg',
    description: 'Thermal imaging to detect hotspots, electrical faults, and insulation losses.',
    details: ['Electrical panel surveys', 'Mechanical hotspots', 'Building envelope assessment'],
  },
  {
    slug: 'lubrication-oil-analysis',
    title: 'Lubrication & Transformer Oil Analysis',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657762/inspectors/inspectors/lubrication-oil-analysis/inspectors/inspectors/lubrication-oil-analysis/cover-photo.jpg',
    description: 'Tribology and dielectric testing for predictive maintenance and reliability.',
    details: ['Wear debris analysis', 'Dielectric strength and DGA', 'Viscosity and contamination checks'],
  },
];

export function getInspectorsItemBySlug(slug: string): INSPECTORSItem | undefined {
  return inspectorsItems.find((i) => i.slug === slug);
}


