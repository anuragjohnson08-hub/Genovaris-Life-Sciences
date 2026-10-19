import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Sliders, 
  FileText, 
  ArrowUpRight, 
  CheckCircle2, 
  X, 
  Search, 
  Download, 
  Pause, 
  Play, 
  Sparkles,
  Check,
  Building2,
  Phone,
  Mail,
  MapPin,
  HeartPulse,
  Pill,
  Award,
  Stethoscope,
  ChevronRight,
  ExternalLink,
  Info,
  ArrowUpDown,
  Menu
} from 'lucide-react';
import FluidShaderCanvas from './components/FluidShaderCanvas.tsx';
import GenovarisLogo, { GenovarisIconMark } from './components/GenovarisLogo.tsx';
import { TiltCard, IOSModal } from './components/InteractiveCard.tsx';

// ============================================================================
// PRODUCT LAYOUT CONFIGURATION VARIABLES
// ============================================================================
// PRODUCT LAYOUT CONFIGURATION VARIABLES
// (Easily adjust rows, items per row, or display count for future changes)
// ============================================================================
export const PRODUCTS_PER_ROW = 5;       // 5 formulations across a single balanced row
export const PRODUCT_ROWS_COUNT = 1;     // 1 row displaying active and upcoming portfolio
export const TOTAL_PRODUCTS_TO_SHOW = 5; // 4 Flagship available + 1 Coming Soon pipeline formulation

export interface MedicalProduct {
  id: string;
  code: string;
  numberPrefix: string;
  name: string;
  category: string;
  therapeuticSegment: string;
  keyIngredients: string;
  description: string;
  clinicalRationale: string;
  metricLabel: string;
  metricValue: string;
  status: 'FSSAI Approved' | 'Clinical Ready' | 'In Stock' | 'Coming Soon';
  dosageForm: string;
  packSize: string;
  compliance: string;
  featured?: boolean;
  isComingSoon?: boolean;
}

// Official Medical Product Portfolio based on genovarislifesciences.in
// Retaining the 4 available commercial formulations + 1 pipeline formulation marked Coming Soon
export const MEDICAL_PRODUCTS: MedicalProduct[] = [
  // --- FLAGSHIP ACTIVE FORMULATIONS (Available on genovarislifesciences.in) ---
  {
    id: 'prod-bonebro',
    code: 'GNV-MED-01',
    numberPrefix: '01',
    name: 'BONEBRO',
    category: 'Bone & Nutritional Support',
    therapeuticSegment: 'Orthopedics & Osteo-Wellness',
    keyIngredients: 'Calcium, Vitamin K2-7, Zinc, Magnesium, Vitamin D3',
    description: 'A specialized formula designed to support normal bone health. BONEBRO provides essential calcium nutritional support alongside crucial vitamins and minerals that assist in the body\'s natural maintenance processes.',
    clinicalRationale: 'Synergistic calcium-mineral chelate enhanced with Vitamin K2-7 (menaquinone) to direct calcium into osteoid matrix rather than vascular tissue.',
    metricLabel: 'Mineral Bioavailability',
    metricValue: '99.4% Chelation',
    status: 'FSSAI Approved',
    dosageForm: 'Tablets / Softgels',
    packSize: '30 Tablets (3 x 10 Blister)',
    compliance: 'FSSAI Lic: 21126016000816',
    featured: true
  },
  {
    id: 'prod-redxt',
    code: 'GNV-MED-02',
    numberPrefix: '02',
    name: 'RED-XT',
    category: 'Iron & Micronutrient Support',
    therapeuticSegment: 'Hematology & RBC Synthesis',
    keyIngredients: 'Ferrous Ascorbate, Folic Acid, Cyanocobalamin, Pyridoxine, Vitamin D3',
    description: 'Comprehensive iron nutrition. RED-XT combines highly absorbable iron forms with folate and Vitamin B12, providing essential nutritional support related to normal red blood cell formation.',
    clinicalRationale: 'Ferrous ascorbate complex provides dual elemental iron release with ascorbic reduction to maintain high mucosal absorption without standard gastric irritation.',
    metricLabel: 'GI Tolerability',
    metricValue: 'Gentle & Non-Constipating',
    status: 'FSSAI Approved',
    dosageForm: 'Film-Coated Tablets',
    packSize: '10 x 10 Strip Pack',
    compliance: 'FSSAI Lic: 21126016000816',
    featured: true
  },
  {
    id: 'prod-cerebracb',
    code: 'GNV-MED-03',
    numberPrefix: '03',
    name: 'CEREBRA-CB',
    category: 'Cognitive Nutritional Support',
    therapeuticSegment: 'Neuro-Nutritional Health',
    keyIngredients: 'Cerebroprotein, Omega-3, Vitamin E, Vitamin D3, Vitamin B12',
    description: 'Targeted neuro-nutritional support. Formulated with Omega-3 and essential vitamins to support general cognitive function and overall nervous system health as part of a balanced lifestyle.',
    clinicalRationale: 'Active cerebroprotein bio-peptides paired with neuro-protective DHA/EPA fatty acids to nourish myelin sheath integrity and neurotransmitter homeostasis.',
    metricLabel: 'Neuro-Active Potency',
    metricValue: 'High DHA/EPA Ratio',
    status: 'FSSAI Approved',
    dosageForm: 'Soft Gelatin Capsules',
    packSize: '10 x 10 Softgels',
    compliance: 'FSSAI Lic: 21126016000816',
    featured: true
  },
  {
    id: 'prod-protizenhp',
    code: 'GNV-MED-04',
    numberPrefix: '04',
    name: 'PROTIZEN-HP',
    category: 'Protein & Daily Nutrition',
    therapeuticSegment: 'Clinical Nutrition & Convalescence',
    keyIngredients: 'High-quality protein profile, Whey isolate, BCAAs & balanced micronutrients',
    description: 'Comprehensive daily nutritional support. Protizen-HP provides essential protein nutrition necessary for muscle support and overall recovery, ideal for maintaining an active and healthy life.',
    clinicalRationale: 'High-biological-value protein matrix engineered with branched-chain amino acids for post-operative recovery, sarcopenia prevention, and immune synthesis.',
    metricLabel: 'Protein Purity (PDCAAS)',
    metricValue: '1.0 Score Profile',
    status: 'FSSAI Approved',
    dosageForm: 'High Protein Powder',
    packSize: '400g Food-Grade Tin',
    compliance: 'FSSAI Lic: 21126016000816',
    featured: true
  },
  // --- UPCOMING PIPELINE FORMULATION (Single Formulation: Coming Soon) ---
  {
    id: 'prod-cardiovaris',
    code: 'GNV-MED-05',
    numberPrefix: '05',
    name: 'CARDIOVARIS-Q',
    category: 'Cardiovascular Support',
    therapeuticSegment: 'Cardiology & Cellular Bioenergetics',
    keyIngredients: 'Coenzyme Q10 (Ubiquinone), L-Carnitine, Lycopene, Piperine',
    description: 'Advanced mitochondrial antioxidant complex formulated to support myocardial contractility, cellular adenosine triphosphate (ATP) synthesis, and vascular elasticity.',
    clinicalRationale: 'Bio-enhanced with piperine extract for 3x greater CoQ10 plasma concentration, supporting cellular bioenergetics and cardiovascular management.',
    metricLabel: 'Pipeline Status',
    metricValue: 'Coming Soon',
    status: 'Coming Soon',
    dosageForm: 'Soft Gelatin Capsules',
    packSize: '3 x 10 Blisters',
    compliance: 'Formulation Phase • Launching Soon',
    featured: false,
    isComingSoon: true
  }
];

// Clinical Ingredients Monograph Data
interface IngredientMonograph {
  id: string;
  formulation: string;
  activeCompound: string;
  therapeuticSegment: string;
  clinicalIndication: string;
  assayPurity: string;
  bioavailabilityScore: number;
  regulatoryStatus: 'FSSAI Approved' | 'Pharmacopoeial' | 'GMP Validated' | 'Coming Soon';
}

