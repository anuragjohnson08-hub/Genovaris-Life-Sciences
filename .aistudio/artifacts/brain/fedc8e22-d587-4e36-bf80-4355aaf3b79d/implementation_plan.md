# Implementation Plan: Apple-Style Frosted Glassmorphism Architecture

## 1. Executive Summary & Design Vision

Transform the Genovaris Lifesciences web application into a cohesive, high-end Apple-style frosted glass interface (*macOS / visionOS aesthetic*). The updated visual language will feature:
- **Balanced Medium Frost & Optical Clarity**: Multi-stop backdrop blurs (`16px–24px` / `backdrop-blur-xl`) with optical transmission balances (`bg-white/75` to `bg-white/88` for light glass, `bg-[#0F172A]/15` to `bg-[#0F172A]/25` for tinted containers) preserving 100% WCAG AA text legibility against the underlying 3D liquid waves.
- **Subtle Inner Border Reflections (Chiseled Bevels)**: Double-edge specular lighting using hairline perimeter borders (`border-white/35`) combined with an inset top-light reflection (`inset 0 1px 1px 0 rgba(255, 255, 255, 0.55)` and `inset 0 -1px 1px 0 rgba(0, 0, 0, 0.04)`).
- **Dynamic Cursor-Tracking Specular Glare**: Enhanced mathematical light-cone tracking across interactive cards that illuminates an iridescent radial sheen and perimeter edge shimmer that follows the user's cursor.
- **Universal Application Across All Views**: Complete coverage across navigation, hero chips, bento grid, medical product cards, research monograph tables, quality cards, corporate forms, and iOS expansion modals.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Apple-Style Glass Architecture                  │
├────────────────────────────────────────────────────────────────────────┤
│  Top Inner Specular Highlight:  inset 0 1.5px 0.5px rgba(255,255,255,0.6)
│  Surface Fill:                  linear-gradient(135deg, white/85, white/65)
│  Backdrop Filter:               blur(20px) saturate(180%)              │
│  Outer Hairline Border:         1px solid rgba(255, 255, 255, 0.38)    │
│  Cursor-Follow Glare:           radial-gradient(circle at cursor, ...) │
│  Bottom Inset Shadow:           inset 0 -1px 1px rgba(15, 23, 42, 0.05)│
│  Deep Ambient Shadow:           0 20px 45px -15px rgba(10,58,112,0.12) │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Component-by-Component Glass Transformation Plan

### A. Global Glass Utility Classes (`src/index.css`)
Define standardized, reusable CSS classes to ensure uniform lighting physics:
1. `.glass-panel`: Standard frosted card (`backdrop-blur-xl`, `bg-white/80`, `border border-white/40`, inner specular bevel `inset 0 1.5px 0.5px rgba(255,255,255,0.7)`).
2. `.glass-panel-elevated`: Floating element class for sticky nav and modals with heightened multi-stop drop shadow and chromatic edge shimmer.
3. `.glass-pill`: Pill button & status indicator with micro-reflection (`inset 0 1px 0 rgba(255,255,255,0.85)`).
4. `.glass-input`: Translucent input and select fields with luminous focus rings.
5. `.glass-amber`: Specialized warm pipeline glass for upcoming formulations (`CARDIOVARIS-Q`).

### B. Floating Top Navigation (`<nav>`) & Mobile Menu Drawer
- **Desktop Navbar**:
  - Convert the floating pill container into an ultra-smooth floating frosted bar with `backdrop-blur-2xl`, double-edge specular rim, and subtle saturation boost (`saturate(180%)`).
  - Active hover states on navigation links with soft ambient glass hover capsules (`hover:bg-white/45`).
  - "Enquire" button rendered with rich translucent emerald depth and high-specular glass gleam.
- **Mobile Menu Drawer**:
  - Frosted smoky glass drawer panel (`bg-[#0F172A]/85 backdrop-blur-2xl`) with hairline chrome dividers.
  - Translucent action cards and glass navigation items.

