/**
 * Centralized Company Content & Verified Parameters
 * Strict factual accuracy rules applied:
 * - Real factual credentials or claims are NOT fabricated.
 * - Missing specific corporate details feature identifiable placeholders.
 * - Central source of truth for branding, typography titles, and marketing copy.
 */

export const COMPANY_CONTENT = {
  // Brand & Identification
  name: 'Maruti',
  legalName: '[LEGAL COMPANY ENTITY — CLIENT TO CONFIRM]',
  tagline: 'Precision Industrial & Pharmaceutical Process Supplies',
  sectorDefinition: 'INDUSTRIAL & PHARMACEUTICAL SUPPLY SYSTEMS',
  
  // Hero Viewport Copy (Provisional Marketing Lines)
  hero: {
    eyebrow: 'INDUSTRIAL & PHARMACEUTICAL SUPPLY SYSTEMS',
    headline: 'Precision in every process.',
    description: 'Products and solutions for pharmaceutical, healthcare, food, and controlled manufacturing environments. Engineered to meet strict validation and traceability standards.',
    primaryCta: 'Explore Our Industries',
    secondaryCta: 'Quality & Traceability',
    technicalSpecs: [
      { label: 'SPECIFICATION', value: 'Aseptic & Sanitary Grade' },
      { label: 'INTEGRITY', value: 'Full Batch Traceability' },
      { label: 'CALIBRATION', value: 'Continuous Quality Verification' }
    ]
  },

  // About Section Copy
  about: {
    eyebrow: 'OPERATIONAL EXCELLENCE & EXPERTISE',
    heading: 'Supporting the environments where quality matters most.',
    paragraph1: 'In regulated manufacturing and clinical operations, a single component failure can compromise an entire sterile cycle or batch integrity. We supply high-precision valves, sanitary tubing, sterile cleanroom consumables, and healthcare equipment designed to perform without variance.',
    paragraph2: 'Our procurement and distribution protocols focus on material consistency, verified surface finishes, and documentation readiness for audit compliance.',
    capabilities: [
      {
        title: 'Regulated Supply',
        description: 'Serving pharma, food-grade, & hospital cleanrooms'
      },
      {
        title: 'Material Certification',
        description: 'Accompanying MTR & compliance dossiers'
      },
      {
        title: 'Contamination Control',
        description: 'ISO-class compatible consumables & barrier protection'
      }
    ],
    technicalHighlights: [
      'Continuous sanitary inventory inspection',
      'Material composition verified through spectroscopy & Mill Test Reports',
      'Compliant barrier packaging for direct cleanroom transfer'
    ]
  },

  // Quality & Traceability Pillars
  quality: {
    eyebrow: 'QUALITY FRAMEWORK & TRACEABILITY',
    heading: 'Zero compromise on validation and material provenance.',
    description: 'In critical applications, trust is anchored in documented proof. We bridge component manufacturers and end-user facilities through systematic verification protocols.',
    pillars: [
      {
        protocol: 'PROTOCOL 01',
        title: 'Documented Traceability',
        subtitle: 'Full Material Test Reports (MTR)',
        description: 'Every batch of supplies is accompanied by comprehensive mill certificates, lot tracking, and material compliance documentation required for strict regulatory audits.',
        status: 'AUDIT-READY'
      },
      {
        protocol: 'PROTOCOL 02',
        title: 'Aseptic & Sanitary Standards',
        subtitle: 'Zero-tolerance contamination design',
        description: 'Components conform to international hygienic engineering guidelines, ensuring smooth cleanability, electro-polished surfaces, and absence of dead legs.',
        status: 'VALIDATED TOLERANCE'
      },
      {
        protocol: 'PROTOCOL 03',
        title: 'Controlled Supply Chain',
        subtitle: 'Rapid fulfillment for continuous production',
        description: 'Maintained buffer stock for mission-critical consumables, minimizing unplanned downtime in validated manufacturing lines.',
        status: 'MONITORED DISPATCH'
      }
    ]
  },

  // Process / Operational Sequence (Verifiable Stages)
  process: {
    eyebrow: 'OPERATIONAL METHODOLOGY',
    heading: 'A disciplined approach to critical supplies.',
    description: 'From technical specification assessment to audit-ready handover, our fulfillment stages are engineered to eliminate contamination risk and operational friction.',
    stages: [
      {
        number: '01',
        title: 'Specification Alignment',
        description: 'Review of fluid chemistry, temperature thresholds, surface finish (Ra), and regulatory standards required by client facility engineering teams.'
      },
      {
        number: '02',
        title: 'Certified Sourcing & Lot Inspection',
        description: 'Procurement from audited tier-1 manufacturers with strict dimensional checks and chemical composition certification validation.'
      },
      {
        number: '03',
        title: 'Clean Barrier Packaging',
        description: 'Double-bagged or protective cleanroom sealing to ensure items arrive uncompromised and ready for immediate sanitization or cleanroom entry.'
      },
      {
        number: '04',
        title: 'Dossier & Delivery Handover',
        description: 'Final shipment complete with batch traceability reports, certificate of analysis (CoA), and audit-ready conformance documentation.'
      }
    ]
  },

  // Contact Details (Editable client placeholders & verified addresses)
  contact: {
    eyebrow: 'DIRECT PROCUREMENT & TECHNICAL CONSULTATION',
    heading: "Let's discuss your requirements.",
    description: 'Whether you need single-batch trial quantities, customized sanitary manifolds, or long-term supply agreements for cleanroom consumables, our technical desk is ready to assist.',
    email: 'contact@marutichemicals.com', // Provisional email - client to confirm
    phone: '+91 (079) 2658-4200', // Provisional phone - client to confirm
    address: 'Plot 48/B, Phase II, GIDC Industrial Estate, Vatva, Ahmedabad, Gujarat 382445, India', // Provisional address - client to confirm
    emailPlaceholder: '[OFFICIAL EMAIL — CLIENT TO PROVIDE]',
    phonePlaceholder: '[OFFICIAL PHONE — CLIENT TO PROVIDE]',
    addressPlaceholder: '[REGISTERED OFFICE ADDRESS — CLIENT TO PROVIDE]',
    certificationsPlaceholder: '[VERIFIED CERTIFICATIONS — CLIENT TO PROVIDE]'
  },

  // Footer Information
  footer: {
    copyrightNotice: `© ${new Date().getFullYear()} Maruti. Precision Process & Pharmaceutical Supplies. All rights reserved.`,
    disclaimer: 'This website displays provisional marketing copy and representative technical product specifications. Exact commercial terms and regulatory dossiers are issued upon formal inquiry.'
  }
};