const INGREDIENT_MONOGRAPHS: IngredientMonograph[] = [
  {
    id: 'MONO-01',
    formulation: 'BONEBRO',
    activeCompound: 'Calcium Citrate Malate + Menaquinone-7 (Vit K2-7)',
    therapeuticSegment: 'Orthopedics',
    clinicalIndication: 'Osteopenia, osteoporosis prophylaxis, fracture healing acceleration',
    assayPurity: '99.8% Purity',
    bioavailabilityScore: 99.4,
    regulatoryStatus: 'FSSAI Approved'
  },
  {
    id: 'MONO-02',
    formulation: 'RED-XT',
    activeCompound: 'Ferrous Ascorbate + L-Methylfolate + Mecobalamin',
    therapeuticSegment: 'Hematology',
    clinicalIndication: 'Iron deficiency anemia, chronic blood loss, prenatal hematinics',
    assayPurity: '99.5% Purity',
    bioavailabilityScore: 99.1,
    regulatoryStatus: 'FSSAI Approved'
  },
  {
    id: 'MONO-03',
    formulation: 'CEREBRA-CB',
    activeCompound: 'Cerebroprotein Hydrolysate + Docosahexaenoic Acid (DHA)',
    therapeuticSegment: 'Neurology',
    clinicalIndication: 'Cognitive decline, cerebral microvascular recovery, neuro-fatigue',
    assayPurity: '98.9% Purity',
    bioavailabilityScore: 98.7,
    regulatoryStatus: 'FSSAI Approved'
  },
  {
    id: 'MONO-04',
    formulation: 'PROTIZEN-HP',
    activeCompound: 'Whey Protein Isolate + L-Glutamine + Branched Chain Amino Acids',
    therapeuticSegment: 'Clinical Nutrition',
    clinicalIndication: 'Hypoalbuminemia, convalescence, sarcopenia, high-metabolic demand',
    assayPurity: '99.2% Purity',
    bioavailabilityScore: 99.7,
    regulatoryStatus: 'FSSAI Approved'
  },
  {
    id: 'MONO-05',
    formulation: 'CARDIOVARIS-Q',
    activeCompound: 'Bioactive Ubiquinone (CoQ10 100mg) + Levocarnitine',
    therapeuticSegment: 'Cardiology',
    clinicalIndication: 'Cellular bioenergetics, mitochondrial ATP optimization, upcoming therapeutic launch',
    assayPurity: 'Formulation R&D',
    bioavailabilityScore: 98.9,
    regulatoryStatus: 'Coming Soon'
  }
];

