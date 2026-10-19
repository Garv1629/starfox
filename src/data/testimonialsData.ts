export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  location: string;
  projectType: string;
  quote: string;
  featuredHighlight: string;
  projectImage: string;
  year?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'verma-ireo',
    clientName: 'Sameer & Ananya Verma',
    role: 'Homeowners',
    location: 'Ireo Victory Valley, Sector 67, Gurugram',
    projectType: '4 BHK Turnkey Penthouse',
    quote: 'The turnkey experience at Ireo Victory Valley was remarkably seamless. Star Fox handled civil alterations, Italian marble laying, and custom millwork with uncompromising precision. Most importantly in Gurugram, they delivered on the exact promised date with zero handover delays.',
    featuredHighlight: 'Turnkey Civil & Millwork Delivery',
    projectImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
    year: '2024'
  },
  {
    id: 'singhania-suncity',
    clientName: 'Rahul Singhania',
    role: 'Managing Director, Apex Capital',
    location: 'Suncity Success Tower, Golf Course Ext Rd',
    projectType: '3,500 Sq.Ft Corporate Office',
    quote: 'We commissioned Star Fox for our executive headquarters. From acoustic glass partitions to the boardroom lighting, the attention to detail is world-class. Our clients constantly compliment the ambiance, and our team thrives in this layout.',
    featuredHighlight: 'Corporate Fit-Out & Acoustic Architecture',
    projectImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=85',
    year: '2023'
  },
  {
    id: 'malhotra-golf-estate',
    clientName: 'Priya & Amit Malhotra',
    role: 'Residential Client',
    location: 'M3M Golf Estate, Sector 65, Gurugram',
    projectType: '4 BHK Golf View Residence',
    quote: 'Their in-house furniture crafting is a huge differentiator. Instead of compromising with readymade showroom sizes, our living room sofa, marble dining table, and bar console were sculpted specifically for our floor plan. Truly bespoke architecture.',
    featuredHighlight: 'In-House Handcrafted Custom Millwork',
    projectImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
    year: '2023'
  },
  {
    id: 'kapoor-micasa',
    clientName: 'Dr. Neha Kapoor & Dr. Rajiv Kapoor',
    role: 'Homeowners',
    location: 'Pareena Micasa, Sohna Road, Gurugram',
    projectType: '4 BHK Complete Interior Renovation',
    quote: 'Visiting their studio at M3M Urbana gave us complete clarity on raw materials. The 3D architectural renders matched the final handover down to millimeter tolerances. Their transparency in billing and execution was refreshing.',
    featuredHighlight: 'Transparent Process & Material Clarity',
    projectImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85',
    year: '2024'
  }
];

export interface CredibilityItem {
  discipline: string;
  title: string;
  substantiation: string;
}

export const SUBSTANTIATED_CREDENTIALS: CredibilityItem[] = [
  {
    discipline: 'Physical Design Studio',
    title: 'M3M Urbana, Gurugram',
    substantiation: 'First Floor, R4/109B, Sector-67 — Dedicated material sample laboratory and private design consultations.'
  },
  {
    discipline: 'Primary Service Corridors',
    title: 'Gurugram & Delhi NCR',
    substantiation: 'Active residential and corporate turnkey projects across Golf Course Extension, DLF Phase 1–5, and Sohna Road.'
  },
  {
    discipline: 'Execution Model',
    title: 'Single-Source Accountability',
    substantiation: 'Integrated civil build, MEP coordination, in-house furniture crafting, and resident on-site site engineers.'
  },
  {
    discipline: 'Certified Core Sourcing',
    title: 'Tested Brand Partners',
    substantiation: 'Engineered using authentic CenturyPly BWP marine plywood, Action TESA HDHMR, and German Hettich hardware.'
  }
];
