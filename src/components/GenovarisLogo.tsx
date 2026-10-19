import React from 'react';

interface GenovarisLogoProps {
  variant?: 'card' | 'inline' | 'nav' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * GenovarisIconMark
 * 
 * Mathematically precise vector SVG emblem featuring:
 * 1. Stylized clinical 'G' monogram with deep navy-to-cyan gradient
 * 2. Bio-leaf vitality accent with emerald chlorophyll gradient
 * 3. Left-arc molecular DNA double-helix nodes and interconnecting rungs
 * 4. High-contrast sub-pixel alignment for crystal clarity at any scale (from 16px to 256px+)
 */
export function GenovarisIconMark({ 
  size = 36, 
  className = '' 
}: { 
  size?: number; 
  className?: string;
}) {
  // Unique gradient IDs to prevent DOM collision if rendered multiple times
  const idPrefix = React.useId().replace(/:/g, '');

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="Genovaris Lifesciences Emblem"
      shapeRendering="geometricPrecision"
    >
      <defs>
        {/* Primary Monogram Gradient: Deep Corporate Navy to Active Cerulean */}
        <linearGradient id={`${idPrefix}-navy-grad`} x1="12" y1="14" x2="88" y2="86" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#062244" />
          <stop offset="45%" stopColor="#0A3A70" />
          <stop offset="85%" stopColor="#0B55A8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

        {/* Bio-Leaf Vitality Gradient: Deep Chlorophyll to Fresh Emerald */}
        <linearGradient id={`${idPrefix}-leaf-grad`} x1="55" y1="78" x2="88" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#15803D" />
          <stop offset="50%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#4ADE80" />
        </linearGradient>

        {/* DNA Helix Node Gradient */}
        <linearGradient id={`${idPrefix}-dna-green`} x1="10" y1="20" x2="30" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#16A34A" />
          <stop offset="100%" stopColor="#4ADE80" />
        </linearGradient>

        {/* Subtle Specular Glow Filter */}
        <filter id={`${idPrefix}-glow`} x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#0A3A70" floodOpacity="0.22" />
        </filter>

        {/* Leaf Drop Shadow */}
        <filter id={`${idPrefix}-leaf-shadow`} x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0.5" dy="1.5" stdDeviation="1" floodColor="#064E3B" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Group with subtle drop shadow for depth */}
      <g filter={`url(#${idPrefix}-glow)`}>
        
        {/* ================================================================= */}
        {/* 1. DNA HELIX STRAND & MOLECULAR NODES (Ascending Left Arc)        */}
        {/* ================================================================= */}
        <g id="dna-helix-nodes">
          {/* Base Helix Hydrogen Bond Rungs */}
          <line x1="16" y1="28" x2="28" y2="24" stroke="#0A3A70" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.85" />
          <line x1="14" y1="40" x2="26" y2="38" stroke="#0A3A70" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.85" />
          <line x1="15" y1="52" x2="25" y2="52" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.9" />

          {/* Molecular Node Pairs */}
          {/* Pair 1 (Top Left) */}
          <circle cx="16" cy="28" r="3.2" fill={`url(#${idPrefix}-navy-grad)`} stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="28" cy="24" r="3.6" fill={`url(#${idPrefix}-dna-green)`} stroke="#FFFFFF" strokeWidth="1" />

          {/* Pair 2 (Mid-Upper Left) */}
          <circle cx="14" cy="40" r="3.4" fill={`url(#${idPrefix}-dna-green)`} stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="26" cy="38" r="3.2" fill={`url(#${idPrefix}-navy-grad)`} stroke="#FFFFFF" strokeWidth="1" />

          {/* Pair 3 (Mid-Lower Left) */}
          <circle cx="15" cy="52" r="3.5" fill={`url(#${idPrefix}-navy-grad)`} stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="25" cy="52" r="3.2" fill={`url(#${idPrefix}-dna-green)`} stroke="#FFFFFF" strokeWidth="1" />
        </g>

        {/* ================================================================= */}
        {/* 2. THE 'G' MONOGRAM EMBLEM                                        */}
        {/* Outer sweeping clinical arc + horizontal inner crossbar           */}
        {/* ================================================================= */}
        {/* Main Swept Arc: from top-right around clockwise/counter-clockwise */}
        <path
          d="M 74 26 
             C 66 17, 56 12, 45 12 
             C 24.5 12, 10 27.5, 10 49 
             C 10 71 25.5 87 47 87 
             C 67 87, 82 74, 85 54 
             L 85 48 
             L 50 48"
          fill="none"
          stroke={`url(#${idPrefix}-navy-grad)`}
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Interior Precision G-Crossbar Accent Bar */}
        <line
          x1="52"
          y1="48"
          x2="85"
          y2="48"
          stroke={`url(#${idPrefix}-navy-grad)`}
          strokeWidth="11"
          strokeLinecap="round"
        />

