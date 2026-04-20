# 星座分析網站 — 重新設計 SPEC

## 1. Concept & Vision

一個專業、精緻的星座命盤分析網站。告別童稚感，轉向「星象師的私人藏書室」美學——深沉、神秘、優雅。整體氛圍如同深夜在古老天文台中翻閱星圖：暗色背景襯托金色星辰光芒，每個細節都散發著專業占星師的氣質。

## 2. Design Language

### Aesthetic Direction
**Celestial Elegance** — 深邃宇宙 + 古典占星圖鑑感。類似古老星圖與現代深色 UI 的融合。

### Color Palette
- **Background**: `#080b14` (深空黑)
- **Surface**: `#0f1523` (星夜藍黑)
- **Card**: `#141c2e` (夜空卡)
- **Border**: `rgba(212, 175, 55, 0.12)` (星光金，極淡)
- **Primary/Gold**: `#d4af37` (古金)
- **Accent**: `#c9a84c` (啞金)
- **Muted Gold**: `rgba(212, 175, 55, 0.5)` (淡金)
- **Text Primary**: `#f5f0e8` (羊皮紙白)
- **Text Secondary**: `#8a8070` (古銀灰)
- **Fire**: `#e07040` (暖橙紅)
- **Earth**: `#8b6f47` (土棕)
- **Air**: `#6a9fb5` (天藍灰)
- **Water**: `#4a7a9b` (深海藍)

### Typography
- **Headings**: `Cormorant Garamond` (Google Fonts) — 優雅的襯線字體，有古典占星書的氣質
- **Body**: `Noto Sans TC` — 清晰的中文閱讀
- **Accent/Labels**: `Cinzel` — 羅馬碑文風格，用於星座名、標題裝飾

### Spatial System
- 8px base unit
- Section padding: 80px vertical
- Card padding: 32px
- Gap between cards: 24px

### Motion Philosophy
- Entrance: opacity 0→1, translateY 20px→0, 600ms ease-out, staggered 80ms
- Hover: scale(1.02), shadow lift, 250ms ease
- Card reveal: subtle golden glow pulse on hover
- No bounce, no playful animations — smooth, deliberate, mysterious

### Visual Assets
- Star particles: CSS radial gradients
- Constellation lines: SVG decorations
- Card backgrounds: subtle radial gradient overlays
- Icons: Unicode zodiac symbols (♈♉♊ etc.) + custom SVG

## 3. Layout & Structure

### Page Structure
1. **Hero Section**: Full viewport, starfield background, site title with constellation decor
2. **Zodiac Grid**: 12 signs in elegant card grid (4×3 on desktop, 2-col mobile)
3. **Individual Sign Page**: Full chart with personality, lucky info, care points, compatibility
4. **Tarot Section**: Card selection interface

### Navigation
- Minimal top nav with site name (left) and section links (right)
- On scroll: nav gets subtle backdrop blur

### Responsive Strategy
- Desktop: 4-column zodiac grid, side-by-side layouts
- Tablet: 3-column grid
- Mobile: 2-column grid, stacked content

## 4. Features & Interactions

### Core Features
1. **星座選擇首頁**: 12 星座卡片網格，點擊進入個人分析
2. **星座詳細頁**: 完整分析（性格描述、特質標籤、幸運資訊、保養重點、相容星座）
3. **塔羅占卜**: 牌卡選擇與解讀
4. **星座相容度**: 兩星座相容度計算

### Interaction Details
- Zodiac card hover: golden glow border + slight scale up
- Selected state: solid gold border
- Tarot card flip animation on selection
- Smooth scroll between sections

### Empty/Loading/Error States
- Loading: pulsing star animation
- Error: constellation "404" illustration

## 5. Component Inventory

### ZodiacCard
- Shows: emoji, name, element badge
- States: default (dark card with gold border hint), hover (golden glow), active (gold solid border)
- Golden glow on hover

### ElementBadge
- Small pill with element name + color dot
- Fire: orange, Earth: brown, Air: blue, Water: deep blue

### SignDetailPage
- Hero with sign emoji (large), name, element
- Personality traits as elegant tags
- Lucky info in 4-quadrant grid (color, number, direction, compatible signs)
- Care points section
- Compatibility calculator

### TarotCard
- Card face with name
- States: face-down (decorative back), face-up (revealed), selected (gold highlight)

## 6. Technical Approach

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules (no Tailwind) + CSS custom properties
- **Fonts**: Google Fonts (Cormorant Garamond, Noto Sans TC, Cinzel)
- **Data**: Static JSON/TypeScript data files
- **Deployment**: Vercel
- **No external UI libraries** — custom components for full design control