export default function LandingPage() {
  // 3D Motion & kinetic canvas state
  const [motionSpeed, setMotionSpeed] = useState<number>(1.2);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [waveOpacity, setWaveOpacity] = useState<number>(0.85);

  // Modals & Drawers (iOS-style app expand/close)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState<boolean>(false);
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<MedicalProduct | null>(null);
  const [isAboutExpanded, setIsAboutExpanded] = useState<boolean>(false);
  const [isEquilibriumExpanded, setIsEquilibriumExpanded] = useState<boolean>(false);
  const [selectedFocusCard, setSelectedFocusCard] = useState<'health' | 'nutrition' | 'living' | null>(null);
  const [selectedCert, setSelectedCert] = useState<'fssai' | 'gst' | null>(null);
  const [modalOriginRect, setModalOriginRect] = useState<DOMRect | null>(null);

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Product Portfolio Sorting state
  const [productSortBy, setProductSortBy] = useState<'default' | 'name-asc' | 'name-desc' | 'category' | 'metric' | 'status'>('default');

  // Dynamic products sliced by configuration variables and sorted according to researcher selection
  const displayedProducts = useMemo(() => {
    const list = [...MEDICAL_PRODUCTS.slice(0, TOTAL_PRODUCTS_TO_SHOW)];
    
    switch (productSortBy) {
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return list.sort((a, b) => b.name.localeCompare(a.name));
      case 'category':
        return list.sort((a, b) => a.category.localeCompare(b.category));
      case 'metric':
        return list.sort((a, b) => {
          // Extract numeric value from metric (e.g. 99.4%, 60000, 300%, 80%) for quantitative ranking
          const numA = parseFloat(a.metricValue.replace(/[^0-9.]/g, '')) || 0;
          const numB = parseFloat(b.metricValue.replace(/[^0-9.]/g, '')) || 0;
          if (numA !== numB) return numB - numA; // Higher quantitative metric first
          return a.metricValue.localeCompare(b.metricValue);
        });
      case 'status':
        return list.sort((a, b) => {
          if (a.isComingSoon && !b.isComingSoon) return 1;
          if (!a.isComingSoon && b.isComingSoon) return -1;
          return a.status.localeCompare(b.status);
        });
      case 'default':
      default:
        return list;
    }
  }, [productSortBy]);

  // Interactive enquiry form state
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryContact, setEnquiryContact] = useState('');
  const [enquiryType, setEnquiryType] = useState('Hospital / Clinical Supply');
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Clinical monograph workbench filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSegment, setFilterSegment] = useState('ALL');

  // WCAG live contrast inspection mode
  const [highContrastMode, setHighContrastMode] = useState(false);

  // Filtered dataset for research / clinical monographs
  const filteredMonographs = INGREDIENT_MONOGRAPHS.filter(item => {
    const matchesSearch = item.formulation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.activeCompound.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.clinicalIndication.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSegment = filterSegment === 'ALL' || item.therapeuticSegment === filterSegment;
    return matchesSearch && matchesSegment;
  });

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryContact) return;
    setEnquirySubmitted(true);
    setTimeout(() => {
      // Clear after feedback
    }, 2500);
  };

  const handleExportMonographs = () => {
    const headers = 'ID,Formulation,Active Compound,Therapeutic Segment,Clinical Indication,Assay Purity,Bioavailability,Regulatory Status\n';
    const rows = filteredMonographs.map(m => 
      `"${m.id}","${m.formulation}","${m.activeCompound}","${m.therapeuticSegment}","${m.clinicalIndication}","${m.assayPurity}","${m.bioavailabilityScore}%","${m.regulatoryStatus}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Genovaris_Clinical_Monographs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    // 1. Root Container with Wavy Background
    <div className={`relative min-h-screen w-full ${highContrastMode ? 'bg-[#3e6b5d]' : 'bg-[#599180]'} text-[#0F172A] font-sans overflow-x-hidden selection:bg-[#0F172A] selection:text-[#599180] transition-colors duration-300`}>
      
      {/* 2. 3D Procedural Liquid Fluid Canvas (Native 4K GPU WebGL Simulation) */}
      <FluidShaderCanvas 
        speed={motionSpeed} 
        opacity={waveOpacity} 
        isPaused={isPaused} 
        highContrast={highContrastMode} 
      />

      {/* 3. Foreground Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto px-6 py-8">
        
        {/* Floating "Pinpoint" Navigation (Apple-Style Frosted Glass Pill) */}
        <nav className="w-full max-w-5xl flex justify-between items-center glass-panel-elevated px-4 sm:px-7 py-3 rounded-full mb-16 sticky top-6 z-40 transition-all">
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Top-Left Menu Bar Button for Mobile View */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden w-9 h-9 rounded-full glass-pill hover:bg-white text-[#0A3A70] flex items-center justify-center transition-all cursor-pointer active:scale-90"
              aria-label="Open mobile navigation menu"
              title="Menu Options"
            >
              <Menu className="w-5 h-5 text-[#0A3A70]" />
            </button>

            <a href="#" className="flex items-center gap-2.5 group cursor-pointer focus:outline-none">
              <GenovarisLogo variant="nav" />
            </a>
          </div>

          <div className="hidden md:flex gap-3 lg:gap-4 font-semibold text-sm items-center">
            <a href="#about" className="px-3.5 py-1.5 rounded-full hover:bg-white/60 text-[#0F172A] hover:text-[#0A3A70] transition-all">About</a>
            <a href="#products" className="px-3.5 py-1.5 rounded-full hover:bg-white/60 text-[#0F172A] hover:text-[#0A3A70] transition-all">Products</a>
            <a href="#focus" className="px-3.5 py-1.5 rounded-full hover:bg-white/60 text-[#0F172A] hover:text-[#0A3A70] transition-all">Our Focus</a>
            <a href="#monographs" className="px-3.5 py-1.5 rounded-full hover:bg-white/60 text-[#0F172A] hover:text-[#0A3A70] transition-all">Monographs</a>
            <a href="#quality" className="px-3.5 py-1.5 rounded-full hover:bg-white/60 text-[#0F172A] hover:text-[#0A3A70] transition-all">Quality</a>
            <button 
              onClick={(e) => {
                setModalOriginRect(e.currentTarget.getBoundingClientRect());
                setIsContactOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-full hover:bg-white/60 text-[#0F172A] hover:text-[#0A3A70] transition-all cursor-pointer text-left"
            >
              Contact
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button 
              onClick={(e) => { 
                setModalOriginRect(e.currentTarget.getBoundingClientRect());
                setSelectedProduct(null); 
                setIsEnquiryOpen(true); 
              }}
              className="hidden md:inline-flex px-5 py-2.5 bg-gradient-to-r from-[#0A3A70] to-[#0d4d94] text-white hover:from-[#082e5b] hover:to-[#0A3A70] rounded-full text-xs md:text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer items-center gap-1.5 shrink-0 border border-white/30"
            >
              <span>Enquire</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="text-center max-w-4xl mb-20 flex flex-col items-center">
          {/* Official Compliance Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 glass-pill text-xs font-bold tracking-wider uppercase shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#2E8B1E] animate-pulse"></span>
            <span>FSSAI Registered: 21126016000816</span>
            <span className="opacity-40">•</span>
            <span>Jharkhand Corporate Reg.</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Health solutions designed around <span className="underline decoration-[#2E8B1E] decoration-wavy decoration-2 underline-offset-8">better living</span>.
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl opacity-90 font-medium max-w-2xl mb-8 leading-relaxed">
            Nutrition-focused products created to support everyday health, wellness, and normal physiological function. Formulated with scientifically validated bio-actives and rigid quality standards.
          </p>

          {/* Quick Pillars strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-bold uppercase tracking-widest text-[#0A3A70] mb-10 glass-panel px-7 py-2.5 rounded-full shadow-xs">
            <span>Science</span>
            <span className="text-[#2E8B1E]">•</span>
            <span>Wellness</span>
            <span className="text-[#2E8B1E]">•</span>
            <span>Nutrition</span>
            <span className="text-[#2E8B1E]">•</span>
            <span>Quality</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#products"
              className="px-8 py-4 bg-[#0A3A70] hover:bg-[#072850] text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center gap-2 text-sm md:text-base border border-white/20"
            >
              Explore Products
              <ArrowUpRight className="w-4 h-4" />
            </a>
            
            <button 
              onClick={(e) => {
                setModalOriginRect(e.currentTarget.getBoundingClientRect());
                setIsContactOpen(true);
              }}
              className="px-8 py-4 glass-panel hover:bg-white text-[#0A3A70] rounded-full font-bold shadow-sm hover:shadow transition-all cursor-pointer text-sm md:text-base flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-[#2E8B1E]" />
              Our Corporate Office
            </button>
          </div>
        </header>

        {/* Bento Grid: Mission & Therapeutic Fluid Kinetics */}
        <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          
          {/* Card 1: About Genovaris Lifesciences */}
          <TiltCard 
            onClick={(rect) => {
              setModalOriginRect(rect || null);
              setIsAboutExpanded(true);
            }}
            className="md:col-span-2 glass-panel rounded-3xl p-8 md:p-10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A3A70]">
                  <Sparkles className="w-4 h-4 text-[#2E8B1E]" />
                  About Genovaris Lifesciences
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0A3A70] glass-pill px-2.5 py-1 rounded-full shadow-2xs">
                  <span>Open Dossier</span>
                  <ArrowUpRight className="w-3 h-3 text-[#2E8B1E]" />
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                Better nutrition. Better everyday living.
              </h2>
              <p className="text-base md:text-lg opacity-85 leading-relaxed font-medium mb-6">
                Genovaris Lifesciences focuses on nutrition-oriented products designed to support everyday health, wellness, and normal physiological function. We engineer targeted solutions for bone health, micronutrient repletion, cognitive wellness, and clinical protein nourishment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-5 border-t border-[#0F172A]/10">
              <div className="flex items-center gap-3 p-3 rounded-2xl glass-well">
                <div className="w-9 h-9 rounded-xl glass-pill flex items-center justify-center shrink-0 text-[#0A3A70]">
                  <Award className="w-5 h-5 text-[#2E8B1E]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0A3A70]">FSSAI Compliant</div>
                  <div className="text-[11px] opacity-75 font-mono">Lic: 21126016000816</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl glass-well">
                <div className="w-9 h-9 rounded-xl glass-pill flex items-center justify-center shrink-0 text-[#0A3A70]">
                  <Pill className="w-5 h-5 text-[#0A3A70]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0A3A70]">Targeted Formulations</div>
                  <div className="text-[11px] opacity-75">Bioavailable actives</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl glass-well">
                <div className="w-9 h-9 rounded-xl glass-pill flex items-center justify-center shrink-0 text-[#0A3A70]">
                  <ShieldCheck className="w-5 h-5 text-[#2E8B1E]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0A3A70]">GST Registered</div>
                  <div className="text-[11px] opacity-75 font-mono">20AMDPA2242F2Z2</div>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Card 2: Physiological Equilibrium */}
          <TiltCard 
            onClick={(rect) => {
              setModalOriginRect(rect || null);
              setIsEquilibriumExpanded(true);
            }}
            className="glass-panel rounded-3xl p-8 flex flex-col justify-between h-[295px]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl glass-pill text-[#0A3A70] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#2E8B1E]" />
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0A3A70] glass-pill px-2.5 py-1 rounded-full shadow-2xs">
                  <span>Fluid Kinetics</span>
                  <ChevronRight className="w-3 h-3 text-[#2E8B1E]" />
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-2 text-[#0A3A70]">Physiological Equilibrium</h3>
              <p className="text-sm opacity-85 leading-relaxed font-medium">
                Our fluid wave simulation models dynamic cellular homeostasis and metabolic balance in biological systems.
              </p>
            </div>
            <div className="p-3 rounded-2xl glass-well flex items-center justify-between text-xs font-bold text-[#0A3A70]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2E8B1E] animate-pulse" />
                Cellular Kinetics
              </span>
              <span className="text-[11px] opacity-75 font-mono">Expand 3D Model</span>
            </div>
          </TiltCard>

        </section>

        {/* Section: Medical Product Portfolio */}
        <section id="products" className="w-full mb-20 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 glass-pill text-xs font-bold tracking-wider uppercase text-[#0A3A70] mb-3">
                <Pill className="w-3.5 h-3.5 text-[#2E8B1E]" />
                PRODUCT PORTFOLIO
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                Formulated for Wellness.
              </h2>
              <p className="text-base md:text-lg opacity-85 font-medium mt-2 max-w-2xl">
                Nutrition-focused formulations designed around specific areas of everyday health and clinical wellness.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Portfolio Sorting Dropdown */}
              <div className="flex items-center gap-2 glass-panel px-3.5 py-2 rounded-2xl shadow-xs hover:border-white/80 transition-all">
                <ArrowUpDown className="w-4 h-4 text-[#0A3A70] shrink-0" />
                <label htmlFor="portfolio-sort" className="text-xs font-bold text-[#0A3A70] whitespace-nowrap cursor-pointer">
                  Sort Portfolio:
                </label>
                <select
                  id="portfolio-sort"
                  value={productSortBy}
                  onChange={(e) => setProductSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-semibold text-[#0F172A] focus:outline-none cursor-pointer pr-1"
                  aria-label="Sort product portfolio"
                >
                  <option value="default" className="text-slate-800">Catalogue Order (Flagships First)</option>
                  <option value="name-asc" className="text-slate-800">Product Name (A → Z)</option>
                  <option value="name-desc" className="text-slate-800">Product Name (Z → A)</option>
                  <option value="category" className="text-slate-800">Therapeutic Category (A → Z)</option>
                  <option value="metric" className="text-slate-800">Clinical Metric (High Potency)</option>
                  <option value="status" className="text-slate-800">Regulatory Status (FSSAI / GMP)</option>
                </select>
              </div>

              {/* Quick Reset Button if custom sort active */}
              {productSortBy !== 'default' && (
                <button
                  onClick={() => setProductSortBy('default')}
                  className="px-3 py-2 glass-pill text-xs font-bold text-[#2E8B1E] rounded-2xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer hover:bg-white"
                  title="Reset to default catalogue order"
                >
                  <span>Reset</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              <span className="text-xs font-bold opacity-80 glass-pill px-3 py-2 rounded-2xl hidden sm:inline-block">
                Displaying {displayedProducts.length} Formulations ({displayedProducts.filter(p => !p.isComingSoon).length} Available • 1 Coming Soon)
              </span>
            </div>
          </div>

          {/* Dynamic 5-column grid across 1 balanced row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {displayedProducts.map((product) => {
              const isComingSoon = product.isComingSoon || product.status === 'Coming Soon';
              return (
                <TiltCard 
                  key={product.id}
                  onClick={(rect) => {
                    setModalOriginRect(rect || null);
                    setSelectedProduct(product);
                  }}
                  className={`group relative rounded-2xl p-5 flex flex-col justify-between transition-all ${
                    isComingSoon ? 'glass-amber' : 'glass-panel'
                  }`}
                >
                  <div>
                    {/* Top row: Number prefix & Category tag / Coming Soon Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-xs font-black tracking-widest px-2 py-0.5 rounded-md ${
                        isComingSoon 
                          ? 'text-amber-800 bg-amber-500/15 border border-amber-500/25' 
                          : 'text-[#2E8B1E] bg-[#2E8B1E]/10'
                      }`}>
                        {product.numberPrefix}
                      </span>
                      {isComingSoon ? (
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-500/20 border border-amber-500/35 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                          <Sparkles className="w-3 h-3 text-amber-600 animate-pulse" />
                          Coming Soon
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A3A70] opacity-80 truncate">
                          {product.dosageForm}
                        </span>
                      )}
                    </div>

                    {/* Product Name */}
                    <h3 className={`text-lg font-black tracking-tight mb-1 transition-colors ${
                      isComingSoon
                        ? 'text-[#0A3A70] group-hover:text-amber-700'
                        : 'text-[#0A3A70] group-hover:text-[#2E8B1E]'
                    }`}>
                      {product.name}
                    </h3>
                    
                    <div className={`text-xs font-bold ${
                      productSortBy === 'category' 
                        ? 'text-[#0A3A70] bg-[#0A3A70]/10 px-2 py-0.5 rounded-md inline-block' 
                        : 'text-[#0F172A] opacity-80'
                    } mb-2`}>
                      {product.category}
                    </div>

                    {/* Key Ingredients */}
                    <div className={`p-2.5 rounded-xl text-[11px] mb-3 leading-snug glass-input ${
                      isComingSoon ? 'bg-amber-500/10 border-amber-500/25' : 'bg-white/50'
                    }`}>
                      <span className="font-bold text-[#0A3A70] block text-[10px] uppercase tracking-wider mb-0.5">Key Actives:</span>
                      <span className="opacity-90 font-medium line-clamp-2">{product.keyIngredients}</span>
                    </div>

                    {/* Description preview */}
                    <p className="text-xs opacity-75 font-medium leading-relaxed line-clamp-3 mb-4">
                      {product.description}
                    </p>
                  </div>

                  <div>
                    {/* Metric indicator */}
                    <div className={`pt-3 border-t ${
                      isComingSoon
                        ? 'border-amber-500/25 bg-amber-500/15 -mx-3 -mb-1 px-3 py-2 rounded-xl'
                        : productSortBy === 'metric'
                          ? 'border-[#2E8B1E]/40 bg-[#2E8B1E]/10 -mx-3 -mb-1 px-3 py-2 rounded-xl'
                          : 'border-[#0F172A]/10'
                    } flex items-center justify-between text-xs transition-colors`}>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider opacity-60 font-bold">{product.metricLabel}</div>
                        <div className={`font-extrabold ${
                          isComingSoon 
                            ? 'text-amber-800' 
                            : productSortBy === 'metric' ? 'text-[#15803D]' : 'text-[#0A3A70]'
                        }`}>
                          {product.metricValue}
                        </div>
                      </div>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                        isComingSoon
                          ? 'glass-pill text-amber-800 group-hover:bg-amber-600 group-hover:text-white'
                          : 'glass-pill text-[#0A3A70] group-hover:bg-[#0A3A70] group-hover:text-white'
                      }`}>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* Section: Our Focus (From genovarislifesciences.in) */}
        <section id="focus" className="w-full max-w-5xl mb-20 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 glass-pill text-xs font-bold tracking-wider uppercase text-[#0A3A70] mb-3">
              <HeartPulse className="w-3.5 h-3.5 text-[#2E8B1E]" />
              OUR FOCUS
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Designed around everyday wellness.
            </h2>
            <p className="text-base md:text-lg opacity-85 font-medium mt-2">
              Our product portfolio focuses on nutrition-oriented support across key areas of everyday health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TiltCard 
              onClick={(rect) => {
                setModalOriginRect(rect || null);
                setSelectedFocusCard('health');
              }}
              className="glass-panel p-8 rounded-3xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl glass-pill text-[#0A3A70] flex items-center justify-center mb-6">
                  <HeartPulse className="w-6 h-6 text-[#2E8B1E]" />
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-2 text-[#0A3A70]">Everyday Health</h3>
                <p className="text-sm opacity-80 leading-relaxed font-medium">
                  Nutritional support designed to fit into everyday routines, fortifying natural physiological resilience and micronutrient balance.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#0F172A]/10 flex items-center justify-between text-xs font-bold text-[#0A3A70]">
                <span>Explore Daily Protocol</span>
                <ChevronRight className="w-4 h-4 text-[#2E8B1E]" />
              </div>
            </TiltCard>

            <TiltCard 
              onClick={(rect) => {
                setModalOriginRect(rect || null);
                setSelectedFocusCard('nutrition');
              }}
              className="glass-panel p-8 rounded-3xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl glass-pill text-[#0A3A70] flex items-center justify-center mb-6">
                  <Pill className="w-6 h-6 text-[#0A3A70]" />
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-2 text-[#0A3A70]">Targeted Nutrition</h3>
                <p className="text-sm opacity-80 leading-relaxed font-medium">
                  Formulations focused on specific nutritional requirements—from bone mineral density to cognitive neuro-protection and hemoglobin synthesis.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#0F172A]/10 flex items-center justify-between text-xs font-bold text-[#0A3A70]">
                <span>Explore Formulations</span>
                <ChevronRight className="w-4 h-4 text-[#2E8B1E]" />
              </div>
            </TiltCard>

            <TiltCard 
              onClick={(rect) => {
                setModalOriginRect(rect || null);
                setSelectedFocusCard('living');
              }}
              className="glass-panel p-8 rounded-3xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl glass-pill text-[#0A3A70] flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-[#2E8B1E]" />
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-2 text-[#0A3A70]">Better Living</h3>
                <p className="text-sm opacity-80 leading-relaxed font-medium">
                  Supporting healthier lifestyles through nutritional solutions engineered to deliver verified clinical bioavailability and patient adherence.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#0F172A]/10 flex items-center justify-between text-xs font-bold text-[#0A3A70]">
                <span>Explore Living Impact</span>
                <ChevronRight className="w-4 h-4 text-[#2E8B1E]" />
              </div>
            </TiltCard>
          </div>
        </section>

        {/* Section: Clinical Ingredients & Formulation Monograph Workbench */}
        <section id="monographs" className="w-full max-w-5xl mb-20 scroll-mt-24">
          <div className="glass-panel rounded-3xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A3A70] mb-1">
                  <Stethoscope className="w-4 h-4 text-[#2E8B1E]" />
                  Medical Monograph Directory
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight">Active Formulations & Pharmacology</h3>
                <p className="text-xs opacity-80 font-medium">Real-time clinical specifications, bio-chelation assay scores, and regulatory clearances.</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleExportMonographs}
                  className="px-4 py-2 glass-pill text-[#0A3A70] rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer hover:bg-white"
                >
                  <Download className="w-3.5 h-3.5 text-[#2E8B1E]" />
                  Export Monograph (CSV)
                </button>
              </div>
            </div>

            {/* Filters & Search */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="sm:col-span-2 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                <input
                  type="text"
                  placeholder="Search by formulation (Bonebro, Red-XT), active compound, or indication..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 glass-input rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3A70] transition text-[#0F172A]"
                />
              </div>

              <div>
                <select
                  value={filterSegment}
                  onChange={(e) => setFilterSegment(e.target.value)}
                  className="w-full px-3 py-2.5 glass-input rounded-xl text-xs font-bold focus:outline-none cursor-pointer text-[#0F172A]"
                >
                  <option value="ALL">All Therapeutic Areas</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Hematology">Hematology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Clinical Nutrition">Clinical Nutrition</option>
                  <option value="Endocrinology">Endocrinology</option>
                  <option value="Gastroenterology">Gastroenterology</option>
                  <option value="Diabetology">Diabetology</option>
                  <option value="Cardiology">Cardiology</option>
                </select>
              </div>
            </div>

            {/* Interactive Monograph Table */}
            <div className="overflow-x-auto rounded-2xl glass-panel p-1">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#0F172A]/10 bg-white/60 backdrop-blur-md text-[#0A3A70] font-bold">
                    <th className="py-3 px-4">Formulation</th>
                    <th className="py-3 px-4">Active Compound & Form</th>
                    <th className="py-3 px-4">Therapeutic Segment</th>
                    <th className="py-3 px-4">Clinical Indication</th>
                    <th className="py-3 px-4">Bioavailability</th>
                    <th className="py-3 px-4">Regulatory</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0F172A]/5 font-medium">
                  {filteredMonographs.map((item) => (
                    <tr key={item.id} className="hover:bg-white/50 transition">
                      <td className="py-3 px-4">
                        <span className="font-extrabold text-[#0A3A70] block">{item.formulation}</span>
                        <span className="text-[10px] opacity-60 font-mono">{item.id}</span>
                      </td>
                      <td className="py-3 px-4 max-w-xs font-semibold text-[#0F172A]">
                        {item.activeCompound}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0A3A70]/10 text-[#0A3A70]">
                          {item.therapeuticSegment}
                        </span>
                      </td>
                      <td className="py-3 px-4 opacity-80 max-w-xs text-[11px]">
                        {item.clinicalIndication}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#2E8B1E]">
                        {item.bioavailabilityScore}%
                        <span className="block text-[10px] opacity-60 font-normal text-[#0F172A]">{item.assayPurity}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2E8B1E] bg-[#2E8B1E]/10 px-2 py-0.5 rounded-md">
                          <CheckCircle2 className="w-3 h-3" />
                          {item.regulatoryStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredMonographs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 opacity-60 font-medium">
                        No active compounds found matching your filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section: Quality Assurance & Transparency (From genovarislifesciences.in) */}
        <section id="quality" className="w-full max-w-5xl mb-20 scroll-mt-24">
          <div className="glass-panel rounded-3xl p-8 md:p-12">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 glass-pill text-xs font-bold tracking-wider uppercase text-[#2E8B1E] mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                QUALITY ASSURANCE
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0A3A70]">
                Transparency & Compliance
              </h2>
              <p className="text-base md:text-lg opacity-85 font-medium mt-3 leading-relaxed">
                As a registered corporate entity in India, Genovaris Lifesciences strictly adheres to national regulatory frameworks governing nutritional products and health supplements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* FSSAI Card */}
              <TiltCard 
                onClick={(rect) => {
                  setModalOriginRect(rect || null);
                  setSelectedCert('fssai');
                }}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs font-extrabold uppercase tracking-widest text-[#2E8B1E]">National Authority</div>
                    <CheckCircle2 className="w-5 h-5 text-[#2E8B1E]" />
                  </div>
                  <div className="text-2xl font-black text-[#0A3A70] tracking-tight mb-1">FSSAI Registration</div>
                  <div className="font-mono text-lg font-bold text-[#2E8B1E] tracking-wider mb-2">21126016000816</div>
                  <p className="text-xs opacity-80 leading-relaxed font-medium mb-4">
                    Registered compliant with the Food Safety and Standards Authority of India (FSSAI) for nutritional products, health formulations, and dietary supplements.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#0F172A]/10 flex items-center justify-between text-xs font-bold text-[#2E8B1E]">
                  <span>Verify Compliance Certificate</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </TiltCard>

              {/* GST Card */}
              <TiltCard 
                onClick={(rect) => {
                  setModalOriginRect(rect || null);
                  setSelectedCert('gst');
                }}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs font-extrabold uppercase tracking-widest text-[#0A3A70]">Corporate Tax Entity</div>
                    <Building2 className="w-5 h-5 text-[#0A3A70]" />
                  </div>
                  <div className="text-2xl font-black text-[#0A3A70] tracking-tight mb-1">GST Registration</div>
                  <div className="font-mono text-lg font-bold text-[#0A3A70] tracking-wider mb-2">20AMDPA2242F2Z2</div>
                  <p className="text-xs opacity-80 leading-relaxed font-medium mb-4">
                    Official corporate tax registration validating our authorized business operations, distribution, and supply infrastructure headquartered in Jharkhand, India.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#0F172A]/10 flex items-center justify-between text-xs font-bold text-[#0A3A70]">
                  <span>Verify Corporate Tax Registry</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </TiltCard>
            </div>

            {/* Official Disclaimer Box */}
            <div className="mt-8 p-4 rounded-2xl glass-amber text-xs text-[#0F172A] opacity-95 leading-relaxed flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-amber-900 block mb-0.5">Medical & Nutritional Disclaimer:</strong>
                Products are nutritional supplements and are not intended to diagnose, treat, cure, or prevent any disease. Always consult a qualified healthcare professional regarding medical questions, prescriptions, or treatment regimens.
              </div>
            </div>
          </div>
        </section>

        {/* Section: Corporate Office & Direct Contact (From genovarislifesciences.in) */}
        <section id="contact" className="w-full max-w-5xl mb-20 scroll-mt-24">
          <div className="glass-panel rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 glass-pill text-xs font-bold tracking-wider uppercase text-[#0A3A70] mb-3">
                  <Building2 className="w-3.5 h-3.5 text-[#2E8B1E]" />
                  CORPORATE HEADQUARTERS
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                  Connect with Genovaris Lifesciences.
                </h2>
                <p className="text-sm md:text-base opacity-85 font-medium leading-relaxed mb-6">
                  Dedicated to providing premium, science-backed nutritional solutions to support everyday health and wellness across hospitals, clinics, and distribution partners.
                </p>

                <div className="space-y-4 text-xs font-medium">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#2E8B1E] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#0A3A70]">Corporate Office Address:</div>
                      <address className="not-italic opacity-85 leading-relaxed">
                        3A, Third Floor, Aparajita Apt.<br />
                        Dhobi Ghat Road, Lalpur<br />
                        Ranchi, Jharkhand – 834001, India
                      </address>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#0A3A70] shrink-0" />
                    <div>
                      <span className="font-bold text-[#0A3A70]">Direct Phone: </span>
                      <a href="tel:8102946105" className="hover:underline font-mono font-bold text-[#2E8B1E]">
                        +91 8102946105
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#0A3A70] shrink-0" />
                    <div>
                      <span className="font-bold text-[#0A3A70]">Official Email: </span>
                      <a href="mailto:genovarislifesciences@gmail.com" className="hover:underline font-medium text-[#0A3A70]">
                        genovarislifesciences@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <ExternalLink className="w-4 h-4 text-[#2E8B1E] shrink-0" />
                    <div>
                      <span className="font-bold text-[#0A3A70]">Official Web Portal: </span>
                      <a href="https://genovarislifesciences.in/" target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold text-[#2E8B1E]">
                        https://genovarislifesciences.in/
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Quick Enquiry Card */}
              <div className="glass-panel p-6 md:p-8 rounded-2xl">
                <h3 className="text-xl font-bold tracking-tight text-[#0A3A70] mb-2">Institutional & Product Enquiry</h3>
                <p className="text-xs opacity-75 font-medium mb-4">Send a direct message to our clinical product specialist.</p>

                <form onSubmit={handleEnquirySubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-[#0A3A70] uppercase tracking-wider mb-1">Your Name / Organization</label>
                    <input 
                      type="text" 
                      placeholder="Dr. Rajesh Kumar / Apollo Hospital"
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      className="w-full px-3.5 py-2.5 glass-input rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3A70] text-[#0F172A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#0A3A70] uppercase tracking-wider mb-1">Phone Number or Email *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Phone or email"
                      value={enquiryContact}
                      onChange={(e) => setEnquiryContact(e.target.value)}
                      className="w-full px-3.5 py-2.5 glass-input rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3A70] text-[#0F172A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#0A3A70] uppercase tracking-wider mb-1">Enquiry Purpose</label>
                    <select
                      value={enquiryType}
                      onChange={(e) => setEnquiryType(e.target.value)}
                      className="w-full px-3.5 py-2.5 glass-input rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0A3A70] text-[#0F172A] cursor-pointer"
                    >
                      <option>Hospital / Clinical Bulk Supply</option>
                      <option>Pharma PCD / Distribution Franchise</option>
                      <option>Physician & Medical Representative Query</option>
                      <option>Patient & Product Nutrition Guidance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#0A3A70] uppercase tracking-wider mb-1">Message / Product Required</label>
                    <textarea 
                      rows={2}
                      placeholder="Specify requirements for BoneBro, Red-XT, Cerebra-CB, Protizen-HP, etc..."
                      value={enquiryMessage}
                      onChange={(e) => setEnquiryMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 glass-input rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3A70] text-[#0F172A]"
                    />
                  </div>

                  {enquirySubmitted ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      Enquiry received! Our Ranchi corporate team will reach out at {enquiryContact}.
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#0A3A70] text-white hover:bg-[#072850] rounded-xl text-xs font-bold shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      Submit Corporate Enquiry
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center py-8 border-t border-[#0F172A]/15 text-xs opacity-80 font-medium gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-white shadow-xs border border-[#0A3A70]/10 flex items-center justify-center overflow-hidden">
              <GenovarisIconMark size={18} />
            </div>
            <span>&copy; {new Date().getFullYear()} <strong>Genovaris Lifesciences Private Limited</strong>. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px]">
            <a href="#about" className="hover:underline">About Us</a>
            <a href="#products" className="hover:underline">Products</a>
            <a href="#focus" className="hover:underline">Our Focus</a>
            <a href="#quality" className="hover:underline">Quality Assurance</a>
            <button 
              onClick={(e) => {
                setModalOriginRect(e.currentTarget.getBoundingClientRect());
                setIsContactOpen(true);
              }} 
              className="hover:underline cursor-pointer"
            >
              Corporate Office
            </button>
          </div>
        </footer>

      </div>

      {/* ========================================================================= */}
      {/* iOS-STYLE APP OPEN/CLOSE MODALS (Spring physics, backdrop blur, grab bar) */}
      {/* ========================================================================= */}

      {/* 1. Medical Product Detail Dossier Modal */}
      <IOSModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        maxWidthClass="max-w-xl"
        originRect={modalOriginRect}
      >
        {selectedProduct && (
          <div className="relative pt-2">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 ${
                selectedProduct.isComingSoon 
                  ? 'bg-amber-500/15 text-amber-800 border border-amber-500/25' 
                  : 'bg-[#2E8B1E]/10 text-[#2E8B1E]'
              }`}>
                {selectedProduct.isComingSoon && <Sparkles className="w-3.5 h-3.5 text-amber-600" />}
                {selectedProduct.numberPrefix} • {selectedProduct.isComingSoon ? 'Pipeline Formulation (Coming Soon)' : selectedProduct.therapeuticSegment}
              </span>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <h2 className="text-3xl font-black text-[#0A3A70] tracking-tight">
                {selectedProduct.name}
              </h2>
              <span className="text-xs font-mono font-bold opacity-60">
                ({selectedProduct.code})
              </span>
            </div>

            <div className="text-sm font-bold text-[#0F172A] opacity-80 mb-4">
              {selectedProduct.category}
            </div>

            {/* Coming Soon Alert Callout */}
            {selectedProduct.isComingSoon && (
              <div className="p-3.5 bg-amber-50/90 border border-amber-200 rounded-2xl mb-4 text-xs font-medium text-amber-900 flex items-start gap-2.5 shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-950 block mb-0.5">Formulation Phase • Launching Soon</span>
                  This specialized cardio-cellular formulation is currently undergoing final formulation validation and dissolution batch testing. Register your interest below to receive priority access upon launch.
                </div>
              </div>
            )}

            {/* Actives box */}
            <div className="bg-[#0A3A70]/5 p-4 rounded-2xl mb-4 border border-[#0A3A70]/10">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#0A3A70] mb-1">
                Active Key Ingredients:
              </div>
              <div className="text-sm font-semibold text-[#0F172A]">
                {selectedProduct.keyIngredients}
              </div>
            </div>

            <div className="space-y-4 text-xs font-medium leading-relaxed mb-6">
              <div>
                <strong className="block text-[#0A3A70] font-bold text-xs uppercase tracking-wider mb-1">Clinical Overview:</strong>
                <p className="opacity-85 text-slate-700">{selectedProduct.description}</p>
              </div>

              <div>
                <strong className="block text-[#0A3A70] font-bold text-xs uppercase tracking-wider mb-1">Mechanism & Rationale:</strong>
                <p className="opacity-85 text-slate-700">{selectedProduct.clinicalRationale}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Dosage Format</span>
                  <span className="font-bold text-slate-800 text-xs">{selectedProduct.dosageForm}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Standard Packaging</span>
                  <span className="font-bold text-slate-800 text-xs">{selectedProduct.packSize}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              {selectedProduct.isComingSoon ? (
                <button
                  onClick={() => {
                    const prod = selectedProduct;
                    setSelectedProduct(null);
                    setIsEnquiryOpen(true);
                    setEnquiryMessage(`Early access notification enquiry for ${prod.name} (${prod.category} - Coming Soon)`);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>Notify Me Upon Launch</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    const prod = selectedProduct;
                    setSelectedProduct(null);
                    setIsEnquiryOpen(true);
                    setEnquiryMessage(`Enquiry regarding ${prod.name} (${prod.category})`);
                  }}
                  className="flex-1 py-3 bg-[#0A3A70] text-white hover:bg-[#072850] rounded-xl text-xs font-bold shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Request Sample / Quotation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </IOSModal>

      {/* 2. About Genovaris Lifesciences Expanded Dossier Modal */}
      <IOSModal
        isOpen={isAboutExpanded}
        onClose={() => setIsAboutExpanded(false)}
        maxWidthClass="max-w-2xl"
        originRect={modalOriginRect}
      >
        <div className="relative pt-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GenovarisLogo variant="nav" />
            </div>
            <button 
              onClick={() => setIsAboutExpanded(false)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mb-4">
            <span className="text-xs font-bold text-[#2E8B1E] uppercase tracking-wider block mb-1">Corporate Mission & Standards</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A3A70] tracking-tight">
              Innovating Life. Enhancing Tomorrow.
            </h2>
          </div>

          <div className="space-y-4 text-xs font-medium text-slate-700 leading-relaxed mb-6">
            <p>
              <strong>Genovaris Lifesciences Private Limited</strong> is an Indian life sciences and healthcare organization focused on research-grounded, nutrition-oriented solutions. Our therapeutic and supplemental formulations are engineered to bolster normal physiological function, cellular longevity, and patient resilience.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
                <div className="text-xs font-bold text-[#0A3A70] mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#2E8B1E]" />
                  Scientific Rigor
                </div>
                <p className="text-[11px] opacity-80 leading-normal">
                  All active compounds undergo rigorous dissolution profiling, bio-chelation stability testing, and bioavailability verification.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <div className="text-xs font-bold text-[#2E8B1E] mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2E8B1E]" />
                  Regulatory Integrity
                </div>
                <p className="text-[11px] opacity-80 leading-normal">
                  FSSAI License 21126016000816 and GSTIN 20AMDPA2242F2Z2 compliant with national dietary and pharmaceutical distribution frameworks.
                </p>
              </div>
            </div>

            <div>
              <strong className="block text-[#0A3A70] font-bold text-xs uppercase tracking-wider mb-1">Therapeutic Focus Horizons:</strong>
              <ul className="grid grid-cols-2 gap-2 text-[11px]">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#2E8B1E]" /> Orthopedic & Osteo-Nutritional</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#2E8B1E]" /> Hematology & Iron Transport</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#2E8B1E]" /> Neuro-Cognitive Protection</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#2E8B1E]" /> Clinical Protein Delivery</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#2E8B1E]" /> High-Concentration Vitamin D3</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#2E8B1E]" /> Hepatic & Metabolic Support</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                setIsAboutExpanded(false);
                setIsContactOpen(true);
              }}
              className="flex-1 py-3 bg-[#0A3A70] text-white hover:bg-[#072850] rounded-xl text-xs font-bold shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Contact Headquarters</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsAboutExpanded(false)}
              className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </IOSModal>

      {/* 3. Physiological Equilibrium & Kinetic Simulation Modal */}
      <IOSModal
        isOpen={isEquilibriumExpanded}
        onClose={() => setIsEquilibriumExpanded(false)}
        maxWidthClass="max-w-lg"
        originRect={modalOriginRect}
      >
        <div className="relative pt-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#0A3A70]/10 text-[#0A3A70] flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#2E8B1E]" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0A3A70]">Cellular Homeostasis Model</h3>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Fluid Dynamic Simulation</span>
              </div>
            </div>
            <button 
              onClick={() => setIsEquilibriumExpanded(false)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed font-medium mb-5">
            The liquid shader renders a 4K GPU procedural wave simulating cellular membrane fluxes, osmotic gradients, and molecular equilibrium. You can fine-tune the kinetic velocity and appearance parameters below.
          </p>

          {/* Interactive Simulation Controls */}
          <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6">
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-[#0A3A70] mb-2">
                <span>Wave Speed Velocity</span>
                <span className="font-mono text-[#2E8B1E] bg-[#2E8B1E]/10 px-2 py-0.5 rounded">{motionSpeed.toFixed(1)}x</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[0.5, 1.0, 1.8, 2.5].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setMotionSpeed(spd)}
                    className={`py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      Math.abs(motionSpeed - spd) < 0.1 
                        ? 'bg-[#0A3A70] text-white shadow-xs' 
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-bold text-[#0A3A70] mb-1.5">
                <span>Fluid Density & Opacity</span>
                <span className="font-mono text-slate-600">{Math.round(waveOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.3"
                max="1.0"
                step="0.05"
                value={waveOpacity}
                onChange={(e) => setWaveOpacity(parseFloat(e.target.value))}
                className="w-full accent-[#2E8B1E] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <span className="text-xs font-bold text-[#0A3A70]">Animation State</span>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-slate-50 transition"
              >
                {isPaused ? <Play className="w-3.5 h-3.5 text-[#2E8B1E]" /> : <Pause className="w-3.5 h-3.5 text-amber-600" />}
                <span>{isPaused ? 'Resume Wave' : 'Freeze Wave'}</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setIsEquilibriumExpanded(false)}
              className="w-full py-2.5 bg-[#0A3A70] text-white rounded-xl text-xs font-bold hover:bg-[#072850] transition cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </IOSModal>

      {/* 4. Focus Area Deep-Dive Modal */}
      <IOSModal
        isOpen={!!selectedFocusCard}
        onClose={() => setSelectedFocusCard(null)}
        maxWidthClass="max-w-lg"
        originRect={modalOriginRect}
      >
        {selectedFocusCard && (
          <div className="relative pt-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#0A3A70]/10 text-[#0A3A70] flex items-center justify-center">
                  {selectedFocusCard === 'health' && <HeartPulse className="w-5 h-5 text-[#2E8B1E]" />}
                  {selectedFocusCard === 'nutrition' && <Pill className="w-5 h-5 text-[#0A3A70]" />}
                  {selectedFocusCard === 'living' && <Sparkles className="w-5 h-5 text-[#2E8B1E]" />}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#2E8B1E] uppercase tracking-wider block">Therapeutic Pillar</span>
                  <h3 className="text-2xl font-black text-[#0A3A70] tracking-tight">
                    {selectedFocusCard === 'health' && 'Everyday Health'}
                    {selectedFocusCard === 'nutrition' && 'Targeted Nutrition'}
                    {selectedFocusCard === 'living' && 'Better Living'}
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedFocusCard(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-medium text-slate-700 leading-relaxed mb-6">
              {selectedFocusCard === 'health' && (
                <>
                  <p>
                    Everyday vitality starts at the micronutrient baseline. Genovaris Lifesciences formulates foundational supplements to ensure daily physiological resilience against environmental stress, metabolic depletion, and dietary deficiencies.
                  </p>
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="font-bold text-[#0A3A70] text-xs">Clinical Focus Pillars:</div>
                    <ul className="space-y-1.5 text-[11px]">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B1E]" /> Sustained micronutrient repletion without gastric burden</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B1E]" /> Balanced co-factor integration (Zinc, Magnesium, Folate)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B1E]" /> Support for immune defense and routine physical vitality</li>
                    </ul>
                  </div>
                </>
              )}

              {selectedFocusCard === 'nutrition' && (
                <>
                  <p>
                    Targeted nutrition goes beyond generic multi-vitamins. We deliver precision molecular complexes designed for specific anatomical targets—from the osteoid matrix (Bonebro) to cerebral neurotransmitter synthesis (Cerebra-CB).
                  </p>
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="font-bold text-[#0A3A70] text-xs">Bioavailability Optimization:</div>
                    <ul className="space-y-1.5 text-[11px]">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B1E]" /> Vitamin K2-7 (MK-7) for targeted calcium osteocalcin binding</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B1E]" /> Ferrous Ascorbate chelate with high mucosal tolerance</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B1E]" /> High PDCAAS microfiltered whey peptides (Protizen-HP)</li>
                    </ul>
                  </div>
                </>
              )}

              {selectedFocusCard === 'living' && (
                <>
                  <p>
                    Health solutions must be practical, safe, and pleasant for consistent long-term use. Genovaris engineers our formulations to maximize patient adherence, eliminate noxious aftertastes, and guarantee safety.
                  </p>
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="font-bold text-[#0A3A70] text-xs">Adherence & Purity Principles:</div>
                    <ul className="space-y-1.5 text-[11px]">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B1E]" /> Superior GI tolerance with zero metallic aftertaste</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B1E]" /> Moisture-sealed pharmaceutical blister strip packaging</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B1E]" /> Non-GMO, gluten-free, heavy-metal assayed ingredients</li>
                    </ul>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-3 pt-3 border-t border-slate-100">
              <a
                href="#products"
                onClick={() => setSelectedFocusCard(null)}
                className="flex-1 py-3 bg-[#0A3A70] text-white hover:bg-[#072850] rounded-xl text-xs font-bold shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>View Products in this Area</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSelectedFocusCard(null)}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </IOSModal>

      {/* 5. Quality & Regulatory Certificate Verification Modal */}
      <IOSModal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        maxWidthClass="max-w-lg"
        originRect={modalOriginRect}
      >
        {selectedCert && (
          <div className="relative pt-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#2E8B1E] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-[#2E8B1E]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#2E8B1E] uppercase tracking-wider block">Official Verification</span>
                  <h3 className="text-xl font-black text-[#0A3A70] tracking-tight">
                    {selectedCert === 'fssai' ? 'FSSAI License Verification' : 'GST Tax Entity Registry'}
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCert(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {selectedCert === 'fssai' ? (
              <div className="space-y-4 text-xs font-medium text-slate-700 mb-6">
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                  <div className="text-[11px] uppercase font-bold text-[#2E8B1E] mb-1">Registration Identifier</div>
                  <div className="font-mono text-2xl font-black text-[#0A3A70] tracking-wider mb-2">21126016000816</div>
                  <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Validated under Food Safety and Standards Act, 2006
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="opacity-60">License Category:</span>
                    <span className="font-bold text-[#0A3A70]">Dietary & Nutritional Supplements</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="opacity-60">Entity Name:</span>
                    <span className="font-bold text-[#0A3A70]">Genovaris Lifesciences Private Limited</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="opacity-60">Registered State:</span>
                    <span className="font-bold text-[#0A3A70]">Jharkhand, India</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="opacity-60">Batch Release Protocol:</span>
                    <span className="font-bold text-[#2E8B1E]">Full CoA Monograph Release</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-medium text-slate-700 mb-6">
                <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl">
                  <div className="text-[11px] uppercase font-bold text-[#0A3A70] mb-1">GSTIN Identification</div>
                  <div className="font-mono text-2xl font-black text-[#0A3A70] tracking-wider mb-2">20AMDPA2242F2Z2</div>
                  <div className="text-xs font-semibold text-blue-900 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#0A3A70]" /> Registered Corporate Commercial Taxpayer
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="opacity-60">Legal Entity:</span>
                    <span className="font-bold text-[#0A3A70]">Genovaris Lifesciences Private Limited</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="opacity-60">State Jurisdiction:</span>
                    <span className="font-bold text-[#0A3A70]">Jharkhand (State Code 20)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="opacity-60">Principal Office:</span>
                    <span className="font-bold text-[#0A3A70]">Dhobi Ghat Road, Lalpur, Ranchi 834001</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="opacity-60">Operation Scope:</span>
                    <span className="font-bold text-[#2E8B1E]">Wholesale & PCD Pharma Distribution</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedCert(null)}
                className="w-full py-2.5 bg-[#0A3A70] text-white rounded-xl text-xs font-bold hover:bg-[#072850] transition cursor-pointer"
              >
                Close Verification
              </button>
            </div>
          </div>
        )}
      </IOSModal>

      {/* 6. General Corporate Enquiry Modal */}
      <IOSModal
        isOpen={isEnquiryOpen}
        onClose={() => { setIsEnquiryOpen(false); setEnquirySubmitted(false); }}
        maxWidthClass="max-w-md"
        originRect={modalOriginRect}
      >
        <div className="relative pt-2">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0A3A70]/10 text-[#0A3A70] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#2E8B1E]" />
            </div>
            <button 
              onClick={() => { setIsEnquiryOpen(false); setEnquirySubmitted(false); }}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-2xl font-black text-[#0A3A70] tracking-tight mb-1">
            Genovaris Corporate Enquiry
          </h3>
          <p className="text-xs opacity-75 font-medium mb-5">
            Connect with our Ranchi headquarters for hospital supply, doctor samples, or distribution franchise.
          </p>

          <form onSubmit={handleEnquirySubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-bold text-[#0A3A70] uppercase tracking-wider mb-1">Full Name / Hospital Name</label>
              <input 
                type="text" 
                placeholder="e.g. Dr. A. Sharma" 
                value={enquiryName}
                onChange={(e) => setEnquiryName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3A70]" 
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#0A3A70] uppercase tracking-wider mb-1">Contact Phone or Email *</label>
              <input 
                type="text" 
                required
                placeholder="+91 8102946105 or email" 
                value={enquiryContact}
                onChange={(e) => setEnquiryContact(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3A70]" 
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#0A3A70] uppercase tracking-wider mb-1">Requirement Note</label>
              <textarea 
                rows={2}
                placeholder="Tell us about the products or quantities needed..."
                value={enquiryMessage}
                onChange={(e) => setEnquiryMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3A70]" 
              />
            </div>

            {enquirySubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                Thank you! Your inquiry has been sent to genovarislifesciences@gmail.com.
              </div>
            ) : (
              <button 
                type="submit"
                className="w-full py-3.5 bg-[#0A3A70] text-white hover:bg-[#072850] rounded-xl font-bold text-xs shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
              >
                Send Inquiry Now
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>
      </IOSModal>

      {/* 7. Corporate Contact Modal */}
      <IOSModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        maxWidthClass="max-w-lg"
        originRect={modalOriginRect}
      >
        <div className="relative pt-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <GenovarisLogo variant="nav" />
            </div>
            <button 
              onClick={() => setIsContactOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-2xl font-black text-[#0A3A70] tracking-tight mb-2">
            Corporate Office & Registry
          </h3>

          <div className="space-y-4 text-xs font-medium py-3 border-y border-slate-100">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#2E8B1E] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#0A3A70]">Registered Office (Jharkhand):</div>
                <address className="not-italic opacity-85 leading-relaxed">
                  3A, Third Floor, Aparajita Apt., Dhobi Ghat Road, Lalpur,<br />
                  Ranchi, Jharkhand – 834001, India
                </address>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#0A3A70] shrink-0" />
              <div>
                <span className="font-bold text-[#0A3A70]">Phone Contact: </span>
                <a href="tel:8102946105" className="font-bold text-[#2E8B1E] hover:underline">
                  8102946105 / +91 8102946105
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#0A3A70] shrink-0" />
              <div>
                <span className="font-bold text-[#0A3A70]">Email: </span>
                <a href="mailto:genovarislifesciences@gmail.com" className="text-[#0A3A70] font-semibold hover:underline">
                  genovarislifesciences@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Award className="w-4 h-4 text-[#2E8B1E] shrink-0" />
              <div>
                <span className="font-bold text-[#0A3A70]">FSSAI License: </span>
                <span className="font-mono font-bold text-[#2E8B1E]">21126016000816</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-[#0A3A70] shrink-0" />
              <div>
                <span className="font-bold text-[#0A3A70]">GST Identification: </span>
                <span className="font-mono font-bold text-[#0A3A70]">20AMDPA2242F2Z2</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setIsContactOpen(false)}
              className="px-6 py-2.5 bg-[#0A3A70] text-white rounded-xl text-xs font-bold hover:bg-[#072850] transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </IOSModal>

      {/* ========================================================================= */}
      {/* 8. MOBILE VIEW SLIDE-OVER MENU DRAWER (Top-Left Menu Bar with All Options) */}
      {/* ========================================================================= */}
      <div 
        className={`fixed inset-0 z-50 md:hidden flex transition-all duration-300 ${
          isMobileMenuOpen ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Backdrop Blur Overlay */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className={`fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm cursor-pointer transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />

        {/* Slide-over panel from top-left */}
        <div
          className={`relative w-[86vw] max-w-sm h-full bg-[#0F172A] text-white shadow-2xl z-10 flex flex-col justify-between overflow-y-auto border-r border-white/10 transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
              {/* Drawer Top Header (Menu Bar on Top) */}
              <div className="p-3.5 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#0F172A]/95 sticky top-0 z-20 backdrop-blur-md">
                <a 
                  href="#" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  <GenovarisLogo variant="nav" />
                </a>

                <div className="flex items-center gap-2">
                  {/* Enquire Quick Action in Top Menu Bar */}
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setSelectedProduct(null);
                      setIsEnquiryOpen(true);
                    }}
                    className="px-3.5 py-1.5 bg-[#2E8B1E] hover:bg-[#257318] active:scale-95 text-white font-bold rounded-full text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer border border-white/10"
                    title="Make an Enquiry"
                  >
                    <span>Enquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition cursor-pointer"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Navigation Options List */}
              <div className="p-4 space-y-2 flex-1 overflow-y-auto">
                {/* Enquire Featured Action Card on Top */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setSelectedProduct(null);
                    setIsEnquiryOpen(true);
                  }}
                  className="w-full mb-3 p-3.5 bg-gradient-to-r from-[#0A3A70] to-[#2E8B1E] hover:from-[#082e5b] hover:to-[#257318] active:scale-98 text-white rounded-2xl text-left flex items-center justify-between shadow-lg transition cursor-pointer border border-white/15 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold tracking-tight flex items-center gap-1.5">
                        <span>Make an Enquiry</span>
                        <span className="text-[10px] bg-white/25 text-white px-2 py-0.5 rounded-full font-bold">Priority</span>
                      </div>
                      <div className="text-[11px] text-white/80">Hospital supply, doctor samples & distribution</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white transition shrink-0" />
                </button>

                <div className="flex items-center justify-between px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-[#2E8B1E]">
                  <span>Explore Portfolio & Company</span>
                  <span className="text-white/40">Navigation</span>
                </div>

                {/* Option 1: About */}
                <a
                  href="#about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 transition group border border-white/5"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/10 group-hover:bg-[#2E8B1E] text-white flex items-center justify-center shrink-0 transition">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white">About Genovaris</div>
                    <div className="text-[11px] text-slate-400 truncate">Mission, research rigor & Ranchi HQ</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition shrink-0" />
                </a>

                {/* Option 2: Products */}
                <a
                  href="#products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 transition group border border-white/5"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#2E8B1E]/20 text-[#2E8B1E] group-hover:bg-[#2E8B1E] group-hover:text-white flex items-center justify-center shrink-0 transition">
                    <Pill className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Medical Products</span>
                      <span className="text-[9px] font-black uppercase tracking-wider bg-[#2E8B1E]/20 text-[#2E8B1E] px-1.5 py-0.5 rounded">
                        4 Live + 1 Pipeline
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">Bonebro, Red-XT, Cerebra-CB & more</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition shrink-0" />
                </a>

                {/* Option 3: Our Focus */}
                <a
                  href="#focus"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 transition group border border-white/5"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/10 group-hover:bg-[#2E8B1E] text-white flex items-center justify-center shrink-0 transition">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white">Our Focus Areas</div>
                    <div className="text-[11px] text-slate-400 truncate">Everyday Health, Nutrition & Living</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition shrink-0" />
                </a>

                {/* Option 4: Clinical Monographs */}
                <a
                  href="#monographs"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 transition group border border-white/5"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/10 group-hover:bg-[#2E8B1E] text-white flex items-center justify-center shrink-0 transition">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white">Clinical Monographs</div>
                    <div className="text-[11px] text-slate-400 truncate">Assays, bio-chelation & CSV export</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition shrink-0" />
                </a>

                {/* Option 5: Quality */}
                <a
                  href="#quality"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 transition group border border-white/5"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/10 group-hover:bg-[#2E8B1E] text-white flex items-center justify-center shrink-0 transition">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white">Quality</div>
                    <div className="text-[11px] text-slate-400 truncate">FSSAI: 21126016000816 • GST Verified</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition shrink-0" />
                </a>

                {/* Option 6: Corporate Contact Modal */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsContactOpen(true);
                  }}
                  className="w-full text-left flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 transition group border border-white/5 cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/10 group-hover:bg-[#2E8B1E] text-white flex items-center justify-center shrink-0 transition">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white">Headquarters Office</div>
                    <div className="text-[11px] text-slate-400 truncate">Lalpur, Ranchi – 834001, Jharkhand</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition shrink-0" />
                </button>

                {/* Option 7: Cellular Simulation Modal */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsEquilibriumExpanded(true);
                  }}
                  className="w-full text-left flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 transition group border border-white/5 cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/10 group-hover:bg-[#2E8B1E] text-white flex items-center justify-center shrink-0 transition">
                    <Activity className="w-4 h-4 text-[#2E8B1E]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white">Fluid Kinetic Simulation</div>
                    <div className="text-[11px] text-slate-400 truncate">Cellular homeostasis & wave controls</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition shrink-0" />
                </button>
              </div>

              {/* Drawer Bottom Actions & Direct Contacts */}
              <div className="p-4 border-t border-white/10 bg-slate-950/70 space-y-3">
                {/* Main Action Button */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setSelectedProduct(null);
                    setIsEnquiryOpen(true);
                  }}
                  className="w-full py-3 bg-[#2E8B1E] hover:bg-[#257318] active:scale-95 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                >
                  <span>Request Hospital Sample / Supply</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                {/* Quick Phone & Email row */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <a
                    href="tel:8102946105"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-slate-300 font-semibold flex items-center gap-2 border border-white/5"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#2E8B1E] shrink-0" />
                    <span className="truncate">8102946105</span>
                  </a>
                  <a
                    href="mailto:genovarislifesciences@gmail.com"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-slate-300 font-semibold flex items-center gap-2 border border-white/5"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#2E8B1E] shrink-0" />
                    <span className="truncate">Email Team</span>
                  </a>
                </div>

                {/* Official Compliance Footer */}
                <div className="text-[10px] text-slate-400 flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2E8B1E]"></span>
                    FSSAI: 21126016000816
                  </span>
                  <span>Ranchi, Jharkhand</span>
                </div>
              </div>
        </div>
      </div>

    </div>
  );
}
