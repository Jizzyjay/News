---
name: Editorial Dispatch
colors:
  surface: '#f7f9ff'
  surface-dim: '#d7dadf'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f9'
  surface-container: '#ebeef3'
  surface-container-high: '#e5e8ed'
  surface-container-highest: '#e0e3e8'
  on-surface: '#181c20'
  on-surface-variant: '#45464b'
  inverse-surface: '#2d3135'
  inverse-on-surface: '#eef1f6'
  outline: '#76777c'
  outline-variant: '#c6c6cc'
  surface-tint: '#5a5e69'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#181b25'
  on-primary-container: '#80838f'
  inverse-primary: '#c3c6d3'
  secondary: '#b9100b'
  on-secondary: '#ffffff'
  secondary-container: '#dd3022'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#101c2c'
  on-tertiary-container: '#788598'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dfe2ef'
  primary-fixed-dim: '#c3c6d3'
  on-primary-fixed: '#181b25'
  on-primary-fixed-variant: '#434751'
  secondary-fixed: '#ffdad5'
  secondary-fixed-dim: '#ffb4a8'
  on-secondary-fixed: '#410000'
  on-secondary-fixed-variant: '#930002'
  tertiary-fixed: '#d7e3f9'
  tertiary-fixed-dim: '#bbc7dc'
  on-tertiary-fixed: '#101c2c'
  on-tertiary-fixed-variant: '#3c4859'
  background: '#f7f9ff'
  on-background: '#181c20'
  surface-variant: '#e0e3e8'
typography:
  display-xl:
    fontFamily: Bodoni Moda
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.03em
  display-xl-mobile:
    fontFamily: Bodoni Moda
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Bodoni Moda
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: 0em
  lead:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 19px
    letterSpacing: 0em
  label-caps:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
  source-meta:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  timestamp:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.01em
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 2rem
  margin-mobile: 1rem
  space-xxs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style

The design system establishes a high-velocity, intellectually rigorous dispatch format. It bridges historical broadsheet gravitas with contemporary digital-native data density. Built for senior decision-makers, financial analysts, policy shapers, and cultural curators, the interface eliminates ambient fluff in favor of sharp, unyielding typographic structure.

The design movement combines **Contemporary Editorial Broadsheet** with **Technical Precision Minimalist**. High-contrast display typography commands visual authority across long-form headlines, while an ultra-structured, zero-radius grid provides extreme reading comfort and high-density information ingestion. The aesthetic rejects decorative softness; lines are razor-sharp, surfaces are stark newsprint whites and deep inky blacks, and functional highlights puncture the view with decisive urgency.

## Colors

The palette is engineered for rapid legibility and rigorous hierarchical separation:

- **Primary (`#0E121B`)**: Deep Editorial Ink. Used for principal display headlines, primary body copy, bold dividing rules, and active states.
- **Secondary (`#D92D20`)**: Broadsheet Crimson. Reserved exclusively for "Breaking News", critical bulletin flags, live status pulses, and destructive operational controls.
- **Tertiary (`#1D2939`)**: Sub-slate. Applied to secondary narrative copy, deck text, and heavy metadata labels.
- **Neutral (`#E4E7EC`)**: Architectural Grid Border. Dictates the strict 1px boundary system across all content quadrants, cards, and column dividers.
- **Canvas (`#FBFBFA`)**: Uncoated Newsprint. Delivers optical warmth, significantly softening contrast strain compared to pure digital white.
- **Surface (`#FFFFFF`)**: Crisp White Card Surface. Utilized for foreground editorial modules, floating audio controllers, and modal context drawers.
- **Category Accent (`#0F52BA`)**: High-Density Tech/Finance Indigo. Used for category slugs, topic tags, and interactive source signatures.

## Typography

The typographic tension relies on the juxtaposition between `Bodoni Moda` and `Geist`. 

- **Display & Headlines (`Bodoni Moda`)**: Expressive, dramatic contrast between hairline thins and dense stems. Headlines should never use loose tracking; keep it negative (`-0.02em` to `-0.03em`) to mimic physical print layout. All lead stories and section fronts must utilize this voice.
- **Editorial Body & Ingestion Data (`Geist`)**: Neutral, highly disciplined, and engineered for rapid scanning. The body copy preserves balanced line lengths (60–75 characters per line).
- **Metadata, Timestamps, and Flags**: Rendered strictly in uppercase or semi-bold variants of `Geist` with positive letter spacing (`0.02em` to `0.08em`), establishing clean data telemetry for source attribution (e.g., *BLOOMBERG*, *FINANCIAL TIMES*, *REUTERS*).

## Layout & Spacing

