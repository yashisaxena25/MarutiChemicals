/**
 * Representative Product Capabilities & Interactive Orbit Demonstration Data
 * Note: These are demonstration names only. Client to provide confirmed product catalogue.
 */

export const PRODUCTS_DATA = [
  {
    id: 'p1',
    category: 'Fluid Handling & Process',
    name: 'Sanitary Diaphragm Valves & Manifolds',
    spec: '316L Stainless Steel / Ra < 0.4 µm',
    description: 'High-integrity flow regulation designed for sterile CIP/SIP routines and aseptic batch transfer systems.'
  },
  {
    id: 'p2',
    category: 'Contamination Control',
    name: 'Micro-filament Cleanroom Wipers',
    spec: 'ISO Class 4-7 Compatible / Non-linting',
    description: 'Continuous polyester microdenier construction with sealed ultrasonic borders for critical surface wipe-down.'
  },
  {
    id: 'p3',
    category: 'Hygienic Sealing',
    name: 'USP Class VI Tri-Clamp Elastomers',
    spec: 'Platinum-Cured Silicone / FKM / PTFE',
    description: 'Engineered for thermal endurance and zero extractables across high-purity pharmaceutical piping.'
  },
  {
    id: 'p4',
    category: 'Laboratory & Diagnostic',
    name: 'Precision Borosilicate Reaction Vessels',
    spec: 'Type 1 Class A Glass / Thermal Shock Resistant',
    description: 'Uniform wall thickness and standardized ground joints for repeatable analytical laboratory synthesis.'
  },
  {
    id: 'p5',
    category: 'Healthcare Infrastructure',
    name: 'Medical Gas Outlets & Distribution Gauges',
    spec: 'NFPA 99 / HTM 02-01 Standards Compliant',
    description: 'Modular wall consoles and continuous pressure integrity indicators for critical care and surgery suites.'
  },
  {
    id: 'p6',
    category: 'Process Filtration',
    name: 'Polyethersulfone (PES) Membrane Cartridges',
    spec: '0.22 µm Absolute Micron Rating',
    description: 'Validated bacterial retention and low protein-binding profiles for final bioburden filtration steps.'
  }
];

/**
 * Categorized demonstration products for the Multi-Ring Product Universe & Constellation:
 * - Inner Ring: Pharmaceutical Products (10 items)
 * - Middle Ring: Medical Equipment & Healthcare Supplies (11 items)
 * - Outer Ring: Cleanroom, Food Industry & Industrial Supplies (11 items)
 * Total: 32 items
 */
