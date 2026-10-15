/**
 * The 5 Exact Required Industry Categories (Per Part 5 of Master Prompt)
 *
 * 01. Pharmaceutical Industry
 * 02. Food Industry
 * 03. Hospitals & Healthcare
 * 04. Medical Equipment & Supplies
 * 05. Clean Room Products
 */

export const INDUSTRIES_DATA = [
  {
    id: 'pharma',
    number: '01',
    title: 'Pharmaceutical Industry',
    tagline: 'Sterile Processing & Ultra-pure Fluid Containment',
    description: 'Products that support sterile manufacturing, contamination control, quality assurance, and pharmaceutical production processes.',
    details: [
      'Clean steam and high-purity water handling components',
      'Sanitary grade seals, gaskets, and process valves',
      'Batch traceability documentation & compliance packages'
    ],
    accent: '#0d9488', // Deep teal
    iconType: 'flask'
  },
  {
    id: 'food',
    number: '02',
    title: 'Food Industry',
    tagline: 'Hygienic Standards & Food-grade Integrity',
    description: 'Solutions that assist food manufacturers in maintaining hygiene, quality control, and regulatory compliance throughout production.',
    details: [
      'FDA-compliant elastomers and CIP/SIP cleaning essentials',
      'Non-contaminating industrial lubricants & fluid valves',
      'Hygienic pipeline couplings and pressure monitoring'
    ],
    accent: '#15803d', // Organic forest green
    iconType: 'wheat'
  },
  {
    id: 'healthcare',
    number: '03',
    title: 'Hospitals & Healthcare',
    tagline: 'Clinical Reliability & Diagnostic Dependability',
    description: 'Dependable medical consumables and essential healthcare products for hospitals, diagnostic laboratories, and clinics.',
    details: [
      'Diagnostic fluid consumables and sterile sample containers',
      'Medical gas terminal connections and pressure regulators',
      'Clinical disinfection supplies and surface barrier protocols'
    ],
    accent: '#2563eb', // Precise cobalt
    iconType: 'hospital'
  },
  {
    id: 'equipment',
    number: '04',
    title: 'Medical Equipment & Supplies',
    tagline: 'Precision Components & Hospital Infrastructure',
    description: 'Quality products used in patient care, laboratory operations, cleanrooms, and hospital infrastructure.',
    details: [
      'OEM mechanical assemblies for laboratory instrumentation',
      'Calibrated tubing, connectors, and fluid path manifolds',
      'Durable diagnostic hardware accessories'
    ],
    accent: '#0284c7', // Slate sky blue
    iconType: 'stethoscope'
  },
  {
    id: 'cleanroom',
    number: '05',
    title: 'Clean Room Products',
    tagline: 'Engineered Contamination & Airflow Control',
    description: 'Contamination-control consumables engineered for controlled environments and sterile operations.',
    details: [
      'Low-particulate wipers, swabs, and tacky floor mats',
      'HEPA/ULPA terminal diffusers and differential pressure gauges',
      'Sterile apparel, isolator gloves, and barrier consumables'
    ],
    accent: '#0891b2', // Crisp cyan/teal
    iconType: 'airflow'
  }
];