        {/* Inner Specular Highlight Arc (adds metallic/clinical glass dimension) */}
        <path
          d="M 64 21 
             C 57 17.5, 49 16, 43 16 
             C 28 16, 17 28, 16 44"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeOpacity="0.45"
        />

        {/* ================================================================= */}
        {/* 3. BIO-LEAF VITALITY ACCENT (Lower Right Counter of G)            */}
        {/* ================================================================= */}
        <g filter={`url(#${idPrefix}-leaf-shadow)`}>
          {/* Main Leaf Silhouette */}
          <path
            d="M 54 78 
               C 54 78, 59 66, 73 60 
               C 83 55, 89 57, 90 57 
               C 90 57, 88 68, 80 77 
               C 72 86, 62 86, 54 78 Z"
            fill={`url(#${idPrefix}-leaf-grad)`}
          />

          {/* Leaf Inner Midrib/Vein */}
          <path
            d="M 55 78 
               C 62 76, 72 70, 89 58"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeOpacity="0.75"
          />

          {/* Leaf Secondary Delicate Vein */}
          <path
            d="M 66 74 
               C 70 70, 76 68, 81 66"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeOpacity="0.55"
          />
        </g>

        {/* Small Vitality Bio-Sparkle/Dot */}
        <circle cx="85" cy="48" r="2.2" fill="#FFFFFF" stroke="#0A3A70" strokeWidth="1" />
      </g>
    </svg>
  );
}

export default function GenovarisLogo({ 
  variant = 'card',
  size = 'md',
  className = '' 
}: GenovarisLogoProps) {
  if (variant === 'icon') {
    const pxSize = size === 'sm' ? 28 : size === 'lg' ? 48 : 36;
    return <GenovarisIconMark size={pxSize} className={className} />;
  }

  if (variant === 'nav' || variant === 'inline') {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        {/* White Logo Badge Box with pristine vector icon mark */}
        <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-[#0A3A70]/10 flex items-center justify-center shrink-0 p-1 group-hover:scale-105 group-hover:shadow-sm transition-all duration-200">
          <GenovarisIconMark size={32} />
        </div>

        {/* Typography */}
        <div className="flex flex-col justify-center leading-none">
          <div className="text-xl font-extrabold tracking-wide flex items-center uppercase font-sans">
            <span className="text-[#0A3A70]">Geno</span>
            <span className="text-[#2E8B1E]">varis</span>
          </div>

          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-3 h-[1px] bg-[#0A3A70]/60" />
            <p className="text-[0.6rem] font-bold tracking-[0.28em] text-[#0A3A70] uppercase">Lifesciences</p>
            <div className="w-3 h-[1px] bg-[#0A3A70]/60" />
          </div>

          <p className="text-[0.55rem] font-medium tracking-wide mt-0.5 hidden lg:block opacity-90">
            <span className="text-[#0A3A70]">Innovating Life. </span>
            <span className="text-[#2E8B1E]">Enhancing Tomorrow.</span>
          </p>
        </div>
      </div>
    );
  }

  // Card / Showcase variant
  return (
    <div className={`flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-[#0A3A70]/10 font-sans ${className}`}>
      
      {/* Icon Badge Box with clear vector SVG */}
      <div className="relative w-32 h-32 mb-5 flex items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-[#0A3A70]/10 shadow-xs p-4">
        <GenovarisIconMark size={104} />
      </div>

      {/* Typography */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-wide flex justify-center uppercase">
          <span className="text-[#0A3A70]">Geno</span>
          <span className="text-[#2E8B1E]">varis</span>
        </h1>
        
        <div className="flex items-center justify-center gap-3 mt-1.5 mb-2.5">
          <div className="w-12 h-[1px] bg-[#0A3A70]/40"></div>
          <p className="text-[0.65rem] font-bold tracking-[0.3em] text-[#0A3A70] uppercase">Lifesciences</p>
          <div className="w-12 h-[1px] bg-[#0A3A70]/40"></div>
        </div>
        
        <p className="text-xs font-semibold tracking-wide">
          <span className="text-[#0A3A70]">Innovating Life. </span>
          <span className="text-[#2E8B1E]">Enhancing Tomorrow.</span>
        </p>
      </div>
      
    </div>
  );
}