export const ORBIT_PRODUCTS = [
  // --- Pharmaceutical Industry ---
  { id: 'ph-01', ring: 'inner', name: 'Glass Vials', category: 'Pharmaceutical Packaging', sector: 'Pharmaceutical Industry', imageQuery: 'pharmaceutical glass vials laboratory white background' },
  { id: 'ph-02', ring: 'inner', name: 'Pharmaceutical Bottles', category: 'Liquid Containment', sector: 'Pharmaceutical Industry', imageQuery: 'amber pharmaceutical bottle dropper medicine white background' },
  { id: 'ph-03', ring: 'inner', name: 'Laboratory Reagents', category: 'Analytical Chemistry', sector: 'Pharmaceutical Industry', imageQuery: 'chemical reagent bottle laboratory glass white background' },
  { id: 'ph-04', ring: 'inner', name: 'Sterile Transfer Pipettes', category: 'Liquid Handling', sector: 'Pharmaceutical Industry', imageQuery: 'sterile plastic transfer pipette laboratory white background' },
  { id: 'ph-05', ring: 'inner', name: 'Micro Pipette Tips', category: 'Liquid Handling', sector: 'Pharmaceutical Industry', imageQuery: 'pipette tips rack laboratory sterile white background' },
  { id: 'ph-06', ring: 'inner', name: 'Laboratory Beakers', category: 'Laboratory Glassware', sector: 'Pharmaceutical Industry', imageQuery: 'borosilicate glass beaker laboratory measurement white background' },
  { id: 'ph-07', ring: 'inner', name: 'Graduated Measuring Cylinders', category: 'Volumetric Measuring', sector: 'Pharmaceutical Industry', imageQuery: 'graduated glass cylinder laboratory white background' },
  { id: 'ph-08', ring: 'inner', name: 'Petri Dishes', category: 'Microbiology & Culture', sector: 'Pharmaceutical Industry', imageQuery: 'sterile petri dish laboratory microbiology white background' },
  { id: 'ph-09', ring: 'inner', name: 'Centrifuge Tubes', category: 'Diagnostic Plasticware', sector: 'Pharmaceutical Industry', imageQuery: 'centrifuge tube conical sterile laboratory white background' },
  { id: 'ph-10', ring: 'inner', name: 'Chemical Storage Containers', category: 'High-Integrity Storage', sector: 'Pharmaceutical Industry', imageQuery: 'laboratory chemical storage bottle container white background' },

  // --- Hospitals & Healthcare ---
  { id: 'med-01', ring: 'middle', name: 'Sterile Surgical Gloves', category: 'Healthcare Consumables', sector: 'Hospitals & Healthcare', imageQuery: 'sterile surgical latex gloves medical healthcare white background' },
  { id: 'med-02', ring: 'middle', name: 'Medical Examination Masks', category: 'Clinical Consumables', sector: 'Hospitals & Healthcare', imageQuery: 'medical surgical face mask hospital grade white background' },
  { id: 'med-07', ring: 'middle', name: 'Medical Consumables', category: 'Hospital Supplies', sector: 'Hospitals & Healthcare', imageQuery: 'hospital medical consumables syringe gauze sterile white background' },
  { id: 'med-11', ring: 'middle', name: 'Sterile Packaging Materials', category: 'Aseptic Barrier', sector: 'Hospitals & Healthcare', imageQuery: 'medical sterilization pouch packaging roll white background' },

  // --- Medical Equipment & Supplies ---
  { id: 'med-03', ring: 'middle', name: 'Sterile Sample Containers', category: 'Specimen Collection', sector: 'Medical Equipment & Supplies', imageQuery: 'sterile specimen sample cup container red cap white background' },
  { id: 'med-04', ring: 'middle', name: 'Sample Collection Tubes', category: 'Diagnostic Extraction', sector: 'Medical Equipment & Supplies', imageQuery: 'blood collection tube vacuum tube medical diagnostic white background' },
  { id: 'med-05', ring: 'middle', name: 'Safety Goggles', category: 'PPE & Eye Protection', sector: 'Medical Equipment & Supplies', imageQuery: 'protective safety goggles medical laboratory eyewear white background' },
  { id: 'med-06', ring: 'middle', name: 'Safety Face Shields', category: 'Personnel Protection', sector: 'Medical Equipment & Supplies', imageQuery: 'medical safety face shield clear visor hospital white background' },
  { id: 'med-08', ring: 'middle', name: 'Diagnostic Reagent Trays', category: 'Diagnostic Plasticware', sector: 'Medical Equipment & Supplies', imageQuery: 'microplate 96 well diagnostic reagent tray laboratory white background' },
  { id: 'med-09', ring: 'middle', name: 'Laboratory Funnels', category: 'Fluid Transfer', sector: 'Medical Equipment & Supplies', imageQuery: 'glass laboratory funnel chemistry fluid transfer white background' },
  { id: 'med-10', ring: 'middle', name: 'Laboratory Accessories', category: 'Analytical Accessories', sector: 'Medical Equipment & Supplies', imageQuery: 'laboratory test tube rack scientific accessories white background' },

  // --- Clean Room Products ---
  { id: 'ind-01', ring: 'outer', name: 'Nitrile Examination Gloves', category: 'Cleanroom & Medical Consumables', sector: 'Clean Room Products', imageQuery: 'blue nitrile cleanroom gloves powder free white background' },
  { id: 'ind-02', ring: 'outer', name: 'Cleanroom Face Masks', category: 'Contamination Control', sector: 'Clean Room Products', imageQuery: 'cleanroom face mask lint free sterile white background' },
  { id: 'ind-03', ring: 'outer', name: 'Disposable Lab Coats', category: 'Protective Apparel', sector: 'Clean Room Products', imageQuery: 'white disposable lab coat cleanroom apparel protective white background' },
  { id: 'ind-04', ring: 'outer', name: 'Cleanroom Wipes', category: 'Contamination Control', sector: 'Clean Room Products', imageQuery: 'cleanroom wipes polyester microfiber non linting white background' },
  { id: 'ind-05', ring: 'outer', name: 'Antistatic Garments', category: 'Cleanroom Apparel', sector: 'Clean Room Products', imageQuery: 'esd cleanroom coverall antistatic suit white background' },
  { id: 'ind-06', ring: 'outer', name: 'Protective Shoe Covers', category: 'Barrier Consumables', sector: 'Clean Room Products', imageQuery: 'disposable blue shoe covers cleanroom medical booties white background' },
  { id: 'ind-07', ring: 'outer', name: 'Protective Coveralls', category: 'Cleanroom Barrier', sector: 'Clean Room Products', imageQuery: 'sterile protective coverall cleanroom suit white background' },
  { id: 'ind-08', ring: 'outer', name: 'Cleanroom Supplies', category: 'Controlled Environments', sector: 'Clean Room Products', imageQuery: 'cleanroom sticky mat tacky mat contamination control white background' },

  // --- Food Industry ---
  { id: 'ind-09', ring: 'outer', name: 'Disposable Protective Aprons', category: 'Hygienic Food Processing', sector: 'Food Industry', imageQuery: 'disposable polyethylene apron food processing hygienic white background' },
  { id: 'ind-10', ring: 'outer', name: 'Food Grade Sanitary Gaskets', category: 'Food-Grade Elastomers', sector: 'Food Industry', imageQuery: 'tri clamp silicone sanitary gasket food grade white background' },
  { id: 'ind-11', ring: 'outer', name: 'Food Grade Tubing', category: 'Fluid Handling', sector: 'Food Industry', imageQuery: 'clear food grade sanitary tubing silicone hose white background' }
];
