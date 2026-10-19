export interface ServiceChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  detailImage?: string;
  deliverables: string[];
  materials: string[];
  turnaroundTime: string;
  layoutVariant: 'image-left' | 'image-right' | 'full-width' | 'offset' | 'material-focus';
}

export const SERVICES: ServiceChapter[] = [
  {
    id: 'home-interiors',
    number: '01',
    title: 'Home Interiors',
    subtitle: 'Living rooms, master suites & private residential sanctuaries',
    description: 'We conceive residential spaces as cohesive living architecture. From civil layout modifications and smart circadian illumination to curated stone accents and acoustic zoning, every room is tailored around your family’s daily rituals, natural daylight angles, and personal aesthetic sensibility.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
    detailImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=85',
    deliverables: [
      'Comprehensive 3D Architectural Spatial Layouts',
      'Living & Dining Room Spatial Flow Planning',
      'Circadian Ambient Cove & Architectural Lighting',
      'Acoustic Paneling & Custom Wall Cladding'
    ],
    materials: ['Italian Armani Bronze Marble', 'Smoked European Natural Oak', 'Champagne PVD Trim', 'Bouclé Fabrics'],
    turnaroundTime: '60–90 Days Turnkey',
    layoutVariant: 'image-left'
  },
  {
    id: 'modular-kitchens',
    number: '02',
    title: 'Modular Kitchens',
    subtitle: 'German Precision Engineering & Seamless Culinary Ergonomics',
    description: 'The kitchen is the culinary sanctuary of the modern residence. We engineer kitchens uniting German soft-motion hardware, stain-proof composite quartz worktops, and anti-scratch acrylics with concealed prep pantries and bespoke island breakfast counters built for seamless entertaining.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=85',
    detailImage: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=600&q=85',
    deliverables: [
      'Ergonomic Work Triangle & Island Zoning',
      'Hettich & Hafele Soft-Close Hardware Integration',
      'Anti-Scratch Acrylic & High-Gloss PU Shutters',
      'Concealed Butler & Spice Storage Pantries'
    ],
    materials: ['KalingaStone & Silestone Quartz', 'BWP Marine Ply (CenturyPly)', 'Anodized Aluminum Profiles', 'Integrated LED Warm Profiles'],
    turnaroundTime: '30–45 Days Turnkey',
    layoutVariant: 'image-right'
  },
  {
    id: 'custom-wardrobes',
    number: '03',
    title: 'Custom Wardrobes & Storage',
    subtitle: 'Architectural Walk-In Closets & Master En-Suite Storage',
    description: 'Intelligently partitioned storage that transforms morning dressing into a calm, organized ritual. Featuring acoustic fabric linings, sensor-activated shelf illumination, tinted fluted glass portals, and bespoke jewelry, watch, and valet inserts.',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85',
    detailImage: 'https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=600&q=85',
    deliverables: [
      'Walk-In Wardrobe Spatial Modeling & Valet Units',
      'Fluted & Tinted Toughened Glass Sliding Portals',
      'Sensor-Triggered Indirect LED Shelf Lighting',
      'Custom Jewelry, Watch & Footwear Organization'
    ],
    materials: ['Action TESA HDHMR Core', 'Fluted Champagne Glass', 'Italian Leather Pulls', 'Velvet Jewelry Organizers'],
    turnaroundTime: '25–35 Days Turnkey',
    layoutVariant: 'full-width'
  },
  {
    id: 'commercial-interiors',
    number: '04',
    title: 'Commercial Interiors',
    subtitle: 'Executive Workspaces, Boardrooms & Corporate Turnkey Fit-Outs',
    description: 'We build commercial environments that inspire productivity, convey prestige, and foster collaborative focus. From sound-isolated executive boardrooms to energetic collaborative zones, our fit-outs adhere strictly to corporate delivery deadlines.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85',
    detailImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=85',
    deliverables: [
      'Acoustic Boardroom & Conference Architecture',
      'Modular Ergonomic Workstations with Integrated Cable Trays',
      'Reception Sculptural Counters & Feature Branding Walls',
      'Turnkey HVAC, Electrical, Fire Safety & Low-Voltage Wiring'
    ],
    materials: ['Double-Glazed Acoustic Glass', 'Perforated Acoustic Timber', 'Commercial Interface Carpet', 'Micro-Topping Concrete'],
    turnaroundTime: '45–75 Days Turnkey',
    layoutVariant: 'offset'
  },
  {
    id: 'turnkey-execution',
    number: '05',
    title: 'Turnkey Interior Execution',
    subtitle: 'Single-Source Civil Engineering, MEP & White-Glove Handover',
    description: 'Complete peace of mind. We take full single-source accountability for civil masonry, waterproofing, structural alterations, premium plumbing, electrical rewiring, and micro-cement surfaces with dedicated on-site site supervisors and zero subcontractor chaos.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    detailImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=85',
    deliverables: [
      'Single-Point Accountability from Civil Build to Soft Staging',
      'Advanced Wet-Area Waterproofing Guarantee',
      'Dedicated On-Site Project Engineer & Weekly Milestone Reports',
      '120-Point Quality Inspection & White-Glove Deep Cleaning'
    ],
    materials: ['Dr. Fixit Advanced Waterproofing', 'Ultratech Precision Cement', 'Schneider Unica Modular Switches', 'Asian Paints Royale Aspira'],
    turnaroundTime: '45–90 Days Turnkey',
    layoutVariant: 'material-focus'
  }
];
