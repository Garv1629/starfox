export interface MaterialEditorialChapter {
  id: string;
  discipline: string;
  title: string;
  headline: string;
  leadCopy: string;
  narrative: string;
  image: string;
  detailImage?: string;
  tactileAttributes: string[];
  architecturalApplication: string;
  sourcingNote: string;
  layoutType: 'oversized-hero' | 'split-typography' | 'offset-labels' | 'fullwidth-transition' | 'closing-detail';
}

export const MATERIAL_CHAPTERS: MaterialEditorialChapter[] = [
  {
    id: 'natural-stone',
    discipline: 'A. Architectural Stone',
    title: 'Natural Stone',
    headline: 'Continuous Veining & Geological Memory',
    leadCopy: 'Every slab carries millions of years of subterranean pressure, crystal formation, and natural mineral movement.',
    narrative: 'We hand-select Italian and Spanish blocks for continuous grain flow across expansive living room surfaces, honed bathroom vanities, and dining consoles. Honed finishes provide a soft, matte tactile warmth that absorbs ambient light rather than creating artificial surface reflections.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
    detailImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
    tactileAttributes: ['Book-Matched Vein Alignment', 'Honed Low-Reflectance Polish', 'Mitered Waterfall Edge Details', 'Subtle Mineral Depth'],
    architecturalApplication: 'Living Room Flooring, Feature Fireplace Accents, Island Worktops & En-Suite Vanity Enclosures',
    sourcingNote: 'Honed Italian Armani Bronze & Carrara Statuario Slabs',
    layoutType: 'oversized-hero'
  },
  {
    id: 'wood-and-joinery',
    discipline: 'B. Timber & Fine Millwork',
    title: 'Wood and Joinery',
    headline: 'Warm Grain Nuances & Millimeter Craftsmanship',
    leadCopy: 'Authentic timber breathes with the room, bringing tactile warmth and acoustic serenity to architectural interiors.',
    narrative: 'From thermally treated smoked European oak to American walnut, our in-house atelier crafts bespoke architectural wall paneling, fluted partitions, and seamless pocket portals. Hand-applied natural biological oils preserve the open-pore tactile grain so the surface feels organic to the human touch.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85',
    detailImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    tactileAttributes: ['Open-Pore Natural Grain Touch', 'Concealed Mortise & Tenon Joints', 'Fluted Dimensional Textures', 'Zero-VOC Biological Oil Seal'],
    architecturalApplication: 'Bespoke Credenzas, Fluted Room Dividers, Acoustic Library Millwork & Concealed Portals',
    sourcingNote: 'FSC-Certified Smoked European Oak & Marine-Grade Core',
    layoutType: 'split-typography'
  },
  {
    id: 'fabrics-and-textures',
    discipline: 'C. Textiles & Soft Architecture',
    title: 'Fabrics and Soft Textures',
    headline: 'The Interplay of Woven Fiber and Natural Light',
    leadCopy: 'Soft surfaces modulate room acoustics, absorb harsh echoes, and introduce intimate physical comfort.',
    narrative: 'We curate heavy looped wool bouclés from northern mills, breathable Belgian linen drapery, and supple full-grain aniline leathers. These tactile textiles catch morning and dusk daylight differently, creating subtle shifts in tone and temperature throughout the day.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=85',
    detailImage: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85',
    tactileAttributes: ['Looped High-Density Bouclé Weave', 'Unrefined Organic Belgian Linen', 'Full-Grain Patina-Aging Leather', 'Acoustic Sound Absorption'],
    architecturalApplication: 'Curved Atelier Seating, Acoustic Wall Panels, Master Bed Enclosures & Custom Window Drapery',
    sourcingNote: 'Northern European Looped Bouclés & Full-Grain Aniline Leathers',
    layoutType: 'offset-labels'
  },
  {
    id: 'metal-and-hardware',
    discipline: 'D. Architectural Metals',
    title: 'Metal and Hardware',
    headline: 'Restrained Bronze Accents & Silent Precision',
    leadCopy: 'Hardware is the tactile touchpoint where human hands physically engage with the architectural built environment daily.',
    narrative: 'We eschew harsh chrome and garish gold in favor of brushed champagne bronze, muted PVD coatings, and patinated gunmetal. Integrated with German soft-close engineering from Hettich and Hafele, every drawer, pocket door, and closet portal moves with weightless, silent deceleration.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
    detailImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85',
    tactileAttributes: ['Brushed Champagne Bronze PVD', 'Concealed German Runner Mechanisms', 'Ribbed Architectural Fluted Profiles', 'Weightless Soft-Close Motion'],
    architecturalApplication: 'Sliding Portal Frames, Architectural Handles, Custom Wardrobe Profiles & Island Trim Details',
    sourcingNote: 'Precision Anodized Bronze & Hettich Sensys / AvanTech Systems',
    layoutType: 'fullwidth-transition'
  },
  {
    id: 'lighting-and-shadow',
    discipline: 'E. Light and Shadow',
    title: 'Lighting and Shadow',
    headline: 'Sculpting Architectural Depth and Spatial Calm',
    leadCopy: 'Light is the intangible material that defines how all physical surfaces, textures, and dimensions are experienced.',
    narrative: 'We design lighting as a multi-layered architectural medium rather than static ceiling fixtures. Concealed 2700K warm LED channels wash vertical stone textures, indirect cove illumination highlights timber grain ceilings, and focused glare-free architectural spots celebrate curated art and millwork details.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    detailImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    tactileAttributes: ['2700K Circadian Warm Spectrum', 'Glare-Free Deep Baffle Downlights', 'Concealed Grazing Light Profiles', 'Shadow Depth & Spatial Dimension'],
    architecturalApplication: 'Architectural Coves, Fluted Wall Grazing, Floating Plinth Lumina & Reading Niches',
    sourcingNote: 'High CRI 95+ Architectural Warm LED Profiles',
    layoutType: 'closing-detail'
  }
];

export interface BrandPartner {
  name: string;
  category: string;
  logo: string;
  relationship: string;
}

export const BRAND_PARTNERS: BrandPartner[] = [
  {
    name: 'CenturyPly',
    category: 'Core Timber & Marine Plywood',
    logo: 'https://starfoxinterior.com/wp-content/uploads/2023/06/centuryply-logo-A57F89B0E5-seeklogo.com-removebg-preview.png',
    relationship: '100% Genuine BWP Marine Grade Core for all kitchen and wardrobe carcasses.'
  },
  {
    name: 'Action TESA',
    category: 'High-Density HDHMR Boards',
    logo: 'https://starfoxinterior.com/wp-content/uploads/2023/06/Action-TESA-logo-removebg-preview.png',
    relationship: 'Termite and water-resistant substrate for precision CNC routing and wall paneling.'
  },
  {
    name: 'Hettich',
    category: 'German Architectural Hardware',
    logo: 'https://starfoxinterior.com/wp-content/uploads/2023/06/Hettich-logo-302D08490C-seeklogo.com-removebg-preview.png',
    relationship: 'AvanTech drawer runners, Sensys soft-close hinges, and slide mechanisms.'
  },
  {
    name: 'Merino',
    category: 'Architectural Laminates & Surfaces',
    logo: 'https://starfoxinterior.com/wp-content/uploads/2023/06/Merino-removebg-preview.png',
    relationship: 'Super-matte anti-fingerprint surfaces and textured architectural claddings.'
  }
];
