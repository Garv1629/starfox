export interface Project {
  id: string;
  name: string;
  location: string;
  category: 'Residential' | 'Commercial' | 'Kitchens & Millwork' | 'Hospitality';
  scope: string;
  area: string;
  year: string;
  heroImage: string;
  gallery: string[];
  brief: string;
  designApproach: string;
  materialsUsed: string[];
  highlights: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'ireo-victory-valley',
    name: 'Ireo Victory Valley',
    location: 'Sector 67, Gurugram',
    category: 'Residential',
    scope: 'Complete Turnkey Design & Civil Build',
    area: '3,800 sq.ft',
    year: '2023–2024',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1400&q=85'
    ],
    brief: 'A high-floor sky residence requiring bespoke Italian marble flooring, concealed climate control, seamless acoustic fluted wall cladding, and an integrated entertainment lounge crafted for tranquil luxury.',
    designApproach: 'We orchestrated an understated warm-ivory and bronze aesthetic. Architectural false ceiling with indirect warm linear coves compliments continuous book-matched Italian marble, creating a luminous sense of expanse above the city.',
    materialsUsed: [
      'Armani Bronze & Bottochino Italian Marble',
      'Smoked European Natural Oak Veneer',
      'Champagne PVD Metal Trim Profiles',
      'Hafele Concealed Architectural Hardware',
      'Fluted Acoustic Wall Fabric'
    ],
    highlights: [
      'Seamless concealed pocket doors separating private suites',
      'Bespoke curved dining credenza handcrafted in our workshop',
      'Smart circadian ambient lighting zones throughout'
    ]
  },
  {
    id: 'm3m-golf-estate',
    name: 'M3M Golf Estate',
    location: 'Sector 65, Golf Course Ext Rd, Gurugram',
    category: 'Residential',
    scope: '4 BHK Luxury Design-Build',
    area: '4,450 sq.ft',
    year: '2023',
    heroImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1400&q=85'
    ],
    brief: 'An expansive 4 BHK facing lush greens, requiring an open-concept layout that maximizes natural daylight while providing dedicated formal and informal hospitality zones.',
    designApproach: 'Implemented an open architectural flow anchored by a sculptural brass and fluted glass partition. Handcrafted bouclé seating and tailored stone consoles create a warm, inviting residential sanctuary.',
    materialsUsed: [
      'Staturaio Veined Slabs',
      'Textured Champagne Bronze Partitions',
      'Bespoke Bouclé & Italian Full-Grain Leather',
      'Hettich Soft-Motion Millwork Joinery'
    ],
    highlights: [
      'Floor-to-ceiling custom glass partition with champagne bronze finish',
      'Master walk-in wardrobe with acoustic leather-wrapped panels',
      'Custom marble breakfast counter integrated into modular kitchen'
    ]
  },
  {
    id: 'pareena-micasa',
    name: 'Pareena Micasa',
    location: 'Sector 68, Sohna Road, Gurugram',
    category: 'Residential',
    scope: '4 BHK Complete Interior Turnkey',
    area: '3,200 sq.ft',
    year: '2024',
    heroImage: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1400&q=85'
    ],
    brief: 'A young family requested a clutter-free contemporary apartment with ample concealed storage, child-safe rounded millwork, and a showcase modular kitchen.',
    designApproach: 'Utilised neutral taupe palettes paired with ribbed wood details. Full-height flush cabinetry eliminates visual noise, while warm architectural downlights elevate each zone.',
    materialsUsed: [
      'CenturyPly Marine Grade Frameworks',
      'Anti-Fingerprint Matte Acrylic Laminates',
      'Quartz Countertops with Waterfall Edging',
      'Warm LED Micro-Profile Lumina'
    ],
    highlights: [
      'Seamless floor-to-ceiling concealed storage walls',
      'Full kitchen renovation with Blum tandem boxes & quartz surfaces',
      'Curved headboard wall in master bedroom with integrated lighting'
    ]
  },
  {
    id: 'suncity-success-tower',
    name: 'Suncity Success Tower',
    location: 'Golf Course Extension Rd, Gurugram',
    category: 'Commercial',
    scope: '3,500 Sq.Ft Executive Corporate HQ',
    area: '3,500 sq.ft',
    year: '2023',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=85'
    ],
    brief: 'Design and turnkey fit-out for a financial consultancy headquarters, requiring executive boardrooms, sound-dampened acoustic phone booths, and a welcoming client lounge.',
    designApproach: 'Industrial elegance combined with warm architectural veneers. Glass partitions with black slim-profile aluminium preserve sightlines while ensuring acoustic confidentiality.',
    materialsUsed: [
      'Double-Glazed Acoustic Modular Partitions',
      'Action TESA High-Density Fibreboard',
      'Perforated Acoustic Timber Ceilings',
      'Commercial-Grade Interface Carpet Tiles'
    ],
    highlights: [
      'State-of-the-art 16-seater boardroom with integrated conference AV',
      'Bespoke reception feature counter in backlit Brazilian granite',
      'Delivered in record 48 working days with zero defect punchlist'
    ]
  },
  {
    id: 'm3m-merlin',
    name: 'M3M Merlin',
    location: 'Sector 67, Gurugram',
    category: 'Residential',
    scope: '3 BHK Minimalist Turnkey Interior',
    area: '2,400 sq.ft',
    year: '2023–2024',
    heroImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1400&q=85'
    ],
    brief: 'Client sought a Singaporean minimalist aesthetic: airy spaces, organic textures, understated luxury, and an ergonomic home studio.',
    designApproach: 'Clean geometrical volumes, pale limewash finishes on accent walls, custom slatted oak dividers, and minimalist matte-black architectural lighting fixtures.',
    materialsUsed: [
      'Smoked White Ash Wood Joinery',
      'Mineral Limewash Wall Finishes',
      'Merino Matte Architectural Laminates',
      'Italian Porcelain Micro-Tiles'
    ],
    highlights: [
      'Ergonomic sound-insulated study with built-in library millwork',
      'Concealed air-conditioning grilles for uninterrupted ceiling lines',
      'Custom floating vanity units in all en-suite bathrooms'
    ]
  },
  {
    id: 'spaze-palazo-office',
    name: 'Spaze Palazo Corporate Suite',
    location: 'Sector 69, Gurugram',
    category: 'Commercial',
    scope: '6,500 Sq.Ft Turnkey Fit-Out',
    area: '6,500 sq.ft',
    year: '2023',
    heroImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=85'
    ],
    brief: 'A fast-growing venture firm required an energetic, high-density yet breathable workspace accommodating 80+ team members with breakout zones and executive suites.',
    designApproach: 'Biophilic principles paired with acoustic ceiling baffles. Zoned workstations allow collaborative cross-pollination while maintaining sound containment near focus areas.',
    materialsUsed: [
      'Modular System Workstations with Cable Management',
      'Natural Preserved Moss Acoustic Walls',
      'Polyurethane Scratch-Resistant Desk Tops',
      'Commercial HVAC & Fire Safety Reticulation'
    ],
    highlights: [
      'Full MEP execution including low-voltage cabling and access control',
      'Cafeteria lounge with stadium seating for company all-hands',
      'Delivered strictly on schedule to avoid tenant rent overlap'
    ]
  },
  {
    id: 'modular-kitchen-showcase',
    name: 'The Culinary Atelier',
    location: 'DLF Phase V & Golf Course Rd',
    category: 'Kitchens & Millwork',
    scope: 'Bespoke Island Kitchen & Butler Pantry',
    area: '480 sq.ft',
    year: '2024',
    heroImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85'
    ],
    brief: 'Client desired a culinary centerpiece that seamlessly bridges the dining hall, pairing professional cooking capabilities with an entertainer island.',
    designApproach: 'German precision mechanisms paired with warm matte champagne and charcoal lacquer finishes. Zero visible handles, integrated touch-to-open appliances, and a concealed spice and prep pantry.',
    materialsUsed: [
      'KalingaStone Quartz Composite 20mm',
      'Hettich AvanTech YOU Drawer Systems',
      'Anti-Scratch Acrylic Super-Matte Shutters',
      'Smoked Glass Illuminated Display Cabinets'
    ],
    highlights: [
      'Cantilevered quartz dining counter seating six guests',
      'Servo-drive electric motorized wall lift cabinets',
      'Concealed butler kitchen for heavy wet cooking'
    ]
  },
  {
    id: 'luxury-hotel-ranchi',
    name: 'Grand Horizon Boutique Hotel',
    location: 'Ranchi, Jharkhand',
    category: 'Hospitality',
    scope: '58 Guest Rooms & Public Spaces Build',
    area: '42,000 sq.ft',
    year: '2022–2023',
    heroImage: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=85'
    ],
    brief: 'A full-scale hospitality turnkey build comprising 58 executive guest rooms, lobby lounge, multi-cuisine restaurant, and banquet interiors.',
    designApproach: 'Contemporary luxury grounded in local craft sensibility. High-durability finishes engineered to withstand heavy footfall without compromising tactile richness.',
    materialsUsed: [
      'Engineered Hardwood & Vitrified Slabs',
      'Fire-Retardant Upholstery Fabrics',
      'CenturyPly Commercial Ply Joinery',
      'Custom Brass PVD Chandelier Installations'
    ],
    highlights: [
      'Complete in-house manufacturing of all 58 room furniture sets',
      'Lobby double-height timber slat architectural canopy',
      'Turnkey project delivered 2 weeks ahead of grand opening deadline'
    ]
  }
];
