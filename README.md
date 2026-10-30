# Shuddh Desi Ghee & Artisanal Panjiri Website

A modern, high-end e-commerce and sensory brand web application for **Shuddh Desi Ghee & Artisanal Panjiri**, featuring interactive 4K AI video motion showcases, authentic generational varieties from the menu poster, Ayurvedic health consulting, custom panjiri builder, and direct WhatsApp ordering.

---

## 🚀 Quick Start (Development)

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional for AI features)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your Google Gemini API Key:
```env
GEMINI_API_KEY="your-gemini-api-key-here"
```

### 3. Start Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 📦 Build for Production

To create a static production build:
```bash
npm run build
```
The optimized files will be output to the `dist/` directory.

To serve both frontend and backend Express API in production:
```bash
npm run start
```

---

## 📂 Project Structure

- `src/`
  - `components/`: Modular React components
    - `Navbar.tsx`: Royal brand navigation, cart badge, WhatsApp link
    - `Hero.tsx`: High-impact luxury hero with poster bowl preview
    - `AIPanjiriVideoShowcase.tsx`: Interactive 4K AI video cinema, motion presets, steam particles, and audio
    - `PanjiriMenu.tsx`: The 6 poster varieties (Classic, Gond, Dry Fruits, Protein, Sugar-Free, Special)
    - `DesiGheeSection.tsx`: A2 Gir Cow Bilona Desi Ghee showcase & 5-step Vedic process
    - `AyurvedicBenefits.tsx`: 4 core pillars (Energy, Immunity, 100% Natural, All Ages)
    - `CustomPanjiriBuilder.tsx`: Bespoke batch customizer with live price calculation
    - `AIPanjiriAdvisor.tsx`: Gemini-powered Ayurvedic formulation advisor
    - `CartDrawer.tsx` & `OrderModal.tsx`: Cart management & WhatsApp order generator
    - `Footer.tsx`: Brand story, storage FAQs, Instagram handle `@desixghee.insta`
  - `data/`: Product varieties and scene configurations
  - `types/`: TypeScript definitions
  - `App.tsx`: Root application state
  - `index.css`: Tailwind CSS styling & animations
- `server.ts`: Express backend running Vite middleware and Gemini AI API routes
- `public/`: High-resolution assets, images, and user menu poster

---

## 🌟 Instagram & Inquiries
Brand Handle: `@desixghee.insta`
Direct WhatsApp ordering is configured out of the box!
