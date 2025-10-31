export interface InnovationRDSection {
  id: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  content: string;
}

export const innovationRDSections: InnovationRDSection[] = [
  {
    id: 'section-1',
    title: 'INSPECTORS 360Â° â€“ IoT & AI Condition Monitoring Systems',
    slug: 'INSPECTORS-360-iot-ai-condition-monitoring',
    description: 'Our Condition-Based Monitoring (INSPECTORS 360Â°) solutions provide realtime asset health insights for rotating machinery, pipelines, offshore structures, and civil infrastructure.',
    image: '/INSPECTORS-monitoring-bg.jpg',
    content: `Our Condition-Based Monitoring (INSPECTORS 360Â°) solutions provide realtime asset health insights for rotating machinery, pipelines, offshore structures, and civil infrastructure.

**Capabilities:**

â€¢ **Wireless INSPECTORS Sensor Nodes**: Designed with Wi-Fi 6 & Bluetooth 6.0 for industrial rotating equipment & structural health monitoring.

â€¢ **Smart Sensor Integration**: Embedded vibration, thermal, strain, and acoustic sensors with microcontrollers (ESP32, STM32, nRF).

â€¢ **Edge Computing & AI**: Deployed AI models directly on sensors for anomaly detection & predictive maintenance.

â€¢ **Cloud-Based IoT Pipeline**: Implemented MQTT + database infrastructure for remote monitoring, reporting, and trend analysis.

**Applications**: Power plants, refineries, FPSOs, offshore jackets, mining equipment, and bridges.`
  },
  {
    id: 'section-2',
    title: 'AI & Robotics in NDT Testing & Inspection',
    slug: 'ai-robotics-ndt-testing-inspection',
    description: 'We integrate AI and robotics into traditional NDT services for higher accuracy, efficiency, and operator safety.',
    image: '/ai-robotics-bg.jpg',
    content: `We integrate AI and robotics into traditional NDT services for higher accuracy, efficiency, and operator safety.

**Key innovations include:**

â€¢ **AI-Powered NDT** â€“ Automated flaw detection in ultrasonic, radiographic, thermographic inspections.

â€¢ **Robotic Inspection** â€“ Crawlers, UAVs, and drones for high-risk inspections in pipelines, tanks, jackets, chimneys, and offshore assets.

â€¢ **Digital Twin Technology** â€“ Real-time 3D replicas of assets for structural health monitoring and lifecycle management.

â€¢ **Augmented Reality (AR)** â€“ Remote collaboration and inspection visualization.`
  },
  {
    id: 'section-3',
    title: 'Future Roadmap â€“ Smart Industry 4.0 Transformation',
    slug: 'future-roadmap-smart-industry-4-0',
    description: 'We continuously invest in R&D and emerging technologies to stay ahead of industrial challenges.',
    image: '/industry-4-0-bg.jpg',
    content: `We continuously invest in R&D and emerging technologies to stay ahead of industrial challenges.

**Our Focus Areas:**

â€¢ **5G-Enabled Remote Monitoring** â€“ ultra-fast, low-latency inspection networks

â€¢ **Digital Twin Ecosystems** â€“ advanced asset lifecycle & failure prediction

â€¢ **Smart Factories** â€“ end-to-end IoT integration for predictive maintenance

â€¢ **Green Energy & Sustainability** â€“ INSPECTORS solutions for wind, solar, and hydrogen plants

**Value Proposition:**

â€¢ **24/7 Global Reach** â€“ Inspectors & Experts across all continents

â€¢ **Certified Professionals** â€“ Compliance with ISO, ASME, API, ASTM, EN standards

â€¢ **Industry Coverage** â€“ Oil & Gas (Onshore/Offshore), Mining, Marine, FPSO/FSO, Power, and Infrastructure

â€¢ **Innovation Driven** â€“ IoT, AI, Robotics, Digital Twin, and Industry 4.0

**Tagline:** "360Â° Worldwide â€“ Redefining Testing, Inspection, and Monitoring through IoT, AI & Robotics."`
  }
];

// Function to get innovation-rd item by slug
export function getInnovationRDItemBySlug(slug: string): InnovationRDSection | undefined {
  return innovationRDSections.find(section => section.slug === slug);
}


