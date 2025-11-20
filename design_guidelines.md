# DeepMinds Design Guidelines

## Design Approach

**Selected Framework**: Professional Design System with Material Design influence
**Rationale**: Enterprise security platform requiring trust, clarity, and data-dense information presentation. Drawing inspiration from Stripe's professionalism, Linear's modern tech aesthetic, and Vercel's clean presentation.

**Core Principles**:
- Professional credibility through restrained, confident design
- Information clarity over decoration
- Trust signals embedded throughout
- Technical sophistication without complexity

## Typography

**Font Stack**:
- Primary: Inter (Google Fonts) - headings and UI elements
- Secondary: JetBrains Mono (Google Fonts) - technical data, scores, code snippets

**Hierarchy**:
- Hero headline: text-5xl md:text-7xl, font-bold, tracking-tight
- Section headlines: text-3xl md:text-4xl, font-semibold
- Subsections: text-xl md:text-2xl, font-medium
- Body text: text-base md:text-lg, leading-relaxed
- Small labels/captions: text-sm, uppercase tracking-wide for technical indicators
- Credibility scores: text-6xl font-bold (tabular-nums for alignment)

## Layout System

**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 20
- Component padding: p-6 to p-8
- Section spacing: py-16 md:py-24 
- Container gaps: gap-8 md:gap-12
- Card spacing: space-y-6

**Grid Strategy**:
- Container: max-w-7xl mx-auto px-4 md:px-6
- Feature grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 with gap-8
- Comparison tables: Full-width scrollable on mobile, multi-column on desktop
- Upload zone: Centered max-w-4xl

## Component Library

### Navigation
- Sticky header with subtle border-bottom
- Logo left, navigation center, CTA buttons right
- Mobile: Hamburger menu with full-screen overlay
- Include: Home, Features, Pricing, Documentation, Login/Sign Up

### Hero Section
- Full-width background with subtle gradient overlay
- Centered content: max-w-4xl
- Hero image: Abstract digital security visualization (neural network patterns, data flow)
- Primary CTA + secondary "Watch Demo" button with blur background
- Trust indicators below: "Trusted by 100+ newsrooms" with logos

### Feature Showcase (3-column grid)
- Icon-title-description cards with subtle borders
- Icons: Font Awesome (fa-shield-check, fa-file-search, fa-brain, etc.)
- Hover: Subtle lift effect (shadow-lg transition)

### Comparison Table Section
- Full-width scrollable table on mobile
- Desktop: 5-6 column comparison (Tools vs DeepMinds)
- Alternating row backgrounds for readability
- Green checkmarks for DeepMinds advantages
- Red X or limitations for competitors

### Upload Interface
- Large drag-and-drop zone with dashed border
- File type icons displayed prominently
- Progress indicators during upload
- Multiple file format support visualization

### Results Dashboard
- Two-column layout: Left (credibility score + key metrics), Right (detailed analysis)
- Large circular credibility score indicator (0-100)
- Color-coded confidence rating badges
- Expandable sections for technical details
- Visual manipulation markers overlaid on media preview

### Target Markets Section
- 4-column grid showcasing: Journalism, Legal, Government, Insurance
- Stat cards with large numbers + context
- Icons representing each sector

### Pricing Cards
- 4-tier horizontal layout on desktop, stacked on mobile
- Most popular tier highlighted with border accent
- Feature comparison checkmarks
- CTA buttons for each tier

### Technical Architecture
- Flowchart-style visualization
- Connected boxes showing: Input → Analysis → Output
- Technical stack badges/logos
- Mermaid-style diagram representation

### Footer
- Multi-column layout: Company, Product, Resources, Legal, Contact
- Newsletter signup form
- Social media links
- Trust badges (ISO certifications, security compliance)

## Animations

**Minimal, purposeful only**:
- Fade-in-up on scroll for sections (once per page load)
- Smooth hover transitions on cards/buttons (duration-300)
- Upload progress animations
- Credibility score counting animation (on results page only)
- NO parallax, NO continuous animations, NO scroll-jacking

## Images

**Hero Section**: 
- Large abstract visualization showing AI/neural network analysis
- Overlaid with subtle gradient for text readability
- Alt: "DeepMinds AI-powered deepfake detection visualization"

**Feature Sections**:
- Screenshot of upload interface in action
- Mock results dashboard showing credibility analysis
- Comparison visualization (authentic vs manipulated media)

**Trust Section**:
- Logo grid of partner organizations/clients
- Team photos (optional, if adding credibility)

## Accessibility & Quality Standards

- Semantic HTML5 throughout
- ARIA labels on interactive elements
- Keyboard navigation for all workflows
- High contrast ratios (WCAG AA minimum)
- Form inputs with clear labels and error states
- Focus indicators on all interactive elements

## Page Structure

**Landing Page Flow** (8 sections):
1. Hero + Trust Indicators
2. Problem Statement (visual stats)
3. Solution Overview (3-column features)
4. Comparison Table (DeepMinds vs Competitors)
5. Target Markets (4-column grid with stats)
6. Technical Architecture Visualization
7. Pricing Tiers
8. CTA Section + Footer

**Upload/Results Pages**: Dedicated app-like interface with sidebar navigation