The layout is governed by a **strict broadsheet modular grid**:
- **Desktop (1280px+)**: 12-column dynamic framework flanked by rigid 1px horizontal and vertical neutral lines (`#E4E7EC`). Outer margin defaults to `2rem`. Column gutters sit at `1.5rem` (`gutter`).
- **Tablet (768px – 1279px)**: 8-column layout. Structural gutters drop to `1rem` (`gutter-sm`), outer margin adapts to `1.5rem`.
- **Mobile (< 768px)**: 4-column single/dual flow. Margins collapse to `1rem` (`margin-mobile`), stacking cards vertically while preserving full-width dividing borders.

### Content Quadrants & Rules
Articles do not float in disconnected space. Visual separation is achieved via `1px solid #E4E7EC` structural border dividers rather than empty space alone. The vertical rhythm adheres strictly to multiples of 4px and 8px: metadata elements sit at `space-xs` and `space-sm`, structural cards use `space-md` inner padding, and section departures require `space-xl` to `space-2xl`.

## Elevation & Depth

The design system is strictly non-skeuomorphic and flat, drawing depth entirely from **tonal surfaces and border stratification**:

- **Ground Level (Canvas)**: `#FBFBFA` forms the base sheet.
- **Structural Elevation Level 1 (Cards & Articles)**: Pure `#FFFFFF` resting against `#FBFBFA`, demarcated exclusively by a `1px solid #E4E7EC` border. No drop shadows.
- **Sticky / Floating Elevation Level 2 (Audio Bar, Breaking Ticker, Nav Headers)**: `#FFFFFF` with a bottom or top `1px solid #0E121B` ink rule. For persistent floating players (e.g., Audio Dispatch Bar), an ambient non-diffused technical rim shadow is permitted: `0 8px 24px -4px rgba(14, 18, 27, 0.08)`.
- **Contextual Overlays Level 3 (Search, Source Filters, Modals)**: Backed by a solid `#0E121B` backdrop at 40% opacity with 0px blur, emphasizing stark print-like presence over modern acrylic blurs.

## Shapes

Every element inside this system features an uncompromising corner radius of **0px**. 

Cards, badges, buttons, inputs, audio progress tracks, source indicators, and modal surfaces are cut cleanly at 90-degree angles. This zero-radius mandate reinforces the architectural, mechanical nature of early-edition broadsheet pagination and high-frequency data feeds. Any curvature is considered a defect.

## Components

### 1. Editorial Cards
- **Primary Hero Card**: Full 8 or 12-column span. Displays an authoritative `display-xl` Bodoni Moda headline, category slug, author byline, publication timestamp, and summary deck. Separated from siblings by a bottom `1px solid #E4E7EC` border.
- **Compact Feed Card**: 3 or 4-column modular box. Features a square 1:1 image thumbnail bounded by a 1px border, high-contrast category label, `headline-sm` headline, and source meta row.

### 2. Badges & Metadata Chips
- **Breaking News Pill**: Non-rounded solid `#D92D20` tag with `#FFFFFF` text in `label-caps`. Features an optional pulsing live indicator dot (a 4x4 square).
- **Source Badges**: Outlined boxes (`1px solid #E4E7EC`) featuring source names (e.g., BBC, CNN, TECHCRUNCH, BLOOMBERG) in `source-meta`, rendered in deep ink `#0E121B`. On hover, background shifts to `#0E121B` with inverted `#FFFFFF` text.

### 3. Buttons
- **Primary Action**: Solid `#0E121B` rectangle, `#FFFFFF` Geist medium text, 0px border radius, with `12px 24px` padding. On hover, background shifts to `#1D2939`.
- **Secondary Action**: Border button with `1px solid #0E121B`, transparent fill, `#0E121B` text. Inverts on hover.
- **Ghost/Text Action**: Uppercase `label-caps` with a permanent or hover-triggered `1px solid #0E121B` underline.

### 4. Audio Listen Bar (Sticky Player)
- Docked fixed at the viewport bottom. Height: 64px.
- Background: `#FFFFFF` with a top `2px solid #0E121B` border.
- Elements: Square Play/Pause action button (`40x40px`, solid `#0E121B`), `headline-sm` track title, narrator source meta, a continuous linear progress track (2px height, active track `#D92D20`, remaining `#E4E7EC`), and a playback speed selector (`1.0x`, `1.5x` in `label-caps`).

### 5. Inputs & Form Fields
- Crisp input box: `#FFFFFF` surface, `1px solid #E4E7EC` border, 0px radius.
- Active / Focus: Border changes immediately to `1px solid #0E121B` without glowing outer rings.
- Label: Placed strictly above the input in `label-caps`, tertiary color `#1D2939`.

### 6. Lists & Tickers
- **Breaking Wire Ticker**: Continuous horizontal ticker running directly underneath the primary masthead. Deep ink border on top and bottom, background `#FBFBFA`. Prefaced with a solid `#D92D20` badge marked `BREAKING`.
- **Ranked Index List**: Numbered 01 through 10 in small `Bodoni Moda` numerals, followed by inline headline and source tags, separated by hair-thin horizontal dividers.