### C. Hero Section & Quick Pillars
- **FSSAI Compliance Badge**: Elevated frosted capsule with pulsing green bio-active indicator and crystal border.
- **Pillars Strip**: Chiseled frosted glass strip with soft inner lighting separating `Science • Wellness • Nutrition • Quality`.
- **Primary CTA Buttons**: Luminous glass button styles with specular light transmission on hover.

### D. Bento Grid Section (Card 1: About Dossier & Card 2: Kinetic Simulation)
- **Card 1 (About Genovaris)**: Multi-layer frosted glass card with illuminated inner border reflection, subtle surface gradient, and glass badge accents for FSSAI/GST.
- **Card 2 (Physiological Equilibrium, 295px)**: Frosted laboratory tile with interactive cursor sheen, dynamic lighting responsive to mouse movement, and crisp title-case typography.

### E. Medical Product Portfolio Grid (5 Formulations)
- **Flagship Available Cards (BONEBRO, RED-XT, CEREBRA-CB, PROTIZEN-HP)**:
  - Frosted Apple-style cards with `backdrop-blur-xl` allowing the fluid wave simulation to subtly illuminate behind the text.
  - Crisp high-contrast navy typography (`#0A3A70`, `#0F172A`) ensuring complete legibility.
  - Active ingredient sub-panels styled as frosted inset wells with subtle hairline boundaries.
- **Pipeline Formulation (CARDIOVARIS-Q - Coming Soon)**:
  - Amber-tinted frosted glass panel with golden specular highlights, glistening sparkle icon, and custom launch badge.
- **Portfolio Controls Bar**: Glass sorting dropdown and reset filter button.

### F. Clinical Monograph Workbench
- **Workbench Container**: Frosted laboratory glass frame with integrated controls.
- **Search & Filter Inputs**: Glass text input and segment selector with frosted translucent backgrounds.
- **Interactive Data Table**:
  - Frosted table header (`bg-white/60 backdrop-blur-md`).
  - Alternating glass rows with subtle highlight on hover (`hover:bg-white/50`).
  - Frosted export button with emerald icon accent.

### G. Quality Assurance & Transparency Section
- **FSSAI & GST Cards**: Twin frosted glass certificates with chiseled border bevels, distinct emerald and cobalt edge reflections, and glass badge verifiers.
- **Disclaimer Banner**: Frosted amber glass callout with clean hairline frame.

### H. Corporate Office & Direct Enquiry
- **Headquarters Card**: Frosted glass contact panel with glass icon badges.
- **Enquiry Form**: Frosted inputs (`.glass-input`) with smooth focus transitions, zero harsh borders, and luminous submit button.

### I. iOS-Style Expand Modals (`IOSModal`)
- Modal surface upgraded to frosted floating glass sheet with Apple grab-handle indicator, frosted backdrop blur, and origin-based spring expansion.

---

## 3. Interactive Physics & Specular Engine (`src/components/InteractiveCard.tsx`)

Enhance the `TiltCard` component:
- **Cursor Position Tracking**: Real-time calculation of cursor $X, Y$ percentages relative to card bounds.
- **Dual-Layer Specular Highlight**:
  1. *Inner Light Cone*: Soft 260px radial gradient that moves fluidly under the mouse pointer.
  2. *Iridescent Border Shimmer*: High-angle edge reflection along the top and corners that intensifies as the card tilts toward the light source.
- **Smooth Decay**: Smooth ease-out transition when the cursor exits the card boundary.

---

## 4. Technical Constraints & Verification

- **Zero Dual-React Dependencies**: All glass effects implemented strictly using pure CSS / Tailwind CSS v4 and standard React hooks (`useRef`, `useState`).
- **Performance**: Use compositor-only CSS properties (`transform`, `opacity`, `backdrop-filter`) with hardware acceleration (`gpu-wave`).
- **Accessibility & Contrast**: All body text maintained at $> 4.5:1$ contrast against frosted surfaces; headers at $> 7:1$.
- **Verification**: Run `compile_applet` and `lint_applet` to confirm a 100% clean TypeScript build with zero errors.
